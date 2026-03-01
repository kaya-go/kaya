/**
 * Tauri Engine Types and Utilities
 *
 * Types, interfaces, and helper functions used by the TauriEngine.
 */

import type { BaseEngineConfig } from './base-engine';

/**
 * Progress info for model upload
 */
export interface UploadProgress {
  /** Current stage: 'checking-cache' | 'uploading' | 'initializing' */
  stage: 'checking-cache' | 'uploading' | 'initializing';
  /** Progress percentage (0-100) */
  progress: number;
  /** Human-readable message */
  message: string;
}

/**
 * Execution provider preference for native ONNX Runtime
 */
export type ExecutionProviderPreference = 'auto' | 'cuda' | 'coreml' | 'directml' | 'nnapi' | 'cpu';

/**
 * Information about an execution provider
 */
export interface ExecutionProviderInfo {
  /** Provider name */
  name: string;
  /** Whether it uses GPU acceleration */
  isGpu: boolean;
  /** Human-readable description */
  description: string;
}

export interface TauriEngineConfig extends BaseEngineConfig {
  /** ArrayBuffer of the ONNX model (will be uploaded in chunks to Rust) */
  modelBuffer?: ArrayBuffer;

  /** Path to the ONNX model file on disk */
  modelPath?: string;

  /** Model ID for caching (e.g., model name or hash) */
  modelId?: string;

  /** Enable debug logging */
  debug?: boolean;

  /** Callback for upload progress updates */
  onProgress?: (progress: UploadProgress) => void;

  /**
   * Execution provider preference for native ONNX Runtime
   * - 'auto': Best available (GPU first, then CPU)
   * - 'cuda': NVIDIA CUDA (requires CUDA toolkit)
   * - 'coreml': Apple CoreML (macOS/iOS)
   * - 'directml': Windows DirectML
   * - 'nnapi': Android NNAPI (Android Neural Networks API)
   * - 'cpu': CPU only
   */
  executionProvider?: ExecutionProviderPreference;
}

/**
 * History move entry for the Tauri backend
 */
export interface HistoryMove {
  color: number;
  x: number;
  y: number;
}

/**
 * Analysis options for the Tauri backend
 */
export interface TauriAnalysisOptions {
  komi: number;
  nextToPlay?: string;
  history: HistoryMove[];
}

/**
 * Batch input for the Tauri backend
 */
export interface TauriBatchInput {
  signMap: number[][];
  options: TauriAnalysisOptions;
}

/**
 * Type for the Tauri invoke function
 */
export type TauriInvokeFn = <T>(cmd: string, args?: Record<string, unknown>) => Promise<T>;

/**
 * Check if we're running in a Tauri environment
 * This checks for the global Tauri object without any dynamic imports
 */
export function isTauriEnvironment(): boolean {
  try {
    if (typeof window === 'undefined' || window === null) {
      return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    return '__TAURI_INTERNALS__' in w || '__TAURI__' in w;
  } catch {
    return false;
  }
}

/**
 * Get the Tauri invoke function from the global window object
 * This does NOT use dynamic imports to avoid bundler issues
 */
export function getTauriInvoke(): TauriInvokeFn | null {
  if (!isTauriEnvironment()) {
    return null;
  }

  try {
    const w = window as Record<string, any>;

    // Tauri v2 with withGlobalTauri: true
    if (w.__TAURI__?.core?.invoke) {
      return w.__TAURI__.core.invoke;
    }

    // Tauri v2 internals
    if (w.__TAURI_INTERNALS__?.invoke) {
      return w.__TAURI_INTERNALS__.invoke;
    }

    return null;
  } catch {
    return null;
  }
}

// Chunk size for model upload (1MB per chunk for responsive UI)
// Smaller chunks = more responsive UI during upload
export const CHUNK_SIZE = 1 * 1024 * 1024;

/**
 * Convert a chunk of bytes to base64 string efficiently
 */
export function chunkToBase64(chunk: Uint8Array): string {
  // Use btoa with smaller sub-chunks to avoid call stack issues
  const BATCH_SIZE = 32768;
  let binary = '';
  for (let i = 0; i < chunk.length; i += BATCH_SIZE) {
    const end = Math.min(i + BATCH_SIZE, chunk.length);
    const subChunk = chunk.subarray(i, end);
    for (let j = 0; j < subChunk.length; j++) {
      binary += String.fromCharCode(subChunk[j]);
    }
  }
  return btoa(binary);
}

/**
 * Yield to the event loop to keep UI responsive
 */
export function yieldToUI(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0));
}
