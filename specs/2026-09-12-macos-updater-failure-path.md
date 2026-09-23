---
date: 2026-09-12
status: shipped
scope: release, desktop
---

# The macOS in-app update failed, and the app made sure nobody could know why

Reported after cutting v0.4.7: on macOS the update dialog appeared, "Update
Now" ran for a while, and then the app said the update failed and to download
it manually — which is what happened, by hand, twice in a row.

## What was ruled out

Everything that ships. Each of these was checked against the real published
artifacts, not from memory:

| Checked                             | Result                                                           |
| ----------------------------------- | ---------------------------------------------------------------- |
| `Kaya.app.tar.gz` structure         | `Kaya.app` at the archive root, no symlinks                      |
| Code signature (v0.4.6/0.4.7/0.4.8) | Developer ID, hardened runtime, notarized, ticket stapled        |
| Team ID across versions             | `PBMGRUB94A` throughout — the self-update exemption applies      |
| Updater signature                   | minisign `ED` (prehashed) verifies against the configured pubkey |
| `latest.json`                       | Correct URL, signature identical to the published `.sig`         |
| Tauri capabilities                  | `updater:default` grants check + download + install; restart too |
| Plugin version                      | `install_inner` is byte-identical between 2.10.1 and 2.11.0      |
| The install itself                  | Both `rename(2)` calls replayed on the reporter's machine: OK    |

So the release pipeline is sound, and the failure is environmental — which
leaves the two ways `rename` into the bundle's parent legitimately fails on
macOS:

- the app runs from the mounted `.dmg`, which is read-only;
- Gatekeeper **translocated** it: an app launched from a quarantined location
  without being moved by Finder runs from a random read-only mount under
  `/private/var/folders/.../AppTranslocation/`.

Both are plausible here — the installed bundle still carries
`com.apple.quarantine` — and neither could be confirmed after the fact,
because of the real defect.

## The real defect

`Updater.tsx` caught the install error and threw it away:

```ts
} catch (err) {
  console.error('Failed to install update:', err);
  await message(`${t('updater.updateFailedMessage')}\n\nhttps://…/releases`, …);
}
```

`console.error` in a production webview goes nowhere a user can reach. The
dialog showed a fixed sentence and a URL rendered as **plain text in a native
dialog** — not clickable, not selectable in a useful way. Three months of "it
failed" with no error string and no way out but retyping a URL.

## Decision

1. **Say what failed.** The install and check dialogs now carry the actual
   error text, the same way the check path always did.
2. **Give a way out.** The dialog is an `ask()` whose confirm button opens the
   releases page through `shell:allow-open`, instead of printing a URL.
3. **Check before downloading.** A new `update_preflight` command
   ([`commands/updater.rs`](../apps/desktop/src-tauri/src/commands/updater.rs))
   resolves the bundle the updater would replace, and reports `translocated`
   or `readOnly` before a 110 MB download that was always going to fail at the
   last step. The frontend turns that into the one instruction that helps:
   move Kaya to Applications, reopen it, then update.

The check is macOS-only on purpose: Windows hands the payload to an elevating
NSIS installer, and on Linux the AppImage case can't be told apart from an
ordinary permission error without guessing. It fails open — any error from the
command itself lets the update proceed as before.

## Learnings

- A generic failure message is not a small UX wart. It cost an actual
  diagnosis: everything above had to be re-derived from published artifacts
  because the one piece of information that mattered was discarded at the
  moment it existed.
- Verifying the release chain by hand is worth doing once and writing down.
  The minisign signature is `ED` — BLAKE2b-prehashed, not raw Ed25519 over the
  file — which is easy to get wrong when checking it manually.
- Tauri's macOS updater needs a writable **parent** directory, not a writable
  bundle. The bundle's own permissions say nothing about whether the update
  can land.

## Links

- [2025-12-13 Tauri auto-updater setup](2025-12-13-tauri-updater-setup.md)
- [2026-09-23 The update installed, and the dialog never said so](2026-09-23-updater-restart-prompt.md) —
  the `ask()` dialogs this spec relies on never showed in a release until then
