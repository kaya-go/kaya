---
date: 2026-11-10
status: shipped
scope: ui/sgf, library
---

# SGF / ZIP load errors: capture and toast surface

## Problem

Four ways to load a file into Kaya used to disagree on whether and how failures were shown:

| Entry                                              | Accepts                       | Before                                                                              |
| -------------------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| Header → Open                                      | SGF (into the editor)         | Worked, but failed with a hard-coded English `alert`                                |
| Library panel drag-drop                            | SGF or ZIP (into the library) | **No user-visible error at all** (see below)                                        |
| Library panel toolbar import (upload icon)         | SGF or ZIP (into the library) | Same silent path as drag-drop (`handleFileChange` → same catch / unread ZIP result) |
| AppDropZone board drop (incl. Tauri drop-on-board) | SGF (into the editor)         | Had an error path, but not the same i18n toast as the others                        |

Library panel was the worst gap (both drop and the toolbar import button): import looked successful while nothing was stored. That included:

- invalid / truncated / prose “SGF” (`createFile` threw; the UI `catch` was empty)
- a ZIP that is not a zip / cannot be read
- a ZIP whose folders fail to create
- a ZIP that contains bad `.sgf` entries (import counted `failed` / filled `errors`, but the UI never read the result)

So users had no way to tell a bad file from a successful import. That made a shared, localized toast path necessary—not only for editor open/drop.

All four now surface failures with **toast + i18n**. Library drop and toolbar import share `importLibraryFiles` (same toast helpers as ZIP).

## Decision — how errors are captured and shown

### 1. Capture (where the failure is thrown)

- **SGF parse / game-tree gate** — `@kaya/game-library` `validateSGF` (used by `createFile` / `updateFile`). The `@kaya/sgf` `parse` stays lenient; the `(;` gate and empty-tree check live only in `validateSGF`. Failures throw `SgfValidationError` (parser errors are wrapped with `cause`).
- **Editor load** — `loadSGFAsync` applies the same gate + parse wrap, then `reject`s so callers can toast. Prefer `loadSGFAsync` over sync `loadSGF` (sync still swallows into a last-resort `alert`).
- **ZIP import** — `importZipToStorage` does not stringify errors. It appends structured `ImportError` values to `ImportResult.errors`:
  - `kind: 'sgf'` — one ZIP entry failed `createFile` (often `SgfValidationError`; path kept)
  - `kind: 'folder'` — folder create failed
  - `kind: 'zip'` — archive could not be read / opened

### 2. Classify → format → toast (UI)

Helpers in `packages/ui/src/utils/sgfAnalysis.ts`:

| Class                                | How recognized                                       | Formatter                                                                 | i18n                            |
| ------------------------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------- |
| SGF parse / invalid content          | `isSgfValidationError(error)` (or editor load catch) | `formatSgfLoadError` → `invalidSgfContent` (+ parser detail when present) | `toast.invalidSgfContent`       |
| ZIP structural                       | `ImportError.kind === 'folder' \| 'zip'`             | `formatZipImportError` / `formatImportResultError`                        | `toast.failedToImportZip`       |
| Other (DB, IO, non-SGF `createFile`) | not an `SgfValidationError`                          | `formatLibraryFileImportError`                                            | `toast.failedToImportToLibrary` |

Entry wiring:

- Header Open / AppDropZone board drop → `loadSGFAsync` → `formatSgfLoadError` → `showToast(..., 'error')`
- Library drop / picker / Tauri drop-on-library → `formatLibraryFileImportError` (single `.sgf`) or `formatImportResultError` (`.zip`) → toast
- Library drop + picker share `importLibraryFiles(files, parentId)`

## Alternatives considered

- Putting the `(;` check inside `parse` — rejected; would change semantics for every consumer.
- Keeping `errors: string[]` and sharing message prefixes — rejected; brittle across packages.
