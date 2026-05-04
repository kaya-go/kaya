# Board themes

Kaya uses a **JSON-declarative theme format**: themes describe values, not
CSS. A theme cannot inject styles, run scripts, or load external resources —
each theme is a `theme.json` plus a folder of bundled images. This makes
themes safe to add, easy to validate, and identical across web and desktop.

## Layout

The theme system lives in its own package:
[`packages/themes/`](../packages/themes/).

```
packages/themes/src/
├── index.ts              public API
├── types.ts              TypeScript types
├── themes.ts             registry: BUILT_IN_THEMES, DEFAULT_THEME_ID
├── BoardThemeContext.tsx React context + useBoardTheme()
├── hikaru/               default
│   ├── theme.json
│   └── assets/{board.svg, stone-black.svg, stone-white.svg}
├── shell-slate/          traditional Japanese clamshell + slate
├── yunzi/                Chinese Yunzi biconvex
├── happy-stones/         friendly cartoon
├── kifu/                 minimalist B&W (no images)
└── baduktv/              broadcast-style
```

Apps consume via `BoardThemeProvider` and `useBoardTheme()` from
`@kaya/themes`. Theme assets are copied to each app's `public/` by
`scripts/copy-assets.ts` — see [ARCHITECTURE.md](ARCHITECTURE.md#assets).

## Schema

```ts
interface BoardThemeConfig {
  id: string; // unique identifier
  name: string; // display name
  description: string;
  author?: string;

  board: {
    backgroundColor: string; // hex
    borderColor: string; // hex
    foregroundColor: string; // grid color, hex
    borderWidth: number; // em (0 = no border)
    texture?: string; // path relative to theme folder
  };

  stones: {
    black: StoneConfig;
    white: StoneConfig;
  };

  coordColor?: string;
}

interface StoneConfig {
  image?: string; // optional override
  backgroundColor: string; // hex
  foregroundColor: string; // marker text color, hex
  shadowColor: string; // rgba string
  shadowOffsetX: string; // em
  shadowOffsetY: string; // em
  shadowBlur: string; // em
}
```

Allowlisted properties only. Anything not in this schema can't be set.

## Built-in themes

| ID                 | Stones | Style                                  |
| ------------------ | ------ | -------------------------------------- |
| `hikaru` (default) | SVG    | Clean, modern                          |
| `shell-slate`      | PNG    | Traditional Japanese clamshell + slate |
| `yunzi`            | PNG    | Chinese Yunzi biconvex                 |
| `happy-stones`     | PNG    | Friendly cartoon                       |
| `kifu`             | none   | Flat B&W, document style               |
| `baduktv`          | PNG    | TV broadcast aesthetic                 |

## How a theme is applied

1. The active theme ID is persisted in `localStorage`.
2. `BoardThemeProvider` resolves it through `getThemeById()` from
   `@kaya/themes/themes.ts`.
3. CSS custom properties are written on the `.shudan-goban` element:

   ```css
   .shudan-goban {
     --shudan-board-border-width: 0.15em;
     --shudan-board-border-color: #ca933a;
     --shudan-board-background-color: #f1b458;
     --shudan-board-foreground-color: #5e2e0c;
     --shudan-black-background-color: #222;
     --shudan-black-foreground-color: #eee;
     --shudan-white-background-color: #eee;
     --shudan-white-foreground-color: #222;
     --shudan-coord-color: rgba(94, 46, 12, 0.8);
   }
   ```

4. Stone images, when provided, are scoped via `[data-board-theme=...]`
   attribute selectors so they don't leak between themes.

Stone CSS lives in [`packages/shudan/src/goban.css`](../packages/shudan/src/goban.css).

## Adding a built-in theme

1. Create `packages/themes/src/<id>/theme.json` plus optional
   `assets/` folder.
2. Register it in `packages/themes/src/themes.ts`
   (`BUILT_IN_THEMES` + the appropriate ID lists).
3. Add the theme assets to the copy step (`scripts/copy-assets.ts`) so
   both apps ship them.
4. Add display name + description translations under
   `themes.<id>` in every locale.

## Constraints (deliberate)

- **No arbitrary CSS** — values only, no rules. Themes can't break out
  of the board container.
- **No external URLs** — `image` paths must resolve inside the theme
  folder. Bundled or nothing.
- **No third-party themes (yet)** — built-in only. User-loadable themes
  are out of scope until v2; if/when that lands it'll go through schema
  validation, size limits (≤ 2 MB per image), and a PNG/JPG/SVG allowlist.
