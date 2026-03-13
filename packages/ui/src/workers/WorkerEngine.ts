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

export class WorkerEngine extends Engine {
  private worker: Worker;
  private pendingRequests: Map<
    number,
    {
      resolve: (val: any) => void;
      reject: (err: any) => void;
      timeout: ReturnType<typeof setTimeout>;
      onProgress?: (progress: any) => void;
    }
  >;
  private nextRequestId: number = 0;
  private initPromise: Promise<void> | null = null;
  private debugEnabled = false;
  private runtimeInfo: EngineRuntimeInfo | null = null;

  constructor(worker: Worker, config: OnnxEngineConfig & { debug?: boolean }) {
    super(config);
    this.worker = worker;
    this.pendingRequests = new Map();
    this.debugEnabled = Boolean(config.debug);

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
          clearTimeout(req.timeout);
          req.resolve(msg.result);
          this.pendingRequests.delete(msg.id);
          this.debugLog('analyze-resolve', { id: msg.id });
        }
      } else if (msg.type === 'analyzeBatch_success') {
        const req = this.pendingRequests.get(msg.id);
        if (req) {
          clearTimeout(req.timeout);
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
      } else if (msg.type === 'error') {
        if (msg.id !== undefined) {
          const req = this.pendingRequests.get(msg.id);
          if (req) {
            clearTimeout(req.timeout);
            req.reject(new Error(msg.error));
            this.pendingRequests.delete(msg.id);
            this.debugLog('request-error', { id: msg.id, error: msg.error });
          }
        } else {
          console.error('[AI:Worker] Error:', msg.error);
        }
      }
    };
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
      const handler = (e: MessageEvent) => {
        if (e.data.type === 'init_success') {
          this.worker.removeEventListener('message', handler);
          this.initialized = true;
          // Store runtime info from worker
          if (e.data.runtimeInfo) {
            this.runtimeInfo = e.data.runtimeInfo;
          }
          this.debugLog('init-success', { runtimeInfo: this.runtimeInfo });
          resolve();
        } else if (e.data.type === 'error' && !e.data.id) {
          this.worker.removeEventListener('message', handler);
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
    return new Promise((resolve, reject) => {
      const id = this.nextRequestId++;
      this.debugLog('analyze-request', { id });

      // Extract non-cloneable props before postMessage
      const onProgress = (options as any).onProgress as ((p: any) => void) | undefined;
      const signal = (options as any).signal as AbortSignal | undefined;
      const { onProgress: _p, signal: _s, ...serializableOptions } = options as any;

      const timeout = setTimeout(() => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.delete(id);
          reject(new Error('Analysis timed out'));
          this.debugLog('analyze-timeout', { id });
        }
      }, 60000);

      this.pendingRequests.set(id, { resolve, reject, timeout, onProgress });

      // Listen for abort signal and forward to worker
      if (signal) {
        if (signal.aborted) {
          clearTimeout(timeout);
          this.pendingRequests.delete(id);
          reject(new AbortedError());
          return;
        }
        signal.addEventListener(
          'abort',
          () => {
            this.worker.postMessage({ type: 'abort', id });
          },
          { once: true }
        );
      }

      this.worker.postMessage({ type: 'analyze', id, signMap, options: serializableOptions });
    });
  }

  async analyzeBatch(
    inputs: { signMap: SignMap; options?: EngineAnalysisOptions }[]
  ): Promise<AnalysisResult[]> {
    return new Promise((resolve, reject) => {
      const id = this.nextRequestId++;
      this.debugLog('batch-request', { id, batchSize: inputs.length });
      const timeout = setTimeout(() => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.delete(id);
          reject(new Error('Batch analysis timed out'));
          this.debugLog('batch-timeout', { id });
        }
      }, 60000);

      this.pendingRequests.set(id, { resolve, reject, timeout });

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
    return new Promise(resolve => {
      const handler = (e: MessageEvent) => {
        if (e.data.type === 'dispose_success') {
          this.worker.removeEventListener('message', handler);
          this.worker.terminate();
          this.initialized = false;
          resolve();
        }
      };
      this.worker.addEventListener('message', handler);
      this.worker.postMessage({ type: 'dispose' });
    });
  }

  /**
   * Abort all pending analysis requests immediately.
   * This doesn't stop the worker, but rejects all pending promises so callers can exit early.
   * The worker will continue processing but results will be ignored.
   */
  abortPendingRequests(): void {
    this.debugLog('abort-all', { pending: this.pendingRequests.size });
    for (const [id, req] of this.pendingRequests) {
      clearTimeout(req.timeout);
      req.reject(new AbortedError());
      this.debugLog('abort-request', { id });
    }
    this.pendingRequests.clear();
  }
}
