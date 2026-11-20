/**
 * The oldest macOS the desktop app installs on. Two things set the floor:
 * - The ONNX Runtime static library that `ort` links in is built for macOS
 *   13.4 (`otool -l` on `libonnxruntime.a` reads `minos 13.4`).
 * - The Content-Security-Policy needs 'wasm-unsafe-eval' for the scoring WASM,
 *   and WebKit only knows it from Safari 16 (macOS 13).
 * See specs/2026-11-20-prerelease-ui-review.md.
 */

import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const conf = JSON.parse(
  readFileSync(join(import.meta.dir, '../src-tauri/tauri.conf.json'), 'utf8')
) as { bundle: { macOS?: { minimumSystemVersion?: string } } };

test('the macOS bundle declares the version ONNX Runtime was built for', () => {
  expect(conf.bundle.macOS?.minimumSystemVersion).toBe('13.4');
});
