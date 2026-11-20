import { describe, test, expect } from 'bun:test';
import { selectPrecache, selectShell } from './plugin';

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
      'build-files.json',
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

describe('selectShell', () => {
  test('index.html and the files it loads under the asset prefix', () => {
    const precache = [
      'favicon.svg',
      'index.html',
      'manifest.json',
      'static/css/index.abc.css',
      'static/image/board.123.png',
      'static/js/async/ai-worker.def.js',
      'static/js/index.abc.js',
      'vendor/gamecontroller.min.js',
    ];
    const html = [
      '<link rel="icon" href="/next/favicon.svg">',
      '<link rel="manifest" href="/next/manifest.json">',
      '<script defer src="/next/vendor/gamecontroller.min.js"></script>',
      '<script defer src="/next/static/js/index.abc.js"></script>',
      '<link href="/next/static/css/index.abc.css" rel="stylesheet">',
    ].join('');
    expect(selectShell(precache, html, '/next/')).toEqual([
      'favicon.svg',
      'index.html',
      'manifest.json',
      'static/css/index.abc.css',
      'static/js/index.abc.js',
      'vendor/gamecontroller.min.js',
    ]);
    // The stable prefix does not match /next/'s references
    expect(selectShell(precache, html, '/')).toEqual(['index.html']);
  });
});
