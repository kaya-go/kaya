---
date: 2026-11-08
status: shipped
scope: ui/game-tree
---

# Unify UI `currentPlayer` with analysis `nextToPlay`

## Context

Side-to-play was computed by two independent algorithms. They agreed on a plain alternating game and diverged on property order, fallback, and state.

**Position cache** (`updateAnalysisState`, folded into `AnalysisState.nextToPlay` by `reconstructPosition`): a fold over the root-to-node path. Per node, in order:

1. `PL[0] === 'B' | 'W'` → that color (after this change; previously `data.PL` truthy then `as 'B'|'W'`, so `PL[]` stored `undefined`)
2. else `B` → `'W'`, `W` → `'B'`
3. else `index === 0`: `HA` parsed ≥ 2 → `'W'`, else `'B'`
4. else keep the previous node's `nextToPlay`

No `moveNumber`. A comment or marker node does not change the seat.

**UI** (`useGameBoardState`, `BoardControls`, `EditToolbar`; `BoardNavigationContext` was parity-only): stateless, current node only:

1. `B` → White (`-1`), `W` → Black (`1`) — **before** `PL`
2. else `PL[0]` truthy: `'W'` → White, any other string → Black
3. else `gameInfo.handicap ≥ 2`: `moveNumber % 2 === 0` → White, else Black
4. else `moveNumber % 2 === 0` → Black, else White

`moveNumber` is `getPathToNode(...).filter(isNodeStep).length`. `isNodeStep` is `B`/`W`, plus non-root `AB`/`AW`/`AE`.

Differences:

|                       | Cache `nextToPlay`                                          | UI `currentPlayer`                                                                    |
| --------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `PL` vs `B`/`W`       | `PL` first. A node with both uses `PL`, not the move color. | `B`/`W` first. `PL` is ignored whenever a move is present.                            |
| Scope                 | Path fold; non-move nodes inherit.                          | Current node + a global counter. Ancestors are not consulted except via `moveNumber`. |
| Fallback              | Previous color. Root-only `HA` on the node.                 | `moveNumber % 2`, with `gameInfo.handicap` (not the node `HA`) flipping the phase.    |
| `PL` values           | Only `'B'`/`'W'`. Other / empty ignored.                    | Any truthy `PL[0]` other than `'W'` is Black.                                         |
| What counts as a turn | Only `B`/`W` flip the seat (setup does not).                | Non-root setup increments `moveNumber`, so parity can flip with no color change.      |

`moveNumber` parity is correct only while step count ≡ strict alternation from the root rule. It is wrong after a mid-tree `PL` (the next comment node re-derives from the counter and can undo `PL`) and after a non-root setup (step increments, seat must not). The reversed `PL`/`B`/`W` order disagrees on a node that carries both. Cache replay is the value already stored in analysis cache keys, so the UI copy was the one to delete — not a `moveNumber` term to add inside `updateAnalysisState`.

## Decision

SSOT is the path fold. `useBoardState` calls `reconstructPosition` (same call that yields the board) and sets `currentPlayer = nextToPlayToSign(nextToPlay)` (`'B'→1`, `'W'→-1`). That field is on `GameTreeContext` / `useGameTreeBoard`. The four UI copies are gone.

`updateAnalysisState` priority is unchanged except the `PL` guard: only `PL[0] === 'B' | 'W'` assigns; anything else falls through to move color, root `HA`, or inherit. Final order:

```
PL ∈ {B,W}  >  B→W / W→B  >  (index === 0 ? HA≥2→W : B)  >  inherit
```

Edit-tool color (`lastPlacedColor`, black/white/alternate) is not this value.
