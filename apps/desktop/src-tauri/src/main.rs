// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    // On Linux, ensure GStreamer can find system plugins.
    // Without this, AppImage builds fail because WebKitGTK cannot locate
    // GStreamer elements (appsink, appsrc, autoaudiosink) needed for audio,
    // causing the app to freeze on startup.
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

        if std::env::var("GST_PLUGIN_SYSTEM_PATH").is_err() {
            let candidates = [
                "/usr/lib/x86_64-linux-gnu/gstreamer-1.0",
                "/usr/lib/aarch64-linux-gnu/gstreamer-1.0",
                "/usr/lib/gstreamer-1.0",
                "/usr/lib64/gstreamer-1.0",
            ];
            let paths: Vec<&str> = candidates
                .iter()
                .filter(|p| std::path::Path::new(p).is_dir())
                .copied()
                .collect();
            if !paths.is_empty() {
                // SAFETY: called in main() before any threads are spawned
                unsafe {
                    std::env::set_var("GST_PLUGIN_SYSTEM_PATH", paths.join(":"));
                }
            }
        }
    }

    kaya::run();
}
