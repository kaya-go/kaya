import { useState, useCallback } from 'react';
import { type GameSettings } from '../../types/game';
import { COMMENT_FONT_SCALE_DEFAULT, clampCommentFontScale } from '../../utils/commentFontScale';

const GAME_SETTINGS_STORAGE_KEY = 'kaya-game-settings';

/**
 * Default game settings
 */
const DEFAULT_GAME_SETTINGS: GameSettings = {
  fuzzyStonePlacement: true, // Enabled by default for natural stone appearance
  showCoordinates: true, // Show coordinates by default
  showBoardControls: true, // Show board controls by default
  commentFontScale: COMMENT_FONT_SCALE_DEFAULT, // Default comment text size
  detectionModelSource: 'default', // Use built-in Moku model by default
};

/**
 * Load game settings from localStorage
 */
function loadGameSettings(): GameSettings {
  try {
    const stored = localStorage.getItem(GAME_SETTINGS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        fuzzyStonePlacement:
          typeof parsed.fuzzyStonePlacement === 'boolean'
            ? parsed.fuzzyStonePlacement
            : DEFAULT_GAME_SETTINGS.fuzzyStonePlacement,
        showCoordinates:
          typeof parsed.showCoordinates === 'boolean'
            ? parsed.showCoordinates
            : DEFAULT_GAME_SETTINGS.showCoordinates,
        showBoardControls:
          typeof parsed.showBoardControls === 'boolean'
            ? parsed.showBoardControls
            : DEFAULT_GAME_SETTINGS.showBoardControls,
        commentFontScale:
          typeof parsed.commentFontScale === 'number'
            ? clampCommentFontScale(parsed.commentFontScale)
            : DEFAULT_GAME_SETTINGS.commentFontScale,
        detectionModelSource:
          parsed.detectionModelSource === 'custom'
            ? 'custom'
            : DEFAULT_GAME_SETTINGS.detectionModelSource,
        customDetectionModelName:
          typeof parsed.customDetectionModelName === 'string'
            ? parsed.customDetectionModelName
            : undefined,
      };
    }
  } catch (e) {
    console.warn('Failed to load game settings from localStorage:', e);
  }
  return { ...DEFAULT_GAME_SETTINGS };
}

/**
 * Save game settings to localStorage
 */
function saveGameSettings(settings: GameSettings): void {
  try {
    localStorage.setItem(GAME_SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn('Failed to save game settings to localStorage:', e);
  }
}

/**
 * Hook for managing game settings (non-AI settings)
 */
export function useGameSettings() {
  const [gameSettings, setGameSettingsState] = useState<GameSettings>(loadGameSettings);

  const setGameSettings = useCallback((settings: Partial<GameSettings>) => {
    setGameSettingsState(prev => {
      const newSettings = { ...prev, ...settings };
      saveGameSettings(newSettings);
      return newSettings;
    });
  }, []);

  return {
    gameSettings,
    setGameSettings,
  };
}
