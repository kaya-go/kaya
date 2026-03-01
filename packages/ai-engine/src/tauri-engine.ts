/**
 * Tauri Native ONNX Engine
 *
 * This engine uses Tauri's native Rust ONNX Runtime for AI analysis
 * in the desktop app with GPU acceleration via CUDA, CoreML, or DirectML.
 *
 * IMPORTANT: This module uses ONLY the global window.__TAURI__ object
 * and does NOT use any dynamic imports to avoid bundler issues with workers.
 */

import type { SignMap } from '@kaya/goboard';
import { Engine, type EngineAnalysisOptions, type EngineCapabilities } from './base-engine';
import type { AnalysisResult } from './types';
import {
  type UploadProgress,
  type ExecutionProviderInfo,
  type ExecutionProviderPreference,
  type TauriEngineConfig,
  type HistoryMove,
  type TauriAnalysisOptions,
  type TauriBatchInput,
  type TauriInvokeFn,
  getTauriInvoke,
  CHUNK_SIZE,
  chunkToBase64,
  yieldToUI,
} from './tauri-utils';

// Re-export types for public API
export type {
  UploadProgress,
  ExecutionProviderPreference,
  ExecutionProviderInfo,
  TauriEngineConfig,
};
export { isTauriEnvironment } from './tauri-utils';

export class TauriEngine extends Engine {
  private debugEnabled = false;
  private modelBuffer?: ArrayBuffer;
  private modelPath?: string;
  private modelId?: string;
  private invoke: TauriInvokeFn | null = null;
  private onProgress?: (progress: UploadProgress) => void;
  private executionProvider: ExecutionProviderPreference;

  constructor(config: TauriEngineConfig = {}) {
    super(config);
    this.debugEnabled = Boolean(config.debug);
    this.modelBuffer = config.modelBuffer;
    this.modelPath = config.modelPath;
    this.modelId = config.modelId;
    this.onProgress = config.onProgress;
    this.executionProvider = config.executionProvider ?? 'auto';

    // Get invoke function immediately in constructor
    this.invoke = getTauriInvoke();
  }

  private reportProgress(stage: UploadProgress['stage'], progress: number, message: string): void {
    this.onProgress?.({ stage, progress, message });
  }

  private debugLog(message: string, payload?: Record<string, unknown>): void {
    if (!this.debugEnabled) return;
    if (payload) {
      console.log('[TauriEngine][debug]', message, payload);
    } else {
      console.log('[TauriEngine][debug]', message);
    }
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    if (!this.invoke) {
      throw new Error('TauriEngine can only be used in a Tauri environment');
    }

    try {
      const initStart = performance.now();

      // Set the execution provider preference before loading the model
      await this.invoke('onnx_set_provider_preference', { preference: this.executionProvider });

      // If we have a modelId, check if it's already cached
      if (this.modelId) {
        this.reportProgress('checking-cache', 0, 'Checking for cached model...');

        const cachedPath = await this.invoke<string | null>('onnx_get_cached_model', {
          modelId: this.modelId,
        });

        if (cachedPath) {
          this.reportProgress('initializing', 50, 'Loading cached model...');
          await this.invoke('onnx_initialize_from_path', { modelPath: cachedPath });
          this.reportProgress('initializing', 100, 'Ready');

          // Log model loaded info
          const initTime = performance.now() - initStart;
          const providerInfo = await this.getProviderInfo();
          const backend = providerInfo?.isGpu ? 'NATIVE/GPU' : 'NATIVE/CPU';
          const provider = providerInfo?.name ? ` (${providerInfo.name})` : '';
          const timeStr =
            initTime >= 1000 ? `${(initTime / 1000).toFixed(1)}s` : `${initTime.toFixed(0)}ms`;
          console.log(`[AI] Model loaded: ${backend}${provider} in ${timeStr}`);

          this.initialized = true;
          return;
        }
      }

      if (this.modelBuffer) {
        const sizeMB = (this.modelBuffer.byteLength / 1024 / 1024).toFixed(1);
        const totalChunks = Math.ceil(this.modelBuffer.byteLength / CHUNK_SIZE);

        this.reportProgress('uploading', 0, `Preparing to upload ${sizeMB}MB model...`);

        // Start the chunked upload
        const uploadStart = performance.now();
        await this.invoke('onnx_start_upload');

        // Upload chunks with base64 encoding (more efficient than JSON arrays)
        const bytes = new Uint8Array(this.modelBuffer);
        for (let i = 0; i < totalChunks; i++) {
          const start = i * CHUNK_SIZE;
          const end = Math.min(start + CHUNK_SIZE, bytes.length);
          const chunk = bytes.subarray(start, end);

          // Convert to base64 and upload
          const chunkBase64 = chunkToBase64(chunk);
          await this.invoke('onnx_upload_chunk', { chunkBase64 });

          // Yield to UI every chunk to stay responsive
          await yieldToUI();

          // Report progress on every chunk for smooth UI updates
          const progressPct = Math.round(((i + 1) / totalChunks) * 100);
          const uploadedMB = (((i + 1) * CHUNK_SIZE) / 1024 / 1024).toFixed(0);
          this.reportProgress(
            'uploading',
            progressPct,
            `Uploading model: ${uploadedMB}/${sizeMB}MB (${progressPct}%)`
          );
        }

        const uploadTime = performance.now() - uploadStart;
        this.debugLog('Upload complete', { uploadTimeMs: uploadTime, totalChunks });

        // Finish upload and initialize engine (with optional caching)
        this.reportProgress('initializing', 100, 'Initializing ONNX engine...');
        const engineStart = performance.now();
        await this.invoke('onnx_finish_upload', { modelId: this.modelId ?? null });
        const engineTime = performance.now() - engineStart;
        this.debugLog('Engine initialized', { engineTimeMs: engineTime });

        this.reportProgress('initializing', 100, 'Ready');
      } else if (this.modelPath) {
        // Initialize from file path directly
        this.reportProgress('initializing', 50, 'Loading model from file...');
        this.debugLog('Initializing from path', { path: this.modelPath });
        await this.invoke('onnx_initialize_from_path', { modelPath: this.modelPath });
        this.reportProgress('initializing', 100, 'Ready');
      } else {
        throw new Error('No model provided (need modelBuffer or modelPath)');
      }

      const initTime = performance.now() - initStart;

      // Log model loaded info (single consistent message)
      const providerInfo = await this.getProviderInfo();
      const backend = providerInfo?.isGpu ? 'NATIVE/GPU' : 'NATIVE/CPU';
      const provider = providerInfo?.name ? ` (${providerInfo.name})` : '';
      const timeStr =
        initTime >= 1000 ? `${(initTime / 1000).toFixed(1)}s` : `${initTime.toFixed(0)}ms`;
      console.log(`[AI] Model loaded: ${backend}${provider} in ${timeStr}`);

      this.initialized = true;
    } catch (e) {
      console.error('[TauriEngine] Failed to initialize:', e);
      throw e;
    }
  }

  getCapabilities(): EngineCapabilities {
    return {
      name: 'KataGo (Native ONNX)',
      version: '1.0.0',
      supportedBoardSizes: [],
      supportsParallel: true,
      providesPV: false,
      providesWinRate: true,
      providesScoreLead: true,
      metadata: {
        backend: 'native',
        runtime: 'ort',
      },
    };
  }

  protected async analyzePosition(
    signMap: SignMap,
    options: EngineAnalysisOptions
  ): Promise<AnalysisResult> {
    if (!this.invoke) {
      throw new Error('TauriEngine can only be used in a Tauri environment');
    }

    const analysisStart = performance.now();

    // Convert SignMap to number[][] for Rust
    const signMapArray = signMap.map(row => row.map(s => s as number));

    // Prepare options for Rust
    const tauriOptions: TauriAnalysisOptions = {
      komi: options.komi ?? 7.5,
      nextToPlay: options.nextToPlay,
      history: this.convertHistory(options.history),
    };

    this.debugLog('Analyzing position', {
      boardSize: signMap.length,
      nextToPlay: tauriOptions.nextToPlay,
      historyLength: tauriOptions.history.length,
    });

    const inferenceStart = performance.now();
    const result = await this.invoke<AnalysisResult>('onnx_analyze', {
      signMap: signMapArray,
      options: tauriOptions,
    });
    const inferenceTime = performance.now() - inferenceStart;

    const totalTime = performance.now() - analysisStart;
    this.debugLog('Analysis complete', {
      totalTimeMs: totalTime,
      inferenceTimeMs: inferenceTime,
    });

    return result;
  }

  async analyzeBatch(
    inputs: { signMap: SignMap; options?: EngineAnalysisOptions }[]
  ): Promise<AnalysisResult[]> {
    if (!this.initialized) {
      await this.initialize();
    }

    if (inputs.length === 0) return [];

    if (!this.invoke) {
      throw new Error('TauriEngine can only be used in a Tauri environment');
    }

    const batchStart = performance.now();

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

      // Prepare batch input for Rust
      uncachedInputs.push({
        index: i,
        input: {
          signMap: signMap.map(row => row.map(s => s as number)),
          options: {
            komi: options.komi ?? 7.5,
            nextToPlay: options.nextToPlay,
            history: this.convertHistory(options.history),
          },
        },
      });
    }

    if (uncachedInputs.length === 0) {
      this.debugLog('Batch resolved from cache', { count: inputs.length });
      return results as AnalysisResult[];
    }

    this.debugLog('Running batch inference', {
      total: inputs.length,
      uncached: uncachedInputs.length,
    });

    const inferenceStart = performance.now();
    const batchInputs = uncachedInputs.map(u => u.input);
    const batchResults = await this.invoke<AnalysisResult[]>('onnx_analyze_batch', {
      inputs: batchInputs,
    });
    const inferenceTime = performance.now() - inferenceStart;

    // Store in cache and merge results
    for (let i = 0; i < uncachedInputs.length; i++) {
      const { index, input } = uncachedInputs[i];
      const result = batchResults[i];
      results[index] = result;

      if (useCache) {
        const { signMap, options = {} } = inputs[index];
        const cacheKey = this.getCacheKey(signMap, options);
        this.cache.set(cacheKey, result);

        // Evict oldest if cache is full
        if (this.cache.size > (this.config.maxCacheSize ?? 1000)) {
          const firstKey = this.cache.keys().next().value;
          if (firstKey) this.cache.delete(firstKey);
        }
      }
    }

    const totalTime = performance.now() - batchStart;
    const msPerPos = totalTime / uncachedInputs.length;
    this.debugLog('Batch analysis complete', {
      positions: uncachedInputs.length,
      totalTimeMs: totalTime,
      msPerPos,
      inferenceTimeMs: inferenceTime,
    });

    return results as AnalysisResult[];
  }

  async dispose(): Promise<void> {
    if (this.invoke) {
      try {
        await this.invoke('onnx_dispose');
      } catch (e) {
        console.warn('[TauriEngine] Failed to dispose:', e);
      }
    }
    await super.dispose();
  }

  /**
   * Convert history from the EngineAnalysisOptions format to TauriAnalysisOptions format
   */
  private convertHistory(history?: { color: number; x: number; y: number }[]): HistoryMove[] {
    if (!history) return [];
    return history.map(m => ({
      color: m.color,
      x: m.x,
      y: m.y,
    }));
  }

  /**
   * Get the current execution provider info from the initialized engine
   */
  async getProviderInfo(): Promise<ExecutionProviderInfo | null> {
    if (!this.invoke) return null;
    try {
      return await this.invoke<ExecutionProviderInfo | null>('onnx_get_provider_info');
    } catch {
      return null;
    }
  }

  /**
   * Get available execution providers for this platform
   */
  static async getAvailableProviders(): Promise<ExecutionProviderInfo[]> {
    const invoke = getTauriInvoke();
    if (!invoke) return [];
    try {
      return await invoke<ExecutionProviderInfo[]>('onnx_get_available_providers');
    } catch {
      return [];
    }
  }
}
