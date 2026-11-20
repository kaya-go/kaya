import { describe, test, expect } from 'bun:test';
import { selectPrecache } from './plugin';

describe('selectPrecache', () => {
  test('keeps what the app may ask for, not ORT, the update check or the worker', () => {
    const ortCopy = 'static/wasm/1037d7e6f8.module.wasm';
    const files = [
      'index.html',
      'manifest.json',
      'logo.svg',
      'assets/move-0.ogg',
      'vendor/gamecontroller.min.js',
      'static/js/index.abc.js',
      'static/js/index.abc.js.LICENSE.txt',
      'static/js/async/ai-worker.def.js',
      'static/image/board.123.png',
      'static/wasm/c09ec6166e.module.wasm',
      ortCopy,
      'static/assets/ort.bundle.min.456.mjs',
      'wasm/1.31.1/ort-wasm-simd-threaded.jsep.wasm',
      'version.json',
      'sw.js',
    ];
    const ortCopies = new Set([ortCopy, 'static/assets/ort.bundle.min.456.mjs']);
    expect(selectPrecache(files, ortCopies)).toEqual([
      'assets/move-0.ogg',
      'index.html',
      'logo.svg',
      'manifest.json',
      'static/image/board.123.png',
      'static/js/async/ai-worker.def.js',
      'static/js/index.abc.js',
      'static/wasm/c09ec6166e.module.wasm',
      'vendor/gamecontroller.min.js',
    ]);
  });
});
