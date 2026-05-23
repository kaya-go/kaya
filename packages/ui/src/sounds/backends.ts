import { type SoundType } from '../services/sounds';
import { DEBUG_SOUND, SOUND_PATHS, type SoundBackend, getSoundPath } from './types';

// ============================================================================
// Tauri Native Audio Backend (rodio — bypasses WebKitGTK/GStreamer)
// ============================================================================

export class TauriAudioBackend implements SoundBackend {
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

export class WebAudioBackend implements SoundBackend {
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

export class HtmlAudioBackend implements SoundBackend {
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
