/**
 * AI Engine Context
 *
 * Owns the AI engine singleton, the AnalysisQueue, and the unified
 * EngineStatus that drives the status pill. The fallback chain runner,
 * model loader, and probe/pick logic are extracted into siblings under
 * `./ai/`.
 *
 * Public API surface (engine, isEngineReady, isInitializing, error,
 * activeBackend, nativeUploadProgress, selectedQuantization,
 * initializeEngine, disposeEngine) is preserved for existing consumers.
 * New code should prefer `queue` and `status`.
 */

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import {
  AnalysisQueue,
  pickConfig,
  probeEnvironment,
  type AutoPick,
  type BackendId,
  type Engine,
  type Quantization,
} from '@kaya/ai-engine';
import { useTranslation } from 'react-i18next';
import { isTauriApp, writeClipboardText } from '@kaya/platform';
import { useGameTree } from './GameTreeContext';
import { useToast } from '../components/ui/Toast';
import { parseModelId, getModelId } from '../hooks/game/useAIAnalysis';
import type { ModelQuantization } from '../hooks/game/ai-analysis-types';
import type { AISettings } from '../types/game';
import { loadModelBuffer, modelIdFromName, resolveWasmPath } from './ai/engineLoader';
import { tryEngineChain, type ChainStepEvent } from './ai/engineChain';
import { idleStatus, isReady, type EngineStatus } from './ai/engineStatus';

// Module-level singletons survive StrictMode double-mount in dev. Without
// these, mounting the provider twice would tear down a half-initialized
// engine and re-create it from scratch.
let globalEngine: Engine | null = null;
let globalQueue: AnalysisQueue | null = null;
let globalEnginePromise: Promise<Engine> | null = null;
let globalEngineKey: string | null = null;
// Captured so the status pill can show backend + reasoning across
// provider remounts without re-running the probe.
let globalReadyStatus: EngineStatus | null = null;

export interface AIEngineContextValue {
  // New primary API
  queue: AnalysisQueue | null;
  status: EngineStatus;

  // Compat surface — derived from status; kept for existing consumers
  engine: Engine | null;
  isEngineReady: boolean;
  isInitializing: boolean;
  error: string | null;
  activeBackend: string | null;
  nativeUploadProgress: { stage: string; progress: number; message: string } | null;
  selectedQuantization: ModelQuantization | null;

  initializeEngine: () => void;
  disposeEngine: () => Promise<void>;
}

const AIEngineContext = createContext<AIEngineContextValue | null>(null);

export function useAIEngine(): AIEngineContextValue {
  const ctx = useContext(AIEngineContext);
  if (!ctx) throw new Error('useAIEngine must be used within an AIEngineProvider');
  return ctx;
}

export function useAIEngineOptional(): AIEngineContextValue | null {
  return useContext(AIEngineContext);
}

/** User-friendly backend display names for toasts. */
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

const QUANT_LABELS: Record<ModelQuantization, string> = {
  fp32: 'Full Quality',
  fp16: 'Balanced',
  uint8: 'Compact',
};

/**
 * Decide which backend chain to use:
 *  - settings.backend === 'auto' → full auto-pick (preferred default)
 *  - explicit setting → start from that backend, fall through the rest
 */
function resolveBackendChain(settings: AISettings, autoPick: AutoPick): BackendId[] {
  const explicit = settings.backend;
  if (!explicit || explicit === 'auto') {
    return autoPick.backendChain;
  }
  // Map old backend ids to BackendId; 'native' → 'native-gpu'
  const mapped: BackendId =
    explicit === 'native'
      ? 'native-gpu'
      : explicit === 'webnn' || explicit === 'webgl'
        ? 'wasm'
        : (explicit as BackendId);
  // Start from explicit, then fall through the auto chain (de-duped).
  return [mapped, ...autoPick.backendChain.filter(b => b !== mapped)];
}

/** Quantization label inferred from a model name (best effort). */
function quantFromModelName(name: string): ModelQuantization {
  if (/\.fp16\.|-fp16/i.test(name)) return 'fp16';
  if (/\.uint8\.|-quant/i.test(name)) return 'uint8';
  return 'fp32';
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
    analysisCache,
  } = useGameTree();
  const boardSize = gameInfo?.boardSize ?? 19;

  const { showToast } = useToast();
  const { t } = useTranslation();

  const [engine, setEngine] = useState<Engine | null>(globalEngine);
  const [queue, setQueue] = useState<AnalysisQueue | null>(globalQueue);
  const [status, setStatus] = useState<EngineStatus>(
    globalEngine ? (globalReadyStatus ?? buildReadyStatus()) : idleStatus
  );
  const [nativeUploadProgress, setNativeUploadProgress] = useState<{
    stage: string;
    progress: number;
    message: string;
  } | null>(null);

  const inFlightRef = useRef(false);

  // Track which (backend, model, board, batch) combo we last initialized for.
  const prevKeyRef = useRef<string | null>(globalEngineKey);

  const buildKey = useCallback((): string => {
    return JSON.stringify({
      modelName: customAIModel?.name || 'default',
      backend: aiSettings.backend ?? 'auto',
      webgpuBatchSize: aiSettings.webgpuBatchSize,
      boardSize,
    });
  }, [customAIModel?.name, aiSettings.backend, aiSettings.webgpuBatchSize, boardSize]);

  const disposeEngine = useCallback(async () => {
    setEngine(null);
    setQueue(null);
    setStatus(idleStatus);
    if (globalQueue) {
      try {
        await globalQueue.dispose();
      } catch (err) {
        console.error('[AIEngine] Failed to dispose queue:', err);
      }
      globalQueue = null;
    }
    if (globalEngine) {
      try {
        await globalEngine.dispose();
      } catch (err) {
        console.error('[AIEngine] Failed to dispose engine:', err);
      }
      globalEngine = null;
      globalEnginePromise = null;
      globalEngineKey = null;
      globalReadyStatus = null;
    }
  }, []);

  const initializeEngine = useCallback(async () => {
    const key = buildKey();

    // Reuse existing instance if config matches.
    if (globalEngine && globalQueue && globalEngineKey === key) {
      setEngine(globalEngine);
      setQueue(globalQueue);
      setStatus(globalReadyStatus ?? buildReadyStatus());
      return;
    }

    if (!isModelLoaded || !customAIModel) {
      setAIConfigOpen(true);
      return;
    }

    if (inFlightRef.current && globalEnginePromise) {
      try {
        await globalEnginePromise;
        if (globalEngine && globalQueue) {
          setEngine(globalEngine);
          setQueue(globalQueue);
          setStatus(globalReadyStatus ?? buildReadyStatus());
        }
      } catch {
        // The original initialization will have already surfaced the error.
      }
      return;
    }

    inFlightRef.current = true;
    setStatus({ phase: 'probing' });

    try {
      // Tear down any existing engine when key changed.
      if (globalEngine && globalEngineKey !== key) {
        setEngine(null);
        setQueue(null);
        if (globalQueue) await globalQueue.dispose();
        await globalEngine.dispose();
        globalEngine = null;
        globalQueue = null;
        globalEnginePromise = null;
        globalReadyStatus = null;
      }

      if (!globalEnginePromise) {
        globalEnginePromise = (async (): Promise<Engine> => {
          const isTauri = isTauriApp();
          const probe = await probeEnvironment();
          const autoPick = pickConfig(probe);
          const chain = resolveBackendChain(aiSettings, autoPick);
          const modelName = customAIModel?.name || '';
          const quant = quantFromModelName(modelName);

          setStatus({
            phase: 'loading-model',
            modelId: modelName || 'default',
            quantization: quant,
          });

          const buffer = await loadModelBuffer(customAIModel.data);

          const wasmPath = resolveWasmPath(isTauri);
          const modelId = modelIdFromName(modelName);
          const workerFactory = () =>
            new Worker(new URL('../workers/ai.worker.js', import.meta.url), { type: 'module' });

          let lastFailureMessage: string | null = null;
          let stepIndex = 0;

          const onStep = (event: ChainStepEvent) => {
            if (event.status === 'trying') {
              stepIndex++;
              setStatus({
                phase: 'initializing',
                backend: event.backend,
                chainStep: stepIndex,
                chainTotal: chain.length,
              });
            } else if (event.status === 'failed') {
              lastFailureMessage = `[${event.backend}] ${event.message ?? 'unknown error'}`;
              console.warn(`[AIEngine] Backend '${event.backend}' failed:`, event.message);
            }
          };

          const result = await tryEngineChain(chain, {
            modelBuffer: buffer,
            modelName,
            modelId,
            boardSize,
            webgpuBatchSize: aiSettings.webgpuBatchSize,
            wasmPath,
            isTauri,
            workerFactory,
            onUploadProgress: setNativeUploadProgress,
            onStep,
          });

          setNativeUploadProgress(null);

          // If we ended up on a different backend than the user explicitly
          // requested, persist the actual backend so we don't keep retrying.
          if (
            aiSettings.backend &&
            aiSettings.backend !== 'auto' &&
            aiSettings.backend !== result.activeBackend
          ) {
            const wantedGpu = aiSettings.backend === 'native';
            const fellToCpu = result.activeBackend === 'native-cpu';
            if (wantedGpu && fellToCpu && lastFailureMessage) {
              const errLog = lastFailureMessage;
              showToast(t('aiConfig.gpuIncompatible'), 'error', {
                label: t('aiConfig.copyError'),
                onClick: () => {
                  writeClipboardText(errLog);
                  showToast(t('aiConfig.errorCopied'), 'success');
                },
              });
              showToast(t('aiConfig.gpuModelHint'), 'info');
            } else {
              showToast(`AI running on ${backendDisplayName(result.activeBackend)}`, 'info');
            }
            setAISettings({ backend: result.activeBackend as AISettings['backend'] });
          }

          // Precision sanity check.
          if (selectedModelId) {
            const parsed = parseModelId(selectedModelId);
            if (parsed) {
              const expected = parsed.quantization === 'fp16' ? 'float16' : 'float32';
              if (result.inputDataType !== expected) {
                console.warn(
                  `[AIEngine] Precision mismatch — selected ${parsed.quantization}, got ${result.inputDataType}`
                );
                showToast(
                  t('aiConfig.precisionMismatch', {
                    expected: QUANT_LABELS[parsed.quantization],
                    actual: result.inputDataType,
                  }),
                  'info'
                );
              }
            }
          }

          console.log(
            `[AIEngine] ready — backend=${result.activeBackend} precision=${result.inputDataType} model=${modelName || 'custom'}`
          );

          // Capture the ready status (backend + reasoning) so subsequent
          // mounts/setState calls can show the same pill without re-probing.
          globalReadyStatus = {
            phase: 'ready',
            backend: result.activeBackend,
            quantization: quant,
            reasoning: autoPick.reasoning,
          };

          return result.engine;
        })();
      }

      const newEngine = await globalEnginePromise;
      const newQueue = new AnalysisQueue(newEngine, { cacheRef: analysisCache });
      globalEngine = newEngine;
      globalQueue = newQueue;
      globalEngineKey = key;
      prevKeyRef.current = key;

      setEngine(newEngine);
      setQueue(newQueue);
      setStatus(globalReadyStatus ?? buildReadyStatus());
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus({ phase: 'error', message });
      globalEnginePromise = null;
      globalEngineKey = null;
      globalReadyStatus = null;
      console.error('[AIEngine] Initialization failed:', err);
      showModelErrorRecoveryToast(
        message,
        selectedModelId,
        modelLibrary,
        setSelectedModelId,
        downloadModel,
        setAIConfigOpen,
        showToast,
        t
      );
    } finally {
      inFlightRef.current = false;
    }
  }, [
    buildKey,
    isModelLoaded,
    customAIModel,
    aiSettings,
    boardSize,
    setAIConfigOpen,
    setAISettings,
    showToast,
    t,
    selectedModelId,
    setSelectedModelId,
    modelLibrary,
    downloadModel,
    analysisCache,
  ]);

  // Auto-init when model is ready.
  useEffect(() => {
    if (
      isModelLoaded &&
      customAIModel &&
      !engine &&
      status.phase !== 'error' &&
      !inFlightRef.current
    ) {
      void initializeEngine();
    }
  }, [isModelLoaded, customAIModel, engine, status.phase, initializeEngine]);

  // Re-init when relevant settings change.
  useEffect(() => {
    const key = buildKey();
    if (prevKeyRef.current === null) {
      prevKeyRef.current = key;
      return;
    }
    if (prevKeyRef.current === key) return;
    prevKeyRef.current = key;
    if (engine || status.phase === 'error') {
      globalEnginePromise = null;
      void initializeEngine();
    }
  }, [buildKey, engine, status.phase, initializeEngine]);

  const selectedQuantization: ModelQuantization | null = selectedModelId
    ? (parseModelId(selectedModelId)?.quantization ?? null)
    : null;

  const value: AIEngineContextValue = {
    queue,
    status,
    engine,
    isEngineReady: isReady(status) && engine !== null,
    isInitializing:
      status.phase === 'probing' ||
      status.phase === 'loading-model' ||
      status.phase === 'initializing',
    error: status.phase === 'error' ? status.message : null,
    activeBackend: isReady(status) ? status.backend : null,
    nativeUploadProgress,
    selectedQuantization,
    initializeEngine,
    disposeEngine,
  };

  return <AIEngineContext.Provider value={value}>{children}</AIEngineContext.Provider>;
};

function buildReadyStatus(): EngineStatus {
  // We don't preserve auto-pick reasoning across module reloads; rebuild
  // a minimal ready status. The provider re-derives full reasoning on
  // its next initialize() call, which happens on first settings change.
  return { phase: 'ready', backend: 'unknown', quantization: 'fp32', reasoning: '' };
}

/**
 * When all backends fail for a model, surface a recovery toast that
 * either suggests an alternative quantization (downloaded if possible,
 * else offers to download fp32) or offers to open the settings panel.
 */
function showModelErrorRecoveryToast(
  errorMessage: string,
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
  const isFp16Error = /float16|fp16|Float16/.test(errorMessage);

  if (selectedModelId) {
    const parsed = parseModelId(selectedModelId);
    if (parsed) {
      const currentQuant = parsed.quantization;
      const alternatives: ModelQuantization[] = (
        ['fp32', 'uint8', 'fp16'] as ModelQuantization[]
      ).filter(q => q !== currentQuant);

      for (const alt of alternatives) {
        const altId = getModelId(parsed.baseModelIndex, alt);
        const altModel = modelLibrary.find(m => m.id === altId);
        if (altModel?.isDownloaded) {
          showToast(
            isFp16Error
              ? t('aiConfig.modelIncompatible', { quant: QUANT_LABELS[currentQuant] })
              : t('aiConfig.allBackendsFailed'),
            'error',
            {
              label: t('aiConfig.switchToModel', { quant: QUANT_LABELS[alt] }),
              onClick: () => setSelectedModelId(altId),
            }
          );
          return;
        }
      }

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

  showToast(
    isFp16Error ? t('aiConfig.modelIncompatibleGeneric') : t('aiConfig.allBackendsFailed'),
    'error',
    {
      label: t('aiConfig.openSettings'),
      onClick: () => setAIConfigOpen(true),
    }
  );
}

// Re-export the supporting types so they're discoverable from this module.
export type { EngineStatus, BackendId, Quantization };
