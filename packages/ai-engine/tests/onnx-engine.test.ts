/**
 * One inference on WebGPU opens a GPU error scope and allocates input and
 * output tensors. A failed run must close the scope and free the tensors:
 * a scope left open swallows every later validation error, and tensors left
 * behind hold GPU memory.
 */

import { describe, expect, test } from 'bun:test';
import { GoBoard } from '@kaya/goboard';
import { OnnxEngine } from '../src/onnx-engine';

function engineWithFakeGpu(run: () => Promise<unknown>, scopeError: { message: string } | null) {
  const engine = new OnnxEngine({});
  const openScopes: string[] = [];
  const disposed: string[] = [];
  const tensor = (name: string) => ({ dispose: () => disposed.push(name) });
  const internals = engine as any;
  internals.gpuDevice = {
    pushErrorScope: (filter: string) => openScopes.push(filter),
    popErrorScope: async () => {
      openScopes.pop();
      return scopeError;
    },
  };
  internals.session = { run };
  internals.prepareInputTensors = async () => ({
    binTensor: tensor('bin_input'),
    globalTensor: tensor('global_input'),
    usingGpuBuffers: false,
  });
  const infer = () =>
    internals.runBatchInference(
      new Float32Array(0),
      new Float32Array(0),
      [1],
      9
    ) as Promise<unknown>;
  return { infer, openScopes, disposed, tensor };
}

describe('OnnxEngine inference cleanup', () => {
  test('a run that throws closes the error scope and frees its inputs', async () => {
    const gpu = engineWithFakeGpu(async () => {
      throw new Error('device lost');
    }, null);

    await expect(gpu.infer()).rejects.toThrow('device lost');

    expect(gpu.openScopes).toEqual([]);
    expect(gpu.disposed.sort()).toEqual(['bin_input', 'global_input']);
  });

  test('a validation error after the run frees the outputs too', async () => {
    const gpu = engineWithFakeGpu(
      async () => ({
        policy: gpu.tensor('policy'),
        value: gpu.tensor('value'),
        miscvalue: gpu.tensor('miscvalue'),
      }),
      { message: 'invalid buffer' }
    );

    await expect(gpu.infer()).rejects.toThrow('WebGPU validation error: invalid buffer');

    expect(gpu.openScopes).toEqual([]);
    expect(gpu.disposed.sort()).toEqual([
      'bin_input',
      'global_input',
      'miscvalue',
      'policy',
      'value',
    ]);
  });
});

/**
 * A rectangular game reaches the engine as its own board, H rows of W points.
 * The network sees it in the corner of a square input whose side is the longer
 * one, with plane 0 marking the real points; the search and the ranked moves
 * stay on the board. Moves are named on that square (row = side - y).
 */
describe('OnnxEngine on a rectangular board', () => {
  const LETTERS = 'ABCDEFGHJKLMNOPQRST';
  const tensorOf = (data: number[], dims: number[]) => ({ data: Float32Array.from(data), dims });

  /** A fake network whose favourite point is `favourite` = [x, y], wherever that is. */
  function engineWithFakeModel(favourite: readonly [number, number]) {
    const engine = new OnnxEngine({});
    const inputs: { side: number; onBoard: number; offBoardStones: number }[] = [];
    const internals = engine as any;
    internals.initialized = true;
    internals.session = {
      run: async (feeds: Record<string, { data: Float32Array; dims: readonly number[] }>) => {
        const [batch, , side] = feeds.bin_input.dims as number[];
        const area = side * side;
        const data = feeds.bin_input.data;
        for (let b = 0; b < batch; b++) {
          const item = data.subarray(b * 22 * area, (b + 1) * 22 * area);
          let onBoard = 0;
          let offBoardStones = 0;
          for (let i = 0; i < area; i++) {
            if (item[i] === 1) onBoard++;
            else if (item[area + i] === 1 || item[2 * area + i] === 1) offBoardStones++;
          }
          inputs.push({ side, onBoard, offBoardStones });
        }
        const policy: number[] = [];
        for (let b = 0; b < batch; b++) {
          for (let i = 0; i <= area; i++) {
            const [x, y] = [i % side, Math.floor(i / side)];
            policy.push(i === area ? -5 : x === favourite[0] && y === favourite[1] ? 10 : -x - y);
          }
        }
        return {
          policy: tensorOf(policy, [batch, 1, area + 1]),
          value: tensorOf(new Array(batch * 3).fill(0), [batch, 3]),
          miscvalue: tensorOf(new Array(batch * 10).fill(0), [batch, 10]),
          ownership: tensorOf(new Array(batch * area).fill(0), [batch, 1, side, side]),
        };
      },
    };
    return { engine, inputs };
  }

  const onBoard = (move: string, width: number, height: number, side: number) => {
    if (move === 'PASS') return true;
    const x = LETTERS.indexOf(move[0]);
    const y = side - parseInt(move.slice(1), 10);
    return x >= 0 && x < width && y >= 0 && y < height;
  };

  const CASES = [
    // 9 wide, 13 high: the favourite point is past the right edge.
    [9, 13, [9, 0]],
    // 13 wide, 9 high: the favourite point is past the bottom edge.
    [13, 9, [0, 9]],
  ] as const;

  test.each(CASES)('a %ix%i search stays on the board', async (width, height, favourite) => {
    const { engine, inputs } = engineWithFakeModel(favourite);
    const signMap = GoBoard.fromDimensions(width, height).signMap;

    const result = await engine.analyze(signMap, {
      nextToPlay: 'B',
      numVisits: 16,
      skipCache: true,
    });

    expect(inputs.length).toBeGreaterThan(1);
    for (const input of inputs) {
      expect(input).toEqual({ side: 13, onBoard: width * height, offBoardStones: 0 });
    }
    expect(result.moveSuggestions.length).toBeGreaterThan(0);
    for (const s of result.moveSuggestions) {
      expect(onBoard(s.move, width, height, 13)).toBe(true);
    }
    expect(result.ownership).toHaveLength(13 * 13);
  });

  test.each(CASES)('a %ix%i policy batch stays on the board', async (width, height, favourite) => {
    const { engine, inputs } = engineWithFakeModel(favourite);
    const signMap = GoBoard.fromDimensions(width, height).signMap;

    const [result] = await engine.analyzeBatch([
      { signMap, options: { nextToPlay: 'B', skipCache: true } },
    ]);

    expect(inputs).toEqual([{ side: 13, onBoard: width * height, offBoardStones: 0 }]);
    expect(result.moveSuggestions.length).toBeGreaterThan(0);
    for (const s of result.moveSuggestions) {
      expect(onBoard(s.move, width, height, 13)).toBe(true);
    }
  });
});
