---
date: 2026-11-20
status: shipped
scope: library
---

# Library: a change made before the database opens is listed

## Context

A file or ZIP imported into the library right after the page loaded was stored,
but the tree did not list it. The footer could even count it while the tree
said "Your library is empty". Two e2e tests waited for that message before
importing, to work around it.

There were two causes, in `LibraryContext`:

- **`refresh` returned early while `isInitialized` was false.** Each callback
  keeps the `refresh` of the render it was created in. An import started before
  the library opened therefore kept a `refresh` that did nothing. The storage
  call itself waited for the database, so the import was stored but never read
  back.
- **The startup read raced the import.** It read the items, then read them
  again for the counts (`getStats`). A write between those two reads gave a
  footer that disagreed with the tree. Nothing applied a later read, because
  the import's own refresh had been dropped.

## Decision

The loading state moves into [`useLibraryItems`](../packages/ui/src/contexts/useLibraryItems.ts),
since `LibraryContext` was at 491 of its 500 lines.

- **No guard on `refresh`.** The storage waits for its own initialization, so a
  refresh may start before the library opens. `refresh` now has a stable
  identity, so no callback can keep a dead one.
- **The latest refresh wins.** Each refresh takes a number. Only the latest one
  started applies what it read and clears `isLoading`. A refresh started later
  reads the library after any write made before it, so an earlier refresh that
  resolves later cannot put an older library back.
- **One read per refresh.** The counts come from the same items
  (`computeLibraryStats`, shared with `getStats`), so the footer always matches
  the tree.

## Covered by

`e2e/library.e2e.ts` › "a ZIP imported while the library is still opening lists
every game". It holds the database open back for a second and imports 30 games
first. Before the fix it failed 5 times out of 5; after it, it passed 5 out of 5
along with the rest of the library and SGF content specs (80 runs). The two
waits that worked around the race are gone.
