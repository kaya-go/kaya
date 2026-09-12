/**
 * Unit tests for the auto-config decision table.
 *
 * `pickQuantization` is a table of platform claims, and the previous version
 * of it generalised one machine's benchmark into global rules that turned out
 * to be false (specs/2026-09-12-precision-follows-the-backend.md). These
 * tests pin the cells that have an actual measurement behind them, so that
 * changing one is a deliberate act with a visible diff rather than a tweak.
 */

import { describe, test, expect } from 'bun:test';
import { pickConfig, type HostOS, type Probe } from '../src/auto-config';

function probe(overrides: Partial<Probe> = {}): Probe {
  return {
    isTauri: false,
    os: 'unknown',
    hasWebGPU: false,
    hasShaderF16: false,
    threads: 8,
    approxRamMB: null,
    hasPyTorchSidecar: false,
    ...overrides,
  };
}

const desktop = (os: HostOS, overrides: Partial<Probe> = {}) =>
  probe({ isTauri: true, os, ...overrides });

describe('pickQuantization', () => {
  test('macOS desktop gets fp32 — measured faster than fp16 on CoreML', () => {
    expect(pickConfig(desktop('macos')).quantization).toBe('fp32');
  });

  test('Windows desktop keeps fp16 — DirectML has never been measured', () => {
    expect(pickConfig(desktop('windows')).quantization).toBe('fp16');
  });

  test('the PyTorch sidecar takes fp16', () => {
    expect(pickConfig(desktop('linux', { hasPyTorchSidecar: true })).quantization).toBe('fp16');
  });

  test('WebGPU takes fp16 only when the adapter reports shader-f16', () => {
    const withF16 = probe({ hasWebGPU: true, hasShaderF16: true });
    const withoutF16 = probe({ hasWebGPU: true, hasShaderF16: false });
    expect(pickConfig(withF16).quantization).toBe('fp16');
    expect(pickConfig(withoutF16).quantization).toBe('fp32');
  });

  test('WASM falls back to fp32, the always-works precision', () => {
    expect(pickConfig(probe()).quantization).toBe('fp32');
  });

  test('uint8 is never auto-selected on any host', () => {
    const hosts: Probe[] = [
      desktop('macos'),
      desktop('windows'),
      desktop('linux'),
      desktop('linux', { hasPyTorchSidecar: true }),
      probe({ hasWebGPU: true, hasShaderF16: true }),
      probe(),
    ];
    for (const p of hosts) {
      expect(pickConfig(p).quantization).not.toBe('uint8');
    }
  });
});

describe('pickBackendChain', () => {
  test('desktop without a sidecar tries the native GPU before the CPU', () => {
    expect(pickConfig(desktop('macos')).backendChain).toEqual(['native-gpu', 'native-cpu']);
  });

  test('the PyTorch sidecar preempts the native chain when present', () => {
    expect(pickConfig(desktop('linux', { hasPyTorchSidecar: true })).backendChain).toEqual([
      'pytorch',
      'native-gpu',
      'native-cpu',
    ]);
  });

  test('the browser falls back to WASM without WebGPU', () => {
    expect(pickConfig(probe({ hasWebGPU: true })).backendChain).toEqual(['webgpu', 'wasm']);
    expect(pickConfig(probe()).backendChain).toEqual(['wasm']);
  });
});

describe('explainPick', () => {
  test('says nothing about precision — the pill reports what actually loaded', () => {
    const hosts: Probe[] = [
      desktop('macos'),
      desktop('linux', { hasPyTorchSidecar: true }),
      probe({ hasWebGPU: true, hasShaderF16: true }),
      probe(),
    ];
    for (const p of hosts) {
      const { reasoning } = pickConfig(p);
      expect(reasoning).not.toMatch(/fp16|fp32|uint8|int8/i);
      expect(reasoning.length).toBeGreaterThan(0);
    }
  });
});
