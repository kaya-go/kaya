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
 *   - Explicit cancel(id) / cancelTag(tag) / cancelAll() rejects the
 *     submitter's promise, and nothing the cancelled request computes
 *     reaches the cache, even when the engine finishes it anyway.
 *   - Cache lookups and stores follow one rule, in `analysis-cache.ts`.
 *   - Caller may pass a `cacheKey` (computed by the same generator the
 *     SGF persistence layer uses); otherwise the queue computes its own.
 *   - Caller may pass a `cacheRef` Map at construction so the cache is
 *     shared with other subsystems (e.g. SGF save/load). The queue never
 *     evicts from it; only its own cache is bounded (`cacheSize`).
 */

import type { SignMap } from '@kaya/goboard';
import { AnalysisCache } from './analysis-cache';
import type { Engine } from './base-engine';
import type { MCTSProgress } from './onnx-types';
import type { AnalysisResult, HistoryMove } from './types';

export type Priority = 'live' | 'batch';
export type RequestId = string;

export interface AnalysisRequest {
  signMap: SignMap;
  nextToPlay: 'B' | 'W';
  komi: number;
  history: HistoryMove[];
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

export { generateAnalysisCacheKey } from './analysis-cache';

export interface SubmitHandle {
  id: RequestId;
  result: Promise<AnalysisResult>;
}

export interface CacheRef {
  current: Map<string, AnalysisResult>;
}

export interface AnalysisQueueOptions {
  /**
   * Max entries of the queue's own cache (LRU). Default 1000. Not used with
   * `cacheRef`: the queue never evicts from a map it does not own.
   */
  cacheSize?: number;
  /**
   * Shared cache. When provided, the queue reads/writes against this Map
   * instead of an internal one — used to share state with SGF persistence.
   * Its owner decides what it holds and when it is cleared: the map is the
   * analysis an SGF save writes, so an eviction here would drop analysis from
   * the user's file.
   */
  cacheRef?: CacheRef;
}

/**
 * Why a request in flight was stopped: `requeued` when a live request preempted
 * it and a fresh copy waits in the queue, `cancelled` when its caller gave it up.
 */
type StopReason = 'requeued' | 'cancelled';

interface InternalRequest {
  kind: 'single';
  id: RequestId;
  request: AnalysisRequest;
  resolve: (r: AnalysisResult) => void;
  reject: (e: unknown) => void;
  /** Replaced each attempt — preemption aborts the current one. */
  controller: AbortController;
  /** Set on the in-flight copy once stopped; a re-queued copy starts fresh. */
  stopped: StopReason | null;
}

interface InternalBatch {
  kind: 'batch';
  id: RequestId;
  requests: AnalysisRequest[];
  resolvers: Array<(r: AnalysisResult) => void>;
  rejecters: Array<(e: unknown) => void>;
  controller: AbortController;
  stopped: StopReason | null;
  /** All sub-requests share priority; we copy from the first. */
  priority: Priority;
  tag?: string;
}

type Item = InternalRequest | InternalBatch;

export class AnalysisQueue {
  private engine: Engine;
  private cache: AnalysisCache;
  private liveQueue: Item[] = [];
  private batchQueue: Item[] = [];
  private inFlight: Item | null = null;
  private idCounter = 0;
  private disposed = false;

  constructor(engine: Engine, opts: AnalysisQueueOptions = {}) {
    this.engine = engine;
    this.cache = opts.cacheRef
      ? new AnalysisCache(opts.cacheRef.current, Infinity)
      : new AnalysisCache(new Map(), opts.cacheSize ?? 1000);
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
    const cached = this.cache.lookup(request);
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
      stopped: null,
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
      const cached = this.cache.lookup(requests[i]);
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
      stopped: null,
      priority: pending[0].priority,
      tag: pending[0].tag,
    };

    this.enqueue(batch, batch.priority);
    void this.pump();
    return handles;
  }

  cancel(id: RequestId): void {
    for (const queue of [this.liveQueue, this.batchQueue]) {
      const idx = queue.findIndex(r => r.id === id);
      if (idx !== -1) this.rejectItem(queue.splice(idx, 1)[0], abortError());
    }
    // A preempted batch the engine could not stop is both queued again and
    // still in flight: both copies go.
    if (this.inFlight?.id === id) this.cancelInFlight();
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
    if (this.inFlight && itemTag(this.inFlight) === tag) this.cancelInFlight();
  }

  cancelAll(): void {
    for (const item of this.liveQueue.splice(0)) this.rejectItem(item, abortError());
    for (const item of this.batchQueue.splice(0)) this.rejectItem(item, abortError());
    if (this.inFlight) this.cancelInFlight();
  }

  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Read-only cache probe — returns the cached result if it answers the
   * request (see `answers`), else null. Does not queue anything or mutate
   * state (other than touching LRU order).
   */
  peek(req: AnalysisRequest): AnalysisResult | null {
    return this.cache.lookup(req);
  }

  cacheStats(): { size: number; maxSize: number } {
    return { size: this.cache.size, maxSize: this.cache.limit };
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
      // Not for one already stopped: a cancelled batch the engine could not
      // stop would run again, and a re-queued one already has its copy queued.
      if (this.inFlight && !this.inFlight.stopped && itemPriority(this.inFlight) === 'batch') {
        this.preempt(this.inFlight);
      }
      // Drop in-flight live — user navigated away. Pump's finally then picks
      // up the new live we just queued.
      if (this.inFlight && itemPriority(this.inFlight) === 'live') this.cancelInFlight();
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
    const cached = this.cache.lookup(req.request);
    if (cached) {
      req.resolve(cached);
      return;
    }

    try {
      const result = await this.engine.analyze(req.request.signMap, {
        nextToPlay: req.request.nextToPlay,
        komi: req.request.komi,
        history: req.request.history,
        numVisits: this.cache.visitsToRun(req.request),
        includeMove: req.request.includeMove,
        signal: req.controller.signal,
        onProgress: req.request.onProgress,
        skipCache: true,
        ...(req.request.extra ?? {}),
      } as any);

      if (req.stopped) return;
      this.cache.store(req.request, result);
      req.resolve(result);
    } catch (err) {
      if (req.stopped) return;
      req.reject(err);
    }
  }

  private async runBatch(batch: InternalBatch): Promise<void> {
    // Re-check cache for each sub-request — caller may have populated it
    // (or another batch in this run) between enqueue and dispatch.
    const stillPending: number[] = [];
    for (let i = 0; i < batch.requests.length; i++) {
      const cached = this.cache.lookup(batch.requests[i]);
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
      // An engine that cannot stop a batch (the web worker) finishes it anyway.
      // A cancelled one keeps nothing: whoever cancelled it may have just
      // emptied the cache (Clear analysis, model switch). A re-queued one is
      // cached, so its copy finds every position here instead of running them
      // all again. A search the abort did cut short came back shallower than
      // asked, and is not kept.
      if (batch.stopped === 'cancelled') return;
      for (let k = 0; k < stillPending.length; k++) {
        const req = batch.requests[stillPending[k]];
        const r = results[k];
        if ((r.visits ?? req.numVisits) >= req.numVisits) this.cache.store(req, r);
      }
      if (batch.stopped) return;
      for (let k = 0; k < stillPending.length; k++) {
        batch.resolvers[stillPending[k]](results[k]);
      }
    } catch (err) {
      // A preempted batch can still hand back the positions it finished before
      // stopping. Keeping them means the re-queued copy picks them up from the
      // cache instead of running the whole game through the model again.
      const partial = (err as { partialResults?: (AnalysisResult | null)[] })?.partialResults;
      if (partial && batch.stopped !== 'cancelled') {
        for (let k = 0; k < stillPending.length; k++) {
          const result = partial[k];
          if (result) this.cache.store(batch.requests[stillPending[k]], result);
        }
      }
      if (batch.stopped) return;
      for (const idx of stillPending) batch.rejecters[idx](err);
    }
  }

  /**
   * Stop the request in flight for good and reject its caller. Pump's finally
   * clears inFlight: the suspended pump still holds it, and starting another
   * while its await unwinds could run two analyses at once.
   */
  private cancelInFlight(): void {
    const item = this.inFlight!;
    item.stopped = 'cancelled';
    item.controller.abort();
    this.rejectItem(item, abortError());
  }

  private preempt(item: Item): void {
    item.stopped = 'requeued';
    item.controller.abort();
    if (item.kind === 'batch') {
      const fresh: InternalBatch = {
        ...item,
        controller: new AbortController(),
        stopped: null,
      };
      if (item.priority === 'batch') this.batchQueue.unshift(fresh);
      else this.liveQueue.unshift(fresh);
    } else {
      const fresh: InternalRequest = {
        ...item,
        kind: 'single',
        controller: new AbortController(),
        stopped: null,
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
