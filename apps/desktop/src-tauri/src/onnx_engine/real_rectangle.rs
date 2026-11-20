//! A rectangular game through a real model, which CI never runs. It prints the
//! values the engine gives the same position the way Kaya sent it before (a
//! square padded past the short edge, where a stone captured against that edge
//! was still on the board) and the way it sends it now (the board itself):
//!
//! ```sh
//! KAYA_TEST_MODEL=/path/to/katago-latest.onnx \
//!     cargo test --release --lib real_rectangle -- --ignored --nocapture
//! ```

use std::path::Path;

use super::mcts::MCTSAnalysisOptions;
use super::types::{AnalysisOptions, AnalysisResult, BoardShape, HistoryMove};
use super::OnnxEngine;

/// Eighteen moves of a 9x13 game as (x, y), Black first. White's 12th move
/// takes the Black stone of the 7th against the right edge. The same moves
/// transposed are a 13x9 game, the stone taken against the bottom edge.
const MOVES: [(usize, usize); 18] = [
    (2, 2), (6, 10), (6, 2), (2, 10), (4, 6), (6, 7), (8, 6), (8, 5), (3, 9),
    (8, 7), (5, 4), (7, 6), (2, 6), (4, 10), (6, 4), (3, 11), (2, 8), (5, 9),
];
const CAPTURED: usize = 6;

/// The position after the moves, Black to play: on the board itself, or on
/// the 13x13 square main padded it to, where the captured stone stayed.
fn position(transposed: bool, padded: bool) -> (Vec<Vec<i8>>, Vec<HistoryMove>) {
    let at = |(x, y): (usize, usize)| if transposed { (y, x) } else { (x, y) };
    let (width, height) = if padded { (13, 13) } else { at((9, 13)) };
    let mut sign_map = vec![vec![0i8; width]; height];
    for (i, &point) in MOVES.iter().enumerate() {
        let (x, y) = at(point);
        sign_map[y][x] = if i % 2 == 0 { 1 } else { -1 };
    }
    if !padded {
        let (x, y) = at(MOVES[CAPTURED]);
        sign_map[y][x] = 0;
    }
    let history = MOVES[MOVES.len() - 5..].iter().enumerate()
        .map(|(i, &point)| {
            let (x, y) = at(point);
            HistoryMove { color: if i % 2 == 0 { -1 } else { 1 }, x: x as i32, y: y as i32 }
        })
        .collect();
    (sign_map, history)
}

fn on_board(move_str: &str, shape: BoardShape) -> bool {
    move_str == "PASS" || shape.parse_move(move_str).is_some()
}

fn summary(result: &AnalysisResult, real: BoardShape) -> String {
    let top: Vec<String> = result.move_suggestions.iter().take(3)
        .map(|s| format!("{}{} {:.3}", s.move_str, if on_board(&s.move_str, real) { "" } else { "*" }, s.probability))
        .collect();
    let off_board: f32 = result.move_suggestions.iter()
        .filter(|s| !on_board(&s.move_str, real))
        .map(|s| s.probability)
        .sum();
    format!(
        "winRate={:.4} scoreLead={:+.2} top=[{}] policy past the edge (top 10)={:.3}",
        result.win_rate, result.score_lead, top.join(", "), off_board
    )
}

#[test]
#[ignore = "needs a real model, see KAYA_TEST_MODEL"]
fn real_rectangle_before_and_after() {
    let model = std::env::var("KAYA_TEST_MODEL").expect("KAYA_TEST_MODEL must point at a model");
    let mut engine = OnnxEngine::new(Path::new(&model)).expect("engine should load");

    for transposed in [false, true] {
        let (real_map, _) = position(transposed, false);
        let real = BoardShape::of(&real_map);
        for padded in [true, false] {
            let (sign_map, history) = position(transposed, padded);
            let options = AnalysisOptions {
                komi: 7.5,
                next_to_play: Some("B".to_string()),
                history: history.clone(),
                ko_info: None,
            };
            let label = format!(
                "{}x{} {}",
                real.width,
                real.height,
                if padded { "before (padded square)" } else { "after (real board)" }
            );
            let raw = engine.analyze(&sign_map, &options).expect("analysis should run");
            eprintln!("{label} network: {}", summary(&raw, real));

            let search = MCTSAnalysisOptions {
                komi: 7.5,
                next_to_play: Some("B".to_string()),
                history,
                num_visits: 200,
                include_move: None,
                ko_info: None,
            };
            let searched = engine.run_mcts(&sign_map, &search, &|| false, &mut |_| {}).expect("search should run");
            let best: Vec<String> = searched.move_suggestions.iter().take(3)
                .map(|s| format!("{}{} {}v", s.move_str, if on_board(&s.move_str, real) { "" } else { "*" }, s.visits.unwrap_or(0)))
                .collect();
            eprintln!(
                "{label} 200 visits: winRate={:.4} scoreLead={:+.2} best=[{}]",
                searched.win_rate, searched.score_lead, best.join(", ")
            );

            if !padded {
                assert!(raw.move_suggestions.iter().all(|s| on_board(&s.move_str, real)));
                assert!(searched.move_suggestions.iter().all(|s| on_board(&s.move_str, real)));
                let total: f32 = raw.move_suggestions.iter().map(|s| s.probability).sum();
                assert!(total > 0.5, "the ranked moves hold {total} of the policy");
                assert_eq!(searched.ownership.as_ref().map(Vec::len), Some(13 * 13));
            }
        }
    }
}
