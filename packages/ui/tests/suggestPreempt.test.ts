/**
 * Suggest move goes through the analysis queue in the live lane, so a live
 * analysis submitted after it cancels it. useAIMoveGeneration recovers by
 * waiting for that analysis and asking again. This pins the two queue
 * behaviours that recovery relies on: the cancellation is recognised as an
 * abort, and the second ask is answered from the cache, not by the engine.
 */

import { describe, test, expect } from 'bun:test';
import {
  AnalysisQueue,
  type AnalysisRequest,
  type AnalysisResult,
  type Engine,
} from '@kaya/ai-engine';
import { isAbortError } from '../src/utils/aiAnalysis';

const EMPTY_BOARD = Array.from({ length: 9 }, () => Array(9).fill(0));

function position(): AnalysisRequest {
  return {
    signMap: EMPTY_BOARD,
    nextToPlay: 'B',
    komi: 7.5,
    history: [],
    numVisits: 8,
    priority: 'live',
  };
}

/** Holds every analysis until the test releases it. */
class GatedEngine {
  calls = 0;
  private pending: Array<() => void> = [];

  async analyze(_signMap: unknown, options: { numVisits: number }): Promise<AnalysisResult> {
    this.calls++;
    await new Promise<void>(resolve => this.pending.push(resolve));
    return {
      moveSuggestions: [],
      winRate: 0.5,
      scoreLead: 0,
      currentTurn: 'B',
      visits: options.numVisits,
    } as AnalysisResult;
  }

  releaseAll(): void {
    for (const resolve of this.pending.splice(0)) resolve();
  }
}

const settle = () => new Promise(resolve => setTimeout(resolve, 0));

describe('suggest move preempted by live analysis', () => {
  test('is cancelled as an abort, and asking again after the live run hits the cache', async () => {
    const engine = new GatedEngine();
    const queue = new AnalysisQueue(engine as unknown as Engine);

    const suggest = queue.submit(position());
    const suggestError = suggest.result.then(
      () => null,
      (error: unknown) => error
    );
    await settle();

    // Live analysis of the same position arrives while suggest is running.
    const live = queue.submit(position());
    expect(isAbortError(await suggestError)).toBe(true);

    engine.releaseAll(); // the cancelled suggest run unwinds
    await settle();
    engine.releaseAll(); // the live run
    await live.result;

    const again = queue.submit(position());
    expect(again.id).toBe('');
    await expect(again.result).resolves.toBeDefined();
    expect(engine.calls).toBe(2);
  });

  test('an engine failure is not an abort', () => {
    expect(isAbortError(new Error('model failed to load'))).toBe(false);
    expect(isAbortError('cancelled')).toBe(false);
  });
});
