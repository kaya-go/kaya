//! Data types for ONNX engine inference

use serde::{Deserialize, Serialize};

pub use super::mcts::KoInfo;

/// Column letters of GTP move names (no I).
pub const LETTERS: &str = "ABCDEFGHJKLMNOPQRST";

/// A position's board and the square input the network sees it in, as
/// `BoardShape` in `@kaya/ai-engine`.
///
/// A request carries the game's own board, `height` rows of `width` points.
/// The network takes a square of side `side`, the longer one: the board sits
/// in its top-left corner and input plane 0 marks its points, as KataGo's
/// `fillRowV7` does. Moves are named on the square (GTP row = side - y) and
/// ownership is indexed on it (y * side + x).
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct BoardShape {
    pub width: usize,
    pub height: usize,
    pub side: usize,
}

impl BoardShape {
    /// The shape of a board, from its rows (see `validate_board` for the checks).
    pub fn of(sign_map: &[Vec<i8>]) -> Self {
        let height = sign_map.len();
        let width = sign_map.first().map_or(0, |row| row.len());
        Self { width, height, side: width.max(height) }
    }

    /// Whether (x, y) is a point of the board.
    pub fn contains(&self, x: i32, y: i32) -> bool {
        x >= 0 && y >= 0 && (x as usize) < self.width && (y as usize) < self.height
    }

    /// The GTP name of a point of the board.
    pub fn move_name(&self, x: usize, y: usize) -> String {
        format!("{}{}", LETTERS.chars().nth(x).unwrap_or('?'), self.side - y)
    }

    /// The point a GTP move names, if it is a point of the board: None for a
    /// pass, a malformed name, or a point past the edge.
    pub fn parse_move(&self, move_str: &str) -> Option<(usize, usize)> {
        let letter = move_str.chars().next()?.to_ascii_uppercase();
        let x = LETTERS.find(letter)?;
        let row: usize = move_str.get(1..)?.parse().ok()?;
        let y = self.side.checked_sub(row)?;
        (row > 0 && x < self.width && y < self.height).then_some((x, y))
    }
}

/// A move suggestion from the AI
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MoveSuggestion {
    /// Move in GTP format (e.g., "D4", "Q16", "PASS")
    #[serde(rename = "move")]
    pub move_str: String,
    /// Policy probability (0.0 to 1.0)
    pub probability: f32,
}

/// Analysis result for a board position
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AnalysisResult {
    /// Top move suggestions
    pub move_suggestions: Vec<MoveSuggestion>,
    /// Win rate from Black's perspective (0.0 to 1.0)
    pub win_rate: f32,
    /// Score lead from Black's perspective (positive = Black ahead)
    pub score_lead: f32,
    /// Current turn ('B' or 'W')
    pub current_turn: String,
    /// Ownership map (size*size, values -1 to 1 from Black's perspective)
    #[serde(skip_serializing_if = "Option::is_none")]
    pub ownership: Option<Vec<f32>>,
}

/// History move entry
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HistoryMove {
    /// Stone color: 1 = Black, -1 = White
    pub color: i8,
    /// X coordinate (0-18 for 19x19, -1 for pass)
    pub x: i32,
    /// Y coordinate (0-18 for 19x19, -1 for pass)
    pub y: i32,
}

/// Analysis options
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AnalysisOptions {
    /// Komi value (default: 7.5)
    #[serde(default = "default_komi")]
    pub komi: f32,
    /// Next player to move ('B' or 'W')
    pub next_to_play: Option<String>,
    /// Move history for history features
    #[serde(default)]
    pub history: Vec<HistoryMove>,
    /// The ko, if any: `sign` may not play at `vertex` this move. Sets the
    /// network's ko input plane, and the analysis commands drop the move.
    #[serde(default)]
    pub ko_info: Option<KoInfo>,
}

/// Mirrors `DEFAULT_KOMI` in `@kaya/ai-engine`.
fn default_komi() -> f32 {
    7.5
}

impl Default for AnalysisOptions {
    fn default() -> Self {
        Self {
            komi: default_komi(),
            next_to_play: None,
            history: vec![],
            ko_info: None,
        }
    }
}

/// Internal struct for ONNX outputs
pub(crate) struct OnnxOutputs {
    pub policy: Vec<f32>,
    pub value: Vec<f32>,
    pub miscvalue: Vec<f32>,
    pub ownership: Option<Vec<f32>>,
    pub policy_dims: Vec<usize>,
}
