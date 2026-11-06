---
date: 2026-11-06
status: shipped
scope: ui/ai
---

# Suggest move sends the whole position, and plays it only there

## Context

When live analysis has no suggestion yet, Suggest move asks the engine itself.
Until [#221](https://github.com/kaya-go/kaya/pull/221) it sent only the stones and
the side to play: no move history and no ko ban, both of which live analysis has
always sent. The network reads the last moves as input features, and without the
ko ban the engine can rank a ko recapture that the rules forbid.

Reviewing the change turned up two more problems in the same function:

- **Navigation during the engine call.** The hook checked that the user was still
  on the node only after waiting for live analysis, not after the engine call,
  which takes seconds at high visits. `playMove` plays on whatever node is current
  when it runs, so navigating meanwhile played the old position's move on the new
  node.
- **Rectangular boards.** The request used the game's width × height board, while
  #220 keeps analysis square, sized by height. A row shorter than the row count
  panics the native engine with its lock held.

## Decision

- `buildAnalysisRequest` in `gameCache.ts` builds the request for a node: board,
  history, side to play and ko from one reconstruction, on the square board
  `analysisBoardSize` picks.
- The hook reads the position through `useGameTreeGetter` when a move is asked
  for, and checks after each await that the current node is still the one it read.
- On a rectangular board the engine, which sees a square, also ranks points past
  the real edge. Suggest move calls `analyze` rather than `generateMove` and plays
  the best ranked move that is on the board (`bestMoveOnBoard`).
  - **Alternative: refuse an off-board top move with an error.** Tried first, and
    a real model on a 9:13 board almost always ranked an off-board point first,
    so Suggest move failed every time.
  - **Cost:** on a rectangular board the move is legal but ranked by an engine
    that believes the board is square, so its quality is approximate. Before, the
    native engine panicked and the web build could play off the board.

## Learnings

- Checked on real WebGPU with a real model: the ko point stays empty, nothing is
  played after navigating away mid-search (1500 visits, about 25 s), and a 9:13
  board gets a move on the board. The desktop native path was not run.
- Wide boards such as 13:9 still lose the columns past the height. Live analysis
  has the same limit, and it needs engine support for non-square inputs.
