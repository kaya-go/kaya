//! Processing of raw ONNX inference outputs into structured results

use super::featurization::{determine_next_player, ko_ban};
use super::types::{AnalysisOptions, AnalysisResult, BoardShape, MoveSuggestion, OnnxOutputs};
use super::OnnxEngine;

/// Process one position's raw inference outputs into an AnalysisResult, for a
/// position on a board of `shape`.
///
/// Moves are ranked among the points of the board and the pass only, as
/// KataGo's softmax runs over legal moves only, and named on the square input
/// (row = side - y). Ownership is indexed on that square, 0 past the board's edge.
fn process_raw_outputs(
    policy: &[f32],
    value: &[f32],
    miscvalue: &[f32],
    ownership: Option<&[f32]>,
    policy_dims: &[usize],
    pla: i8,
    shape: BoardShape,
) -> Result<AnalysisResult, String> {
    let side = shape.side;
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

    // The points of the board, then the pass; never a point past its edge.
    let pass = side * side;
    let mut indices: Vec<usize> = (0..shape.height)
        .flat_map(|y| (0..shape.width).map(move |x| y * side + x))
        .chain(std::iter::once(pass))
        .filter(|&idx| idx < policy_slice.len())
        .collect();

    // Policy softmax over the moves of the board
    let max_logit = indices.iter().map(|&i| policy_slice[i]).fold(f32::NEG_INFINITY, f32::max);
    let mut probs = vec![0.0f32; policy_slice.len()];
    for &i in &indices {
        probs[i] = (policy_slice[i] - max_logit).exp();
    }
    let sum_probs: f32 = indices.iter().map(|&i| probs[i]).sum();
    // A NaN or infinite logit (an fp16 overflow, a broken GPU path) makes the
    // sum NaN. Refuse it, so a warm-up on such a backend fails and the chain
    // moves on, rather than ranking NaN probabilities.
    if !sum_probs.is_finite() || sum_probs <= 0.0 {
        return Err("The model returned a policy that is not a finite number".to_string());
    }
    for &i in &indices {
        probs[i] /= sum_probs;
    }

    // Top 10 moves
    indices.sort_by(|&a, &b| probs[b].total_cmp(&probs[a]));

    let move_suggestions: Vec<MoveSuggestion> = indices
        .iter()
        .take(10)
        .map(|&idx| {
            let move_str = if idx == pass {
                "PASS".to_string()
            } else {
                shape.move_name(idx % side, idx / side)
            };
            MoveSuggestion { move_str, probability: probs[idx] }
        })
        .collect();

    // Ownership: KataGo ONNX head is pre-tanh; pla flips current-player → Black.
    let ownership_out = ownership.map(|own| {
        own[..pass.min(own.len())]
            .iter()
            .enumerate()
            .map(|(i, v)| {
                let on_board = i % side < shape.width && i / side < shape.height;
                if on_board { v.tanh() * (pla as f32) } else { 0.0 }
            })
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

/// Remove the ko-forbidden recapture from a policy result. The policy covers
/// every move, so the legal ones share 1 - p(ko): each is divided by that. A
/// result that does not list the recapture comes back as it is.
pub(crate) fn drop_ko_move(result: &AnalysisResult, ko_move: &str) -> AnalysisResult {
    let Some(ko) = result.move_suggestions.iter().find(|s| s.move_str == ko_move) else {
        return result.clone();
    };
    let legal = 1.0 - ko.probability;
    let move_suggestions = result.move_suggestions.iter()
        .filter(|s| s.move_str != ko_move)
        .map(|s| {
            let mut s = s.clone();
            if legal > 0.0 { s.probability /= legal; }
            s
        })
        .collect();
    AnalysisResult { move_suggestions, ..result.clone() }
}

/// `result` for `sign_map` without the recapture `options`' ko forbids to the
/// side to play.
pub(crate) fn without_ko_recapture(
    result: &AnalysisResult,
    sign_map: &[Vec<i8>],
    options: &AnalysisOptions,
) -> AnalysisResult {
    let shape = BoardShape::of(sign_map);
    let pla = determine_next_player(sign_map, options);
    match ko_ban(options, pla, shape) {
        Some((x, y)) => drop_ko_move(result, &shape.move_name(x, y)),
        None => result.clone(),
    }
}

impl OnnxEngine {
    /// Process single inference result
    pub(crate) fn process_results(
        &self,
        outputs: &OnnxOutputs,
        pla: i8,
        shape: BoardShape,
    ) -> Result<AnalysisResult, String> {
        let results = self.process_batch_results(outputs, &[pla], shape)?;
        results.into_iter().next().ok_or("No results".to_string())
    }

    /// Process batch inference results, every position on a board of `shape`
    pub(crate) fn process_batch_results(
        &self,
        outputs: &OnnxOutputs,
        plas: &[i8],
        shape: BoardShape,
    ) -> Result<Vec<AnalysisResult>, String> {
        process_batch_outputs(outputs, plas, shape)
    }
}

/// One batch item's slice of a model output. A custom model with other heads
/// or shapes gives shorter outputs than KataGo's, and slicing past their end
/// panicked under the engine lock.
fn item_slice<'a>(
    data: &'a [f32],
    item: usize,
    stride: usize,
    len: usize,
    head: &str,
) -> Result<&'a [f32], String> {
    let start = item * stride;
    data.get(start..start + len).ok_or_else(|| {
        format!(
            "The model's '{}' output has {} values, too few for batch item {} ({} each)",
            head,
            data.len(),
            item,
            stride
        )
    })
}

/// Split batched outputs into one result per position, all on a board of `shape`.
fn process_batch_outputs(
    outputs: &OnnxOutputs,
    plas: &[i8],
    shape: BoardShape,
) -> Result<Vec<AnalysisResult>, String> {
    let size = shape.side;
    let batch_size = plas.len();
    if batch_size == 0 {
        return Ok(vec![]);
    }

    // [batch, heads, moves] or [batch, moves]; only the first head is used.
    let (num_policy_heads, num_moves) = match outputs.policy_dims.as_slice() {
        [_, heads, moves] => (*heads, *moves),
        [_, moves] => (1, *moves),
        dims => return Err(format!("Unexpected policy output shape {:?}", dims)),
    };
    let policy_stride = num_policy_heads * num_moves;
    let value_stride = 3;
    // KataGo exports 10 misc values, older nets fewer: use what the model gives.
    let miscvalue_stride = outputs.miscvalue.len() / batch_size;
    let ownership_stride = size * size;

    let mut results = Vec::with_capacity(batch_size);

    for (b, &pla) in plas.iter().enumerate() {
        let ownership_slice = match &outputs.ownership {
            Some(own) => Some(item_slice(own, b, ownership_stride, ownership_stride, "ownership")?),
            None => None,
        };

        let result = process_raw_outputs(
            item_slice(&outputs.policy, b, policy_stride, num_moves, "policy")?,
            item_slice(&outputs.value, b, value_stride, value_stride, "value")?,
            item_slice(&outputs.miscvalue, b, miscvalue_stride, miscvalue_stride, "miscvalue")?,
            ownership_slice,
            &[1, num_moves],
            pla,
            shape,
        )?;

        results.push(result);
    }

    Ok(results)
}

#[cfg(test)]
mod tests {
    use super::{process_batch_outputs, process_raw_outputs, without_ko_recapture};
    use crate::onnx_engine::types::{
        AnalysisOptions, AnalysisResult, BoardShape, KoInfo, MoveSuggestion, OnnxOutputs,
    };

    const SQUARE_2: BoardShape = BoardShape { width: 2, height: 2, side: 2 };

    fn outputs(policy_dims: Vec<usize>, miscvalue: usize, ownership: Option<usize>) -> OnnxOutputs {
        let batch = policy_dims[0];
        OnnxOutputs {
            policy: vec![0.0; policy_dims.iter().product()],
            value: vec![0.0; batch * 3],
            miscvalue: vec![0.0; miscvalue],
            ownership: ownership.map(|n| vec![0.0; n]),
            policy_dims,
        }
    }

    /// Shapes other than KataGo's sliced past the end of an output and panicked
    /// under the engine lock. A shorter misc head is fine, the rest an error.
    #[test]
    fn batch_outputs_of_another_shape_are_an_error_not_a_panic() {
        // Two 2x2 positions: 5 moves each, one policy head.
        let ok = process_batch_outputs(&outputs(vec![2, 1, 5], 2 * 6, Some(2 * 4)), &[1, -1], SQUARE_2);
        assert_eq!(ok.map(|r| r.len()), Ok(2));

        let short_ownership = outputs(vec![2, 1, 5], 2 * 10, Some(4));
        let err = process_batch_outputs(&short_ownership, &[1, -1], SQUARE_2).unwrap_err();
        assert!(err.contains("ownership"), "{err}");

        let flat_policy = outputs(vec![5], 10, None);
        let err = process_batch_outputs(&flat_policy, &[1], SQUARE_2).unwrap_err();
        assert!(err.contains("policy"), "{err}");
    }

    /// Full-game analysis on desktop goes through the batch command, which
    /// listed the forbidden recapture: nothing told it about the ko.
    #[test]
    fn the_batch_command_drops_the_recapture_the_ko_forbids() {
        let result = AnalysisResult {
            move_suggestions: [("B1", 0.5f32), ("E5", 0.3)].iter()
                .map(|&(m, p)| MoveSuggestion { move_str: m.to_string(), probability: p })
                .collect(),
            win_rate: 0.5,
            score_lead: 0.0,
            current_turn: "B".to_string(),
            ownership: None,
        };
        let board = vec![vec![0i8; 9]; 9];
        let ko = |sign| AnalysisOptions {
            next_to_play: Some("B".to_string()),
            ko_info: Some(KoInfo { sign, vertex: [1, 8] }),
            ..Default::default()
        };

        let moves = |options| -> Vec<String> {
            without_ko_recapture(&result, &board, &options).move_suggestions.into_iter()
                .map(|s| s.move_str)
                .collect()
        };
        assert_eq!(moves(ko(1)), vec!["E5"]);
        // A ko that binds White leaves Black's moves alone.
        assert_eq!(moves(ko(-1)), vec!["B1", "E5"]);
    }

    #[test]
    fn ownership_is_tanh_squashed_and_black_centric() {
        let raw = [3.0f32, -2.5, 0.0, 0.5];
        for pla in [1i8, -1] {
            let result = process_raw_outputs(
                &[0.0; 5],
                &[0.0; 3],
                &[0.0; 10],
                Some(&raw),
                &[1, 1, 5],
                pla,
                SQUARE_2,
            )
            .unwrap();
            let own = result.ownership.unwrap();
            for (v, r) in own.iter().zip(raw) {
                assert!((v - r.tanh() * pla as f32).abs() < 1e-6);
                assert!((-1.0..=1.0).contains(v));
            }
        }
    }

    /// A NaN logit (an fp16 overflow, a broken GPU path) made the sort panic
    /// while the engine lock was held, which poisoned it.
    #[test]
    fn a_nan_policy_is_an_error_not_a_panic() {
        let mut policy = [0.0f32; 5];
        policy[2] = f32::NAN;
        let result = process_raw_outputs(&policy, &[0.0; 3], &[0.0; 10], None, &[1, 1, 5], 1, SQUARE_2);
        assert!(result.unwrap_err().contains("policy"));
    }

    /// A board smaller than the network's input: the network may still rank a
    /// point past its edge. Only points of the board and the pass are ranked,
    /// their probabilities summing to 1, and ownership is 0 past the edge.
    #[test]
    fn only_points_of_the_board_are_ranked() {
        // 1 wide, 2 high in a 2x2 input: indices 0 and 2 are on the board, 1
        // and 3 past its right edge, 4 is the pass.
        let shape = BoardShape { width: 1, height: 2, side: 2 };
        let result = process_raw_outputs(
            &[1.0, 5.0, 0.0, 4.0, -1.0],
            &[0.0; 3],
            &[0.0; 10],
            Some(&[3.0, 3.0, -2.0, -2.0]),
            &[1, 1, 5],
            1,
            shape,
        )
        .unwrap();

        let moves: Vec<&str> = result.move_suggestions.iter().map(|s| s.move_str.as_str()).collect();
        assert_eq!(moves, vec!["A2", "A1", "PASS"]);
        let total: f32 = result.move_suggestions.iter().map(|s| s.probability).sum();
        assert!((total - 1.0).abs() < 1e-6, "{total}");

        let own = result.ownership.unwrap();
        assert_eq!(own[1], 0.0);
        assert_eq!(own[3], 0.0);
        assert!((own[0] - 3.0f32.tanh()).abs() < 1e-6);
    }
}
