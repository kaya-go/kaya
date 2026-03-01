/**
 * Clipboard utility that works in both browser and Tauri environments.
 * In Tauri, uses the clipboard-manager plugin to avoid permission popups.
 * Falls back to navigator.clipboard API for web browsers.
 *
 * Desktop app must call setTauriClipboardAPI() to inject the Tauri clipboard functions.
 */

/**
 * Tauri clipboard API interface
 */
interface TauriClipboardAPI {
  readText: () => Promise<string>;
  writeText: (text: string) => Promise<void>;
}

// Injected Tauri clipboard API (set by desktop app)
let tauriClipboardAPI: TauriClipboardAPI | null = null;

/**
 * Set the Tauri clipboard API. Called by desktop app on startup.
 */
export function setTauriClipboardAPI(api: TauriClipboardAPI): void {
  tauriClipboardAPI = api;
}

/**
 * Check if Tauri clipboard is available
 */
function hasTauriClipboard(): boolean {
  return tauriClipboardAPI !== null;
}

/**
 * Read text from the clipboard.
 * Uses Tauri's clipboard plugin in desktop app to avoid permission popups.
 */
export async function readClipboardText(): Promise<string> {
  if (hasTauriClipboard()) {
    const text = await tauriClipboardAPI!.readText();
    return text ?? '';
  }

  // Browser API fallback
  return navigator.clipboard.readText();
}

/**
 * Write text to the clipboard.
 * Uses Tauri's clipboard plugin in desktop app for consistency.
 */
export async function writeClipboardText(text: string): Promise<void> {
  if (hasTauriClipboard()) {
    await tauriClipboardAPI!.writeText(text);
    return;
  }

  // Browser API fallback
  await navigator.clipboard.writeText(text);
}
