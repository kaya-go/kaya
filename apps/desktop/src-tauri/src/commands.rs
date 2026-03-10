//! Tauri commands for native ONNX inference
//!
//! These commands expose the Rust ONNX engine to the frontend,
//! providing high-performance AI analysis for the desktop app.

use crate::onnx_engine::{self, AnalysisOptions, AnalysisResult, ExecutionProviderInfo, ExecutionProviderPreference};
use base64::{engine::general_purpose::STANDARD as BASE64, Engine as Base64Engine};
use serde::{Deserialize, Serialize};
use std::fs::{File, OpenOptions};
use std::io::Write;
use std::path::PathBuf;
use std::sync::Mutex;
use tauri::Manager;
use tauri::Emitter;

/// Input for batch analysis
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BatchInput {
    pub sign_map: Vec<Vec<i8>>,
    #[serde(default)]
    pub options: AnalysisOptions,
}

/// State for chunked model upload
static MODEL_UPLOAD_PATH: Mutex<Option<PathBuf>> = Mutex::new(None);

/// Validate that a model_id contains no path traversal characters
fn sanitize_model_id(model_id: &str) -> Result<(), String> {
    if model_id.contains('/')
        || model_id.contains('\\')
        || model_id.contains("..")
        || model_id.is_empty()
    {
        return Err("Invalid model ID: must not contain path separators or '..'".to_string());
    }
    Ok(())
}

/// Get the temp file path for model upload
fn get_model_temp_path() -> PathBuf {
    std::env::temp_dir().join(format!("kaya-model-{}.onnx", std::process::id()))
}

/// Start a chunked model upload
/// Returns the temp file path where chunks will be written
#[tauri::command]
pub async fn onnx_start_upload() -> Result<String, String> {
    let path = get_model_temp_path();
    
    // Create/truncate the file
    File::create(&path)
        .map_err(|e| format!("Failed to create temp file: {}", e))?;
    
    // Store the path for subsequent chunks
    let mut upload_path = MODEL_UPLOAD_PATH.lock().unwrap();
    *upload_path = Some(path.clone());
    
    Ok(path.to_string_lossy().to_string())
}

/// Upload a chunk of the model (base64 encoded for efficient IPC)
/// Using base64 because JSON array serialization of bytes is very slow
#[tauri::command]
pub async fn onnx_upload_chunk(chunk_base64: String) -> Result<(), String> {
    let path = {
        let upload_path = MODEL_UPLOAD_PATH.lock().unwrap();
        upload_path.clone().ok_or("No upload in progress")?
    };
    
    // Decode base64 and write in a blocking task to not block the runtime
    tokio::task::spawn_blocking(move || {
        let chunk_bytes = BASE64
            .decode(&chunk_base64)
            .map_err(|e| format!("Failed to decode base64 chunk: {}", e))?;
        
        let mut file = OpenOptions::new()
            .append(true)
            .open(&path)
            .map_err(|e| format!("Failed to open temp file: {}", e))?;
        
        file.write_all(&chunk_bytes)
            .map_err(|e| format!("Failed to write chunk: {}", e))?;
        
        Ok::<(), String>(())
    })
    .await
    .map_err(|e| format!("Task failed: {}", e))?
}

/// Finish the upload and initialize the ONNX engine from the temp file
/// Optionally caches the model with a given ID for faster future loads
#[tauri::command]
pub async fn onnx_finish_upload(model_id: Option<String>, app_handle: tauri::AppHandle) -> Result<(), String> {
    let path_str = save_uploaded_model(model_id, &app_handle)?;
    
    tokio::task::spawn_blocking(move || {
        onnx_engine::initialize_engine_from_path(&path_str)
    })
    .await
    .map_err(|e| format!("Task failed: {}", e))?
}

/// Save the uploaded model to disk without initializing any engine.
/// Returns the path where the model was saved.
#[tauri::command]
pub async fn onnx_save_model(model_id: Option<String>, app_handle: tauri::AppHandle) -> Result<String, String> {
    save_uploaded_model(model_id, &app_handle)
}

/// Internal helper: move temp upload to cache location, return final path
fn save_uploaded_model(model_id: Option<String>, app_handle: &tauri::AppHandle) -> Result<String, String> {
    let temp_path = {
        let mut upload_path = MODEL_UPLOAD_PATH.lock().unwrap();
        upload_path.take().ok_or("No upload in progress")?
    };
    
    let final_path = if let Some(ref id) = model_id {
        sanitize_model_id(id)?;
        let app_data = app_handle.path().app_data_dir()
            .map_err(|e| format!("Failed to get app data dir: {}", e))?;
        let models_dir = app_data.join("models");
        std::fs::create_dir_all(&models_dir)
            .map_err(|e| format!("Failed to create models dir: {}", e))?;
        
        let cached_path = models_dir.join(format!("{}.onnx", id));
        
        std::fs::rename(&temp_path, &cached_path)
            .or_else(|_| {
                std::fs::copy(&temp_path, &cached_path)?;
                std::fs::remove_file(&temp_path)
            })
            .map_err(|e| format!("Failed to cache model: {}", e))?;
        
        cached_path
    } else {
        temp_path
    };
    
    Ok(final_path.to_string_lossy().to_string())
}

/// Check if a model is cached and return its path
#[tauri::command]
pub async fn onnx_get_cached_model(model_id: String, app_handle: tauri::AppHandle) -> Result<Option<String>, String> {
    sanitize_model_id(&model_id)?;
    let app_data = app_handle.path().app_data_dir()
        .map_err(|e| format!("Failed to get app data dir: {}", e))?;
    let cached_path = app_data.join("models").join(format!("{}.onnx", model_id));
    
    if cached_path.exists() {
        Ok(Some(cached_path.to_string_lossy().to_string()))
    } else {
        Ok(None)
    }
}

/// Delete a cached model from the app data directory
#[tauri::command]
pub async fn onnx_delete_cached_model(model_id: String, app_handle: tauri::AppHandle) -> Result<bool, String> {
    sanitize_model_id(&model_id)?;
    let app_data = app_handle.path().app_data_dir()
        .map_err(|e| format!("Failed to get app data dir: {}", e))?;
    let cached_path = app_data.join("models").join(format!("{}.onnx", model_id));
    
    if cached_path.exists() {
        std::fs::remove_file(&cached_path)
            .map_err(|e| format!("Failed to delete cached model: {}", e))?;
        Ok(true)
    } else {
        // Model wasn't cached, nothing to delete
        Ok(false)
    }
}

/// Initialize the ONNX engine with model bytes (raw Vec<u8>)
/// Note: This may be slow for large models due to JSON serialization
#[tauri::command]
pub async fn onnx_initialize(model_bytes: Vec<u8>) -> Result<(), String> {
    tokio::task::spawn_blocking(move || onnx_engine::initialize_engine(&model_bytes))
        .await
        .map_err(|e| format!("Task failed: {}", e))?
}

/// Initialize the ONNX engine with base64-encoded model bytes
/// This is faster for large models as strings serialize more efficiently than byte arrays
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
/// Note: This takes effect on the next engine initialization
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

// === PyTorch GPU engine commands (Linux only) ===

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
        // Validate model_path resolves to an actual file and isn't a traversal attack
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

/// Run PyTorch inference on a single position (using ONNX engine's featurization)
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

            // Featurize all positions and concatenate into batch tensors
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

            // Process batch results
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

                // Build per-item policy_dims (single item, not batch)
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

// === Model download command (uses reqwest for reliable streaming on all platforms) ===

/// Download a file from a URL and save it to a temp file, emitting progress events.
/// Downloads a file via reqwest (reliable streaming on all platforms).
/// Saves to a temp file and returns the path. Emits "download-progress" events.
#[cfg(desktop)]
#[tauri::command]
pub async fn download_file(app: tauri::AppHandle, url: String) -> Result<String, String> {
    use futures::StreamExt;
    use tokio::io::AsyncWriteExt;

    // Validate URL scheme
    if !url.starts_with("https://") {
        return Err("Only HTTPS URLs are allowed".to_string());
    }

    let client = reqwest::Client::builder()
        .redirect(reqwest::redirect::Policy::limited(10))
        .build()
        .map_err(|e| format!("Failed to create HTTP client: {}", e))?;

    let response = client
        .get(&url)
        .send()
        .await
        .map_err(|e| format!("Download request failed: {}", e))?;

    if !response.status().is_success() {
        return Err(format!("Download failed with status: {}", response.status()));
    }

    // Create temp file in system temp directory (matches Tauri fs:allow-temp-* scope)
    let temp_dir = std::env::temp_dir();
    let temp_path = temp_dir.join(format!("kaya_download_{}.tmp", std::process::id()));
    let temp_path_str = temp_path
        .to_str()
        .ok_or("Invalid temp path")?
        .to_string();

    let total_size = response.content_length().unwrap_or(0);
    let mut downloaded: u64 = 0;
    let mut stream = response.bytes_stream();
    let mut last_progress: u64 = 0;

    let mut file = tokio::fs::File::create(&temp_path)
        .await
        .map_err(|e| format!("Failed to create temp file: {}", e))?;

    // Emit initial progress
    let _ = app.emit(
        "download-progress",
        serde_json::json!({
            "downloaded": 0u64,
            "total": total_size,
            "percent": 0u64,
        }),
    );

    while let Some(chunk) = stream.next().await {
        let chunk = chunk.map_err(|e| format!("Error reading download stream: {}", e))?;
        downloaded += chunk.len() as u64;
        file.write_all(&chunk)
            .await
            .map_err(|e| format!("Failed to write to temp file: {}", e))?;

        if total_size > 0 {
            let percent = (downloaded * 100) / total_size;
            if percent > last_progress {
                last_progress = percent;
                let _ = app.emit(
                    "download-progress",
                    serde_json::json!({
                        "downloaded": downloaded,
                        "total": total_size,
                        "percent": percent,
                    }),
                );
            }
        }
    }

    file.flush()
        .await
        .map_err(|e| format!("Failed to flush temp file: {}", e))?;
    drop(file);

    // Emit completion
    let _ = app.emit(
        "download-progress",
        serde_json::json!({
            "downloaded": downloaded,
            "total": total_size,
            "percent": 100u64,
        }),
    );

    Ok(temp_path_str)
}
