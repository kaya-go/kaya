---
date: 2026-09-12
status: shipped
scope: ci, packaging
---

# Linux packaging: prove the bundles work, instead of assuming it

Follow-up to [2026-05-23](2026-05-23-linux-model-download-and-glibc.md), which
split the Linux build so `.deb`/`.rpm` could target an older glibc than the
Arch-based AppImage. That split fixed the reported breakage but left the
underlying shape of the problem intact: nothing in CI ever installed the
packages it built, so "the build is green" and "the package works" were
unrelated statements. Every Linux packaging bug so far has been found by a user.

## What the artifacts actually said

Pulled the 2026-09-07 nightly's `.deb` and `.rpm` and read them directly
instead of reasoning about what the bundler probably emits.

The binary's `.gnu.version_r` requires up to `GLIBC_2.39`:

- `__isoc23_strtol` / `strtoll` / `strtoul` / `strtoull` / `sscanf`, `fmod`,
  `fmodf` at 2.38 — the C23 libc variants that come with building against
  glibc ≥ 2.38, and that `ort`'s prebuilt ONNX Runtime already needs.
- `pidfd_spawnp`, `pidfd_getpid` at 2.39 — Rust std's pidfd path. The symbols
  are weak, but mold does not set `VER_FLG_WEAK` on the version entry, so
  `_dl_check_map_versions` still hard-fails. 2.39 is the real floor, not 2.38.

Neither package declared any of it:

```text
deb: Depends: libwebkit2gtk-4.1-0, libgtk-3-0
rpm: Requires: libwebkit2gtk-4.1.so.0()(64bit), libgtk-3.so.0()(64bit)
```

So on Ubuntu 22.04, Debian 12 or RHEL/Rocky/Alma 9 the package installs
perfectly and the app then refuses to start with `version 'GLIBC_2.39' not
found`. That is the worst available failure mode: the package manager, the one
component that exists to prevent exactly this, was told nothing.

## Declaring the floor

`bundle.linux.{deb,rpm}.depends` now carries `libc6 (>= 2.39)` and
`libc.so.6(GLIBC_2.39)(64bit)`. The tauri CLI prepends user `depends` to its own
`libwebkit2gtk-4.1-0`/`libgtk-3-0` (`crates/tauri-cli/src/interface/rust.rs`),
so this is additive — worth checking, because `tauri-bundler`'s Debian writer
takes the list verbatim with no merging of its own.

The rpm form has to encode the version in the **name**: tauri's rpm bundler
calls `Dependency::any(dep)`, which builds a name-only requirement, so
`"glibc >= 2.39"` would become a dependency on a package literally called
`glibc >= 2.39` and make the rpm uninstallable everywhere.

### What was deliberately not declared

The binary also `NEEDS` `libasound.so.2`, `libsoup-3.0.so.0`, `libdbus-1.so.3`
and `libstdc++.so.6`, none of them declared. Adding them looked like the obvious
completion of the fix, and it is a trap: after the 64-bit-time*t transition
`libasound2` is a \_virtual* package on Ubuntu 24.04 provided only by
`liboss4-salsa-asound2`, and does not exist at all in Debian 13 (the real
package is `libasound2t64`). `Depends: libasound2` would have made the package
uninstallable on Debian 13 to fix a dependency that webkit2gtk already pulls in
everywhere in practice. Distro-specific library naming is exactly the class of
thing this project cannot verify by reasoning, so it stays out.

`libc6` and `glibc` are safe precisely because they are the two names that
cannot be renamed.

## Proving it

Declaring a floor without checking it just moves the guess. Two gates:

- **`check-glibc-floor.sh`** reads the max `GLIBC_*` from the freshly built
  binary's version references and compares it to what `tauri.conf.json`
  declares. Under-declaring fails the build (the dangerous direction:
  installs, then crashes); over-declaring warns (needlessly narrow). A bump of
  the build container can no longer silently raise the real floor.
- **`_verify-linux-packages.yml`** installs the artifacts on `ubuntu:24.04`,
  `debian:13` and `fedora:latest` and resolves the binary with `ldd`, and
  asserts that `debian:12` (glibc 2.36) and `almalinux:9` (2.34) refuse
  to install it at all. The negative rows are the point: they test that the
  declaration does its job, which is the part that was missing.

`fedora:latest` rather than a pinned release — a pinned Fedora goes EOL and
takes its repo mirrors with it, turning the gate into a flake.

This runs in `nightly.yml` and gates `commit-and-release` in `release.yml`.

## The AppImage, which is what most people actually download

The `.deb`/`.rpm` work got the attention because that is where the bug reports
landed, but the AppImage is the bundle most Linux users take, and the only one
that claims to run anywhere. It had no verification at all.

Opening the nightly's AppImage: it is `uruntime` (VHSgunzo) + DwarFS, statically
linked, so there is no `libfuse.so.2` dependency on the host — the single most
common reason an AppImage refuses to start elsewhere. When neither `fusermount`
nor user namespaces are available it falls back to extract-and-run by itself.
Inside, quick-sharun ships **glibc 2.44**, the loader, the NSS modules, gconv,
the `dri`/`gbm` drivers and WebKit's helper processes (`WebKitWebProcess`,
`WebKitNetworkProcess`, `WebKitGPUProcess`, `bwrap`). The host's glibc never
comes into it. That is why the AppImage is a real answer for the users the
packages turn away, rather than a consolation prize.

That only holds while the bundle is complete, so `check-appimage-closure.py`
parses every ELF in the AppDir, collects DT_NEEDED, and fails if anything would
have to be resolved from the host. Current state: 1481 ELF files, 733 sonames,
one gap — `libheif.so.1`, wanted by `glycin-heif`. glycin is GTK's out-of-process
image decoder and Kaya renders through the WebKit webview, which decodes its own
images, so that helper is never reached. It is tolerated by name with that
reason, so a gap that is genuinely new fails the build.

`_verify-linux-appimage.yml` then launches the real thing under Xvfb and checks
that both the process and `WebKitWebProcess` come up. The matrix leans old on
purpose — Ubuntu 22.04 (2.35), Debian 12 (2.36), AlmaLinux 9 (2.34) — because
those are exactly the users the packages reject and send here.

Confirmed by running the extracted AppDir in local containers on all three
before committing: process up, webview up, no output. (The AppImage itself
cannot be exec'd under Rosetta on Apple Silicon — it is statically linked — but
the app inside it is dynamically linked and runs fine, which is enough to test
the part we control.)

## The trap that ate the first two CI runs

All nine verification jobs failed with `No such file or directory` on scripts
that were definitely committed. `actions/checkout` needs `git`; the verify
containers are bare distro images that do not have it, so checkout silently
fell back to the GitHub REST API tarball — and this repo's `.gitattributes`
marks `.github`, `docs` and `scripts` as `export-ignore`, so that tarball
contains none of them. The existing build jobs never hit this only because they
install `git` for unrelated reasons.

Worth remembering for any future container job here: a green `actions/checkout`
on an image without git gives a checkout that is quietly missing directories.

## Release CI, while in there

Reading the run history turned up three things worth fixing.

**The AppImage build could fail on someone else's commit.** It installed
tauri-cli from `--branch feat/truly-portable-appimage` with no `--locked`, so
every run re-resolved dependencies from scratch. The 2026-08-31 nightly died
that way: the fresh resolve picked a `log` 0.4.34 / `value-bag` 1.14.0 pair that
did not compile. An upstream branch we do not control could have failed a
release halfway through. Now pinned to rev `3b69f584` (the commit the last
successful nightly used) with `--locked`.

**Both Linux jobs spent ~5.5 min each compiling tauri-cli**, on every run. Both
now pin it (2.11.4 for `.deb`/`.rpm`, the rev above for the AppImage) and cache
the built binary under that pin, so the compile happens on a bump rather than
every time.

The first attempt was to skip the compile entirely for `.deb`/`.rpm` by using
the `@tauri-apps/cli` devDependency, which ships the same bundler as a prebuilt
native addon. It failed in CI: bun's install layout there does not create
`apps/desktop/node_modules/.bin/tauri`, though it does locally on macOS. Pinning
and caching gets most of the time back without changing which bundler produces
the packages.

**Artifacts shipped their own build scratch.** Upload globs were directory-wide,
so the AppImage artifact carried the uncompressed 2.2 GB `Kaya.AppDir` next to
the 250 MB AppImage squashed from it, the `.deb` artifact carried the unpacked
staging tree, and the macOS one carried `Kaya.app` next to the `.dmg` and
`.app.tar.gz` built from it. 1.99 GB of the 1.99 GB nightly artifact set was
files nothing downstream reads — uploaded, stored, and downloaded again by
`commit-and-release`. Now globbed to the shipped files.

Measured on the validation run: the AppImage artifact went from 1144 MB to
248 MB and the macOS one from 317 MB to 211 MB, with every file the release
publishes still present (including the `.sig` files the updater manifest is
built from). The release should land around 21 min instead of ~28, with the
critical path moving to Windows.

## Still open

- **The glibc floor itself.** Reaching Debian 12 or Ubuntu 22.04 means building
  ONNX Runtime from source, or sourcing Microsoft's manylinux builds via
  `ORT_LIB_LOCATION` instead of `ort`'s `download-binaries`. Both are real
  options; both need a Linux machine to evaluate honestly. The AppImage covers
  those users today.
- **sccache earns very little.** Hit rates on the 2026-09-07 nightly: Windows
  0%, AppImage 2%, `.deb` 28%, macOS 37%. Nothing caches
  `apps/desktop/src-tauri/target`, so every build compiles ~1800 crates from
  scratch. `Swatinem/rust-cache` would help, but release and nightly runs are
  far enough apart that cache entries mostly expire between them, so the payoff
  is unreliable and it was left alone.
