/**
 * PyTorch Tauri Engine
 *
 * Uses PyTorch GPU inference via a Python sidecar process (ROCm/CUDA).
 * Only available in Tauri desktop apps on Linux with PyTorch installed.
 *
 * IMPORTANT: This module uses ONLY the global window.__TAURI__ object
 * and does NOT use any dynamic imports to avoid bundler issues with workers.
 */

import type { SignMap } from '@kaya/goboard';
import {
  Engine,
  type BaseEngineConfig,
  type EngineAnalysisOptions,
  type EngineCapabilities,
  type EngineRuntimeInfo,
} from './base-engine';
import type { AnalysisResult, MoveSuggestion } from './types';

/**
 * Type for the Tauri invoke function
 */
type TauriInvokeFn = <T>(cmd: string, args?: Record<string, unknown>) => Promise<T>;

/**
 * History move entry for the Tauri backend
 */
interface HistoryMove {
  color: number;
  x: number;
  y: number;
}

/**
 * Analysis options for the Tauri backend
 */
interface TauriAnalysisOptions {
  komi: number;
  nextToPlay?: string;
  history: HistoryMove[];
}

/**
 * Batch input for the Tauri backend
 */
interface TauriBatchInput {
  signMap: number[][];
  options: TauriAnalysisOptions;
}

export interface PyTorchEngineConfig extends BaseEngineConfig {
  /** Path to the ONNX model file on disk (PyTorch converts it internally) */
  modelPath?: string;
  /** ArrayBuffer of the ONNX model (will be saved to disk for PyTorch) */
  modelBuffer?: ArrayBuffer;
  /** Model ID for caching */
  modelId?: string;
  /** Enable debug logging */
  debug?: boolean;
  /** Progress callback */
  onProgress?: (progress: { stage: string; progress: number; message: string }) => void;
}

/**
 * Get the Tauri invoke function from the global window object
 */
function getTauriInvoke(): TauriInvokeFn | null {
  try {
    if (typeof window === 'undefined' || window === null) return null;
    const w = window as Record<string, any>;
    if (w.__TAURI__?.core?.invoke) return w.__TAURI__.core.invoke;
    if (w.__TAURI_INTERNALS__?.invoke) return w.__TAURI_INTERNALS__.invoke;
    return null;
  } catch {
    return null;
  }
}

/**
 * Check if PyTorch GPU engine is available
 */
export async function isPyTorchAvailable(): Promise<boolean> {
  const invoke = getTauriInvoke();
  if (!invoke) return false;
  try {
    return await invoke<boolean>('pytorch_is_available');
  } catch {
    return false;
  }
}

export class PyTorchTauriEngine extends Engine {
  private debugEnabled = false;
  private modelPath?: string;
  private modelBuffer?: ArrayBuffer;
  private modelId?: string;
  private invoke: TauriInvokeFn | null = null;
  private onProgress?: (progress: { stage: string; progress: number; message: string }) => void;
  private providerInfo: { provider: string; device: string; fp16: boolean } | null = null;

  constructor(config: PyTorchEngineConfig = {}) {
    super(config);
    this.debugEnabled = Boolean(config.debug);
    this.modelPath = config.modelPath;
    this.modelBuffer = config.modelBuffer;
    this.modelId = config.modelId;
    this.onProgress = config.onProgress;
    this.invoke = getTauriInvoke();
  }

  private debugLog(message: string, payload?: Record<string, unknown>): void {
    if (!this.debugEnabled) return;
    if (payload) {
      console.log('[PyTorchEngine][debug]', message, payload);
    } else {
      console.log('[PyTorchEngine][debug]', message);
    }
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;
    if (!this.invoke) {
      throw new Error('PyTorchTauriEngine can only be used in a Tauri environment');
    }

    const initStart = performance.now();

    // Determine model path
    let modelPath = this.modelPath;

    if (!modelPath && this.modelBuffer) {
      // Save model to disk via Tauri's ONNX upload commands, then get cached path
      this.onProgress?.({ stage: 'uploading', progress: 0, message: 'Saving model to disk...' });

      const modelId = this.modelId ?? 'default';
      // Check if already cached
      const cachedPath = await this.invoke<string | null>('onnx_get_cached_model', { modelId });
      if (cachedPath) {
        modelPath = cachedPath;
      } else {
        // Upload via chunked upload
        await this.invoke('onnx_start_upload');
        const bytes = new Uint8Array(this.modelBuffer);
        const CHUNK_SIZE = 1024 * 1024;
        const totalChunks = Math.ceil(bytes.length / CHUNK_SIZE);
        for (let i = 0; i < totalChunks; i++) {
          const start = i * CHUNK_SIZE;
          const end = Math.min(start + CHUNK_SIZE, bytes.length);
          const chunk = bytes.subarray(start, end);
          let binary = '';
          for (let j = 0; j < chunk.length; j++) {
            binary += String.fromCharCode(chunk[j]);
          }
          const chunkBase64 = btoa(binary);
          await this.invoke('onnx_upload_chunk', { chunkBase64 });
        }
        // Save to disk without initializing ONNX engine
        const savedPath = await this.invoke<string>('onnx_save_model', { modelId });
        modelPath = savedPath;
      }
    }

    if (!modelPath) {
      throw new Error('No model provided (need modelPath or modelBuffer)');
    }

    // Initialize PyTorch sidecar with model path
    this.onProgress?.({
      stage: 'initializing',
      progress: 50,
      message: 'Starting PyTorch GPU engine...',
    });
    this.debugLog('Initializing PyTorch engine', { modelPath });

    const info = await this.invoke<{
      provider: string;
      device: string;
      fp16: boolean;
      params: number;
    }>('pytorch_initialize', { modelPath });

    this.providerInfo = {
      provider: info.provider,
      device: info.device,
      fp16: info.fp16,
    };

    const initTime = performance.now() - initStart;
    const timeStr =
      initTime >= 1000 ? `${(initTime / 1000).toFixed(1)}s` : `${initTime.toFixed(0)}ms`;
    console.log(
      `[AI] Model loaded: PYTORCH/GPU (${info.provider}) ${info.device} ${info.fp16 ? '[FP16]' : '[FP32]'} in ${timeStr}`
    );

    this.onProgress?.({ stage: 'initializing', progress: 100, message: 'Ready' });
    this.initialized = true;
  }

  getCapabilities(): EngineCapabilities {
    return {
      name: 'KataGo (PyTorch GPU)',
      version: '1.0.0',
      supportedBoardSizes: [],
      supportsParallel: true,
      providesPV: false,
      providesWinRate: true,
      providesScoreLead: true,
      metadata: {
        backend: 'pytorch',
        runtime: 'pytorch-rocm',
        device: this.providerInfo?.device,
      },
    };
  }

  getRuntimeInfo(): EngineRuntimeInfo {
    return {
      backend: 'pytorch',
      inputDataType: this.providerInfo?.fp16 ? 'float16' : 'float32',
    };
  }

  protected async analyzePosition(
    signMap: SignMap,
    options: EngineAnalysisOptions
  ): Promise<AnalysisResult> {
    if (!this.invoke) {
      throw new Error('PyTorchTauriEngine can only be used in a Tauri environment');
    }

    const signMapArray = signMap.map(row => row.map(s => s as number));
    const tauriOptions: TauriAnalysisOptions = {
      komi: options.komi ?? 7.5,
      nextToPlay: options.nextToPlay,
      history: options.history ?? [],
    };

    return await this.invoke<AnalysisResult>('pytorch_analyze', {
      signMap: signMapArray,
      options: tauriOptions,
    });
  }

  async analyzeBatch(
    inputs: { signMap: SignMap; options?: EngineAnalysisOptions }[]
  ): Promise<AnalysisResult[]> {
    if (!this.initialized) {
      await this.initialize();
    }
    if (inputs.length === 0) return [];
    if (!this.invoke) {
      throw new Error('PyTorchTauriEngine can only be used in a Tauri environment');
    }

    // Check cache first
    const results: (AnalysisResult | null)[] = new Array(inputs.length).fill(null);
    const uncachedInputs: { index: number; input: TauriBatchInput }[] = [];
    const useCache = this.config.enableCache;

    for (let i = 0; i < inputs.length; i++) {
      const { signMap, options = {} } = inputs[i];
      if (useCache) {
        const cacheKey = this.getCacheKey(signMap, options);
        const cached = this.cache.get(cacheKey);
        if (cached) {
          results[i] = cached;
          continue;
        }
      }
      uncachedInputs.push({
        index: i,
        input: {
          signMap: signMap.map(row => row.map(s => s as number)),
          options: {
            komi: options.komi ?? 7.5,
            nextToPlay: options.nextToPlay,
            history: options.history ?? [],
          },
        },
      });
    }

    if (uncachedInputs.length === 0) {
      return results as AnalysisResult[];
    }

    const batchInputs = uncachedInputs.map(u => u.input);
    const batchResults = await this.invoke<AnalysisResult[]>('pytorch_analyze_batch', {
      inputs: batchInputs,
    });

    for (let i = 0; i < uncachedInputs.length; i++) {
      const { index } = uncachedInputs[i];
      const result = batchResults[i];
      results[index] = result;
      if (useCache) {
        const { signMap, options = {} } = inputs[index];
        const cacheKey = this.getCacheKey(signMap, options);
        this.cache.set(cacheKey, result);
        if (this.cache.size > (this.config.maxCacheSize ?? 1000)) {
          const firstKey = this.cache.keys().next().value;
          if (firstKey) this.cache.delete(firstKey);
        }
      }
    }

    return results as AnalysisResult[];
  }

  async dispose(): Promise<void> {
    if (this.invoke) {
      try {
        await this.invoke('pytorch_dispose');
      } catch (e) {
        console.warn('[PyTorchEngine] Failed to dispose:', e);
      }
    }
    await super.dispose();
  }
}
