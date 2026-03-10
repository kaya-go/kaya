//! Native audio playback via rodio.
//!
//! Bypasses WebKitGTK/GStreamer entirely — plays through ALSA/PulseAudio
//! (Linux), CoreAudio (macOS), or WASAPI (Windows) directly.
//!
//! Architecture:
//! - A dedicated audio thread owns the `OutputStream` (must stay alive).
//! - Sound data (OGG bytes) is preloaded from Tauri resources at init time.
//! - `play()` sends pre-loaded bytes through a channel; the audio thread
//!   decodes and plays them without blocking the caller.

use std::collections::HashMap;
use std::io::Cursor;
use std::sync::mpsc;

use rodio::{Decoder, OutputStream, Sink};
use tauri::Manager;

/// Messages sent to the audio thread.
enum AudioCommand {
    Play(Vec<u8>),
    Shutdown,
}

/// Manages native audio playback on a dedicated thread.
pub struct AudioManager {
    sender: mpsc::Sender<AudioCommand>,
    sounds: HashMap<String, Vec<u8>>,
}

impl AudioManager {
    /// Create a new AudioManager. Spawns a background thread that owns the
    /// audio output stream. Returns an error string if the audio device
    /// cannot be opened (e.g. headless server, no sound card).
    pub fn new() -> Result<Self, String> {
        let (tx, rx) = mpsc::channel::<AudioCommand>();

        // Spawn audio thread — OutputStream must live on its creator thread
        let (ready_tx, ready_rx) = mpsc::channel::<Result<(), String>>();

        std::thread::Builder::new()
            .name("kaya-audio".into())
            .spawn(move || {
                // Try to open the default audio output
                let stream_result = OutputStream::try_default();
                let (_stream, stream_handle) = match stream_result {
                    Ok(pair) => {
                        ready_tx.send(Ok(())).ok();
                        pair
                    }
                    Err(e) => {
                        ready_tx
                            .send(Err(format!("Failed to open audio device: {e}")))
                            .ok();
                        return;
                    }
                };

                // Process commands until shutdown
                while let Ok(cmd) = rx.recv() {
                    match cmd {
                        AudioCommand::Play(data) => {
                            let cursor = Cursor::new(data);
                            if let Ok(source) = Decoder::new(cursor) {
                                // Use a Sink for non-blocking playback
                                if let Ok(sink) = Sink::try_new(&stream_handle) {
                                    sink.append(source);
                                    sink.detach(); // Play without blocking
                                }
                            }
                        }
                        AudioCommand::Shutdown => break,
                    }
                }
            })
            .map_err(|e| format!("Failed to spawn audio thread: {e}"))?;

        // Wait for the audio thread to report success or failure
        let init_result = ready_rx
            .recv()
            .map_err(|_| "Audio thread exited before initializing".to_string())?;
        init_result?;

        Ok(Self {
            sender: tx,
            sounds: HashMap::new(),
        })
    }

    /// Load a sound file from raw OGG bytes and associate it with a key.
    pub fn load_sound(&mut self, key: String, data: Vec<u8>) {
        self.sounds.insert(key, data);
    }

    /// Play a previously loaded sound by key. Non-blocking, fire-and-forget.
    /// Returns silently if the sound key is not found or the channel is closed.
    pub fn play(&self, key: &str) {
        if let Some(data) = self.sounds.get(key) {
            // Send a clone of the data to the audio thread
            let _ = self.sender.send(AudioCommand::Play(data.clone()));
        }
    }
}

impl Drop for AudioManager {
    fn drop(&mut self) {
        let _ = self.sender.send(AudioCommand::Shutdown);
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
