//! Audio stubs for Android — audio is handled via WebView on mobile.

#[allow(dead_code)]
pub struct AudioState(pub std::sync::Mutex<Option<()>>);

#[tauri::command]
pub fn audio_init(_app: tauri::AppHandle) -> Result<(), String> {
    Ok(())
}

#[tauri::command]
pub fn audio_play_sound(
    _state: tauri::State<'_, AudioState>,
    _sound_type: String,
    _variant: u32,
) -> Result<(), String> {
    Ok(())
}

#[tauri::command]
pub fn audio_check(_state: tauri::State<'_, AudioState>) -> Result<bool, String> {
    Ok(false)
}
