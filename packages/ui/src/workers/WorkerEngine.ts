import {
  Engine,
  type AnalysisResult,
  type EngineAnalysisOptions,
  type EngineCapabilities,
  type EngineRuntimeInfo,
  type OnnxEngineConfig,
} from '@kaya/ai-engine';
import type { SignMap } from '@kaya/goboard';

// Custom error for aborted requests
export class AbortedError extends Error {
  constructor() {
    super('Analysis aborted');
    this.name = 'AbortedError';
  }
}

/** How long dispose() waits for the worker to release its session. */
const DISPOSE_TIMEOUT_MS = 5000;

/**
 * How long the worker may stay silent while it owes an answer. The worker runs
 * one request at a time and a search reports progress after every evaluation
 * (`runMCTS`, forced visits included), so silence means it is stuck, however
 * deep the search or long the queue.
 */
const STALL_TIMEOUT_MS = 60_000;

export class WorkerEngine extends Engine {
  private worker: Worker;
  private pendingRequests: Map<
    number,
    {
      resolve: (val: any) => void;
      reject: (err: any) => void;
      onProgress?: (progress: any) => void;
    }
  >;
  /** Armed while a request is pending; any message from the worker restarts it. */
  private watchdog: ReturnType<typeof setTimeout> | null = null;
  private nextRequestId: number = 0;
  private initPromise: Promise<void> | null = null;
  private rejectInit: ((error: Error) => void) | null = null;
  /** Set once the worker itself failed: nothing it was asked will ever answer. */
  private failure: Error | null = null;
  private debugEnabled = false;
  private runtimeInfo: EngineRuntimeInfo | null = null;

  constructor(worker: Worker, config: OnnxEngineConfig & { debug?: boolean }) {
    super(config);
    this.worker = worker;
    this.pendingRequests = new Map();
    this.debugEnabled = Boolean(config.debug);

    // A worker whose script fails to load (a hashed chunk gone after a deploy)
    // or throws at its top level fires `error`, never a message. Without these,
    // initialize() and every pending request would wait forever.
    this.worker.onerror = e => {
      e.preventDefault();
      this.fail(new Error(`AI worker failed: ${e.message || 'the worker script did not load'}`));
    };
    this.worker.onmessageerror = () => {
      this.fail(new Error('AI worker sent a message that could not be read'));
    };

    this.worker.onmessage = e => {
      const msg = e.data;
      this.debugLog('worker-message', {
        type: msg.type,
        id: msg.id,
      });

      if (msg.type === 'init_success') {
        // Handled by initialize() promise
      } else if (msg.type === 'analyze_success') {
        const req = this.pendingRequests.get(msg.id);
        if (req) {
          req.resolve(msg.result);
          this.pendingRequests.delete(msg.id);
          this.debugLog('analyze-resolve', { id: msg.id });
        }
      } else if (msg.type === 'analyzeBatch_success') {
        const req = this.pendingRequests.get(msg.id);
        if (req) {
          req.resolve(msg.results);
          this.pendingRequests.delete(msg.id);
          this.debugLog('batch-resolve', { id: msg.id, batchSize: msg.results?.length });
        }
      } else if (msg.type === 'mcts_progress') {
        const req = this.pendingRequests.get(msg.id);
        if (req?.onProgress) {
          req.onProgress(msg.progress);
        }
      } else if (msg.type === 'dispose_success') {
        // Handled by dispose() promise
      } else if (msg.type === 'engine_lost') {
        this.onEngineLost?.(new Error(msg.error));
      } else if (msg.type === 'error') {
        if (msg.id !== undefined) {
          const req = this.pendingRequests.get(msg.id);
          if (req) {
            req.reject(new Error(msg.error));
            this.pendingRequests.delete(msg.id);
            this.debugLog('request-error', { id: msg.id, error: msg.error });
          }
        } else {
          console.error('[AI:Worker] Error:', msg.error);
        }
      }

      // The worker spoke, so it is still working through its queue.
      this.restartWatchdog();
    };
  }

  /** Rejects initialization and every pending request with the worker's failure. */
  private fail(error: Error) {
    this.failure = error;
    this.rejectInit?.(error);
    this.rejectInit = null;
    for (const req of this.pendingRequests.values()) {
      req.reject(error);
    }
    this.pendingRequests.clear();
    this.restartWatchdog();
  }

  /** Arms the watchdog for a new request, unless it is already running. */
  private track(
    id: number,
    request: {
      resolve: (val: any) => void;
      reject: (err: any) => void;
      onProgress?: (progress: any) => void;
    }
  ) {
    this.pendingRequests.set(id, request);
    if (!this.watchdog) this.restartWatchdog();
  }

  private restartWatchdog() {
    if (this.watchdog) clearTimeout(this.watchdog);
    this.watchdog =
      this.pendingRequests.size > 0 ? setTimeout(() => this.stalled(), STALL_TIMEOUT_MS) : null;
  }

  /**
   * The worker owes answers and has said nothing for STALL_TIMEOUT_MS. Abort
   * every pending request in the worker as well: a search left running there
   * would hold up every request sent after it.
   */
  private stalled() {
    this.watchdog = null;
    for (const [id, req] of this.pendingRequests) {
      this.worker.postMessage({ type: 'abort', id });
      req.reject(
        new Error(`Analysis timed out: the AI worker sent nothing for ${STALL_TIMEOUT_MS / 1000} s`)
      );
      this.debugLog('request-timeout', { id });
    }
    this.pendingRequests.clear();
  }

  private debugLog(event: string, payload?: Record<string, unknown>) {
    if (!this.debugEnabled) return;
    if (payload) {
      console.log('[WorkerEngine][debug]', event, payload);
    } else {
      console.log('[WorkerEngine][debug]', event);
    }
  }

  async initialize(): Promise<void> {
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve, reject) => {
      if (this.failure) {
        reject(this.failure);
        return;
      }
      this.rejectInit = reject;
      const handler = (e: MessageEvent) => {
        if (e.data.type === 'init_success') {
          this.worker.removeEventListener('message', handler);
          this.rejectInit = null;
          this.initialized = true;
          // Store runtime info from worker
          if (e.data.runtimeInfo) {
            this.runtimeInfo = e.data.runtimeInfo;
          }
          this.debugLog('init-success', { runtimeInfo: this.runtimeInfo });
          resolve();
        } else if (e.data.type === 'error' && !e.data.id) {
          this.worker.removeEventListener('message', handler);
          this.rejectInit = null;
          reject(new Error(e.data.error));
        }
      };
      this.worker.addEventListener('message', handler);
      this.debugLog('init-request');
      this.worker.postMessage({ type: 'init', config: this.config });
    });

    return this.initPromise;
  }

  getCapabilities(): EngineCapabilities {
    return {
      name: 'KataGo (Worker)',
      version: '1.0.0',
      supportedBoardSizes: [],
      supportsParallel: true,
      providesPV: false,
      providesWinRate: false,
      providesScoreLead: true,
    };
  }

  /**
   * Get runtime information about the engine, including fallback status
   */
  getRuntimeInfo(): EngineRuntimeInfo {
    return (
      this.runtimeInfo ?? {
        backend: 'wasm',
        inputDataType: 'float32',
      }
    );
  }

  protected async analyzePosition(
    signMap: SignMap,
    options: EngineAnalysisOptions
  ): Promise<AnalysisResult> {
    if (this.failure) throw this.failure;
    return new Promise((resolve, reject) => {
      const id = this.nextRequestId++;
      this.debugLog('analyze-request', { id });

      // Extract non-cloneable props before postMessage
      const onProgress = (options as any).onProgress as ((p: any) => void) | undefined;
      const signal = (options as any).signal as AbortSignal | undefined;
      const { onProgress: _p, signal: _s, ...serializableOptions } = options as any;

      if (signal?.aborted) {
        reject(new AbortedError());
        return;
      }
      // Stop the search in the worker, or drop it from the worker's queue, and
      // answer the caller now: the worker can take a whole batch to stop.
      signal?.addEventListener(
        'abort',
        () => {
          if (!this.pendingRequests.delete(id)) return;
          this.worker.postMessage({ type: 'abort', id });
          reject(new AbortedError());
          this.restartWatchdog();
        },
        { once: true }
      );

      this.track(id, { resolve, reject, onProgress });
      this.worker.postMessage({ type: 'analyze', id, signMap, options: serializableOptions });
    });
  }

  async analyzeBatch(
    inputs: { signMap: SignMap; options?: EngineAnalysisOptions }[]
  ): Promise<AnalysisResult[]> {
    if (this.failure) throw this.failure;
    return new Promise((resolve, reject) => {
      const id = this.nextRequestId++;
      this.debugLog('batch-request', { id, batchSize: inputs.length });
      this.track(id, { resolve, reject });

      // Strip non-cloneable props (signal, onProgress) from each input's options
      const serializableInputs = inputs.map(input => {
        if (!input.options) return input;
        const { onProgress: _p, signal: _s, ...opts } = input.options as any;
        return { signMap: input.signMap, options: opts };
      });

      this.worker.postMessage({ type: 'analyzeBatch', id, inputs: serializableInputs });
    });
  }

  clearCache(): void {
    super.clearCache();
    this.worker.postMessage({ type: 'clearCache' });
    this.debugLog('clear-cache-request');
  }

  async dispose(): Promise<void> {
    // Let the worker release its session, but do not wait on a worker that
    // failed or stopped answering: terminating it frees everything anyway.
    if (!this.failure) {
      await new Promise<void>(resolve => {
        const done = () => {
          clearTimeout(timer);
          this.worker.removeEventListener('message', handler);
          resolve();
        };
        const handler = (e: MessageEvent) => {
          if (e.data.type === 'dispose_success') done();
        };
        const timer = setTimeout(done, DISPOSE_TIMEOUT_MS);
        this.worker.addEventListener('message', handler);
        this.worker.postMessage({ type: 'dispose' });
      });
    }
    this.worker.terminate();
    this.initialized = false;
  }
}
