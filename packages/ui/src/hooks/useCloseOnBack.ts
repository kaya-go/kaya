/**
 * Closes an overlay when the user presses the system back gesture.
 *
 * On Android, Tauri maps the hardware back button to `webview.goBack()` and
 * finishes the activity when the webview has nothing to go back to. Kaya is a
 * single-page app that never touches history, so the first back press quit the
 * app even with a dialog open (tauri-apps/tauri#8142). Giving the webview one
 * history entry while an overlay is open turns the gesture into a `popstate`,
 * which this module routes to the topmost overlay's close handler.
 *
 * Design notes:
 * - One shared sentinel entry, not one per overlay. Nested overlays extend the
 *   same entry, and it is re-pushed after each back press if overlays remain.
 * - Removing the sentinel is deferred by a tick and cancelled when another
 *   overlay mounts. Effects run twice under `StrictMode`, so a synchronous
 *   removal would pop the entry the remount is about to depend on. Without the
 *   deferral the module can end up believing a sentinel is still on the stack
 *   when the current entry is actually the app's own — and the next removal
 *   then calls `history.back()` *past* the app, landing on `about:blank`.
 * - Every removal re-checks that the current entry is really ours before
 *   walking back. That is the safety net: whatever else happens, this module
 *   never pops an entry it did not push.
 * - `selfPops` marks the `history.back()` calls we make ourselves, so the
 *   resulting `popstate` is not mistaken for a user back press.
 * - The `popstate` listener is installed once and never removed: an empty stack
 *   simply means the next back press exits, which is the native behaviour we
 *   want.
 */

import { useEffect, useRef } from 'react';

type CloseHandler = () => void;

const SENTINEL_KEY = 'kayaOverlay';

const stack: CloseHandler[] = [];
let sentinelActive = false;
let selfPops = 0;
let pendingPop: number | null = null;
let listening = false;

/** True when the current history entry is the sentinel this module pushed. */
function isSentinelCurrent(): boolean {
  const state = window.history.state as Record<string, unknown> | null;
  return Boolean(state && state[SENTINEL_KEY]);
}

function pushSentinel(): void {
  if (sentinelActive) return;
  sentinelActive = true;
  window.history.pushState({ ...window.history.state, [SENTINEL_KEY]: true }, '');
}

function cancelPendingPop(): void {
  if (pendingPop !== null) {
    window.clearTimeout(pendingPop);
    pendingPop = null;
  }
}

/** Drop the sentinel now that no overlay is open. */
function scheduleSentinelPop(): void {
  cancelPendingPop();
  pendingPop = window.setTimeout(() => {
    pendingPop = null;
    if (stack.length > 0 || !sentinelActive) return;

    sentinelActive = false;
    // The app's own entry may have been replaced, or may never have existed
    // (a fresh tab): only walk back over an entry this module pushed.
    if (!isSentinelCurrent()) return;

    selfPops += 1;
    window.history.back();
  }, 0);
}

function handlePopState(): void {
  if (selfPops > 0) {
    selfPops -= 1;
    return;
  }

  // The user consumed our sentinel.
  sentinelActive = false;
  stack.pop()?.();

  // Overlays are still open, so keep one entry for the next back press.
  if (stack.length > 0) pushSentinel();
}

function startListening(): void {
  if (listening || typeof window === 'undefined') return;
  window.addEventListener('popstate', handlePopState);
  listening = true;
}

/**
 * @param isOpen Whether the overlay is currently shown. Pass `true` for
 *   overlays that are conditionally *mounted* by their parent instead.
 * @param onClose Called when the user presses back while this overlay is the
 *   topmost one. Read through a ref, so it does not need to be stable.
 */
export function useCloseOnBack(isOpen: boolean, onClose: CloseHandler): void {
  const closeRef = useRef(onClose);
  // Refreshed after each commit rather than during render; it is only read
  // from a later popstate event.
  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    // A remount (StrictMode, or the overlay reopening) keeps the sentinel that
    // is already there rather than pushing a second one.
    cancelPendingPop();
    startListening();

    const handler: CloseHandler = () => closeRef.current();
    stack.push(handler);
    pushSentinel();

    return () => {
      const index = stack.lastIndexOf(handler);
      if (index >= 0) stack.splice(index, 1);
      if (stack.length === 0) scheduleSentinelPop();
    };
  }, [isOpen]);
}
