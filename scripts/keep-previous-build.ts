/**
 * Keep the previous web build's lazily loaded files online for one more deploy.
 *
 * A tab opened before a deploy keeps running the previous build. The new
 * service worker takes control of it and drops the previous build's caches,
 * so whatever that tab loads later (ONNX Runtime when it starts the engine or
 * opens board recognition, a lazy chunk, a worker, a texture) has to come from
 * the server. Each deploy replaces the whole site, which used to delete those
 * files: the tab got 404s, and an ORT bump broke its engine.
 *
 * Only content-addressed paths are kept: `static/` (a content hash in every
 * name) and `wasm/` (a folder per ORT version, or ORT files from before
 * versioned folders). A URL the new build serves is never shadowed by an old
 * file, and the previous build's own entry files (index.html, sw.js, the
 * coi-serviceworker.js of releases up to 0.4.18) are not kept, so no page can
 * load the previous build again.
 *
 * The previous build's files are the ones its build-files.json lists, so a
 * file is kept for one deploy only. Sites deployed before that list existed
 * held a single build, so all of their static/ and wasm/ files are its own.
 *
 * Usage: bun scripts/keep-previous-build.ts <previous-site> <new-site>
 */
import fs from 'node:fs';
import path from 'node:path';

/** The list each web build writes at the root of its output (apps/web/sw/plugin.ts). */
export const BUILD_FILES = 'build-files.json';

/** Paths whose content never changes under one URL. */
const KEPT_ROOTS = ['static/', 'wasm/'];

/** Every file under `dir`, relative to `root`, with '/' separators. */
function listFiles(root: string, dir = ''): string[] {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full, { withFileTypes: true }).flatMap(entry => {
    const name = `${dir}${entry.name}`;
    if (entry.isDirectory()) return listFiles(root, `${name}/`);
    return entry.isFile() ? [name] : [];
  });
}

/** The files of the build deployed in `site`. */
export function previousBuildFiles(site: string): string[] {
  const list = path.join(site, BUILD_FILES);
  if (fs.existsSync(list)) return JSON.parse(fs.readFileSync(list, 'utf-8')) as string[];
  return KEPT_ROOTS.flatMap(root => listFiles(site, root));
}

export interface KeepResult {
  files: string[];
  bytes: number;
}

/** Copy into `nextSite` the previous build's files that it does not ship itself. */
export function keepPreviousBuild(previousSite: string, nextSite: string): KeepResult {
  const kept: KeepResult = { files: [], bytes: 0 };
  if (!fs.existsSync(previousSite)) return kept;
  for (const file of previousBuildFiles(previousSite)) {
    if (!KEPT_ROOTS.some(root => file.startsWith(root)) || file.split('/').includes('..')) continue;
    const source = path.join(previousSite, file);
    const target = path.join(nextSite, file);
    if (fs.existsSync(target) || !fs.existsSync(source)) continue;
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(source, target);
    kept.files.push(file);
    kept.bytes += fs.statSync(target).size;
  }
  return kept;
}

if (import.meta.main) {
  const [previousSite, nextSite] = process.argv.slice(2);
  if (!previousSite || !nextSite) {
    console.error('Usage: bun scripts/keep-previous-build.ts <previous-site> <new-site>');
    process.exit(1);
  }
  const { files, bytes } = keepPreviousBuild(previousSite, nextSite);
  console.log(
    `Kept ${files.length} files of the previous build (${(bytes / 1e6).toFixed(1)} MB) for tabs still running it`
  );
}
