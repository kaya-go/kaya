//! Native audio playback via rodio.
//!
//! Bypasses WebKitGTK/GStreamer entirely — plays through ALSA/PulseAudio
//! (Linux), CoreAudio (macOS), or WASAPI (Windows) directly.
//!
//! Sound data (OGG bytes) is preloaded from Tauri resources at init time.
//! `MixerDeviceSink` manages audio output internally (`Send + Sync`).

use std::collections::HashMap;
use std::io::Cursor;

use rodio::{Decoder, DeviceSinkBuilder, MixerDeviceSink};
use tauri::Manager;

/// Manages native audio playback via rodio's mixer.
pub struct AudioManager {
    sink: MixerDeviceSink,
    sounds: HashMap<String, Vec<u8>>,
}

impl AudioManager {
    /// Create a new AudioManager. Opens the default audio output device.
    /// Returns an error string if the device cannot be opened.
    pub fn new() -> Result<Self, String> {
        let sink = DeviceSinkBuilder::open_default_sink()
            .map_err(|e| format!("Failed to open audio device: {e}"))?;

        Ok(Self {
            sink,
            sounds: HashMap::new(),
        })
    }

    /// Load a sound file from raw OGG bytes and associate it with a key.
    pub fn load_sound(&mut self, key: String, data: Vec<u8>) {
        self.sounds.insert(key, data);
    }

    /// Play a previously loaded sound by key. Non-blocking, fire-and-forget.
    /// Returns silently if the sound key is not found or decoding fails.
    pub fn play(&self, key: &str) {
        if let Some(data) = self.sounds.get(key) {
            let cursor = Cursor::new(data.clone());
            if let Ok(source) = Decoder::new(cursor) {
                self.sink.mixer().add(source);
            }
        }
    }
}

// =============================================================================
// Sound file manifest — must match the JS-side SOUND_PATHS
// =============================================================================

/// All sound files and their resource-relative paths.
/// The key format is "{type}:{variant}" (e.g. "move:0", "capture:3", "pass:0").
fn sound_manifest() -> Vec<(String, &'static str)> {
    let mut manifest = Vec::new();
    for i in 0..5 {
        manifest.push((format!("move:{i}"), leak_str(format!("sounds/move-{i}.ogg"))));
        manifest.push((
            format!("capture:{i}"),
            leak_str(format!("sounds/capture{i}.ogg")),
        ));
    }
    manifest.push(("pass:0".to_string(), "sounds/pass.ogg"));
    manifest.push(("newgame:0".to_string(), "sounds/newgame.ogg"));
    manifest
}

/// Leak a String into a &'static str — acceptable here because this is called
/// once at init time with a small, fixed number of strings.
fn leak_str(s: String) -> &'static str {
    Box::leak(s.into_boxed_str())
}

// =============================================================================
// Tauri state wrapper
// =============================================================================

pub struct AudioState(pub std::sync::Mutex<Option<AudioManager>>);

// =============================================================================
// Tauri commands
// =============================================================================

/// Initialize the audio system: open the audio device and preload all sounds
/// from Tauri resources. Returns Ok(()) on success, or an error message.
#[tauri::command]
pub fn audio_init(app: tauri::AppHandle) -> Result<(), String> {
    let mut manager = AudioManager::new()?;

    // Load all sound files from Tauri resources
    let manifest = sound_manifest();
    for (key, resource_path) in &manifest {
        match app
            .path()
            .resolve(resource_path, tauri::path::BaseDirectory::Resource)
        {
            Ok(full_path) => match std::fs::read(&full_path) {
                Ok(data) => {
                    manager.load_sound(key.clone(), data);
                }
                Err(e) => {
                    eprintln!("[Audio] Warning: failed to read {resource_path}: {e}");
                }
            },
            Err(e) => {
                eprintln!("[Audio] Warning: failed to resolve {resource_path}: {e}");
            }
        }
    }

    let loaded = manager.sounds.len();
    println!("[Audio] Initialized with {loaded}/{} sounds", manifest.len());

    // Store in Tauri state
    let state = app.state::<AudioState>();
    let mut guard = state
        .0
        .lock()
        .map_err(|e| format!("Failed to lock audio state: {e}"))?;
    *guard = Some(manager);

    Ok(())
}

/// Play a sound by type and variant index.
/// sound_type: "move" | "capture" | "pass" | "newgame"
/// variant: 0-4 for move/capture, 0 for pass/newgame
#[tauri::command]
pub fn audio_play_sound(
    state: tauri::State<'_, AudioState>,
    sound_type: String,
    variant: u32,
) -> Result<(), String> {
    let guard = state
        .0
        .lock()
        .map_err(|e| format!("Failed to lock audio state: {e}"))?;
    if let Some(manager) = guard.as_ref() {
        let key = format!("{sound_type}:{variant}");
        manager.play(&key);
    }
    Ok(())
}

/// Check if the audio system is initialized and ready.
#[tauri::command]
pub fn audio_check(state: tauri::State<'_, AudioState>) -> Result<bool, String> {
    let guard = state
        .0
        .lock()
        .map_err(|e| format!("Failed to lock audio state: {e}"))?;
    Ok(guard.is_some())
}
