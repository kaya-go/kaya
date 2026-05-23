import { useCallback, useEffect, useState } from 'react';
import { type SoundType } from './services/sounds';
import { playSoundInternal } from './sounds/manager';
import {
  getGlobalSoundEnabled,
  setGlobalSoundEnabled,
  subscribeSoundEnabled,
} from './sounds/store';
import { DEBUG_SOUND } from './sounds/types';

export { setSoundInitErrorHandler } from './sounds/manager';
export type { SoundInitError } from './sounds/types';

// Track last play time per sound type to prevent overlapping sounds
const lastPlayTime = new Map<SoundType, number>();
const MIN_SOUND_INTERVAL = 50;

// Track which variant to use (rotating for variety)
let moveVariantIndex = 0;
let captureVariantIndex = 0;

export const useGameSounds = () => {
  const [soundEnabled, setSoundEnabled] = useState(getGlobalSoundEnabled);

  // Listen for global state changes
  useEffect(() => {
    return subscribeSoundEnabled(() => {
      setSoundEnabled(getGlobalSoundEnabled());
    });
  }, []);

  const playSound = useCallback((type: SoundType, variant?: number) => {
    if (!getGlobalSoundEnabled()) return;

    // Debounce: prevent rapid-fire sounds of the same type
    const now = performance.now();
    const lastTime = lastPlayTime.get(type) || 0;
    const timeSinceLast = now - lastTime;

    if (timeSinceLast < MIN_SOUND_INTERVAL) {
      if (DEBUG_SOUND) console.log(`[SOUND] Skipped (debounce: ${Math.round(timeSinceLast)}ms)`);
      return;
    }
    lastPlayTime.set(type, now);

    // Select variant (rotating for variety)
    let selectedVariant: number;
    switch (type) {
      case 'move':
        selectedVariant = variant ?? moveVariantIndex;
        moveVariantIndex = (moveVariantIndex + 1) % 5;
        break;
      case 'capture':
        selectedVariant = variant ?? captureVariantIndex;
        captureVariantIndex = (captureVariantIndex + 1) % 5;
        break;
      default:
        selectedVariant = 0;
        break;
    }

    playSoundInternal(type, selectedVariant);
  }, []);

  const toggleSound = useCallback(() => {
    setGlobalSoundEnabled(!getGlobalSoundEnabled());
  }, []);

  return {
    soundEnabled,
    toggleSound,
    playSound,
  };
};
