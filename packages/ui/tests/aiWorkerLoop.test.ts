/**
 * The AI worker runs one request at a time. An abort for a request still
 * waiting in its queue must drop it, and answer for it: the caller waits on
 * that answer, and the search must not run for nobody.
 */

import { describe, expect, test } from 'bun:test';
import { createAIWorkerLoop, type WorkerLoopEngine } from '../src/workers/aiWorkerLoop';

const RESULT = { moveSuggestions: [], winRate: 0.5, scoreLead: 0, currentTurn: 'B' as const };

/** An engine whose analyses finish only when the test says so. */
function heldEngine() {
  const started: number[] = [];
  const release: Array<() => void> = [];
  const engine: WorkerLoopEngine = {
    onEngineLost: null,
    initialize: async () => {},
    analyze: async (signMap, options) => {
      started.push(signMap[0][0]);
      await new Promise<void>(resolve => release.push(resolve));
      void options;
      return RESULT;
    },
    analyzeBatch: async () => [],
    getRuntimeInfo: () => ({ backend: 'wasm', inputDataType: 'float32' }),
    clearCache: () => {},
    dispose: async () => {},
  };
  return { engine, started, release };
}

const flush = () => new Promise(resolve => setTimeout(resolve, 0));

async function readyLoop() {
  const posted: any[] = [];
  const held = heldEngine();
  const loop = createAIWorkerLoop({ post: m => posted.push(m), createEngine: () => held.engine });
  loop.onMessage({ type: 'init', config: {} });
  await flush();
  return { loop, posted, ...held };
}

describe('AI worker loop abort', () => {
  test('an abort for a request still queued drops it and answers at once', async () => {
    const { loop, posted, started, release } = await readyLoop();
    loop.onMessage({ type: 'analyze', id: 1, signMap: [[1]], options: { numVisits: 500 } });
    loop.onMessage({ type: 'analyze', id: 2, signMap: [[2]], options: { numVisits: 500 } });
    await flush();

    loop.onMessage({ type: 'abort', id: 2 });

    expect(posted).toContainEqual({ type: 'error', id: 2, error: 'aborted' });

    release[0]();
    await flush();
    await flush();
    expect(started).toEqual([1]);
    expect(posted).toContainEqual({ type: 'analyze_success', id: 1, result: RESULT });
  });

  test('an abort for the running request stops it and reports it aborted', async () => {
    const { loop, posted, release } = await readyLoop();
    loop.onMessage({ type: 'analyze', id: 1, signMap: [[1]], options: { numVisits: 500 } });
    await flush();

    loop.onMessage({ type: 'abort', id: 1 });
    release[0]();
    await flush();

    expect(posted).toContainEqual({ type: 'error', id: 1, error: 'aborted' });
    expect(posted.some(m => m.type === 'analyze_success')).toBe(false);
  });

  test('an abort for a request already answered changes nothing', async () => {
    const { loop, posted, release } = await readyLoop();
    loop.onMessage({ type: 'analyze', id: 1, signMap: [[1]], options: { numVisits: 500 } });
    await flush();
    release[0]();
    await flush();

    loop.onMessage({ type: 'abort', id: 1 });

    expect(posted.filter(m => m.id === 1 && m.type !== 'mcts_progress')).toEqual([
      { type: 'analyze_success', id: 1, result: RESULT },
    ]);
  });
});
