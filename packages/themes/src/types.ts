/**
 * Kaya Board Theme System - Type Definitions
 *
 * This file defines the TypeScript types for the declarative JSON-based
 * theme system. Themes are defined as JSON configurations with optional
 * image assets, applied via CSS custom properties.
 */

/**
 * Stone configuration within a theme
 */
export interface StoneConfig {
  /** Path to stone image (relative to theme assets folder) */
  image?: string;
  /** Additional stone image variations for random selection (0-4) */
  imageVariations?: string[];
  /** Fallback background color when no image is used (hex) */
  backgroundColor: string;
  /** Color for markers/labels on the stone (hex) */
  foregroundColor: string;
  /** Shadow color (rgba string) */
  shadowColor: string;
  /** Shadow X offset (e.g., "0.1em") */
  shadowOffsetX: string;
  /** Shadow Y offset (e.g., "0.12em") */
  shadowOffsetY: string;
  /** Shadow blur radius (e.g., "0.06em") */
  shadowBlur: string;
  /** Stone size as percentage (e.g., "100%" or "127%") - optional, defaults to 100% */
  size?: string;
  /** Image offset X for SVGs with baked-in shadows (e.g., "-0.03em") - optional */
  imageOffsetX?: string;
  /** Image offset Y for SVGs with baked-in shadows (e.g., "-0.03em") - optional */
  imageOffsetY?: string;
  /** Border color for flat stone styles (hex) - optional */
  borderColor?: string;
  /** Border width for flat stone styles (e.g., "1.5pt" or "0.04em") - optional */
  borderWidth?: string;
}

/**
 * Board configuration within a theme
 */
export interface BoardConfig {
  /** Board background color (hex) */
  backgroundColor: string;
  /** Board border color (hex) */
  borderColor: string;
  /** Grid lines and coordinate color (hex) */
  foregroundColor: string;
  /** Border width in em units (0 = no border) */
  borderWidth: number;
  /** Path to board texture image (relative to theme assets folder) */
  texture?: string;
}

/**
 * Complete board theme configuration
 */
export interface BoardThemeConfig {
  /** Unique theme identifier (lowercase, no spaces) */
  id: string;
  /** Display name for UI */
  name: string;
  /** Theme description */
  description: string;
  /** Theme author (optional) */
  author?: string;
  /** Preview image path for theme selector (relative to theme assets folder) */
  preview?: string;
  /** Board visual configuration */
  board: BoardConfig;
  /** Stone visual configuration */
  stones: {
    black: StoneConfig;
    white: StoneConfig;
  };
  /** Coordinate label color (optional, defaults to foregroundColor) */
  coordColor?: string;
}

/**
 * Theme with resolved asset URLs
 * After loading, image paths are resolved to actual URLs or data URIs
 */
export interface ResolvedBoardTheme extends BoardThemeConfig {
  /** Resolved board texture URL */
  boardTextureUrl?: string;
  /** Resolved black stone image URL */
  blackStoneUrl?: string;
  /** Resolved white stone image URL */
  whiteStoneUrl?: string;
  /** Resolved black stone variation URLs (for random selection) */
  blackStoneVariationUrls?: string[];
  /** Resolved white stone variation URLs (for random selection) */
  whiteStoneVariationUrls?: string[];
  /** Resolved preview image URL */
  previewUrl?: string;
}

/**
 * Available built-in theme IDs
 */
export type BuiltInThemeId =
  | 'hikaru'
  | 'shell-slate'
  | 'yunzi'
  | 'happy-stones'
  | 'kifu'
  | 'baduktv';

/**
 * Board theme context value
 */
export interface BoardThemeContextType {
  /** Currently active theme ID */
  boardTheme: BuiltInThemeId;
  /** Set the active theme */
  setBoardTheme: (theme: BuiltInThemeId) => void;
  /** All available themes (resolved) */
  availableThemes: ResolvedBoardTheme[];
  /** Get a specific theme by ID */
  getTheme: (id: BuiltInThemeId) => ResolvedBoardTheme | undefined;
}
