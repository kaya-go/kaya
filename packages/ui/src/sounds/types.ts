import { type SoundType } from '../services/sounds';

export const DEBUG_SOUND = false;

export interface SoundBackend {
  init(): Promise<void> | void;
  preload(): Promise<void>;
  play(type: SoundType, variant: number): void;
  readonly ready: boolean;
}

/** Error details for sound init failure */
export interface SoundInitError {
  message: string;
  platform: string;
  backend: string;
}

const getAssetPath = (path: string): string => {
  if (typeof window !== 'undefined') {
    const base = document.baseURI || window.location.href;
    return new URL(path, base).href;
  }
  return path;
};

/** All sound URLs organized by type (used by web backends only). */
export const SOUND_PATHS = {
  move: Array.from({ length: 5 }, (_, i) => getAssetPath(`assets/move-${i}.ogg`)),
  capture: Array.from({ length: 5 }, (_, i) => getAssetPath(`assets/capture${i}.ogg`)),
  pass: getAssetPath(`assets/pass.ogg`),
  newgame: getAssetPath(`assets/newgame.ogg`),
};

/** Resolve a SoundType + variant to a URL path (for web backends). */
export function getSoundPath(type: SoundType, variant: number): string {
  switch (type) {
    case 'move':
      return SOUND_PATHS.move[variant % 5];
    case 'capture':
      return SOUND_PATHS.capture[variant % 5];
    case 'pass':
      return SOUND_PATHS.pass;
    case 'newgame':
      return SOUND_PATHS.newgame;
  }
}
