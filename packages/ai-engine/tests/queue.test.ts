/**
 * Unit tests for the AnalysisQueue preemption path.
 *
 * A live request must be able to cut in front of a running full-game batch,
 * and the positions the batch already finished must not be thrown away.
 */

import { describe, test, expect } from 'bun:test';
import { AnalysisQueue, type AnalysisRequest } from '../src/queue';
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
