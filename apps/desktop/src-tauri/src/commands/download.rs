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
    use futures::StreamExt;
    use tauri::Emitter;
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
