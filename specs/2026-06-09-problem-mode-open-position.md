---
date: 2026-06-09
status: shipped
scope: ui/study
---

# Problem mode — open SGFs at the start instead of the solution

## Context

[#113](https://github.com/kaya-go/kaya/issues/113): users batch-import tsumego
(zip/folder of SGFs) and step through them from the library. Single-problem
files opened **at the last move of the main line**, so the solution was visible
before the user could attempt the problem.

The open position is chosen by a heuristic in `useGameTreeState` (duplicated in
both `loadSGF` and `loadSGFAsync`):

1. Problem **collection** (many root children, no root move) → first problem.
2. Joseki/marker file (markers or many variations at root) → root.
3. Everything else (a linear main line) → walk to the **end** of the line.

A single tsumego usually has no root markers and one solution line, so it falls
into case 3 and reveals the answer. The heuristic can't reliably tell "a quiet
game record" from "one problem," so the fix is to let the user override it.

## Decision

- Added a `problemMode` boolean to `GameSettings` (off by default), persisted
  via the existing `kaya-game-settings` localStorage path. Surfaced as a
  **Problem Mode** toggle in the Settings → Game tab.
- Extracted the duplicated heuristic into `hooks/game/determineStartNode.ts`.
  The only behavior change: in problem mode, case 3 stays at the **root**
  instead of walking to the end. Collections and marker files are untouched —
  they already open before any solution moves.
- The loader reads the current setting via `loadGameSettings()` (now exported)
  at load time rather than threading it through the hook graph, keeping
  `loadSGF`/`loadSGFAsync` self-contained and free of stale-closure risk.

Framed as "Problem mode" (per the issue) rather than a generic
start/end/auto selector, leaving room to attach other study-friendly behaviors
to the same switch later.

## Outcome

Turning on Problem Mode opens single problems at the starting position; the
solution stays hidden until the user plays it out. Default behavior (finished
games open at the last move) is unchanged.

## Links

- Issue: https://github.com/kaya-go/kaya/issues/113
