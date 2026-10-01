import { describe, test, expect } from 'bun:test';
import type * as ort from 'onnxruntime-web/all';
import { processBatchResults } from '../src/onnx-utils';

const fakeTensor = (data: number[], dims: number[]) =>
  ({ data: Float32Array.from(data), dims }) as unknown as ort.Tensor;

/** Raw outputs for one 2x2 position; `ownership` is the pre-tanh head output. */
const rawOutputs = (ownership: number[]) =>
  ({
    policy: fakeTensor([0, 0, 0, 0, 0], [1, 1, 5]),
    value: fakeTensor([0, 0, 0], [1, 3]),
    miscvalue: fakeTensor(new Array(10).fill(0), [1, 10]),
    ownership: fakeTensor(ownership, [1, 2, 2]),
  }) as unknown as ort.InferenceSession.ReturnType;

describe('processBatchResults ownership', () => {
  const raw = [3, -2.5, 0, 0.5];

  test('applies tanh to the pre-tanh head so values stay in [-1, 1]', async () => {
    const [result] = await processBatchResults(rawOutputs(raw), [1], 2, 1);
    expect(result.ownership).toHaveLength(4);
    result.ownership!.forEach((v, i) => expect(v).toBeCloseTo(Math.tanh(raw[i]), 6));
    expect(result.ownership!.every(v => v >= -1 && v <= 1)).toBe(true);
  });

  test('flips to Black perspective when White is to play', async () => {
    const [result] = await processBatchResults(rawOutputs(raw), [-1], 2, 1);
    result.ownership!.forEach((v, i) => expect(v).toBeCloseTo(-Math.tanh(raw[i]), 6));
  });
});
