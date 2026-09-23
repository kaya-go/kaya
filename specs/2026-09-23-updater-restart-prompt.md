---
date: 2026-09-23
status: shipped
scope: release, desktop
---

# The update installed, and the dialog never said so

## Context

Reported right after v0.4.11: on macOS, "Update Now" showed "Installing
update… Please wait." forever. Quitting and reopening Kaya showed it was on
0.4.11, so the install had worked; only the end of the flow was broken.

## What happened

Reproduced on the reporter's Mac with a debug build set to 0.4.10, launched
from a scratch copy of the bundle and logging each step to stderr, against the
real 0.4.11 release:

```
download finished (111796129 bytes, 6880 events)
downloadAndInstall RESOLVED
calling ask()
downloadAndInstall/ask FAILED: dialog.ask not allowed. Command not found
```

`tauri-plugin-dialog` 2.7 folded its `ask` and `confirm` commands into
`message`. Dependabot moved the crate to 2.7.0 on 2026-05-02 (#102), in the
Cargo PR, while `@tauri-apps/plugin-dialog` stayed on 2.6.0, whose `ask()`
still invokes `plugin:dialog|ask`. From then on every `ask()` in the desktop
app threw. In the updater that meant:

1. the restart prompt threw, so the `catch` treated a good install as a
   failure;
2. the `catch` called `offerManualDownload`, which is also an `ask()`, and
   threw again, out of the error handler, before `setStatus('available')`;
3. nothing reset the dialog, so the spinner stayed up.

The same failure hid every error dialog added in
[2026-09-12](2026-09-12-macos-updater-failure-path.md): the "can't update in
place" and "update failed" messages have never been shown in a release.

## Decision

- **Align the JS packages with the crates**: `plugin-dialog` 2.7, `plugin-updater`
  2.11, `plugin-fs` 2.5, `plugin-http` 2.6, `@tauri-apps/api` 2.11.
- **Guard it.** `apps/desktop/tests/tauriVersions.test.ts` fails when any
  `@tauri-apps/plugin-*` (or `api`) in `bun.lock` is on a different
  major.minor than its crate in `Cargo.lock`. Dependabot can't group across
  ecosystems, so the Cargo PR that moves a plugin ahead now goes red instead
  of shipping.
- **Keep the restart prompt in the update dialog.** After the install, the
  dialog switches to "Update Installed" with Later / Restart buttons instead of
  opening a native dialog. The flow no longer depends on a second IPC round
  trip to finish.
- **Error handlers can't fail.** The `catch` resets the status before showing
  anything, and `offerManualDownload` never rejects.
- **Show the download.** A progress bar with percent and MB, driven by the
  plugin's `Started` / `Progress` / `Finished` events. It re-renders only when
  the displayed percent changes (about 100 times, not 6,880), then shows
  "Installing" for the ~2 s of signature check and bundle swap.

Verified the same way as the reproduction: download 0 → 100 %, installing,
installed, a probe `ask()` now opens its dialog, and Restart relaunched into the
signed 0.4.11 bundle.

## Learnings

- A Tauri plugin is two packages with one contract. Minor releases do change
  command names, so they have to move together.
- An error path that is never exercised is not a safety net. The dialogs
  written to explain update failures failed the same way as the thing they
  were explaining.
- This Mac can run a real update end to end without UI automation: a debug
  bundle with an older version, a scratch copy of the `.app` (the updater
  replaces whatever bundle it runs from), and a temporary command that logs to
  stderr.
