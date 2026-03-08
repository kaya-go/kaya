# Release Process

## Overview

Kaya uses a **fully automated GitHub Actions workflow** for releases. Everything happens from the GitHub UI - no need to create tags manually!

## Web App Deployment Strategy

We maintain two versions of the web app on GitHub Pages:

1. **Stable Version** (`/`)
   - **URL**: https://kayago.app/
   - **Source**: Latest tagged release
   - **Workflow**: `release.yml`
   - **Details**: Deployed to the root directory.

2. **Next Version** (`/next/`)
   - **URL**: https://kayago.app/next/
   - **Source**: `main` branch (latest commits)
   - **Workflow**: `ci.yml`
   - **Details**: Deployed to the `/next` subdirectory.

**Important**: Both workflows use `keep_files: true` to ensure they don't overwrite each other.

## Creating a Release (Simple!)

1. **Go to GitHub Actions**
   - Navigate to the **Actions** tab on GitHub
   - Select **"Release"** workflow
   - Click **"Run workflow"**

2. **Enter the version**
   - **Version**: Enter version number like `0.1.0` (without the `v` prefix)
   - Click **"Run workflow"**

3. **Wait for the workflow to complete** (~20-30 minutes)
   - ✅ Verifies code quality (formatting, type-check, tests)
   - ✅ Builds desktop apps for Windows, macOS, Linux
   - ✅ Creates git tag automatically (`v0.1.0`)
   - ✅ Creates a **draft** GitHub release with installers

4. **Publish the release**
   - Go to **Releases** tab
   - Find your draft release
   - Review and edit release notes if needed
   - Click **"Publish release"**

That's it! ✨

## What the Workflow Does

### Step 1: Verify (Fast Fail)

Runs quality checks:

- Code formatting check
- TypeScript type checking
- Tests

**If any check fails, the workflow stops immediately** (saves time and CI minutes).

### Step 2: Build Desktop Apps

Builds in parallel for 3 platforms:

- **Ubuntu** → `.deb`, `.AppImage`
- **macOS** → `.dmg` (Universal Binary for Intel & Apple Silicon)
- **Windows** → `.exe`

Each build:

- Installs Rust + wasm-pack
- Compiles `@kaya/deadstones` WASM module
- Builds all packages via `tauri:build`
- Builds Tauri desktop app
- Version info is automatically embedded from package.json

### Step 3: Create Tag & Release

- Creates and pushes git tag `v{version}` to the repository
- Downloads all build artifacts
- Creates **draft** GitHub release
- Attaches all installers
- Generates release notes

## Changelog Generation

The release workflow **automatically generates changelogs** from your commit messages using [Conventional Commits](https://www.conventionalcommits.org/).

**Features:**

- ✅ Generates from conventional commits
- ✅ Automatically detects and links PRs (when merged via squash)
- ✅ Works for both direct commits and PR merges
- ✅ Updates CHANGELOG.md and GitHub release notes

### GitHub PR Settings (Recommended)

To get the best changelog output, configure your repository:

**Settings → General → Pull Requests:**

1. ✅ **Allow squash merging** (ENABLED)
2. **Default to pull request title and commit details**
3. ❌ **Allow merge commits** (DISABLED - optional)
4. ❌ **Allow rebase merging** (DISABLED - optional)

**Why Squash Merge?**

- Creates one clean commit per PR
- PR number automatically added: `feat: new feature (#123)`
- Easier to track in changelog

**PR Title Format:**
When creating PRs, use conventional commit format in the title:

```
feat: add dark mode toggle
fix(sgf): correct parsing bug
docs: update installation guide
```

The PR number will be automatically added when merged!

### Commit Format

Use these prefixes in your commit messages:

- `feat:` - New features (→ **Added** section)
- `fix:` - Bug fixes (→ **Fixed** section)
- `docs:` - Documentation changes
- `style:` - Code style/formatting
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Tests
- `build:` - Build system changes
- `ci:` - CI/CD changes
- `chore:` - Maintenance tasks

### Examples

**Direct commits:**

```bash
feat: add game tree navigation
feat(ui): implement dark mode toggle
fix: resolve board rendering bug
fix(sgf): correct parsing of empty properties
docs: update installation guide
perf: optimize board reconstruction cache
```

**PR merges (squash):**
When merged, GitHub automatically adds the PR number:

```
feat: add game tree navigation (#45)
fix(sgf): correct parsing of empty properties (#46)
```

**Changelog output:**

```markdown
### ✨ Added

- add game tree navigation ([a1b2c3d](../../commit/a1b2c3d) [#45](../../pull/45))
- **ui**: implement dark mode toggle ([e4f5g6h](../../commit/e4f5g6h))

### 🐛 Fixed

- **sgf**: correct parsing of empty properties ([i7j8k9l](../../commit/i7j8k9l) [#46](../../pull/46))
```

### Breaking Changes

Add `!` after the type or include `BREAKING CHANGE:` in the commit body:

```bash
feat!: redesign API for move validation
# or
feat: redesign API for move validation

BREAKING CHANGE: The makeMove() function now returns a Result type
```

### Manual Changelog Preview

To preview the changelog before releasing:

```bash
# Generate changelog from last tag to current HEAD
bun run generate-changelog v0.1.4

# Generate changelog between two tags
bun run generate-changelog v0.1.4 v0.1.5
```

This creates `CHANGELOG-NEW.md` with the generated content.

## Version Numbering

Follow [Semantic Versioning](https://semver.org/):

- `0.1.0` - First release
- `0.1.1` - Bug fixes
- `0.2.0` - New features
- `1.0.0` - First stable release

**Note**: Enter version **without** `v` prefix in the workflow (e.g., `0.1.0`).

## Pre-release Checklist

Before clicking "Run workflow":

- [ ] All features tested locally
- [ ] All tests passing locally (`bun run test`)
- [ ] Code formatted (`bun run format`)
- [ ] No TypeScript errors (`bun run type-check`)
- [ ] Documentation updated
- [ ] Version number decided
- [ ] **All commits follow conventional commit format** (feat:, fix:, etc.)
- [ ] Preview changelog: `bun run generate-changelog <last-tag>`

## Example: Complete Release

```bash
# 1. Make sure your code is ready
git checkout main
git pull origin main

# 2. Test locally
bun run format
bun run type-check
bun run test

# 3. Go to GitHub Actions and run Release workflow
# Enter version: 0.2.0

# 4. Wait for builds to complete

# 5. Go to Releases and publish the draft
```

## Troubleshooting

### Verify job fails

Check locally:

```bash
bun run format:check  # Should pass
bun run type-check    # Should pass
bun run test          # Should pass
```

Fix any issues and try again.

### Build fails on one platform

- Check the Actions log for that specific platform
- Common issues:
  - Rust compilation errors
  - WASM build failures
  - Missing system dependencies (Ubuntu)

### Tag already exists

If you need to re-release the same version:

1. Delete the tag first:
   ```bash
   git tag -d v0.1.0
   git push origin :refs/tags/v0.1.0
   ```
2. Delete the draft release on GitHub
3. Run the workflow again

### Release not created

- Check workflow logs for errors
- Ensure all builds completed successfully
- Check that you have write permissions

## macOS Security Issues

### Problem: "App can't be opened because it is not from an identified developer"

This happens because the app is **not code-signed** by default. macOS blocks unsigned apps.

### Solutions

#### Option 1: Remove Quarantine Flag (Quick Fix for Local Development)

After building or downloading the app:

```bash
# For .app bundle
sudo xattr -rd com.apple.quarantine /Applications/Kaya.app

# For .dmg (mount it first, then run on the .app inside)
sudo xattr -rd com.apple.quarantine /Volumes/Kaya/Kaya.app
```

This removes the quarantine flag and allows the app to run.

#### Option 2: Code Signing (Recommended for Distribution)

To properly sign the app, you need:

1. **Apple Developer Account** ($99/year)
2. **Developer ID Application Certificate** from Apple

**Steps to sign:**

1. **Get your certificate identity:**

   ```bash
   security find-identity -v -p codesigning
   ```

2. **Update tauri.conf.json:**

   ```json
   {
     "bundle": {
       "macOS": {
         "signingIdentity": "Developer ID Application: Your Name (TEAM_ID)"
       }
     }
   }
   ```

3. **Build with signing:**

   ```bash
   bun run tauri:build
   ```

4. **Notarize the app** (required for macOS 10.15+):

   ```bash
   # After build
   xcrun notarytool submit target/release/bundle/macos/Kaya.dmg \
     --apple-id "your@email.com" \
     --password "app-specific-password" \
     --team-id "TEAM_ID" \
     --wait

   # Staple the notarization
   xcrun stapler staple target/release/bundle/macos/Kaya.dmg
   ```

#### Option 3: GitHub Actions with Code Signing

Add secrets to your GitHub repository:

- `APPLE_CERTIFICATE` - Base64-encoded .p12 certificate
- `APPLE_CERTIFICATE_PASSWORD` - Certificate password
- `APPLE_ID` - Your Apple ID
- `APPLE_PASSWORD` - App-specific password
- `APPLE_TEAM_ID` - Your team ID

The workflow will automatically sign and notarize during release builds.

**Note**: For local development, **Option 1** (remove quarantine) is the easiest. For distribution, use **Option 2 or 3**.

## Advanced: Pre-release Versions

For beta/alpha releases:

1. Enter version like: `0.2.0-beta.1`
2. After workflow completes, edit the draft release
3. Check "Set as a pre-release" before publishing

## Notes

- **Draft releases**: Always created as drafts so you can review before public announcement
- **Git tags**: Automatically created and pushed by the workflow
- **Version info**: Embedded from package.json during Tauri build
- **Build time**: ~20-30 minutes for all 3 platforms
- **Parallel builds**: All platforms build simultaneously to save time

## CI Cost Optimization

- Builds only run when manually triggered
- Verify job fails fast if quality checks don't pass
- Caching used for Rust dependencies
- Not triggered on every commit

## What NOT to do

- ❌ Don't create git tags manually
- ❌ Don't push tags to trigger builds
- ❌ Don't run multiple releases simultaneously
- ❌ Don't forget the `v` prefix will be added automatically

## What you CAN do

- ✅ Run the workflow from any branch (usually main)
- ✅ Test builds locally before releasing
- ✅ Edit draft releases before publishing
- ✅ Delete and re-run if something goes wrong
