//! Native audio playback via rodio.
//!
//! Bypasses WebKitGTK/GStreamer entirely — plays through ALSA/PulseAudio
//! (Linux), CoreAudio (macOS), or WASAPI (Windows) directly.
//!
//! Sound data (OGG bytes) is preloaded from Tauri resources at init time.
//! `MixerDeviceSink` manages audio output internally (`Send + Sync`).

use std::collections::HashMap;
use std::error::Error;
use std::io::Cursor;

use rodio::cpal::traits::HostTrait;
use rodio::cpal::{BufferSize, SupportedBufferSize};
use rodio::stream::DeviceSinkError;
use rodio::{Decoder, DeviceSinkBuilder, DeviceTrait, MixerDeviceSink};
use tauri::Manager;

/// The buffer rodio asks for: about 50 ms of frames, rounded to the nearest
/// power of two (`DeviceSinkBuilder::from_device`), clamped to the range the
/// device accepts. cpal 0.18 rejects a fixed size outside that range instead of
/// letting CoreAudio clamp it, and a Bluetooth output on macOS caps it at 1024
/// frames while rodio asks 2048 at 44.1 kHz. `None` when the device does not
/// report a range: rodio's own size is then kept.
fn clamped_buffer_frames(sample_rate: u32, range: &SupportedBufferSize) -> Option<u32> {
    let SupportedBufferSize::Range { min, max } = *range else {
        return None;
    };
    let target = (sample_rate / 20).max(1);
    let next = target.next_power_of_two();
    let prev = next >> 1;
    let rodio_frames = if prev > 0 && target - prev <= next - target {
        prev
    } else {
        next
    };
    Some(rodio_frames.clamp(min, max.max(min)))
}

/// Open the default output with rodio's buffer clamped to the device's range,
/// falling back to rodio's other stream configs. If that fails, rodio's own
/// `open_default_sink` gets a go (it keeps its fallback to other devices on
/// Linux), and the first error is the one returned.
fn open_default_output() -> Result<MixerDeviceSink, DeviceSinkError> {
    let clamped = || {
        let device = rodio::cpal::default_host()
            .default_output_device()
            .ok_or(DeviceSinkError::NoDevice)?;
        let config = device
            .default_output_config()
            .map_err(DeviceSinkError::DefaultSinkConfigError)?;
        let mut builder = DeviceSinkBuilder::from_device(device)?;
        if let Some(frames) = clamped_buffer_frames(config.sample_rate(), config.buffer_size()) {
            builder = builder.with_buffer_size(BufferSize::Fixed(frames));
        }
        builder.open_sink_or_fallback()
    };
    clamped().or_else(|first| DeviceSinkBuilder::open_default_sink().map_err(|_| first))
}

/// An error and its causes, outermost first: rodio's message alone ("Error
/// opening the stream with the OS") hides the cpal reason underneath.
fn error_chain(e: &dyn Error) -> String {
    let mut msg = e.to_string();
    let mut cause = e.source();
    while let Some(c) = cause {
        msg.push_str(&format!(": {c}"));
        cause = c.source();
    }
    msg
}

/// Manages native audio playback via rodio's mixer.
pub struct AudioManager {
    sink: MixerDeviceSink,
    sounds: HashMap<String, Vec<u8>>,
}

impl AudioManager {
    /// Create a new AudioManager. Opens the default audio output device.
    /// Returns an error string if the device cannot be opened.
    pub fn new() -> Result<Self, String> {
        let sink = open_default_output().map_err(|e| {
            let msg = format!("Failed to open audio device: {}", error_chain(&e));
            // Mirror to stderr — Linux AppImage users debugging silent audio
            // can capture this by launching from a terminal.
            eprintln!("[Audio] {msg}");
            msg
        })?;
        eprintln!("[Audio] Opened default sink");

        Ok(Self {
            sink,
            sounds: HashMap::new(),
        })
    }

    /// Load a sound. Validates it can be decoded once up front so that broken
    /// files or a missing/incompatible decoder surface at init time instead of
    /// silently producing no audio on every play.
    pub fn load_sound(&mut self, key: String, data: Vec<u8>) -> Result<(), String> {
        Decoder::new(Cursor::new(data.clone())).map_err(|e| format!("decode failed: {e}"))?;
        self.sounds.insert(key, data);
        Ok(())
    }

    /// Play a previously loaded sound by key. Non-blocking, fire-and-forget.
    /// Logs to stderr if the sound key is unknown or the decode fails.
    pub fn play(&self, key: &str) {
        let Some(data) = self.sounds.get(key) else {
            eprintln!("[Audio] play: unknown sound key '{key}'");
            return;
        };
        match Decoder::new(Cursor::new(data.clone())) {
            Ok(source) => self.sink.mixer().add(source),
            Err(e) => eprintln!("[Audio] play: decode error for '{key}': {e}"),
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

    // Load all sound files from Tauri resources. Collect per-file failure
    // reasons so that if nothing loads we can surface a meaningful error to
    // the UI (the existing sound-init-error toast) instead of silently going
    // mute.
    let manifest = sound_manifest();
    let total = manifest.len();
    let mut failures: Vec<String> = Vec::new();
    for (key, resource_path) in &manifest {
        match app
            .path()
            .resolve(resource_path, tauri::path::BaseDirectory::Resource)
        {
            Ok(full_path) => match std::fs::read(&full_path) {
                Ok(data) => {
                    if let Err(e) = manager.load_sound(key.clone(), data) {
                        eprintln!("[Audio] {resource_path}: {e}");
                        failures.push(format!("{resource_path}: {e}"));
                    }
                }
                Err(e) => {
                    eprintln!("[Audio] Warning: failed to read {resource_path}: {e}");
                    failures.push(format!("{resource_path}: read error: {e}"));
                }
            },
            Err(e) => {
                eprintln!("[Audio] Warning: failed to resolve {resource_path}: {e}");
                failures.push(format!("{resource_path}: resolve error: {e}"));
            }
        }
    }

    let loaded = manager.sounds.len();
    println!("[Audio] Initialized with {loaded}/{total} sounds");

    if loaded == 0 {
        let detail = if failures.is_empty() {
            "no sound files were found".to_string()
        } else {
            failures.join("; ")
        };
        return Err(format!("Audio init: no sounds loaded ({detail})"));
    }

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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn keeps_rodio_size_when_in_range() {
        // MacBook Pro speakers: 48 kHz, 15..=4096 frames.
        let range = SupportedBufferSize::Range { min: 15, max: 4096 };
        assert_eq!(clamped_buffer_frames(48_000, &range), Some(2048));
        assert_eq!(clamped_buffer_frames(44_100, &range), Some(2048));
        assert_eq!(clamped_buffer_frames(96_000, &range), Some(4096));
    }

    #[test]
    fn clamps_to_a_bluetooth_output_range() {
        // Pixel Buds Pro 2 on macOS: 44.1 kHz, 14..=1024 frames.
        let range = SupportedBufferSize::Range { min: 14, max: 1024 };
        assert_eq!(clamped_buffer_frames(44_100, &range), Some(1024));
        assert_eq!(clamped_buffer_frames(16_000, &range), Some(1024));
    }

    #[test]
    fn clamps_up_to_the_minimum() {
        let range = SupportedBufferSize::Range { min: 4096, max: 8192 };
        assert_eq!(clamped_buffer_frames(8_000, &range), Some(4096));
    }

    #[test]
    fn leaves_an_unknown_range_to_rodio() {
        assert_eq!(clamped_buffer_frames(48_000, &SupportedBufferSize::Unknown), None);
    }

    /// Opens the real default output: `cargo test audio -- --ignored`.
    #[test]
    #[ignore = "needs an audio output device"]
    fn opens_the_default_output() {
        if let Err(e) = open_default_output() {
            panic!("{}", error_chain(&e));
        }
    }
}
