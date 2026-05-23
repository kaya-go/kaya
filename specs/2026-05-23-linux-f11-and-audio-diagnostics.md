---
date: 2026-05-23
status: shipped
scope: desktop, ui
---

# Linux: F11 fullscreen and AppImage audio diagnostics

Two long-standing Linux reports we cannot reproduce on macOS. Both shipped on the
same release as the model-download / glibc fix because they share the same
"can't test locally" constraint: the goal is to either ship a high-confidence fix
or improve the diagnostics the next reporter can hand back to us.

## #27 — F11 does not toggle fullscreen on Linux+Wayland

The user is on Zorin OS 18 (Ubuntu 24.04 + GNOME, Wayland). The maximize button
works; F11 does nothing.

Root cause: F11 was never bound. `view.toggleFullscreen` defaulted to bare `'f'`
in `shortcutTypes.ts`. F11 is the platform-conventional fullscreen key on
Linux/Windows browsers and the user expected it.

What shipped:

- `view.toggleFullscreen` default binding moved from `'f'` → `'f11'`.
- `bindingToDisplayString` formats `f<NN>` keys as uppercase (`F11`) instead of
  the previous default that left them lowercased.
- Added `e.preventDefault()` to the F11 branch in the document keydown handler.
  On Wayland some compositors will swallow F11 for their own window action if
  the page does not call preventDefault on the keydown.

Trade-off: existing users who had memorized bare `'f'` lose the shortcut unless
they rebind in Settings. We took it — `'f'` is a single bare letter that fires
any time keyboard focus leaks out of a text input, which is a worse default than
losing muscle memory for one key. Customizations stored in localStorage are
preserved.

Confidence the bug is gone on Wayland: medium-high. The handler is there; the
binding is there; preventDefault is there. If the compositor still grabs F11
before WebKitGTK sees it, we're stuck with a Tauri/WebKit upstream limitation,
but the code-side is now correct.

## #86 — AppImage audio is silent (web build works)

Reporter says AppImage on Linux plays no sound; the web version on the same
machine is fine. We cannot reproduce on macOS, and the existing init error path
(toast surfaced via `setSoundInitErrorHandler`) reportedly never fires for them.
That means either the device opens fine and something downstream silently fails,
or the toast is being dismissed before they read it.

The rodio backend had three silent-failure surfaces:

1. `AudioManager::new()` logged the device-open error to JS but never to stderr,
   so users running from a terminal saw nothing useful in the journal.
2. `load_sound` stored the OGG bytes without decoding them. If lewton refused
   the file (codec mismatch, AppImage resource corruption), the failure only
   surfaced one byte at a time inside `play()` and was thrown away.
3. `play()` silently dropped both unknown keys and decode errors.

What shipped:

- `AudioManager::new()` now mirrors device-open failures to stderr in addition
  to the returned `Result`.
- `load_sound` decodes the OGG once at load time. If the decode fails the
  bytes are not inserted and the per-file error bubbles back into `audio_init`.
- `audio_init` collects per-file failures. If zero sounds end up loaded it
  returns an error that fires the existing JS sound-init-error toast with the
  failure list, instead of silently storing an empty `AudioManager`.
- `play()` logs unknown keys and decode errors to stderr.

What this does and does not fix:

- **Fixes**: any case where the audio is silent because all sounds failed to
  load or decode. The user now gets a visible toast with the reason instead of
  silence.
- **Surfaces but does not fix**: cases where the device opens, the bytes
  decode, but the sound never reaches the speakers (PipeWire routing, muted
  default sink, ALSA grabbed by another process). The reporter can now run
  the AppImage from a terminal — `./Kaya-*.AppImage 2>&1 | tee kaya.log` — and
  hand us a log instead of "no sound."

Why we did not change the rodio feature set: lewton-only is the current build.
Adding `symphonia-vorbis` as a redundant decoder would help if lewton is the
actual culprit, but it would bloat the binary on every platform to chase a
hypothetical Linux-only decode bug. The new init validation will tell us
whether decoding is actually the problem before we make that call.

## Out of scope from #86

The reporter also raised three analysis-engine observations:

- Slower MCTS than Lizzie at 400 visits.
- Different top moves vs. Lizzie at the same visit count.
- The 400-visit cap is restrictive.

These are not Linux-specific and overlap with the ongoing MCTS work in
`specs/2026-05-04-ai-analysis-mcts-first.md`. Not addressed here because they
need controlled benchmarking, not a blind change.

Tracking issues: <https://github.com/kaya-go/kaya/issues/27>,
<https://github.com/kaya-go/kaya/issues/86>
