---
date: 2026-09-24
status: shipped
scope: e2e/library
---

# Library drag e2e: release once the folder is highlighted

## Context

`e2e/library.e2e.ts` › "does not stick after dragging an item into a folder"
failed in a quarter to half of runs (5/20 locally, and all three attempts of
one CI run). The menu always closed; the drop never registered, so Beta stayed
at the root. The test drags Beta onto Alpha by driving the mouse in steps
(react-dnd HTML5 backend, through react-arborist).

A trace of the DOM drag events showed Chrome ending the failing drags with
`dragleave` + `dragend` (`dropEffect: none`) instead of `drop`. Chrome drops only
if the last `dragover` accepted the drop. react-dnd accepts it when
react-arborist's `canDrop()` passes, and that reads the hover state, which only
two things update:

- a synchronous `hover` on `dragenter`, computed from the previous hover's client
  offset (dnd-core calls `target.hover` before storing the new offset);
- on `dragover`, at most one `hover` per animation frame, for the targets under
  the `dragover` that queued the frame.

The test crossed from Beta to Alpha and released in about 10 ms, less than a
frame. In a 20-run trace, in every failing run the frame queued by the first
`dragover` over Beta ran 1.5-2.6 ms after the pointer had entered Alpha's row.
It re-hovered with Beta's targets, clearing Alpha's hover, and sometimes the
`drop-target` highlight it had just shown. In every passing run, it ran no later
than 0.9 ms after entry. The context menu only shifts that first frame by about a
millisecond. `dragstart` fired on the Beta row in every run, no tree row was
removed, and the backend was attached to the panel.

## Decision

A test-side fix. `holdOverFolder` rests the pointer on the folder until it shows
the drop highlight, and releases only then. Each attempt re-sends a `dragover`
at the drop point and waits one animation frame, which flushes any hover queued
during the crossing. The highlight (`node.willReceiveDrop`) comes from the same
hover state that `canDrop()` reads, so once it holds, the next `dragover`
accepts the drop. Every assertion of the test is kept.

No app change: a user's pointer rests on the target for many frames, and the
browser keeps firing `dragover` while it does, so the hover settles before the
release.

## Learnings

- Playwright's Chromium drag (CDP `Input.dispatchDragEvent`) fires `dragover`
  only on `mouse.move`. A real drag keeps firing it while the pointer is still.
  A react-dnd drop driven from Playwright needs a wait on a visible hover
  signal, plus fresh `dragover` events, before `mouse.up()`. Adding more mouse
  steps does not help.
- `page.mouse.up()` during a Chromium drag is "dragover, then drop only if that
  dragover accepted it". A drop that silently does nothing ends with
  `dragleave` and a `dragend` whose `dropEffect` is `none`.
- AppDropZone stops `dragenter`/`dragover`/`drop` propagation at the React root,
  so a window bubble listener sees none of them. Trace drags with capture
  listeners.

## Links

- `e2e/library.e2e.ts`
- [Library tree: a stable row renderer](2026-09-12-stable-tree-row-renderer.md)
