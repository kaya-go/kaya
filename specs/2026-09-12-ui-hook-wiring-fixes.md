---
date: 2026-09-12
status: shipped
scope: ui/state
---

# Three hook-wiring bugs: stale guard, effect churn, layout thrash

## Context

A code-review sweep turned up three separate mis-wirings in `packages/ui`
(issues #153, #154, #160). All three are the same family as
[dependency-array drift](2026-09-12-dependency-array-drift.md): the repo has no
ESLint, so nothing flags a render-scope value read after an `await` or an
effect dependency that changes every render.

**#153 — the AI suggest-move race guard could never fire.** `gameboard-hooks.ts`
snapshotted `const nodeBefore = currentNode`, awaited the in-flight analysis,
then compared `currentNode !== nodeBefore`. Both sides read the same captured
binding, so the comparison was always `false`: navigating away while the
analysis resolved played the AI's move onto whatever node you had moved to.

**#154 — gamepad sticks died under load.** `BoardNavigationContext` passes
`onStateChange` as an inline arrow in an object literal, and `useGameController`
listed it as an effect dependency. `BoardNavigationProvider` consumes the whole
`useGameTree()`, so the effect re-ran on every render — roughly every 80ms while
navigating — and each run cleared and recreated the 150ms left/right-stick
`setInterval`s, which therefore never fired. Each run also re-registered
`gameControl.on('connect', …)`.

**#160 — `OverflowMenu` re-measured on every parent render.** `pinned` was an
array literal at both call sites, so `computeOverflow` had a new identity every
render; the layout effect then forced a synchronous layout (`scrollWidth` on
every child) and unconditionally called `setHiddenIds(new Set(...))`, committing
another render, while the `ResizeObserver` was disconnected and recreated in the
same pass. `computeOverflow` also read `items` without depending on it.

## Decision

Issue #153 mirrors `currentNode` into a ref updated by an effect and compares
`currentNodeRef.current` after the await — the same pattern the file already
uses for `isAnalyzing` and `analysisResult`.

Issue #154 keeps `onStateChange` in a ref so it is never a dependency; the effect's
deps are now `[enabled, isControllerActive]`. `isControllerActive` stays a
dependency deliberately: it only changes when a controller connects,
disconnects or is toggled, and that re-run is what calls `setupGamepad` for a
newly plugged-in pad. The cleanup now calls `gameControl.off('connect')`.

Issue #160 hoists both `pinned` arrays to module constants (plus a stable default for
an omitted prop), adds `items` to `computeOverflow`'s deps, and bails out of
`setHiddenIds` when the computed set has the same contents as the current one.
Fixing `pinned` alone is not enough, because `items` was rebuilt every render
too: `GameBoard` passed `onToggleNextMove` as an inline arrow, so the action
bar's `items` memo was invalidated on every render. It is now a `useCallback`
with a functional update. `HeaderFileControls`' items memo depends on
`isDirty`, which changes when the game is edited rather than on every render,
so it needs nothing.

## Learnings

- `gamecontroller.js`'s `on()` is single-slot — `case 'connect': this.onConnect = e`
  — and both `useGameController` and `GameControllerManager` register on it.
  Whoever registers last owns it. `off('connect')` in the cleanup stops the
  handler outliving its effect, but it does not arbitrate that shared slot;
  a real fix needs one owner or a fan-out registry.
- Fixing `pinned` alone is not sufficient for #160, and the measurement is the
  proof: instrumenting `scrollWidth` reads on `[data-overflow-id]` children
  showed the measurement pass still running on every render afterwards, because
  `items` was unstable as well. A memoized array whose dependency list contains
  an inline arrow from the parent is not memoized at all — the arrow has to be
  stabilised at the call site. Both were fixed; the instrumentation was not
  re-run afterwards, so what is verified is that neither `pinned` nor `items`
  still changes identity on an unrelated render, not a measured count.
- `e2e/gamepad.e2e.ts` pins #154 by serving a counting stub in place of the
  vendored `gamecontroller.min.js` and asserting the `connect` registration
  count does not grow while moves are played. It fails on the old code
  (6 → 20 registrations) and holds at 2 with the fix. #153 needs a loaded AI
  engine and #160 has no assertable signal yet, so neither has an e2e test.

## Links

- `packages/ui/src/components/board/gameboard-hooks.ts`
- `packages/ui/src/useGameController.ts`
- `packages/ui/src/components/ui/OverflowMenu.tsx`
- `e2e/gamepad.e2e.ts`
