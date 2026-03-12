//! MCTS (Monte Carlo Tree Search) implementation for native ONNX engine.
//!
//! This runs the entire MCTS loop in Rust, eliminating the IPC overhead
//! that occurs when MCTS runs in JS with per-batch Tauri IPC calls.

use std::sync::atomic::{AtomicBool, Ordering};

use serde::{Deserialize, Serialize};

use super::types::{AnalysisOptions, AnalysisResult, HistoryMove};
use super::OnnxEngine;

const CPUCT: f32 = 1.5;
const LETTERS: &str = "ABCDEFGHJKLMNOPQRST";

/// Progress update emitted during MCTS search.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MCTSProgress {
    pub completed_visits: usize,
    pub total_visits: usize,
    pub best_move: String,
    pub best_move_visits: usize,
    pub win_rate: f32,
    pub score_lead: f32,
    pub top_moves: Vec<MCTSTopMove>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MCTSTopMove {
    #[serde(rename = "move")]
    pub move_str: String,
    pub visits: usize,
    pub win_rate: f32,
    pub score_lead: f32,
}

/// MCTS analysis options for the Tauri command.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MCTSAnalysisOptions {
    pub komi: f32,
    pub next_to_play: Option<String>,
    #[serde(default)]
    pub history: Vec<HistoryMove>,
    pub num_visits: usize,
    pub include_move: Option<String>,
    /// Ko info: sign and vertex
    pub ko_info: Option<KoInfo>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct KoInfo {
    pub sign: i8,
    pub vertex: [i32; 2],
}

/// Extended result with per-move winRate/scoreLead (matches JS MoveSuggestion).
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MCTSMoveSuggestion {
    #[serde(rename = "move")]
    pub move_str: String,
    pub probability: f32,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub win_rate: Option<f32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub score_lead: Option<f32>,
}

/// Extended analysis result from MCTS (includes visits + per-move stats).
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MCTSAnalysisResult {
    pub move_suggestions: Vec<MCTSMoveSuggestion>,
    pub win_rate: f32,
    pub score_lead: f32,
    pub current_turn: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub ownership: Option<Vec<f32>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub visits: Option<usize>,
}

// --- MCTS Tree Node ---

struct MCTSNode {
    n: usize,
    w: f64,
    s: f64,
    p: f32,
    children: Option<Vec<(String, MCTSNode)>>,
    expanded: bool,
    virtual_loss: usize,
}

impl MCTSNode {
    fn new(prior: f32) -> Self {
        Self {
            n: 0,
            w: 0.0,
            s: 0.0,
            p: prior,
            children: None,
            expanded: false,
            virtual_loss: 0,
        }
    }
}

// --- Board logic (simplified Go rules for MCTS tree traversal) ---

/// A lightweight board representation for MCTS tree traversal.
/// We need to apply moves and detect captures/ko.
#[derive(Clone)]
struct Board {
    grid: Vec<Vec<i8>>,
    size: usize,
    ko_vertex: Option<(usize, usize)>,
    ko_sign: i8,
}

impl Board {
    fn with_ko(sign_map: &[Vec<i8>], ko_info: &Option<KoInfo>) -> Self {
        let size = sign_map.len();
        let (ko_vertex, ko_sign) = match ko_info {
            Some(ki) if ki.sign != 0 && ki.vertex[0] >= 0 && ki.vertex[1] >= 0 => {
                (Some((ki.vertex[0] as usize, ki.vertex[1] as usize)), ki.sign)
            }
            _ => (None, 0),
        };
        Self {
            grid: sign_map.to_vec(),
            size,
            ko_vertex,
            ko_sign,
        }
    }

    fn get(&self, x: usize, y: usize) -> i8 {
        self.grid[y][x]
    }

    fn neighbors(&self, x: usize, y: usize) -> Vec<(usize, usize)> {
        let mut result = Vec::with_capacity(4);
        if x > 0 { result.push((x - 1, y)); }
        if x + 1 < self.size { result.push((x + 1, y)); }
        if y > 0 { result.push((x, y - 1)); }
        if y + 1 < self.size { result.push((x, y + 1)); }
        result
    }

    /// Find all stones in the group containing (x, y).
    fn flood_group(&self, x: usize, y: usize, color: i8) -> Vec<(usize, usize)> {
        let mut group = Vec::new();
        let mut visited = vec![vec![false; self.size]; self.size];
        let mut stack = vec![(x, y)];
        while let Some((cx, cy)) = stack.pop() {
            if visited[cy][cx] { continue; }
            if self.grid[cy][cx] != color { continue; }
            visited[cy][cx] = true;
            group.push((cx, cy));
            for (nx, ny) in self.neighbors(cx, cy) {
                if !visited[ny][nx] { stack.push((nx, ny)); }
            }
        }
        group
    }

    /// Check if a group has any liberties.
    fn has_liberties(&self, group: &[(usize, usize)]) -> bool {
        for &(gx, gy) in group {
            for (nx, ny) in self.neighbors(gx, gy) {
                if self.grid[ny][nx] == 0 {
                    return true;
                }
            }
        }
        false
    }

    /// Make a move. Returns a new Board or Err if the move is illegal (suicide/ko).
    fn make_move(&self, pla: i8, x: usize, y: usize) -> Result<Board, ()> {
        if self.grid[y][x] != 0 {
            return Err(());
        }
        // Ko check
        if let Some((kx, ky)) = self.ko_vertex {
            if self.ko_sign == pla && x == kx && y == ky {
                return Err(());
            }
        }

        let mut new_board = self.clone();
        new_board.grid[y][x] = pla;
        new_board.ko_vertex = None;
        new_board.ko_sign = 0;

        let opp = -pla;
        let mut captured = Vec::new();
        for (nx, ny) in self.neighbors(x, y) {
            if new_board.grid[ny][nx] == opp {
                let group = new_board.flood_group(nx, ny, opp);
                if !new_board.has_liberties(&group) {
                    captured.extend_from_slice(&group);
                }
            }
        }

        // Remove captured stones
        for &(cx, cy) in &captured {
            new_board.grid[cy][cx] = 0;
        }

        // Check for suicide
        let own_group = new_board.flood_group(x, y, pla);
        if !new_board.has_liberties(&own_group) {
            return Err(());
        }

        // Detect ko: single stone capture leaving single stone
        if captured.len() == 1 && own_group.len() == 1 {
            new_board.ko_vertex = Some(captured[0]);
            new_board.ko_sign = opp;
        }

        Ok(new_board)
    }

    fn sign_map(&self) -> &[Vec<i8>] {
        &self.grid
    }
}

/// Parse a GTP move string (e.g. "D4", "Q16", "PASS") to (x, y).
fn parse_move_str(move_str: &str, size: usize) -> Option<(usize, usize)> {
    if move_str.is_empty() || move_str == "PASS" {
        return None;
    }
    let chars: Vec<char> = move_str.chars().collect();
    let letter = chars[0].to_ascii_uppercase();
    let x = LETTERS.find(letter)?;
    let num: usize = move_str[1..].parse().ok()?;
    if num == 0 || num > size {
        return None;
    }
    let y = size - num;
    Some((x, y))
}

/// Get the GTP string for the ko-forbidden vertex.
fn get_ko_vertex(board: &Board, pla: i8) -> Option<String> {
    if let Some((kx, ky)) = board.ko_vertex {
        if board.ko_sign == pla {
            let letter = LETTERS.chars().nth(kx)?;
            return Some(format!("{}{}", letter, board.size - ky));
        }
    }
    None
}

/// Expand a node: create children from NN policy, skipping occupied/ko-illegal.
fn expand_node(
    node: &mut MCTSNode,
    result: &AnalysisResult,
    board: &Board,
    pla: i8,
) {
    let ko_vertex = get_ko_vertex(board, pla);
    let mut children = Vec::new();

    for suggestion in &result.move_suggestions {
        let move_str = &suggestion.move_str;
        if move_str != "PASS" {
            if let Some(ref kv) = ko_vertex {
                if move_str == kv { continue; }
            }
            if let Some((x, y)) = parse_move_str(move_str, board.size) {
                if board.get(x, y) != 0 { continue; }
            } else {
                continue;
            }
        }
        children.push((move_str.clone(), MCTSNode::new(suggestion.probability)));
    }

    node.children = Some(children);
    node.expanded = true;
}

/// Filter ko moves from an analysis result and renormalize.
fn filter_ko_moves(result: &AnalysisResult, board: &Board, pla: i8) -> AnalysisResult {
    let ko_move = match get_ko_vertex(board, pla) {
        Some(m) => m,
        None => return result.clone(),
    };
    let filtered: Vec<_> = result.move_suggestions.iter()
        .filter(|s| s.move_str != ko_move)
        .cloned()
        .collect();
    let total: f32 = filtered.iter().map(|s| s.probability).sum();
    let renormalized = if total > 0.0 {
        filtered.into_iter().map(|mut s| { s.probability /= total; s }).collect()
    } else {
        filtered
    };
    AnalysisResult {
        move_suggestions: renormalized,
        ..result.clone()
    }
}

impl OnnxEngine {
    /// Run MCTS search entirely in Rust. This is the performance-critical path
    /// that eliminates IPC overhead by keeping everything in-process.
    pub fn run_mcts(
        &mut self,
        sign_map: &[Vec<i8>],
        options: &MCTSAnalysisOptions,
        abort_flag: &AtomicBool,
        progress_callback: &mut dyn FnMut(MCTSProgress),
    ) -> Result<MCTSAnalysisResult, String> {
        let size = sign_map.len();
        self.board_size = size;
        let num_visits = options.num_visits;
        let max_batch: usize = 8;

        let next_pla = match &options.next_to_play {
            Some(s) if s == "W" => -1i8,
            Some(_) => 1,
            None => {
                let (mut black, mut white) = (0, 0);
                for row in sign_map {
                    for &s in row {
                        if s == 1 { black += 1; }
                        else if s == -1 { white += 1; }
                    }
                }
                if black == white { 1 } else { -1 }
            }
        };

        let komi = options.komi;
        let history = &options.history;
        let root_board = Board::with_ko(sign_map, &options.ko_info);

        // Root node
        let mut root = MCTSNode::new(1.0);

        // Ownership accumulator
        let board_area = size * size;
        let mut ownership_sum = vec![0.0f64; board_area];
        let mut ownership_count: usize = 0;

        let mut completed: usize = 0;
        while completed < num_visits {
            if abort_flag.load(Ordering::Relaxed) { break; }

            let batch_size = max_batch.min(num_visits - completed);

            // Phase 1: Select leaves using PUCT with virtual loss.
            // We collect paths as Vec<Vec<usize>> where each usize is
            // a child index at successive depths.
            struct PendingPath {
                // Path of (child_index_at_depth) from root down
                child_indices: Vec<usize>,
                board: Board,
                pla: i8,
                hist: Vec<HistoryMove>,
                needs_eval: bool,
            }

            let mut pending: Vec<PendingPath> = Vec::with_capacity(batch_size);

            for _ in 0..batch_size {
                let mut child_indices: Vec<usize> = Vec::new();
                let mut cur_board = root_board.clone();
                let mut cur_pla = next_pla;
                let mut cur_hist = history.clone();

                // Walk down the tree from root
                let mut cur_node: *mut MCTSNode = &mut root;
                loop {
                    let node = unsafe { &*cur_node };
                    if !node.expanded { break; }
                    let children = match &node.children {
                        Some(c) if !c.is_empty() => c,
                        _ => break,
                    };

                    // Check for double-pass termination
                    let hlen = cur_hist.len();
                    if hlen >= 2 && cur_hist[hlen - 1].x < 0 && cur_hist[hlen - 2].x < 0 {
                        break;
                    }

                    // PUCT selection with virtual loss
                    let parent_n = node.n + node.virtual_loss;
                    let sqrt_parent = (parent_n.max(1) as f32).sqrt();
                    let mut best_score = f32::NEG_INFINITY;
                    let mut best_idx: usize = 0;

                    for (idx, (_, child)) in children.iter().enumerate() {
                        let effective_n = child.n + child.virtual_loss;
                        let virtual_w = if cur_pla == 1 { 0.0 } else { child.virtual_loss as f64 };
                        let effective_w = child.w + virtual_w;
                        let q = if effective_n > 0 {
                            let raw = effective_w / effective_n as f64;
                            if cur_pla == 1 { raw as f32 } else { 1.0 - raw as f32 }
                        } else {
                            0.0
                        };
                        let u = CPUCT * child.p * sqrt_parent / (1 + effective_n) as f32;
                        let score = q + u;
                        if score > best_score {
                            best_score = score;
                            best_idx = idx;
                        }
                    }

                    child_indices.push(best_idx);

                    let (ref move_str, _) = children[best_idx];

                    // Apply the move to get the new board state
                    if move_str == "PASS" {
                        // Pass: keep board, update history
                        let last_entries: Vec<_> = cur_hist.iter().rev().take(4).cloned().collect();
                        cur_hist = last_entries.into_iter().rev().collect();
                        cur_hist.push(HistoryMove { color: cur_pla, x: -1, y: -1 });
                    } else {
                        if let Some((mx, my)) = parse_move_str(move_str, size) {
                            match cur_board.make_move(cur_pla, mx, my) {
                                Ok(new_board) => {
                                    let last_entries: Vec<_> = cur_hist.iter().rev().take(4).cloned().collect();
                                    cur_hist = last_entries.into_iter().rev().collect();
                                    cur_hist.push(HistoryMove {
                                        color: cur_pla,
                                        x: mx as i32,
                                        y: my as i32,
                                    });
                                    cur_board = new_board;
                                }
                                Err(()) => break,
                            }
                        } else {
                            break;
                        }
                    }

                    cur_pla = -cur_pla;

                    // Navigate to child node
                    let node_mut = unsafe { &mut *cur_node };
                    cur_node = &mut node_mut.children.as_mut().unwrap()[best_idx].1;
                }

                let leaf_node = unsafe { &*cur_node };
                let needs_eval = !leaf_node.expanded;

                // Apply virtual loss along path
                let mut vl_node: *mut MCTSNode = &mut root;
                unsafe { (*vl_node).virtual_loss += 1; }
                for &idx in &child_indices {
                    let n = unsafe { &mut *vl_node };
                    vl_node = &mut n.children.as_mut().unwrap()[idx].1;
                    unsafe { (*vl_node).virtual_loss += 1; }
                }

                pending.push(PendingPath {
                    child_indices,
                    board: cur_board,
                    pla: cur_pla,
                    hist: cur_hist,
                    needs_eval,
                });
            }

            // Phase 2: Batch evaluate unexpanded leaves
            let to_evaluate: Vec<usize> = pending.iter().enumerate()
                .filter(|(_, p)| p.needs_eval)
                .map(|(i, _)| i)
                .collect();

            let eval_results = if !to_evaluate.is_empty() {
                let batch_inputs: Vec<(Vec<Vec<i8>>, AnalysisOptions)> = to_evaluate.iter()
                    .map(|&i| {
                        let p = &pending[i];
                        (
                            p.board.sign_map().to_vec(),
                            AnalysisOptions {
                                komi,
                                next_to_play: Some(if p.pla == 1 { "B" } else { "W" }.to_string()),
                                history: p.hist.clone(),
                            },
                        )
                    })
                    .collect();

                self.analyze_batch(&batch_inputs)?
            } else {
                Vec::new()
            };

            // Phase 3: Remove virtual loss, expand leaves, backup values
            let mut eval_idx: usize = 0;
            for item in &pending {
                // Remove virtual loss along path
                root.virtual_loss -= 1;
                let mut cur_node: *mut MCTSNode = &mut root;
                for &idx in &item.child_indices {
                    let n = unsafe { &mut *cur_node };
                    cur_node = &mut n.children.as_mut().unwrap()[idx].1;
                    unsafe { (*cur_node).virtual_loss -= 1; }
                }

                let leaf = unsafe { &mut *cur_node };
                let (value, score_lead): (f64, f64);

                if item.needs_eval && eval_idx < eval_results.len() {
                    let result = &eval_results[eval_idx];
                    eval_idx += 1;
                    let filtered = filter_ko_moves(result, &item.board, item.pla);
                    expand_node(leaf, &filtered, &item.board, item.pla);
                    value = filtered.win_rate as f64;
                    score_lead = filtered.score_lead as f64;

                    // Accumulate ownership
                    if let Some(ref own) = filtered.ownership {
                        for (i, &v) in own.iter().enumerate().take(board_area) {
                            ownership_sum[i] += v as f64;
                        }
                        ownership_count += 1;
                    }
                } else {
                    value = if leaf.n > 0 { leaf.w / leaf.n as f64 } else { 0.5 };
                    score_lead = if leaf.n > 0 { leaf.s / leaf.n as f64 } else { 0.0 };
                }

                // Backup along path
                root.n += 1;
                root.w += value;
                root.s += score_lead;
                let mut backup_node: *mut MCTSNode = &mut root;
                for &idx in &item.child_indices {
                    let n = unsafe { &mut *backup_node };
                    backup_node = &mut n.children.as_mut().unwrap()[idx].1;
                    let bn = unsafe { &mut *backup_node };
                    bn.n += 1;
                    bn.w += value;
                    bn.s += score_lead;
                }
            }

            completed += pending.len();

            // Emit progress
            if let Some(ref children) = root.children {
                if !children.is_empty() {
                    let mut sorted: Vec<(usize, &str, &MCTSNode)> = children.iter()
                        .enumerate()
                        .map(|(i, (m, c))| (i, m.as_str(), c))
                        .collect();
                    sorted.sort_by(|a, b| b.2.n.cmp(&a.2.n));

                    let best_move = sorted[0].1.to_string();
                    let best_child = sorted[0].2;

                    let mut top_moves: Vec<MCTSTopMove> = sorted.iter().take(5)
                        .map(|(_, m, c)| MCTSTopMove {
                            move_str: m.to_string(),
                            visits: c.n,
                            win_rate: if c.n > 0 { (c.w / c.n as f64) as f32 } else { 0.5 },
                            score_lead: if c.n > 0 { (c.s / c.n as f64) as f32 } else { 0.0 },
                        })
                        .collect();

                    // Append includeMove if not in top 5
                    if let Some(ref include_move) = options.include_move {
                        if !top_moves.iter().any(|tm| &tm.move_str == include_move) {
                            if let Some((_, m, c)) = sorted.iter().find(|(_, m, _)| *m == include_move.as_str()) {
                                top_moves.push(MCTSTopMove {
                                    move_str: m.to_string(),
                                    visits: c.n,
                                    win_rate: if c.n > 0 { (c.w / c.n as f64) as f32 } else { 0.5 },
                                    score_lead: if c.n > 0 { (c.s / c.n as f64) as f32 } else { 0.0 },
                                });
                            }
                        }
                    }

                    progress_callback(MCTSProgress {
                        completed_visits: completed,
                        total_visits: num_visits,
                        best_move,
                        best_move_visits: best_child.n,
                        win_rate: if root.n > 0 { (root.w / root.n as f64) as f32 } else { 0.5 },
                        score_lead: if root.n > 0 { (root.s / root.n as f64) as f32 } else { 0.0 },
                        top_moves,
                    });
                }
            }
        }

        // Force additional visits through includeMove if needed
        if let Some(ref include_move) = options.include_move {
            if num_visits > 1 && !abort_flag.load(Ordering::Relaxed) {
                if let Some(ref children) = root.children {
                    if let Some((child_idx, _)) = children.iter().enumerate()
                        .find(|(_, (m, _))| m == include_move)
                    {
                        let min_visits = 3usize.max((num_visits as f64 * 0.05).ceil() as usize);
                        let current_visits = children[child_idx].1.n;
                        if current_visits < min_visits {
                            let extra_needed = min_visits - current_visits;
                            self.run_include_move_visits(
                                &mut root,
                                child_idx,
                                &root_board,
                                next_pla,
                                komi,
                                history,
                                include_move,
                                extra_needed,
                                size,
                                abort_flag,
                            )?;
                        }
                    }
                }
            }
        }

        // Build final result
        self.build_mcts_result(&root, next_pla, &ownership_sum, ownership_count, size)
    }

    /// Run forced visits through the includeMove.
    fn run_include_move_visits(
        &mut self,
        root: &mut MCTSNode,
        child_idx: usize,
        root_board: &Board,
        next_pla: i8,
        komi: f32,
        history: &[HistoryMove],
        include_move: &str,
        extra_needed: usize,
        size: usize,
        abort_flag: &AtomicBool,
    ) -> Result<(), String> {
        for _ in 0..extra_needed {
            if abort_flag.load(Ordering::Relaxed) { break; }

            // Force select includeMove at root
            let mut cur_board = root_board.clone();
            let mut cur_pla = next_pla;
            let mut cur_hist = history.to_vec();
            let mut path_indices: Vec<usize> = vec![child_idx];

            // Apply the forced move
            if include_move == "PASS" {
                let last_entries: Vec<_> = cur_hist.iter().rev().take(4).cloned().collect();
                cur_hist = last_entries.into_iter().rev().collect();
                cur_hist.push(HistoryMove { color: cur_pla, x: -1, y: -1 });
            } else if let Some((mx, my)) = parse_move_str(include_move, size) {
                match cur_board.make_move(cur_pla, mx, my) {
                    Ok(new_board) => {
                        let last_entries: Vec<_> = cur_hist.iter().rev().take(4).cloned().collect();
                        cur_hist = last_entries.into_iter().rev().collect();
                        cur_hist.push(HistoryMove {
                            color: cur_pla,
                            x: mx as i32,
                            y: my as i32,
                        });
                        cur_board = new_board;
                    }
                    Err(()) => break,
                }
            } else {
                break;
            }
            cur_pla = -cur_pla;

            // Continue with PUCT from the child node downward
            let mut cur_node: *mut MCTSNode = &mut root.children.as_mut().unwrap()[child_idx].1;
            loop {
                let node = unsafe { &*cur_node };
                if !node.expanded { break; }
                let children = match &node.children {
                    Some(c) if !c.is_empty() => c,
                    _ => break,
                };

                let hlen = cur_hist.len();
                if hlen >= 2 && cur_hist[hlen - 1].x < 0 && cur_hist[hlen - 2].x < 0 {
                    break;
                }

                let parent_n = node.n;
                let sqrt_parent = (parent_n.max(1) as f32).sqrt();
                let mut best_score = f32::NEG_INFINITY;
                let mut best_idx: usize = 0;

                for (idx, (_, child)) in children.iter().enumerate() {
                    let q = if child.n > 0 {
                        let raw = child.w / child.n as f64;
                        if cur_pla == 1 { raw as f32 } else { 1.0 - raw as f32 }
                    } else {
                        0.0
                    };
                    let u = CPUCT * child.p * sqrt_parent / (1 + child.n) as f32;
                    if q + u > best_score {
                        best_score = q + u;
                        best_idx = idx;
                    }
                }

                path_indices.push(best_idx);
                let (ref move_str, _) = children[best_idx];

                if move_str == "PASS" {
                    let last_entries: Vec<_> = cur_hist.iter().rev().take(4).cloned().collect();
                    cur_hist = last_entries.into_iter().rev().collect();
                    cur_hist.push(HistoryMove { color: cur_pla, x: -1, y: -1 });
                } else if let Some((mx, my)) = parse_move_str(move_str, size) {
                    match cur_board.make_move(cur_pla, mx, my) {
                        Ok(new_board) => {
                            let last_entries: Vec<_> = cur_hist.iter().rev().take(4).cloned().collect();
                            cur_hist = last_entries.into_iter().rev().collect();
                            cur_hist.push(HistoryMove {
                                color: cur_pla,
                                x: mx as i32,
                                y: my as i32,
                            });
                            cur_board = new_board;
                        }
                        Err(()) => break,
                    }
                } else {
                    break;
                }

                cur_pla = -cur_pla;
                let n = unsafe { &mut *cur_node };
                cur_node = &mut n.children.as_mut().unwrap()[best_idx].1;
            }

            // Evaluate leaf if unexpanded
            let leaf = unsafe { &mut *cur_node };
            let (value, sl): (f64, f64);
            if !leaf.expanded {
                let results = self.analyze_batch(&[(
                    cur_board.sign_map().to_vec(),
                    AnalysisOptions {
                        komi,
                        next_to_play: Some(if cur_pla == 1 { "B" } else { "W" }.to_string()),
                        history: cur_hist,
                    },
                )])?;
                if let Some(result) = results.first() {
                    let filtered = filter_ko_moves(result, &cur_board, cur_pla);
                    expand_node(leaf, &filtered, &cur_board, cur_pla);
                    value = filtered.win_rate as f64;
                    sl = filtered.score_lead as f64;
                } else {
                    value = 0.5;
                    sl = 0.0;
                }
            } else {
                value = if leaf.n > 0 { leaf.w / leaf.n as f64 } else { 0.5 };
                sl = if leaf.n > 0 { leaf.s / leaf.n as f64 } else { 0.0 };
            }

            // Backup along path
            root.n += 1;
            root.w += value;
            root.s += sl;
            let mut backup_node: *mut MCTSNode = &mut *root;
            for &idx in &path_indices {
                let n = unsafe { &mut *backup_node };
                backup_node = &mut n.children.as_mut().unwrap()[idx].1;
                let bn = unsafe { &mut *backup_node };
                bn.n += 1;
                bn.w += value;
                bn.s += sl;
            }
        }

        Ok(())
    }

    /// Build the final MCTS result from the root node.
    fn build_mcts_result(
        &self,
        root: &MCTSNode,
        next_pla: i8,
        ownership_sum: &[f64],
        ownership_count: usize,
        _size: usize,
    ) -> Result<MCTSAnalysisResult, String> {
        let mut move_suggestions = Vec::new();

        if let Some(ref children) = root.children {
            if !children.is_empty() {
                let total_child_visits: usize = children.iter().map(|(_, c)| c.n).sum();
                let root_win_rate = if root.n > 0 { (root.w / root.n as f64) as f32 } else { 0.5 };
                let root_score_lead = if root.n > 0 { (root.s / root.n as f64) as f32 } else { 0.0 };

                let mut sorted: Vec<&(String, MCTSNode)> = children.iter().collect();
                sorted.sort_by(|a, b| {
                    if a.1.n != b.1.n {
                        b.1.n.cmp(&a.1.n)
                    } else {
                        b.1.p.partial_cmp(&a.1.p).unwrap_or(std::cmp::Ordering::Equal)
                    }
                });

                for (move_str, child) in sorted {
                    let probability = if child.n > 0 && total_child_visits > 0 {
                        child.n as f32 / total_child_visits as f32
                    } else {
                        child.p
                    };
                    let win_rate = if child.n > 0 {
                        Some((child.w / child.n as f64) as f32)
                    } else {
                        Some(root_win_rate)
                    };
                    let score_lead = if child.n > 0 {
                        Some((child.s / child.n as f64) as f32)
                    } else {
                        Some(root_score_lead)
                    };

                    move_suggestions.push(MCTSMoveSuggestion {
                        move_str: move_str.clone(),
                        probability,
                        win_rate,
                        score_lead,
                    });
                }
            }
        }

        let win_rate = if root.n > 0 { (root.w / root.n as f64) as f32 } else { 0.5 };
        let score_lead = if root.n > 0 { (root.s / root.n as f64) as f32 } else { 0.0 };
        let ownership = if ownership_count > 0 {
            Some(ownership_sum.iter().map(|v| (*v / ownership_count as f64) as f32).collect())
        } else {
            None
        };

        Ok(MCTSAnalysisResult {
            move_suggestions,
            win_rate,
            score_lead,
            current_turn: if next_pla == 1 { "B" } else { "W" }.to_string(),
            ownership,
            visits: Some(root.n),
        })
    }
}
