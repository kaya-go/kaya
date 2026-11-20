---
date: 2026-11-20
status: shipped
scope: ui, navigation
---

# Navigation calls compose within one frame

## Context

`navigation.e2e.ts` › "follows the current node past the nodes the first layout
holds" failed about 40% of local runs: after `End`, the board sat on move 0 of
a 1200-move game. A probe logging every `keydown` showed the cause in the app,
not in the test:

- A loaded game opens on its last move. The test pressed `Home`, then `End`
  4 ms later whenever node 0 was already in view.
- [`useBoardControlsKeyNav`](../packages/ui/src/components/board/useBoardControlsKeyNav.ts)
  defers each navigation to `requestAnimationFrame`, so both ran in the same
  frame, before React rendered.
- [`useGameNavigation`](../packages/ui/src/hooks/game/useGameNavigation.ts)
  reads where it stands from `currentNodeIdRef`, which was only refreshed on
  render. `goToStart` moved to the root, then `goToEnd` walked from the last
  move it still saw, found nothing to do and returned. The batched state ended
  on the root.

A user pressing two navigation keys within one frame lost the second the same
way.

## Decision

Every move made by `useGameNavigation` goes through `moveTo`, which sets
`currentNodeIdRef` at once and then the state. `goBack`, `goForward` and the
sibling moves of [`useBranchNavigation`](../packages/ui/src/hooks/game/useBranchNavigation.ts)
read the current node through `getCurrentNode()`, built from that ref, instead
of a ref refreshed on render. A navigation call therefore starts where the
previous call left off, whether or not React has rendered in between.

Alternative considered: navigate synchronously in the key handler (drop the
`requestAnimationFrame`). React flushes a discrete event's update before the
next one, so the keyboard would compose, but any other caller that batches
moves (gamepad, wheel, code) would keep the bug. The rAF dates from the first
commit with no recorded reason, and it was left alone.

Still render-bound: `switchBranch` and `switchToBranchIndex` read
`branchInfo`, a memo of the rendered node. The keyboard throttles them to one
per 80 ms, so two never land in one frame from the keys.

## Test

`navigation.e2e.ts` › "Home then End within one frame ends on the last move"
dispatches both key events in one task and waits two frames. It fails on the
old code (`Move 0 / 3`) and passes with the fix. The formerly flaky test passed
10 of 10 runs after the fix, against 7 of 12 before.
