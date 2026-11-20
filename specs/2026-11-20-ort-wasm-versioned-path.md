---
date: 2026-11-20
status: shipped
scope: web/pwa, ai
---

# ORT files under `wasm/<version>/`, and a service worker per build

onnxruntime-web was held at 1.24.3 because a bump would have left returning
web users on the old `.wasm`. This change versions the path, makes the copy
step strict and gives `sw.js` new bytes on every build. It then bumps
onnxruntime-web to 1.31.1. Native `ort` 2.0.0-rc.15 downloads ONNX Runtime
1.31.0 (`ms@1.31.0` in its `dist.tsv`), so web and native now share a minor
version.

## Context

`sw.js` served `/wasm/ort-*` cache-first from `kaya-runtime-v4`. That name was
on a fixed keep list, and `sw.js` had the same bytes in every build.

**What a naive bump does.** We served a profile the 1.24.3 build, then on the
same origin served main with only the version bumped to 1.31.1. Analysis kept
working, but it ran the cached 1.24.3 `.wasm` under the 1.31.1 JavaScript. The
two wasm builds log the same warning from different source lines:
`constant_folding.cc:278` in 1.24.3 and `:588` in 1.31.1. The naive run
logged `:278`. This JS and wasm pair happens to work, so the failure is
silent. Returning users would have stayed on the old runtime for good, and any
ABI change between ORT's JS and its wasm would have broken the engine for
exactly the users with a cache.

**The copy step.** `scripts/copy-assets.ts` guessed where ORT was installed.
It ignored a missing source folder, so a build could ship without `/wasm/`. It
never removed old files. It also copied ORT's `ort*.mjs` bundles, 17 MB that
the bundler already inlines.

**Two hostings, two behaviours.** Both were measured with Playwright against
a local static server, once with COOP/COEP headers and once without.

- **With COOP/COEP** (rsbuild preview, or any host that sets the headers):
  `coi-serviceworker` never registers, and `sw.js` is the only worker. Its
  bytes never changed, so it was never installed again and its activate
  cleanup never ran. This is the case the review described.
- **Without COOP/COEP** (GitHub Pages, so kayago.app): `coi-serviceworker` and
  `sw.js` share one scope and replace each other. coi controls the pages, and
  `sw.js` stays `waiting`. Once every tab is closed, `sw.js` activates and
  controls a single page load, then coi registers again and reloads the page.
  In this mode `sw.js` reinstalls and runs its activate step on every cycle,
  but the keep list protected the ORT cache. In our runs the old build never
  cached ORT in this mode, because the engine loads after coi's reload. On
  kayago.app the stale-wasm risk was therefore smaller than in the isolated
  case, but not zero.

## Decision

1. **The path carries the version.** The engines (`onnx-session.ts`,
   `moku-detector.ts`) append `ort.env.versions.web` to the root the app
   passes. That is the version of the ORT JavaScript actually bundled. A new
   ORT means a new URL, so even a worker deployed before this change cannot
   return an old file. This step is what makes the bump safe on its own.
   After a deploy, the old `sw.js` stays in control until every tab is closed,
   because it does not call `skipWaiting`. During that window it misses its
   cache on the new URL and goes to the network.
2. **`scripts/ort-web.ts` owns the copy.**
   - It resolves ORT the way `@kaya/ai-engine` and `@kaya/board-recognition`
     do, and fails if the two disagree.
   - It replaces `apps/{web,desktop}/public/wasm` with `wasm/<version>/`.
   - It copies only the `ort-wasm-simd-threaded*` files, which are the
     runtime files ORT's `exports` map lists.
   - It throws when there is no `.wasm` to copy.

   `copyFiles` no longer swallows errors.

3. **`sw.js` is a template** in `apps/web/sw/`, outside `public/` so the raw
   template is never served. The build fills in `BUILD_ID` (git hash and build
   date) and `ORT_VERSION`, and fails if `public/wasm/<ORT_VERSION>` is
   missing. Every build gives new bytes, so the worker reinstalls and its
   activate cleanup runs.
4. **Cache names carry the scope.** kayago.app/ and kayago.app/next/ share an
   origin, so they share Cache Storage.
   - `kaya|<scope>|app|<build>` holds the shell, fonts, images and sounds, one
     cache per build.
   - `kaya|<scope>|ort|<version>` holds the ORT files and is kept across
     builds until ORT changes.
   - Activate deletes this scope's stale names plus the legacy `kaya-v4` and
     `kaya-runtime-v4`. It deletes nothing else: `kaya-moku-models` (80 MB)
     and the other scope's caches stay.
5. **ORT files of another version go to the network, uncached.** They come
   from a tab opened before an update.
6. **The web "Update now" button is unchanged.** It unregisters the workers
   but leaves Cache Storage alone. With the versioned path it does not need to
   clear anything. A blanket `caches.delete` would drop the Moku model and the
   other scope's caches.
7. **onnxruntime-web is bumped** from `^1.24.3` to `^1.31.1` in both packages.

## Outcome

Real model (kata1-b28c512nbt, fp16 variant) in headless Chrome on an Apple
GPU. All runs are on `rsbuild preview` or the local static server.

| Check                                              | 1.24.3 (main)                           | 1.31.1 (this change)                     |
| -------------------------------------------------- | --------------------------------------- | ---------------------------------------- |
| WebGPU, move 120 of `game-black-19.sgf`, 32 visits | webgpu-gc fp16, 99.9%, +37.1, 1.1–2.0 s | webgpu-gc fp16, 99.9%, +37.1, 1.25–1.5 s |
| WASM fallback (no WebGPU adapter), same position   | wasm fp16, 99.9%, +37.0, 13–15 s        | wasm fp16, 99.9%, +37.0, 9–16 s          |
| Moku on `docs/images/screenshot.jpg`               | 40 stones (B22 W18), 1.5–1.7 s          | 40 stones (B22 W18), 1.6 s               |

**The upgrade path.** A profile ran the old build three times, with ORT cached
by the old worker and a marker entry in `kaya-moku-models`. The same origin
then served this build.

- **With COOP/COEP.**
  - First visit: the old worker was still in control. The new JavaScript asked
    for `/wasm/1.31.1/`, which missed the old cache and came from the network,
    and analysis worked. The new `sw.js` was `waiting`.
  - Next visit: the new worker activated. `kaya-v4` and `kaya-runtime-v4` were
    gone, the Moku marker survived, and ORT was fetched once into
    `kaya|/|ort|1.31.1`.
  - From then on, ORT was served from that cache.
- **Without COOP/COEP.** Same profile setup, then repeated visits, each one
  after closing every tab, on main and on this build. Both alternate between
  two kinds of visit:
  - coi controls the page from the start, with no reload;
  - the waiting `sw.js` activates and controls the first page, then coi
    registers and reloads it once. The console shows two "Reloading page"
    lines, one per `updatefound`, but there is a single navigation.

  Every visit ended on a rendered, cross-origin isolated page with a live
  analysis line, except one kind of visit seen only on main (2 of 6 visits):
  coi's reload was requested and lost, and the page stayed on `sw.js`,
  not isolated. It was not seen on this build (0 of 6), but it looks like a
  race, so this change does not claim to fix it. On this build, the
  activating `sw.js` deleted the legacy caches and kept the Moku marker.

- **An old page under the new worker** (1.24.3 build, after the upgrade): its
  unversioned `/wasm/` requests went to the network uncached, and analysis
  worked.
- **`/next/` next to an old stable on one origin** (`ASSET_PREFIX=/next/`):
  - The first `/next/` visit was still controlled by the stable `/` worker,
    whose scope covers `/next/`. Its own worker activated meanwhile and
    deleted the legacy names, which the stable worker refilled on demand.
  - From the second visit, `/next/sw.js` controlled the page, with
    `kaya|/next/|app|…` and `kaya|/next/|ort|1.31.1`.
  - Analysis worked on every `/next/` visit. The stable `/` build still
    loaded afterwards, under its own worker.

## Learnings

- ORT 1.31.1 still runs WebGPU through JSEP in the bundles Kaya imports. The
  worker caches every file it serves under `wasm/1.31.1/`, and after the
  WebGPU, WASM and Moku runs `kaya|/|ort|1.31.1` held only
  `ort-wasm-simd-threaded.jsep.wasm` and `.jsep.mjs`. The `.mjs` is a real
  request (worker threads), so it has to ship. The other six files are copied
  for builds that never take these paths, as before.
- A mismatched ORT JS and wasm pair can run without an error. Only the wasm's
  own log lines show which version is running.
- The last position of a finished game is terminal. MCTS scores it without
  inference, so 32 "visits" there took 0.5 s on WASM. Check engines on a
  mid-game position.
- The `MEASURED` cells of `pickQuantization` were measured on 1.24.3. This
  change re-checks only WebGPU fp16 and WASM fp16 on an Apple GPU, and both
  are unchanged.
- Until stable ships this change, the old stable `sw.js` deletes every cache
  outside its keep list when it activates. That includes `/next/`'s new
  `kaya|/next/|…` caches, so expect re-downloads, not errors. The new `/next/`
  worker deletes the legacy names, and the old stable worker refills them on
  demand.

## Not done: one worker instead of two

On kayago.app, coi controls almost every page load. `sw.js` therefore caches
little and gives no offline shell, since coi caches nothing. Every other visit
after all tabs are closed reloads once. On main that reload was sometimes lost,
and the session then ran without cross-origin isolation (single-threaded
WASM). A single worker that adds the COOP/COEP headers and caches would fix
offline and remove the race between the two workers.

The risks are three:

- Migrating registrations that already alternate between the two scripts.
- The black screen that two reloading workers caused before (f2c6b7e).
- Browser differences: coi uses `credentialless` outside Chromium.

It is worth doing as its own change, with the upgrade harness used here plus
WebKit and Firefox runs, not folded into an ORT bump.

Done in
[2026-11-20-single-service-worker.md](2026-11-20-single-service-worker.md).
One correction: offline also needed the app's JavaScript in the cache, which
`sw.js` never stored.
