# Library tree owns arrow keys

## Problem

After the library panel gained keyboard navigation (`9475c402`), ArrowUp /
ArrowDown (and Left / Right, Home / End) moved the tree selection **and**
triggered board navigation (`useBoardControlsKeyNav`), because those handlers
listen on `window` (bubble) and only skipped typing / open dialogs via
`shouldIgnoreShortcut`.

## Fix

`useLibraryTreeKeys` adds a bubble `onKeyDown` on `.library-tree` that
`stopPropagation`s ArrowUp / Down / Left / Right, Home, and End after
react-arborist has handled them. Window board-nav listeners never see the
key. Capture still owns Enter / F2 / Cmd+C/X/V as before.

## Alternatives considered

Extending `shouldIgnoreShortcut` with `isLibraryTreeTarget` (focus inside
`.library-tree`) would also work and would silence every guard consumer at
once. Preferring local stopPropagation keeps the guard about typing /
dialogs, and only yields the keys the tree actually uses.
