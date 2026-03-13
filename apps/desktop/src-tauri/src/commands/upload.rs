//! Model upload and cache management commands

use base64::{engine::general_purpose::STANDARD as BASE64, Engine as Base64Engine};
use std::fs::{File, OpenOptions};
use std::io::Write;
use std::path::PathBuf;
use std::sync::Mutex;
use tauri::Manager;

use crate::onnx_engine;

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
#[tauri::command]
pub async fn onnx_start_upload() -> Result<String, String> {
    let path = get_model_temp_path();
    
    File::create(&path)
        .map_err(|e| format!("Failed to create temp file: {}", e))?;
    
    let mut upload_path = MODEL_UPLOAD_PATH.lock().unwrap();
    *upload_path = Some(path.clone());
    
    Ok(path.to_string_lossy().to_string())
}

/// Upload a chunk of the model (base64 encoded for efficient IPC)
#[tauri::command]
pub async fn onnx_upload_chunk(chunk_base64: String) -> Result<(), String> {
    let path = {
        let upload_path = MODEL_UPLOAD_PATH.lock().unwrap();
        upload_path.clone().ok_or("No upload in progress")?
    };
    
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

/// Result from caching a downloaded model file.
#[derive(serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CacheResult {
    pub path: String,
    pub size: u64,
}

/// Cache a downloaded temp file directly to the models directory.
/// Returns the cached file path and size. This avoids the JS round-trip of reading
/// the file into memory and then uploading it back via chunked IPC.
#[tauri::command]
pub async fn onnx_cache_downloaded_file(
    temp_path: String,
    model_id: String,
    app_handle: tauri::AppHandle,
) -> Result<CacheResult, String> {
    sanitize_model_id(&model_id)?;

    let src = std::path::Path::new(&temp_path);
    if !src.exists() {
        return Err(format!("Temp file not found: {}", temp_path));
    }

    let file_size = std::fs::metadata(src)
        .map_err(|e| format!("Failed to read temp file metadata: {}", e))?
        .len();

    let app_data = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| format!("Failed to get app data dir: {}", e))?;
    let models_dir = app_data.join("models");
    std::fs::create_dir_all(&models_dir)
        .map_err(|e| format!("Failed to create models dir: {}", e))?;

    let cached_path = models_dir.join(format!("{}.onnx", model_id));

    std::fs::rename(src, &cached_path)
        .or_else(|_| {
            std::fs::copy(src, &cached_path)?;
            std::fs::remove_file(src)
        })
        .map_err(|e| format!("Failed to cache model: {}", e))?;

    Ok(CacheResult {
        path: cached_path.to_string_lossy().to_string(),
        size: file_size,
    })
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
        Ok(false)
    }
}
