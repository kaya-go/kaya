//! Model upload and cache management commands

use base64::{engine::general_purpose::STANDARD as BASE64, Engine as Base64Engine};
use std::fs::{File, OpenOptions};
use std::io::Write;
use std::path::PathBuf;
use std::sync::Mutex;
use tauri::Manager;

use super::model_files::{install_model_file, is_download_temp, unique_temp_path};
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

/// Start a chunked model upload
#[tauri::command]
pub async fn onnx_start_upload() -> Result<String, String> {
    let path = unique_temp_path("kaya-model-", "onnx");

    // create_new: never write through a file someone else put at that name.
    OpenOptions::new()
        .write(true)
        .create_new(true)
        .open(&path)
        .map_err(|e| format!("Failed to create temp file: {}", e))?;

    // An upload abandoned halfway would otherwise stay in the temp dir.
    let abandoned = MODEL_UPLOAD_PATH.lock().unwrap().replace(path.clone());
    if let Some(old) = abandoned {
        let _ = std::fs::remove_file(old);
    }

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

        if let Err(e) = install_model_file(&temp_path, &cached_path) {
            let _ = std::fs::remove_file(&temp_path);
            return Err(format!("Failed to cache model: {}", e));
        }

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
    /// SHA-256 of the cached bytes, base64url without padding. Matches `sha256Base64Url`.
    pub hash: String,
}

/// SHA-256 of a file, encoded as base64url without padding.
///
/// Blocking: a model is 70 to 280 MB, so call it from `spawn_blocking`.
fn sha256_base64url(path: &std::path::Path) -> Result<String, String> {
    use sha2::{Digest, Sha256};

    let file = File::open(path).map_err(|e| format!("Failed to open cached model: {}", e))?;
    // The read buffer lives on the heap: a megabyte on the stack is half of a
    // runtime worker's.
    let mut reader = std::io::BufReader::with_capacity(1024 * 1024, file);
    let mut hasher = Sha256::new();
    std::io::copy(&mut reader, &mut hasher)
        .map_err(|e| format!("Failed to hash cached model: {}", e))?;
    Ok(Base64Engine::encode(
        &base64::engine::general_purpose::URL_SAFE_NO_PAD,
        hasher.finalize(),
    ))
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
    // This moves the file and deletes the source: only take what
    // `download_file` wrote, not any path the webview names.
    if !is_download_temp(src) {
        return Err(format!("Not a downloaded model file: {}", temp_path));
    }
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

    // Moving across filesystems copies the file, and hashing reads all of it:
    // both stay off the async runtime.
    let src = src.to_path_buf();
    tokio::task::spawn_blocking(move || {
        if let Err(e) = install_model_file(&src, &cached_path) {
            let _ = std::fs::remove_file(&src);
            return Err(format!("Failed to cache model: {}", e));
        }

        let hash = sha256_base64url(&cached_path)?;

        Ok(CacheResult {
            path: cached_path.to_string_lossy().to_string(),
            size: file_size,
            hash,
        })
    })
    .await
    .map_err(|e| format!("Task failed: {}", e))?
}

#[cfg(test)]
mod tests {
    use super::sha256_base64url;

    /// Same vector as `modelStorageHash.test.ts`: both sides must agree, or an
    /// upload never matches the copy a download stored.
    #[test]
    fn sha256_base64url_matches_the_js_encoding() {
        let path = std::env::temp_dir().join(format!("kaya-hash-{}.bin", std::process::id()));

        std::fs::write(&path, b"").unwrap();
        let empty = sha256_base64url(&path);
        std::fs::write(&path, b"abc").unwrap();
        let abc = sha256_base64url(&path);
        std::fs::remove_file(&path).unwrap();

        assert_eq!(empty.unwrap(), "47DEQpj8HBSa-_TImW-5JCeuQeRkm5NMpJWZG3hSuFU");
        assert_eq!(abc.unwrap(), "ungWv48Bz-pBQUDeXa4iI7ADYaOWF3qctBD_YfIAFa0");
    }

    /// See `read_model_file`: the bytes must cross the IPC raw, not as JSON.
    #[test]
    fn model_bytes_cross_the_ipc_raw() {
        use tauri::ipc::{InvokeResponseBody, IpcResponse};

        let path = std::env::temp_dir().join(format!("kaya-read-{}.onnx", std::process::id()));
        std::fs::write(&path, [0u8, 1, 254, 255]).unwrap();
        let response = tokio::runtime::Runtime::new()
            .unwrap()
            .block_on(super::read_model_file(&path));
        std::fs::remove_file(&path).unwrap();

        match response.unwrap().body().unwrap() {
            InvokeResponseBody::Raw(bytes) => assert_eq!(bytes, vec![0, 1, 254, 255]),
            InvokeResponseBody::Json(json) => panic!("bytes sent as JSON: {json}"),
        }
    }
}

/// A model found in the on-disk cache.
#[derive(serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CachedModel {
    /// Sanitized model ID (the file stem), as passed to `onnx_get_cached_model`.
    pub model_id: String,
    pub size: u64,
    /// Last-modified time, milliseconds since the Unix epoch (0 if unavailable).
    pub modified: u64,
}

/// List every model cached in the app data directory.
///
/// On desktop the disk cache — not IndexedDB — is the source of truth for
/// downloaded models (#103), so the frontend needs this to know what is
/// already downloaded after a restart (#123).
#[tauri::command]
pub async fn onnx_list_cached_models(
    app_handle: tauri::AppHandle,
) -> Result<Vec<CachedModel>, String> {
    let app_data = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| format!("Failed to get app data dir: {}", e))?;
    let models_dir = app_data.join("models");

    let entries = match std::fs::read_dir(&models_dir) {
        Ok(entries) => entries,
        // No directory yet means nothing has ever been downloaded.
        Err(e) if e.kind() == std::io::ErrorKind::NotFound => return Ok(vec![]),
        Err(e) => return Err(format!("Failed to read models dir: {}", e)),
    };

    let mut models = Vec::new();
    for entry in entries.flatten() {
        let path = entry.path();
        if path.extension().and_then(|e| e.to_str()) != Some("onnx") {
            continue;
        }
        let Some(model_id) = path.file_stem().and_then(|s| s.to_str()) else {
            continue;
        };
        let Ok(meta) = entry.metadata() else { continue };
        if !meta.is_file() {
            continue;
        }
        let modified = meta
            .modified()
            .ok()
            .and_then(|t| t.duration_since(std::time::UNIX_EPOCH).ok())
            .map(|d| d.as_millis() as u64)
            .unwrap_or(0);

        models.push(CachedModel {
            model_id: model_id.to_string(),
            size: meta.len(),
            modified,
        });
    }

    Ok(models)
}

/// Read a cached model's bytes from disk. Native fs read — bypasses the JS
/// `@tauri-apps/plugin-fs` scope that rejects `$APPDATA` paths on Linux (#103).
/// The frontend receives an `ArrayBuffer`.
#[tauri::command]
pub async fn onnx_read_model_bytes(
    model_id: String,
    app_handle: tauri::AppHandle,
) -> Result<tauri::ipc::Response, String> {
    sanitize_model_id(&model_id)?;
    let app_data = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| format!("Failed to get app data dir: {}", e))?;
    let cached_path = app_data.join("models").join(format!("{}.onnx", model_id));

    if !cached_path.exists() {
        return Err(format!("Model not cached on disk: {}", model_id));
    }

    read_model_file(&cached_path).await
}

/// A `Vec<u8>` return would go through serde as a JSON array of numbers, about
/// 1 GB of text for a 280 MB model. A raw `Response` crosses the IPC as bytes.
async fn read_model_file(path: &std::path::Path) -> Result<tauri::ipc::Response, String> {
    tokio::fs::read(path)
        .await
        .map(tauri::ipc::Response::new)
        .map_err(|e| format!("Failed to read cached model: {}", e))
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
