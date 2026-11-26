# Kaya — Project Instructions

## Project Overview

**Kaya**: Desktop + Web Go (Baduk/Weiqi) game application with AI analysis.
**Stack**: Bun + TypeScript + Tauri v2 + React 19 + Rsbuild.
**Architecture**: Monorepo with 13 core packages + 2 apps.

## Behavior Rules

1. **Compilation testing** — Use `bun run type-check` or `bun run build:packages` to verify changes.
   `type-check` is not a superset: apps and `@kaya/ui` resolve the other packages through their
   built `dist` types, so a change to a package's public types only shows up under
   `build:packages`. Run both when you touch a type that crosses a package boundary.
2. **Git commits** — **Never** commit automatically unless explicitly asked. When asked to commit, the request applies **only to the work completed so far**, not to any future tasks in the conversation.
3. **Responsive design** — All new UI components, layouts, and UX patterns **must** be adapted for:
   - Desktop screens
   - Mobile and tablet screens (portrait orientation)
   - Landscape orientation on mobile and tablet devices

   See [RESPONSIVE.md](docs/RESPONSIVE.md) for breakpoints and patterns.

4. **Internationalization (i18n)** — All user-facing strings **must** be localized:
   - Use translation keys via `useTranslation()` hook from `react-i18next`
   - Add new keys to `packages/i18n/src/locales/en.json` first
   - Ensure translations exist for **all 8 supported languages**: `en`, `zh`, `ko`, `ja`, `fr`, `de`, `es`, `it`
   - Regularly verify all translation files have complete coverage
   - Never hardcode user-visible text in components

5. **Documentation maintenance** — `docs/` is a static snapshot of the project as it is now; `specs/` is the timestamped evolution log (decisions, learnings, things tried).
   - Update `docs/` when structural facts change: package layout, key invariants, schemas, data flow. Touch:
     - `CLAUDE.md` — monorepo layout, architecture points, key patterns
     - `docs/ARCHITECTURE.md` — design objectives, package list, invariants
     - `docs/THEMES.md`, `docs/I18N.md`, `docs/RESPONSIVE.md`, etc. when their domain changes
   - Add a new file in `specs/` (named `YYYY-MM-DD-kebab-name.md`) when shipping a non-trivial change with rationale, alternatives considered, or learnings worth recording. See [specs/README.md](specs/README.md) for the convention.
   - Don't write specs for routine refactors. Don't keep status/progress trackers in `docs/`.

   Do this proactively — don't wait to be asked.

## Essential Commands

```bash
# Development
bun run dev            # Desktop app (Tauri)
bun run dev:web        # Web app (port 3000) - RUN MANUALLY ONLY

# Building
bun run build          # Desktop production
bun run build:web      # Web production
bun run build:packages # Rebuild all packages

# Quality
bun run format         # Prettier + markdownlint
bun run lint           # oxlint (React hooks rules)
bun run type-check     # All packages + apps
bun run clean          # Remove build artifacts

# Testing
bun run test           # Unit tests (bun test)
bun run test:e2e       # E2E tests (Playwright)
```

## Documentation Index

Static snapshot:

- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — design objectives, monorepo layout, key invariants, asset strategy
- **[docs/THEMES.md](docs/THEMES.md)** — board theme system
- **[docs/I18N.md](docs/I18N.md)** — translation workflow
- **[docs/RESPONSIVE.md](docs/RESPONSIVE.md)** — breakpoints and touch interactions
- **[docs/PERFORMANCE.md](docs/PERFORMANCE.md)** — navigation performance
- **[docs/AI_ANALYSIS_FORMAT.md](docs/AI_ANALYSIS_FORMAT.md)** — SGF `KA` property
- **[docs/RELEASE.md](docs/RELEASE.md)** — release workflow
- **[docs/BRAND_GUIDE.md](docs/BRAND_GUIDE.md)** — visual identity

Evolution log:

- **[specs/](specs/)** — timestamped notes on decisions, alternatives, learnings (start with [specs/README.md](specs/README.md))

## Architecture

### Monorepo Layout

```
kaya/
├── apps/
│   ├── desktop/         # Tauri v2 (Rust backend + React frontend)
│   └── web/             # Pure React (browser-based PWA)
└── packages/
    ├── goboard/         # Core Go logic
    ├── sgf/             # SGF parser
    ├── gametree/        # Immutable tree with structural sharing
    ├── shudan/          # React board component
    ├── boardmatcher/    # Pattern matching
    ├── deadstones/      # Rust/WASM Monte Carlo
    ├── ai-engine/       # KataGo via ONNX Runtime + GTP protocol
    ├── board-recognition/ # Photo → SGF (classic CV + Moku AI RT-DETR)
    ├── i18n/            # Internationalization (8 languages)
    ├── themes/          # Board theme system (6 built-in themes)
    ├── game-library/    # IndexedDB-based SGF file storage
    ├── platform/        # File save, clipboard, Tauri detection
    └── ui/              # Shared React components, contexts, and hooks
```

### Key Architecture Points

**1. GameTreeContext is the Single Source of Truth** (`packages/ui/src/contexts/GameTreeContext.tsx`)

- Manages game state, board reconstruction, SGF parsing, navigation
- Consume via `useGameTreeSelector` or its domain hooks (`useGameTreeBoard`, ...): they read a stable store through `useSyncExternalStore`, so a component only re-renders when its slice changes. `useGameTree()` re-renders on every change
- Callbacks from selectors keep one identity for good and call the latest version, so never use one as an effect dep to detect a state change. Select only what renders: a domain hook that exposes `currentBoard` re-renders on every navigation, and in a root-level component that drags the whole tree. For a value needed only in an event handler, use `useGameTreeGetter()`
- Rebuilds positions through the LRU position cache it shares with AI analysis (see Performance Patterns)
- Navigation in `useGameNavigation` moves through `moveTo`, which updates the current-node ref at once, so two calls in one frame compose (Home then End). A navigation callback reads the node from that ref (`getCurrentNode()`), never from a ref refreshed on render. See [`specs/2026-11-20-navigation-composes-within-a-frame.md`](specs/2026-11-20-navigation-composes-within-a-frame.md)
- Modular hook architecture: `useGameTreeState`, `useBoardState`, `useGameNavigation`, `useGameModification`, `useEditMode`, `useScoring`, `useAIAnalysis`, `useAutoSave`, `useGameTreeUndoRedo`

**2. AI Engine Lifecycle** (`packages/ui/src/contexts/AIEngineContext.tsx`)

- Singleton engine + `AnalysisQueue` managed via `AIEngineProvider` / `useAIEngine()`
- Default backend `'auto'`: [`probeEnvironment`](packages/ai-engine/src/auto-config.ts) + [`pickConfig`](packages/ai-engine/src/auto-config.ts) detect Tauri / host OS / WebGPU / shader-f16 at mount and return a backend chain, a model precision and a `reason` id (`AutoPickReason`), which the status pill renders as the translated `aiConfig.backendReason.<reason>` when auto's preferred backend is the one that came up
- Precision follows the backend, never the user: `pickQuantization` picks the fastest precision for the backend the engine will land on, and the model library surfaces it as a **Best for your setup** badge via [`useAutoPick`](packages/ui/src/hooks/useAutoPick.ts). The variant list is a download-size control (280/140/72 MB), not a quality dial — fp16/uint8 are lossy transforms of the same weights and can only lose accuracy. Every cell in `pickQuantization` carries how it is known (MEASURED / UNTESTED / DATED / RUNTIME-CHECKED); change one only with a measurement on that platform. See [`specs/2026-09-12-precision-follows-the-backend.md`](specs/2026-09-12-precision-follows-the-backend.md)
- Status surfaced as a single discriminated union `EngineStatus` (idle / probing / loading-model / initializing / ready / error) — the [`AIStatusPill`](packages/ui/src/components/ai/AIStatusPill.tsx) reads it directly
- Fallback chain runner extracted into [`engineChain.ts`](packages/ui/src/contexts/ai/engineChain.ts) with warm-up validation (catches silent WebGPU/CoreML fp16 failures); model loading helpers in [`engineLoader.ts`](packages/ui/src/contexts/ai/engineLoader.ts)
- The engine key is model + backend + batch size, not board size: one session serves every size, and WebGPU graph capture swaps its session inside `OnnxEngine`. If that swap fails, `Engine.onEngineLost` makes the provider dispose the engine and the auto-init effect reruns the chain. See [`specs/2026-11-04-engine-lost-reruns-chain.md`](specs/2026-11-04-engine-lost-reruns-chain.md)
- Manual overrides (Backend selector, WebGPU batch size) live behind the **Advanced** disclosure in `KayaConfigAnalysisTab`

**2b. AI Analysis & MCTS** (`packages/ui/src/contexts/AIAnalysisContext.tsx`)

- All analysis goes through one [`AnalysisQueue`](packages/ai-engine/src/queue.ts): priority lanes via `SubmitOptions` on `submit`/`submitBatch` (live preempts batch transparently; lane and cancel tag are scheduling, not part of `AnalysisRequest`), monotonic cache shared with `GameTreeContext.analysisCache` (so SGF `KA` persistence keeps working; the queue never evicts from it, its owner clears it per game), unified cancellation via `cancel(id)` / `cancelTag('full-game')`. A cancelled request writes nothing to the cache, even when the engine finishes it anyway (the web worker cannot stop a batch); only a batch preempted to be re-queued keeps its results. See [`specs/2026-11-26-submit-options-scheduling.md`](specs/2026-11-26-submit-options-scheduling.md)
- A cached result answers a request only if this engine version computed it (`KA` saved by another `ANALYSIS_ENGINE_VERSION`, every file before 0.5.0, shows in the graph and report but is run again; bump the version when a change to the network inputs or search makes earlier results wrong), it searched as deep and, when the request forces a move (`includeMove`), explored that move: engines list their top policy moves visited or not, and one with `visits: 0` has no win rate or score of its own (engines leave them out). The rule lives in one place, `AnalysisCache.answers` ([`analysis-cache.ts`](packages/ai-engine/src/analysis-cache.ts)). See [`specs/2026-11-09-cache-explored-move.md`](specs/2026-11-09-cache-explored-move.md)
- `useLiveAnalysis` and `useFullGameAnalysis` are thin queue submitters — no module-level guard state
- Desktop: full MCTS loop runs in native Rust (`onnx_analyze_mcts` command) — zero IPC overhead. A search is aborted by a request id Rust issues, never by a shared flag, and is not started once its signal is aborted. The `ENGINE` lock recovers from a panic through `lock_or_reset`; validate command inputs before taking it. See [`specs/2026-11-20-native-search-abort-and-lock.md`](specs/2026-11-20-native-search-abort-and-lock.md)
- Web: MCTS runs in Web Worker with batched inference; full-game uses `queue.submitBatch()` for the policy-only fast path
- Heatmap metric toggle: policy / ΔWin% / ΔScore. Colors (and the policy text) show each move's share of the search's visits, or the policy prior when no search ran. `MoveSuggestion.probability` is always the prior; the share comes from `visits`. See [`specs/2026-11-20-probability-prior-and-shared-cache.md`](specs/2026-11-20-probability-prior-and-shared-cache.md)
- Next move display: compares played move to AI's top suggestion with rank and delta metrics
- See [`specs/2026-05-04-ai-analysis-mcts-first.md`](specs/2026-05-04-ai-analysis-mcts-first.md) for the rationale

**3. Asset Management: No Symlinks!**

```bash
# NEVER create symlinks - breaks on Windows + CI
bun run copy-assets  # Runs automatically in build
```

- onnxruntime-web's `.wasm` files ship under `wasm/<ort version>/` ([`scripts/ort-web.ts`](scripts/ort-web.ts)) and the engines append `ort.env.versions.web` to the wasm root, so bumping ORT is a range change plus a root `bun install`, nothing else
- The web app has one service worker, a template ([`apps/web/sw/sw.js`](apps/web/sw/sw.js)) filled per build and registered by an inline script in `apps/web/index.html`. It adds the COOP/COEP headers GitHub Pages cannot send (no more `coi-serviceworker`), so any response path must go through `withIsolationHeaders`. Cache names carry the scope (`kaya|<scope>|…`) because `/` and `/next/` share Cache Storage. Never delete caches outside that prefix (`kaya-moku-models` holds the 80 MB Moku model)

**4. Keyboard Shortcuts System** (`packages/ui/src/hooks/useKeyboardShortcuts.ts`)

- Centralized, user-customizable shortcuts
- Use `useKeyboardShortcuts()` hook from context
- Add new shortcuts to `ShortcutId` type and `DEFAULT_SHORTCUTS`
- Add translations under `shortcuts.{id}` in all locale files
- A global key handler checks `shouldIgnoreShortcut(e)` (typing, or a dialog open): behind a dialog only fullscreen works. A new dialog registers through `useCloseOnBack`

**5. Native Audio System** (`apps/desktop/src-tauri/src/audio.rs`)

- Desktop uses **rodio** with **lewton** OGG/Vorbis decoder — bypasses broken WebKitGTK/GStreamer in AppImage
- Platform-native backends: ALSA/PulseAudio (Linux), CoreAudio (macOS), WASAPI (Windows)
- Tauri commands: `audio_init`, `audio_play_sound`, `audio_check`
- Android: stub implementation (`audio_stub.rs`)
- The output opens with rodio's ~50 ms buffer clamped to the device's range: cpal 0.18 rejects an out-of-range size, and Bluetooth outputs on macOS cap it at 1024 frames. See [`specs/2026-11-20-audio-buffer-range.md`](specs/2026-11-20-audio-buffer-range.md)

**6. Tauri v2 Imports**

```typescript
import { invoke } from '@tauri-apps/api/core'; // NOT @tauri-apps/api/tauri
```

## Core Types

```typescript
type Sign = -1 | 0 | 1; // White, Empty, Black
type Vertex = [number, number]; // [x, y] coordinates
type SignMap = Sign[][]; // 2D board state

// SGF properties are always arrays
const comment = node.data.C?.[0] ?? '';
const move = node.data.B?.[0] ?? node.data.W?.[0];
```

## Performance Patterns

**Position Cache** (`packages/ui/src/utils/gameCache.ts`): board, history and next player per node, one replay for navigation and analysis

- Rebuild a position with `reconstructBoard`, `reconstructPosition`, `reconstructAnalysisState` or `mapAnalysisPath`, never with a hand-written replay loop
- UI `currentPlayer` (`useBoardState` → `GameTreeContext`) is the Sign projection of that same `nextToPlay` — do not re-derive side-to-play from `moveNumber` parity
- Build an engine request for a node with `buildAnalysisRequest`: board, history, side to play and ko together, on the game's own board (the engines put it in a square network input, plane 0 marking its points; decode their moves with `analysisBoardSize`, see docs/ARCHITECTURE.md §9). The analysis helpers take the game's dimensions, never a size: pass `gameInfo`
- Valid for one `GameTree` instance: any other tree clears it, so tree writers have nothing to invalidate
- `reconstructBoard` / `reconstructPosition` return the cached board by reference, so treat it as read-only and `.clone()` before mutating

**Avoid Pattern Matching in Hot Paths**: `findPatternInMove()` is expensive (50-100ms)

**Direct State Updates**: No `startTransition()` for instant navigation

## File Size Guidelines

Keep files small for readability and maintainability. Maximum line counts per file type:

| File Type                        | Target   | Max | Action if exceeded                                       |
| -------------------------------- | -------- | --- | -------------------------------------------------------- |
| React components (`.tsx`)        | 100–250  | 400 | Extract sub-components into sibling files or a folder    |
| Hooks / Contexts (`.ts`, `.tsx`) | 100–300  | 500 | Extract helper functions, split context logic into hooks |
| CSS (`.css`)                     | 100–250  | 400 | Split alongside component splits, one CSS per component  |
| Pure logic (`.ts`)               | 150–350  | 500 | Break into thematic modules                              |
| Tests                            | Flexible | —   | Split by feature area if unwieldy                        |

**Splitting strategy:**

- **Components**: Convert `Component.tsx` → `Component/index.tsx` + `Component/SubPart.tsx` + `Component/SubPart.css`
- **Contexts**: Keep providers thin — extract business logic into dedicated hooks
- **Monolithic `index.ts`**: Split into thematic modules, re-export from index
- **CSS**: Each sub-component gets its own CSS file; never have a single CSS > 400 lines

**Rule**: When creating or modifying a file, check its line count. If it exceeds the max, refactor before merging.

## Common Pitfalls

1. **Sign Type Safety**: Always cast explicitly as `Sign`
2. **SGF Properties Are Arrays**: `node.data.C?.[0]` not `node.data.C`
3. **Workspace Dependencies**: Always use `workspace:*` in package.json
4. **Cache Invalidation**: Call `clearAllCaches()` when loading new game
5. **Tauri Plugin Versions**: Bump `@tauri-apps/plugin-*` together with its `tauri-plugin-*` crate (same major.minor) — `tauriVersions.test.ts` enforces it
6. **Lenient SGF Parser**: `parse` turns prose into a node. Content that must be a game goes through `parseStrict` (`@kaya/sgf`), which throws `SgfValidationError`; show the failure with the formatters in `packages/ui/src/utils/sgfLoadErrors.ts`. Content already in the library (open, duplicate, ZIP restore, save over a collection) goes through `parseTolerant` / `validation: 'tolerant'` instead: v0.4.18 stored files `parseStrict` refuses
7. **SGF Bytes and Forms**: decode file bytes with `decodeSgf` (`@kaya/sgf`, honours `CA`), never `file.text()` / `readTextFile`. After `sgfNodeToGameTreeNode`, point lists hold one point per value and a pass is always `B[]`/`W[]` (never `tt`)
8. **Desktop CSP**: the page runs under `app.security.csp` (`tauri.conf.json`), also sent by the desktop dev server. A new remote host fetched from the page needs a `connect-src` entry; never add `'unsafe-eval'`

## Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add new feature
fix: resolve bug
docs: update documentation
refactor: code restructuring
perf: performance improvements
chore: maintenance tasks
```

With scope (optional): `feat(ui): add dark mode toggle`

**IMPORTANT**:

- Always use **lowercase** for the subject (e.g., `feat: add new feature`, NOT `feat: Add new feature`).
- Keep the subject concise (under 72 characters if possible).

---

**Remember**: This is a Go game application. Prioritize clarity and usability in all UI decisions.
