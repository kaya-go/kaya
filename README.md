<div align="center">

<img src="public/logo.svg" alt="Kaya Logo" width="120" height="120">

# Kaya

**A modern, elegant Go (Baduk/Weiqi) game application**

[![GitHub Release](https://img.shields.io/github/v/release/kaya-go/kaya)](https://github.com/kaya-go/kaya/releases/latest)
[![GitHub Downloads](https://img.shields.io/github/downloads/kaya-go/kaya/total)](https://github.com/kaya-go/kaya/releases)
[![CI](https://github.com/kaya-go/kaya/workflows/CI/badge.svg)](https://github.com/kaya-go/kaya/actions)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPLv3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

[![React](https://img.shields.io/badge/React-18-61dafb.svg?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tauri](https://img.shields.io/badge/Tauri-v2-24c8d8.svg?logo=tauri&logoColor=white)](https://tauri.app)
[![Bun](https://img.shields.io/badge/Bun-1.x-f9f1e1.svg?logo=bun&logoColor=black)](https://bun.sh)

[![Download](https://img.shields.io/badge/Download-Desktop_App-2ea44f?style=for-the-badge&logo=github)](https://github.com/kaya-go/kaya/releases)
[![Web App](https://img.shields.io/badge/Open-Web_App-3b82f6?style=for-the-badge&logo=googlechrome&logoColor=white)](https://kaya-go.github.io/kaya)
[![Next](https://img.shields.io/badge/Try-Next_Version-f97316?style=for-the-badge&logo=googlechrome&logoColor=white)](https://kaya-go.github.io/kaya/next/)

<img src="docs/images/screenshot.jpg" alt="Kaya Screenshot" width="800">

</div>

---

## ✨ Features

- 🎯 **Complete Go Rules** - 9×9, 13×13, and 19×19 boards with full rule enforcement
- 🌳 **Game Tree** - Visual tree viewer with variation support
- 📄 **SGF Support** - Import/export games, drag & drop, OGS URL import
- 🤖 **AI Analysis** - Live win rate, move suggestions, and full game analysis (KataGo via ONNX)
- 📷 **Board Recognition** - Convert a photo or screenshot of a Go board into a playable game or SGF file
- ✏️ **Edit Mode** - Add stones, markers, labels, and annotations
- 🎯 **Score Estimation** - Interactive dead stone marking with territory calculation
- 📚 **Game Library** - Organize games in folders with local storage
- 🎮 **Input Options** - Keyboard shortcuts, gamepad support, mouse wheel navigation
- 🎨 **Themes** - Dark and light modes
- 🌍 **Multi-Language** - Available in 8 languages (EN, ZH, KO, JA, FR, DE, ES, IT)

### Platform Support

- 🖥️ **Desktop App** - Native performance on Windows, macOS, and Linux
- 🌐 **Web Version** - Play directly in your browser (works on mobile and tablet too)
  - [**Stable Version**](https://kaya-go.github.io/kaya) - Latest official release (Recommended)
  - [**Next Version**](https://kaya-go.github.io/kaya/next/) - Built from `main` branch (Newest features, less stable)
- 📱 **Installable PWA** - Install the web app on mobile or desktop for offline use (no app store needed)

---

## 🚀 Quick Start

### Installation

| Platform       | File        | Download                                                         |
| -------------- | ----------- | ---------------------------------------------------------------- |
| 🪟 **Windows** | `.exe`      | [Releases page](https://github.com/kaya-go/kaya/releases/latest) |
| 🍎 **macOS**   | `.dmg`      | [Releases page](https://github.com/kaya-go/kaya/releases/latest) |
| 🐧 **Linux**   | `.AppImage` | [Releases page](https://github.com/kaya-go/kaya/releases/latest) |
| 🌐 **Web**     | —           | [Open in browser](https://kaya-go.github.io/kaya)                |

---

## 🛠️ Tech Stack

Kaya is built with modern, performant technologies:

- **Frontend**: React 18 + TypeScript + Rsbuild
- **Desktop**: Tauri v2 (Rust backend for native performance)
- **Build System**: Bun workspaces (monorepo architecture)
- **Core Libraries**: TypeScript ports from [Sabaki](https://github.com/SabakiHQ/Sabaki)
- **Rendering**: Custom SVG-based board with optimized performance

---

## 🤝 Contributing

We welcome contributions! Whether it's bug reports, feature requests, or code contributions.

- 🐛 [Report a bug](https://github.com/kaya-go/kaya/issues/new?template=bug_report.md)
- 💡 [Suggest a feature](https://github.com/kaya-go/kaya/issues/new?template=feature_request.md)
- 🛠️ **[Contributing Guide](CONTRIBUTING.md)** - Get started with development

---

## 📜 License

AGPL-3.0 © 2025 [Hadim](https://github.com/hadim)

See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

Kaya stands on the shoulders of giants:

- **[Sabaki](https://github.com/SabakiHQ/Sabaki)** - Core Go libraries and inspiration
- **[Tauri](https://tauri.app)** - Modern desktop app framework
- **[KataGo](https://github.com/lightvector/KataGo)** - AI analysis engine (via ONNX Runtime)

---

<div align="center">

**Enjoy playing Go!** 🎋

Made with ❤️ for the Go community

[⬆ Back to top](#kaya)

</div>
