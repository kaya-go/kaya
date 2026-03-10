/**
 * AI Engine Context
 *
 * Manages the AI engine singleton lifecycle, independent of analysis mode.
 * The engine is initialized when a model is loaded and ready, not when analysis is enabled.
 * This separation allows features like "Suggest Move" to use the engine without
 * triggering analysis behavior (cache updates, win rate graph, overlays).
 */

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import type { Engine } from '@kaya/ai-engine';
import type { SignMap } from '@kaya/goboard';
import type { AISettings } from '../types/game';
import {
  convertModelForWebGPU,
  isWebGPUOptimized,
  WEBGPU_BATCH_SIZE,
  convertModelForWebNN,
  isWebNNOptimized,
} from '@kaya/ai-engine';
import { useTranslation } from 'react-i18next';
import { useGameTree } from './GameTreeContext';
import { isTauriApp, writeClipboardText } from '@kaya/platform';
import { loadModelData } from '../services/modelStorage';
import { createEngine, type CreateEngineOptions } from '../workers/engineFactory';
import { useToast } from '../components/ui/Toast';
import { parseModelId, getModelId } from '../hooks/game/useAIAnalysis';
import type { ModelQuantization } from '../hooks/game/ai-analysis-types';

// Global state for singleton engine management
let globalEngineInstance: Engine | null = null;
let globalEnginePromise: Promise<Engine> | null = null;
let globalEngineConfig: {
  modelName: string;
  backend: string;
  webgpuBatchSize: number;
  boardSize: number;
} | null = null;

export interface AIEngineContextValue {
  /** The AI engine instance, or null if not initialized */
  engine: Engine | null;
  /** Whether the engine is ready to use */
  isEngineReady: boolean;
  /** Whether the engine is currently initializing */
  isInitializing: boolean;
  /** Error message if engine initialization failed */
  error: string | null;
  /** The backend actually running (may differ from aiSettings.backend due to fallback) */
  activeBackend: string | null;
  /** Progress info for native engine upload (Tauri only) */
  nativeUploadProgress: { stage: string; progress: number; message: string } | null;
  /** The quantization type selected in settings (e.g. 'fp32', 'fp16', 'uint8'), or null */
  selectedQuantization: ModelQuantization | null;
  /** Manually trigger engine initialization (useful if model wasn't loaded on mount) */
  initializeEngine: () => void;
  /** Dispose the engine and reset state */
  disposeEngine: () => Promise<void>;
}

const AIEngineContext = createContext<AIEngineContextValue | null>(null);

export function useAIEngine(): AIEngineContextValue {
  const context = useContext(AIEngineContext);
  if (!context) {
    throw new Error('useAIEngine must be used within an AIEngineProvider');
  }
  return context;
}

/**
 * Try to use the existing engine context if available (doesn't throw)
 * Useful for optional engine access in components that may be outside provider
 */
export function useAIEngineOptional(): AIEngineContextValue | null {
  return useContext(AIEngineContext);
}

/**
 * Build the fallback chain of backends to try, starting from the given backend.
 * Each entry is tried in order; on failure, the next one is attempted.
 */
function buildFallbackChain(startingBackend: string, isTauri: boolean): string[] {
  // Full ordered chain per platform
  // PyTorch is an explicit user choice (not part of the fallback chain)
  const webChain = ['webgpu', 'wasm'];
  const desktopChain = ['native', 'native-cpu'];

  const fullChain = isTauri ? desktopChain : webChain;
  const startIndex = fullChain.indexOf(startingBackend);

  if (startIndex >= 0) {
    return fullChain.slice(startIndex);
  }

  // If the backend is not in the standard chain (e.g. 'native-cpu', 'webnn'),
  // try it first then fall back to the rest of the chain
  return [startingBackend, ...fullChain];
}

/**
 * Determine engine configuration for a given backend.
 */
function getEngineConfigForBackend(
  backend: string,
  isTauri: boolean,
  modelBuffer: ArrayBuffer,
  modelName: string,
  boardSize: number,
  webgpuBatchSize: number,
  wasmPath: string,
  modelId: string
): {
  engineType: CreateEngineOptions['engineType'];
  executionProviders: (string | Record<string, unknown>)[];
  enableGraphCapture: boolean;
  staticBatchSize: number | undefined;
  needsWebGPUConversion: boolean;
  needsWebNNConversion: boolean;
} {
  let engineType: CreateEngineOptions['engineType'] = 'web';
  let executionProviders: (string | Record<string, unknown>)[] = ['wasm'];
  let enableGraphCapture = false;
  let needsWebGPUConversion = false;
  let needsWebNNConversion = false;

  // Detect static batch size from model name
  let staticBatchSize: number | undefined;
  const batchMatch = modelName.match(/static-b(\d+)/);
  if (batchMatch) {
    staticBatchSize = parseInt(batchMatch[1], 10);
  } else if (modelName.includes('.webgpu.')) {
    staticBatchSize = 1;
  }

  if (isTauri && (backend === 'native' || backend === 'native-cpu')) {
    engineType = 'native';
  } else if (isTauri && backend === 'pytorch') {
    engineType = 'pytorch';
  } else if (backend === 'webgpu') {
    executionProviders = ['webgpu'];
    needsWebGPUConversion = !isWebGPUOptimized(modelName);
    if (modelName.includes('.webgpu.') || needsWebGPUConversion) {
      enableGraphCapture = true;
    }
    if (needsWebGPUConversion) {
      staticBatchSize = webgpuBatchSize || WEBGPU_BATCH_SIZE;
    }
  } else if (backend === 'webnn') {
    executionProviders = [
      { name: 'webnn', deviceType: 'gpu', powerPreference: 'high-performance' },
    ];
    needsWebNNConversion = !isWebNNOptimized(modelName);
    staticBatchSize = webgpuBatchSize || WEBGPU_BATCH_SIZE;
  } else {
    // wasm
    executionProviders = ['wasm'];
  }

  // URL parameter override: ?gc=0 → disable graph capture
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('gc') === '0') {
      enableGraphCapture = false;
    }
  }

  return {
    engineType,
    executionProviders,
    enableGraphCapture,
    staticBatchSize,
    needsWebGPUConversion,
    needsWebNNConversion,
  };
}

/**
 * Run a warm-up inference to validate the GPU backend works correctly.
 * The OnnxEngine uses WebGPU error scopes (pushErrorScope/popErrorScope)
 * to detect async GPU validation errors that don't throw in JS.
 * This warmup triggers the first inference and lets any GPU error
 * propagate as an exception, which the fallback chain catches.
 */
async function validateWarmUpInference(engine: Engine, boardSize: number): Promise<void> {
  const emptyBoard: SignMap = Array.from({ length: boardSize }, () =>
    Array(boardSize).fill(0 as const)
  ) as SignMap;
  await engine.analyze(emptyBoard, {
    nextToPlay: 'B',
    komi: 7.5,
    history: [],
    skipCache: true,
  });
}

/** User-friendly backend display names */
function backendDisplayName(backend: string): string {
  switch (backend) {
    case 'webgpu':
    case 'webgpu-gc':
      return 'GPU';
    case 'native':
    case 'native-cpu':
      return 'Native';
    case 'pytorch':
      return 'PyTorch GPU';
    case 'wasm':
      return 'CPU';
    case 'webnn':
      return 'WebNN';
    default:
      return backend.toUpperCase();
  }
}

/** Quantization display labels for toasts */
const QUANT_LABELS: Record<ModelQuantization, string> = {
  fp32: 'Full Quality',
  fp16: 'Balanced',
  uint8: 'Compact',
};

/**
 * Show a user-friendly toast when all backends fail for a model.
 * Detects model compatibility issues (e.g., fp16) and suggests an alternative
 * model variant with a one-click switch.
 */
function showModelErrorRecoveryToast(
  errorMessage: string,
  modelName: string,
  selectedModelId: string | null,
  modelLibrary: Array<{
    id: string;
    isDownloaded: boolean;
    baseModelIndex?: number;
    quantization?: ModelQuantization;
  }>,
  setSelectedModelId: (id: string | null) => void,
  downloadModel: (id: string) => Promise<void>,
  setAIConfigOpen: (open: boolean) => void,
  showToast: (
    message: string,
    type: 'success' | 'error' | 'info',
    action?: { label: string; onClick: () => void }
  ) => void,
  t: (key: string, opts?: Record<string, string>) => string
): void {
  const isFp16Error =
    errorMessage.includes('float16') ||
    errorMessage.includes('fp16') ||
    errorMessage.includes('Float16');

  // If we can identify the current model's base, suggest an alternative quantization
  if (selectedModelId) {
    const parsed = parseModelId(selectedModelId);
    if (parsed) {
      const currentQuant = parsed.quantization;
      // Preferred alternatives: fp32 first, then uint8 (skip same quantization)
      const alternatives: ModelQuantization[] = ['fp32', 'uint8', 'fp16'].filter(
        q => q !== currentQuant
      ) as ModelQuantization[];

      // Find a downloaded alternative first
      for (const alt of alternatives) {
        const altId = getModelId(parsed.baseModelIndex, alt);
        const altModel = modelLibrary.find(m => m.id === altId);
        if (altModel?.isDownloaded) {
          const label = QUANT_LABELS[alt];
          showToast(
            isFp16Error
              ? t('aiConfig.modelIncompatible', { quant: QUANT_LABELS[currentQuant] })
              : t('aiConfig.allBackendsFailed'),
            'error',
            {
              label: t('aiConfig.switchToModel', { quant: label }),
              onClick: () => {
                setSelectedModelId(altId);
              },
            }
          );
          return;
        }
      }

      // No downloaded alternative — offer to download fp32
      const fp32Id = getModelId(parsed.baseModelIndex, 'fp32');
      const fp32Model = modelLibrary.find(m => m.id === fp32Id);
      if (fp32Model && !fp32Model.isDownloaded) {
        showToast(
          isFp16Error
            ? t('aiConfig.modelIncompatible', { quant: QUANT_LABELS[currentQuant] })
            : t('aiConfig.allBackendsFailed'),
          'error',
          {
            label: t('aiConfig.downloadAndSwitch', { quant: QUANT_LABELS['fp32'] }),
            onClick: async () => {
              try {
                await downloadModel(fp32Id);
                setSelectedModelId(fp32Id);
              } catch {
                showToast(t('aiConfig.modelDownloadFailed'), 'error');
              }
            },
          }
        );
        return;
      }
    }
  }

  // Generic fallback: open settings
  showToast(
    isFp16Error ? t('aiConfig.modelIncompatibleGeneric') : t('aiConfig.allBackendsFailed'),
    'error',
    {
      label: t('aiConfig.openSettings'),
      onClick: () => setAIConfigOpen(true),
    }
  );
}

export const AIEngineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    customAIModel,
    isModelLoaded,
    aiSettings,
    setAISettings,
    setAIConfigOpen,
    gameInfo,
    modelLibrary,
    selectedModelId,
    setSelectedModelId,
    downloadModel,
  } = useGameTree();
  const boardSize = gameInfo?.boardSize ?? 19;

  const { showToast } = useToast();
  const { t } = useTranslation();

  const [engine, setEngine] = useState<Engine | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeBackend, setActiveBackend] = useState<string | null>(null);
  const [nativeUploadProgress, setNativeUploadProgress] = useState<{
    stage: string;
    progress: number;
    message: string;
  } | null>(null);

  // Track if initialization is triggered to avoid duplicate requests
  const initializationTriggeredRef = useRef(false);

  // Track previous settings to detect actual user changes (not just re-renders)
  const prevSettingsRef = useRef({
    backend: aiSettings.backend,
    webgpuBatchSize: aiSettings.webgpuBatchSize,
    boardSize,
    modelName: customAIModel?.name || 'default',
  });

  // Dispose the current engine instance
  const disposeEngine = useCallback(async () => {
    // Clear React state first to prevent using a disposed engine
    setEngine(null);
    setActiveBackend(null);
    setError(null);
    if (globalEngineInstance) {
      try {
        await globalEngineInstance.dispose();
      } catch (err) {
        console.error('[AIEngine] Failed to dispose engine:', err);
      }
      globalEngineInstance = null;
      globalEnginePromise = null;
      globalEngineConfig = null;
    }
  }, []);

  // Initialize or reuse the engine
  const initializeEngine = useCallback(async () => {
    // Check if we can reuse the existing global instance
    const currentConfig = {
      modelName: customAIModel?.name || 'default',
      backend: aiSettings.backend,
      webgpuBatchSize: aiSettings.webgpuBatchSize,
      boardSize,
    };

    const configChanged =
      !globalEngineConfig ||
      globalEngineConfig.modelName !== currentConfig.modelName ||
      globalEngineConfig.backend !== currentConfig.backend ||
      globalEngineConfig.webgpuBatchSize !== currentConfig.webgpuBatchSize ||
      globalEngineConfig.boardSize !== currentConfig.boardSize;

    // Reuse existing instance if config matches
    if (globalEngineInstance && !configChanged) {
      setEngine(globalEngineInstance);
      setError(null);
      return;
    }

    // Need model to be loaded
    if (!isModelLoaded || !customAIModel) {
      setAIConfigOpen(true);
      return;
    }

    // Avoid duplicate initialization
    if (initializationTriggeredRef.current && globalEnginePromise) {
      try {
        const existingEngine = await globalEnginePromise;
        setEngine(existingEngine);
        setError(null);
      } catch {
        // Error will be handled by the original initialization
      }
      return;
    }

    initializationTriggeredRef.current = true;
    setIsInitializing(true);
    setError(null);

    try {
      // Dispose existing if config changed
      if (globalEngineInstance && configChanged) {
        // Clear React state BEFORE disposing to prevent analysis from running
        // on the disposed engine (worker is terminated during dispose)
        setEngine(null);
        await globalEngineInstance.dispose();
        globalEngineInstance = null;
        globalEnginePromise = null;
      }

      if (!globalEnginePromise) {
        globalEnginePromise = (async () => {
          let originalBuffer: ArrayBuffer;
          const modelData = customAIModel.data;

          if (modelData instanceof File) {
            originalBuffer = await modelData.arrayBuffer();
          } else if (modelData instanceof ArrayBuffer) {
            originalBuffer = modelData;
          } else if (typeof modelData === 'string') {
            const storedData = await loadModelData(modelData);
            if (!storedData) {
              throw new Error(`Model not found in storage: ${modelData}`);
            }
            originalBuffer = storedData;
          } else {
            throw new Error('Invalid model data type');
          }

          const isTauri = isTauriApp();
          const modelName = customAIModel?.name || '';

          // Compute WASM path
          // @ts-ignore
          const envPrefix = (import.meta as any).env?.VITE_ASSET_PREFIX;
          let wasmPath: string;
          if (isTauri) {
            wasmPath = '/wasm/';
          } else if (envPrefix && envPrefix !== '/') {
            wasmPath = envPrefix.endsWith('/') ? `${envPrefix}wasm/` : `${envPrefix}/wasm/`;
          } else {
            wasmPath = new URL('wasm/', document.baseURI || window.location.href).href;
          }

          const modelId = customAIModel?.name?.replace(/[^a-zA-Z0-9-_]/g, '_') ?? 'default';

          // Build fallback chain starting from the user's selected backend
          const fallbackChain = buildFallbackChain(aiSettings.backend, isTauri);
          let lastError: Error | null = null;
          let fallbackErrorLog: string | null = null;

          for (const backend of fallbackChain) {
            try {
              console.log(`[AIEngine] Trying backend: ${backend}`);
              let buffer = originalBuffer;

              const cfg = getEngineConfigForBackend(
                backend,
                isTauri,
                buffer,
                modelName,
                boardSize,
                aiSettings.webgpuBatchSize,
                wasmPath,
                modelId
              );

              // Auto-convert model for WebGPU if needed
              if (cfg.needsWebGPUConversion && !isTauri) {
                try {
                  const batchSize = aiSettings.webgpuBatchSize || WEBGPU_BATCH_SIZE;
                  console.log(
                    `[AIEngine] Auto-converting model for WebGPU (batch=${batchSize})...`
                  );
                  const result = await convertModelForWebGPU(buffer, { batchSize });
                  if (result.wasConverted) {
                    buffer = result.buffer;
                    cfg.staticBatchSize = batchSize;
                    console.log(`[AIEngine] Model converted: ${result.changes.join(', ')}`);
                  }
                } catch (err) {
                  console.warn('[AIEngine] Auto-conversion failed, using original model:', err);
                }
              }

              // Auto-convert model for WebNN if needed
              if (cfg.needsWebNNConversion && !isTauri) {
                try {
                  const webnnBatch = aiSettings.webgpuBatchSize || WEBGPU_BATCH_SIZE;
                  console.log(
                    `[AIEngine] Auto-converting model for WebNN (batch=${webnnBatch})...`
                  );
                  const result = await convertModelForWebNN(buffer, {
                    batchSize: webnnBatch,
                    boardSize,
                  });
                  if (result.wasConverted) {
                    buffer = result.buffer;
                    console.log(
                      `[AIEngine] WebNN model converted (${result.changes.length} changes)`
                    );
                  }
                } catch (err) {
                  console.warn(
                    '[AIEngine] WebNN auto-conversion failed, using original model:',
                    err
                  );
                }
              }

              const newEngine = await createEngine(
                {
                  modelBuffer: buffer,
                  modelId,
                  executionProvider: backend === 'native-cpu' ? 'cpu' : 'auto',
                  engineType: cfg.engineType,
                  wasmPath,
                  executionProviders: cfg.executionProviders as string[],
                  enableGraphCapture: cfg.enableGraphCapture,
                  staticBatchSize: cfg.staticBatchSize,
                  boardSize,
                  maxMoves: 10,
                  enableCache: true,
                  numThreads: Math.min(8, navigator.hardwareConcurrency || 4),
                  onProgress: progress => {
                    setNativeUploadProgress({
                      stage: progress.stage,
                      progress: progress.progress,
                      message: progress.message,
                    });
                  },
                },
                () =>
                  new Worker(new URL('../workers/ai.worker.js', import.meta.url), {
                    type: 'module',
                  })
              );

              setNativeUploadProgress(null);

              // Get which backend the engine actually ended up using
              const runtimeInfo = newEngine.getRuntimeInfo();
              const actualBackend = runtimeInfo.backend;

              // For GPU backends, run a warm-up inference to catch silent failures
              // Web: WebGPU validation errors are async and don't throw in JS
              // Desktop: ONNX Runtime may silently fall back to CPU for incompatible models (e.g. fp16)
              if (['webgpu', 'webgpu-gc', 'webnn', 'native'].includes(actualBackend)) {
                console.log(`[AIEngine] Running warm-up validation for ${actualBackend}...`);
                try {
                  await validateWarmUpInference(newEngine, boardSize);
                  console.log('[AIEngine] Warm-up validation passed');
                } catch (warmupErr) {
                  // Dispose the broken GPU engine before falling back
                  try {
                    await newEngine.dispose();
                  } catch {
                    // Ignore dispose errors
                  }
                  throw warmupErr;
                }
              }

              setActiveBackend(actualBackend);

              // If we fell back to a different backend, persist it in settings
              // so the user sees the actual backend and doesn't retry on reload.
              if (backend !== aiSettings.backend) {
                // Update currentConfig so globalEngineConfig matches
                // the new aiSettings.backend after state update
                const typedBackend = backend as AISettings['backend'];
                currentConfig.backend = typedBackend;
                setAISettings({ backend: typedBackend });

                // GPU → CPU fallback on desktop: show detailed toast with copy-error
                if (
                  aiSettings.backend === 'native' &&
                  backend === 'native-cpu' &&
                  fallbackErrorLog
                ) {
                  const errorLog = fallbackErrorLog;
                  showToast(t('aiConfig.gpuIncompatible'), 'error', {
                    label: t('aiConfig.copyError'),
                    onClick: () => {
                      writeClipboardText(errorLog);
                      showToast(t('aiConfig.errorCopied'), 'success');
                    },
                  });
                  // Suggest switching to FP32/UINT8 model for GPU
                  showToast(t('aiConfig.gpuModelHint'), 'info');
                } else {
                  showToast(`AI running on ${backendDisplayName(actualBackend)}`, 'info');
                }
              }

              console.log(
                `[AIEngine] Engine initialized | backend: ${actualBackend} | precision: ${runtimeInfo.inputDataType} | model: ${modelName || 'custom'}`
              );

              // Check precision consistency: compare expected vs actual
              if (selectedModelId) {
                const parsed = parseModelId(selectedModelId);
                if (parsed) {
                  const expectedDataType = parsed.quantization === 'fp16' ? 'float16' : 'float32';
                  if (runtimeInfo.inputDataType !== expectedDataType) {
                    console.warn(
                      `[AIEngine] Precision mismatch: selected ${parsed.quantization} (expected ${expectedDataType}), actual ${runtimeInfo.inputDataType}`
                    );
                    showToast(
                      t('aiConfig.precisionMismatch', {
                        expected: QUANT_LABELS[parsed.quantization],
                        actual: runtimeInfo.inputDataType,
                      }),
                      'info'
                    );
                  }
                }
              }

              return newEngine;
            } catch (err) {
              const message = err instanceof Error ? err.message : String(err);
              console.warn(`[AIEngine] Backend '${backend}' failed: ${message}`);
              lastError = err instanceof Error ? err : new Error(message);
              fallbackErrorLog = `[${backend}] ${message}`;
              // Continue to next backend in chain
            }
          }

          // All backends failed — show actionable recovery toast
          showModelErrorRecoveryToast(
            lastError?.message || '',
            modelName,
            selectedModelId,
            modelLibrary,
            setSelectedModelId,
            downloadModel,
            setAIConfigOpen,
            showToast,
            t
          );
          throw lastError || new Error('All AI backends failed to initialize');
        })();
      }

      const newEngine = await globalEnginePromise;
      globalEngineInstance = newEngine;
      globalEngineConfig = currentConfig;

      setEngine(newEngine);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(`Failed to initialize AI engine: ${message}`);
      console.error('[AIEngine] Initialization failed:', err);
      globalEnginePromise = null;
      globalEngineConfig = null;
    } finally {
      setIsInitializing(false);
      initializationTriggeredRef.current = false;
    }
  }, [
    customAIModel,
    isModelLoaded,
    aiSettings.backend,
    aiSettings.webgpuBatchSize,
    boardSize,
    setAIConfigOpen,
    showToast,
    t,
    modelLibrary,
    selectedModelId,
    setSelectedModelId,
    downloadModel,
  ]);

  // Auto-initialize when model becomes available
  useEffect(() => {
    if (isModelLoaded && customAIModel && !engine && !isInitializing && !error) {
      initializeEngine();
    }
  }, [isModelLoaded, customAIModel, engine, isInitializing, error, initializeEngine]);

  // Re-initialize when backend, batch size, board size, or model changes
  useEffect(() => {
    const prevSettings = prevSettingsRef.current;
    const currentModelName = customAIModel?.name || 'default';
    const settingsChanged =
      prevSettings.backend !== aiSettings.backend ||
      prevSettings.webgpuBatchSize !== aiSettings.webgpuBatchSize ||
      prevSettings.boardSize !== boardSize ||
      prevSettings.modelName !== currentModelName;

    // Always update the ref to track the latest settings
    prevSettingsRef.current = {
      backend: aiSettings.backend,
      webgpuBatchSize: aiSettings.webgpuBatchSize,
      boardSize,
      modelName: currentModelName,
    };

    if (!settingsChanged) return;

    if (engine && globalEngineConfig) {
      // Engine is running but config changed — re-initialize
      globalEnginePromise = null;
      initializeEngine();
    } else if (error && isModelLoaded && customAIModel && !isInitializing) {
      // In error state and user changed settings/model — clear error and retry
      setError(null);
      globalEnginePromise = null;
      initializeEngine();
    }
  }, [
    aiSettings.backend,
    aiSettings.webgpuBatchSize,
    boardSize,
    engine,
    error,
    isModelLoaded,
    customAIModel,
    isInitializing,
    initializeEngine,
  ]);

  const selectedQuantization: ModelQuantization | null = selectedModelId
    ? (parseModelId(selectedModelId)?.quantization ?? null)
    : null;

  const value: AIEngineContextValue = {
    engine,
    isEngineReady: engine !== null,
    isInitializing,
    error,
    activeBackend,
    nativeUploadProgress,
    selectedQuantization,
    initializeEngine,
    disposeEngine,
  };

  return <AIEngineContext.Provider value={value}>{children}</AIEngineContext.Provider>;
};
