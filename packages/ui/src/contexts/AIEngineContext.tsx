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
import {
  QUANT_LABELS,
  backendDisplayName,
  buildReadyStatus,
  quantFromModelName,
  resolveBackendChain,
} from './ai/engineHelpers';
import { showModelErrorRecoveryToast } from './ai/modelErrorRecovery';

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

// Re-export the supporting types so they're discoverable from this module.
export type { EngineStatus, BackendId, Quantization };
