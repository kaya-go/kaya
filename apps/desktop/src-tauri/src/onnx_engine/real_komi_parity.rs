//! KataGo's komi parity input (global 18) through a real model, which CI never
//! runs. It prints the values the engine gives a few positions, to compare a
//! build without the input and one with it:
//!
//! ```sh
//! KAYA_TEST_MODEL=/path/to/katago-latest.onnx \
//!     cargo test --release --lib real_komi_parity -- --ignored --nocapture
//! ```
//!
//! The parity wave is 0 for an integer komi, so komi 7 prints the same values
//! in both builds: it is the control.

use std::path::Path;

use super::mcts::MCTSAnalysisOptions;
use super::types::{AnalysisOptions, HistoryMove};
use super::OnnxEngine;

/// A position as rows of X (Black), O (White) and `.`, its last five moves as
/// (color, x, y).
struct Position {
    rows: &'static [&'static str],
    black_to_play: bool,
    last_moves: &'static [(i8, i32, i32)],
}

impl Position {
    fn sign_map(&self) -> Vec<Vec<i8>> {
        self.rows.iter()
            .map(|row| row.chars().map(|c| match c { 'X' => 1, 'O' => -1, _ => 0 }).collect())
            .collect()
    }

    fn history(&self) -> Vec<HistoryMove> {
        self.last_moves.iter().map(|&(color, x, y)| HistoryMove { color, x, y }).collect()
    }
}

const EMPTY_9X9: Position = Position {
    rows: &["........."; 9],
    black_to_play: true,
    last_moves: &[],
};

/// Move 30 of a 9x9 game the model played against itself.
const SELFPLAY_9X9_MOVE_30: Position = Position {
    rows: &[
        ".O.X.....",
        ".XO.O.X..",
        "..XO.OX..",
        "..XX.OX..",
        ".X.XXXOXX",
        "XOO.OOOOO",
        "...O.....",
        ".........",
        ".........",
    ],
    black_to_play: true,
    last_moves: &[(-1, 1, 0), (1, 3, 0), (-1, 1, 5), (1, 0, 5), (-1, 8, 5)],
};

/// Move 48 of `packages/ai-engine/test-data/game-black-19.sgf`, a balanced
/// position.
const GAME_BLACK_19_MOVE_48: Position = Position {
    rows: &[
        "...................",
        "...................",
        "...X.X.......O.....",
        "..X............O...",
        "..OO............O..",
        "...............XX..",
        "...................",
        "...................",
        "..O................",
        "................X..",
        "...................",
        ".O.................",
        "..X........XO......",
        ".OX.......OXOX..O..",
        ".OX.....XXXO.......",
        "..OX.....XOO...O...",
        "..OX.X..OXXO.X..O..",
        "..OOX..........X...",
        "...................",
    ],
    black_to_play: true,
    last_moves: &[(-1, 11, 14), (1, 9, 14), (-1, 12, 13), (1, 11, 12), (-1, 12, 12)],
};

#[test]
#[ignore = "needs a real model, see KAYA_TEST_MODEL"]
fn real_komi_parity_values() {
    let model = std::env::var("KAYA_TEST_MODEL").expect("KAYA_TEST_MODEL must point at a model");
    let mut engine = OnnxEngine::new(Path::new(&model)).expect("engine should load");

    let cases: [(&str, &Position, f32); 7] = [
        ("empty 9x9", &EMPTY_9X9, 6.5),
        ("empty 9x9", &EMPTY_9X9, 7.0),
        ("empty 9x9", &EMPTY_9X9, 7.5),
        ("9x9 self-play move 30", &SELFPLAY_9X9_MOVE_30, 7.5),
        ("9x9 self-play move 30", &SELFPLAY_9X9_MOVE_30, 7.0),
        ("19x19 game-black-19 move 48", &GAME_BLACK_19_MOVE_48, 6.5),
        ("19x19 game-black-19 move 48", &GAME_BLACK_19_MOVE_48, 7.0),
    ];
    for (label, position, komi) in cases {
        let sign_map = position.sign_map();
        let next_to_play = Some(if position.black_to_play { "B" } else { "W" }.to_string());
        let options = AnalysisOptions {
            komi,
            next_to_play: next_to_play.clone(),
            history: position.history(),
            ko_info: None,
        };
        let raw = engine.analyze(&sign_map, &options).expect("analysis should run");
        let search = MCTSAnalysisOptions {
            komi,
            next_to_play,
            history: position.history(),
            num_visits: 200,
            include_move: None,
            ko_info: None,
        };
        let searched = engine.run_mcts(&sign_map, &search, &|| false, &mut |_| {}).expect("search should run");
        eprintln!(
            "{label}, komi {komi}: network {:.1}% / {:+.2} ({}), 200 visits {:.1}% / {:+.2} ({})",
            raw.win_rate * 100.0,
            raw.score_lead,
            raw.move_suggestions[0].move_str,
            searched.win_rate * 100.0,
            searched.score_lead,
            searched.move_suggestions[0].move_str,
        );
    }
}
