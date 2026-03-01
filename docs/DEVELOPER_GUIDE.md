# Developer Guide

## Quick Start

```bash
# 1. Install dependencies
bun install

# 2. Start development
bun run dev           # Desktop app (Tauri)
bun run dev:web       # Web app at http://localhost:3000
```

## Project Commands

### Development

```bash
bun run dev               # Start desktop app (Tauri)
bun run dev:web           # Start web app dev server
bun run tauri:dev         # Start Tauri with hot reload
```

### Building

```bash
bun run build             # Build desktop app
bun run build:web         # Build web app for production
bun run build:packages    # Build all library packages
bun run tauri:build       # Build complete Tauri app with installer
```

### Android (Experimental)

```bash
bun run android:setup     # Download ONNX Runtime Android libraries
bun run android:dev       # Run on connected device/emulator
bun run android:build     # Build release APK
```

> See [apps/desktop/src-tauri/ANDROID.md](../apps/desktop/src-tauri/ANDROID.md) for detailed setup instructions.

### Quality

```bash
bun run format            # Format code with Prettier + markdownlint
bun run format:check      # Check formatting without changes
bun run type-check        # TypeScript type checking across all packages
```

### Maintenance

```bash
bun run clean             # Clean all build artifacts and caches
bun run copy-assets       # Copy assets to app directories
```

## Architecture

### Monorepo Structure

```
kaya/
├── apps/
│   ├── desktop/            # Tauri desktop app
│   │   ├── src/            # React frontend
│   │   ├── src-tauri/      # Rust backend
│   │   └── rsbuild.config.ts
│   └── web/                # Web app (PWA)
│       ├── src/
│       └── rsbuild.config.ts
└── packages/
    ├── goboard/            # Go board logic
    ├── sgf/                # SGF parser
    ├── gametree/           # Game tree structure
    ├── shudan/             # Board React component
    ├── boardmatcher/       # Pattern matching
    ├── deadstones/         # Dead stone detection (Rust/WASM)
    ├── ai-engine/          # AI Analysis (KataGo/ONNX) + GTP protocol
    ├── board-recognition/  # Photo → SGF (classic CV + Moku AI)
    ├── i18n/               # Internationalization (8 languages)
    ├── themes/             # Board theme system (6 themes)
    ├── game-library/       # IndexedDB-based SGF file storage
    ├── platform/           # File save, clipboard, Tauri detection
    └── ui/                 # Shared React components
```

### Data Flow

```
User Interaction
    ↓
React Component (@kaya/ui or @kaya/shudan)
    ↓
GameTreeContext (state management)
    ↓
Core Logic (@kaya/goboard, @kaya/gametree)
    ↓
File I/O (@kaya/sgf) or AI (@kaya/ai-engine)
    ↓
Tauri Backend (desktop) or Browser Storage (web)
```

## Adding a New Feature

### 1. Update Core Logic (if needed)

```typescript
// packages/goboard/src/index.ts
export class GoBoard {
  myNewMethod(): boolean {
    return true;
  }
}
```

### 2. Add React Component

```typescript
// packages/ui/src/components/MyFeature.tsx
import { useGameTree } from '../GameTreeContext';

export const MyFeature: React.FC = () => {
  const { board } = useGameTree();
  return <div>{/* UI */}</div>;
};
```

### 3. Build and Test

```bash
bun run build:packages
bun run dev        # Test Desktop
bun run dev:web    # Test Mobile/Tablet (Resize browser or use DevTools)
```

## Working with Tauri

### Adding a Tauri Command

**1. Define Rust Function:**

```rust
// apps/desktop/src-tauri/src/commands.rs
#[tauri::command]
pub async fn my_command(param: String) -> Result<String, String> {
    Ok(format!("Received: {}", param))
}
```

**2. Register Command:**

```rust
// apps/desktop/src-tauri/src/main.rs
tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![my_command])
```

**3. Call from Frontend:**

```typescript
import { invoke } from '@tauri-apps/api/core';

const result = await invoke<string>('my_command', { param: 'hello' });
```

## Package Development

### Creating a New Package

```bash
mkdir -p packages/my-package/src
```

**package.json:**

```json
{
  "name": "@kaya/my-package",
  "version": "0.1.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "type-check": "tsc --noEmit"
  }
}
```

### Using Internal Packages

```json
{
  "dependencies": {
    "@kaya/goboard": "workspace:*"
  }
}
```

## Debugging

### Web App

1. Open browser DevTools (F12)
2. Use React DevTools extension
3. Check console for errors

### Desktop App

**Frontend:**

- DevTools open automatically in dev mode
- Or use `Ctrl+Shift+I` / `Cmd+Option+I`

**Rust Backend:**

```bash
RUST_LOG=debug bun run dev
```

### Cache Inspection

In browser console:

```javascript
// Check cache sizes
localStorage.getItem('kaya-analysis-cache');
```

## Common Tasks

### Modifying GameTreeContext

`GameTreeContext.tsx` is the central state manager. Before modifying:

1. Understand the data flow
2. Check board cache in `gameCache.ts`
3. Test with large games (300+ moves)

### Adding Keyboard Shortcuts

Kaya uses a centralized keyboard shortcuts system with user-customizable bindings.

**Location:** `packages/ui/src/hooks/useKeyboardShortcuts.ts`

**Adding a new shortcut:**

1. Add the shortcut ID to the `ShortcutId` type
2. Add default binding in `DEFAULT_SHORTCUTS`
3. Add translation key in all locale files under `shortcuts.{id}`
4. Use `matchesShortcut(event, 'your.shortcutId')` in your component

```typescript
// In useKeyboardShortcuts.ts
export type ShortcutId =
  | 'nav.back'
  | 'your.newShortcut'; // Add your new shortcut

const DEFAULT_SHORTCUTS: Record<ShortcutId, ...> = {
  'your.newShortcut': {
    category: 'board',
    defaultBinding: createBinding('x'),
  },
};

// In your component
const { matchesShortcut } = useKeyboardShortcuts();

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (matchesShortcut(e, 'your.newShortcut')) {
      // Handle the shortcut
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [matchesShortcut]);
```

### Working with WASM

The `@kaya/deadstones` package uses Rust/WASM:

```bash
cd packages/deadstones
bun run setup    # Install wasm-pack
bun run build    # Build WASM + TypeScript
```

## Resources

- **Tauri v2 docs**: https://v2.tauri.app/
- **KataGo**: https://github.com/lightvector/KataGo
- **SGF format**: https://www.red-bean.com/sgf/

## Internationalization (i18n)

Kaya supports 8 languages. All user-facing text must be localized.

### Quick Reference

```tsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
return <button>{t('save')}</button>;
```

### Adding New Text

1. Add key to `packages/ui/src/i18n/locales/en.json`
2. Add translations to all 7 other locale files (zh, ko, ja, fr, de, es, it)
3. Use `t('key')` in your component

See **[I18N.md](I18N.md)** for full guidelines.
