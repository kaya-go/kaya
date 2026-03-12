// Main application library - shared between desktop and mobile

#[cfg(desktop)]
use tauri::Manager;
#[cfg(desktop)]
use tauri::Emitter;

#[cfg(not(target_os = "android"))]
mod audio;
#[cfg(target_os = "android")]
#[path = "audio_stub.rs"]
mod audio;
mod commands;
mod onnx_engine;
#[cfg(target_os = "linux")]
mod pytorch_engine;
#[cfg(desktop)]
mod window_state;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let builder = tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            commands::onnx_start_upload,
            commands::onnx_upload_chunk,
            commands::onnx_finish_upload,
            commands::onnx_save_model,
            commands::onnx_get_cached_model,
            commands::onnx_cache_downloaded_file,
            commands::onnx_delete_cached_model,
            commands::onnx_initialize,
            commands::onnx_initialize_base64,
            commands::onnx_initialize_from_path,
            commands::onnx_analyze,
            commands::onnx_analyze_batch,
            commands::onnx_analyze_mcts,
            commands::onnx_abort_mcts,
            commands::onnx_dispose,
            commands::onnx_is_initialized,
            commands::onnx_get_provider_info,
            commands::onnx_get_available_providers,
            commands::onnx_set_provider_preference,
            commands::onnx_get_provider_preference,
            commands::pytorch_is_available,
            commands::pytorch_initialize,
            commands::pytorch_analyze,
            commands::pytorch_analyze_batch,
            commands::pytorch_benchmark,
            commands::pytorch_dispose,
            commands::download_file,
            audio::audio_init,
            audio::audio_play_sound,
            audio::audio_check,
        ]);

    // Desktop-only plugins
    #[cfg(desktop)]
    let builder = builder
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_window_state::Builder::default().build());

    let builder = builder
        .manage(audio::AudioState(std::sync::Mutex::new(None)));

    let builder = builder.setup(|app| {
        // Restore window state for the current monitor setup (desktop only)
        #[cfg(desktop)]
        if let Some(window) = app.get_webview_window("main") {
            window_state::restore_window_state(&window, app.handle());
        }

        #[cfg(desktop)]
        {
            use tauri::menu::{Menu, MenuItem, PredefinedMenuItem, Submenu};
            let handle = app.handle();

            let show_about = MenuItem::with_id(
                handle,
                "show_about",
                "About Kaya",
                true,
                None::<&str>,
            )?;

            let check_update = MenuItem::with_id(
                handle,
                "check_update",
                "Check for Updates...",
                true,
                None::<&str>,
            )?;

            #[cfg(target_os = "macos")]
            {
                // Create the application menu (Kaya)
                let app_menu = Submenu::new(handle, "Kaya", true)?;
                app_menu.append(&show_about)?;
                app_menu.append(&PredefinedMenuItem::separator(handle)?)?;
                app_menu.append(&check_update)?;
                app_menu.append(&PredefinedMenuItem::separator(handle)?)?;
                app_menu.append(&PredefinedMenuItem::services(handle, None::<&str>)?)?;
                app_menu.append(&PredefinedMenuItem::separator(handle)?)?;
                app_menu.append(&PredefinedMenuItem::hide(handle, None::<&str>)?)?;
                app_menu.append(&PredefinedMenuItem::hide_others(handle, None::<&str>)?)?;
                app_menu.append(&PredefinedMenuItem::show_all(handle, None::<&str>)?)?;
                app_menu.append(&PredefinedMenuItem::separator(handle)?)?;
                app_menu.append(&PredefinedMenuItem::quit(handle, None::<&str>)?)?;

                let menu = Menu::with_items(handle, &[&app_menu])?;
                app.set_menu(menu)?;
            }

            // On Linux/Windows, show an About menu with update check and about info
            #[cfg(all(desktop, not(target_os = "macos")))]
            {
                let about_menu = Submenu::new(handle, "About", true)?;
                about_menu.append(&show_about)?;
                about_menu.append(&PredefinedMenuItem::separator(handle)?)?;
                about_menu.append(&check_update)?;

                let menu = Menu::with_items(handle, &[&about_menu])?;
                app.set_menu(menu)?;
            }
        }

        // Suppress unused variable warning on mobile
        #[cfg(mobile)]
        let _ = app;

        Ok(())
    });

    // Desktop-only: menu events
    #[cfg(desktop)]
    let builder = builder.on_menu_event(|app, event| {
        if event.id() == "check_update" {
            let _ = app.emit("check-update", ());
        }
        if event.id() == "show_about" {
            let _ = app.emit("show-about", ());
        }
    });

    let builder = builder.on_window_event(|window, event| {
        // Save window state when the window is about to close (desktop only)
        #[cfg(desktop)]
        {
            if let tauri::WindowEvent::CloseRequested { .. } = event {
                if window.label() == "main" {
                    window_state::save_window_state_from_window(window, window.app_handle());
                }
            }
            // Also save on move/resize for more frequent persistence
            if let tauri::WindowEvent::Moved(_) | tauri::WindowEvent::Resized(_) = event {
                if window.label() == "main" {
                    window_state::save_window_state_from_window(window, window.app_handle());
                }
            }
        }
        // Suppress unused variable warning on mobile
        #[cfg(mobile)]
        {
            let _ = (window, event);
        }
    });

    builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
