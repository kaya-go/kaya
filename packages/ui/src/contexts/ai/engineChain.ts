/**
 * Run the backend fallback chain: try each backend in order; on failure,
 * dispose and try the next. Validates GPU backends with a warm-up
 * inference (catches silent fp16/CoreML/WebGPU validation failures that
 * don't throw at session creation).
 *
 * Pure orchestration — no React, no toasts. The caller decides what to
 * surface to the user from the result + step events.
 */

import {
  type Engine,
  type BackendId,
  WEBGPU_BATCH_SIZE,
  convertModelForWebGPU,
  convertModelForWebNN,
  isWebGPUOptimized,
  isWebNNOptimized,
} from '@kaya/ai-engine';
import type { SignMap } from '@kaya/goboard';
import { createEngine, type CreateEngineOptions } from '../../workers/engineFactory';

export interface ChainStepEvent {
  backend: BackendId;
  status: 'trying' | 'failed' | 'success';
  message?: string;
}

export interface EngineChainConfig {
  modelBuffer: ArrayBuffer;
  /** User-visible model name; used to detect static-batch / .webgpu. variants. */
  modelName: string;
  /** Stable ID for the model (Tauri caching key). */
  modelId: string;
  boardSize: number;
  webgpuBatchSize: number;
  wasmPath: string;
  isTauri: boolean;
  workerFactory: () => Worker;
  onUploadProgress?: (p: { stage: string; progress: number; message: string }) => void;
  onStep?: (event: ChainStepEvent) => void;
}

export interface EngineChainResult {
  engine: Engine;
  /** The backend the engine reports it's actually using (post-fallback). */
  activeBackend: string;
  inputDataType: 'float32' | 'float16';
}

/**
 * Try each backend in order until one initializes and passes warm-up.
 * Throws the last error if all fail.
 */
export async function tryEngineChain(
  chain: BackendId[],
  cfg: EngineChainConfig
): Promise<EngineChainResult> {
  let lastError: Error | null = null;

  for (const backend of chain) {
    cfg.onStep?.({ backend, status: 'trying' });
    try {
      const engine = await initOneBackend(backend, cfg);
      const runtime = engine.getRuntimeInfo();

      if (isGpuBackend(runtime.backend)) {
        try {
          await warmUp(engine, cfg.boardSize);
        } catch (warmupErr) {
          await safeDispose(engine);
          throw warmupErr;
        }
      }

      cfg.onStep?.({ backend, status: 'success' });
      return {
        engine,
        activeBackend: runtime.backend,
        inputDataType: runtime.inputDataType,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      lastError = err instanceof Error ? err : new Error(message);
      cfg.onStep?.({ backend, status: 'failed', message });
    }
  }

  throw lastError ?? new Error('All AI backends failed to initialize');
}

// --- internals -------------------------------------------------------------

async function initOneBackend(backend: BackendId, cfg: EngineChainConfig): Promise<Engine> {
  let buffer = cfg.modelBuffer;
  let staticBatchSize = detectStaticBatchSize(cfg.modelName);
  let enableGraphCapture = false;
  let executionProviders: (string | Record<string, unknown>)[] = ['wasm'];
  let engineType: CreateEngineOptions['engineType'] = 'web';

  switch (backend) {
    case 'native-gpu':
    case 'native-cpu':
      engineType = 'native';
      break;
    case 'pytorch':
      engineType = 'pytorch';
      break;
    case 'webgpu': {
      executionProviders = ['webgpu'];
      const needsConversion = !cfg.isTauri && !isWebGPUOptimized(cfg.modelName);
      if (cfg.modelName.includes('.webgpu.') || needsConversion) {
        enableGraphCapture = true;
      }
      if (needsConversion) {
        try {
          const result = await convertModelForWebGPU(buffer, { batchSize: cfg.webgpuBatchSize });
          if (result.wasConverted) {
            buffer = result.buffer;
            staticBatchSize = cfg.webgpuBatchSize;
          }
        } catch (err) {
          console.warn('[engineChain] WebGPU conversion failed, using original:', err);
        }
      }
      break;
    }
    case 'wasm':
      executionProviders = ['wasm'];
      break;
  }

  // ?gc=0 disables graph capture for debugging.
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    if (params.get('gc') === '0') enableGraphCapture = false;
  }

  return createEngine(
    {
      modelBuffer: buffer,
      modelId: cfg.modelId,
      executionProvider: backend === 'native-cpu' ? 'cpu' : 'auto',
      engineType,
      wasmPath: cfg.wasmPath,
      executionProviders: executionProviders as string[],
      enableGraphCapture,
      staticBatchSize,
      boardSize: cfg.boardSize,
      maxMoves: 10,
      enableCache: false, // queue owns caching
      numThreads:
        typeof navigator !== 'undefined' ? Math.min(8, navigator.hardwareConcurrency || 4) : 4,
      onProgress: cfg.onUploadProgress,
    },
    cfg.workerFactory
  );
}

function detectStaticBatchSize(modelName: string): number | undefined {
  const m = modelName.match(/static-b(\d+)/);
  if (m) return parseInt(m[1], 10);
  if (modelName.includes('.webgpu.')) return 1;
  return undefined;
}

function isGpuBackend(reported: string): boolean {
  return ['webgpu', 'webgpu-gc', 'webnn', 'native', 'pytorch'].includes(reported);
}

async function warmUp(engine: Engine, boardSize: number): Promise<void> {
  const empty: SignMap = Array.from({ length: boardSize }, () =>
    Array(boardSize).fill(0 as const)
  ) as SignMap;
  await engine.analyze(empty, { nextToPlay: 'B', komi: 7.5, history: [], skipCache: true });
}

async function safeDispose(engine: Engine): Promise<void> {
  try {
    await engine.dispose();
  } catch {
    // Ignore dispose errors during cleanup.
  }
}

/**
 * WebNN entry — kept here for reference but unused by the auto-config flow
 * (auto-config.ts deliberately omits WebNN; it's only reachable via manual
 * advanced override). Re-include if/when WebNN moves into the default chain.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function _initWebNN(cfg: EngineChainConfig): Promise<Engine> {
  let buffer = cfg.modelBuffer;
  let staticBatchSize = cfg.webgpuBatchSize || WEBGPU_BATCH_SIZE;
  if (!cfg.isTauri && !isWebNNOptimized(cfg.modelName)) {
    try {
      const result = await convertModelForWebNN(buffer, {
        batchSize: staticBatchSize,
        boardSize: cfg.boardSize,
      });
      if (result.wasConverted) buffer = result.buffer;
    } catch (err) {
      console.warn('[engineChain] WebNN conversion failed:', err);
    }
  }
  return createEngine(
    {
      modelBuffer: buffer,
      modelId: cfg.modelId,
      engineType: 'web',
      wasmPath: cfg.wasmPath,
      executionProviders: [
        { name: 'webnn', deviceType: 'gpu', powerPreference: 'high-performance' },
      ] as any,
      staticBatchSize,
      boardSize: cfg.boardSize,
      maxMoves: 10,
      enableCache: false,
    },
    cfg.workerFactory
  );
}
