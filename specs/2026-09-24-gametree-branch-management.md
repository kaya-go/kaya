---
date: 2026-09-24
status: shipped
scope: ui
---

# Game tree branches: main line, context menu, no splicing

## Context

Two long-standing gaps in the game tree graph:

1. **Marking a line as main.** Kaya has no "main line" flag; the main line is
   whichever child is first in `children` at each node. `draft.shiftNode(id,
'main')` and `makeMainVariation` already existed, but the only ways to reach
   them were the Edit-mode toolbar and `Cmd/Ctrl+Shift+M` — and that shortcut
   was _also_ bound to `view.toggleHeader`, so one keypress toggled the header
   and reordered the tree at the same time.
2. **Removing branches.** `deleteNode` (node + subtree), `copyNode`/`pasteNode`
   and `deleteOtherBranches` all existed, but `cutNode` was never surfaced and
   the graph canvas had no per-node affordance at all — every action required
   entering Edit mode and finding a toolbar icon.

There was also a request to "splice" a move out of the middle of a line,
re-attaching the surviving tail to the deleted node's parent.

## Decision

### No splicing of move nodes

A move node is a board _transition_, not a container. Re-linking `P → N →
{C…}` into `P → {C…}` produces a structurally valid tree but an illegal game:
removing an odd number of moves flips the turn parity of everything after it,
and the tail was recorded on a board where `N`'s stone (and any captures it
caused) still existed. The coordinate stays, so the result is silently wrong
SGF.

This is not a Kaya limitation. Sabaki's "Remove Node" —
`parent.children.splice(index, 1)` in `@sabaki/immutable-gametree`, and Kaya's
`draft.removeNode` is the same fork of that code — deletes the node _and
orphans its children_. No mainstream SGF editor offers a move splice.

The sound replacements ship instead:

- **Delete Continuation** (new) — keep the current position, drop all its
  descendants. This is the real "I want to replay from here" operation, and it
  is why `deleteNode` alone was insufficient (it deletes the position too).
- **Delete Branch** — `deleteNode`: current node + subtree, cursor moves to the
  parent.
- **Delete Other Branches** — keep only the path to the current node.

Splicing remains defensible for _annotation-only_ nodes (no `B`/`W`, no
`AB`/`AW`/`AE`), which carry no board effect. That is deliberately out of
scope until something needs it.

### Context menu on graph nodes

`GameTreeContextMenu` (portal, viewport-clamped, `role="menu"`) is opened by
right-click via React Flow's `onNodeContextMenu`, and by long-press (450 ms,
cancelled by >8 px movement) via a `kaya:gametree-node-longpress` window event
dispatched by `StoneNode`. The event exists because React Flow only emits
`onNodeContextMenu` for mouse input and iOS Safari does not synthesise a
`contextmenu` event for long-presses.

The click that ends the gesture is stopped on the stone element itself, so it
never reaches React Flow's `onNodeClick` (which would navigate and close the
menu just opened). This is deliberately scoped to the node and reset on each
new pointer-down rather than a "ignore clicks for N ms" guard: an arbitrary
hold length would defeat a time window, and Android's `contextmenu` path emits
no click at all, which would leave such a guard armed for the next tap.

Branch actions were extracted from `useGameModification` into
`useBranchModification` in the same change — board/annotation editing stays in
the former, tree reshaping moves to the latter, keeping both inside the
file-size budget in CLAUDE.md. The tree logic itself lives in the pure
`branchOperations` module, unit-tested on trees parsed from SGF. Each operation
returns `null` when it does not apply, and the hook then changes nothing: Make
Main on a node already on the main line adds no undo entry and does not mark
the game dirty.

The menu uses `role="menu"`/`role="menuitem"`, moves focus to the first item
on open and back to the previously focused element on close, and supports
ArrowUp/ArrowDown/Home/End (claimed with `stopPropagation`, since those are also
global board-navigation shortcuts; ArrowLeft/ArrowRight are claimed for the same
reason) plus Escape/Tab to dismiss. It has no keyboard _opener_ — keyboard
users reach the same actions through the Edit toolbar, which stays
keyboard-accessible.

Right-clicking selects the node first (`goToNode`) because every branch action
operates on the current node. The menu therefore closes as soon as the current
node or the tree is no longer the one it was opened on (wheel navigation, an
undo) and when the canvas starts to pan or zoom: otherwise an action would land
on a node the menu was not opened on. A second finger cancels a pending long
press, so a pinch-zoom that starts on a stone does not open the menu.

Delete, Cut, Delete Continuation and Delete Other Branches from the menu show a
toast with an Undo button. Touch users have no Cmd/Ctrl+Z, and the Edit
toolbar's History group is not on screen in the mobile Tree tab. The button
calls the regular history undo, and only while the tree is still the one the
action produced, so it never reverts a later edit instead.

### Rebind `view.toggleHeader`

Moved from `Cmd/Ctrl+Shift+M` to `Cmd/Ctrl+Shift+H`. `Cmd/Ctrl+Shift+M` is the
mnemonic and Sabaki-compatible binding for "Make Main Branch", and the two
handlers are independent window listeners — a shared binding meant both fired
on every press. Users who customised either shortcut keep their override.

## Learnings

- The collision was invisible to the settings collision detector, which only
  guards _manual_ rebinds. Two `DEFAULT_SHORTCUTS` entries can silently overlap.
- The `edit.*` shortcuts live in `useHeaderKeyboardShortcuts`, which is mounted
  by `Header` — so they stop working when the header is hidden. Left as-is here
  (out of scope), but it is the same class of bug and worth fixing by lifting
  the hook out of the header.
- Node ids start at 0 on the root, so `!node.parentId` treats every child of
  the root as the root. The branch operations inherited that check, which made
  Make Main, Delete and Cut silently do nothing on a variation that splits at
  move 1. Compare parent ids with `== null`.
- Long-press needs its own event rather than `contextmenu` polyfilling: Android
  Chrome fires `contextmenu` on long-press, iOS Safari does not.

## Links

- `packages/ui/src/components/gametree/GameTreeContextMenu.tsx`
- `packages/ui/src/components/gametree/GameTreeGraphReactFlow.tsx`
- `packages/ui/src/hooks/game/branchOperations.ts` and
  `packages/ui/tests/branchOperations.test.ts`
- `packages/ui/src/hooks/game/useBranchModification.ts` (`deleteContinuation`)
- `packages/ui/src/components/gametree/useUndoToast.ts`
