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
// Sound Backend Interface
// ============================================================================

interface SoundBackend {
  init(): void;
  preload(): Promise<void>;
  play(path: string): void;
  readonly ready: boolean;
}

// ============================================================================
// Web Audio API Backend (primary — low latency)
// ============================================================================

class WebAudioBackend implements SoundBackend {
  private context: AudioContext | null = null;
  private buffers = new Map<string, AudioBuffer>();
  private loading = false;
  private loaded = false;
  private loadPromise: Promise<void> | null = null;
  private pendingSound: { path: string; timestamp: number } | null = null;
  private resumeFailures = 0;

  get ready() {
    return this.loaded && this.context !== null;
  }

  init(): void {
    if (this.context) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Ctor = window.AudioContext || (window as any).webkitAudioContext;
      if (!Ctor) throw new Error('AudioContext not available');
      this.context = new Ctor({ latencyHint: 'interactive' });
      if (DEBUG_SOUND) console.log('[SOUND:WebAudio] ✅ AudioContext created');
    } catch (e) {
      if (DEBUG_SOUND) console.warn('[SOUND:WebAudio] ❌ Failed to create AudioContext:', e);
      this.context = null;
      throw e;
    }
  }

  async preload(): Promise<void> {
    if (this.loaded || !this.context) return;
    if (this.loadPromise) return this.loadPromise;

    this.loading = true;
    const allPaths = Object.values(SOUND_PATHS).flat();

    this.loadPromise = Promise.all(
      allPaths.map(async path => {
        try {
          const response = await fetch(path);
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const arrayBuffer = await response.arrayBuffer();
          const buffer = await this.context!.decodeAudioData(arrayBuffer);
          this.buffers.set(path, buffer);
        } catch (e) {
          if (DEBUG_SOUND) console.warn(`[SOUND:WebAudio] ❌ Failed to load ${path}:`, e);
        }
      })
    ).then(() => {
      this.loaded = true;
      this.loading = false;
      if (DEBUG_SOUND)
        console.log(`[SOUND:WebAudio] ✅ Preloaded ${this.buffers.size}/${allPaths.length} sounds`);

      // Play pending sound if still recent
      if (this.pendingSound) {
        const elapsed = performance.now() - this.pendingSound.timestamp;
        if (elapsed < 500) this.play(this.pendingSound.path);
        this.pendingSound = null;
      }
    });
    return this.loadPromise;
  }

  play(path: string): void {
    const ctx = this.context;
    if (!ctx) return;

    // Resume if suspended
    if (ctx.state === 'suspended') {
      ctx.resume().catch(e => {
        this.resumeFailures++;
        if (this.resumeFailures <= 1) {
          console.warn('[SOUND:WebAudio] ⚠️ Failed to resume AudioContext:', e);
        }
      });
    }

    const buffer = this.buffers.get(path);
    if (!buffer) {
      if (this.loading && !this.pendingSound) {
        this.pendingSound = { path, timestamp: performance.now() };
      }
      return;
    }

    try {
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
    } catch {
      // Play failed — caller can fall back
    }
  }

  /** Test if the backend can actually produce audio (with timeout to prevent hanging) */
  async validate(): Promise<boolean> {
    if (!this.context) return false;
    try {
      if (this.context.state === 'suspended') {
        // Race resume() against a timeout — WebKitGTK can hang forever
        const resumed = await Promise.race([
          this.context.resume().then(() => true),
          new Promise<false>(resolve => setTimeout(() => resolve(false), 2000)),
        ]);
        if (!resumed) {
          if (DEBUG_SOUND) console.warn('[SOUND:WebAudio] ⏱️ resume() timed out');
          return false;
        }
      }
      return this.context.state === 'running';
    } catch {
      return false;
    }
  }

  dispose(): void {
    if (this.context) {
      try {
        this.context.close();
      } catch {
        // ignore
      }
      this.context = null;
    }
    this.buffers.clear();
    this.loaded = false;
    this.loading = false;
    this.loadPromise = null;
  }
}

// ============================================================================
// HTMLAudioElement Backend (fallback — lazy, no preloading)
// ============================================================================

class HtmlAudioBackend implements SoundBackend {
  private cache = new Map<string, HTMLAudioElement>();
  private failed = false;

  get ready() {
    return !this.failed;
  }

  init(): void {
    // No-op — elements created lazily on play()
  }

  async preload(): Promise<void> {
    // No preloading — creating Audio elements can trigger GStreamer init
    // which may hang if plugins are missing (e.g. AppImage without gst-plugins)
  }

  play(path: string): void {
    if (this.failed) return;

    try {
      let el = this.cache.get(path);
      if (!el) {
        el = new Audio();
        el.preload = 'none';
        el.src = path;
        this.cache.set(path, el);
      } else {
        el.currentTime = 0;
      }
      el.play().catch(() => {
        // Playback failed — silently ignore
      });
    } catch {
      // Audio constructor or play threw — GStreamer likely broken
      this.failed = true;
    }
  }
}

// ============================================================================
// Sound Manager (selects backend, handles fallback)
// ============================================================================

let activeBackend: SoundBackend | null = null;
let backendInitialized = false;
let backendInitPromise: Promise<void> | null = null;

// Track last play time per sound type to prevent overlapping sounds
const lastPlayTime = new Map<SoundType, number>();
const MIN_SOUND_INTERVAL = 50;

// Track which variant to use (rotating for variety)
let moveVariantIndex = 0;
let captureVariantIndex = 0;

const initSoundBackend = (): void => {
  if (backendInitialized) return;
  backendInitialized = true;

  // Always set up lazy HTML Audio as the immediate backend.
  // Its play() is async and won't freeze even with broken GStreamer.
  const htmlAudio = new HtmlAudioBackend();
  activeBackend = htmlAudio;

  // In Tauri on Linux, new AudioContext() is synchronous and can freeze
  // the entire WebKitWebProcess when GStreamer plugins are missing.
  // Skip Web Audio entirely in Tauri — HTML Audio works fine.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isTauri = typeof window !== 'undefined' && !!(window as any).__TAURI_INTERNALS__;
  if (isTauri) {
    if (DEBUG_SOUND) console.log('[SOUND] Tauri detected, using HTML Audio backend');
    return;
  }

  // In browsers, try to upgrade to Web Audio API (lower latency).
  backendInitPromise = (async () => {
    try {
      const webAudio = new WebAudioBackend();
      webAudio.init();
      const works = await webAudio.validate();
      if (works) {
        await webAudio.preload();
        activeBackend = webAudio;
        if (DEBUG_SOUND) console.log('[SOUND] ✅ Upgraded to Web Audio API backend');
        return;
      }
      webAudio.dispose();
    } catch {
      // Web Audio init failed — stay on HTML Audio
    }
    if (DEBUG_SOUND) console.log('[SOUND] Using HTML Audio backend');
  })();
};

const playSound_ = (path: string): void => {
  // If backend is ready, play immediately
  if (activeBackend) {
    activeBackend.play(path);
    return;
  }
  // Otherwise wait for init (fire-and-forget, first sound may be missed)
  backendInitPromise?.then(() => {
    activeBackend?.play(path);
  });
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

const initOnInteraction = () => {
  if (backendInitialized) {
    removeInitListeners();
    return;
  }
  removeInitListeners();
  // Defer audio init off the click handler's synchronous path.
  // On WebKitGTK with missing GStreamer plugins, new AudioContext() can
  // freeze the entire process — setTimeout ensures the UI stays responsive.
  setTimeout(initSoundBackend, 0);
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
    playSound_(soundPath);
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
