/**
 * @kaya/platform - Platform abstraction layer
 *
 * Provides platform-specific utilities for file operations,
 * clipboard access, and Tauri environment detection.
 */

export { saveFile, isTauriApp, setTauriSaveAPI, type TauriSaveAPI } from './fileSave';

export { readClipboardText, writeClipboardText, setTauriClipboardAPI } from './clipboard';
