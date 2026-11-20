/**
 * The analysis cache rule, shared by every lookup and store of AnalysisQueue:
 * when a stored result answers a request, at what depth to run one it does
 * not, and which of two results to keep.
 *
 *   - A cached result answers a request when it searched at least as deep
 *     and, for a request that forces a move, it explored that move (see
 *     `answers`). Visit count is the only depth: the key omits it.
 *   - The cache never loses depth: a result that misses only for the
 *     unexplored move is redone at its own depth, then replaced.
 */

import type { SignMap } from '@kaya/goboard';
import type { AnalysisRequest } from './queue';
import type { AnalysisResult, HistoryMove } from './types';

/**
 * Shared analysis cache key — single source of truth for AnalysisQueue,
 * SGF KA persistence, and UI lookups that share the same Map.
 *
 * Key intentionally omits visit count: the queue treats cache entries as
 * monotonic in visits (N visits satisfies any request asking for ≤ N).
 * BaseEngine's internal cache is a separate Map and may include visits.
 *
 * Includes the last 5 history moves (NN planes 9-13 / pass globals 0-4).
 */
export function generateAnalysisCacheKey(
  signMap: SignMap,
  nextToPlay: 'B' | 'W',
  komi: number,
  history: HistoryMove[]
): string {
  const last5Moves = history.slice(-5).map(m => `${m.color}:${m.x},${m.y}`);
  const boardHash = `${signMap.length}:${signMap.map(row => row.join(',')).join(';')}`;
  return JSON.stringify({ board: boardHash, nextToPlay, komi, history: last5Moves });
}

/** The fields of a request the cache rule reads. */
export type CacheRequest = Pick<
  AnalysisRequest,
  'signMap' | 'nextToPlay' | 'komi' | 'history' | 'numVisits' | 'includeMove' | 'cacheKey'
>;

export class AnalysisCache {
  /** The forced move each result stored here was computed for (see `answers`). */
  private ranFor = new WeakMap<AnalysisResult, string>();

  /**
   * @param map - the entries, in least recently used order
   * @param limit - entries kept before the least recently used goes
   */
  constructor(
    private readonly map: Map<string, AnalysisResult>,
    readonly limit: number
  ) {}

  get size(): number {
    return this.map.size;
  }

  clear(): void {
    this.map.clear();
  }

  /**
   * Whether a cached result can stand in for running `req`. It must have searched
   * at least as deep. A request that forces a move (`includeMove`, which engines
   * honour only with search, so above 1 visit) also needs that move explored:
   * engines list their top policy moves whether the search visited them or not,
   * and one it never visited (`visits: 0`) has no evaluation of its own. Counted
   * as explored: unknown visits (policy-only result, analysis loaded from an
   * SGF), a move the result does not list (outside the moves the engine
   * searches, so forcing it adds nothing), and a result already run for this
   * move, so a move the engine cannot visit does not trigger a run on every
   * lookup.
   */
  answers(entry: AnalysisResult, req: CacheRequest): boolean {
    if ((entry.visits ?? 1) < req.numVisits) return false;
    const move = req.includeMove;
    if (!move || req.numVisits <= 1 || this.ranFor.get(entry) === move) return true;
    return entry.moveSuggestions.find(s => s.move === move)?.visits !== 0;
  }

  /** The cached result that answers `req`, if any; refreshes its LRU position. */
  lookup(req: CacheRequest): AnalysisResult | null {
    const key = this.key(req);
    const entry = this.map.get(key);
    if (!entry || !this.answers(entry, req)) return null;
    this.map.delete(key);
    this.map.set(key, entry);
    return entry;
  }

  /**
   * Visits to run `req` at. When the cached entry missed only because it did not
   * explore the forced move, redo it at the entry's own depth: the replacement then
   * loses nothing, and still answers every request the old entry answered.
   */
  visitsToRun(req: CacheRequest): number {
    return Math.max(req.numVisits, this.map.get(this.key(req))?.visits ?? 0);
  }

  store(req: CacheRequest, result: AnalysisResult): void {
    const key = this.key(req);
    const existing = this.map.get(key);
    if (req.includeMove) this.ranFor.set(result, req.includeMove);
    // Keep a deeper entry only if it answers this request; otherwise the result
    // that was run because the entry missed would be dropped, and the miss repeat.
    const deeper = (existing?.visits ?? 0) > (result.visits ?? req.numVisits);
    if (existing && deeper && this.answers(existing, req)) return;
    this.map.delete(key);
    this.map.set(key, result);
    if (this.map.size > this.limit) {
      const oldest = this.map.keys().next().value;
      if (oldest !== undefined) this.map.delete(oldest);
    }
  }

  private key(req: CacheRequest): string {
    if (req.cacheKey) return req.cacheKey;
    return generateAnalysisCacheKey(req.signMap, req.nextToPlay, req.komi, req.history);
  }
}
