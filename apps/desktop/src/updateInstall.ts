import { invoke } from '@tauri-apps/api/core';
import { ask } from '@tauri-apps/plugin-dialog';
import { open } from '@tauri-apps/plugin-shell';

/** Where the user ends up when the in-app path can't work. */
export const RELEASES_URL = 'https://github.com/kaya-go/kaya/releases/latest';

export type UpdateBlocker = 'translocated' | 'readOnly';

interface UpdatePreflight {
  canInstall: boolean;
  reason: UpdateBlocker | null;
  path: string;
}

/**
 * Can the updater replace this install in place?
 *
 * Asked before downloading ~110 MB, because both ways it fails on macOS —
 * running straight from the .dmg, or from a Gatekeeper-translocated copy —
 * are visible up front, and the plugin only discovers them at the very end.
 */
export async function checkInstallLocation(): Promise<UpdatePreflight> {
  try {
    return await invoke<UpdatePreflight>('update_preflight');
  } catch (error) {
    // Never let the check itself block an update that might have worked.
    console.error('Update pre-flight check failed:', error);
    return { canInstall: true, reason: null, path: '' };
  }
}

export function errorText(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/**
 * A dead end with a way out. Native dialogs render a URL as plain text, so
 * offer to open it rather than leaving the user to retype it.
 *
 * Never rejects: it runs from error handlers, and a dialog that throws there
 * used to leave the updater stuck on its spinner.
 */
export async function offerManualDownload(dialog: {
  title: string;
  message: string;
  hint: string;
  okLabel: string;
  cancelLabel: string;
}): Promise<void> {
  let openPage: boolean;
  try {
    openPage = await ask(`${dialog.message}\n\n${dialog.hint} ${RELEASES_URL}`, {
      title: dialog.title,
      kind: 'error',
      okLabel: dialog.okLabel,
      cancelLabel: dialog.cancelLabel,
    });
  } catch (error) {
    console.error('Failed to show the update error dialog:', error);
    return;
  }

  if (openPage) {
    try {
      await open(RELEASES_URL);
    } catch (error) {
      console.error('Failed to open the downloads page:', error);
    }
  }
}
