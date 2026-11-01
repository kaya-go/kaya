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

Measured with Playwright on the web app, stepping back five moves in a ten-move
game, 53 subscribers, 10 value changes (518 possible subscriber commits):

| Version                               | Subscriber commits | Skipped |
| ------------------------------------- | ------------------ | ------- |
| Store only                            | 484                | 7%      |
| Store + stable callbacks (experiment) | 259                | 50%     |

The store is necessary but not sufficient. Around 60 callbacks in the context
value change identity on every provider render: inline aliases (`goBack`,
`toggleAnalysisMode`, `togglePatternMatching`...), and `useGameNavigation` /
`useGameModification` results that close over state. Any slice holding one
re-renders anyway, and `LibraryProviderWrapper` and `useAppContentState` sit near
the root, so they drag most of the tree with them. The provider also rebuilds the
value twice per navigation.

Follow-up: give those callbacks a stable identity. The experiment wrapped each
function field in a latest-ref proxy; before shipping that, check the effects
that list a callback in their deps, since some may rely on its identity changing.
