/**
 * Turning analysis off stops a live run at whatever step it is. It used to
 * cancel only the full search (step 2): switched off while the parent position
 * was being analysed (step 1), the run went on to submit the full search, so
 * minutes of hidden compute on WASM at 2500 visits.
 */

import { describe, test, expect } from 'bun:test';
import {
  AnalysisQueue,
  type AnalysisRequest,
  type AnalysisResult,
  type Engine,
} from '@kaya/ai-engine';
import { runLiveRequests } from '../src/contexts/ai/liveRun';

function position(stoneAt: number, numVisits: number): AnalysisRequest {
  const signMap = Array.from({ length: 9 }, () => Array(9).fill(0));
  signMap[0][stoneAt] = 1;
  return { signMap, nextToPlay: 'W', komi: 7.5, history: [], numVisits };
}

const PARENT = position(0, 1);
const CURRENT = position(1, 2500);

/** Holds every analysis until the test releases it, and records what it ran. */
class GatedEngine {
  runs: Array<{ numVisits: number; signal?: AbortSignal }> = [];
  private pending: Array<() => void> = [];

  async analyze(
    _signMap: unknown,
    options: { numVisits: number; signal?: AbortSignal }
  ): Promise<AnalysisResult> {
    this.runs.push({ numVisits: options.numVisits, signal: options.signal });
    await new Promise<void>(resolve => this.pending.push(resolve));
    return {
      moveSuggestions: [],
      winRate: 0.5,
      scoreLead: 0,
      currentTurn: 'W',
      visits: options.numVisits,
    };
  }

  releaseAll(): void {
    for (const resolve of this.pending.splice(0)) resolve();
  }
}

const settle = () => new Promise(resolve => setTimeout(resolve, 0));

function start() {
  const engine = new GatedEngine();
  const queue = new AnalysisQueue(engine as unknown as Engine);
  const stop = new AbortController();
  const run = runLiveRequests(queue, { prev: PARENT, current: CURRENT }, stop.signal);
  return { engine, queue, stop, run };
}

describe('live analysis run', () => {
  test('turned off during step 1: the parent is cancelled and no full search runs', async () => {
    const { engine, queue, stop, run } = start();
    await settle();
    expect(engine.runs.map(r => r.numVisits)).toEqual([1]);

    stop.abort();
    expect(engine.runs[0].signal?.aborted).toBe(true);
    engine.releaseAll();
    await settle();

    expect(engine.runs.map(r => r.numVisits)).toEqual([1]);
    expect(queue.pendingCount()).toBe(0);
    expect(await run).toBeNull();
  });

  test('turned off during step 2: the full search is cancelled', async () => {
    const { engine, stop, run } = start();
    await settle();
    engine.releaseAll();
    await settle();
    expect(engine.runs.map(r => r.numVisits)).toEqual([1, 2500]);

    stop.abort();
    engine.releaseAll();

    expect(await run).toBeNull();
    expect(engine.runs[1].signal?.aborted).toBe(true);
  });

  test('a step 1 the queue cancels (a newer live request) ends the run', async () => {
    const { engine, queue, run } = start();
    await settle();

    const newer = queue.submit(position(2, 1));
    expect(await run).toBeNull();

    engine.releaseAll(); // the cancelled parent unwinds
    await settle();
    engine.releaseAll(); // the newer request
    await newer.result;
    expect(engine.runs.map(r => r.numVisits)).toEqual([1, 1]);
  });

  test('runs both steps, and counts what the cache answered', async () => {
    const { engine, queue, run } = start();
    await settle();
    engine.releaseAll();
    await settle();
    engine.releaseAll();

    const result = await run;
    expect(result?.prev?.visits).toBe(1);
    expect(result?.current.visits).toBe(2500);
    expect(result?.inferences).toBe(2);

    const again = await runLiveRequests(
      queue,
      { prev: PARENT, current: CURRENT },
      new AbortController().signal
    );
    expect(again?.inferences).toBe(0);
  });
});
