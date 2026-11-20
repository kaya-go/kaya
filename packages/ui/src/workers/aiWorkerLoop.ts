/**
 * The AI worker's message loop, apart from the worker global so it can be
 * tested: `ai.worker.ts` only wires it to `self` and `OnnxEngine`.
 *
 * Messages run one at a time, in arrival order, except `abort`, which acts at
 * once on the request it names.
 */
import type {
  AnalysisResult,
  EngineAnalysisOptions,
  EngineRuntimeInfo,
  OnnxEngineConfig,
} from '@kaya/ai-engine';
import type { SignMap } from '@kaya/goboard';

export type WorkerMessage =
  | { type: 'init'; config: OnnxEngineConfig }
  | { type: 'analyze'; id: number; signMap: SignMap; options: any }
  | {
      type: 'analyzeBatch';
      id: number;
      inputs: { signMap: SignMap; options?: any }[];
    }
  | { type: 'dispose' }
  | { type: 'clearCache' }
  | { type: 'getRuntimeInfo' }
  | { type: 'abort'; id: number };

/** The part of `OnnxEngine` the loop drives. */
export interface WorkerLoopEngine {
  onEngineLost: ((error: Error) => void) | null;
  initialize(): Promise<void>;
  analyze(signMap: SignMap, options?: EngineAnalysisOptions): Promise<AnalysisResult>;
  analyzeBatch(inputs: { signMap: SignMap; options?: any }[]): Promise<AnalysisResult[]>;
  getRuntimeInfo(): EngineRuntimeInfo;
  clearCache(): void;
  dispose(): Promise<void>;
}

export interface WorkerLoopDeps {
  post: (message: unknown) => void;
  createEngine: (config: OnnxEngineConfig) => WorkerLoopEngine;
}

export function createAIWorkerLoop({ post, createEngine }: WorkerLoopDeps) {
  let engine: WorkerLoopEngine | null = null;
  let isProcessing = false;
  const messageQueue: WorkerMessage[] = [];
  // Track AbortControllers for in-flight MCTS requests
  const activeAbortControllers = new Map<number, AbortController>();

  const processQueue = async () => {
    if (isProcessing || messageQueue.length === 0) return;

    isProcessing = true;
    const msg = messageQueue.shift()!;

    try {
      switch (msg.type) {
        case 'init': {
          if (engine) {
            await engine.dispose();
          }
          engine = createEngine(msg.config);
          engine.onEngineLost = error => {
            post({ type: 'engine_lost', error: error.message });
          };
          await engine.initialize();
          // Send runtime info along with success
          const runtimeInfo = engine.getRuntimeInfo();
          post({ type: 'init_success', runtimeInfo });
          break;
        }

        case 'analyze': {
          if (!engine) throw new Error('Engine not initialized');
          // Create AbortController and progress callback for MCTS.
          const ac = new AbortController();
          activeAbortControllers.set(msg.id, ac);
          const optionsWithCallbacks = {
            ...msg.options,
            signal: ac.signal,
            onProgress: (progress: any) => {
              // Suppress progress emission for aborted requests. The MCTS loop
              // may emit one or two more progress events between the abort
              // signal and its actual exit; without this guard those events
              // arrive at the UI tagged to a request the user already left.
              if (!activeAbortControllers.has(msg.id)) return;
              post({ type: 'mcts_progress', id: msg.id, progress });
            },
          };
          const result = await engine.analyze(msg.signMap, optionsWithCallbacks);
          // If the request was aborted, the controller has already been removed.
          // Treat the partial result as discarded — surface an explicit error so
          // the UI knows not to use it (and not to write it to cache).
          const wasAborted = !activeAbortControllers.has(msg.id);
          activeAbortControllers.delete(msg.id);
          if (wasAborted) {
            post({ type: 'error', id: msg.id, error: 'aborted' });
          } else {
            post({ type: 'analyze_success', id: msg.id, result });
          }
          break;
        }

        case 'analyzeBatch': {
          if (!engine) throw new Error('Engine not initialized');
          const results = await engine.analyzeBatch(msg.inputs);
          post({ type: 'analyzeBatch_success', id: msg.id, results });
          break;
        }

        case 'dispose':
          if (engine) {
            await engine.dispose();
            engine = null;
          }
          post({ type: 'dispose_success' });
          break;

        case 'clearCache':
          if (engine) {
            engine.clearCache();
          }
          post({ type: 'clearCache_success' });
          break;

        case 'getRuntimeInfo':
          post({ type: 'runtimeInfo', runtimeInfo: engine ? engine.getRuntimeInfo() : null });
          break;
      }
    } catch (error) {
      console.error('[Worker] Error:', error);
      post({
        type: 'error',
        id: msg.type === 'analyze' || msg.type === 'analyzeBatch' ? msg.id : undefined,
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      isProcessing = false;
      // Process next message
      if (messageQueue.length > 0) {
        processQueue();
      }
    }
  };

  const onMessage = (data: WorkerMessage) => {
    // Handle abort immediately without queuing
    if (data.type === 'abort') {
      const ac = activeAbortControllers.get(data.id);
      if (ac) {
        ac.abort();
        activeAbortControllers.delete(data.id);
      }
      return;
    }

    // Fire an immediate 0/N progress acknowledgment for analyze requests so the
    // UI can transition to its "preparing" state right away — without this, the
    // user sees nothing during the 100ms-2s window between aborting an in-flight
    // MCTS and the queue actually starting the new run. The MCTS itself will
    // emit its own initial 0/N event again when it actually starts; the UI
    // dedupes naturally since the values are identical.
    if (data.type === 'analyze') {
      const numVisits = (data.options?.numVisits as number | undefined) ?? 1;
      post({
        type: 'mcts_progress',
        id: data.id,
        progress: {
          completedVisits: 0,
          totalVisits: numVisits,
          bestMove: '',
          bestMoveVisits: 0,
          winRate: 0.5,
          scoreLead: 0,
          topMoves: [],
        },
      });
    }

    messageQueue.push(data);
    processQueue();
  };

  return { onMessage };
}
