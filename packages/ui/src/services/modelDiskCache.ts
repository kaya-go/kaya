/**
 * Read the desktop app's on-disk model cache.
 *
 * On Tauri, downloaded models live in `<app_data>/models/<cacheId>.onnx` and
 * IndexedDB holds only their metadata — re-reading `$APPDATA` through
 * `plugin-fs` is rejected on Linux (#103), so the bytes never get mirrored.
 * That makes this listing, not `getStoredModelIds()`, the answer to "is this
 * model downloaded?" on desktop (#123).
 */

import { isTauriApp } from '@kaya/platform';

/** A model file sitting in the desktop app's models directory. */
export interface DiskCachedModel {
  size: number;
  /** Last-modified time in ms since epoch. */
  modified: number;
}

/** Cached models keyed by cache ID (see `modelCacheIdFromStorageId`). */
export async function listDiskCachedModels(): Promise<Map<string, DiskCachedModel>> {
  const byId = new Map<string, DiskCachedModel>();
  if (!isTauriApp()) return byId;

  try {
    const { invoke } = await import('@tauri-apps/api/core');
    const cached =
      await invoke<Array<{ modelId: string; size: number; modified: number }>>(
        'onnx_list_cached_models'
      );
    for (const entry of cached) {
      byId.set(entry.modelId, { size: entry.size, modified: entry.modified });
    }
  } catch (err) {
    // An older desktop binary won't have the command; fall back to IndexedDB.
    console.warn('[AI:Download] Could not list cached models on disk:', err);
  }

  return byId;
}
