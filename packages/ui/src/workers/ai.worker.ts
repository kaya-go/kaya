import { OnnxEngine, type OnnxEngineConfig } from '@kaya/ai-engine';
import type { SignMap } from '@kaya/goboard';

// Define message types
type WorkerMessage =
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

let engine: OnnxEngine | null = null;
let isProcessing = false;
const messageQueue: MessageEvent<WorkerMessage>[] = [];
// Track AbortControllers for in-flight MCTS requests
const activeAbortControllers = new Map<number, AbortController>();

const processQueue = async () => {
  if (isProcessing || messageQueue.length === 0) return;

  isProcessing = true;
  const e = messageQueue.shift()!;
  const msg = e.data;

  try {
    switch (msg.type) {
      case 'init':
        if (engine) {
          await engine.dispose();
        }
        engine = new OnnxEngine(msg.config);
        await engine.initialize();
        // Send runtime info along with success
        const runtimeInfo = engine.getRuntimeInfo();
        self.postMessage({ type: 'init_success', runtimeInfo });
        break;

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
            self.postMessage({ type: 'mcts_progress', id: msg.id, progress });
          },
        };
        const result = await engine.analyze(msg.signMap, optionsWithCallbacks);
        // If the request was aborted, the controller has already been removed.
        // Treat the partial result as discarded — surface an explicit error so
        // the UI knows not to use it (and not to write it to cache).
        const wasAborted = !activeAbortControllers.has(msg.id);
        activeAbortControllers.delete(msg.id);
        if (wasAborted) {
          self.postMessage({
            type: 'error',
            id: msg.id,
            error: 'aborted',
          });
        } else {
          self.postMessage({ type: 'analyze_success', id: msg.id, result });
        }
        break;
      }

      case 'analyzeBatch':
        if (!engine) throw new Error('Engine not initialized');
        const results = await engine.analyzeBatch(msg.inputs);
        self.postMessage({ type: 'analyzeBatch_success', id: msg.id, results });
        break;

      case 'dispose':
        if (engine) {
          await engine.dispose();
          engine = null;
        }
        self.postMessage({ type: 'dispose_success' });
        break;

      case 'clearCache':
        if (engine) {
          engine.clearCache();
        }
        self.postMessage({ type: 'clearCache_success' });
        break;

      case 'getRuntimeInfo':
        if (engine) {
          self.postMessage({ type: 'runtimeInfo', runtimeInfo: engine.getRuntimeInfo() });
        } else {
          self.postMessage({ type: 'runtimeInfo', runtimeInfo: null });
        }
        break;
    }
  } catch (error) {
    console.error('[Worker] Error:', error);
    self.postMessage({
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

self.onmessage = (e: MessageEvent<WorkerMessage>) => {
  // Handle abort immediately without queuing
  if (e.data.type === 'abort') {
    const ac = activeAbortControllers.get(e.data.id);
    if (ac) {
      ac.abort();
      activeAbortControllers.delete(e.data.id);
    }
    return;
  }

  // Fire an immediate 0/N progress acknowledgment for analyze requests so the
  // UI can transition to its "preparing" state right away — without this, the
  // user sees nothing during the 100ms-2s window between aborting an in-flight
  // MCTS and the queue actually starting the new run. The MCTS itself will
  // emit its own initial 0/N event again when it actually starts; the UI
  // dedupes naturally since the values are identical.
  if (e.data.type === 'analyze') {
    const numVisits = (e.data.options?.numVisits as number | undefined) ?? 1;
    self.postMessage({
      type: 'mcts_progress',
      id: e.data.id,
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

  messageQueue.push(e);
  processQueue();
};
