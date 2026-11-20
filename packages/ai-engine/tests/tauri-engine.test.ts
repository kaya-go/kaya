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
    const { engine, lost } = engineWith(async () => {
      throw panicked;
    });

    await expect(engine.analyze(board, { numVisits: 10 } as never)).rejects.toBe(panicked);

    expect(lost).toHaveBeenCalledTimes(1);
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
