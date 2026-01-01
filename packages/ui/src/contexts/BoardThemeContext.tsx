/**
 * Kaya Board Theme Context
 *
 * Provides board theme state and management across the application.
 * Themes are applied via CSS custom properties on the document root.
 */

import React, { createContext, useContext, useEffect, useState, useMemo, useRef } from 'react';
import {
  BUILT_IN_THEMES,
  DEFAULT_THEME_ID,
  getThemeById,
  type BuiltInThemeId,
  type ResolvedBoardTheme,
} from '../themes';

const BOARD_THEME_STORAGE_KEY = 'kaya-board-theme';
const THEME_STYLE_ID = 'kaya-board-theme-styles';

interface BoardThemeContextType {
  /** Currently active theme ID */
  boardTheme: BuiltInThemeId;
  /** Set the active theme */
  setBoardTheme: (theme: BuiltInThemeId) => void;
  /** All available themes (resolved with URLs) */
  availableThemes: ResolvedBoardTheme[];
  /** Get a specific theme by ID */
  getTheme: (id: BuiltInThemeId) => ResolvedBoardTheme | undefined;
  /** Currently active theme object */
  currentTheme: ResolvedBoardTheme;
}

const BoardThemeContext = createContext<BoardThemeContextType | undefined>(undefined);

/**
 * Generate CSS for theme-specific image overrides
 */
function generateThemeImageCSS(theme: ResolvedBoardTheme): string {
  const rules: string[] = [];

  // Board texture
  if (theme.boardTextureUrl) {
    rules.push(`
      .shudan-goban {
        background-image: url('${theme.boardTextureUrl}');
        background-size: cover;
      }
    `);
  } else {
    // No texture - ensure no background image and disable gradient overlay for flat themes
    rules.push(`
      .shudan-goban {
        background-image: none;
      }
      .shudan-goban::after {
        background: none;
      }
    `);
  }

  // Stone size via CSS custom property (default is 90% in base CSS)
  // Set on .shudan-goban so it cascades to child .shudan-stone elements
  const blackSize = theme.stones.black.size || '90%';
  const whiteSize = theme.stones.white.size || '90%';
  // Use larger of black/white for uniform sizing, or we could set per-stone
  const stoneSize = blackSize;

  rules.push(`
    .shudan-goban {
      --shudan-stone-size: ${stoneSize};
    }
  `);

  // Black stone image
  if (theme.blackStoneUrl) {
    const offsetX = theme.stones.black.imageOffsetX;
    const offsetY = theme.stones.black.imageOffsetY;
    const hasOffset = offsetX || offsetY;

    // Use background-position to offset the stone image within the element
    // This keeps the element centered for markers while shifting the visible stone
    const bgPosition = hasOffset
      ? `calc(50% + ${offsetX || '0'}) calc(50% + ${offsetY || '0'})`
      : 'center';

    rules.push(`
      .shudan-stone_black {
        background-image: url('${theme.blackStoneUrl}');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: ${bgPosition};
      }
    `);

    // Black stone variations
    if (theme.blackStoneVariationUrls && theme.blackStoneVariationUrls.length > 0) {
      theme.blackStoneVariationUrls.forEach((url, index) => {
        rules.push(`
          .shudan-stone_black.shudan-random_${index + 1} {
            background-image: url('${url}');
          }
        `);
      });
    }
  } else {
    // Use drop-shadow for SVG stones (they don't have shadows baked in)
    // Also add border if defined (for flat themes like kifu)
    const blackBorder =
      theme.stones.black.borderWidth && theme.stones.black.borderColor
        ? `border: ${theme.stones.black.borderWidth} solid ${theme.stones.black.borderColor};`
        : '';
    // For flat themes with borders, use solid color instead of SVG
    const blackBgOverride = blackBorder
      ? `background-image: none; background-color: ${theme.stones.black.backgroundColor}; border-radius: 50%;`
      : '';
    rules.push(`
      .shudan-stone_black {
        filter: drop-shadow(${theme.stones.black.shadowOffsetX} ${theme.stones.black.shadowOffsetY} ${theme.stones.black.shadowBlur} ${theme.stones.black.shadowColor});
        ${blackBorder}
        ${blackBgOverride}
      }
    `);
  }

  // White stone image
  if (theme.whiteStoneUrl) {
    const offsetX = theme.stones.white.imageOffsetX;
    const offsetY = theme.stones.white.imageOffsetY;
    const hasOffset = offsetX || offsetY;

    // Use background-position to offset the stone image within the element
    // This keeps the element centered for markers while shifting the visible stone
    const bgPosition = hasOffset
      ? `calc(50% + ${offsetX || '0'}) calc(50% + ${offsetY || '0'})`
      : 'center';

    rules.push(`
      .shudan-stone_white {
        background-image: url('${theme.whiteStoneUrl}');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: ${bgPosition};
      }
    `);

    // White stone variations
    if (theme.whiteStoneVariationUrls && theme.whiteStoneVariationUrls.length > 0) {
      theme.whiteStoneVariationUrls.forEach((url, index) => {
        rules.push(`
          .shudan-stone_white.shudan-random_${index + 1} {
            background-image: url('${url}');
          }
        `);
      });
    }
  } else {
    // Use drop-shadow for SVG stones (they don't have shadows baked in)
    // Also add border if defined (for flat themes like kifu)
    const whiteBorder =
      theme.stones.white.borderWidth && theme.stones.white.borderColor
        ? `border: ${theme.stones.white.borderWidth} solid ${theme.stones.white.borderColor};`
        : '';
    // For flat themes with borders, use solid color instead of SVG
    const whiteBgOverride = whiteBorder
      ? `background-image: none; background-color: ${theme.stones.white.backgroundColor}; border-radius: 50%;`
      : '';
    rules.push(`
      .shudan-stone_white {
        filter: drop-shadow(${theme.stones.white.shadowOffsetX} ${theme.stones.white.shadowOffsetY} ${theme.stones.white.shadowBlur} ${theme.stones.white.shadowColor});
        ${whiteBorder}
        ${whiteBgOverride}
      }
    `);
  }

  // Ghost stone styles - apply borders for flat themes
  const blackGhostBorder =
    theme.stones.black.borderWidth && theme.stones.black.borderColor
      ? `border: ${theme.stones.black.borderWidth} solid ${theme.stones.black.borderColor};`
      : '';
  const whiteGhostBorder =
    theme.stones.white.borderWidth && theme.stones.white.borderColor
      ? `border: ${theme.stones.white.borderWidth} solid ${theme.stones.white.borderColor};`
      : '';

  if (blackGhostBorder || whiteGhostBorder) {
    rules.push(`
      .shudan-ghost-stone_black {
        ${blackGhostBorder}
        box-sizing: border-box;
      }
      .shudan-ghost-stone_white {
        ${whiteGhostBorder}
        box-sizing: border-box;
      }
    `);
  }

  return rules.join('\n');
}

/**
 * Apply theme CSS custom properties and image overrides to the document
 */
function applyThemeStyles(theme: ResolvedBoardTheme): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  // Board properties
  root.style.setProperty('--shudan-board-background-color', theme.board.backgroundColor);
  root.style.setProperty('--shudan-board-border-color', theme.board.borderColor);
  root.style.setProperty('--shudan-board-foreground-color', theme.board.foregroundColor);
  root.style.setProperty('--shudan-board-border-width', `${theme.board.borderWidth}em`);

  // Stone properties
  root.style.setProperty('--shudan-black-background-color', theme.stones.black.backgroundColor);
  root.style.setProperty('--shudan-black-foreground-color', theme.stones.black.foregroundColor);
  root.style.setProperty('--shudan-white-background-color', theme.stones.white.backgroundColor);
  root.style.setProperty('--shudan-white-foreground-color', theme.stones.white.foregroundColor);

  // Coordinate color
  if (theme.coordColor) {
    root.style.setProperty('--shudan-coord-color', theme.coordColor);
  }

  // Set data attribute for theme-specific CSS rules
  root.setAttribute('data-board-theme', theme.id);

  // Inject or update dynamic style element for image overrides
  let styleEl = document.getElementById(THEME_STYLE_ID) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = THEME_STYLE_ID;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = generateThemeImageCSS(theme);
}

export const BoardThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [boardTheme, setBoardThemeState] = useState<BuiltInThemeId>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(BOARD_THEME_STORAGE_KEY);
      // Validate stored theme ID
      if (stored && BUILT_IN_THEMES.some(t => t.id === stored)) {
        return stored as BuiltInThemeId;
      }
    }
    return DEFAULT_THEME_ID;
  });

  const currentTheme = useMemo(() => {
    return getThemeById(boardTheme) ?? BUILT_IN_THEMES[0];
  }, [boardTheme]);

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyThemeStyles(currentTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(BOARD_THEME_STORAGE_KEY, boardTheme);
    }
  }, [currentTheme, boardTheme]);

  const setBoardTheme = (theme: BuiltInThemeId) => {
    setBoardThemeState(theme);
  };

  const value: BoardThemeContextType = {
    boardTheme,
    setBoardTheme,
    availableThemes: BUILT_IN_THEMES,
    getTheme: getThemeById,
    currentTheme,
  };

  return <BoardThemeContext.Provider value={value}>{children}</BoardThemeContext.Provider>;
};

export const useBoardTheme = (): BoardThemeContextType => {
  const context = useContext(BoardThemeContext);
  if (context === undefined) {
    throw new Error('useBoardTheme must be used within a BoardThemeProvider');
  }
  return context;
};

export type { BuiltInThemeId, ResolvedBoardTheme };
