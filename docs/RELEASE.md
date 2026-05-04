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

Desktop builds: `.deb` + `.AppImage` (Ubuntu), `.dmg` (macOS Universal),
`.exe` (Windows NSIS). All signed for the auto-updater — see
[`specs/2025-12-13-tauri-updater-setup.md`](../specs/2025-12-13-tauri-updater-setup.md).

## Cutting a release

1. **Actions → Release → Run workflow.** Enter version like `0.4.5`
   (no `v` prefix).
2. The workflow:
   - Verifies (format, type-check, tests). Fast-fails if anything
     doesn't pass.
   - Builds in parallel for Ubuntu, macOS, Windows.
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
