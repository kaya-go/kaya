// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    // On Linux, apply WebKitGTK workarounds for sandboxed/AppImage environments.
    // Audio playback uses native rodio (ALSA/PulseAudio) and bypasses WebKitGTK/GStreamer.
    #[cfg(target_os = "linux")]
    {
        // Disable the DMA-BUF renderer to prevent Wayland protocol errors
        // that crash the app on startup ("Error 71 (Protocol error)").
        // This is a known issue with WebKitGTK in sandboxed environments.
        if std::env::var("WEBKIT_DISABLE_DMABUF_RENDERER").is_err() {
            // SAFETY: called in main() before any threads are spawned
            unsafe {
                std::env::set_var("WEBKIT_DISABLE_DMABUF_RENDERER", "1");
            }
        }

        // Disable GPU compositing to prevent blank windows when the bundled
        // Mesa drivers don't match the host GPU ("Failed to create GBM buffer").
        if std::env::var("WEBKIT_DISABLE_COMPOSITING_MODE").is_err() {
            // SAFETY: called in main() before any threads are spawned
            unsafe {
                std::env::set_var("WEBKIT_DISABLE_COMPOSITING_MODE", "1");
            }
        }
    }

    kaya::run();
}
