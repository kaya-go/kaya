/**
 * Writes sw.js into dist/ once the build is complete.
 *
 * sw.js precaches the files of its own build at install, so it needs the
 * final list of what dist/ holds: the bundler's output, index.html, and the
 * public/ files rsbuild copies outside the compilation.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { RsbuildPlugin } from '@rsbuild/core';
import { renderServiceWorker, type ServiceWorkerValues } from './render';

/** Built files the service worker leaves out of its install-time cache. */
function notPrecached(file: string, ortCopies: ReadonlySet<string>): boolean {
  return (
    // The worker itself
    file === 'sw.js' ||
    // The update banner must read the server's
    file === 'version.json' ||
    // ONNX Runtime: about 90 MB, in its own cache, kept across builds
    file.startsWith('wasm/') ||
    file.endsWith('.LICENSE.txt') ||
    file.endsWith('.map') ||
    // The bundler also emits ORT's runtime next to ORT's bundle (30 MB). The
    // engines load ORT from wasm/<version>/ instead (`wasmPaths`), so these
    // copies are never requested.
    ortCopies.has(file)
  );
}

/**
 * What sw.js caches at install: the files the app may ask for, relative to
 * its scope. `files` are paths relative to dist/; `ortCopies` are the
 * bundler's copies of ORT's files among them.
 */
export function selectPrecache(files: string[], ortCopies: ReadonlySet<string>): string[] {
  return files.filter(file => !notPrecached(file, ortCopies)).sort();
}

/** Every file under `dir`, relative to it, with '/' separators. */
function listFiles(dir: string, prefix = ''): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const name = `${prefix}${entry.name}`;
    if (entry.isDirectory()) return listFiles(path.join(dir, entry.name), `${name}/`);
    return entry.isFile() ? [name] : [];
  });
}

export function pluginServiceWorker(options: {
  template: string;
  values: () => Omit<ServiceWorkerValues, 'precache'>;
}): RsbuildPlugin {
  return {
    name: 'kaya:service-worker',
    setup(api) {
      const ortCopies = new Set<string>();
      api.processAssets({ stage: 'report' }, ({ compilation }) => {
        for (const asset of compilation.getAssets()) {
          if (asset.info.sourceFilename?.includes('onnxruntime-web')) ortCopies.add(asset.name);
        }
      });

      api.onAfterBuild(({ environments }) => {
        for (const { distPath } of Object.values(environments)) {
          const files = listFiles(distPath).filter(file => file !== 'sw.js');
          const precache = selectPrecache(files, ortCopies);
          const worker = renderServiceWorker(options.template, { ...options.values(), precache });
          fs.writeFileSync(path.join(distPath, 'sw.js'), worker);
        }
      });
    },
  };
}
