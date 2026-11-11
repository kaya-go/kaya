---
date: 2026-11-10
status: shipped
scope: sgf, ui, library
---

# SGF / ZIP load errors: capture and toast surface

## Problem

Five ways to load a file into Kaya disagreed on whether and how a failure was shown:

| Entry                                              | Accepts                       | Before                                                                              |
| -------------------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| Header → Open                                      | SGF (into the editor)         | Worked, but failed with a hard-coded English `alert`                                |
| Library panel drag-drop                            | SGF or ZIP (into the library) | **No user-visible error at all** (see below)                                        |
| Library panel toolbar import (upload icon)         | SGF or ZIP (into the library) | Same silent path as drag-drop (`handleFileChange` → same catch / unread ZIP result) |
| AppDropZone board drop (incl. Tauri drop-on-board) | SGF (into the editor)         | An English `alert`                                                                  |
| Phone landing page → Open SGF File                 | SGF (into the editor)         | Its own loader in each app: no error, the bad file's name set, the board opened     |

Library panel was the worst gap (both drop and the toolbar import button): import looked successful while nothing was stored. That included:

- invalid / truncated / prose “SGF” (`createFile` threw; the UI `catch` was empty)
- a ZIP that is not a zip / cannot be read
- a ZIP whose folders fail to create
- a ZIP that contains bad `.sgf` entries (import counted `failed` / filled `errors`, but the UI never read the result)

So users had no way to tell a bad file from a successful import.

Three more things made a failure worse than it had to be:

- The editor parsed leniently, so a text file renamed `.sgf` opened as an empty game and replaced the current one.
- `loadSGFAsync` cleared the analysis cache and the undo history **before** parsing, so a refused file still cost the current game both.
- Toasts were rendered by the header. With the header hidden, or on the landing page, a toast was raised and never shown.

## Decision

### 1. One strict parse, in `@kaya/sgf`

`parse` stays lenient (prose becomes a node, an empty string no tree). [`parseStrict`](../packages/sgf/src/validation.ts) is the entry point for content that must be a game: it requires the `(;` start and at least one node, and throws `SgfValidationError` — a parser error is wrapped, its message kept, the original as `cause`. Callers branch on `isSgfValidationError`, never on message text.

Both loaders use it:

- **Library** — `validateSGF` in `@kaya/game-library` (called by `createFile` / `updateFile`) is `parseStrict`.
- **Editor** — `loadSGFAsync` in `useGameTreeState`. The sync `loadSGF` had no caller left and is gone, with its `alert`.

### 2. A file that fails costs the current game nothing

`loadSGFAsync` parses and builds the tree first, then commits. What must be replaced along with the tree (analysis cache, undo history, analysis read from the file's `KA`) is passed as an `onParsed` callback that runs just before the commit, so it never runs for a refused file. It also receives the parsed root: the content is parsed once, where it used to be parsed twice whenever `saveAnalysisToSgf` was on.

### 3. ZIP import reports structured errors

`importZipToStorage` no longer builds English strings. `ImportResult.errors` holds `ImportError` values:

- `kind: 'sgf'` — one entry failed `createFile` (often `SgfValidationError`; path kept)
- `kind: 'folder'` — folder create failed
- `kind: 'zip'` — archive could not be read / opened

### 4. Classify → format → toast (UI)

Helpers in [`packages/ui/src/utils/sgfLoadErrors.ts`](../packages/ui/src/utils/sgfLoadErrors.ts):

| Class                                | How recognized                           | Formatter                                          | i18n                                                                                 |
| ------------------------------------ | ---------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Content refused                      | `isSgfValidationError(error)`            | `formatSgfLoadError`                               | `toast.invalidSgfContent`, or `toast.invalidSgfContentDetail` with the parser detail |
| Any other editor load failure        | not an `SgfValidationError`              | `formatSgfLoadError`                               | `toast.failedToLoadSgf`                                                              |
| ZIP structural                       | `ImportError.kind === 'folder' \| 'zip'` | `formatZipImportError` / `formatImportResultError` | `toast.failedToImportZip`                                                            |
| Other (DB, IO, non-SGF `createFile`) | not an `SgfValidationError`              | `formatLibraryFileImportError`                     | `toast.failedToImportToLibrary`                                                      |

A read or storage failure is not called invalid SGF: the label says what failed. A ZIP import names its first failure and counts the others (`(+2)`).

Entry wiring:

- Header Open / AppDropZone board drop / landing page Open → `loadSGFAsync` → `formatSgfLoadError` → `showToast(..., 'error')`. The landing page calls AppDropZone's loader instead of a copy in each app, so it also checks for unsaved changes and moves to the board only once the game is in.
- Library drop / picker / Tauri drop-on-library → `formatLibraryFileImportError` (single `.sgf`) or `formatImportResultError` (`.zip`) → toast
- Library drop + picker share `importLibraryFiles(files, parentId)`
- Paste (header button, Ctrl+V) → the same SGF toast when the pasted text is refused
- Opening a library file → `useOpenLibraryFile`. The library required a game tree only from 2026-09-12 (#169), so an older library can hold a file the editor now refuses. `openFile` awaits the editor and marks the file as open only once it is in; before, the refused file's name and "open" marker would have been put on the game still on the board.

### 5. Toasts render from `ToastProvider`

The container moved from the header into the provider, so a toast shows wherever one can be raised.

## Alternatives considered

- Putting the `(;` check inside `parse` — rejected; would change semantics for every consumer.
- Keeping `errors: string[]` and sharing message prefixes — rejected; brittle across packages.
- Keeping the validation in `@kaya/game-library` — rejected; the editor's loader would import the storage package to parse, and the gate was written three times.
- Validating up front with a second parse before clearing the caches — rejected; the callback gives the same guarantee with one parse.

## Covered by

`packages/sgf/tests/sgf.test.ts` (`parseStrict`), `packages/ui/tests/sgfLoadErrors.test.ts` (formatters, locale keys), `e2e/sgf-load-errors.e2e.ts` (header Open, library import, paste, landing page, undo history kept after a refused file).
