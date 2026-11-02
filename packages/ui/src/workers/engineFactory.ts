/**
 * Engine Factory
 *
 * Provides a unified way to create the appropriate AI engine based on the environment:
 * - Tauri Desktop: Uses native ONNX Runtime via TauriEngine (faster)
 * - Web Browser: Uses ONNX Runtime Web via WorkerEngine (WASM/WebGPU)
 *
 * This abstraction allows the UI to be agnostic about which engine is being used.
 */

import { type Engine, type OnnxEngineConfig } from '@kaya/ai-engine';
import { TauriEngine } from '@kaya/ai-engine/tauri-engine';
import { PyTorchTauriEngine } from '@kaya/ai-engine/pytorch-tauri-engine';
import { isTauriApp } from '@kaya/platform';
import { WorkerEngine } from './WorkerEngine';

export interface CreateEngineOptions {
  /** Model buffer (ArrayBuffer) */
  modelBuffer?: ArrayBuffer;

  /** Model file path (for Tauri native) */
  modelPath?: string;

  /** Model ID for caching (for Tauri native) */
  modelId?: string;

  /** Execution provider for native engine ('auto' | 'cpu') */
  executionProvider?: 'auto' | 'cpu';

  /** Path to WASM files (for web) */
  wasmPath?: string;

  /** Execution providers for ONNX Runtime Web */
  executionProviders?: string[];

  /** Number of threads for WASM backend */
  numThreads?: number;

  /** Enable caching */
  enableCache?: boolean;

  /** Maximum moves to suggest */
  maxMoves?: number;

  /** Enable debug logging */
  debug?: boolean;

  /**
   * Force using a specific engine type
   * - 'native': Use TauriEngine (only works in Tauri)
   * - 'pytorch': Use PyTorch GPU sidecar (Linux with ROCm/CUDA, Tauri only)
   * - 'web': Use WorkerEngine (works everywhere)
   * - 'auto': Auto-detect based on environment (default)
   */
  engineType?: 'native' | 'pytorch' | 'web' | 'auto';

  /** Enable WebGPU graph capture for static-shape models */
  enableGraphCapture?: boolean;

  /** Static batch size of the model (1 for static-b1 models) */
  staticBatchSize?: number;

  /** Board size for WebNN freeDimensionOverrides (default: 19) */
  boardSize?: number;

  /** Progress callback for native engine model upload (Tauri only) */
  onProgress?: (progress: { stage: string; progress: number; message: string }) => void;
}

/**
 * Create the appropriate AI engine based on environment and options
 *
 * @param options Engine configuration options
 * @param workerFactory Optional factory function to create the Worker (for web engine)
 * @returns Promise that resolves to an initialized Engine
 */
export async function createEngine(
  options: CreateEngineOptions,
  workerFactory?: () => Worker
): Promise<Engine> {
  const engineType = options.engineType ?? 'auto';

  // Determine which engine to use
  const useNative = engineType === 'native' || (engineType === 'auto' && isTauriApp());
  const usePyTorch = engineType === 'pytorch';

  if (usePyTorch) {
    if (!isTauriApp()) {
      throw new Error('PyTorchTauriEngine is only available in Tauri desktop apps');
    }

    console.log('[createEngine] Using PyTorchTauriEngine (GPU sidecar)');

    const engine = new PyTorchTauriEngine({
      modelBuffer: options.modelBuffer,
      modelPath: options.modelPath,
      modelId: options.modelId,
      enableCache: options.enableCache ?? true,
      maxMoves: options.maxMoves ?? 10,
      debug: options.debug,
      onProgress: options.onProgress,
    });

    await engine.initialize();
    return engine;
  } else if (useNative) {
    // Use native Tauri engine - dynamically import to avoid loading in workers
    if (!isTauriApp()) {
      throw new Error('TauriEngine is only available in Tauri desktop apps');
    }

    console.log('[createEngine] Using native TauriEngine');

    const engine = new TauriEngine({
      modelBuffer: options.modelBuffer,
      modelPath: options.modelPath,
      modelId: options.modelId,
      executionProvider: options.executionProvider ?? 'auto',
      enableCache: options.enableCache ?? true,
      maxMoves: options.maxMoves ?? 10,
      debug: options.debug,
      onProgress: options.onProgress,
    });

    await engine.initialize();
    return engine;
  } else {
    // Use web worker engine
    if (!workerFactory && !options.modelBuffer) {
      throw new Error('WorkerEngine requires a workerFactory or modelBuffer');
    }

    console.log('[createEngine] Using WorkerEngine (ONNX Runtime Web)');

    // Create worker
    const worker = workerFactory
      ? workerFactory()
      : new Worker(new URL('./ai.worker.js', import.meta.url), { type: 'module' });

    const config: OnnxEngineConfig = {
      modelBuffer: options.modelBuffer,
      wasmPath: options.wasmPath ?? '/wasm/',
      executionProviders: options.executionProviders ?? ['webgpu', 'wasm'],
      numThreads: options.numThreads ?? Math.min(8, navigator.hardwareConcurrency || 4),
      enableCache: options.enableCache ?? true,
      maxMoves: options.maxMoves ?? 10,
      debug: options.debug,
      enableGraphCapture: options.enableGraphCapture,
      staticBatchSize: options.staticBatchSize,
      boardSize: options.boardSize,
    };

    const engine = new WorkerEngine(worker, config);
    await engine.initialize();
    return engine;
  }
}

/**
 * Check if native engine is available
 */
export function isNativeEngineAvailable(): boolean {
  return isTauriApp();
}

/**
 * Get a description of the current engine type
 */
export function getEngineDescription(): string {
  if (isTauriApp()) {
    return 'Native ONNX Runtime (GPU accelerated)';
  }
  return 'ONNX Runtime Web';
}
