---
date: 2026-09-12
status: shipped
scope: ui/library
---

# Library tree: a stable row renderer

## Context

Renaming a file in the library moved the caret to the end of the name on every
keystroke (#146). The row renderer was built by `useNodeRenderer()` inside a
`useCallback`, and `renameValue` sat in its dependency list. react-arborist
receives that renderer as a **component type**, so a new function identity means
a new type: React unmounts the whole row and mounts a fresh one. The focused
`<input>` was destroyed and recreated on each character, taking the caret with
it.

# 146 fixed the symptom by moving the rename draft into a local `RenameInput`,

so typing no longer touches the panel's state. But the renderer identity was
still derived from ~12 dependencies. Any of them changing mid-rename -
`isDirty` flipping after an autosave, or `loadedFileAncestorIds` being rebuilt
after a library `refresh()` - still remounted the row, and now that the draft
lived in the row, it was silently reset to the original name.

## Decision

`LibraryTreeNodeRenderer` is a module-level component, so its identity is
constant for the lifetime of the app and react-arborist can never remount a row
because of it. What the renderer needs from the panel travels through
`LibraryTreeNodeContext`, provided by `LibraryTreeNodeProvider` around `<Tree>`.
Changing context makes rows **re-render**, which is what we wanted all along;
only a genuine change of identity or position remounts them. The click
bookkeeping refs (shift-click ranges, double-click detection) live in the
provider, since they are shared by every row.

The rename field moved to its own file, `LibraryRenameInput.tsx`.

## Learnings

- Any component handed to a library as a type (`children`, `component`,
  `renderer`, `itemContent`...) must be defined at module level. Building one
  inside a hook or another component looks harmless and costs a remount of the
  whole subtree on every identity change - which is invisible until something
  holds DOM state: focus, caret, selection, scroll position, a playing `<video>`.
- The failure mode is state loss, not a crash, so type-checking and unit tests
  say nothing. `e2e/library.e2e.ts` pins it down by typing in the middle of a
  name and asserting the caret position; it fails against the pre-#146 code
  (`JosXekiYZ` instead of `JosXYZeki`).
- A context whose value changes often is the right tool here. The reflex of
  "avoid context re-renders" pushes toward the pattern that caused the bug; the
  row list is virtualized, so re-rendering visible rows is cheap.

## Links

- PR #146 - original caret fix (local draft state)
- `packages/ui/src/components/library/LibraryTreeNode.tsx`
- `e2e/library.e2e.ts`
