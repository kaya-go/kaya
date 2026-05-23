import { type SoundType } from '../services/sounds';
import { HtmlAudioBackend, TauriAudioBackend, WebAudioBackend } from './backends';
import { setGlobalSoundEnabled } from './store';
import { DEBUG_SOUND, type SoundBackend, type SoundInitError } from './types';

let activeBackend: SoundBackend | null = null;
let backendInitialized = false;
let backendInitPromise: Promise<void> | null = null;

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

export const playSoundInternal = (type: SoundType, variant: number): void => {
  if (activeBackend) {
    activeBackend.play(type, variant);
    return;
  }
  // Wait for init (fire-and-forget, first sound may be missed)
  backendInitPromise?.then(() => {
    activeBackend?.play(type, variant);
  });
};

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

let initListenersAdded = false;

// Set up global initialization listeners immediately (capture phase to run before other handlers)
if (typeof document !== 'undefined' && !initListenersAdded) {
  initListenersAdded = true;
  document.addEventListener('click', initOnInteraction, true);
  document.addEventListener('keydown', initOnInteraction, true);
  document.addEventListener('touchstart', initOnInteraction, true);
  document.addEventListener('mousedown', initOnInteraction, true);
}
