# Release

Kaya releases run from a single GitHub Actions workflow. No manual tags,
no manual changelog edits.

## What gets shipped

Two web deployments + native installers per release:

| Channel            | URL                      | Source                | Workflow      |
| ------------------ | ------------------------ | --------------------- | ------------- |
| Stable web         | https://kayago.app/      | latest tagged release | `release.yml` |
| Next web           | https://kayago.app/next/ | `main` branch         | `ci.yml`      |
| Desktop installers | GitHub Releases          | tagged release        | `release.yml` |

Both web deployments use `keep_files: true` so they don't overwrite each
other on Pages.

Desktop builds: `.AppImage` (Arch container), `.deb` + `.rpm` (Ubuntu 24.04
container), `.dmg` + `.app.tar.gz` (macOS, aarch64), `.exe` (Windows NSIS).
All signed for the auto-updater — see
[`specs/2025-12-13-tauri-updater-setup.md`](../specs/2025-12-13-tauri-updater-setup.md).

## Linux packaging

The `.deb`/`.rpm` and the `.AppImage` cover different distros on purpose.

| Bundle      | Built on       | Runs on                                           |
| ----------- | -------------- | ------------------------------------------------- |
| `.deb`      | `ubuntu:24.04` | glibc ≥ 2.39: Ubuntu 24.04+, Debian 13+, Mint 22+ |
| `.rpm`      | `ubuntu:24.04` | glibc ≥ 2.39: Fedora 40+, openSUSE Leap 16+       |
| `.AppImage` | `archlinux`    | anything — it bundles glibc and the loader        |

The glibc floor is not a choice: `ort`'s prebuilt ONNX Runtime references
C23 libc symbols (`__isoc23_strtoull` and friends) added in glibc 2.38, so
the build container cannot go older than Ubuntu 24.04. Lowering it would
mean building ONNX Runtime from source.

What matters is that the floor is **declared** rather than discovered at
runtime. `bundle.linux.{deb,rpm}.depends` in
[`tauri.conf.json`](../apps/desktop/src-tauri/tauri.conf.json) carries a hard
`libc6 (>= 2.39)` / `libc.so.6(GLIBC_2.39)(64bit)` dependency, so `apt` and
`dnf` refuse the install on an older distro instead of installing an app
that dies at startup with `version 'GLIBC_2.39' not found`. Users below the
floor get the AppImage.

### The AppImage is the one most people download

It is also the one that has to work on distros nobody builds on, and it
manages that by shipping **its own glibc** (2.44 at the time of writing), the
dynamic loader, the NSS modules, gconv, the `dri`/`gbm` drivers and WebKit's
helper processes. The host's glibc never enters into it. The runtime is
`uruntime` + DwarFS, statically linked, so there is no `libfuse.so.2`
dependency either — the usual reason an AppImage refuses to start elsewhere.

So the AppImage is a real answer for users below the package floor, not a
consolation prize. It is verified as such: see the gates below.

### CI gates

None of this reproduces on macOS, so four gates run on every nightly and
block every release:

| Gate                         | What it proves                                                                                                  |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `check-glibc-floor.sh`       | The declared floor still matches the binary's `.gnu.version_r`                                                  |
| `check-appimage-closure.py`  | Every `DT_NEEDED` in the AppDir resolves inside the bundle                                                      |
| `_verify-linux-packages.yml` | The `.deb`/`.rpm` install on Ubuntu 24.04, Debian 13, Fedora — and are **refused** on Debian 12 and AlmaLinux 9 |
| `_verify-linux-appimage.yml` | The AppImage actually launches, webview included, on Ubuntu 22.04, Debian 12, AlmaLinux 9 and Fedora            |

The "must refuse" rows matter as much as the rest: they test that the
declaration does its job, which is the part that was missing before.

If you raise the floor, change both `depends` entries and the download
table in `release.yml` — the floor check enforces the first, not the second.

### Gotcha: container jobs need git

`.gitattributes` marks `.github`, `docs` and `scripts` as `export-ignore`.
Without `git` installed, `actions/checkout` falls back to the GitHub REST
API tarball, which honours that — so a container job gets a green checkout
with those directories silently missing. Install `git` in any container job
that needs them.

## Cutting a release

1. **Actions → Release → Run workflow.** Enter version like `0.4.5`
   (no `v` prefix).
2. The workflow:
   - Verifies (format, type-check, tests). Fast-fails if anything
     doesn't pass.
   - Builds in parallel for Linux (AppImage and .deb/.rpm), macOS, Windows.
   - Installs the .deb/.rpm on real distro images and fails the release if
     they don't install and resolve there.
   - Creates and pushes the `v0.4.5` tag.
   - Generates the changelog from conventional commits since the last
     tag, updates `CHANGELOG.md`.
   - Creates a **draft** GitHub release with all installers and the
     `latest.json` updater manifest attached.
3. **Releases → find the draft → review → Publish.**

That's it. Total time: ~20–30 min.

## Conventional commits

The changelog is generated from commit messages, so they need to be
parseable. See [Conventional Commits](https://www.conventionalcommits.org/).

Prefixes that affect the changelog:

| Prefix                                           | Section               |
| ------------------------------------------------ | --------------------- |
| `feat:`                                          | ✨ Added              |
| `fix:`                                           | 🐛 Fixed              |
| `perf:`                                          | ⚡ Performance        |
| `refactor:`                                      | ♻️ Refactor           |
| `docs:` `style:` `test:` `build:` `ci:` `chore:` | grouped at the bottom |

Subject is **lowercase**, ≤ 72 chars. Optional scope: `feat(ui): add X`.
Breaking change: append `!` (`feat!:`) or include `BREAKING CHANGE:` in
the body.

PRs squash-merged by GitHub automatically gain the `(#123)` suffix and
get linked in the changelog.

## Preview the changelog

The release workflow uses `git-cliff` (configured in
[`cliff.toml`](../cliff.toml)). To preview locally:

```bash
# unreleased commits since the last tag
bun run git-cliff --unreleased --strip header

# what the next release would publish
bun run git-cliff --tag v0.4.5 --unreleased --strip header -o CHANGELOG-NEW.md
```

## Pre-releases

Use `0.5.0-beta.1` style versions. After the workflow finishes, edit the
draft and tick "Set as a pre-release" before publishing.

## macOS code signing

The release workflow signs and notarizes macOS builds when the Apple
secrets are present. Required GitHub secrets:

- `APPLE_CERTIFICATE` — base64-encoded `.p12`
- `APPLE_CERTIFICATE_PASSWORD`
- `APPLE_ID`
- `APPLE_PASSWORD` — app-specific password
- `APPLE_TEAM_ID`

Without those, builds still work but the resulting `.dmg` is unsigned and
macOS will block it on first launch with "App can't be opened because it
is not from an identified developer". Quick local fix:

```bash
sudo xattr -rd com.apple.quarantine /Applications/Kaya.app
```

For full signing/notarization setup see Tauri's
[macOS code signing docs](https://v2.tauri.app/distribute/sign/macos/).

## Troubleshooting

**Verify job fails** — run locally:

```bash
bun run format:check
bun run type-check
bun run test
```

**Tag already exists** (re-releasing same version):

```bash
git tag -d v0.4.5
git push origin :refs/tags/v0.4.5
```

Then delete the draft release on GitHub and re-run the workflow.

**Build fails on one platform** — check that platform's job log. Common
causes: Rust compilation, WASM build, missing system deps on Ubuntu.

## Don'ts

- ❌ Don't create or push tags by hand.
- ❌ Don't run multiple releases concurrently.
- ❌ Don't skip the verify step (`--no-verify`, etc.) to "save time".
- ❌ Don't use uppercase or trailing periods in commit subjects — the
  changelog generator preserves them verbatim.
