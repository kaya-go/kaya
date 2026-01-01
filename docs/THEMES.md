# Kaya Theme System

This document describes the architecture and implementation of Kaya's board theming system.

## Overview

Kaya uses a **JSON-based declarative theme format** that is secure, type-safe, and cross-platform compatible. Unlike CSS-based theming systems (e.g., Sabaki), Kaya themes cannot execute arbitrary styles or load external resources, eliminating security risks while providing comprehensive visual customization.

## Architecture Principles

### Security First

- **No arbitrary CSS**: Themes define values, not CSS rules
- **No external resources**: All assets must be bundled with the theme
- **Type-safe**: All theme properties are validated against TypeScript types
- **Allowlisted properties**: Only safe visual properties can be customized

### Built-in Themes Only (v1)

For the initial release, Kaya ships with built-in themes only. This ensures:

- Guaranteed quality and consistency
- Tested across all platforms (web + desktop)
- No security vulnerabilities from third-party themes
- Smaller bundle size through shared asset optimization

## Theme Structure

Each theme is defined in a `theme.json` file with optional image assets:

```
packages/ui/src/themes/
├── index.ts              # Theme registry and exports
├── types.ts              # TypeScript type definitions
├── hikaru/               # Default theme
│   ├── theme.json
│   └── assets/
│       ├── board.svg
│       ├── stone-black.svg
│       └── stone-white.svg
├── shell-slate/
│   ├── theme.json
│   └── assets/
│       ├── board.png
│       ├── stone-black.png
│       └── stone-white.png
├── yunzi/
│   ├── theme.json
│   └── assets/
│       ├── board.png
│       ├── stone-black.png
│       └── stone-white.png
├── happy-stones/
│   ├── theme.json
│   └── assets/
│       ├── board.png
│       ├── stone-black.png
│       └── stone-white.png
├── kifu/                 # No images (CSS-only theme)
│   └── theme.json
└── baduktv/
    ├── theme.json
    └── assets/
        ├── board.png
        ├── stone-black.png
        └── stone-white.png
```

## Theme JSON Schema

```typescript
interface BoardThemeConfig {
  /** Unique theme identifier */
  id: string;

  /** Display name for UI */
  name: string;

  /** Theme description */
  description: string;

  /** Theme author */
  author?: string;

  /** Board configuration */
  board: {
    /** Background color (hex) */
    backgroundColor: string;
    /** Border color (hex) */
    borderColor: string;
    /** Grid/foreground color (hex) */
    foregroundColor: string;
    /** Border width in em units (0 = no border) */
    borderWidth: number;
    /** Path to board texture image (relative to theme folder) */
    texture?: string;
  };

  /** Stone configuration */
  stones: {
    black: {
      /** Path to black stone image (relative to theme folder) */
      image?: string;
      /** Fallback background color (hex) */
      backgroundColor: string;
      /** Text/marker color on stone (hex) */
      foregroundColor: string;
      /** Shadow color (rgba string) */
      shadowColor: string;
      /** Shadow X offset in em */
      shadowOffsetX: string;
      /** Shadow Y offset in em */
      shadowOffsetY: string;
      /** Shadow blur in em */
      shadowBlur: string;
    };
    white: {
      image?: string;
      backgroundColor: string;
      foregroundColor: string;
      shadowColor: string;
      shadowOffsetX: string;
      shadowOffsetY: string;
      shadowBlur: string;
    };
  };

  /** Coordinate label color */
  coordColor?: string;
}
```

## Built-in Themes

### Classic (Default)

The default Kaya theme with warm wood tones and SVG stones.

- **Board**: Traditional kaya wood color (#f1b458)
- **Stones**: Clean SVG-based black and white stones
- **Style**: Modern, clean appearance

### Hikaru

An anime-inspired theme with crisp SVG graphics.

- **Board**: Light bamboo texture
- **Stones**: Flat, stylized stones with clean edges
- **Style**: Bright, modern anime aesthetic

### Shell-Slate

Traditional Japanese stones on a kaya board.

- **Board**: Kaya wood texture
- **Stones**: Realistic clamshell (white) and slate (black)
- **Style**: Traditional, elegant

### Yunzi

Chinese Yunzi stones on a kaya board.

- **Board**: Warm kaya wood texture
- **Stones**: Biconvex Yunzi stones with characteristic luster
- **Style**: Traditional Chinese aesthetic

## Implementation Details

### Theme Loading

1. Themes are loaded from the theme registry at startup
2. The active theme ID is stored in localStorage
3. Theme CSS custom properties are applied to the document root
4. Images are loaded as data URLs for offline support

### CSS Custom Properties

Themes are applied via CSS custom properties on `.shudan-goban`:

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

### Stone Image Overrides

When a theme provides stone images, they override the default SVG stones:

```css
[data-board-theme='yunzi'] .shudan-stone_black {
  background-image: url('/assets/themes/yunzi/stone-black.png');
}
```

## Adding New Built-in Themes

1. Create a new folder under `packages/ui/src/themes/`
2. Add `theme.json` with the theme configuration
3. Add any image assets to `assets/` subfolder
4. Register the theme in `packages/ui/src/themes/index.ts`
5. Add theme assets to the build copy script
6. Add i18n translations for the theme name/description

## Future Considerations

### User-Loadable Themes (v2+)

If user themes are added in the future:

1. Themes will be loaded from a `.kaya-themes` folder
2. All assets must be bundled (no external URLs)
3. JSON schema validation will reject invalid themes
4. Image size limits will be enforced (max 2MB per image)
5. Only PNG/JPG/SVG formats will be allowed

### Theme Conversion Tool

A tool could be provided to convert Sabaki `.asar` themes to Kaya format by:

1. Extracting the archive
2. Parsing `styles.css` for CSS custom property values
3. Copying image assets
4. Generating a `theme.json` file

## Related Files

- [packages/ui/src/themes/](../packages/ui/src/themes/) - Theme definitions
- [packages/ui/src/contexts/BoardThemeContext.tsx](../packages/ui/src/contexts/BoardThemeContext.tsx) - Theme context provider
- [packages/shudan/src/goban.css](../packages/shudan/src/goban.css) - Board CSS with theme variables
