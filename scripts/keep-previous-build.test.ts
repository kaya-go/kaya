import { describe, test, expect, beforeEach, afterEach } from 'bun:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { BUILD_FILES, keepPreviousBuild } from './keep-previous-build';

let tmp: string;

/** Write `files` (path → content) under `dir`. */
function site(dir: string, files: Record<string, string>) {
  const root = path.join(tmp, dir);
  for (const [file, content] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.writeFileSync(path.join(root, file), content);
  }
  return root;
}

const read = (root: string, file: string) =>
  fs.existsSync(path.join(root, file)) ? fs.readFileSync(path.join(root, file), 'utf-8') : null;

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'keep-previous-build-'));
});

afterEach(() => {
  fs.rmSync(tmp, { recursive: true, force: true });
});

describe('keepPreviousBuild', () => {
  test("keeps the previous build's static and ORT files the new build lacks, for one deploy", () => {
    const previous = site('previous', {
      'index.html': 'old page',
      'sw.js': 'old worker',
      'static/js/index.old.js': 'old entry',
      'static/js/async/shared.abc.js': 'same in both builds',
      'wasm/1.24.3/ort-wasm-simd-threaded.jsep.wasm': 'old ort',
      // Kept by the deploy before: not this build's own, so it goes now
      'static/js/index.older.js': 'older entry',
      [BUILD_FILES]: JSON.stringify([
        'index.html',
        'sw.js',
        'static/js/index.old.js',
        'static/js/async/shared.abc.js',
        'wasm/1.24.3/ort-wasm-simd-threaded.jsep.wasm',
        BUILD_FILES,
      ]),
    });
    const next = site('next', {
      'index.html': 'new page',
      'sw.js': 'new worker',
      'static/js/index.new.js': 'new entry',
      'static/js/async/shared.abc.js': 'same in both builds',
      'wasm/1.31.1/ort-wasm-simd-threaded.jsep.wasm': 'new ort',
      [BUILD_FILES]: '[]',
    });

    const kept = keepPreviousBuild(previous, next);

    expect(kept.files.sort()).toEqual([
      'static/js/index.old.js',
      'wasm/1.24.3/ort-wasm-simd-threaded.jsep.wasm',
    ]);
    expect(read(next, 'static/js/index.old.js')).toBe('old entry');
    expect(read(next, 'wasm/1.24.3/ort-wasm-simd-threaded.jsep.wasm')).toBe('old ort');
    expect(read(next, 'static/js/index.older.js')).toBe(null);
    // The new build's own files win
    expect(read(next, 'index.html')).toBe('new page');
    expect(read(next, 'sw.js')).toBe('new worker');
    expect(read(next, BUILD_FILES)).toBe('[]');
  });

  test('a site from before build-files.json: its static and wasm folders, flat ORT files included', () => {
    // Stable 0.4.18 at the root, with next/ beside it
    const previous = site('previous', {
      'index.html': 'old page',
      'coi-serviceworker.js': 'old coi',
      CNAME: 'kayago.app',
      'static/js/index.old.js': 'old entry',
      'wasm/ort-wasm-simd-threaded.jsep.wasm': 'ort 1.24.3',
      'wasm/ort-wasm-simd-threaded.jsep.mjs': 'ort 1.24.3 glue',
      'next/static/js/index.next.js': 'next entry',
    });
    const next = site('next', { 'index.html': 'new page' });

    const kept = keepPreviousBuild(previous, next);

    expect(kept.files.sort()).toEqual([
      'static/js/index.old.js',
      'wasm/ort-wasm-simd-threaded.jsep.mjs',
      'wasm/ort-wasm-simd-threaded.jsep.wasm',
    ]);
    // No way back to the previous build's page or its worker
    expect(read(next, 'coi-serviceworker.js')).toBe(null);
    expect(read(next, 'next/static/js/index.next.js')).toBe(null);
    expect(read(next, 'index.html')).toBe('new page');
  });

  test('first deploy: nothing to keep', () => {
    const next = site('next', { 'index.html': 'new page' });
    expect(keepPreviousBuild(path.join(tmp, 'missing'), next)).toEqual({ files: [], bytes: 0 });
    expect(keepPreviousBuild(site('empty', {}), next).files).toEqual([]);
  });

  test('ignores list entries outside the kept folders or that climb out of the site', () => {
    const previous = site('previous', {
      'secret.txt': 'x',
      [BUILD_FILES]: JSON.stringify(['../outside.js', 'static/../secret.txt', 'assets/a.ogg']),
    });
    const next = site('next', {});
    expect(keepPreviousBuild(previous, next).files).toEqual([]);
  });
});
