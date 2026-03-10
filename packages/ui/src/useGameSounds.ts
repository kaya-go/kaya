import { useCallback, useEffect, useState } from 'react';
import { type SoundType } from './services/sounds';

// Debug logging (set to false to disable)
const DEBUG_SOUND = false;

// Helper to resolve asset path relative to the app's base URL
const getAssetPath = (path: string) => {
  if (typeof window !== 'undefined') {
    const base = document.baseURI || window.location.href;
    return new URL(path, base).href;
  }
  return path;
};

// All sound paths organized by type
const SOUND_PATHS = {
  move: Array.from({ length: 5 }, (_, i) => getAssetPath(`assets/move-${i}.ogg`)),
  capture: Array.from({ length: 5 }, (_, i) => getAssetPath(`assets/capture${i}.ogg`)),
  pass: getAssetPath(`assets/pass.ogg`),
  newgame: getAssetPath(`assets/newgame.ogg`),
};

// ============================================================================
// Web Audio API Implementation
// ============================================================================

// Single AudioContext shared across the app (created on first user interaction)
let audioContext: AudioContext | null = null;

// Preloaded audio buffers (decoded and ready to play instantly)
const audioBuffers = new Map<string, AudioBuffer>();

// Loading state
let isLoading = false;
let isLoaded = false;
let loadPromise: Promise<void> | null = null;

// Audio device failure tracking with retry support
let audioResumeFailures = 0;
const MAX_RESUME_RETRIES = 3;
let audioFailed = false;
let retryTimer: ReturnType<typeof setTimeout> | null = null;

// Pending sound to play once loaded (for first stone)
let pendingSound: { path: string; timestamp: number } | null = null;
const PENDING_SOUND_TIMEOUT = 500; // Max ms to wait for loading before giving up

// Track last play time per sound type to prevent overlapping sounds
const lastPlayTime = new Map<SoundType, number>();
const MIN_SOUND_INTERVAL = 50; // Minimum ms between same sound type

// Track which variant to use (rotating for variety)
let moveVariantIndex = 0;
let captureVariantIndex = 0;

/**
 * Initialize AudioContext (must be called after user interaction due to browser policy)
 */
const initAudioContext = (): AudioContext | null => {
  if (audioContext) return audioContext;
  if (audioFailed) return null;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioContext = new AudioContextClass();
      if (DEBUG_SOUND) console.log('[SOUND] ✅ AudioContext created');
    }
  } catch (e) {
    console.warn('[SOUND] ❌ Failed to create AudioContext:', e);
    audioFailed = true;
  }

  return audioContext;
};

/**
 * Try to recreate the AudioContext (used after a transient audio device failure).
 * Closes the old context and resets loading state so sounds can be re-preloaded.
 */
const recreateAudioContext = (): void => {
  if (audioContext) {
    try {
      audioContext.close();
    } catch {
      // ignore
    }
    audioContext = null;
  }
  audioBuffers.clear();
  isLoaded = false;
  isLoading = false;
  loadPromise = null;

  initAudioContext();
  if (audioContext) {
    preloadAllSounds();
  }
};

/**
 * Resume AudioContext if suspended (required after user interaction)
 */
const resumeAudioContext = async (): Promise<void> => {
  if (audioFailed || !audioContext) return;
  if (audioContext.state === 'suspended') {
    try {
      await audioContext.resume();
      // Success — reset failure counter
      if (audioResumeFailures > 0) {
        console.info('[SOUND] ✅ AudioContext resumed after previous failures');
        audioResumeFailures = 0;
      } else if (DEBUG_SOUND) {
        console.log('[SOUND] ✅ AudioContext resumed');
      }
    } catch (e) {
      if (e instanceof DOMException && e.name === 'InvalidStateError') {
        audioResumeFailures++;
        if (audioResumeFailures >= MAX_RESUME_RETRIES) {
          // Give up after several attempts
          console.warn(
            `[SOUND] ⚠️ Audio device unavailable after ${MAX_RESUME_RETRIES} attempts, disabling sound`
          );
          audioFailed = true;
          audioContext = null;
        } else if (!retryTimer) {
          // Schedule a retry: recreate AudioContext after exponential backoff
          const delay = 1000 * Math.pow(2, audioResumeFailures - 1); // 1s, 2s, 4s
          if (DEBUG_SOUND)
            console.log(
              `[SOUND] 🔄 Audio resume failed (attempt ${audioResumeFailures}/${MAX_RESUME_RETRIES}), retrying in ${delay}ms`
            );
          retryTimer = setTimeout(() => {
            retryTimer = null;
            recreateAudioContext();
          }, delay);
        }
      } else {
        console.warn('[SOUND] ⚠️ Failed to resume AudioContext:', e);
      }
    }
  }
};

/**
 * Load and decode a single audio file into an AudioBuffer
 */
const loadAudioBuffer = async (path: string): Promise<AudioBuffer | null> => {
  const ctx = initAudioContext();
  if (!ctx) return null;

  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    if (DEBUG_SOUND)
      console.log(
        `[SOUND] ✅ Loaded: ${path.split('/').pop()} (${audioBuffer.duration.toFixed(2)}s)`
      );
    return audioBuffer;
  } catch (e) {
    console.warn(`[SOUND] ❌ Failed to load ${path}:`, e);
    return null;
  }
};

/**
 * Preload all sounds into memory
 */
const preloadAllSounds = async (): Promise<void> => {
  if (audioFailed || isLoaded) return;
  if (loadPromise) return loadPromise;

  isLoading = true;

  if (DEBUG_SOUND) console.log('[SOUND] 🔄 Preloading all sounds...');

  const allPaths = Object.values(SOUND_PATHS).flat();

  loadPromise = Promise.all(
    allPaths.map(async path => {
      const buffer = await loadAudioBuffer(path);
      if (buffer) {
        audioBuffers.set(path, buffer);
      }
    })
  ).then(() => {
    isLoaded = true;
    isLoading = false;

    if (DEBUG_SOUND)
      console.log(`[SOUND] ✅ Preloaded ${audioBuffers.size}/${allPaths.length} sounds`);

    // Play any pending sound if it's still recent enough
    if (pendingSound) {
      const elapsed = performance.now() - pendingSound.timestamp;
      if (elapsed < PENDING_SOUND_TIMEOUT) {
        if (DEBUG_SOUND)
          console.log(`[SOUND] 🎵 Playing pending sound after ${Math.round(elapsed)}ms`);
        playSoundBuffer(pendingSound.path);
      } else {
        if (DEBUG_SOUND) console.log(`[SOUND] ⏭️ Pending sound expired (${Math.round(elapsed)}ms)`);
      }
      pendingSound = null;
    }
  });

  return loadPromise;
};

/**
 * Play a sound using Web Audio API
 */
const playSoundBuffer = (path: string): void => {
  if (audioFailed) return;
  const ctx = audioContext;
  if (!ctx) {
    if (DEBUG_SOUND) console.warn('[SOUND] ⚠️ No AudioContext');
    return;
  }

  const buffer = audioBuffers.get(path);
  if (!buffer) {
    // If still loading, queue this sound to play when ready
    if (isLoading && !pendingSound) {
      pendingSound = { path, timestamp: performance.now() };
      if (DEBUG_SOUND) console.log(`[SOUND] ⏳ Queued pending sound: ${path.split('/').pop()}`);
    } else if (DEBUG_SOUND) {
      console.warn(`[SOUND] ⚠️ Buffer not loaded: ${path.split('/').pop()}`);
    }
    return;
  }

  // Create a new source node (they are one-shot, can't be reused)
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start(0);

  if (DEBUG_SOUND) console.log(`[SOUND] 🎵 Playing: ${path.split('/').pop()}`);
};

// ============================================================================
// Global Sound State
// ============================================================================

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

const setGlobalSoundEnabled = (enabled: boolean) => {
  globalSoundEnabled = enabled;
  if (typeof window !== 'undefined') {
    localStorage.setItem(SOUND_STORAGE_KEY, String(enabled));
  }
  soundListeners.forEach(listener => listener());
};

// ============================================================================
// React Hook
// ============================================================================

// Track initialization state
let initListenersAdded = false;

// Initialize AudioContext and preload sounds - called once globally
const initOnInteraction = () => {
  if (audioFailed) return;
  if (audioContext && isLoaded) {
    // Already initialized — remove listeners
    removeInitListeners();
    return;
  }

  initAudioContext();
  preloadAllSounds();

  // Only remove listeners once we successfully have a context
  if (audioContext) {
    removeInitListeners();
  }
};

const removeInitListeners = () => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('click', initOnInteraction, true);
    document.removeEventListener('keydown', initOnInteraction, true);
    document.removeEventListener('touchstart', initOnInteraction, true);
    document.removeEventListener('mousedown', initOnInteraction, true);
  }
};

// Set up global initialization listeners immediately (capture phase to run before other handlers)
if (typeof document !== 'undefined' && !initListenersAdded) {
  initListenersAdded = true;
  // Use capture phase so we initialize BEFORE the click handler that plays the sound
  document.addEventListener('click', initOnInteraction, true);
  document.addEventListener('keydown', initOnInteraction, true);
  document.addEventListener('touchstart', initOnInteraction, true);
  document.addEventListener('mousedown', initOnInteraction, true);
}

export const useGameSounds = () => {
  const [soundEnabled, setSoundEnabled] = useState(globalSoundEnabled);

  // Listen for global state changes
  useEffect(() => {
    const listener = () => {
      setSoundEnabled(globalSoundEnabled);
    };
    soundListeners.add(listener);

    return () => {
      soundListeners.delete(listener);
    };
  }, []);

  const playSound = useCallback((type: SoundType, variant?: number) => {
    if (!globalSoundEnabled) return;

    // Ensure AudioContext is ready
    resumeAudioContext();

    // Debounce: prevent rapid-fire sounds of the same type
    const now = performance.now();
    const lastTime = lastPlayTime.get(type) || 0;
    const timeSinceLast = now - lastTime;

    if (timeSinceLast < MIN_SOUND_INTERVAL) {
      if (DEBUG_SOUND) console.log(`[SOUND] ⏭️ Skipped (debounce: ${Math.round(timeSinceLast)}ms)`);
      return;
    }
    lastPlayTime.set(type, now);

    // Select sound path
    let soundPath = '';

    switch (type) {
      case 'move': {
        const moveVariant = variant ?? moveVariantIndex;
        moveVariantIndex = (moveVariantIndex + 1) % 5;
        soundPath = SOUND_PATHS.move[moveVariant];
        break;
      }
      case 'capture': {
        const captureVariant = variant ?? captureVariantIndex;
        captureVariantIndex = (captureVariantIndex + 1) % 5;
        soundPath = SOUND_PATHS.capture[captureVariant];
        break;
      }
      case 'pass':
        soundPath = SOUND_PATHS.pass;
        break;
      case 'newgame':
        soundPath = SOUND_PATHS.newgame;
        break;
    }

    // Play the sound
    playSoundBuffer(soundPath);
  }, []);

  const toggleSound = useCallback(() => {
    setGlobalSoundEnabled(!globalSoundEnabled);
  }, []);

  return {
    soundEnabled,
    toggleSound,
    playSound,
  };
};
