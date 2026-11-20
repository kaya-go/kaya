---
date: 2026-11-20
status: shipped
scope: e2e/library
---

# Library drag e2e: hold until the drop hover lands

## Context

`e2e/library.e2e.ts` › "moving the open file into a name collision updates the
header" still failed after [the September fix](2026-09-24-library-drag-e2e-flake.md):
1 run in 10 on `main`, 9 in 30 in a loop of its first drag. The file never
reached the folder. `holdOverFolder` had seen the folder highlighted, yet
Chrome's release ended with `dragend` (`dropEffect: none`) and no `drop`.

A trace that read react-arborist's `TreeApi` at every `dragover` showed why. At
release, the applied hover, which drives the highlight, was the folder. But a
newer hover was still pending, and it pointed at the root, between the two
rows. The drop guard (`canDrop()`) reads the pending hover first, so it refused.

That pending hover comes from the pipeline's lag:

1. react-dnd hovers at most once per animation frame. It hovers with the
   client offset of the previous hover, because dnd-core calls `target.hover`
   before it stores the new offset.
2. react-arborist applies the hover one frame after that.

One `dragover` plus one frame at the folder therefore left a hover computed from
a point on the way, waiting behind a highlight drawn by an older one.

## Decision

The fix stays in the test, like the September one. `holdOverFolder` now:

- sends a `dragover` at the drop point;
- waits two frames, one for react-dnd's hover and one for react-arborist's
  apply;
- repeats until two in a row leave the folder highlighted.

The second of those hovers was computed at the drop point, so the guard and the
highlight agree when the pointer is released.

Measured on that drag:

| Loop                                   | Old hold       | New hold        |
| -------------------------------------- | -------------- | --------------- |
| First drag of the collision test alone | 9 failed of 30 | 0 failed of 30  |
| Collision test                         | 1 failed of 10 | 0 failed of 40  |
| Whole library spec (12 tests)          | not measured   | 0 failed of 120 |

No app change. A browser keeps firing `dragover` while a pointer rests, so the
hover catches up within a few frames. A human releases long after that.
Playwright fires a `dragover` only on `mouse.move`.

## Learnings

- The highlight is not the drop guard. `willReceiveDrop` shows the applied
  hover, while `canDrop()` reads the pending one first. Wait until the two agree.
- From a test, the `TreeApi` can be reached by walking the React fiber of a row
  (`__reactFiber*` then `.return`) to the context provider whose value has
  `canDrop` and `pendingHover`. A capture `dragover` listener can then log the
  guard's view before react-dnd answers.
