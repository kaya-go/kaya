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

/** A worker double that records listeners and messages, and can fail. */
function scriptedWorker() {
  const listeners = new Set<(e: MessageEvent) => void>();
  const posted: { type: string }[] = [];
  let terminated = false;
  const worker = {
    onmessage: null as ((e: MessageEvent) => void) | null,
    onerror: null as ((e: ErrorEvent) => void) | null,
    onmessageerror: null as ((e: MessageEvent) => void) | null,
    postMessage: (msg: { type: string }) => posted.push(msg),
    addEventListener: (_: string, fn: (e: MessageEvent) => void) => listeners.add(fn),
    removeEventListener: (_: string, fn: (e: MessageEvent) => void) => listeners.delete(fn),
    terminate: () => {
      terminated = true;
    },
  };
  return {
    worker: worker as unknown as Worker,
    posted,
    isTerminated: () => terminated,
    crash: (message: string) =>
      worker.onerror?.({ message, preventDefault: () => {} } as unknown as ErrorEvent),
    reply: (data: unknown) => {
      for (const fn of [...listeners]) fn({ data } as MessageEvent);
      worker.onmessage?.({ data } as MessageEvent);
    },
  };
}

describe('WorkerEngine when the worker itself fails', () => {
  test('initialize() rejects instead of waiting forever', async () => {
    const w = scriptedWorker();
    const engine = new WorkerEngine(w.worker, {});
    const init = engine.initialize();
    w.crash('Failed to fetch dynamically imported module');
    await expect(init).rejects.toThrow('AI worker failed: Failed to fetch');
  });

  test('a pending analysis rejects, and later ones fail at once', async () => {
    const w = scriptedWorker();
    const engine = new WorkerEngine(w.worker, {});
    const init = engine.initialize();
    w.reply({ type: 'init_success' });
    await init;

    const pending = engine.analyzeBatch([{ signMap: [[0]] }]);
    w.crash('worker crashed');
    await expect(pending).rejects.toThrow('worker crashed');
    await expect(engine.analyzeBatch([{ signMap: [[0]] }])).rejects.toThrow('worker crashed');
  });

  test('dispose() terminates a failed worker without waiting for an answer', async () => {
    const w = scriptedWorker();
    const engine = new WorkerEngine(w.worker, {});
    w.crash('gone');
    await engine.dispose();
    expect(w.isTerminated()).toBe(true);
    expect(w.posted.some(m => m.type === 'dispose')).toBe(false);
  });

  test('dispose() still lets a healthy worker release its session', async () => {
    const w = scriptedWorker();
    const engine = new WorkerEngine(w.worker, {});
    const disposed = engine.dispose();
    expect(w.posted.some(m => m.type === 'dispose')).toBe(true);
    w.reply({ type: 'dispose_success' });
    await disposed;
    expect(w.isTerminated()).toBe(true);
  });
});
