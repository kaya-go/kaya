import { describe, test, expect, beforeEach, afterEach } from 'bun:test';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { copyOrtRuntime, resolveOrtWeb, ORT_RUNTIME_FILE } from './ort-web';

const rootDir = path.resolve(import.meta.dir, '..');

describe('resolveOrtWeb', () => {
  test('finds the one version both consuming packages resolve', async () => {
    const ort = resolveOrtWeb(rootDir);
    const files = await fs.readdir(ort.distDir);
    expect(ort.version).toMatch(/^\d+\.\d+\.\d+/);
    expect(files.filter(f => ORT_RUNTIME_FILE.test(f) && f.endsWith('.wasm')).length).toBe(4);
  });
});

describe('copyOrtRuntime', () => {
  let tmp: string;
  let distDir: string;
  let destRoot: string;

  beforeEach(async () => {
    tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'ort-web-'));
    distDir = path.join(tmp, 'dist');
    destRoot = path.join(tmp, 'public', 'wasm');
    await fs.mkdir(distDir, { recursive: true });
  });

  afterEach(async () => {
    await fs.rm(tmp, { recursive: true, force: true });
  });

  const write = (dir: string, name: string) => fs.writeFile(path.join(dir, name), name);

  test('replaces whatever was there with <version>/ holding the runtime files only', async () => {
    for (const name of [
      'ort-wasm-simd-threaded.wasm',
      'ort-wasm-simd-threaded.mjs',
      'ort-wasm-simd-threaded.jsep.wasm',
      'ort-wasm-simd-threaded.jsep.mjs',
      'ort.all.bundle.min.mjs',
      'ort.min.js',
    ]) {
      await write(distDir, name);
    }
    // Left by an older install: unversioned files and another version's folder
    await fs.mkdir(path.join(destRoot, '1.24.3'), { recursive: true });
    await write(destRoot, 'ort-wasm-simd-threaded.wasm');
    await write(path.join(destRoot, '1.24.3'), 'ort-wasm-simd-threaded.wasm');

    await copyOrtRuntime({ distDir, version: '1.31.1' }, destRoot);

    expect(await fs.readdir(destRoot)).toEqual(['1.31.1']);
    expect((await fs.readdir(path.join(destRoot, '1.31.1'))).sort()).toEqual([
      'ort-wasm-simd-threaded.jsep.mjs',
      'ort-wasm-simd-threaded.jsep.wasm',
      'ort-wasm-simd-threaded.mjs',
      'ort-wasm-simd-threaded.wasm',
    ]);
  });

  test('throws, leaving the destination alone, when there is no .wasm to copy', async () => {
    await write(distDir, 'ort.min.mjs');
    await fs.mkdir(destRoot, { recursive: true });
    await write(destRoot, 'keep-me');

    await expect(copyOrtRuntime({ distDir, version: '1.31.1' }, destRoot)).rejects.toThrow(
      /\.wasm/
    );
    expect(await fs.readdir(destRoot)).toEqual(['keep-me']);
  });

  test('throws when the package is not installed', async () => {
    await expect(
      copyOrtRuntime({ distDir: path.join(tmp, 'missing'), version: '1.31.1' }, destRoot)
    ).rejects.toThrow();
  });
});
