# Kaya documentation

This folder is a **static snapshot** of how Kaya is built today. For the
evolution log — why specific decisions were made, what was tried, what was
learned — see [`specs/`](../specs/).

The agent-facing entry point is [`CLAUDE.md`](../CLAUDE.md) at the repo root.

## Index

| Doc                                            | What's in it                                                       |
| ---------------------------------------------- | ------------------------------------------------------------------ |
| [ARCHITECTURE.md](ARCHITECTURE.md)             | High-level design, monorepo layout, key invariants, asset strategy |
| [THEMES.md](THEMES.md)                         | Board theme system, schema, built-in themes                        |
| [I18N.md](I18N.md)                             | Translation workflow, supported locales                            |
| [RESPONSIVE.md](RESPONSIVE.md)                 | Breakpoints, touch interactions, mobile/tablet layout              |
| [BRAND_GUIDE.md](BRAND_GUIDE.md)               | Logo, color palette, typography, voice                             |
| [PERFORMANCE.md](PERFORMANCE.md)               | Navigation perf, board cache, worker offload                       |
| [AI_ANALYSIS_FORMAT.md](AI_ANALYSIS_FORMAT.md) | SGF `KA` property — analysis serialization                         |
| [RELEASE.md](RELEASE.md)                       | Release workflow, conventional commits, signing                    |

## Links

- [Repository](https://github.com/kaya-go/kaya)
- [Stable web app](https://kayago.app)
- [Next web app](https://kayago.app/next/)
- [Releases](https://github.com/kaya-go/kaya/releases)
