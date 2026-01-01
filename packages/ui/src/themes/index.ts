/**
 * Kaya Board Theme System - Theme Registry
 *
 * This file imports and exports all built-in themes, providing a central
 * registry for theme management.
 */

import type { BoardThemeConfig, ResolvedBoardTheme, BuiltInThemeId } from './types';

// Import theme configurations
import hikaruTheme from './hikaru/theme.json';
import shellSlateTheme from './shell-slate/theme.json';
import yunziTheme from './yunzi/theme.json';
import happyStonesTheme from './happy-stones/theme.json';
import kifuTheme from './kifu/theme.json';
import baduktvTheme from './baduktv/theme.json';

// Asset imports for themes with custom images
// Hikaru assets (SVG-based)
import hikaruBoard from './hikaru/assets/board.svg';
import hikaruBlackStone from './hikaru/assets/stone-black.svg';
import hikaruWhiteStone from './hikaru/assets/stone-white.svg';

// Shell-Slate assets
import shellSlateBoard from './shell-slate/assets/board.png';
import shellSlateBlackStone from './shell-slate/assets/stone-black.png';
import shellSlateWhiteStone from './shell-slate/assets/stone-white.png';

// Yunzi assets
import yunziBoard from './yunzi/assets/board.png';
import yunziBlackStone from './yunzi/assets/stone-black.png';
import yunziWhiteStone from './yunzi/assets/stone-white.png';

// Happy Stones assets
import happyStonesBoard from './happy-stones/assets/board.png';
import happyStonesBlackStone from './happy-stones/assets/stone-black.png';
import happyStonesWhiteStone from './happy-stones/assets/stone-white.png';

// BadukTV assets (with variations)
import baduktvBoard from './baduktv/assets/board.png';
import baduktvBlackStone from './baduktv/assets/stone-black.png';
import baduktvBlackStone1 from './baduktv/assets/stone-black-1.png';
import baduktvBlackStone2 from './baduktv/assets/stone-black-2.png';
import baduktvWhiteStone from './baduktv/assets/stone-white.png';
import baduktvWhiteStone1 from './baduktv/assets/stone-white-1.png';
import baduktvWhiteStone2 from './baduktv/assets/stone-white-2.png';

/**
 * Resolve a theme configuration with its asset URLs
 */
function resolveTheme(
  config: BoardThemeConfig,
  assets?: {
    boardTextureUrl?: string;
    blackStoneUrl?: string;
    whiteStoneUrl?: string;
    blackStoneVariationUrls?: string[];
    whiteStoneVariationUrls?: string[];
    previewUrl?: string;
  }
): ResolvedBoardTheme {
  return {
    ...config,
    ...assets,
  };
}

/**
 * All built-in themes with resolved asset URLs
 */
export const BUILT_IN_THEMES: ResolvedBoardTheme[] = [
  // Hikaru theme (default)
  resolveTheme(hikaruTheme as BoardThemeConfig, {
    boardTextureUrl: hikaruBoard,
    blackStoneUrl: hikaruBlackStone,
    whiteStoneUrl: hikaruWhiteStone,
  }),

  // Shell-Slate theme
  resolveTheme(shellSlateTheme as BoardThemeConfig, {
    boardTextureUrl: shellSlateBoard,
    blackStoneUrl: shellSlateBlackStone,
    whiteStoneUrl: shellSlateWhiteStone,
  }),

  // Yunzi theme
  resolveTheme(yunziTheme as BoardThemeConfig, {
    boardTextureUrl: yunziBoard,
    blackStoneUrl: yunziBlackStone,
    whiteStoneUrl: yunziWhiteStone,
  }),

  // Happy Stones theme
  resolveTheme(happyStonesTheme as BoardThemeConfig, {
    boardTextureUrl: happyStonesBoard,
    blackStoneUrl: happyStonesBlackStone,
    whiteStoneUrl: happyStonesWhiteStone,
  }),

  // Kifu theme (no images, pure CSS)
  resolveTheme(kifuTheme as BoardThemeConfig),

  // BadukTV theme (with stone variations)
  resolveTheme(baduktvTheme as BoardThemeConfig, {
    boardTextureUrl: baduktvBoard,
    blackStoneUrl: baduktvBlackStone,
    whiteStoneUrl: baduktvWhiteStone,
    blackStoneVariationUrls: [baduktvBlackStone1, baduktvBlackStone2],
    whiteStoneVariationUrls: [baduktvWhiteStone1, baduktvWhiteStone2],
  }),
];

/**
 * Get a theme by its ID
 */
export function getThemeById(id: BuiltInThemeId): ResolvedBoardTheme | undefined {
  return BUILT_IN_THEMES.find(theme => theme.id === id);
}

/**
 * Default theme ID
 */
export const DEFAULT_THEME_ID: BuiltInThemeId = 'hikaru';

/**
 * Available theme IDs
 */
export const AVAILABLE_THEME_IDS: BuiltInThemeId[] = BUILT_IN_THEMES.map(
  t => t.id as BuiltInThemeId
);

// Re-export types
export type { BoardThemeConfig, ResolvedBoardTheme, BuiltInThemeId } from './types';
