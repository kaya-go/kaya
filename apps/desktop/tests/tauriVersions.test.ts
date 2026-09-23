/**
 * The JS half of a Tauri plugin calls commands by name, and a minor release
 * can rename them: tauri-plugin-dialog 2.7 folded `ask` and `confirm` into
 * `message`. Dependabot bumps Cargo and npm in separate PRs, so the Rust crate
 * reached 2.7 while @tauri-apps/plugin-dialog stayed on 2.6, and every `ask()`
 * in the desktop app failed with "Command not found" — including the updater's
 * restart prompt, which left the dialog spinning after a good install.
 *
 * Keep each pair on the same major.minor.
 */

import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dir, '../../..');

function rustVersions(): Map<string, string> {
  const lock = readFileSync(join(root, 'apps/desktop/src-tauri/Cargo.lock'), 'utf8');
  const versions = new Map<string, string>();
  for (const [, name, version] of lock.matchAll(/^name = "([^"]+)"\nversion = "([^"]+)"/gm)) {
    versions.set(name, version);
  }
  return versions;
}

function jsVersions(): Map<string, string> {
  const lock = readFileSync(join(root, 'bun.lock'), 'utf8');
  const versions = new Map<string, string>();
  // Top-level entries only; nested copies look like "@tauri-apps/x/@tauri-apps/api".
  for (const [, name, version] of lock.matchAll(
    /^ {4}"(@tauri-apps\/[a-z-]+)": \["@tauri-apps\/[a-z-]+@([^"]+)"/gm
  )) {
    versions.set(name, version);
  }
  return versions;
}

function crateFor(jsPackage: string): string | null {
  if (jsPackage === '@tauri-apps/api') return 'tauri';
  const plugin = jsPackage.match(/^@tauri-apps\/plugin-(.+)$/);
  return plugin ? `tauri-plugin-${plugin[1]}` : null;
}

const majorMinor = (version: string) => version.split('.').slice(0, 2).join('.');

describe('Tauri JS packages match their Rust crates', () => {
  const rust = rustVersions();
  const pairs = [...jsVersions()]
    .map(([pkg, version]) => ({ pkg, version, crate: crateFor(pkg) }))
    .filter(({ crate }) => crate !== null && rust.has(crate));

  test('finds the pairs to compare', () => {
    expect(pairs.map(p => p.pkg)).toContain('@tauri-apps/plugin-dialog');
    expect(pairs.map(p => p.pkg)).toContain('@tauri-apps/api');
  });

  for (const { pkg, version, crate } of pairs) {
    test(`${pkg} and ${crate}`, () => {
      const rustVersion = rust.get(crate!)!;
      expect(
        `${pkg}@${majorMinor(version)}`,
        `${pkg} ${version} vs ${crate} ${rustVersion}: bump them together`
      ).toBe(`${pkg}@${majorMinor(rustVersion)}`);
    });
  }
});
