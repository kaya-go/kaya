/**
 * @kaya/themes - Board theme system for Kaya
 *
 * Provides 6 built-in Go board themes with stone/board imagery,
 * CSS custom property management, and React context.
 */

export type {
  StoneConfig,
  BoardConfig,
  BoardThemeConfig,
  ResolvedBoardTheme,
  BuiltInThemeId,
  BoardThemeContextType,
} from './types';

export { BUILT_IN_THEMES, DEFAULT_THEME_ID, AVAILABLE_THEME_IDS, getThemeById } from './themes';

export { BoardThemeProvider, useBoardTheme } from './BoardThemeContext';
