import { describe, expect, test } from 'bun:test';
import { isWebGPUOptimized } from '../src/webgpu-converter';

describe('isWebGPUOptimized', () => {
  test('reads the marker from a filename', () => {
    expect(isWebGPUOptimized('kata1-b18c384nbt.static-b1.webgpu.onnx')).toBe(true);
    expect(isWebGPUOptimized('kata1-b18c384nbt.static-b1.webgpu.fp16.onnx')).toBe(true);
  });

  // The model library stores a user file's name without `.onnx`, which leaves
  // the marker as the last token: it must still count.
  test('reads the marker when it comes last', () => {
    expect(isWebGPUOptimized('kata1-b18c384nbt.static-b1.webgpu')).toBe(true);
  });

  test('ignores names that only contain the word', () => {
    expect(isWebGPUOptimized('kata1-b28c512nbt-s12043015936-d5616446734')).toBe(false);
    expect(isWebGPUOptimized('my-webgpu-net.fp16.onnx')).toBe(false);
    expect(isWebGPUOptimized('net.webgpux.onnx')).toBe(false);
  });
});
