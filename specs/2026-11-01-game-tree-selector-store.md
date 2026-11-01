---
date: 2026-11-01
status: shipped
scope: ui/performance
---

# GameTree selectors read an external store

## Context

`useGameTreeSelector` called `useGameTree()` and then filtered. React re-renders
every context consumer when the provider value changes, so the filter only kept
a reference stable: the component still re-rendered on every update.

## Decision

`GameTreeProvider` mounts a stable store (`subscribe` / `getSnapshot`, see
[`gameTreeStore.ts`](../packages/ui/src/contexts/selectors/gameTreeStore.ts))
next to the context. `useGameTreeSelector` reads it through
`useSyncExternalStore` and returns the previous reference when the slice is
`shallowEqual`, so React skips the render. All call sites moved to selectors;
`useGameTree()` stays exported but nothing in the repo calls it.

The snapshot ref is written during render, and listeners fire in a layout
effect, so subscribers catch up before paint. This relies on the provider's
state not updating inside a transition: no `startTransition` touches game state.

## Learnings

The store alone barely helped. Stepping back five moves in a ten-move game (web
app in dev, 53 subscribers, 518 possible subscriber commits), 484 commits still
happened, for three reasons:

- Around 60 callbacks in the context value changed identity on every provider
  render, so any slice holding one re-rendered anyway.
- A few root-level consumers re-rendered and dragged the tree along.
  `useGameInfoEditMode` used `useGameTreeBoard()` only for `gameId`, and it runs in
  `AppContent`. `useHeaderActions` and `AppDropZone` subscribed to `currentBoard`
  for values they only needed in a dialog or a click handler.
- `useScoring` called `setDeadStones(new Set())` on every navigation outside score
  mode, which forced a second provider render each time.

Each `StoneNode` also subscribed to `currentNodeId`, so every visible node
re-rendered on each step.

## Follow-up shipped the same day

- `useGameTreeStore` wraps every function field in a permanent identity that
  forwards to the latest version, and keeps the previous snapshot when only
  callbacks changed. **Selector callbacks no longer change identity**, so an
  effect or memo can't use one as a signal that state changed: select the state.
- `useGameTreeGetter()` reads the latest value in an event handler without
  subscribing.
- `StoneNode` selects a boolean, so a step re-renders the two nodes it affects.
- `CurrentBoardRecognitionDialog` subscribes to the board only while it is open.

An audit of the 11 effects outside the provider's own hooks that list a context
callback in their deps found they only re-register listeners or call it, so none
relies on its identity changing. The two callbacks that return data (`saveSGF`,
`exportSGF`) aren't called during render.

Main thread time per navigation, 300-move game, production web build, from
Chrome's `TaskDuration` over 100 steps:

| Version                        | Total | Script | Total at 4x CPU throttle |
| ------------------------------ | ----- | ------ | ------------------------ |
| Store only                     | 20 ms | 9 ms   | 72 ms                    |
| Stable callbacks               | 16 ms | 5.5 ms | 49 ms                    |
| Stable callbacks + subscribers | 14 ms | 4.5 ms | 41 ms                    |

What re-renders now is what shows the position: board, controls, comment, graph
and analysis. The rest of the 14 ms is style, paint and compositing, which React
changes won't reach.
