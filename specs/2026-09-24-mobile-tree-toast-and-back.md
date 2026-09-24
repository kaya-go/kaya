---
date: 2026-09-24
status: shipped
scope: mobile
---

# Mobile: tree edges, toasts, back gesture, AI status pill

## Context

Four problems showed up when using Kaya on a phone (web over LAN and the
Android build), all reported from the same session:

1. The game tree's connection lines looked broken — short white stubs hanging
   off the right of each stone with gaps between moves — while desktop looked
   correct.
2. After loading an AI model in Settings, the green success toast sat on top of
   the dialog's close button (top-right, and the sheet is full-screen on a
   phone), so the dialog looked impossible to dismiss.
3. The Android back gesture quit the app instead of closing the open dialog.
4. Opening Settings after loading an AI model put an amber/green status pill on
   top of the dialog's close button, and the dialog could only be escaped by
   killing the app.

## Decision

### 1. Pin graph node geometry

The tree is laid out on a fixed 24 px grid (`NODE_WIDTH`/`NODE_HEIGHT` in
`graphLayout.worker.ts`), and the layout worker's spacing is what positions the
connection handles. But the blanket touch-target rule in `theme.css`
(`button, .btn, [role='button']` → 44 px under `max-width: 767px`, 40 px for
tablets) also matched React Flow node wrappers, because React Flow tags every
node `role="button"`. That inflated each wrapper to 44–55 px while the worker
still spaced nodes on 24 px: handles ended up ~15 px right of the stone centre
and consecutive handles only ~2 px apart, so the bezier edges collapsed into
stubs.

The fix pins `.react-flow__node-stone` to 24 px in `GameTreeGraph.css`, with a
selector (`.gametree-graph-container .react-flow__node-stone`) specific enough
to beat the global rule, so the invariant the layout depends on is stated rather
than implied. Excluding `.react-flow__node` from the global rule with `:not()`
was tried first and dropped: `:not(.x)` counts as a class, so the global rule
started beating single-class component rules and resized toggle switches
(51×31 → 51×40 on tablets) and the tree and analysis toolbar buttons.

Accepted trade-off: graph nodes stay 24 px, below the 44 px touch-target
guideline. A 44 px hit area cannot fit — nodes are 42 px apart on the main axis
and 38 px across — so bigger tiles would overlap their neighbours and make taps
ambiguous. Pinch-zoom is the affordance for small nodes.

### 2. Toasts move to the bottom below 1024 px

The settings modal is portalled above the header's stacking context, so clicks
still reached the close button, but the toast visually covered it and the
overlay is translucent, which reads as "blocked". The toast also used a 250 px
`min-width`, which overflows narrow phones.

The desktop 3-pane breakpoint (`> 1024 px`) is where there is room for a
top-right toast next to a 600 px modal, so below it the container now anchors to
the bottom, clear of the mobile tab bar, and toasts stretch to the available
width and slide up instead of in from the right. The overrides sit after the
base `.toast` rule: same specificity, so order decides.

### 3. Back gesture dismisses overlays

Tauri v2 maps the Android back button to `webview.goBack()` and finishes the
activity when the webview has no history. Kaya is a single-page app that never
touches history, so the first back press quit the app even with a dialog open
(tauri-apps/tauri#8142).

`useCloseOnBack(isOpen, onClose)` keeps exactly one sentinel history entry while
any overlay is open, and routes `popstate` to the topmost overlay's close
handler. If overlays remain afterwards it re-pushes the sentinel, so a second
back closes the next one instead of exiting; when the last overlay closes from
the UI the sentinel is popped off so back is free to leave again. Applied to the
settings modal, every dialog (about, confirmation, new game, save, save-to-
library, unsaved changes, scan options, camera, board recognition, library
dialogs), the mobile menu, the analysis legend/help and the shortcut dialogs.

This also works in the browser, where back used to leave the page.

Considered: `app.onBackButtonPress` from `@tauri-apps/api`. Registering it
replaces Tauri's default handling outright, so the app would also have to exit
itself when nothing is open; it is Android-only, and it leaves browser back
unfixed. The history sentinel covers both with one mechanism.

### 4. The status pill can no longer push the close button off screen

The settings header is `title (icon + h2 + AIStatusPill) | close button`. In its
`ready` phase `AIStatusPill` renders the whole reasoning sentence — for a phone
without WebGPU that was "Browser GPU not available — running on WASM" — and the
pill is `white-space: nowrap`. `.kaya-config-title` had no `min-width: 0`, so as
a flex item it could not shrink below that sentence's min-content width: the
header overflowed and the close button was pushed past the right edge of the
viewport. Measured at 390 px wide: the button's right edge landed at **x=471**,
81 px off screen and untappable (`elementFromPoint` at its centre no longer hit
it). The pill text was amber while probing and green once ready, which is the
"orange and green popup" users saw.

Two-part fix.

Keep the message on the header line. A separate row below it moved the settings
content every time a status appeared, which is worse than the disease. Instead
the row is constrained so it can never push the close button: the title block
gets `min-width: 0` + `overflow: hidden`, the pill shrinks and is hard-cut
(`text-overflow: clip`, no ellipsis dots), the close button is `flex-shrink: 0`
and paints above (`z-index: 1`) in case the two meet, and the pill's padding is
tighter. Where the sheet spans the viewport (≤ 640 px) a `ready` label then
clears itself after 3 s; wider, it stays, because it is the only place that
shows which backend is running. `error` and work in progress (`probing`,
`loading-model`, `initializing`) always stay, and the clipped text rides along
as a `title`.

Shorten the strings as well. Constraining the row only buys so much: the 41-char
sentence needed 270 px and left 68 % of itself visible at 390 px (83 % at
430 px). `pickReason` now returns one of seven terse reason ids
(`AutoPickReason`) instead of English prose, and `AIStatusPill` renders it as
`aiConfig.backendReason.<reason>` — so the label is translated rather than
hardcoded, and no language inherits a sentence that only fits in English:
`No GPU — WASM`, `GPU — WebGPU`, `Native GPU`, `PyTorch sidecar`, … The reason
explains auto's _preferred_ backend, so the status carries it only when auto
chose and that backend came up (`readyReason`); after a fallback or a manual
choice the pill shows the backend name.

The measured widths of all seven labels in all eight languages:

| viewport | available | result                                               |
| -------- | --------- | ---------------------------------------------------- |
| 320 px   | 113 px    | en/es/zh fit; de/fr/it/ja/ko 1–3 labels 5–24 px over |
| 360 px   | 149 px    | all eight languages fit                              |
| 390 px   | 183 px    | all eight languages fit                              |

The 320 px case is the smallest phones still in use (iPhone SE 1st gen); the
labels that miss it are Latin translations that cannot express "no GPU, running
WASM" in 113 px without anglicising, plus two CJK ones. They are clipped by the
backstop rules below and clear themselves in 3 s. `AUTO_PICK_REASONS` plus
`packages/ui/tests/backendReason.i18n.test.ts` fail the build if an id ever
lacks a translation or a locale carries an unknown one.

## Learnings

- A global `[role='button']` sizing rule is a landmine. Any component that marks
  a non-button as a button inherits it; here that silently desynchronised a
  layout algorithm from the DOM it was drawing into. Exempt the component with a
  more specific selector on its side, not by raising the global rule's
  specificity, which every component rule then has to beat.
- The bug looked mobile-specific but was not: vertical is the _default_ tree
  layout, and phones start with empty `localStorage`. Desktop only looked fine
  because the layout had been switched to horizontal there. Reproducing at
  390×844 was enough to see it.
- `StrictMode` double-invokes effects, so a history-based hook sees
  push → cleanup → push. The first attempt handled that with a sentinel flag and
  a `selfPops` counter, which was **not enough**: the cleanup's `history.back()`
  is asynchronous, so under a remount it landed _after_ the new `pushState` and
  the module ended up believing a sentinel was on the stack when the current
  entry was actually the app's own. The next disposal then called
  `history.back()` past the app and the page went blank, which
  `e2e/library.e2e.ts` caught (folder creation never appeared because the tab
  was gone). Two things fixed it for real: the removal is deferred by a tick and
  cancelled when another overlay mounts, so a remount never pushes a second
  entry; and every removal re-checks that the current entry is the sentinel
  itself before walking back. Measured after the fix: opening the settings sheet
  adds exactly one history entry.
- "It is probably fine under StrictMode" is not a claim to write in a commit
  message. The counter looked right, the reasoning was plausible, and the bug
  only showed up in a suite that has nothing to do with the feature — library
  rename, because a blank page makes every subsequent assertion fail.
- The `popstate` listener is deliberately never removed. Removing it once the
  stack empties races the `history.back()` issued by a UI dismissal, leaking a
  `selfPops` credit that would then swallow the next genuine back press.
- Probing beats guessing: measuring the node rect (`55×55` vs `24×24`) and the
  rendered edge path (`M22,44 … 22,42`, a 2 px squiggle) identified the cause
  immediately, where reading the layout code alone did not.
- The pill bug is a flexbox classic: a `nowrap` flex item needs `min-width: 0`
  on every ancestor that must shrink. Without it the automatic minimum size is
  the text's min-content width, so the row overflows and pushes the last item
  out of the viewport instead of truncating. A long status string is enough to
  make a dialog impossible to dismiss.
- Three repairs, three failure modes: leaving the row unconstrained pushed the
  close button off screen; an ellipsis hid the message behind dots; a separate
  row kept everything readable but shifted the settings content every time a
  status appeared. The answer was to constrain the row _and_ shorten the text —
  the layout could only ever buy a partial sentence, and a status line that has
  to be clipped is a status line that is too long.
- These strings were hardcoded English in `@kaya/ai-engine` and rendered straight
  into the pill. Fixing that meant changing what the picker returns: a
  **translatable id** (`AutoPickReason`) rather than a sentence, because a
  free-form display string cannot be localised without either a lookup table of
  English text or a parser. The type change (`reasoning: string` →
  `reason: AutoPickReason`) made every consumer a compile error, which is how
  all seven call sites were found.
- "Does it fit?" is not a character count. The same 15-character label renders
  at 104 px in English and 122 px in Korean, so translations have to be measured
  in the browser — counting characters would have passed the Korean label that
  clips.
- Symptom attribution matters: the first report pointed at "the popup", and the
  toast was moved to the bottom on the strength of a real but _different_
  overlap. The pill, which the user identified by its wording, was the actual
  obstruction. Both fixes are valid; only one was the reported bug.

## Links

- `packages/ui/src/components/gametree/GameTreeGraph.css` (pinned node size)
- `packages/ui/src/components/ui/Toast.css` (bottom placement)
- `packages/ui/src/hooks/useCloseOnBack.ts`, `e2e/back-gesture.e2e.ts`
- `packages/ui/src/components/ai/AIStatusPill.tsx`, `KayaConfig.css` (header row)
- `packages/ai-engine/src/auto-config.ts` (`AutoPickReason`),
  `packages/ui/tests/backendReason.i18n.test.ts`
- `docs/RESPONSIVE.md`
