import { describe, test, expect } from 'bun:test';
import type * as ort from 'onnxruntime-web/all';
import { float32ToFloat16, processBatchResults, versionedWasmPath } from '../src/onnx-utils';

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

const SQUARE_2 = { width: 2, height: 2, side: 2 };

describe('processBatchResults ownership', () => {
  const raw = [3, -2.5, 0, 0.5];

  test('applies tanh to the pre-tanh head so values stay in [-1, 1]', async () => {
    const [result] = await processBatchResults(rawOutputs(raw), [1], SQUARE_2, 1);
    expect(result.ownership).toHaveLength(4);
    result.ownership!.forEach((v, i) => expect(v).toBeCloseTo(Math.tanh(raw[i]), 6));
    expect(result.ownership!.every(v => v >= -1 && v <= 1)).toBe(true);
  });

  test('flips to Black perspective when White is to play', async () => {
    const [result] = await processBatchResults(rawOutputs(raw), [-1], SQUARE_2, 1);
    result.ownership!.forEach((v, i) => expect(v).toBeCloseTo(-Math.tanh(raw[i]), 6));
  });
});

describe('processBatchResults on a board smaller than the input', () => {
  // A 1-wide, 2-high board in a 2x2 input: indices 0 and 2 are on it, 1 and 3
  // past its right edge, 4 is the pass.
  const shape = { width: 1, height: 2, side: 2 };
  const outputs = () =>
    ({
      policy: fakeTensor([1, 5, 0, 4, -1], [1, 1, 5]),
      value: fakeTensor([0, 0, 0], [1, 3]),
      miscvalue: fakeTensor(new Array(10).fill(0), [1, 10]),
      ownership: fakeTensor([3, 3, -2, -2], [1, 2, 2]),
    }) as unknown as ort.InferenceSession.ReturnType;

  test('ranks only moves on the board, their probabilities summing to 1', async () => {
    const [result] = await processBatchResults(outputs(), [1], shape, 1);

    expect(result.moveSuggestions.map(s => s.move)).toEqual(['A2', 'A1', 'PASS']);
    const total = result.moveSuggestions.reduce((sum, s) => sum + s.probability, 0);
    expect(total).toBeCloseTo(1, 6);
    expect(result.moveSuggestions[0].probability).toBeCloseTo(
      Math.E / (Math.E + 1 + Math.exp(-1)),
      6
    );
  });

  test('ownership stays on the square input, 0 past the edge', async () => {
    const [result] = await processBatchResults(outputs(), [1], shape, 1);
    expect(result.ownership).toHaveLength(4);
    expect(result.ownership![0]).toBeCloseTo(Math.tanh(3), 6);
    expect(result.ownership![1]).toBe(0);
    expect(result.ownership![2]).toBeCloseTo(Math.tanh(-2), 6);
    expect(result.ownership![3]).toBe(0);
  });
});

describe('float32ToFloat16', () => {
  const half = (v: number) => float32ToFloat16(Float32Array.of(v))[0];

  test('keeps values below the smallest normal half as subnormals', () => {
    expect(half(2 ** -15)).toBe(0x0200);
    expect(half(2 ** -24)).toBe(0x0001); // smallest subnormal
    expect(half(3 * 2 ** -16)).toBe(0x0300); // 768 * 2^-24
    expect(half(-(2 ** -15))).toBe(0x8200);
  });

  test('still encodes normals, zero and values too small for a half', () => {
    expect(half(2 ** -14)).toBe(0x0400); // smallest normal
    expect(half(1)).toBe(0x3c00);
    expect(half(0.375)).toBe(0x3600); // komi 7.5 / 20
    expect(half(0)).toBe(0);
    expect(half(2 ** -26)).toBe(0);
  });
});

describe('versionedWasmPath', () => {
  test('appends the ORT version folder to the root, with or without a slash', () => {
    expect(versionedWasmPath('/wasm/', '1.31.1')).toBe('/wasm/1.31.1/');
    expect(versionedWasmPath('https://kayago.app/next/wasm', '1.31.1')).toBe(
      'https://kayago.app/next/wasm/1.31.1/'
    );
  });

  test('throws rather than fall back to an unversioned path', () => {
    expect(() => versionedWasmPath('/wasm/', undefined)).toThrow();
  });
});
