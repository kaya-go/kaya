---
date: 2026-05-23
status: shipped
scope: desktop, ci
---

# Linux: model download fix and glibc compatibility

Two reports on the same release surface — issue #103 collected both:

1. **Model download fails on Linux AppImage / .deb** with `forbidden path: $APPDATA/models/katago-latest-fp16.onnx`. The previous fix (commit `73da560`) repaired the streaming download, but a second bug remained downstream.
2. **.deb fails to start with `GLIBC_2.43 not found`** on Debian/Ubuntu/Mint where glibc is older than 2.43.

Both were Linux-only and could not be reproduced from the macOS dev environment, so they were going to keep slipping if we did not fix the structural cause for each.

## The download path

After commit `73da560` the flow was:

1. Rust downloads the model into `/tmp/...` (covered by `fs:allow-temp-write` scope).
2. Rust moves it to `$APPDATA/models/<id>.onnx` (native fs, no scope check).
3. **JS calls `@tauri-apps/plugin-fs#readFile(cacheResult.path)`** to load it into an `ArrayBuffer`.
4. JS writes that `ArrayBuffer` to IndexedDB.

Step 3 is what fails on Linux. Tauri 2's fs plugin treats `$HOME` and `$APPDATA` as distinct scope tokens, even when the resolved path of `$APPDATA` sits literally inside `$HOME`. The capabilities granted `fs:allow-home-read-recursive` but no `fs:allow-app*-read*`, so the JS `readFile` call was rejected with `forbidden path`.

On macOS the same scope rules apply, but `app_data_dir()` returns `~/Library/Application Support/com.kaya.desktop/`, which has no dot-prefixed segment and matched the home scope. On Linux it returns `~/.local/share/com.kaya.desktop/` and the scope refuses it.

### Why not just widen the scope

A one-line fix — add `fs:allow-appdata-read-recursive` to `capabilities/default.json` — would close the bug. But once the file is already on disk via Rust, reading it back into JS just to re-write it into IndexedDB does three things we do not need on Tauri:

- Allocates ~280 MB in the JS heap for a buffer the native engine never consumes (the native engine path uses `onnx_get_cached_model` + `onnx_initialize_from_path`).
- Duplicates the model bytes on disk (IndexedDB SQLite + `$APPDATA/models/`).
- Re-introduces fs-scope as a failure mode for any future packaging target.

### What shipped

A new Rust command `onnx_read_model_bytes(model_id) -> Vec<u8>` reads the cached model directly via native `tokio::fs::read`. The JS `loadModelBuffer` helper in `engineLoader.ts` now tries that command first on Tauri and falls back to IndexedDB:

- Downloaded models: live on disk only on Tauri. `loadModelBuffer` reads from disk.
- User-uploaded models: still in IndexedDB until first engine init (which calls `onnx_finish_upload` to materialize them on disk). `loadModelBuffer` falls back to IndexedDB until then.
- Web users: branch is unchanged. Direct fetch → IndexedDB.

The `useModelLibrary.downloadModel` hook stops calling `@tauri-apps/plugin-fs#readFile` and `saveModelData` on the Tauri branch — it uses `cacheResult.size` for the stored metadata.

Side-effect surface considered:

- **Native engine path** (Tauri / GPU / CPU): unchanged. Reads from disk via `onnx_get_cached_model`.
- **WebGPU / WASM engine on Tauri**: now sources bytes from the new Rust command instead of IndexedDB. Identical bytes, no behaviour change.
- **Cache-miss path** in `tauri-engine.ts`: still uses chunked IPC upload from `modelBuffer`, which `loadModelBuffer` now sources from the new command. No change.
- **Old-version users with IndexedDB-only state**: protected by the IndexedDB fallback in `loadModelBuffer`.
- **Disk usage**: now single-stored on Tauri (in `$APPDATA/models/`) instead of duplicated. Net win.

## The glibc fix

The Linux build runs in `archlinux:base-devel` because the new Tauri AppImage format (`quick-sharun`, currently on the `feat/truly-portable-appimage` branch of tauri-cli) requires Arch Linux. Arch is rolling, so its glibc is on whatever the upstream just shipped — currently 2.43. The .deb and .rpm packages inherit that requirement and break on any distro with an older glibc, which is most of the install base (Ubuntu 22.04 = 2.35, Ubuntu 24.04 = 2.39, LMDE 7 = 2.41).

Options considered:

1. **Drop .deb and .rpm**, ship AppImage only. Simplest. AppImage works on every Linux distro because it ships its own bundled dependencies. But it would be a regression for the rolling-distro users who currently have a working .deb, and removes a packaging promise from the release table.
2. **Split the build** — keep AppImage on Arch (it has to), build .deb/.rpm on Ubuntu 22.04. ~5 min added to CI time, two parallel jobs. No user-facing regression.

We went with (2) because the user-facing "no regression" constraint was explicit.

### What shipped

- `_build-linux-deb.yml`: new reusable workflow. Runs on `ubuntu:22.04` container, installs apt deps (`libwebkit2gtk-4.1-dev`, `libgtk-3-dev`, `librsvg2-dev`, `libasound2-dev`, `rpm`, etc.), uses the stable tauri-cli (no fork needed because we're not producing AppImages here), runs `cargo tauri build --bundles deb,rpm`. Uploads under `desktop-linux-deb` artifact. Emits glibc version probe via `objdump -T` so a regression would be visible in the build logs.
- `_build-linux.yml`: still on Arch, now runs `cargo tauri build --bundles appimage` and uploads only the `appimage/` subdir.
- `release.yml`: gained a `build-linux-deb` job, `commit-and-release` depends on it, and the `softprops/action-gh-release` file list pulls `.deb`/`.rpm` from `desktop-linux-deb/` and `.AppImage`/`.AppImage.sig` from `desktop-linux/`.
- `nightly.yml`: same split, so the .deb path gets exercised weekly instead of only at release time.

Why Ubuntu 22.04 specifically: glibc 2.35 is the oldest LTS we want to chase (20.04 LTS reached EOL April 2025), and it's forward-compatible with Ubuntu 24.04, Mint 22, LMDE 7, Debian 12, Fedora 39+ — every distro the issue reporters were on.

### Cleanup at the same time

The workflow files now use `env:` blocks for `${{ github.event.inputs.version }}` and `${{ inputs.set-version }}` references in `run:` steps instead of inlining them. Not a functional change — closes the workflow-injection vector that the project's superpowers security hook flags. The existing patterns elsewhere are unchanged; this just stops the new files from introducing more.

## Things explicitly not done

- **Read the cached model bytes lazily**. `loadModelBuffer` still loads the full buffer eagerly in `AIEngineContext`, before the backend chain is picked. On the native path the buffer is never consumed; that ~280 MB of JS heap is wasted on Tauri. Worth a follow-up but out of scope here — the native engine still works, the waste is invisible at runtime.
- **Cache user-uploaded models on disk at upload time**. Currently they only land on disk after the first engine init triggers `onnx_finish_upload`. Same trade-off as above — works correctly, just not optimal.
- **Drop `@tauri-apps/plugin-fs` from `packages/ui`**. Still used by `useDropZoneEffects.ts` for SGF drops; removing the `readFile` call in `useModelLibrary.ts` is enough to fix the bug without touching the dependency.

Tracking issue: <https://github.com/kaya-go/kaya/issues/103>
