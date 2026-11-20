---
date: 2026-11-20
status: shipped
scope: ai/models
---

# Model library: one copy per file, explicit metadata

Uploading the same `.onnx` twice stored it twice. PR #231.

## Context

Every upload created a row `user-<timestamp>-<filename>` and wrote the bytes
again, so a second pick or drop of the same file doubled the storage (up to
280 MB in IndexedDB each time). A downloaded preset had no record of its
content, so uploading that same file later could not match it either.

The library also knew a model only through strings: the precision was parsed
back out of the storage id (`parseModelId`) or guessed from the name
(`quantFromModelName`), and a row's group came from a `baseModelIndex`.

## Decision

- **Content hash.** Uploads and downloads record `hash`, a SHA-256 of the
  bytes as unpadded base64url. An upload whose hash matches a stored row
  selects that row instead of writing again. On desktop the hash is computed
  in Rust while the download moves into the models directory, so the bytes
  never cross into JavaScript. Both sides share two test vectors
  (`modelStorageHash.test.ts`, `commands/upload.rs`).
- **A match needs the bytes.** A row can outlive its bytes (browser eviction,
  a file removed from the models directory). Only a row whose bytes are still
  in IndexedDB or on disk counts as the stored copy, the same test
  `initModelLibrary` uses. Deleting a downloaded catalog model removes its
  stored row, so its hash goes with the bytes.
- **Explicit metadata.** `StoredModelMetadata` carries `name` (the KataGo
  network name, shared by every precision), `quantization` and `displayName`.
  Catalog rows set them in `PREDEFINED_MODELS`; an upload gets them once from
  `parseModelFilename`. `AIModel` and `AIModelEntry` derive from that type.
  The engine is keyed on the row `id`.
- **Catalog and custom models split on `isUserModel`.** Not on `name`: the
  files on Hugging Face, where the upload section points, carry the catalog
  network's name, and the catalog group renders one row per precision, so an
  upload grouped there was not listed at all.
- **Every drop goes through `uploadModel`.** A web drop used to set an
  in-memory model with an empty id; a desktop drop held the bytes in React
  state, never stored and never selected. Both now store, deduplicate and
  select like the settings picker, with a localized toast instead of
  `alert`. `setCustomAIModel` is gone: `customAIModel` is always derived
  from `selectedModelId`.
- **Desktop drop hands over its bytes.** `uploadModel` takes a `ModelUpload`
  (the part of `File` it reads), so the bytes `readFile` returned are hashed
  and stored as they are, not copied into a `File` and back. See
  [2026-06-09](2026-06-09-lazy-model-buffer-native-path.md) for what one
  extra copy of a model costs the WebView.

## Learnings

- The four defects above were caught by `e2e/model-library.e2e.ts`, which
  fails on the first version of the PR. The library had no e2e before.
- A user file keeps its markers in `name` (`net.static-b1.webgpu`), which has
  lost `.onnx`. `isWebGPUOptimized` looked for `.webgpu.` and stopped
  matching; it now accepts the marker at the end.
- Rows saved before this change have no hash, so the first re-upload of such
  a file stores one more copy. Their `name` is the whole filename; the library
  re-parses it when `displayName` is missing.
