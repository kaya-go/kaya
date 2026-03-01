# Kaya Project - Current State

## Overview

Kaya is a desktop and web Go (Baduk/Weiqi) application with AI analysis. It features a complete game tree system with SGF file support, score estimation, and local AI analysis using KataGo (ONNX Runtime).

## Technology Stack

- **Runtime**: Bun + TypeScript 5.9
- **Frontend**: React 18 + Rsbuild
- **Desktop**: Tauri v2 (Rust backend)
- **Mobile**: Android (experimental, via Tauri v2)
- **AI**: ONNX Runtime (Native on Desktop, NNAPI on Android, WebGPU/WASM on Web)

## Package Structure

```
10 Library Packages:
  @kaya/goboard      - Core Go game logic
  @kaya/sgf          - SGF parser/stringifier
  @kaya/gametree     - Immutable game tree with structural sharing
  @kaya/shudan       - React board component
  @kaya/gtp          - GTP protocol parser
  @kaya/boardmatcher - Pattern matching and move naming
  @kaya/deadstones   - Dead stone detection (Rust/WASM)
  @kaya/ai-engine    - KataGo via ONNX Runtime
  @kaya/board-recognition - Photo-to-SGF board recognition (classic CV + Moku AI)
  @kaya/ui           - Shared React components

2 Application Packages:
  @kaya/desktop      - Tauri desktop app
  @kaya/web          - Web app (PWA)
```

## Features

### Core Features

- **Game Tree System**: Full SGF support with variations, navigation, and editing
- **Board Rendering**: Interactive 19×19/13×13/9×9 board with coordinates and markers
- **File Management**: Open/Save/Drag-drop SGF files, OGS URL import
- **Library Panel**: Organize games in folders with duplicate/rename/delete support

### AI Analysis

- **Live Analysis**: Real-time win rate, score lead, and move suggestions
- **Batch Analysis**: Analyze entire games with progress tracking and stop button
- **Native ONNX Runtime** (Desktop): GPU acceleration via CUDA, CoreML, or DirectML
- **Web ONNX Runtime**: WebGPU (GPU) or WASM (CPU) backend
- **Analysis Graph**: Visual win rate chart across all moves
- **Move Quality Colors**: Chess.com-style move classification (best/great/good/okay/poor)
- **Ownership Heatmap**: Territory control visualization
- **Persistence**: Analysis results saved to SGF (`KA` property) and localStorage

### UI/UX

- **Collapsible Sidebar**: Game Tree, Game Info, Comment, and Analysis panels
- **Collapsible Board Controls**: Toggle visibility of captures and navigation buttons
- **Score Estimation**: Interactive dead stone marking with territory calculation
- **Gamepad Support**: Controller navigation with multiple mapping profiles
- **Board Themes**: Multiple stone and board styles (Hikaru, Shell-Slate, Yunzi, Happy Stones, Kifu, BadukTV)
- **Dark/Light Theme**: Persisted user preference
- **Show/Hide Coordinates**: Toggle board coordinates display
- **Sound Effects**: Stone placement and capture sounds
- **Configurable Keyboard Shortcuts**: Customize all shortcuts via Settings
- **Internationalization**: Full i18n support with 8 languages (EN, ZH, KO, JA, FR, DE, ES, IT)
- **Mobile/Tablet Responsive**: Touch-friendly layout with swipe navigation and orientation support

### Board Recognition

- **Photo Import**: Recognize board positions from photos and import as SGF
- **Dual Backend**: Classic computer-vision pipeline and Moku AI (RT-DETR) detection
- **Moku AI**: ONNX-based RT-DETR model detects corners and stones directly with configurable confidence threshold
- **Model Caching**: Browser Cache API with hash-based invalidation and download progress tracking
- **Corner Dragging**: Interactive perspective warp with deferred worker-based warping
- **Custom Board Sizes**: Support for arbitrary board sizes (2–52) in addition to standard 9/13/19
- **Manual Calibration**: Click-to-toggle stone color corrections and grid alignment
- **Web Worker**: All heavy computation runs off the main thread

### Edit Mode

- **Stone Placement**: Add black/white stones directly on the board
- **Markers**: Circle, cross, square, triangle markers with drag-to-paint support
- **Labels**: Letter and number labels
- **Hotspot Marking**: Mark important positions

## Development Commands

```bash
# Development
bun run dev            # Desktop app (Tauri)
bun run dev:web        # Web app at localhost:3000

# Building
bun run build          # Desktop production build
bun run build:web      # Web production build

# Android (Experimental)
bun run android:setup  # Download ONNX Runtime libraries
bun run android:dev    # Run on device/emulator
bun run android:build  # Build release APK

# Quality
bun run format         # Prettier + markdownlint
bun run type-check     # TypeScript checking
bun run clean          # Remove build artifacts
```

## Documentation

- `README.md` - Project overview
- `DEVELOPER_GUIDE.md` - Development workflows
- `USER_GUIDE.md` - End-user documentation
- `THEMES.md` - Board theme system and configuration
- `PERFORMANCE.md` - Performance optimization guide
- `ASSET_MANAGEMENT.md` - Asset copy strategy
- `RELEASE_PROCESS.md` - Release workflow
- `BRAND_GUIDE.md` - Brand guidelines
- `MOBILE_RESPONSIVE.md` - Mobile/tablet responsive design
- `I18N.md` - Internationalization and translation guide
