//! MCTS (Monte Carlo Tree Search) implementation for native ONNX engine.
//!
//! This runs the entire MCTS loop in Rust, eliminating the IPC overhead
//! that occurs when MCTS runs in JS with per-batch Tauri IPC calls.

use serde::{Deserialize, Serialize};

use super::result_processing::drop_ko_move;
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
    /// None until the search visits the move (see `own_evaluation`).
    #[serde(skip_serializing_if = "Option::is_none")]
    pub win_rate: Option<f32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub score_lead: Option<f32>,
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
    /// Policy prior, searched or not; the search's own say is `visits`.
    pub probability: f32,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub win_rate: Option<f32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub score_lead: Option<f32>,
    /// Search visits through this move. 0 means the search never tried it, so
    /// win_rate and score_lead are None. The analysis cache relies on it.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub visits: Option<usize>,
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
    if x >= size || num == 0 || num > size {
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

/// Expand a node: create children from NN policy, keeping only legal moves.
/// `make_move` refuses an occupied point, the ko point and a suicide alike; the
/// network can rank any of them among its top moves.
fn expand_node(
    node: &mut MCTSNode,
    result: &AnalysisResult,
    board: &Board,
    pla: i8,
) {
    let mut children = Vec::new();

    for suggestion in &result.move_suggestions {
        let move_str = &suggestion.move_str;
        if move_str != "PASS" {
            let legal = parse_move_str(move_str, board.size)
                .is_some_and(|(x, y)| board.make_move(pla, x, y).is_ok());
            if !legal { continue; }
        }
        children.push((move_str.clone(), MCTSNode::new(suggestion.probability)));
    }

    node.children = Some(children);
    node.expanded = true;
}

/// A move's own win rate and score, from the visits through it. A move the
/// search never visited has none: giving it the root's would pass a guess for
/// a result.
fn own_evaluation(node: &MCTSNode) -> (Option<f32>, Option<f32>) {
    if node.n == 0 {
        return (None, None);
    }
    (
        Some((node.w / node.n as f64) as f32),
        Some((node.s / node.n as f64) as f32),
    )
}

impl MCTSTopMove {
    fn of(move_str: &str, node: &MCTSNode) -> Self {
        let (win_rate, score_lead) = own_evaluation(node);
        Self { move_str: move_str.to_string(), visits: node.n, win_rate, score_lead }
    }
}

/// Filter the ko-forbidden recapture from a policy result (see `drop_ko_move`).
fn filter_ko_moves(result: &AnalysisResult, board: &Board, pla: i8) -> AnalysisResult {
    match get_ko_vertex(board, pla) {
        Some(ko_move) => drop_ko_move(result, &ko_move),
        None => result.clone(),
    }
}

impl OnnxEngine {
    /// Run MCTS search entirely in Rust. This is the performance-critical path
    /// that eliminates IPC overhead by keeping everything in-process.
    pub fn run_mcts(
        &mut self,
        sign_map: &[Vec<i8>],
        options: &MCTSAnalysisOptions,
        should_abort: &dyn Fn() -> bool,
        progress_callback: &mut dyn FnMut(MCTSProgress),
    ) -> Result<MCTSAnalysisResult, String> {
        let size = sign_map.len();
        self.board_size = size;
        let num_visits = options.num_visits;
        let max_batch: usize = 16;

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

        // Emit initial progress (0/N) so the UI updates immediately
        progress_callback(MCTSProgress {
            completed_visits: 0,
            total_visits: num_visits,
            best_move: String::new(),
            best_move_visits: 0,
            win_rate: 0.5,
            score_lead: 0.0,
            top_moves: vec![],
        });

        let mut completed: usize = 0;
        while completed < num_visits {
            if should_abort() { break; }

            // Until the root is expanded every path stops at it, so a full first
            // batch would evaluate the root batch_size times over. Evaluate it alone.
            let batch_size = if root.expanded { max_batch.min(num_visits - completed) } else { 1 };

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
            // Leaves already queued for evaluation in this batch. Virtual loss only
            // discourages a second pick, so a sharp prior can pick the same leaf
            // again: the same inference twice, counted as two visits.
            let mut queued_leaves: Vec<*const MCTSNode> = Vec::with_capacity(batch_size);

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

                    // Only a move that was played joins the path: an illegal one
                    // pushed first got the visits and value of the node above it.
                    child_indices.push(best_idx);
                    cur_pla = -cur_pla;

                    // Navigate to child node
                    let node_mut = unsafe { &mut *cur_node };
                    cur_node = &mut node_mut.children.as_mut().unwrap()[best_idx].1;
                }

                let leaf_node = unsafe { &*cur_node };
                let needs_eval = !leaf_node.expanded;
                if needs_eval {
                    let leaf_ptr = cur_node as *const MCTSNode;
                    if queued_leaves.contains(&leaf_ptr) { break; }
                    queued_leaves.push(leaf_ptr);
                }

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

            // Check abort before starting the (slow) ONNX inference. If the user
            // navigated away during leaf selection, skip the inference entirely.
            if should_abort() { break; }

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

            // Inference is the dominant per-batch cost. Check abort right after
            // it returns so we don't waste time on backup + progress emit when
            // the user has already moved on.
            if should_abort() { break; }

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

                    // Average ownership over every evaluated node, like KataGo's tree-averaged
                    // ownership: it predicts final territory, so deeper positions refine it.
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
                        .map(|(_, m, c)| MCTSTopMove::of(m, c))
                        .collect();

                    // Append includeMove if not in top 5
                    if let Some(ref include_move) = options.include_move {
                        if !top_moves.iter().any(|tm| &tm.move_str == include_move) {
                            if let Some((_, m, c)) = sorted.iter().find(|(_, m, _)| *m == include_move.as_str()) {
                                top_moves.push(MCTSTopMove::of(m, c));
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
            if num_visits > 1 && !should_abort() {
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
                                should_abort,
                            )?;
                        }
                    }
                }
            }
        }

        // Build final result
        Self::build_mcts_result(&root, next_pla, &ownership_sum, ownership_count, size)
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
        should_abort: &dyn Fn() -> bool,
    ) -> Result<(), String> {
        for _ in 0..extra_needed {
            if should_abort() { break; }

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
                // Played: only now does the move join the path (see `run_mcts`).
                path_indices.push(best_idx);

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
        root: &MCTSNode,
        next_pla: i8,
        ownership_sum: &[f64],
        ownership_count: usize,
        _size: usize,
    ) -> Result<MCTSAnalysisResult, String> {
        let mut move_suggestions = Vec::new();

        if let Some(ref children) = root.children {
            if !children.is_empty() {
                let mut sorted: Vec<&(String, MCTSNode)> = children.iter().collect();
                sorted.sort_by(|a, b| {
                    if a.1.n != b.1.n {
                        b.1.n.cmp(&a.1.n)
                    } else {
                        b.1.p.partial_cmp(&a.1.p).unwrap_or(std::cmp::Ordering::Equal)
                    }
                });

                // `probability` stays the prior; the search's own say is `visits`.
                for (move_str, child) in sorted {
                    let (win_rate, score_lead) = own_evaluation(child);

                    move_suggestions.push(MCTSMoveSuggestion {
                        move_str: move_str.clone(),
                        probability: child.p,
                        win_rate,
                        score_lead,
                        visits: Some(child.n),
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

#[cfg(test)]
mod tests {
    use super::*;
    use crate::onnx_engine::types::MoveSuggestion;

    fn policy(moves: &[&str]) -> AnalysisResult {
        policy_of(&moves.iter().map(|&m| (m, 0.25)).collect::<Vec<_>>())
    }

    fn policy_of(moves: &[(&str, f32)]) -> AnalysisResult {
        AnalysisResult {
            move_suggestions: moves.iter()
                .map(|&(m, p)| MoveSuggestion { move_str: m.to_string(), probability: p })
                .collect(),
            win_rate: 0.5,
            score_lead: 0.0,
            current_turn: "W".to_string(),
            ownership: None,
        }
    }

    fn children(node: &MCTSNode) -> Vec<&str> {
        node.children.as_ref().unwrap().iter().map(|(m, _)| m.as_str()).collect()
    }

    /// The network may rank a suicide point among its top moves. Expansion only
    /// skipped occupied and ko points, so the search kept such a move as a child,
    /// and every visit that picked it backed up its parent's value under it.
    #[test]
    fn expansion_drops_suicide_points() {
        // Black surrounds C3: White there has no liberty and captures nothing.
        let mut grid = vec![vec![0i8; 5]; 5];
        for (x, y) in [(2, 1), (1, 2), (3, 2), (2, 3)] {
            grid[y][x] = 1;
        }
        let board = Board::with_ko(&grid, &None);
        let result = policy(&["C3", "A5", "C4", "PASS"]);

        let mut white = MCTSNode::new(1.0);
        expand_node(&mut white, &result, &board, -1);
        assert_eq!(children(&white), vec!["A5", "PASS"]);

        // For Black, C3 is an eye of its own, a legal move.
        let mut black = MCTSNode::new(1.0);
        expand_node(&mut black, &result, &board, 1);
        assert_eq!(children(&black), vec!["C3", "A5", "PASS"]);
    }

    fn child(move_str: &str, prior: f32, visits: usize) -> (String, MCTSNode) {
        let mut node = MCTSNode::new(prior);
        node.n = visits;
        node.w = 0.6 * visits as f64;
        (move_str.to_string(), node)
    }

    /// `probability` is the policy prior, searched or not: what the search
    /// thinks is in `visits`. Writing the visit share for visited moves and
    /// the prior for the others put two units in one field.
    #[test]
    fn probability_is_the_prior_for_every_listed_move() {
        let mut root = MCTSNode::new(1.0);
        root.n = 8;
        root.children = Some(vec![child("E5", 0.6, 6), child("C3", 0.3, 1), child("G7", 0.05, 0)]);

        let result = OnnxEngine::build_mcts_result(&root, 1, &[], 0, 9).unwrap();
        let by_move: Vec<_> = result.move_suggestions.iter()
            .map(|s| (s.move_str.as_str(), s.probability, s.visits))
            .collect();
        assert_eq!(by_move, vec![("E5", 0.6, Some(6)), ("C3", 0.3, Some(1)), ("G7", 0.05, Some(0))]);
    }

    /// A ko: Black may not retake at B1 (x 1, y 8 on 9x9) on this move.
    fn ko_board() -> Board {
        Board::with_ko(&vec![vec![0i8; 9]; 9], &Some(KoInfo { sign: 1, vertex: [1, 8] }))
    }

    #[test]
    fn the_ko_move_share_goes_to_the_legal_moves() {
        let input = policy_of(&[("B1", 0.5), ("E5", 0.3), ("C3", 0.1)]);
        let filtered = filter_ko_moves(&input, &ko_board(), 1);
        let moves: Vec<_> = filtered.move_suggestions.iter()
            .map(|s| (s.move_str.as_str(), s.probability))
            .collect();
        assert_eq!(moves.len(), 2);
        assert_eq!(moves[0].0, "E5");
        // Divided by 1 - 0.5: the policy covers every move, not just the listed ten.
        assert!((moves[0].1 - 0.6).abs() < 1e-6, "{:?}", moves);
        assert!((moves[1].1 - 0.2).abs() < 1e-6, "{:?}", moves);
    }

    #[test]
    fn a_ko_move_that_is_not_listed_changes_nothing() {
        let filtered = filter_ko_moves(&policy_of(&[("E5", 0.3), ("C3", 0.1)]), &ko_board(), 1);
        let probs: Vec<f32> = filtered.move_suggestions.iter().map(|s| s.probability).collect();
        assert_eq!(probs, vec![0.3, 0.1]);
    }
}
