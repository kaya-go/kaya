// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    // On Linux, ensure GStreamer can find system plugins.
    // Without this, AppImage builds fail because WebKitGTK cannot locate
    // GStreamer elements (appsink, appsrc, autoaudiosink) needed for audio,
    // causing the app to freeze on startup.
    #[cfg(target_os = "linux")]
    {
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
