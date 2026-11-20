//! File download command

/// Stub for mobile: download_file is not supported
#[cfg(not(desktop))]
#[tauri::command]
pub async fn download_file(_url: String) -> Result<String, String> {
    Err("download_file is not available on mobile".to_string())
}

/// Download a file from a URL and save it to a temp file, emitting progress events.
#[cfg(desktop)]
#[tauri::command]
pub async fn download_file(app: tauri::AppHandle, url: String) -> Result<String, String> {
    use super::model_files::{unique_temp_path, DOWNLOAD_PREFIX};
    use std::time::Duration;

    // Validate URL scheme
    if !url.starts_with("https://") {
        return Err("Only HTTPS URLs are allowed".to_string());
    }

    // No total timeout, which would cut a slow 280 MB download short: a
    // connection that stops sending is what must fail, instead of hanging.
    let client = reqwest::Client::builder()
        .redirect(reqwest::redirect::Policy::limited(10))
        .connect_timeout(Duration::from_secs(30))
        .read_timeout(Duration::from_secs(60))
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

    // One file per download: two downloads at once shared the old pid-only name.
    let temp_path = unique_temp_path(DOWNLOAD_PREFIX, "tmp");
    let temp_path_str = temp_path
        .to_str()
        .ok_or("Invalid temp path")?
        .to_string();

    // create_new: never write through a file someone else put at that name.
    let file = tokio::fs::OpenOptions::new()
        .write(true)
        .create_new(true)
        .open(&temp_path)
        .await
        .map_err(|e| format!("Failed to create temp file: {}", e))?;

    // A download that fails halfway leaves nothing behind.
    if let Err(e) = write_body(&app, response, file).await {
        let _ = tokio::fs::remove_file(&temp_path).await;
        return Err(e);
    }

    Ok(temp_path_str)
}

/// Stream the response body into `file`, emitting progress events. Fails when
/// the body ends short of its announced length.
#[cfg(desktop)]
async fn write_body(
    app: &tauri::AppHandle,
    response: reqwest::Response,
    mut file: tokio::fs::File,
) -> Result<(), String> {
    use futures::StreamExt;
    use tauri::Emitter;
    use tokio::io::AsyncWriteExt;

    let total_size = response.content_length().unwrap_or(0);
    let mut downloaded: u64 = 0;
    let mut stream = response.bytes_stream();
    let mut last_progress: u64 = 0;

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

    if total_size > 0 && downloaded != total_size {
        return Err(format!(
            "Download incomplete: received {} of {} bytes",
            downloaded, total_size
        ));
    }

    // Emit completion
    let _ = app.emit(
        "download-progress",
        serde_json::json!({
            "downloaded": downloaded,
            "total": total_size,
            "percent": 100u64,
        }),
    );

    Ok(())
}
