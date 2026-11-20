/**
 * Upload dedup stores a base64url SHA-256. The digests below are the
 * well-known test vectors, so a change in alphabet or padding fails here.
 * `commands/upload.rs` checks the same two vectors on the Rust side.
 */

import { describe, expect, test } from 'bun:test';
import { parseModelFilename, sha256Base64Url } from '../src/services/modelStorage';

describe('sha256Base64Url', () => {
  test('encodes SHA-256 of empty input as unpadded base64url', async () => {
    expect(await sha256Base64Url(new ArrayBuffer(0))).toBe(
      '47DEQpj8HBSa-_TImW-5JCeuQeRkm5NMpJWZG3hSuFU'
    );
  });

  test('uses the url-safe alphabet', async () => {
    const abc = new TextEncoder().encode('abc').buffer as ArrayBuffer;
    // Standard base64 of this digest has both a `+` and a `/`.
    expect(await sha256Base64Url(abc)).toBe('ungWv48Bz-pBQUDeXa4iI7ADYaOWF3qctBD_YfIAFa0');
  });
});

describe('parseModelFilename', () => {
  test('splits a standard filename into network name and precision', () => {
    expect(parseModelFilename('kata1-b28c512nbt-s12043015936-d5616446734.fp16.onnx')).toEqual({
      name: 'kata1-b28c512nbt-s12043015936-d5616446734',
      quantization: 'fp16',
      displayName: 'kata1-b28c512nbt-s12043015936-d5616446734.fp16',
    });
  });

  test('reads the precision token whatever its case', () => {
    expect(parseModelFilename('Net.UINT8.ONNX')).toEqual({
      name: 'Net',
      quantization: 'uint8',
      displayName: 'Net.UINT8',
    });
  });

  test('leaves the precision unset when the name does not end with one', () => {
    expect(parseModelFilename('my-net.onnx')).toEqual({ name: 'my-net', displayName: 'my-net' });
    // A converted file ends with its markers, which the engine chain reads from `name`.
    expect(parseModelFilename('net.fp16.static-b1.webgpu.onnx')).toEqual({
      name: 'net.fp16.static-b1.webgpu',
      displayName: 'net.fp16.static-b1.webgpu',
    });
  });

  test('drops the directory of a path, on either separator', () => {
    expect(parseModelFilename('/models/net.fp32.onnx').name).toBe('net');
    expect(parseModelFilename('C:\\models\\net.fp32.onnx').name).toBe('net');
  });

  test('never returns an empty name', () => {
    expect(parseModelFilename('.onnx')).toEqual({ name: '.onnx', displayName: '.onnx' });
    expect(parseModelFilename('fp16.onnx')).toEqual({ name: 'fp16', displayName: 'fp16' });
  });
});
