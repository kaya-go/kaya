/**
 * One inference on WebGPU opens a GPU error scope and allocates input and
 * output tensors. A failed run must close the scope and free the tensors:
 * a scope left open swallows every later validation error, and tensors left
 * behind hold GPU memory.
 */

import { describe, expect, test } from 'bun:test';
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
