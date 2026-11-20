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
