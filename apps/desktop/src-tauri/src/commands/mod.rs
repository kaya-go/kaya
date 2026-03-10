//! Tauri commands for native ONNX inference and related functionality

mod download;
mod pytorch;
mod upload;

// Re-export submodule commands. For commands with #[cfg] variants,
// we re-export the module itself so Tauri can find the proc-macro symbols.
pub use download::*;
pub use pytorch::*;
pub use upload::*;

use crate::onnx_engine::{self, AnalysisOptions, AnalysisResult, ExecutionProviderInfo, ExecutionProviderPreference};
use base64::{engine::general_purpose::STANDARD as BASE64, Engine as Base64Engine};

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
        "cuda" => ExecutionProviderPreference::Cuda,
        "migraphx" => ExecutionProviderPreference::MiGraphX,
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
    match onnx_engine::get_execution_provider_preference() {
        ExecutionProviderPreference::Auto => "auto",
        ExecutionProviderPreference::Cuda => "cuda",
        ExecutionProviderPreference::MiGraphX => "migraphx",
        ExecutionProviderPreference::CoreMl => "coreml",
        ExecutionProviderPreference::DirectMl => "directml",
        ExecutionProviderPreference::Nnapi => "nnapi",
        ExecutionProviderPreference::Cpu => "cpu",
    }.to_string()
}
