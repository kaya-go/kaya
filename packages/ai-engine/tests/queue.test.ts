/**
 * Unit tests for AnalysisQueue: preemption and the shared cache-key format.
 *
 * A live request must be able to cut in front of a running full-game batch,
 * and the positions the batch already finished must not be thrown away.
 *
 * generateAnalysisCacheKey is pinned here because queue + SGF KA + UI share
 * the same Map; a silent format change would orphan entries.
 */

import { describe, test, expect } from 'bun:test';
import { AnalysisQueue, generateAnalysisCacheKey, type AnalysisRequest } from '../src/queue';
import type { Engine } from '../src/base-engine';
import type { AnalysisResult } from '../src/types';
import type { SignMap } from '@kaya/goboard';

const EMPTY_BOARD: SignMap = Array.from({ length: 9 }, () => Array(9).fill(0));

function boardWithStoneAt(x: number): SignMap {
  const board = EMPTY_BOARD.map(row => [...row]);
  board[0][x] = 1;
  return board;
}

function request(x: number, priority: 'live' | 'batch'): AnalysisRequest {
  return {
    signMap: boardWithStoneAt(x),
    nextToPlay: 'W',
    komi: 7.5,
    history: [],
    numVisits: 1,
    priority,
    tag: priority === 'batch' ? 'full-game' : undefined,
  };
}

function result(label: number): AnalysisResult {
  return {
    moveSuggestions: [],
    winRate: 0.5,
    scoreLead: label,
    currentTurn: 'W',
    visits: 1,
  };
}

/** Lets the test step the engine one position at a time. */
class SteppableEngine {
  positionsComputed = 0;
  batchCalls = 0;
  private waiting: Array<() => void> = [];
  private allowed = 0;

  private gate(): Promise<void> {
    if (this.allowed > 0) {
      this.allowed--;
      return Promise.resolve();
    }
    return new Promise<void>(resolve => this.waiting.push(resolve));
  }

  /** Let `n` more positions through, whether or not the engine is there yet. */
  allow(n: number): void {
    for (let i = 0; i < n; i++) {
      const next = this.waiting.shift();
      if (next) next();
      else this.allowed++;
    }
  }

  async analyzeBatch(
    inputs: { signMap: SignMap; options?: { signal?: AbortSignal } }[]
  ): Promise<AnalysisResult[]> {
    this.batchCalls++;
    const results: (AnalysisResult | null)[] = new Array(inputs.length).fill(null);

    for (let i = 0; i < inputs.length; i++) {
      await this.gate();
      results[i] = result(i);
      this.positionsComputed++;

      // Same contract as OnnxEngine: stop on abort, hand back what is done.
      if (inputs[i].options?.signal?.aborted) {
        const aborted = new Error('Batch analysis aborted') as Error & {
          partialResults?: (AnalysisResult | null)[];
        };
        aborted.name = 'AbortError';
        aborted.partialResults = results;
        throw aborted;
      }
    }

    return results as AnalysisResult[];
  }

  async analyze(): Promise<AnalysisResult> {
    await this.gate();
    this.positionsComputed++;
    return result(-1);
  }
}

/** Lets queued microtasks and timers run so the engine reaches its next gate. */
const settle = () => new Promise(resolve => setTimeout(resolve, 0));

describe('AnalysisQueue preemption', () => {
  test('keeps the positions a preempted batch already finished', async () => {
    const engine = new SteppableEngine();
    const queue = new AnalysisQueue(engine as unknown as Engine);

    const batch = queue.submitBatch([0, 1, 2, 3].map(x => request(x, 'batch')));
    await settle();

    // Two positions are done, then the user clicks a move.
    engine.allow(2);
    await settle();
    expect(engine.positionsComputed).toBe(2);

    const live = queue.submit(request(8, 'live'));
    engine.allow(1); // the batch notices the abort on its next position
    await settle();

    engine.allow(10); // let the live request and the re-queued batch finish
    await expect(live.result).resolves.toBeDefined();
    const batchResults = await Promise.all(batch.map(h => h.result));

    // The caller never sees the interruption.
    expect(batchResults).toHaveLength(4);
    for (const r of batchResults) expect(r).toBeDefined();

    // 3 positions computed before the abort, 1 for the live request, and only
    // the 1 position still missing: the three the batch had finished came back
    // from the cache. Without that, the re-queued batch redoes all four and
    // this count is 8.
    expect(engine.positionsComputed).toBe(5);
  });

  test('a batch that is never preempted runs once', async () => {
    const engine = new SteppableEngine();
    const queue = new AnalysisQueue(engine as unknown as Engine);

    const batch = queue.submitBatch([0, 1, 2].map(x => request(x, 'batch')));
    engine.allow(10);

    const results = await Promise.all(batch.map(h => h.result));
    expect(results).toHaveLength(3);
    expect(engine.batchCalls).toBe(1);
    expect(engine.positionsComputed).toBe(3);
  });
});

/**
 * Lists two moves, as a search does: D4 always visited, A1 visited only when
 * forced (and when the engine can play it), else 0 visits with the root's values.
 */
class SearchEngine {
  runs: Array<{ numVisits: number; includeMove?: string }> = [];
  constructor(private canPlayForcedMove = true) {}

  async analyze(
    _signMap: SignMap,
    options: { numVisits: number; includeMove?: string }
  ): Promise<AnalysisResult> {
    this.runs.push({ numVisits: options.numVisits, includeMove: options.includeMove });
    const forced = options.includeMove === 'A1' && options.numVisits > 1 && this.canPlayForcedMove;
    return {
      moveSuggestions: [
        { move: 'D4', probability: 0.9, winRate: 0.6, scoreLead: 2, visits: options.numVisits },
        { move: 'A1', probability: 0.1, winRate: 0.6, scoreLead: 2, visits: forced ? 3 : 0 },
      ],
      winRate: 0.6,
      scoreLead: 2,
      currentTurn: 'W',
      visits: options.numVisits,
    };
  }
}

function search(numVisits: number, includeMove?: string): AnalysisRequest {
  return { ...request(0, 'live'), numVisits, includeMove };
}

/** Submits and waits; returns whether the cache answered (no engine run). */
async function ask(queue: AnalysisQueue, req: AnalysisRequest): Promise<boolean> {
  const handle = queue.submit(req);
  await handle.result;
  return handle.id === '';
}

describe('AnalysisQueue cache and the forced move', () => {
  test('a result that never visited the forced move is redone at its own depth', async () => {
    const engine = new SearchEngine();
    const queue = new AnalysisQueue(engine as unknown as Engine);

    // Analysed before A1 was played: A1 has 0 visits.
    expect(await ask(queue, search(32))).toBe(false);
    // Back on the position, asking to force A1, at a lower setting.
    expect(await ask(queue, search(16, 'A1'))).toBe(false);
    expect(engine.runs[1]).toEqual({ numVisits: 32, includeMove: 'A1' });

    // The replacement answers both requests: nothing more runs.
    expect(await ask(queue, search(16, 'A1'))).toBe(true);
    expect(await ask(queue, search(32))).toBe(true);
    expect(engine.runs).toHaveLength(2);
  });

  test('answers when the forced move was visited, cannot be forced, or is unknown', async () => {
    const engine = new SearchEngine();
    const queue = new AnalysisQueue(engine as unknown as Engine);

    await ask(queue, search(32));
    expect(await ask(queue, search(32, 'D4'))).toBe(true); // visited
    expect(await ask(queue, search(32, 'Q16'))).toBe(true); // not listed: illegal there
    expect(engine.runs).toHaveLength(1);

    // At 1 visit there is no search, so nothing can be forced.
    const policy = new AnalysisQueue(new SearchEngine() as unknown as Engine);
    await ask(policy, search(1));
    expect(await ask(policy, search(1, 'A1'))).toBe(true);

    // Loaded from an SGF: per-move visits are not stored.
    const { signMap, nextToPlay, komi, history } = search(32);
    const loaded: AnalysisResult = {
      moveSuggestions: [{ move: 'A1', probability: 0.1, winRate: 0.4 }],
      winRate: 0.6,
      scoreLead: 2,
      currentTurn: 'W',
      visits: 32,
    };
    const key = generateAnalysisCacheKey(signMap, nextToPlay, komi, history);
    const fromSgf = new AnalysisQueue(new SearchEngine() as unknown as Engine, {
      cacheRef: { current: new Map([[key, loaded]]) },
    });
    expect(await ask(fromSgf, search(32, 'A1'))).toBe(true);
  });

  test('a forced move the engine cannot visit runs once, not on every lookup', async () => {
    const engine = new SearchEngine(false);
    const queue = new AnalysisQueue(engine as unknown as Engine);

    await ask(queue, search(32));
    expect(await ask(queue, search(32, 'A1'))).toBe(false);
    expect(await ask(queue, search(32, 'A1'))).toBe(true);
    expect(engine.runs).toHaveLength(2);
  });
});

describe('generateAnalysisCacheKey', () => {
  test('stable format for empty board', () => {
    const signMap: SignMap = Array.from({ length: 9 }, () => Array(9).fill(0));
    const key = generateAnalysisCacheKey(signMap, 'B', 7.5, []);
    expect(key).toBe(
      JSON.stringify({
        board: `9:${signMap.map(row => row.join(',')).join(';')}`,
        nextToPlay: 'B',
        komi: 7.5,
        history: [],
      })
    );
  });

  test('uses only last 5 history moves', () => {
    const signMap: SignMap = [
      [1, 0],
      [0, -1],
    ];
    const history = [
      { color: 1 as const, x: 0, y: 0 },
      { color: -1 as const, x: 1, y: 1 },
      { color: 1 as const, x: 0, y: 1 },
      { color: -1 as const, x: 1, y: 0 },
      { color: 1 as const, x: -1, y: -1 },
      { color: -1 as const, x: 0, y: 0 },
    ];
    const key = generateAnalysisCacheKey(signMap, 'W', 6.5, history);
    const parsed = JSON.parse(key) as { history: string[] };
    expect(parsed.history).toEqual(['-1:1,1', '1:0,1', '-1:1,0', '1:-1,-1', '-1:0,0']);
    expect(parsed.history).toHaveLength(5);
  });

  test('different nextToPlay or komi yields different keys', () => {
    const signMap: SignMap = [[0]];
    const a = generateAnalysisCacheKey(signMap, 'B', 7.5, []);
    const b = generateAnalysisCacheKey(signMap, 'W', 7.5, []);
    const c = generateAnalysisCacheKey(signMap, 'B', 6.5, []);
    expect(a).not.toBe(b);
    expect(a).not.toBe(c);
  });
});
