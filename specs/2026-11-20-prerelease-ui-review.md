---
date: 2026-11-20
status: shipped
scope: ui, desktop
---

# Pre-release review: UI and desktop defects before 0.4.19

## Context

A review before the 0.4.19 release found eight defects in the React UI and the
desktop configuration. Three of them are gaps in fixes from #233 (shortcuts
behind the Resign confirmation, a comment typed in one game, the scan import).
Two come from #243 (the desktop CSP) and #249 (the macOS Edit menu).

## Decision

**Shortcuts behind a dialog.** Every global key handler now asks the same
question, `shouldIgnoreShortcut(e)` (`utils/shortcutGuard.ts`, renamed from
`boardShortcutGuard.ts`): is the user typing, or is a dialog or menu open
(`hasOpenOverlay`, fed by every overlay through `useCloseOnBack`)? #233 had
gated only the board and navigation-mode handlers, so Ctrl+Z behind Resign
undid the move, and Confirm resigned for the other side. A combo pressed while
the shortcut-conflict dialog was open reached the header shortcuts too.

- Behind a dialog, only fullscreen (F11) still works. It is a window command,
  like the browser's own F11, and changes neither the game nor what the dialog
  asks.
- Everything else waits: undo, redo and reordering change the game the dialog
  asks about, and save or settings would open a second dialog. Sound toggle
  waits like the other board shortcuts. The waiting shortcuts still call
  `preventDefault`, so the browser's Save Page or the macOS Edit menu's Undo
  does not run in their place.
- The layout toggles (header, sidebar, library) wait too. The header holds the
  settings, new game and scan dialogs, and hiding it unmounted the open one.
- The Resign confirmation keeps the side that was to play when Resign was
  clicked (`useResignConfirmation`). A gamepad still navigates behind dialogs,
  and it can no longer change who resigns. The dead copy of the confirmation in
  `BoardControls` (never opened) is gone.

**Comment typed in one game.** Every game opens on its root, node 0. The
editor reset only when the node id changed, so text typed on game A's root
stayed in the editor, and the next move saved it as game B's root comment. The
editor now resets on a new `gameId` as well, without saving.

**Undo while typing a comment.** The editor saved the text after the undo,
when it saw its node go. That was a new edit on the restored tree, and it
cleared the redo history. Undo and redo now ask the editor for the text being
typed, close it, and write the text into both the state they leave and the
state they restore (where that node exists). Undo takes back the move as asked,
Redo stays available, and the comment is in both states, with no extra history
step. The alternative was a step of its own for the comment. Then the Undo
click would undo the comment, not the move, which is not what the user asked
for.

**Scan import.** "Import as SGF" closed the recognition dialog before it asked
about unsaved changes. It now asks first, so Cancel goes back to the scan and
its calibration.

**Custom model description.** Uploads stored the English "User uploaded model".
The model list now shows `aiConfig.customModelDescription`, translated at
display time (`utils/modelDescription.ts`). Uploads store no description, and
rows stored before read translated too.

**Select All.** Cmd/Ctrl+A outside a text field selected the whole interface,
on the web (browser default) and on macOS desktop (the Edit menu of #249).
`useSelectAllScope` (mounted in `AppDropZone`) keeps it in a text field
(native; a checkbox or slider is not one), selects the block of text the
selection is in when the block is marked `data-selectable-text` (comments,
game info), and otherwise does nothing. On macOS desktop, wry 0.57 hands the
menu only the keys the page left alone (`WryWebViewParent::keyDown` calls
`performKeyEquivalent` on the main menu), so the `preventDefault` also stops
the menu item. Choosing Edit › Select All with the mouse still selects the
page.

**Remote images in markdown: links, not images.** The desktop CSP (#243)
blocks remote images, so `![](https://…)` in an SGF comment showed a broken
image. We did not open `img-src` to `https:`. A received SGF file could
otherwise learn the reader's IP address and when they opened it, from an image
loaded on display. On the web and the desktop alike, a markdown image now
renders as a link to it, labelled with its alt text or URL, which opens in the
browser like any other comment link (`remarkImagesAsLinks`). An image inside a
link, or not on the web, shows its alt text only. The update dialog's release
notes get the same plugin. They come from our own GitHub releases and hold no
image today, and one rule for all rendered markdown is simpler to keep. The CSP
keeps `img-src 'self' data: blob:`.

**Oldest macOS.** `bundle.macOS.minimumSystemVersion` is 13.4. The ONNX
Runtime static library `ort` links is built for 13.4 (`otool -l` on
`libonnxruntime.a`: `minos 13.4`). WebKit before Safari 16 lacks
`'wasm-unsafe-eval'`, which the CSP needs for the scoring WASM. v0.4.18 shipped
with `LSMinimumSystemVersion` 10.13 and a binary marked `minos 11.0`. When the
dead-stone estimate fails, scoring now shows a translated toast
(`scoring.estimateFailed`), passed in by the apps like the autosave notice. It
shows once per visit to scoring mode: the estimate runs again on every move
navigated, and fails each time.

## Outcome

- **E2E** (Chromium, on an alternate port). Each test below fails on the code
  before the change and passes after. The textarea Select All test is a
  regression guard and passes on both:
  - Ctrl+Z behind Resign, and a combo in the shortcut-conflict dialog
    (`shortcuts.e2e.ts`).
  - The comment into a new game, and undo while typing (`comments.e2e.ts`).
  - Cancel after "Import as SGF" (`board-recognition.e2e.ts`, Moku tests,
    `KAYA_E2E_MOKU=1`, with a board drawn in the page).
  - Select All outside a field, on a slider and in the game info
    (`select-all.e2e.ts`).
  - The French custom-model description (`model-library.e2e.ts`).
  - The estimate toast with the WASM blocked, shown once (`scoring.e2e.ts`).
  - A remote image in a comment renders a link, and no request reaches its host
    (`comments.e2e.ts`).
- **Unit.** `modelDescription.test.ts`, `remarkImagesAsLinks.test.ts` (the
  markdown before the change rendered `<img>` and a `<link rel="preload">`),
  and `macosMinimumVersion.test.ts`.
- **Desktop binary.** A `tauri build --debug --bundles app` binary reads
  `minos 13.4`, and its `Info.plist` reads `LSMinimumSystemVersion` 13.4.

## Not covered

- No key was sent to the real desktop app. That `preventDefault` stops the
  Edit menu's Select All rests on wry's code (above) and on #249's
  measurement of Cmd+V on the board: the game loaded once, so the menu's Paste
  did not fire after the page's handler called `preventDefault`.
- The gamepad still navigates and plays behind dialogs. Resign is safe from it,
  the rest is unchanged.
- Text typed in the comment editor is dropped, not saved, when another game
  replaces the tree. The unsaved-changes prompt does not see it, since it is
  not in the tree yet.

## Links

- PR #233 (the first fixes), #241 (shortcut-conflict dialog), #243 (desktop
  CSP), #249 (macOS Edit menu)
- [Desktop Content-Security-Policy](2026-11-20-desktop-csp.md)
