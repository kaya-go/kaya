---
date: 2026-11-20
status: shipped
scope: desktop/macos
---

# macOS: an Edit menu, so text fields copy and paste

## Context

On macOS desktop, Cmd+V, Cmd+C, Cmd+X and Cmd+A did nothing in any text field
(comment, game info, search, dialogs). It had been like that since v0.3.0: the
app menu built in `apps/desktop/src-tauri/src/lib.rs` had only the Kaya submenu.

On macOS these shortcuts are menu key equivalents, not something the page
handles. wry hands a key the page left alone to the main menu
(`WryWebViewParent::keyDown` → `performKeyEquivalent`), and with no Copy or
Paste item nothing runs. Pasting a game on the board kept working only because
`usePasteHandler` has its own Cmd+V keydown handler for Tauri, which reads the
clipboard through the plugin and never relies on the menu.

The other desktop platforms are unaffected: WebView2 and WebKitGTK handle
Ctrl+C / Ctrl+V in a field without a menu.

## Decision

Add an Edit submenu on macOS with the predefined Undo, Redo, Cut, Copy, Paste
and Select All items. The macOS menu code changes, and the tests and spec
around it. Nothing else changes.

- **The Tauri Cmd+V handler stays.** It calls `preventDefault` before the key
  reaches the menu, so a paste on the board loads the game once, as before. On
  Linux and Windows it is still the only path, and it is untested there without
  it.
- **Kaya's shortcuts still win outside text fields.** Undo and redo
  (`useHeaderKeyboardShortcuts`) call `preventDefault`, so the menu's Undo does
  not run a second time. In a text field they step aside and the menu's Undo
  undoes the typing.
- **Menu titles stay in English**, like the existing "About Kaya" and "Check
  for Updates...". The native menu has no i18n path yet.
- **Cmd+A outside a text field** should now select the page text, as it does in
  a browser. Not tested.

## Verification

In the real desktop app (`tauri dev`, real key presses through System Events,
a temporary probe logging events):

| Test                            | Kaya submenu only   | With the Edit menu                      |
| ------------------------------- | ------------------- | --------------------------------------- |
| Cmd+V on the board              | game loads (plugin) | game loads once (plugin)                |
| Cmd+V in a textarea             | nothing pasted      | pasted                                  |
| Cmd+A, Cmd+C in a textarea      | nothing selected    | selected and copied                     |
| Cmd+Z in a textarea             | not tested          | the typing is undone                    |
| Cmd+Z, Shift+Cmd+Z on the board | not tested          | one move undone, then redone (Kaya)     |
| Cmd+V on the board, handler off | —                   | `paste` event with the text, game loads |

`apps/desktop/tests/macosEditMenu.test.ts` checks that the macOS menu keeps the
six items. There is no macOS desktop e2e: CI drives the web app only.

## Links

- PR #247: Safari fires the paste event outside a text field, which is how this
  was found
