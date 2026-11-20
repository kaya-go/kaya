import { describe, expect, mock, test } from 'bun:test';
import type { SignMap } from '@kaya/goboard';
import { PyTorchTauriEngine } from '../src/pytorch-tauri-engine';

const board: SignMap = [
  [0, 0],
  [0, 0],
];

/** A PyTorchTauriEngine that believes it is initialized, with `invoke` replaced. */
function engineWith(invoke: (cmd: string, args?: unknown) => Promise<unknown>) {
  const engine = new PyTorchTauriEngine({ enableCache: false });
  const internals = engine as unknown as Record<string, unknown>;
  internals.invoke = invoke;
  internals.initialized = true;
  const lost = mock((_error: Error) => {});
  engine.onEngineLost = lost;
  return { engine, lost };
}

describe('PyTorchTauriEngine engine loss', () => {
  // A panic under the sidecar lock drops the engine, so the next call answers
  // "not initialized": without a new engine, the sidecar stayed dead until the
  // app restarted.
  test('reports itself lost when the sidecar engine is gone', async () => {
    const gone = 'PyTorch engine not initialized';
    const { engine, lost } = engineWith(async () => {
      throw gone;
    });

    await expect(engine.analyzeBatch([{ signMap: board }])).rejects.toBe(gone);
    await expect(engine.analyze(board)).rejects.toBe(gone);

    expect(lost).toHaveBeenCalledTimes(2);
    expect(lost.mock.calls[0][0].message).toBe(gone);
  });

  test('reports itself lost when the sidecar process died', async () => {
    const { engine, lost } = engineWith(async () => {
      throw 'Sidecar process closed unexpectedly';
    });

    await expect(engine.analyze(board)).rejects.toBeDefined();

    expect(lost).toHaveBeenCalledTimes(1);
  });

  // Featurization runs outside the lock: a panic there points at the input,
  // and a new engine would panic on the same position again.
  test('a panic outside the lock leaves the engine in place', async () => {
    const { engine, lost } = engineWith(async () => {
      throw 'Task failed: task 12 panicked with message "index out of bounds"';
    });

    await expect(engine.analyzeBatch([{ signMap: board }])).rejects.toBeDefined();

    expect(lost).not.toHaveBeenCalled();
  });

  // Its own `pytorch_dispose` empties the slot, so a request still in flight
  // comes back "not initialized". The owner's handler would then dispose the
  // engine that replaced this one.
  test('a disposed engine does not report itself lost', async () => {
    let reject: (reason: unknown) => void = () => {};
    const { engine, lost } = engineWith(cmd =>
      cmd === 'pytorch_analyze_batch'
        ? new Promise((_, r) => {
            reject = r;
          })
        : Promise.resolve(undefined)
    );

    const pending = engine.analyzeBatch([{ signMap: board }]);
    await Promise.resolve();
    await engine.dispose();
    reject('PyTorch engine not initialized');

    await expect(pending).rejects.toBe('PyTorch engine not initialized');
    expect(lost).not.toHaveBeenCalled();
  });
});
