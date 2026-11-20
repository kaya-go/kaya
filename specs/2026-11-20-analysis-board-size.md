---
date: 2026-11-20
status: shipped
scope: ai/analysis
---

# One analysis board size, from the game's dimensions

On a rectangular board, analysis that was computed was never found again, and
part of the board was cut off.

## Context

Analysis runs on a square board: the engines size a board by its row count,
and a row shorter than that panics the native engine. Each caller picked the
side of that square on its own:

- Live and full-game analysis took `currentBoard.signMap.length`, the height.
- The graph and the performance report took `gameInfo.boardSize`, the width.
  On `SZ[9:13]` or `SZ[13:9]` they built another position than the one the
  result was stored under, so they never showed it.
- SGF `KA` save and load replayed the tree by hand, from a board of the width,
  with their own side-to-play rules (a move's colour over `PL`, and a
  comment-only node reset to Black). The analysis written to a file did not
  come back under the key live analysis looks it up by.
- On `SZ[13:9]` the height-sized square cut off the last four columns: their
  stones were dropped from the position the engine saw.

The board display had the same confusion: the marker map was width × width,
and the keyboard cursor wrapped both axes on the height.

## Decision

- **The square covers the board.** `analysisBoardSize` is the longer side. No
  stone is cut off; the engine may rank points past the short edge, which
  callers already skip (`bestMoveOnBoard`, now the heatmap too).
- **Analysis helpers take the game's dimensions, never a size.**
  `reconstructAnalysisState`, `mapAnalysisPath`, `analysisCacheKeyAt` and
  `buildAnalysisRequest` apply `analysisBoardSize` themselves, so a caller
  cannot pick another size and miss the cache.
- **`KA` goes through the position cache.** Save and load rebuild each node's
  position with the same helpers as live analysis. Load builds the game tree
  first and hands it to `onParsed`, so there is no replay over raw SGF nodes.
- **Display maps use the game's own height and width**: markers, heatmap,
  ownership (indexed on the analysis square), and the cursor.

## Learnings

- One invariant test covers every path: for every node of a 9:13 and a 13:9
  game with a branch, a comment-only node and a `PL` node, the key live
  analysis submits equals the key full-game analysis and the graph walk to,
  and `KA` written then read back lands on it (`analysisKeys.test.ts`).
- Scoring and dead-stone estimation still assume a square board; analysis of
  a rectangle evaluates a padded square, so its numbers are approximate. A
  real fix would mask the off-board points in the engine's input.
