/**
 * The backend vocabulary boundary.
 *
 * The AI backend speaks two vocabularies that overlap in most of their
 * members, which is exactly why they were easy to conflate:
 *
 *  - **Runtime** (`Engine.getRuntimeInfo().backend`) is descriptive. It names
 *    what actually came up, and it may report labels nobody can configure —
 *    `webgpu-gc` distinguishes WebGPU with graph capture from plain WebGPU.
 *  - **Settings** (`AISettings['backend']`) is prescriptive. It is persisted to
 *    localStorage and fed back into `resolveBackendChain`, so it only holds
 *    values `loadAISettings` is willing to restore.
 *
 * Everything that crosses the boundary goes through this module so the two
 * vocabularies are free to drift without one silently becoming the other.
 * See specs/2026-09-22-webgpu-gc-backend-label.md for the bug that came from
 * bridging them with a cast.
 */

import type { BackendId } from '@kaya/ai-engine';
import type { AISettings } from '../../types/game';

export type SettingsBackend = AISettings['backend'];

/** Runtime label for WebGPU with graph capture (`OnnxEngine.getRuntimeInfo`). */
export const RUNTIME_WEBGPU_GC = 'webgpu-gc';

/**
 * Runtime label → settings value.
 *
 * Lossy on purpose: graph capture is a property of the session we happened to
 * create (it depends on the model and on `?gc=0`), not a user preference, so it
 * collapses back onto `'webgpu'`.
 *
 * An unrecognised label maps to `'auto'` rather than being written through. An
 * unknown label means the vocabularies have drifted; re-probing picks a working
 * backend again, whereas persisting a string nothing else understands poisons
 * every subsequent initialization.
 */
export function runtimeBackendToSetting(runtime: string): SettingsBackend {
  switch (runtime) {
    case RUNTIME_WEBGPU_GC:
    case 'webgpu':
      return 'webgpu';
    case 'webnn':
      return 'webnn';
    case 'wasm':
      return 'wasm';
    case 'native':
      return 'native';
    case 'native-cpu':
      return 'native-cpu';
    default:
      return 'auto';
  }
}

/**
 * Settings value → the backend a chain should start with.
 *
 * Takes `string`, not `SettingsBackend`: it must also recognise values older
 * builds persisted — the legacy web `webgl`/`webnn` entries, and `pytorch`
 * from before the PyTorch sidecar was removed — so that a stale setting
 * degrades into the auto chain instead of into a backend that cannot exist.
 *
 * There is deliberately no exception for the stale `'webgpu-gc'`: it is not a
 * settings value, `loadAISettings` already drops it (its whitelist sends
 * unknown values to `'auto'`), and `'auto'` is the better answer on a desktop
 * host where the WebGPU chain does not work at all.
 *
 * Returns `null` for `'auto'` and for anything unrecognised, meaning "let the
 * probe decide".
 */
export function settingToChainBackend(setting: string): BackendId | null {
  switch (setting) {
    case 'native':
      return 'native-gpu';
    // Legacy web settings: the WebNN EP is out of the auto flow
    // (`engineChain._initWebNN`) and ORT's WebGL EP is gone, so both already
    // ran on the WASM/ONNX path.
    case 'webnn':
    case 'webgl':
      return 'wasm';
    case 'webgpu':
      return 'webgpu';
    case 'wasm':
      return 'wasm';
    case 'native-cpu':
      return 'native-cpu';
    default:
      return null;
  }
}
