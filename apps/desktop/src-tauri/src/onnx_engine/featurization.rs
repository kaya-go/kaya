//! Board featurization for KataGo neural network inputs
//!
//! A board of any shape is written into the corner of a square input (see
//! `BoardShape`): planes are indexed (c, y, x) on the board, and the callers'
//! closures place them in the square.

use super::types::{AnalysisOptions, BoardShape, HistoryMove};

/// Determine next player from sign map and options
pub fn determine_next_player(sign_map: &[Vec<i8>], options: &AnalysisOptions) -> i8 {
    match &options.next_to_play {
        Some(s) if s == "W" => -1,
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
    }
}

/// The point the side to play may not take back this move, if a ko binds it.
pub fn ko_ban(options: &AnalysisOptions, pla: i8, shape: BoardShape) -> Option<(usize, usize)> {
    let ko = options.ko_info.as_ref()?;
    let (x, y) = (ko.vertex[0], ko.vertex[1]);
    (ko.sign == pla && shape.contains(x, y)).then(|| (x as usize, y as usize))
}

/// Compute liberties for each position on the board. Past its edge there is
/// no liberty.
pub fn compute_liberties(sign_map: &[Vec<i8>]) -> Vec<Vec<usize>> {
    let BoardShape { width, height, .. } = BoardShape::of(sign_map);
    let mut liberties = vec![vec![0usize; width]; height];
    let mut visited = vec![vec![false; width]; height];

    for y in 0..height {
        for x in 0..width {
            if sign_map[y][x] != 0 && !visited[y][x] {
                let mut group = Vec::new();
                let mut liberty_set = std::collections::HashSet::new();
                let mut stack = vec![(x, y)];
                let color = sign_map[y][x];

                while let Some((cx, cy)) = stack.pop() {
                    if visited[cy][cx] {
                        continue;
                    }
                    if sign_map[cy][cx] != color {
                        if sign_map[cy][cx] == 0 {
                            liberty_set.insert((cx, cy));
                        }
                        continue;
                    }

                    visited[cy][cx] = true;
                    group.push((cx, cy));

                    if cx > 0 { stack.push((cx - 1, cy)); }
                    if cx + 1 < width { stack.push((cx + 1, cy)); }
                    if cy > 0 { stack.push((cx, cy - 1)); }
                    if cy + 1 < height { stack.push((cx, cy + 1)); }
                }

                for &(gx, gy) in &group {
                    let neighbors = [
                        (gx.wrapping_sub(1), gy),
                        (gx + 1, gy),
                        (gx, gy.wrapping_sub(1)),
                        (gx, gy + 1),
                    ];
                    for (nx, ny) in neighbors {
                        if nx < width && ny < height && sign_map[ny][nx] == 0 {
                            liberty_set.insert((nx, ny));
                        }
                    }
                }

                let lib_count = liberty_set.len();
                for (gx, gy) in group {
                    liberties[gy][gx] = lib_count;
                }
            }
        }
    }

    liberties
}

/// Fill binary and global input features from a board position.
///
/// Callers provide closures that write values into their tensors, zeroed
/// beforehand: only points of the board are written, so past its edge every
/// plane stays 0. `ko_ban` is the point `pla` may not take back (see
/// `ko_ban`), for input plane 6.
pub fn featurize_into(
    sign_map: &[Vec<i8>],
    pla: i8,
    komi: f32,
    history: &[HistoryMove],
    ko_ban: Option<(usize, usize)>,
    mut set_bin: impl FnMut(usize, usize, usize, f32),
    mut set_global: impl FnMut(usize, f32),
) {
    let shape = BoardShape::of(sign_map);
    let opp = -pla;

    let liberties = compute_liberties(sign_map);

    for y in 0..shape.height {
        for x in 0..shape.width {
            // Channel 0: on the board
            set_bin(0, y, x, 1.0);

            let color = sign_map[y][x];
            if color == pla {
                set_bin(1, y, x, 1.0);
            } else if color == opp {
                set_bin(2, y, x, 1.0);
            }

            if color != 0 {
                let libs = liberties[y][x];
                if libs == 1 { set_bin(3, y, x, 1.0); }
                if libs == 2 { set_bin(4, y, x, 1.0); }
                if libs == 3 { set_bin(5, y, x, 1.0); }
            }
        }
    }

    // Channel 6: the ko recapture the side to play may not make
    if let Some((x, y)) = ko_ban {
        set_bin(6, y, x, 1.0);
    }

    // History features (channels 9-13: last 5 moves)
    let hist_len = history.len();
    for (move_idx, feature_idx) in [(1, 9), (2, 10), (3, 11), (4, 12), (5, 13)] {
        if hist_len >= move_idx {
            let m = &history[hist_len - move_idx];
            if shape.contains(m.x, m.y) {
                set_bin(feature_idx, m.y as usize, m.x as usize, 1.0);
            }
        }
    }

    // Global features - pass history
    for (move_idx, global_idx) in [(1, 0), (2, 1), (3, 2), (4, 3), (5, 4)] {
        if hist_len >= move_idx && history[hist_len - move_idx].x < 0 {
            set_global(global_idx, 1.0);
        }
    }

    // Komi (as selfKomi — komi from the perspective of the side to move).
    // KataGo encodes rowGlobal[5] = selfKomi * 0.05, where selfKomi is +komi for
    // White-to-move and -komi for Black-to-move. Kaya's Sign has Black=1, White=-1,
    // so selfKomi = -pla * komi.
    set_global(5, (-(pla as f32) * komi) / 20.0);

    // Komi parity (rowGlobal[18]), from the area of the board itself. KataGo
    // sets it under area scoring only; Kaya always tells the network area
    // scoring (global 9 stays 0), so it is always set. If Kaya ever passes
    // territory scoring, it must become conditional, as in fillRowV7.
    let area = sign_map.len() * sign_map.first().map_or(0, Vec::len);
    set_global(18, super::komi_parity::wave(-(pla as f32) * komi, area));
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::onnx_engine::types::KoInfo;

    /// The points set in input plane 6 for `pla` to play, under `options`' ko.
    fn ko_plane(options: &AnalysisOptions, pla: i8) -> Vec<(usize, usize)> {
        let board = vec![vec![0i8; 9]; 9];
        let mut set = vec![];
        featurize_into(&board, pla, 7.5, &[], ko_ban(options, pla, BoardShape::of(&board)), |c, y, x, _| {
            if c == 6 { set.push((x, y)); }
        }, |_, _| {});
        set
    }

    fn with_ko(sign: i8, vertex: [i32; 2]) -> AnalysisOptions {
        AnalysisOptions { ko_info: Some(KoInfo { sign, vertex }), ..Default::default() }
    }

    /// The web featurizer always set the ko plane; the native one never did,
    /// so on desktop the network could not see a ko.
    #[test]
    fn the_ko_plane_marks_the_recapture_for_the_side_it_binds() {
        assert_eq!(ko_plane(&with_ko(1, [1, 8]), 1), vec![(1, 8)]);
    }

    #[test]
    fn the_ko_plane_is_empty_for_the_other_side_or_without_a_ko() {
        assert!(ko_plane(&with_ko(1, [1, 8]), -1).is_empty());
        assert!(ko_plane(&with_ko(0, [-1, -1]), 1).is_empty());
        assert!(ko_plane(&AnalysisOptions::default(), 1).is_empty());
    }

    /// The points set in input plane `c` for `sign_map`, Black to play.
    fn plane_of(sign_map: &[Vec<i8>], c: usize) -> Vec<(usize, usize)> {
        let mut set = vec![];
        featurize_into(sign_map, 1, 7.5, &[], None, |plane, y, x, _| {
            if plane == c { set.push((x, y)); }
        }, |_, _| {});
        set
    }

    /// A rectangle sits in the corner of the network's square input. Plane 0,
    /// the on-board mask, marks its points only: past the edge the network
    /// sees no board, as in KataGo's fillRowV7.
    #[test]
    fn plane_0_marks_only_the_points_of_a_rectangle() {
        for (width, height) in [(9, 13), (13, 9)] {
            let on_board = plane_of(&vec![vec![0i8; width]; height], 0);
            assert_eq!(on_board.len(), width * height);
            assert!(on_board.iter().all(|&(x, y)| x < width && y < height));
        }
    }

    #[test]
    fn the_edge_of_a_rectangle_takes_liberties_away() {
        // Black on the right edge of 9x13, White above and to its left: one
        // liberty left, below it.
        let mut board = vec![vec![0i8; 9]; 13];
        board[6][8] = 1;
        board[5][8] = -1;
        board[6][7] = -1;
        assert_eq!(compute_liberties(&board)[6][8], 1);
        assert_eq!(plane_of(&board, 3), vec![(8, 6)]);
    }
}
