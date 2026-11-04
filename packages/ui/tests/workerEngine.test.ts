/**
 * WorkerEngine forwards an engine lost in the worker to whoever owns it. The
 * provider relies on that to run the backend chain again.
 */

import { describe, expect, mock, test } from 'bun:test';
import { WorkerEngine } from '../src/workers/WorkerEngine';

const fakeWorker = () =>
  ({
    onmessage: null,
    postMessage: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    terminate: () => {},
  }) as unknown as Worker;

const fromWorker = (worker: Worker, data: unknown) => worker.onmessage?.({ data } as MessageEvent);

describe('WorkerEngine engine_lost', () => {
  test('calls onEngineLost with the error from the worker', () => {
    const worker = fakeWorker();
    const engine = new WorkerEngine(worker, {});
    const lost = mock((_error: Error) => {});
    engine.onEngineLost = lost;

    fromWorker(worker, { type: 'engine_lost', error: 'device lost' });

    expect(lost).toHaveBeenCalledTimes(1);
    expect(lost.mock.calls[0][0].message).toBe('device lost');
  });

  test('is harmless before anyone subscribes', () => {
    const worker = fakeWorker();
    new WorkerEngine(worker, {});

    expect(() => fromWorker(worker, { type: 'engine_lost', error: 'device lost' })).not.toThrow();
  });
});
