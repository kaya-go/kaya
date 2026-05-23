const SOUND_STORAGE_KEY = 'kaya-sound-enabled';

const loadSoundEnabled = (): boolean => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(SOUND_STORAGE_KEY);
    if (stored !== null) {
      return stored === 'true';
    }
  }
  return true; // Default to enabled
};

let globalSoundEnabled = loadSoundEnabled();
const soundListeners = new Set<() => void>();

export const getGlobalSoundEnabled = (): boolean => globalSoundEnabled;

export const setGlobalSoundEnabled = (enabled: boolean): void => {
  globalSoundEnabled = enabled;
  if (typeof window !== 'undefined') {
    localStorage.setItem(SOUND_STORAGE_KEY, String(enabled));
  }
  soundListeners.forEach(listener => listener());
};

export const subscribeSoundEnabled = (listener: () => void): (() => void) => {
  soundListeners.add(listener);
  return () => {
    soundListeners.delete(listener);
  };
};
