//! PyTorch GPU engine commands (Linux only)

use crate::onnx_engine;
use serde::{Deserialize, Serialize};

/// Input for batch analysis
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BatchInput {
    pub sign_map: Vec<Vec<i8>>,
    #[serde(default)]
    pub options: onnx_engine::AnalysisOptions,
}

/// Check if PyTorch GPU inference is available
#[tauri::command]
pub fn pytorch_is_available() -> bool {
    #[cfg(target_os = "linux")]
    {
        crate::pytorch_engine::is_pytorch_available()
    }
    #[cfg(not(target_os = "linux"))]
    {
        false
    }
}

/// Initialize PyTorch GPU engine with a model file
#[tauri::command]
pub async fn pytorch_initialize(model_path: String) -> Result<serde_json::Value, String> {
    #[cfg(target_os = "linux")]
    {
        let abs_path = std::fs::canonicalize(&model_path)
            .map_err(|e| format!("Invalid model path: {}", e))?;
        if !abs_path.exists() {
            return Err("Model file does not exist".to_string());
        }
        let path_str = abs_path.to_string_lossy().to_string();
        tokio::task::spawn_blocking(move || {
            let info = crate::pytorch_engine::initialize_engine(&path_str)?;
            serde_json::to_value(info).map_err(|e| e.to_string())
        })
        .await
        .map_err(|e| format!("Task failed: {}", e))?
    }
    #[cfg(not(target_os = "linux"))]
    {
        let _ = model_path;
        Err("PyTorch GPU engine is only available on Linux".to_string())
    }
}

/// Run PyTorch inference on a single position
#[tauri::command]
pub async fn pytorch_analyze(
    sign_map: Vec<Vec<i8>>,
    options: onnx_engine::AnalysisOptions,
) -> Result<onnx_engine::AnalysisResult, String> {
    #[cfg(target_os = "linux")]
    {
        tokio::task::spawn_blocking(move || {
            let pla = onnx_engine::determine_next_player(&sign_map, &options);
            let (bin_input, global_input) = onnx_engine::featurize_position(
                &sign_map, pla, options.komi, &options.history,
            );
            let result = crate::pytorch_engine::run_inference(&bin_input, &global_input, 1)?;
            onnx_engine::process_raw_outputs(
                &result.policy,
                &result.value,
                &result.miscvalue,
                result.ownership.as_deref(),
                &result.policy_dims,
                pla,
                sign_map.len(),
            )
        })
        .await
        .map_err(|e| format!("Task failed: {}", e))?
    }
    #[cfg(not(target_os = "linux"))]
    {
        let _ = (sign_map, options);
        Err("PyTorch GPU engine is only available on Linux".to_string())
    }
}

/// Run PyTorch batch inference
#[tauri::command]
pub async fn pytorch_analyze_batch(inputs: Vec<BatchInput>) -> Result<Vec<onnx_engine::AnalysisResult>, String> {
    #[cfg(target_os = "linux")]
    {
        tokio::task::spawn_blocking(move || {
            if inputs.is_empty() {
                return Ok(vec![]);
            }
            let board_size = inputs[0].sign_map.len();

            let mut all_bin = Vec::new();
            let mut all_global = Vec::new();
            let mut plas = Vec::new();
            for input in &inputs {
                let pla = onnx_engine::determine_next_player(&input.sign_map, &input.options);
                plas.push(pla);
                let (bin, global) = onnx_engine::featurize_position(
                    &input.sign_map, pla, input.options.komi, &input.options.history,
                );
                all_bin.extend(bin);
                all_global.extend(global);
            }

            let batch_size = inputs.len();
            let result = crate::pytorch_engine::run_inference(&all_bin, &all_global, batch_size)?;

            let policy_per_item = if result.policy_dims.len() >= 2 {
                result.policy_dims.iter().skip(1).product::<usize>()
            } else {
                result.policy.len() / batch_size
            };
            let value_per_item = 3;
            let miscvalue_per_item = if result.miscvalue.len() >= batch_size * 10 { 10 } else { result.miscvalue.len() / batch_size };
            let ownership_per_item = board_size * board_size;

            let mut results = Vec::with_capacity(batch_size);
            for b in 0..batch_size {
                let policy_start = b * policy_per_item;
                let policy_end = (policy_start + policy_per_item).min(result.policy.len());
                let value_start = b * value_per_item;
                let value_end = (value_start + value_per_item).min(result.value.len());
                let misc_start = b * miscvalue_per_item;
                let misc_end = (misc_start + miscvalue_per_item).min(result.miscvalue.len());

                let ownership_slice = result.ownership.as_ref().map(|own| {
                    let start = b * ownership_per_item;
                    let end = (start + ownership_per_item).min(own.len());
                    &own[start..end]
                });

                let item_policy_dims = if result.policy_dims.len() >= 2 {
                    let mut dims = result.policy_dims.clone();
                    dims[0] = 1;
                    dims
                } else {
                    vec![1, policy_per_item]
                };

                let r = onnx_engine::process_raw_outputs(
                    &result.policy[policy_start..policy_end],
                    &result.value[value_start..value_end],
                    &result.miscvalue[misc_start..misc_end],
                    ownership_slice,
                    &item_policy_dims,
                    plas[b],
                    board_size,
                )?;
                results.push(r);
            }
            Ok(results)
        })
        .await
        .map_err(|e| format!("Task failed: {}", e))?
    }
    #[cfg(not(target_os = "linux"))]
    {
        let _ = inputs;
        Err("PyTorch GPU engine is only available on Linux".to_string())
    }
}

/// Run PyTorch benchmark
#[tauri::command]
pub async fn pytorch_benchmark() -> Result<serde_json::Value, String> {
    #[cfg(target_os = "linux")]
    {
        tokio::task::spawn_blocking(|| {
            let result = crate::pytorch_engine::benchmark(30)?;
            serde_json::to_value(result).map_err(|e| e.to_string())
        })
        .await
        .map_err(|e| format!("Task failed: {}", e))?
    }
    #[cfg(not(target_os = "linux"))]
    {
        Err("PyTorch GPU engine is only available on Linux".to_string())
    }
}

/// Dispose PyTorch engine
#[tauri::command]
pub async fn pytorch_dispose() -> Result<(), String> {
    #[cfg(target_os = "linux")]
    {
        tokio::task::spawn_blocking(crate::pytorch_engine::dispose_engine)
            .await
            .map_err(|e| format!("Task failed: {}", e))?
    }
    #[cfg(not(target_os = "linux"))]
    {
        Ok(())
    }
}
