# Contributing to Kaya

Thank you for your interest in contributing to Kaya! This guide will help you get started.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

### Required for All Development

| Tool        | Version | Installation                                                                      |
| ----------- | ------- | --------------------------------------------------------------------------------- |
| **Bun**     | 1.x     | [bun.sh](https://bun.sh) - `curl -fsSL https://bun.sh/install \| bash`            |
| **Node.js** | 18+     | [nodejs.org](https://nodejs.org) (Bun handles most tasks, but some tools need it) |
| **Git**     | Latest  | [git-scm.com](https://git-scm.com)                                                |

### Additional Requirements for Desktop Development

| Tool                      | Version | Installation                                                                                       |
| ------------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| **Rust**                  | Latest  | [rustup.rs](https://rustup.rs) - `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs \| sh` |
| **Tauri CLI**             | v2      | Installed automatically via `bun install`                                                          |
| **Platform Dependencies** | -       | See [Tauri Prerequisites](https://v2.tauri.app/start/prerequisites/)                               |

#### Platform-Specific Dependencies

**macOS:**

```bash
xcode-select --install
```

**Linux (Ubuntu/Debian):**

```bash
sudo apt update
sudo apt install libwebkit2gtk-4.1-dev build-essential curl wget file \
  libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev
```

**Windows:**

- Install [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
- Install [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) (usually pre-installed on Windows 10/11)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/kaya-go/kaya.git
cd kaya
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Build Packages

Build all the internal packages before running the app:

```bash
bun run build:packages
```

---

## Development

### Running the Web App

The web app runs in your browser and doesn't require Rust:

```bash
bun run dev:web
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running the Desktop App

The desktop app requires Rust and Tauri:

```bash
bun run dev
```

This will compile the Rust backend and launch the desktop app with hot reload.

---

## Common Commands

| Command                  | Description                            |
| ------------------------ | -------------------------------------- |
| `bun run dev`            | Start desktop app with hot reload      |
| `bun run dev:web`        | Start web app at http://localhost:3000 |
| `bun run build`          | Build desktop app for production       |
| `bun run build:web`      | Build web app for production           |
| `bun run build:packages` | Rebuild all internal packages          |
| `bun run type-check`     | Run TypeScript type checking           |
| `bun run format`         | Format code with Prettier              |
| `bun run clean`          | Remove all build artifacts             |

---

## Project Structure

```
kaya/
├── apps/
│   ├── desktop/         # Tauri desktop app (React + Rust)
│   └── web/             # Web app (React PWA)
└── packages/
    ├── goboard/         # Core Go game logic
    ├── sgf/             # SGF file parser
    ├── gametree/        # Game tree data structure
    ├── shudan/          # Go board React component
    ├── ai-engine/       # KataGo AI via ONNX Runtime
    └── ui/              # Shared React components
```

---

## Making Changes

1. **Create a branch** for your feature or fix
2. **Make your changes** following the project conventions
3. **Test both web and desktop** if your changes affect shared code
4. **Run type checking**: `bun run type-check`
5. **Format your code**: `bun run format`
6. **Submit a pull request**

---

## Troubleshooting

### "command not found: bun"

Install Bun: `curl -fsSL https://bun.sh/install | bash`

### Rust compilation errors

Ensure Rust is installed: `rustc --version`

If not installed: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

### Desktop app won't start

1. Check Tauri prerequisites: [v2.tauri.app/start/prerequisites](https://v2.tauri.app/start/prerequisites/)
2. Rebuild packages: `bun run build:packages`
3. Clean and retry: `bun run clean && bun install && bun run build:packages`

### Resource path doesn't exist (e.g. `capture3.ogg`)

Sound assets need to be copied before running the desktop app. Run:

```bash
bun run copy-assets
```

This copies sound files from `public/sounds/` into the directories expected by Tauri and the web app.

---

## Additional Resources

- 📚 [Architecture](docs/ARCHITECTURE.md) - Design objectives, monorepo layout, key invariants
- 🎨 [Brand Guide](docs/BRAND_GUIDE.md) - Design guidelines
- 📱 [Responsive](docs/RESPONSIVE.md) - Mobile/tablet breakpoints and touch interactions
- 🌍 [Internationalization](docs/I18N.md) - Adding translations
- 🗒️ [Specs](specs/) - Timestamped notes on past decisions and learnings

---

## Questions?

- 🐛 [Report a bug](https://github.com/kaya-go/kaya/issues/new)
- 💡 [Suggest a feature](https://github.com/kaya-go/kaya/issues/new)
- 💬 Open a [discussion](https://github.com/kaya-go/kaya/discussions)

Thank you for contributing! 🎋
