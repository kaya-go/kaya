# Architecture

High-level design of Kaya: what it is, the constraints it's built under,
and where the code lives.

For why specific decisions were made — and what was tried before they were
made — see [`specs/`](../specs/).

## What Kaya is

A desktop and web Go (Baduk/Weiqi) app with local AI analysis. One
TypeScript/React frontend serves both targets: a Tauri v2 native shell on
desktop, a PWA in the browser. KataGo runs locally — through ONNX Runtime
(native on desktop, WebGPU/WASM on web) — never against a remote service.

## Design objectives

- **Local-first.** Everything works offline once assets are downloaded.
  No cloud calls in the hot path. Game files live on disk (desktop) or
  IndexedDB (web).
- **One frontend, two targets.** Web and desktop share a single React tree
  and component library. The differences are platform shims (file save,
  audio, AI engine), not parallel UIs.
- **Cross-platform without compromise.** Windows, macOS, Linux desktop +
  any modern browser. Mobile/tablet web is responsive, not a separate
  app — see [RESPONSIVE.md](RESPONSIVE.md).
- **Fast navigation in big games.** Joseki dictionaries with 60k+ nodes
  and 300-move pro games must respond in < 20 ms — see
  [PERFORMANCE.md](PERFORMANCE.md).
- **Static, predictable assets.** No symlinks, no runtime URL gymnastics,
  no surprise CSS injection — see [Assets](#assets) and
  [THEMES.md](THEMES.md).

## Stack

| Layer                     | Choice                                                             |
| ------------------------- | ------------------------------------------------------------------ |
| Runtime / package manager | Bun                                                                |
| UI framework              | React 19 + TypeScript 5                                            |
| Bundler                   | Rsbuild                                                            |
| Desktop shell             | Tauri v2 (Rust backend)                                            |
| Native AI inference       | `ort` (Rust ONNX Runtime)                                          |
| Web AI inference          | `onnxruntime-web` (WebGPU / WASM)                                  |
| AI model                  | KataGo via ONNX                                                    |
| Board recognition         | Moku AI (RT-DETR) + classic CV pipeline                            |
| Go logic                  | TypeScript ports from [Sabaki](https://github.com/SabakiHQ/Sabaki) |

## Monorepo layout

```
kaya/
├── apps/
│   ├── desktop/         Tauri v2 — Rust backend + React frontend
│   └── web/             Pure React PWA
└── packages/
    ├── goboard/             Core Go logic (board, captures, ko, scoring)
    ├── sgf/                 SGF parse / stringify
    ├── gametree/            Immutable tree with structural sharing
    ├── shudan/              React board component (rendering)
    ├── boardmatcher/        Pattern matching, joseki/move naming
    ├── deadstones/          Dead-stone Monte Carlo (Rust → WASM)
    ├── ai-engine/           KataGo via ONNX Runtime + GTP protocol
    ├── board-recognition/   Photo → SGF (classic CV + Moku AI)
    ├── i18n/                react-i18next + 8 locales
    ├── themes/              Board theme system + 6 built-in themes
    ├── game-library/        IndexedDB-backed SGF storage
    ├── platform/            File save, clipboard, Tauri detection
    ├── gtp/                 GTP protocol (legacy, folded into ai-engine)
    └── ui/                  Shared React components, contexts, hooks
```

## Data flow

```
User input
   ↓
React component (in @kaya/ui or @kaya/shudan)
   ↓
GameTreeContext  ← single source of truth
   ↓
Core logic (@kaya/goboard, @kaya/gametree)
   ↓
File I/O (@kaya/sgf) | AI engine (@kaya/ai-engine)
   ↓
Tauri command (desktop) | IndexedDB / fetch (web)
```

## Key invariants

### 1. `GameTreeContext` is the single source of truth

Lives at [`packages/ui/src/contexts/GameTreeContext.tsx`](../packages/ui/src/contexts/GameTreeContext.tsx).
Owns game state, board reconstruction, SGF parsing, navigation. Apps
consume via the `useGameTree()` hook. The provider is thin — business
logic is broken into per-concern hooks (`useGameTreeState`,
`useBoardState`, `useGameNavigation`, `useGameModification`,
`useEditMode`, `useScoring`, `useAIAnalysis`, `useAutoSave`,
`useGameTreeUndoRedo`).

### 2. Board reconstruction goes through an LRU cache

Without the cache, jumping to move 300 in a long game requires replaying
all moves from scratch (50–200 ms). With the cache: < 5 ms. See
[PERFORMANCE.md](PERFORMANCE.md). Always call `clearAllCaches()` when a
new game is loaded.

### 3. AI engines are singletons, lifecycle-managed

Web: ONNX Runtime in a Web Worker. Desktop: native Rust ORT or PyTorch
sidecar (Linux GPU). Lifecycle owned by [`AIEngineContext`](../packages/ui/src/contexts/AIEngineContext.tsx);
analysis state by [`AIAnalysisContext`](../packages/ui/src/contexts/AIAnalysisContext.tsx).

The default backend is **`auto`** — at provider mount time
[`probeEnvironment`](../packages/ai-engine/src/auto-config.ts) detects
Tauri / WebGPU / shader-f16 / PyTorch-sidecar availability and
[`pickConfig`](../packages/ai-engine/src/auto-config.ts) returns a
backend chain plus a one-line reasoning string. The status pill
([`AIStatusPill`](../packages/ui/src/components/ai/AIStatusPill.tsx))
surfaces that reasoning to the user. Manual overrides live behind the
**Advanced** disclosure in the AI settings modal — see
[`specs/2026-05-04-ai-analysis-mcts-first.md`](../specs/2026-05-04-ai-analysis-mcts-first.md).

Fallback chain — if a fast path fails, downgrade transparently:

- Web: WebGPU → WASM. Warm-up validation catches silent WebGPU failures;
  runtime try/catch catches thrown ones.
- Desktop: GPU → CPU.

The engine is disposed when the AI feature is turned off, freeing model
memory.

### 4. AnalysisQueue is the single coordination point

Both live (per-position) and batch (full-game) analysis go through one
[`AnalysisQueue`](../packages/ai-engine/src/queue.ts) owned by
`AIEngineContext`. It serializes engine access (one in-flight call at a
time), implements priority lanes (live preempts batch transparently;
new live also drops in-flight live), centralizes cancellation
(`cancel(id)` / `cancelTag('full-game')`), and exposes a monotonic LRU
cache that's shared with `GameTreeContext.analysisCache` so SGF `KA`
persistence Just Works against the same Map.

`useLiveAnalysis` and `useFullGameAnalysis` are thin submitters — they
no longer carry their own coordination state.

### 5. MCTS lives close to the model

Desktop: full MCTS loop runs in native Rust (`onnx_analyze_mcts`
command), zero IPC overhead per playout. Web: MCTS runs in the Web Worker
that owns the ORT session, batching inference across playouts.

The native ONNX engine keeps **one session per engine** with the model's
natural dynamic axes — see [`specs/2026-05-03-onnx-engine-single-session.md`](../specs/2026-05-03-onnx-engine-single-session.md). On macOS, CoreML EP currently rejects the
KataGo b28 model and runs on CPU — see [`specs/2026-05-03-coreml-ep-falls-back-to-cpu.md`](../specs/2026-05-03-coreml-ep-falls-back-to-cpu.md).
WebGPU is unavailable in Tauri's webview on Mac/Linux — see
[`specs/2026-05-03-webgpu-unavailable-in-tauri-webview.md`](../specs/2026-05-03-webgpu-unavailable-in-tauri-webview.md).

### 5. Native audio bypasses the webview on desktop

Desktop uses **rodio** (with the `lewton` Vorbis decoder feature) directly
instead of HTML `<audio>` — WebKitGTK + GStreamer is broken in AppImage
builds. Tauri commands: `audio_init`, `audio_play_sound`, `audio_check`.
Code in [`apps/desktop/src-tauri/src/audio.rs`](../apps/desktop/src-tauri/src/audio.rs).
Android stubs in `audio_stub.rs`.

### 6. Tauri v2 imports

```ts
import { invoke } from '@tauri-apps/api/core'; // ✅
// not @tauri-apps/api/tauri (that's v1)
```

### 7. Keyboard shortcuts are centralized and customizable

[`packages/ui/src/hooks/useKeyboardShortcuts.ts`](../packages/ui/src/hooks/useKeyboardShortcuts.ts).
Add new IDs to the `ShortcutId` union and `DEFAULT_SHORTCUTS`, and add
`shortcuts.{id}` translations to every locale.

## Assets

Kaya **never** uses symlinks for assets. Symlinks break on Windows and
in GitHub Actions artifact uploads. We copy.

[`scripts/copy-assets.ts`](../scripts/copy-assets.ts) is a cross-platform
TypeScript script that runs automatically as part of `bun run dev`,
`bun run build`, and `bun run build:web`. It copies:

- Sounds (`public/sounds/*.mp3`) → `apps/{web,desktop}/public/assets/`
- AI models (`packages/ai-engine/models/*`) → `apps/{web,desktop}/public/models/`
- Web assets (`public/manifest.json`, icons) → `apps/web/public/`

To add an asset: drop it in `public/` (or the owning package), update
`scripts/copy-assets.ts`, run `bun run copy-assets`. If you see "file
not found" in production, the copy step is the first place to look.

## Core types

```ts
type Sign = -1 | 0 | 1; // White, Empty, Black
type Vertex = [number, number]; // [x, y]
type SignMap = Sign[][]; // 2D board

// SGF properties are always arrays
const comment = node.data.C?.[0] ?? '';
const move = node.data.B?.[0] ?? node.data.W?.[0];
```

## Common pitfalls

- **`Sign` type safety** — always cast explicitly as `Sign`.
- **SGF properties are arrays** — `node.data.C?.[0]`, not `node.data.C`.
- **Workspace deps** — always `workspace:*` in `package.json`.
- **Cache invalidation** — `clearAllCaches()` on every game load.
