/**
 * Resolve a model record (File / ArrayBuffer / IndexedDB key) into a
 * concrete ArrayBuffer ready for the engine. Pure helper, no React.
 */

import { isTauriApp } from '@kaya/platform';
import { loadModelData } from '../../services/modelStorage';

export type ModelDataSource = File | ArrayBuffer | string;

export function modelCacheIdFromStorageId(storageId: string): string {
  return storageId.replace(/[^a-zA-Z0-9-_]/g, '_');
}

export async function getTauriCachedModelPath(data: ModelDataSource): Promise<string | null> {
  if (!isTauriApp() || typeof data !== 'string') return null;
  try {
    const { invoke } = await import('@tauri-apps/api/core');
    return await invoke<string | null>('onnx_get_cached_model', {
      modelId: modelCacheIdFromStorageId(data),
    });
  } catch {
    return null;
  }
}

// On Tauri, downloaded models live on disk only; IndexedDB is the fallback
// for user uploads not yet materialized via `onnx_finish_upload`. See #103.
async function readFromTauriDiskCache(storageId: string): Promise<ArrayBuffer | null> {
  try {
    const { invoke } = await import('@tauri-apps/api/core');
    const bytes = await invoke<number[] | Uint8Array>('onnx_read_model_bytes', {
      modelId: modelCacheIdFromStorageId(storageId),
    });
    const u8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
    return u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength) as ArrayBuffer;
  } catch {
    return null;
  }
}

export async function loadModelBuffer(data: ModelDataSource): Promise<ArrayBuffer> {
  if (data instanceof File) {
    return data.arrayBuffer();
  }
  if (data instanceof ArrayBuffer) {
    return data;
  }
  if (typeof data === 'string') {
    if (isTauriApp()) {
      const fromDisk = await readFromTauriDiskCache(data);
      if (fromDisk) return fromDisk;
    }
    const stored = await loadModelData(data);
    if (!stored) {
      throw new Error(`Model not found in storage: ${data}`);
    }
    return stored;
  }
  throw new Error('Invalid model data type');
}

/**
 * Compute the WASM asset path for ORT-Web. Tauri serves from /wasm/;
 * web honours a build-time asset prefix; otherwise resolve against the
 * document base URI.
 */
export function resolveWasmPath(isTauri: boolean): string {
  if (isTauri) return '/wasm/';
  // @ts-ignore — vite-style import.meta.env
  const envPrefix = (import.meta as any).env?.VITE_ASSET_PREFIX as string | undefined;
  if (envPrefix && envPrefix !== '/') {
    return envPrefix.endsWith('/') ? `${envPrefix}wasm/` : `${envPrefix}/wasm/`;
  }
  if (typeof document !== 'undefined' || typeof window !== 'undefined') {
    return new URL('wasm/', document.baseURI || window.location.href).href;
  }
  return '/wasm/';
}

/** Stable, filesystem-safe model ID derived from the user-visible name. */
export function modelIdFromName(name: string | undefined): string {
  return name?.replace(/[^a-zA-Z0-9-_]/g, '_') ?? 'default';
}
