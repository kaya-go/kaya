/**
 * Sound assets for the game
 * These are imported from @kaya/ui/assets/sounds/*.ogg
 * Apps need to copy these files during their build process
 */

/**
 * Sound file paths (relative to package)
 */
export const SOUND_FILES = {
  move: [
    'assets/sounds/move-0.ogg',
    'assets/sounds/move-1.ogg',
    'assets/sounds/move-2.ogg',
    'assets/sounds/move-3.ogg',
    'assets/sounds/move-4.ogg',
  ],
  capture: [
    'assets/sounds/capture0.ogg',
    'assets/sounds/capture1.ogg',
    'assets/sounds/capture2.ogg',
    'assets/sounds/capture3.ogg',
    'assets/sounds/capture4.ogg',
  ],
  pass: 'assets/sounds/pass.ogg',
  newgame: 'assets/sounds/newgame.ogg',
} as const;

/**
 * Sound types available in the game
 */
export type SoundType = 'move' | 'capture' | 'pass' | 'newgame';
