/**
 * Unit tests for the WebGPU graph-capture session swap on a board-size change.
 *
 * The current session is released before its replacement exists, so a failed
 * swap must never hand that dead session back: the engine has to report itself
 * lost so its owner can build a new one.
 */

import { afterEach, describe, expect, mock, spyOn, test } from 'bun:test';
import * as ort from 'onnxruntime-web/all';
import { OnnxEngine } from '../src/onnx-engine';
import { createEmptyGpuState, recreateSessionForBoardSize } from '../src/onnx-gpu';

const fakeSession = () => {
  const session = { release: mock(async () => {}) };
  return session as typeof session & ort.InferenceSession;
};

const stateAt19 = () => ({ ...createEmptyGpuState(), allocatedBoardSize: 19 });

const swap = (
  state: ReturnType<typeof createEmptyGpuState>,
  size: number,
  current: ort.InferenceSession
) =>
  recreateSessionForBoardSize(
    state,
    size,
    'float32',
    8,
    {},
    { buffer: new ArrayBuffer(8) },
    current
  );

describe('recreateSessionForBoardSize', () => {
  afterEach(() => mock.restore());

  test('does nothing when the size is unchanged', async () => {
    const create = spyOn(ort.InferenceSession, 'create');
    const current = fakeSession();

    expect(await swap(stateAt19(), 19, current)).toBeNull();
    expect(current.release).not.toHaveBeenCalled();
    expect(create).not.toHaveBeenCalled();
  });

  test('throws instead of returning the released session when creation fails', async () => {
    spyOn(ort.InferenceSession, 'create').mockRejectedValue(new Error('device lost'));
    const current = fakeSession();

    await expect(swap(stateAt19(), 9, current)).rejects.toThrow('device lost');
    expect(current.release).toHaveBeenCalledTimes(1);
  });

  test('releases the new session when the GPU buffers cannot be allocated', async () => {
    // No WebGPU device under bun, so the allocation after the creation fails.
    const created = fakeSession();
    spyOn(ort.InferenceSession, 'create').mockResolvedValue(created);

    await expect(swap(stateAt19(), 9, fakeSession())).rejects.toThrow('WebGPU device');
    expect(created.release).toHaveBeenCalledTimes(1);
  });
});

describe('OnnxEngine after a failed session swap', () => {
  afterEach(() => mock.restore());

  const engineWithDeadSwap = () => {
    spyOn(ort.InferenceSession, 'create').mockRejectedValue(new Error('device lost'));
    const engine = new OnnxEngine({ modelBuffer: new ArrayBuffer(8) });
    const internals = engine as unknown as Record<string, unknown>;
    internals.initialized = true;
    internals.session = fakeSession();
    internals.storedSessionOptions = {};
    internals.modelSource = { buffer: new ArrayBuffer(8) };
    internals.gpu = stateAt19();
    return {
      engine,
      internals,
      ensureGpuBuffers: (size: number) =>
        (internals.ensureGpuBuffers as (size: number) => Promise<void>).call(engine, size),
    };
  };

  test('reports itself lost once and drops the dead session', async () => {
    const { engine, internals, ensureGpuBuffers } = engineWithDeadSwap();
    const lost = mock((_error: Error) => {});
    engine.onEngineLost = lost;

    await expect(ensureGpuBuffers(9)).rejects.toThrow('device lost');

    expect(lost).toHaveBeenCalledTimes(1);
    expect(lost.mock.calls[0][0].message).toBe('device lost');
    expect(internals.session).toBeNull();
  });

  test('still throws without a subscriber, which is how warm-up moves the chain on', async () => {
    const { ensureGpuBuffers } = engineWithDeadSwap();

    await expect(ensureGpuBuffers(9)).rejects.toThrow('device lost');
  });
});
