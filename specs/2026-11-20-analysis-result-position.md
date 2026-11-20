---
date: 2026-11-20
status: shipped
scope: ai/analysis
---

# Analysis results stay with the position they belong to

Suggest move could lock up, or play a stone over another one.

## Context

The analysis on screen (`analysisResult`) is one piece of state shared by every
position. Three paths could leave it holding the result of a position other
than the current one:

- **Analysis switched off mid-search.** The search kept running and its result
  landed on whatever node was current when it finished.
- **Full-game analysis.** When a slice landed, it refreshed the screen through
  the `lookupCachedResult` captured when the run started, so the result shown
  belonged to the node the run started from.
- **Waiting for a search.** Suggest move waited on the current live run. A new
  run replaced that run's promise without settling it, so after a navigation
  the waiter never woke up. The button stayed on "Suggesting..." until reload.

Suggest move read `analysisResult` for its candidates. Combined with the first
two paths, it could take another position's top move. That move is often the
point just played, and `playMove` overwrote the stone, corrupting the game.

## Decision

- **Suggest move asks the queue for the current position**, keyed like every
  request (`buildAnalysisRequest`). It no longer reads the on-screen result.
  When live analysis already searched the position, the cache answers at once,
  so nothing is lost.
- **`bestMoveOnBoard` skips occupied points.** As a last guard, a stone is never
  played over another one.
- **Switching analysis off stops the live run.** `stopLiveAnalysis` makes the
  run stale, cancels its request and releases its waiters.
- **Full-game analysis refreshes through a ref** to the latest
  `lookupCachedResult`.
- **A new live run settles the waiters of the run it replaces.**
  - On the same node (settings changed, tree edited), they wait for the new run.
  - On another node, they are released and find they moved away.
- **Engine start failure ends a pending suggestion.** A suggestion asked while
  the engine was starting is dropped if the engine fails, or if the user has
  left the node by the time it is ready.

## Learnings

- A result needs the position it answers. The queue's cache key is that
  identity; display state built from it has none, so consumers that act on a
  position read through the queue.
- Checked with the real model in Chrome (WebGPU):
  - Suggest plays one legal stone.
  - A suggest asked during a 3000-visit search, followed by an arrow key, frees
    the button within a second. Chaining the waiter across nodes took 60 s.
