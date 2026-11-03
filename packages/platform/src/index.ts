/**
 * @kaya/platform - Platform abstraction layer
 *
 * Provides platform-specific utilities for file operations,
 * clipboard access, and Tauri environment detection.
 */

export { saveFile, setTauriSaveAPI, type TauriSaveAPI } from './fileSave';

export { isTauriApp } from './isTauri';

export { readClipboardText, writeClipboardText, setTauriClipboardAPI } from './clipboard';

export { requestPersistentStorage } from './storage';
