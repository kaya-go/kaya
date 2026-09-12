---
date: 2026-09-12
status: shipped
scope: ai/models
---

# Desktop model library reads the disk cache, not IndexedDB

A model downloaded on the desktop app showed up as not-downloaded after a
restart, with the file still sitting in the models directory.

## Context

[#123](https://github.com/kaya-go/kaya/issues/123), reproduced on Linux
(AppImage) and Windows: download the recommended model, analyse, quit,
reopen — the AI settings offer to download it again.

Two places decide where a model lives, and they disagreed:

- `downloadModel` on Tauri streams to a temp file in Rust and calls
  `onnx_cache_downloaded_file`, which moves it to
  `<app_data>/models/<id>.onnx`. It deliberately skips the IndexedDB mirror
  (re-reading `$APPDATA` through `plugin-fs` is rejected on Linux, #103), so
  it writes metadata to the `model_metadata` store but no bytes to the
  `models` store.
- `initModelLibrary` derived `isDownloaded` from `getStoredModelIds()` —
  the key list of that same (empty) `models` store.

So on desktop `isDownloaded` was false for everything on every start. The
engine side was never broken: `loadModelBuffer` and
`getTauriCachedModelPath` both go to disk first. Only the library listing
was asking the wrong source.

## Decision

Make the disk cache the source of truth on desktop, matching the loader.

- New command `onnx_list_cached_models` returns every `*.onnx` in the models
  directory with its size and mtime (empty list when the directory does not
  exist yet).
- `initModelLibrary` merges that listing in: a model counts as downloaded if
  IndexedDB has its bytes **or** the disk has its file, and size/date fall
  back to the file's when metadata is missing.
- Files on disk that no library entry claims are surfaced as user models
  named after their cache ID. This is the "IndexedDB wiped, bytes intact"
  case; the cache ID is lossy (`modelCacheIdFromStorageId` folds anything
  outside `[A-Za-z0-9-_]` to `_`) so the original filename cannot be
  recovered, but the model stays usable instead of invisible.
- The listing failing (older binary without the command) degrades to the
  previous IndexedDB-only behaviour rather than emptying the library.

Two ID bugs on the way: `downloadModel` inlined its own copy of the
sanitizing regex, and `deleteModel` passed the raw storage ID to
`onnx_delete_cached_model`, so deleting a model whose ID contains a `.`
(every user upload, `user-<ts>-<file>.onnx`) left the file on disk. Both now
call `modelCacheIdFromStorageId`, the one helper the loader already used.

## Learnings

- The bug was not in either storage layer but in one reader picking a
  different one from every other reader. Worth asking, whenever a value has
  two homes, which one every call site actually consults.
- `getStoredModelIds()` returning `[]` is indistinguishable from "nothing
  downloaded", which is why this survived so long: no error, no warning,
  just a download button.

## Links

- Issue: [kaya-go/kaya#123](https://github.com/kaya-go/kaya/issues/123)
- [Linux: model download fix and glibc compatibility](2026-05-23-linux-model-download-and-glibc.md) — why the Tauri path bypasses IndexedDB
- [Skip the eager JS-heap model copy on the native desktop path](2026-06-09-lazy-model-buffer-native-path.md)
