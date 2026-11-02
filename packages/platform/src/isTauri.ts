/**
 * Canonical Tauri environment detection.
 *
 * Checks for either Tauri v2 global (`__TAURI__` with withGlobalTauri) or
 * the internals object. Callers that need injected APIs (save, clipboard)
 * should check those holders separately — presence of globals ≠ API ready.
 */
export function isTauriApp(): boolean {
  try {
    if (typeof window === 'undefined' || window === null) {
      return false;
    }
    return '__TAURI_INTERNALS__' in window || '__TAURI__' in window;
  } catch {
    return false;
  }
}
