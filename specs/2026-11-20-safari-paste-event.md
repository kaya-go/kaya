---
date: 2026-11-20
status: reference
scope: ui/clipboard
---

# Safari fires the paste event outside a text field

## Context

PR #241 installs the Cmd+V / Ctrl+V keydown fallback of `usePasteHandler`
(`packages/ui/src/components/file/useDropZoneEffects.ts`) on Tauri only. On the
web, a pasted SGF or OGS URL loads through the document `paste` event alone, so
Chrome never asks for clipboard permission. The fallback exists because the
macOS desktop webview (WKWebView) fires no `paste` event outside a text field.
Safari runs the same engine, so the question was whether Cmd+V on the board
still loads anything there.

## Outcome

It does. No code change.

- **Real Safari** (Safari 27.2, macOS 27.2.1), with a real Cmd+V sent through
  System Events and no text field focused: the `paste` event fires with the
  clipboard text, on `body` and on a focused `tabindex="-1"` element. On the web
  app, unmodified `main`, a pasted 9×9 SGF loads (2 moves, `untitled.sgf`).
- **Playwright WebKit** (build 2388): `Meta+v` fires `paste` with the text on
  `body`, and the game loads. This is weak evidence on its own: Playwright maps
  `Meta+KeyV` to the `paste:` editing command and runs it directly, without
  the menu a real key press goes through. No WebKit e2e project was added.

## Learnings

- Safari fired `beforepaste` twice at load and twice before each `paste`, most
  likely from validating its Edit › Paste menu item. The page did not cancel
  `beforepaste`, and `paste` still fired: no handler is needed for it.
- Why the desktop app differs, confirmed in the real desktop app: the macOS
  menu built in `apps/desktop/src-tauri/src/lib.rs` had only the Kaya submenu,
  so Cmd+V had no Paste item to trigger and no `paste` event fired. The same
  gap broke Cmd+V, Cmd+C and Cmd+A in every text field. PR #249 adds the Edit
  menu and keeps the Tauri keydown handler, which still runs first on the
  board. See [macOS: an Edit menu](2026-11-20-macos-edit-menu.md).

## Links

- PR #241, `fix(ui): leave Ctrl+V to the browser's paste event on the web`
- `e2e/clipboard.e2e.ts` › "Keyboard Shortcuts for Clipboard" (Chromium)
