/**
 * Guards on the desktop Content-Security-Policy (app.security.csp). The policy
 * and the reason for each source are in specs/2026-11-20-desktop-csp.md; these
 * tests keep the properties a quick fix for a violation would break.
 */

import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const conf = JSON.parse(
  readFileSync(join(import.meta.dir, '../src-tauri/tauri.conf.json'), 'utf8')
) as {
  app: {
    security: {
      csp: Record<string, string>;
      dangerousDisableAssetCspModification?: boolean | string[];
    };
  };
};
const security = conf.app.security;
const sources = (directive: string): string[] => security.csp[directive]?.split(/\s+/) ?? [];

describe('desktop CSP', () => {
  test('scripts run only from the bundle, plus WebAssembly compilation', () => {
    // Declared explicitly: on Windows wry appends `script-src <init-script hashes>`
    // when the policy has none, which would drop 'self'.
    expect(sources('script-src').sort()).toEqual(["'self'", "'wasm-unsafe-eval'"]);
  });

  test('the Tauri IPC protocol is reachable', () => {
    // Without it IPC silently falls back to postMessage, raw byte responses included.
    expect(sources('connect-src')).toEqual(
      expect.arrayContaining(['ipc:', 'http://ipc.localhost'])
    );
  });

  test('no directive allows any host or a whole scheme', () => {
    const allowedSchemes = new Set(['ipc:', 'data:', 'blob:']);
    for (const [directive, value] of Object.entries(security.csp)) {
      for (const source of value.split(/\s+/)) {
        const broad =
          source.includes('*') || (/^[a-z]+:$/.test(source) && !allowedSchemes.has(source));
        expect(broad ? `${directive} ${source}` : null).toBeNull();
      }
    }
  });

  test("'unsafe-inline' styles survive Tauri's nonce injection", () => {
    // A nonce in style-src makes browsers ignore 'unsafe-inline', and Tauri adds
    // one as soon as index.html holds a <style>. Board themes inject <style>.
    expect(sources('style-src')).toContain("'unsafe-inline'");
    expect(security.dangerousDisableAssetCspModification).toEqual(['style-src']);
  });
});
