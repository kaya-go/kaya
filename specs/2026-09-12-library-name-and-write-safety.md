---
date: 2026-09-12
status: shipped
scope: game-library
---

# Library: name handling and write safety

## Context

Three ways the library could lose or mangle a game, all silent.

**Duplicate names left the extension behind.** `makeUniqueName` appended the
counter to the whole name, so saving a second game called `game` produced
`game.sgf (1)`. ZIP export writes the stored name verbatim, and ZIP import kept
entries matching `.endsWith('.sgf')` - which that name does not. The file was
skipped on restore, not counted in `failed`, and no error was recorded. Export
your library, reimport it, and duplicates were gone. `useLibraryFileOps`
already numbered copies correctly (`game (copy).sgf`), so the two conventions
disagreed.

**`ensureSGFExtension` truncated any name containing a dot.** It replaced
everything after the last dot, turning `Lee Sedol vs. AlphaGo` into
`Lee Sedol vs.sgf` and `2024.03.15 game` into `2024.03.sgf`. The `.sgf`
migration in `indexeddb-db-init` appends instead, so the two disagreed too.

**Every mutator did read-modify-write across two transactions.** `updateFile`,
`renameItem`, `moveItem` and `updateFolderCount` called `getItem` on one
transaction and `put` on another, writing the whole record back. An autosave
landing between a rename's read and its write was reverted: the rename wrote
back the game content it had read before the save.

## Decision

Numbering goes before a `.sgf` extension and stays at the end for folders.
`ensureSGFExtension` only replaces a tail that actually looks like an
extension - short, alphanumeric, no spaces - and appends otherwise. ZIP import
also accepts the legacy `name.sgf (n)` spelling and repairs it on the way in
(`normalizeImportedSGFName`), so archives already exported with the old scheme
restore correctly.

Mutators go through one `mutateItem` helper that issues the `get` and the `put`
on the same `readwrite` transaction, so a concurrent write can no longer be
silently reverted.

## Learnings

- Every one of these failed silently. The ZIP importer even had an error
  channel (`failed`, `errors`) and reported nothing, because the entry was
  filtered out before anything could fail.
- Two places already had the right convention - `useLibraryFileOps` for copies,
  `migrateSgfExtensions` for extensions. The bugs were in the shared helpers
  the rest of the code went through.
- Awaiting an `IDBRequest` promise keeps its transaction alive (the
  continuation runs as a microtask), so a get and its put can share one
  transaction. Awaiting anything else in between would close it.
- `packages/game-library` had no tests at all; the pure name helpers now have
  some. Testing the storage layer needs a `fake-indexeddb` dev dependency,
  tracked separately.

## Links

- `packages/game-library/src/utils.ts`
- `packages/game-library/src/indexeddb-storage.ts`
- `packages/game-library/tests/utils.test.ts`
