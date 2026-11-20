//! Tauri commands for native ONNX inference and related functionality

mod download;
mod model_files;
mod pytorch;
mod updater;
mod upload;

// Re-export submodule commands. For commands with #[cfg] variants,
// we re-export the module itself so Tauri can find the proc-macro symbols.
pub use download::*;
pub use pytorch::*;
pub use updater::*;
pub use upload::*;

use crate::onnx_engine::{self, AnalysisOptions, AnalysisResult, ExecutionProviderInfo, ExecutionProviderPreference};
use crate::onnx_engine::mcts::{MCTSAnalysisOptions, MCTSAnalysisResult, MCTSProgress};
use base64::{engine::general_purpose::STANDARD as BASE64, Engine as Base64Engine};
use serde::Serialize;
use tauri::Emitter;

/// Initialize the ONNX engine with model bytes (raw Vec<u8>)
#[tauri::command]
pub async fn onnx_initialize(model_bytes: Vec<u8>) -> Result<(), String> {
    tokio::task::spawn_blocking(move || onnx_engine::initialize_engine(&model_bytes))
        .await
        .map_err(|e| format!("Task failed: {}", e))?
}

/// Initialize the ONNX engine with base64-encoded model bytes
#[tauri::command]
pub async fn onnx_initialize_base64(model_base64: String) -> Result<(), String> {
    tokio::task::spawn_blocking(move || {
        let model_bytes = BASE64
            .decode(&model_base64)
            .map_err(|e| format!("Failed to decode base64: {}", e))?;
        onnx_engine::initialize_engine(&model_bytes)
    })
    .await
    .map_err(|e| format!("Task failed: {}", e))?
}

/// Initialize the ONNX engine from a file path
#[tauri::command]
pub async fn onnx_initialize_from_path(model_path: String) -> Result<(), String> {
    tokio::task::spawn_blocking(move || onnx_engine::initialize_engine_from_path(&model_path))
        .await
        .map_err(|e| format!("Task failed: {}", e))?
}

/// Analyze a single position
#[tauri::command]
pub async fn onnx_analyze(
    sign_map: Vec<Vec<i8>>,
    options: AnalysisOptions,
) -> Result<AnalysisResult, String> {
    tokio::task::spawn_blocking(move || onnx_engine::analyze_position(sign_map, options))
        .await
        .map_err(|e| format!("Task failed: {}", e))?
}

/// Analyze multiple positions in a batch
#[tauri::command]
pub async fn onnx_analyze_batch(inputs: Vec<BatchInput>) -> Result<Vec<AnalysisResult>, String> {
    tokio::task::spawn_blocking(move || {
        let batch: Vec<(Vec<Vec<i8>>, AnalysisOptions)> = inputs
            .into_iter()
            .map(|i| (i.sign_map, i.options))
            .collect();
        onnx_engine::analyze_batch(batch)
    })
    .await
    .map_err(|e| format!("Task failed: {}", e))?
}

/// A new id for an MCTS search: pass it to `onnx_analyze_mcts`, and to
/// `onnx_abort_mcts` to stop that search.
#[tauri::command]
pub fn onnx_mcts_request_id() -> u64 {
    onnx_engine::next_mcts_request()
}

/// An "mcts-progress" event. Every search emits on that one event name, so a
/// search's listener keeps the events of its own `request_id`: one that an
/// earlier search emitted can still be on its way.
#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct SearchProgress<'a> {
    request_id: u64,
    #[serde(flatten)]
    progress: &'a MCTSProgress,
}

/// Run full MCTS search in Rust (eliminates per-batch IPC overhead).
/// Progress updates are sent via the Tauri event system.
#[tauri::command]
pub async fn onnx_analyze_mcts(
    app: tauri::AppHandle,
    request_id: u64,
    sign_map: Vec<Vec<i8>>,
    options: MCTSAnalysisOptions,
) -> Result<MCTSAnalysisResult, String> {
    tokio::task::spawn_blocking(move || {
        let mut progress_cb = |progress: MCTSProgress| {
            let _ = app.emit("mcts-progress", SearchProgress { request_id, progress: &progress });
        };
        onnx_engine::run_mcts_analysis(request_id, sign_map, options, &mut progress_cb)
    })
    .await
    .map_err(|e| format!("Task failed: {}", e))?
}

/// Abort the MCTS search `request_id` and any older one. It may run already,
/// wait for the engine, or not have reached Rust yet.
#[tauri::command]
pub fn onnx_abort_mcts(request_id: u64) {
    onnx_engine::abort_mcts(request_id);
}

/// Dispose the ONNX engine
#[tauri::command]
pub async fn onnx_dispose() -> Result<(), String> {
    tokio::task::spawn_blocking(onnx_engine::dispose_engine)
        .await
        .map_err(|e| format!("Task failed: {}", e))?
}

/// Check if the ONNX engine is initialized
#[tauri::command]
pub fn onnx_is_initialized() -> bool {
    onnx_engine::is_engine_initialized()
}

/// Get information about the current execution provider
#[tauri::command]
pub fn onnx_get_provider_info() -> Option<ExecutionProviderInfo> {
    onnx_engine::get_provider_info()
}

/// Get available execution providers for this platform
#[tauri::command]
pub fn onnx_get_available_providers() -> Vec<ExecutionProviderInfo> {
    onnx_engine::get_available_providers()
}

/// Set the preferred execution provider
#[tauri::command]
pub fn onnx_set_provider_preference(preference: String) -> Result<(), String> {
    let pref = match preference.as_str() {
        "auto" => ExecutionProviderPreference::Auto,
        "coreml" => ExecutionProviderPreference::CoreMl,
        "directml" => ExecutionProviderPreference::DirectMl,
        "nnapi" => ExecutionProviderPreference::Nnapi,
        "cpu" => ExecutionProviderPreference::Cpu,
        _ => return Err(format!("Unknown execution provider: {}", preference)),
    };
    onnx_engine::set_execution_provider_preference(pref);
    Ok(())
}

/// Get the current execution provider preference
#[tauri::command]
pub fn onnx_get_provider_preference() -> String {
    onnx_engine::preference_to_name(onnx_engine::get_execution_provider_preference())
}

#[cfg(test)]
mod tests {
    use super::*;

    /// `runNativeSearch` keeps an event only when its `requestId` names the
    /// search, and reads the progress fields next to it.
    #[test]
    fn a_progress_event_names_its_search() {
        let progress = MCTSProgress {
            completed_visits: 3,
            total_visits: 10,
            best_move: "D4".to_string(),
            best_move_visits: 2,
            win_rate: 0.5,
            score_lead: 1.5,
            top_moves: vec![],
        };
        let event = serde_json::to_value(SearchProgress { request_id: 7, progress: &progress }).unwrap();

        assert_eq!(event["requestId"], 7);
        assert_eq!(event["completedVisits"], 3);
        assert_eq!(event["bestMove"], "D4");
    }
}
