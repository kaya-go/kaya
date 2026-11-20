import { describe, expect, mock, test } from 'bun:test';
import type { SignMap } from '@kaya/goboard';
import { TauriEngine } from '../src/tauri-engine';

const board: SignMap = [
  [0, 0],
  [0, 0],
];

/** A TauriEngine that believes it is initialized, with `invoke` replaced. */
function engineWith(invoke: (cmd: string, args?: unknown) => Promise<unknown>) {
  const engine = new TauriEngine({ enableCache: false });
  const internals = engine as unknown as Record<string, unknown>;
  internals.invoke = invoke;
  internals.initialized = true;
  const lost = mock((_error: Error) => {});
  engine.onEngineLost = lost;
  return { engine, lost };
}

describe('TauriEngine engine loss', () => {
  // The native side drops an engine a panic left behind, so the next call
  // answers "Engine not initialized": without a new engine, native AI stayed
  // dead until the app restarted.
  test('reports itself lost when the native engine is gone', async () => {
    const { engine, lost } = engineWith(async () => {
      throw 'Engine not initialized';
    });

    await expect(engine.analyzeBatch([{ signMap: board }])).rejects.toBe('Engine not initialized');

    expect(lost).toHaveBeenCalledTimes(1);
    expect(lost.mock.calls[0][0].message).toBe('Engine not initialized');
  });

  test('reports itself lost when a search panicked', async () => {
    const panicked = 'Task failed: task 12 panicked with message "index out of bounds"';
    const { engine, lost } = engineWith(async cmd => {
      if (cmd === 'onnx_mcts_request_id') return 1;
      throw panicked;
    });

    await expect(engine.analyze(board, { numVisits: 10 } as never)).rejects.toBe(panicked);

    expect(lost).toHaveBeenCalledTimes(1);
  });

  // Its own `onnx_dispose` empties the native slot, so a request still in
  // flight comes back "Engine not initialized". The owner's handler would then
  // dispose the engine that replaced this one.
  test('a disposed engine does not report itself lost', async () => {
    let reject: (reason: unknown) => void = () => {};
    const { engine, lost } = engineWith(cmd =>
      cmd === 'onnx_analyze_batch'
        ? new Promise((_, r) => {
            reject = r;
          })
        : Promise.resolve(undefined)
    );

    const pending = engine.analyzeBatch([{ signMap: board }]);
    await Promise.resolve();
    await engine.dispose();
    reject('Engine not initialized');

    await expect(pending).rejects.toBe('Engine not initialized');
    expect(lost).not.toHaveBeenCalled();
  });

  test('an ordinary error leaves the engine in place (search)', async () => {
    const { engine, lost } = engineWith(async cmd => {
      if (cmd === 'onnx_mcts_request_id') return 1;
      throw 'Invalid ko point [3, 9] on a 2x2 board';
    });

    await expect(engine.analyze(board, { numVisits: 10 } as never)).rejects.toBeDefined();

    expect(lost).not.toHaveBeenCalled();
  });

  test('an ordinary error leaves the engine in place', async () => {
    const { engine, lost } = engineWith(async () => {
      throw 'Invalid board: it is empty';
    });

    await expect(engine.analyzeBatch([{ signMap: board }])).rejects.toBe(
      'Invalid board: it is empty'
    );

    expect(lost).not.toHaveBeenCalled();
  });
});

describe('TauriEngine search abort', () => {
  const searched = { moveSuggestions: [], winRate: 0.5, scoreLead: 0, currentTurn: 'B' };

  function recordingEngine(search: () => Promise<unknown>) {
    const calls: [string, unknown][] = [];
    const { engine } = engineWith(async (cmd, args) => {
      calls.push([cmd, args]);
      if (cmd === 'onnx_mcts_request_id') return 42;
      if (cmd === 'onnx_analyze_mcts') return search();
      return undefined;
    });
    return { engine, calls };
  }

  // A bare abort went out, then the search anyway; the search cleared the
  // abort once it held the engine, and ran in full.
  test('an already aborted request never starts a search', async () => {
    const { engine, calls } = recordingEngine(async () => searched);
    const controller = new AbortController();
    controller.abort();

    await expect(
      engine.analyze(board, { numVisits: 10, signal: controller.signal } as never)
    ).rejects.toMatchObject({ name: 'AbortError' });

    expect(calls.map(([cmd]) => cmd)).not.toContain('onnx_analyze_mcts');
  });

  test('an abort names the search it stops', async () => {
    const controller = new AbortController();
    const { engine, calls } = recordingEngine(async () => {
      controller.abort();
      // What Rust answers when the abort reached it before the search did.
      throw 'MCTS search aborted';
    });

    await expect(
      engine.analyze(board, { numVisits: 10, signal: controller.signal } as never)
    ).rejects.toMatchObject({ name: 'AbortError' });

    expect(calls).toContainEqual(['onnx_analyze_mcts', expect.objectContaining({ requestId: 42 })]);
    expect(calls).toContainEqual(['onnx_abort_mcts', { requestId: 42 }]);
  });

  // Every search emits on one event name: a late event from the search before
  // showed that search's moves as this one's progress.
  test('progress from another search is ignored', async () => {
    const progress = (requestId: number, bestMove: string) => ({
      requestId,
      completedVisits: 1,
      totalVisits: 10,
      bestMove,
      bestMoveVisits: 1,
      winRate: 0.5,
      scoreLead: 0,
      topMoves: [],
    });
    let deliver: (event: { payload: unknown }) => void = () => {};
    const { engine } = recordingEngine(async () => {
      deliver({ payload: progress(41, 'Q16') });
      deliver({ payload: progress(42, 'D4') });
      return searched;
    });
    (engine as unknown as Record<string, unknown>).listen = async (
      _event: string,
      handler: (event: { payload: unknown }) => void
    ) => {
      deliver = handler;
      return () => {};
    };
    const onProgress = mock((_p: unknown) => {});

    await engine.analyze(board, { numVisits: 10, onProgress } as never);

    expect(onProgress).toHaveBeenCalledTimes(1);
    expect(onProgress.mock.calls[0][0]).toMatchObject({ bestMove: 'D4' });
  });

  test('a search left alone returns its result', async () => {
    const { engine } = recordingEngine(async () => searched);
    const controller = new AbortController();

    const result = await engine.analyze(board, {
      numVisits: 10,
      signal: controller.signal,
    } as never);

    expect(result.winRate).toBe(0.5);
  });
});

/**
 * A full-game batch with more than one visit runs one native search per
 * position. When live analysis preempts it, the queue caches what the error
 * carries, so the re-queued batch does not search those positions again.
 */
describe('TauriEngine.analyzeBatch multi-visit preemption', () => {
  const searched = (visits: number, winRate: number) => ({
    moveSuggestions: [],
    winRate,
    scoreLead: 0,
    currentTurn: 'B',
    visits,
  });

  /** Search n answers `answers[n]`, which may abort the batch first. */
  function batchEngine(answers: ((controller: AbortController) => unknown)[]) {
    const controller = new AbortController();
    let searches = 0;
    let ids = 0;
    const { engine } = engineWith(async cmd => {
      if (cmd === 'onnx_mcts_request_id') return ++ids;
      if (cmd === 'onnx_analyze_mcts') return answers[searches++](controller);
      return undefined;
    });
    const inputs = [0, 1, 2].map(() => ({
      signMap: board,
      options: { numVisits: 10, signal: controller.signal, skipCache: true } as never,
    }));
    return { engine, inputs, searches: () => searches };
  }

  test('hands back the positions finished before the preemption', async () => {
    const { engine, inputs, searches } = batchEngine([
      () => searched(10, 0.1),
      controller => {
        controller.abort();
        // What Rust answers for a search the abort stopped early.
        return searched(3, 0.2);
      },
      () => searched(10, 0.3),
    ]);

    const error = await engine.analyzeBatch(inputs).catch(e => e);

    expect(error.name).toBe('AbortError');
    expect(error.partialResults.map((r: any) => r?.winRate ?? null)).toEqual([0.1, null, null]);
    expect(searches()).toBe(2);
  });

  test('keeps a search that finished before the abort reached it', async () => {
    const { engine, inputs, searches } = batchEngine([
      () => searched(10, 0.1),
      controller => {
        controller.abort();
        return searched(10, 0.2);
      },
      () => searched(10, 0.3),
    ]);

    const error = await engine.analyzeBatch(inputs).catch(e => e);

    expect(error.partialResults.map((r: any) => r?.winRate ?? null)).toEqual([0.1, 0.2, null]);
    expect(searches()).toBe(2);
  });

  test('a batch left alone searches every position', async () => {
    const { engine, inputs } = batchEngine([
      () => searched(10, 0.1),
      () => searched(10, 0.2),
      () => searched(10, 0.3),
    ]);

    const results = await engine.analyzeBatch(inputs);

    expect(results.map(r => r.winRate)).toEqual([0.1, 0.2, 0.3]);
  });
});

/**
 * Desktop full-game analysis sends whole batches to the native engine. The
 * native side can only ban the ko recapture (input plane 6, and the move
 * list) if each position carries its ko.
 */
describe('TauriEngine.analyzeBatch ko', () => {
  test('sends each position its ko', async () => {
    const calls: [string, any][] = [];
    const { engine } = engineWith(async (cmd, args: any) => {
      calls.push([cmd, args]);
      return (args?.inputs ?? []).map(() => ({
        moveSuggestions: [],
        winRate: 0.5,
        scoreLead: 0,
        currentTurn: 'B',
      }));
    });

    await engine.analyzeBatch([
      {
        signMap: board,
        options: { nextToPlay: 'B', koInfo: { sign: 1, vertex: [1, 0] } } as never,
      },
      {
        signMap: board,
        options: { nextToPlay: 'W', koInfo: { sign: 0, vertex: [-1, -1] } } as never,
      },
      { signMap: board, options: { nextToPlay: 'B' } },
    ]);

    const [, batch] = calls.find(([cmd]) => cmd === 'onnx_analyze_batch')!;
    expect(batch.inputs.map((i: any) => i.options.koInfo)).toEqual([
      { sign: 1, vertex: [1, 0] },
      null,
      null,
    ]);
  });
});
