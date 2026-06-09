/**
 * Persistent storage management.
 *
 * Browsers keep IndexedDB / localStorage as "best-effort" storage by default,
 * which the browser may evict under storage pressure. Worse, Safari/WebKit ITP
 * deletes all script-writable storage after 7 days of no interaction with the
 * site. On the web app this means downloaded ONNX models (tens to hundreds of
 * MB in IndexedDB) and saved settings silently disappear between sessions, so
 * users have to re-download / re-point to their model every time (issue #115).
 *
 * Requesting persistent storage upgrades the origin so it is exempt from
 * automatic eviction. The grant is automatic on Chromium for installed /
 * high-engagement PWAs, prompts on Firefox, and is best-effort on Safari (where
 * installing to the Home Screen remains the reliable exemption).
 */

/**
 * Request persistent storage for the current origin so settings and downloaded
 * models survive across sessions.
 *
 * Safe to call in any environment: it is a guarded no-op when the Storage API
 * is unavailable (e.g. the Tauri desktop webview, where models are cached on
 * native disk and are not subject to browser eviction).
 *
 * @returns `true` if storage is persistent, `false` if the request was denied
 * (best-effort), or `null` if the API is unsupported.
 */
export async function requestPersistentStorage(): Promise<boolean | null> {
  if (typeof navigator === 'undefined' || !navigator.storage?.persist) {
    return null;
  }

  try {
    // Already persistent (e.g. granted in a previous session) — don't re-ask.
    if (await navigator.storage.persisted()) {
      return true;
    }

    const granted = await navigator.storage.persist();
    console.log(
      granted
        ? '[storage] Persistent storage granted — settings and models will survive across sessions'
        : '[storage] Persistent storage denied (best-effort) — the browser may evict data; install the PWA for reliable persistence'
    );
    return granted;
  } catch (error) {
    console.warn('[storage] Failed to request persistent storage:', error);
    return null;
  }
}
