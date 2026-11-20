/**
 * WorkerEngine forwards an engine lost in the worker to whoever owns it. The
 * provider relies on that to run the backend chain again.
 */

import { afterEach, beforeEach, describe, expect, jest, mock, test } from 'bun:test';
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

/** An initialised engine on a scripted worker. */
async function readyEngine() {
  const w = scriptedWorker();
  const engine = new WorkerEngine(w.worker, {});
  const init = engine.initialize();
  w.reply({ type: 'init_success' });
  await init;
  return { w, engine };
}

/** Lets the promise chain an analyze() call starts reach postMessage. */
const settle = () => new Promise(resolve => process.nextTick(resolve));

const analyzeIds = (posted: { type: string; id?: number }[]) =>
  posted.filter(m => m.type === 'analyze').map(m => m.id!);

const progress = (id: number, completedVisits: number) => ({
  type: 'mcts_progress',
  id,
  progress: { completedVisits, totalVisits: 5000, topMoves: [] },
});

const RESULT = { moveSuggestions: [], winRate: 0.5, scoreLead: 0, currentTurn: 'B' };

describe('WorkerEngine timeout', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  test('a request the worker stops answering times out and is aborted in the worker', async () => {
    const { w, engine } = await readyEngine();
    const outcome = engine.analyze([[0]], { numVisits: 500 } as any).then(
      () => 'resolved',
      (e: Error) => e.message
    );
    await settle();
    const [id] = analyzeIds(w.posted as any);

    jest.advanceTimersByTime(60_000);

    expect(await outcome).toMatch(/timed out/);
    // Without the abort the worker keeps searching, and every later request
    // waits behind it.
    expect(w.posted).toContainEqual({ type: 'abort', id });
  });

  test('a deep search does not time out while it reports progress', async () => {
    const { w, engine } = await readyEngine();
    const pending = engine.analyze([[0]], { numVisits: 5000 } as any);
    await settle();
    const [id] = analyzeIds(w.posted as any);

    // Five minutes of search, progress every 30 s.
    for (let i = 1; i <= 10; i++) {
      jest.advanceTimersByTime(30_000);
      w.reply(progress(id, i * 100));
    }
    w.reply({ type: 'analyze_success', id, result: RESULT });

    expect(await pending).toEqual(RESULT as any);
  });

  test('a request queued behind a long search does not time out while it waits', async () => {
    const { w, engine } = await readyEngine();
    const first = engine.analyze([[0]], { numVisits: 5000 } as any);
    const second = engine.analyze([[1]], { numVisits: 5000 } as any);
    await settle();
    const [firstId, secondId] = analyzeIds(w.posted as any);

    for (let i = 1; i <= 6; i++) {
      jest.advanceTimersByTime(30_000);
      w.reply(progress(firstId, i * 100));
    }
    w.reply({ type: 'analyze_success', id: firstId, result: RESULT });
    w.reply({ type: 'analyze_success', id: secondId, result: RESULT });

    expect(await first).toEqual(RESULT as any);
    expect(await second).toEqual(RESULT as any);
  });

  test('an aborted request rejects at once and tells the worker', async () => {
    const { w, engine } = await readyEngine();
    const controller = new AbortController();
    const outcome = engine
      .analyze([[0]], { numVisits: 500, signal: controller.signal } as any)
      .then(
        () => 'resolved',
        (e: Error) => e.name
      );
    await settle();
    const [id] = analyzeIds(w.posted as any);

    controller.abort();

    // The worker can take a whole batch to stop: the caller does not wait for it.
    expect(await outcome).toBe('AbortedError');
    expect(w.posted).toContainEqual({ type: 'abort', id });
  });
});
