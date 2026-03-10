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

// All sound paths organized by type (used by web backends only)
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
  init(): Promise<void> | void;
  preload(): Promise<void>;
  play(type: SoundType, variant: number): void;
  readonly ready: boolean;
}

// ============================================================================
// Tauri Native Audio Backend (rodio — bypasses WebKitGTK/GStreamer)
// ============================================================================

class TauriAudioBackend implements SoundBackend {
  private initialized = false;
  private initError: string | null = null;

  get ready() {
    return this.initialized;
  }

  async init(): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const invoke =
        (window as any).__TAURI__?.core?.invoke ??
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).__TAURI_INTERNALS__?.invoke;
      if (!invoke) throw new Error('Tauri invoke not available');

      await invoke('audio_init');
      this.initialized = true;
      if (DEBUG_SOUND) console.log('[SOUND:Tauri] Initialized native audio (rodio)');
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      this.initError = msg;
      console.warn('[SOUND:Tauri] Failed to init native audio:', msg);
      throw e;
    }
  }

  async preload(): Promise<void> {
    // Sounds are preloaded in Rust during audio_init
  }

  play(type: SoundType, variant: number): void {
    if (!this.initialized) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const invoke =
        (window as any).__TAURI__?.core?.invoke ??
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).__TAURI_INTERNALS__?.invoke;
      if (!invoke) return;

      // Fire-and-forget — don't await, don't block UI
      invoke('audio_play_sound', { soundType: type, variant }).catch(() => {
        // Playback error — silently ignore (sound is non-critical)
      });
    } catch {
      // invoke setup failed — ignore
    }
  }

  getInitError(): string | null {
    return this.initError;
  }
}

// ============================================================================
// Web Audio API Backend (primary for web — low latency)
// ============================================================================

class WebAudioBackend implements SoundBackend {
  private context: AudioContext | null = null;
  private buffers = new Map<string, AudioBuffer>();
  private loading = false;
  private loaded = false;
  private loadPromise: Promise<void> | null = null;
  private pendingSound: { type: SoundType; variant: number; timestamp: number } | null = null;
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
      if (DEBUG_SOUND) console.log('[SOUND:WebAudio] AudioContext created');
    } catch (e) {
      if (DEBUG_SOUND) console.warn('[SOUND:WebAudio] Failed to create AudioContext:', e);
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
          if (DEBUG_SOUND) console.warn(`[SOUND:WebAudio] Failed to load ${path}:`, e);
        }
      })
    ).then(() => {
      this.loaded = true;
      this.loading = false;
      if (DEBUG_SOUND)
        console.log(`[SOUND:WebAudio] Preloaded ${this.buffers.size}/${allPaths.length} sounds`);

      // Play pending sound if still recent
      if (this.pendingSound) {
        const elapsed = performance.now() - this.pendingSound.timestamp;
        if (elapsed < 500) this.play(this.pendingSound.type, this.pendingSound.variant);
        this.pendingSound = null;
      }
    });
    return this.loadPromise;
  }

  play(type: SoundType, variant: number): void {
    const ctx = this.context;
    if (!ctx) return;

    const path = getSoundPath(type, variant);

    // Resume if suspended
    if (ctx.state === 'suspended') {
      ctx.resume().catch(e => {
        this.resumeFailures++;
        if (this.resumeFailures <= 1) {
          console.warn('[SOUND:WebAudio] Failed to resume AudioContext:', e);
        }
      });
    }

    const buffer = this.buffers.get(path);
    if (!buffer) {
      if (this.loading && !this.pendingSound) {
        this.pendingSound = { type, variant, timestamp: performance.now() };
      }
      return;
    }

    try {
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
    } catch {
      // Play failed
    }
  }

  /** Test if the backend can actually produce audio (with timeout to prevent hanging) */
  async validate(): Promise<boolean> {
    if (!this.context) return false;
    try {
      if (this.context.state === 'suspended') {
        const resumed = await Promise.race([
          this.context.resume().then(() => true),
          new Promise<false>(resolve => setTimeout(() => resolve(false), 2000)),
        ]);
        if (!resumed) {
          if (DEBUG_SOUND) console.warn('[SOUND:WebAudio] resume() timed out');
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
// HTMLAudioElement Backend (web fallback — lazy, no preloading)
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
    // which may hang if plugins are missing
  }

  play(type: SoundType, variant: number): void {
    if (this.failed) return;

    const path = getSoundPath(type, variant);

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
      this.failed = true;
    }
  }
}

// ============================================================================
// Helpers
// ============================================================================

/** Resolve a SoundType + variant to a URL path (for web backends) */
function getSoundPath(type: SoundType, variant: number): string {
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

// ============================================================================
// Global Error Callback — notifies React when audio init fails
// ============================================================================

/** Error details for sound init failure */
export interface SoundInitError {
  message: string;
  platform: string;
  backend: string;
}

/** Callback set by the React hook to receive init errors */
let onSoundInitError: ((error: SoundInitError) => void) | null = null;

/** Register an error handler (called from useGameSounds hook) */
export const setSoundInitErrorHandler = (handler: ((error: SoundInitError) => void) | null) => {
  onSoundInitError = handler;
};

const reportSoundError = (message: string, backend: string) => {
  const platform = typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown';
  const error: SoundInitError = { message, platform, backend };
  console.warn('[SOUND] Audio initialization failed:', error);

  // Auto-disable sound
  setGlobalSoundEnabled(false);

  // Notify React (if handler registered)
  onSoundInitError?.(error);
};

// Detect Tauri environment
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isTauri = typeof window !== 'undefined' && !!(window as any).__TAURI_INTERNALS__;

const initSoundBackend = (): void => {
  if (backendInitialized) return;
  backendInitialized = true;

  if (isTauri) {
    // Desktop (Tauri): use native audio via rodio (bypasses WebKitGTK/GStreamer).
    // Do NOT fall back to WebAudio or HtmlAudio — they both go through GStreamer
    // and will either fail or freeze the WebKitWebProcess on Linux.
    const tauriBackend = new TauriAudioBackend();
    backendInitPromise = (async () => {
      try {
        await tauriBackend.init();
        activeBackend = tauriBackend;
        if (DEBUG_SOUND) console.log('[SOUND] Using Tauri native audio (rodio)');
      } catch {
        const errorMsg = tauriBackend.getInitError() || 'Unknown audio error';
        reportSoundError(errorMsg, 'tauri-rodio');
      }
    })();
    return;
  }

  // Web browser: use WebAudio (low latency) with HtmlAudio fallback.
  const htmlAudio = new HtmlAudioBackend();
  activeBackend = htmlAudio;

  backendInitPromise = (async () => {
    try {
      const webAudio = new WebAudioBackend();
      webAudio.init();
      const works = await webAudio.validate();
      if (works) {
        await webAudio.preload();
        activeBackend = webAudio;
        if (DEBUG_SOUND) console.log('[SOUND] Upgraded to Web Audio API backend');
        return;
      }
      webAudio.dispose();
    } catch {
      // Web Audio init failed — stay on HTML Audio
    }
    if (DEBUG_SOUND) console.log('[SOUND] Using HTML Audio backend');
  })();
};

const playSound_ = (type: SoundType, variant: number): void => {
  if (activeBackend) {
    activeBackend.play(type, variant);
    return;
  }
  // Wait for init (fire-and-forget, first sound may be missed)
  backendInitPromise?.then(() => {
    activeBackend?.play(type, variant);
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

    playSound_(type, selectedVariant);
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
