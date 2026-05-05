/**
 * AnalysisQueue — single owner of analysis requests, the engine handle,
 * cache, and cancellation. Wraps an Engine; both useLiveAnalysis and
 * useFullGameAnalysis push requests onto this queue.
 *
 * Semantics
 *   - One in-flight engine.analyze() at a time (engine constraint).
 *   - Two priority lanes: 'live' (high) and 'batch' (low).
 *   - A new 'live' request preempts a running 'batch' — the batch is
 *     aborted and re-enqueued with a fresh AbortController, transparent
 *     to its caller.
 *   - A new 'live' request also replaces any pending 'live' (only the
 *     latest navigation target matters).
 *   - Explicit cancel(id) / cancelTag(tag) rejects the submitter's promise.
 *   - Cache is monotonic on visit count: a cached result with N visits
 *     satisfies any request asking for ≤ N visits.
 *   - Caller may pass a `cacheKey` (computed by the same generator the
 *     SGF persistence layer uses); otherwise the queue computes its own.
 *   - Caller may pass a `cacheRef` Map at construction so the cache is
 *     shared with other subsystems (e.g. SGF save/load).
 */

import type { Sign, SignMap } from '@kaya/goboard';
import type { Engine } from './base-engine';
import type { MCTSProgress } from './onnx-types';
import type { AnalysisResult } from './types';

export type Priority = 'live' | 'batch';
export type RequestId = string;

export interface AnalysisRequest {
  signMap: SignMap;
  nextToPlay: 'B' | 'W';
  komi: number;
  history: Array<{ color: Sign; x: number; y: number }>;
  numVisits: number;
  priority: Priority;
  /** Optional tag for bulk cancellation (e.g. "full-game"). */
  tag?: string;
  /** Force-visit a specific GTP move so it has full MCTS stats. */
  includeMove?: string;
  /** Live progress callback. Only the latest progress is delivered. */
  onProgress?: (p: MCTSProgress) => void;
  /** Pre-computed cache key (must match the SGF persistence keygen). */
  cacheKey?: string;
  /** Engine-specific extras (e.g. koInfo) forwarded to engine.analyze. */
  extra?: Record<string, unknown>;
}

export interface SubmitHandle {
  id: RequestId;
  result: Promise<AnalysisResult>;
}

export interface CacheRef {
  current: Map<string, AnalysisResult>;
}

export interface AnalysisQueueOptions {
  /** Max cache entries (LRU). Default 1000. Ignored if cacheRef is provided. */
  cacheSize?: number;
  /**
   * Shared cache. When provided, the queue reads/writes against this Map
   * instead of an internal one — used to share state with SGF persistence.
   */
  cacheRef?: CacheRef;
}

interface InternalRequest {
  kind: 'single';
  id: RequestId;
  request: AnalysisRequest;
  resolve: (r: AnalysisResult) => void;
  reject: (e: unknown) => void;
  /** Replaced each attempt — preemption aborts the current one. */
  controller: AbortController;
  /** Set on the in-flight copy that was preempted; the queued copy is fresh. */
  preempted: boolean;
}

interface InternalBatch {
  kind: 'batch';
  id: RequestId;
  requests: AnalysisRequest[];
  resolvers: Array<(r: AnalysisResult) => void>;
  rejecters: Array<(e: unknown) => void>;
  controller: AbortController;
  preempted: boolean;
  /** All sub-requests share priority; we copy from the first. */
  priority: Priority;
  tag?: string;
}

type Item = InternalRequest | InternalBatch;

export class AnalysisQueue {
  private engine: Engine;
  private cache: Map<string, AnalysisResult>;
  private cacheSize: number;
  private liveQueue: Item[] = [];
  private batchQueue: Item[] = [];
  private inFlight: Item | null = null;
  private idCounter = 0;
  private disposed = false;

  constructor(engine: Engine, opts: AnalysisQueueOptions = {}) {
    this.engine = engine;
    this.cacheSize = opts.cacheSize ?? 1000;
    this.cache = opts.cacheRef ? opts.cacheRef.current : new Map();
  }

  /** Replace the engine handle (e.g. after a backend fallback). */
  setEngine(engine: Engine): void {
    this.engine = engine;
  }

  submit(request: AnalysisRequest): SubmitHandle {
    if (this.disposed) {
      return { id: '', result: Promise.reject(new Error('AnalysisQueue is disposed')) };
    }

    // Cache hit — return immediately.
    const cached = this.cacheLookup(request);
    if (cached) {
      return { id: '', result: Promise.resolve(cached) };
    }

    const id = `req-${++this.idCounter}`;
    let resolve!: (r: AnalysisResult) => void;
    let reject!: (e: unknown) => void;
    const result = new Promise<AnalysisResult>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    const internal: InternalRequest = {
      kind: 'single',
      id,
      request,
      resolve,
      reject,
      controller: new AbortController(),
      preempted: false,
    };

    this.enqueue(internal, request.priority);
    void this.pump();
    return { id, result };
  }

  /**
   * Submit several requests as a single engine.analyzeBatch() call. Used
   * for the policy-only full-game scan (numVisits=1) where batched
   * inference is dramatically faster on GPU backends.
   *
   * Returned promises resolve in the same order as the input.
   */
  submitBatch(requests: AnalysisRequest[]): SubmitHandle[] {
    if (requests.length === 0) return [];
    if (this.disposed) {
      return requests.map(() => ({
        id: '',
        result: Promise.reject(new Error('AnalysisQueue is disposed')),
      }));
    }

    // Pull cache hits out so we don't re-evaluate them.
    const handles: SubmitHandle[] = [];
    const pending: AnalysisRequest[] = [];
    const pendingIdx: number[] = [];
    for (let i = 0; i < requests.length; i++) {
      const cached = this.cacheLookup(requests[i]);
      if (cached) {
        handles.push({ id: '', result: Promise.resolve(cached) });
      } else {
        handles.push({ id: '', result: null as unknown as Promise<AnalysisResult> });
        pending.push(requests[i]);
        pendingIdx.push(i);
      }
    }
    if (pending.length === 0) return handles;

    const id = `batch-${++this.idCounter}`;
    const resolvers: Array<(r: AnalysisResult) => void> = [];
    const rejecters: Array<(e: unknown) => void> = [];
    for (let i = 0; i < pending.length; i++) {
      const promise = new Promise<AnalysisResult>((res, rej) => {
        resolvers.push(res);
        rejecters.push(rej);
      });
      handles[pendingIdx[i]] = { id, result: promise };
    }

    const batch: InternalBatch = {
      kind: 'batch',
      id,
      requests: pending,
      resolvers,
      rejecters,
      controller: new AbortController(),
      preempted: false,
      priority: pending[0].priority,
      tag: pending[0].tag,
    };

    this.enqueue(batch, batch.priority);
    void this.pump();
    return handles;
  }

  cancel(id: RequestId): void {
    const drop = (queue: Item[]): boolean => {
      const idx = queue.findIndex(r => r.id === id);
      if (idx === -1) return false;
      const [item] = queue.splice(idx, 1);
      this.rejectItem(item, abortError());
      return true;
    };
    if (drop(this.liveQueue)) return;
    if (drop(this.batchQueue)) return;
    if (this.inFlight && this.inFlight.id === id) {
      this.inFlight.controller.abort();
      this.rejectItem(this.inFlight, abortError());
      this.inFlight = null;
      void this.pump();
    }
  }

  cancelTag(tag: string): void {
    const filterTag = (queue: Item[]) => {
      for (let i = queue.length - 1; i >= 0; i--) {
        if (itemTag(queue[i]) === tag) {
          const [item] = queue.splice(i, 1);
          this.rejectItem(item, abortError());
        }
      }
    };
    filterTag(this.liveQueue);
    filterTag(this.batchQueue);
    if (this.inFlight && itemTag(this.inFlight) === tag) {
      this.inFlight.controller.abort();
      this.rejectItem(this.inFlight, abortError());
      this.inFlight = null;
      void this.pump();
    }
  }

  cancelAll(): void {
    for (const item of this.liveQueue.splice(0)) this.rejectItem(item, abortError());
    for (const item of this.batchQueue.splice(0)) this.rejectItem(item, abortError());
    if (this.inFlight) {
      this.inFlight.controller.abort();
      this.rejectItem(this.inFlight, abortError());
      this.inFlight = null;
    }
  }

  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Read-only cache probe — returns a satisfying result if one is cached
   * with at least the requested visit count, else null. Does not queue
   * anything or mutate state (other than touching LRU order).
   */
  peek(req: AnalysisRequest): AnalysisResult | null {
    return this.cacheLookup(req);
  }

  cacheStats(): { size: number; maxSize: number } {
    return { size: this.cache.size, maxSize: this.cacheSize };
  }

  pendingCount(): number {
    return this.liveQueue.length + this.batchQueue.length + (this.inFlight ? 1 : 0);
  }

  async dispose(): Promise<void> {
    this.disposed = true;
    this.cancelAll();
  }

  // --- internals -----------------------------------------------------------

  private enqueue(item: Item, priority: Priority): void {
    if (priority === 'live') {
      // Reject any pending live — only the latest target matters.
      for (const old of this.liveQueue.splice(0)) this.rejectItem(old, abortError());
      this.liveQueue.push(item);
      // Transparent re-queue for batch (caller never sees the interruption).
      if (this.inFlight && itemPriority(this.inFlight) === 'batch') {
        this.preempt(this.inFlight);
      }
      // Drop in-flight live — user navigated away.
      if (this.inFlight && itemPriority(this.inFlight) === 'live') {
        this.inFlight.preempted = true;
        this.inFlight.controller.abort();
        this.rejectItem(this.inFlight, abortError());
        // Don't clear inFlight here; pump's finally will, then pick up
        // the new live we just queued.
      }
    } else {
      this.batchQueue.push(item);
    }
  }

  private async pump(): Promise<void> {
    if (this.inFlight || this.disposed) return;
    const next = this.liveQueue.shift() ?? this.batchQueue.shift();
    if (!next) return;
    this.inFlight = next;

    try {
      if (next.kind === 'batch') {
        await this.runBatch(next);
      } else {
        await this.runOne(next);
      }
    } finally {
      this.inFlight = null;
      void this.pump();
    }
  }

  private async runOne(req: InternalRequest): Promise<void> {
    // Cache may have been populated since enqueue time.
    const cached = this.cacheLookup(req.request);
    if (cached) {
      req.resolve(cached);
      return;
    }

    try {
      const result = await this.engine.analyze(req.request.signMap, {
        nextToPlay: req.request.nextToPlay,
        komi: req.request.komi,
        history: req.request.history,
        numVisits: req.request.numVisits,
        includeMove: req.request.includeMove,
        signal: req.controller.signal,
        onProgress: req.request.onProgress,
        skipCache: true,
        ...(req.request.extra ?? {}),
      } as any);

      if (req.preempted) return;
      this.cacheStore(req.request, result);
      req.resolve(result);
    } catch (err) {
      if (req.preempted) return;
      req.reject(err);
    }
  }

  private async runBatch(batch: InternalBatch): Promise<void> {
    // Re-check cache for each sub-request — caller may have populated it
    // (or another batch in this run) between enqueue and dispatch.
    const stillPending: number[] = [];
    for (let i = 0; i < batch.requests.length; i++) {
      const cached = this.cacheLookup(batch.requests[i]);
      if (cached) batch.resolvers[i](cached);
      else stillPending.push(i);
    }
    if (stillPending.length === 0) return;

    const inputs = stillPending.map(i => ({
      signMap: batch.requests[i].signMap,
      options: {
        nextToPlay: batch.requests[i].nextToPlay,
        komi: batch.requests[i].komi,
        history: batch.requests[i].history,
        numVisits: batch.requests[i].numVisits,
        signal: batch.controller.signal,
        skipCache: true,
        ...(batch.requests[i].extra ?? {}),
      } as any,
    }));

    try {
      const results = await this.engine.analyzeBatch(inputs);
      if (batch.preempted) return;
      for (let k = 0; k < stillPending.length; k++) {
        const idx = stillPending[k];
        const r = results[k];
        this.cacheStore(batch.requests[idx], r);
        batch.resolvers[idx](r);
      }
    } catch (err) {
      if (batch.preempted) return;
      for (const idx of stillPending) batch.rejecters[idx](err);
    }
  }

  private preempt(item: Item): void {
    item.preempted = true;
    item.controller.abort();
    if (item.kind === 'batch') {
      const fresh: InternalBatch = {
        ...item,
        controller: new AbortController(),
        preempted: false,
      };
      if (item.priority === 'batch') this.batchQueue.unshift(fresh);
      else this.liveQueue.unshift(fresh);
    } else {
      const fresh: InternalRequest = {
        ...item,
        kind: 'single',
        controller: new AbortController(),
        preempted: false,
      };
      if (item.request.priority === 'batch') this.batchQueue.unshift(fresh);
      else this.liveQueue.unshift(fresh);
    }
  }

  private rejectItem(item: Item, err: unknown): void {
    if (item.kind === 'batch') {
      for (const reject of item.rejecters) reject(err);
    } else {
      item.reject(err);
    }
  }

  private cacheKey(req: AnalysisRequest): string {
    if (req.cacheKey) return req.cacheKey;
    const board = req.signMap.map(row => row.join(',')).join(';');
    const last5 = req.history.slice(-5).map(m => `${m.color}:${m.x},${m.y}`);
    // Match the format used by @kaya/ui's generateAnalysisCacheKey so the
    // SGF persistence layer reads/writes against the same keys.
    const boardHash = `${req.signMap.length}:${board}`;
    return JSON.stringify({
      board: boardHash,
      nextToPlay: req.nextToPlay,
      komi: req.komi,
      history: last5,
    });
  }

  private cacheLookup(req: AnalysisRequest): AnalysisResult | null {
    const key = this.cacheKey(req);
    const entry = this.cache.get(key);
    if (!entry) return null;
    const cachedVisits = entry.visits ?? 1;
    if (cachedVisits < req.numVisits) return null;
    // Refresh LRU position.
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry;
  }

  private cacheStore(req: AnalysisRequest, result: AnalysisResult): void {
    const key = this.cacheKey(req);
    const existing = this.cache.get(key);
    const existingVisits = existing?.visits ?? 0;
    const newVisits = result.visits ?? req.numVisits;
    if (existingVisits > newVisits) return;
    this.cache.delete(key);
    this.cache.set(key, result);
    if (this.cache.size > this.cacheSize) {
      const oldest = this.cache.keys().next().value;
      if (oldest !== undefined) this.cache.delete(oldest);
    }
  }
}

function itemPriority(item: Item): Priority {
  return item.kind === 'batch' ? item.priority : item.request.priority;
}

function itemTag(item: Item): string | undefined {
  return item.kind === 'batch' ? item.tag : item.request.tag;
}

function abortError(): Error {
  const e = new Error('Analysis cancelled');
  e.name = 'AbortError';
  return e;
}
