---
date: 2026-11-05
status: shipped
scope: ui/performance
---

# One position cache, valid for one tree

## Context

Board navigation and AI analysis both rebuild the position at a node. Navigation
went through `reconstructBoard` and its board cache. Analysis had its own
`createInitialAnalysisState` + `updateAnalysisState` loop in five places, so it
replayed the same moves and could drift from what the board shows.
[#220](https://github.com/kaya-go/kaya/pull/220) merges them into one LRU cache of
`AnalysisState`.

Reviewing it showed the old cache had been dead for two months.
[#164](https://github.com/kaya-go/kaya/pull/164) added the height to the read key
(`${id}-${w}x${h}`) but not to the write key (`${id}-${w}`), so every lookup missed
and every navigation replayed from the root. Nobody noticed because a full replay
of a 250-move game takes about 1ms, not the 50-200ms `docs/PERFORMANCE.md` claimed.

A working cache then exposed what the dead one hid: nothing invalidated it on
undo, on redo or on a game info edit. Undoing a setup stone left the stone on the
board and in the analysis input, and a handicap edit left the wrong player to
move at the root.

## Decision

Entries hold for one `GameTree` instance, and reading with any other tree clears
the cache. Trees are immutable and keep node ids across mutations, so this covers
undo, redo, edits and any future writer, and the scattered `boardCache.clear()`
calls went away. `mapAnalysisPath` takes the tree for the same reason.

- **Alternative: add the missing clears.** Three more lines, and the next writer
  that forgets gets a silently wrong board. The bug this replaces is exactly that.
- **Cost:** after any edit, including a played move or a comment, the next read
  replays from the root, about 1ms. Navigation, where the hits are, is unaffected.
  This is what every read cost before.

Analysis stays square, sized by `signMap.length`, even on a rectangular board.
Engines take the size from the number of rows, so a width below the height would
index past the end of a row in native featurization. That panic happens while the
`ENGINE` lock is held, which poisons it and leaves analysis dead until a restart.

## Learnings

- A cache that never hits looks exactly like a cache that works, as long as a miss
  is fast. `tests/gameCache.test.ts` now asserts that a second read returns the same
  object.
- Analysis on a rectangular board is still wrong: it is run on a square one. Doing
  it properly needs engine support for non-square inputs.
