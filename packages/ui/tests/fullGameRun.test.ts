/**
 * How a full-game analysis run ends. A slice that failed used to end the loop
 * like a finished run: nothing was shown, and the log said "complete".
 */

import { describe, test, expect } from 'bun:test';
import type { AnalysisRequest, AnalysisResult, SubmitOptions } from '@kaya/ai-engine';
import type { TFunction } from 'i18next';
import {
  formatFullGameNotice,
  runFullGameSlices,
  type FullGamePosition,
} from '../src/contexts/ai/fullGameRun';

const RESULT: AnalysisResult = {
  winRate: 0.5,
  scoreLead: 0,
  currentTurn: 'B',
  moveSuggestions: [],
};

const BATCH_OPTS: SubmitOptions = { priority: 'batch', tag: 'full-game' };

function positions(n: number): FullGamePosition[] {
  return Array.from({ length: n }, (_, index) => ({
    index,
    request: { signMap: [], nextToPlay: 'B', komi: 6.5 } as unknown as AnalysisRequest,
  }));
}

/** A queue whose n-th request (0-based) rejects with `error`. */
function queueFailingAt(n: number, error: Error) {
  let seen = 0;
  const handle = () => ({
    id: String(seen),
    result: seen++ === n ? Promise.reject(error) : Promise.resolve(RESULT),
  });
  return {
    submit: () => handle(),
    submitBatch: (requests: AnalysisRequest[]) => requests.map(() => handle()),
  } as never;
}

describe('full-game run', () => {
  test('an engine error fails the run and stops submitting', async () => {
    const slices: number[] = [];
    const outcome = await runFullGameSlices(
      queueFailingAt(2, new Error('WebGPU device lost')),
      positions(6),
      {
        batchSize: 1,
        submitOpts: BATCH_OPTS,
        onSlice: s => slices.push(s.positions[0].index),
      }
    );
    expect(outcome).toEqual({ status: 'failed', message: 'WebGPU device lost' });
    expect(slices).toEqual([0, 1]);
  });

  test('a failed batch fails the run', async () => {
    const outcome = await runFullGameSlices(queueFailingAt(5, new Error('boom')), positions(8), {
      batchSize: 4,
      submitOpts: BATCH_OPTS,
      onSlice: () => {},
    });
    expect(outcome).toEqual({ status: 'failed', message: 'boom' });
  });

  test('a cancelled request stops the run without failing it', async () => {
    const abort = Object.assign(new Error('Request cancelled'), { name: 'AbortError' });
    const outcome = await runFullGameSlices(queueFailingAt(1, abort), positions(3), {
      batchSize: 1,
      submitOpts: BATCH_OPTS,
      onSlice: () => {},
    });
    expect(outcome).toEqual({ status: 'stopped' });
  });

  test('every slice reported, then done', async () => {
    let count = 0;
    const outcome = await runFullGameSlices(queueFailingAt(-1, new Error()), positions(10), {
      batchSize: 4,
      submitOpts: BATCH_OPTS,
      onSlice: s => (count += s.positions.length),
    });
    expect(outcome).toEqual({ status: 'done' });
    expect(count).toBe(10);
  });
});

describe('full-game notice', () => {
  const t = ((key: string, options: Record<string, unknown>) =>
    `${key} ${JSON.stringify(options)}`) as unknown as TFunction;

  test('a failure is an error message, not a success tick', () => {
    const text = formatFullGameNotice({ kind: 'failed', message: 'boom' }, t);
    expect(text).toBe('analysis.fullGameFailed {"message":"boom"}');
    expect(text).not.toContain('✓');
  });

  test('nothing left to analyse is a success', () => {
    expect(formatFullGameNotice({ kind: 'all-analyzed', count: 12 }, t)).toBe(
      '✓ analysis.allPositionsAnalyzed {"count":12}'
    );
  });
});
