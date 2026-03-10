//! Data types for ONNX engine inference

use serde::{Deserialize, Serialize};

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
}

fn default_komi() -> f32 {
    7.5
}

impl Default for AnalysisOptions {
    fn default() -> Self {
        Self {
            komi: 7.5,
            next_to_play: None,
            history: vec![],
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
