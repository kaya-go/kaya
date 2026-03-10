//! Processing of raw ONNX inference outputs into structured results

use super::types::{AnalysisResult, MoveSuggestion, OnnxOutputs};
use super::OnnxEngine;

/// Process raw inference outputs into an AnalysisResult (standalone, no engine needed).
///
/// Used by both OnnxEngine and PyTorch engine.
pub fn process_raw_outputs(
    policy: &[f32],
    value: &[f32],
    miscvalue: &[f32],
    ownership: Option<&[f32]>,
    policy_dims: &[usize],
    pla: i8,
    board_size: usize,
) -> Result<AnalysisResult, String> {
    let letters = "ABCDEFGHJKLMNOPQRST";

    let num_moves = if policy_dims.len() == 3 {
        policy_dims[2]
    } else if policy_dims.len() >= 2 {
        policy_dims[1]
    } else {
        policy.len()
    };

    // Use only the first head's policy (first num_moves elements)
    let policy_slice = if policy.len() >= num_moves {
        &policy[..num_moves]
    } else {
        policy
    };

    // Win rate from value head
    if value.len() < 3 {
        return Err(format!("Value head too short: {} (need 3)", value.len()));
    }
    let exp_values: Vec<f32> = value[..3].iter().map(|v| v.exp()).collect();
    let sum_value: f32 = exp_values.iter().sum();
    let winrate_current = exp_values[0] / sum_value;
    let black_winrate = if pla == 1 { winrate_current } else { 1.0 - winrate_current };

    // Score lead
    let lead_current = if miscvalue.len() > 2 { miscvalue[2] * 20.0 } else { 0.0 };
    let black_lead = lead_current * (pla as f32);

    // Policy softmax
    let max_logit = policy_slice.iter().cloned().fold(f32::NEG_INFINITY, f32::max);
    let mut probs: Vec<f32> = policy_slice.iter().map(|p| (p - max_logit).exp()).collect();
    let sum_probs: f32 = probs.iter().sum();
    for p in &mut probs {
        *p /= sum_probs;
    }

    // Top 10 moves
    let mut indices: Vec<usize> = (0..probs.len()).collect();
    indices.sort_by(|&a, &b| probs[b].partial_cmp(&probs[a]).unwrap());

    let move_suggestions: Vec<MoveSuggestion> = indices
        .iter()
        .take(10)
        .map(|&idx| {
            let move_str = if idx == board_size * board_size {
                "PASS".to_string()
            } else {
                let y = idx / board_size;
                let x = idx % board_size;
                format!("{}{}", letters.chars().nth(x).unwrap_or('?'), board_size - y)
            };
            MoveSuggestion { move_str, probability: probs[idx] }
        })
        .collect();

    // Ownership
    let ownership_out = ownership.map(|own| {
        let stride = board_size * board_size;
        own[..stride.min(own.len())]
            .iter()
            .map(|v| v * (pla as f32))
            .collect()
    });

    Ok(AnalysisResult {
        move_suggestions,
        win_rate: black_winrate,
        score_lead: black_lead,
        current_turn: if pla == 1 { "B" } else { "W" }.to_string(),
        ownership: ownership_out,
    })
}

impl OnnxEngine {
    /// Process single inference result
    pub(crate) fn process_results(
        &self,
        outputs: &OnnxOutputs,
        pla: i8,
    ) -> Result<AnalysisResult, String> {
        let results = self.process_batch_results(outputs, &[pla])?;
        results.into_iter().next().ok_or("No results".to_string())
    }

    /// Process batch inference results
    pub(crate) fn process_batch_results(
        &self,
        outputs: &OnnxOutputs,
        plas: &[i8],
    ) -> Result<Vec<AnalysisResult>, String> {
        let size = self.board_size;
        let batch_size = plas.len();

        // Determine strides from dimensions
        let policy_dims = &outputs.policy_dims;
        let num_policy_heads = if policy_dims.len() == 3 {
            policy_dims[1]
        } else {
            1
        };
        let num_moves = if policy_dims.len() == 3 {
            policy_dims[2]
        } else {
            policy_dims[1]
        };
        let policy_stride = num_policy_heads * num_moves;
        let value_stride = 3;
        let miscvalue_stride = 10;
        let ownership_stride = size * size;

        let mut results = Vec::with_capacity(batch_size);

        for b in 0..batch_size {
            let pla = plas[b];

            let policy_start = b * policy_stride;
            let policy_end = policy_start + num_moves;
            let value_start = b * value_stride;
            let misc_start = b * miscvalue_stride;

            let ownership_slice = outputs.ownership.as_ref().map(|own| {
                let start = b * ownership_stride;
                &own[start..start + ownership_stride]
            });

            let result = process_raw_outputs(
                &outputs.policy[policy_start..policy_end],
                &outputs.value[value_start..value_start + 3],
                &outputs.miscvalue[misc_start..misc_start + miscvalue_stride],
                ownership_slice,
                &[1, num_moves],
                pla,
                size,
            )?;

            results.push(result);
        }

        Ok(results)
    }
}
