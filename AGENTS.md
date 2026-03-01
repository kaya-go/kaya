# Agent Instructions for Kaya

## Project Overview

**Kaya**: Desktop + Web Go (Baduk/Weiqi) game application with AI analysis  
**Stack**: Bun + TypeScript + Tauri v2 + React 19 + Rsbuild  
**Architecture**: Monorepo with 14 core packages + 2 apps

## Agent Behavior Rules

1. **Compilation Testing** - Use `bun run type-check` or `bun run build:packages` to verify changes.
2. **Git Commits** - **NEVER** commit changes automatically unless explicitly asked. When the user asks to commit, it applies **only to the work completed so far**, not to any future tasks in the conversation.
3. **Responsive Design** - All new UI components, layouts, and UX patterns **must** be adapted for:
   - Desktop screens
   - Mobile and tablet screens (portrait orientation)
   - Landscape orientation on mobile and tablet devices

   Refer to [MOBILE_RESPONSIVE.md](docs/MOBILE_RESPONSIVE.md) for breakpoints and implementation patterns.

4. **Internationalization (i18n)** - All user-facing strings **must** be localized:
   - Use translation keys via `useTranslation()` hook from `react-i18next`
   - Add new keys to `packages/i18n/src/locales/en.json` first
   - Ensure translations exist for **all 8 supported languages**: `en`, `zh`, `ko`, `ja`, `fr`, `de`, `es`, `it`
   - Regularly verify all translation files have complete coverage
   - Never hardcode user-visible text in components

5. **Documentation Maintenance** - When making structural changes (adding/removing/moving packages, renaming files, changing architecture), **always update** the relevant documentation files:
   - `AGENTS.md` - Monorepo layout, architecture points, key patterns
   - `docs/PROJECT_STATE.md` - Package structure, feature list
   - `docs/DEVELOPER_GUIDE.md` - Monorepo structure diagram, data flow
   - `docs/I18N.md` - Translation file locations (if i18n paths change)
   - Any other doc that references moved/renamed/restructured code

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
bun run type-check     # All packages + apps
bun run clean          # Remove build artifacts
```

## Documentation Index

- **[PROJECT_STATE.md](docs/PROJECT_STATE.md)** - Current status and features
- **[DEVELOPER_GUIDE.md](docs/DEVELOPER_GUIDE.md)** - Workflows and debugging
- **[USER_GUIDE.md](docs/USER_GUIDE.md)** - End-user documentation
- **[THEMES.md](docs/THEMES.md)** - Board theme system
- **[ASSET_MANAGEMENT.md](docs/ASSET_MANAGEMENT.md)** - No symlinks! Copy-based assets
- **[PERFORMANCE.md](docs/PERFORMANCE.md)** - Navigation performance guide
- **[MOBILE_RESPONSIVE.md](docs/MOBILE_RESPONSIVE.md)** - Mobile/tablet layout and touch interactions
- **[I18N.md](docs/I18N.md)** - Internationalization guidelines and translation workflow

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
    ├── board-recognition/ # Photo → SGF (classic CV + Moku AI)
    ├── i18n/            # Internationalization (8 languages)
    ├── themes/          # Board theme system (6 built-in themes)
    ├── game-library/    # IndexedDB-based SGF file storage
    ├── platform/        # File save, clipboard, Tauri detection
    └── ui/              # Shared React components (GameTreeContext)
```

### Key Architecture Points

**1. GameTreeContext is the Single Source of Truth** (`packages/ui/src/GameTreeContext.tsx`)

- Manages game state, board reconstruction, SGF parsing, navigation
- All apps consume via `useGameTree()` hook
- Uses LRU board cache for performance

**2. AI Engine Lifecycle** (`packages/ui/src/components/ai/`)

- Lazy load engine only when analysis mode enabled
- Dispose engine to free resources when disabled
- Runs in Web Worker (no UI freeze)

**3. Asset Management: No Symlinks!**

```bash
# NEVER create symlinks - breaks on Windows + CI
bun run copy-assets  # Runs automatically in build
```

**4. Keyboard Shortcuts System** (`packages/ui/src/hooks/useKeyboardShortcuts.ts`)

- Centralized, user-customizable shortcuts
- Use `useKeyboardShortcuts()` hook from context
- Add new shortcuts to `ShortcutId` type and `DEFAULT_SHORTCUTS`
- Add translations under `shortcuts.{id}` in all locale files

**5. Tauri v2 Imports**

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

**Board Cache**: Essential for large games (300+ moves)

```typescript
const boardCache = new Map<string, GoBoard>(); // 1000 entries max
```

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
