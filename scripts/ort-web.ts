/**
 * onnxruntime-web's runtime files: where they come from and where the apps
 * serve them.
 *
 * The apps serve them under `wasm/<version>/`, and the engines ask for the
 * folder of the version they were bundled with (`ort.env.versions.web`). The
 * web service worker caches these files cache-first by URL, so a new version
 * has to mean a new URL: a returning user would otherwise run the new ORT
 * JavaScript against the old `.wasm` still in their cache.
 */
import fs from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

/** Every package that bundles onnxruntime-web. They share one `wasm/<version>/` folder. */
const ORT_CONSUMERS = ['ai-engine', 'board-recognition'];

/**
 * The files ORT fetches at runtime: the `ort-wasm-simd-threaded*` pairs its
 * package `exports` map lists. The `ort*.mjs` bundles next to them are what
 * the app bundler already inlines, so they are not served.
 */
export const ORT_RUNTIME_FILE = /^ort-wasm-simd-threaded(\.[a-z]+)?\.(wasm|mjs)$/;

export interface OrtWeb {
  /** The package's `dist` folder, holding the runtime files. */
  distDir: string;
  version: string;
}

function packageRoot(resolvedEntry: string): string {
  let dir = path.dirname(resolvedEntry);
  while (dir !== path.dirname(dir)) {
    try {
      const pkg = JSON.parse(readFileSync(path.join(dir, 'package.json'), 'utf-8'));
      if (pkg.name === 'onnxruntime-web') return dir;
    } catch {
      // No package.json here, keep walking up
    }
    dir = path.dirname(dir);
  }
  throw new Error(`No onnxruntime-web package.json above ${resolvedEntry}`);
}

/**
 * Resolve onnxruntime-web the way each consuming package does, and require
 * them to agree: if they did not, one engine would ask for a `wasm/<version>/`
 * folder that is not there.
 */
export function resolveOrtWeb(rootDir: string): OrtWeb {
  const found = ORT_CONSUMERS.map(consumer => {
    const require = createRequire(path.join(rootDir, 'packages', consumer, 'package.json'));
    const root = packageRoot(require.resolve('onnxruntime-web'));
    const { version } = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf-8'));
    return { consumer, root, version: version as string };
  });

  const versions = new Set(found.map(f => f.version));
  if (versions.size !== 1) {
    const list = found.map(f => `@kaya/${f.consumer} → ${f.version}`).join(', ');
    throw new Error(
      `Packages resolve different onnxruntime-web versions (${list}). ` +
        'Align their ranges and run `bun install` at the root.'
    );
  }
  return { distDir: path.join(found[0].root, 'dist'), version: found[0].version };
}

/**
 * Replace `destRoot` with `destRoot/<version>/` holding the runtime files.
 * Anything already there goes: a file left from an older ORT would ship in
 * the build and could be served in place of the new one. Throws rather than
 * leave a build without its `.wasm`.
 */
export async function copyOrtRuntime(ort: OrtWeb, destRoot: string): Promise<string[]> {
  const files = (await fs.readdir(ort.distDir)).filter(f => ORT_RUNTIME_FILE.test(f)).sort();
  if (!files.some(f => f.endsWith('.wasm'))) {
    throw new Error(`No onnxruntime-web runtime .wasm found in ${ort.distDir}`);
  }

  await fs.rm(destRoot, { recursive: true, force: true });
  const dest = path.join(destRoot, ort.version);
  await fs.mkdir(dest, { recursive: true });
  for (const file of files) {
    await fs.copyFile(path.join(ort.distDir, file), path.join(dest, file));
  }
  return files;
}
