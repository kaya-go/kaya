import type { AutoPick, AutoPickReason, BackendId } from '@kaya/ai-engine';
import type { ModelQuantization } from '../../hooks/game/ai-analysis-types';
import type { AISettings } from '../../types/game';
import type { EngineStatus } from './engineStatus';
import { runtimeBackendToSetting, settingToChainBackend } from './backendVocabulary';

/** User-friendly backend display names for toasts. */
export function backendDisplayName(backend: string): string {
  switch (backend) {
    case 'webgpu':
    case 'webgpu-gc':
      return 'GPU';
    case 'native':
      return 'Native GPU';
    case 'native-cpu':
      return 'Native CPU';
    case 'pytorch':
      return 'PyTorch GPU';
    case 'wasm':
      return 'CPU';
    case 'webnn':
      return 'WebNN';
    default:
      return backend.toUpperCase();
  }
}

/**
 * Precision names for the mismatch toast — interpolated into an already
 * translated sentence, so it must be locale-neutral.
 */
export { QUANT_DISPLAY_NAMES as QUANT_LABELS } from '../../hooks/game/ai-analysis-types';

/**
 * Decide which backend chain to use:
 *  - settings.backend === 'auto' → full auto-pick (preferred default)
 *  - explicit setting → start from that backend, fall through the rest
 */
export function resolveBackendChain(settings: AISettings, autoPick: AutoPick): BackendId[] {
  // The settings vocabulary is not the chain vocabulary — `settingToChainBackend`
  // is the only place that translation happens, and it returns null (rather
  // than passing the value through) for anything it cannot translate.
  const preferred = settingToChainBackend(settings.backend);
  if (!preferred) {
    return autoPick.backendChain;
  }
  // Start from the explicit backend, then fall through the auto chain (de-duped).
  return [preferred, ...autoPick.backendChain.filter(b => b !== preferred)];
}

/**
 * The auto-pick reason explains the backend auto *preferred*, so it describes
 * the engine only when auto made the choice and that backend is what came up.
 * After a fallback down the chain, or with a backend chosen in settings, the
 * status carries no reason and the pill names the backend instead.
 */
export function readyReason(
  backendSetting: string,
  autoPick: AutoPick,
  activeBackend: string
): AutoPickReason | undefined {
  // Same test as `resolveBackendChain`: anything it translates is an explicit choice.
  if (settingToChainBackend(backendSetting) !== null) return undefined;
  // The runtime label is not the chain vocabulary (`native` vs `native-gpu`).
  const landedOn = settingToChainBackend(runtimeBackendToSetting(activeBackend));
  return landedOn === autoPick.backendChain[0] ? autoPick.reason : undefined;
}

/** Quantization label inferred from a model name (best effort). */
export function quantFromModelName(name: string): ModelQuantization {
  if (/\.fp16\.|-fp16/i.test(name)) return 'fp16';
  if (/\.uint8\.|-quant/i.test(name)) return 'uint8';
  return 'fp32';
}

/**
 * Module reloads lose the auto-pick reason, so rebuild a minimal ready
 * status; the pill falls back to the backend name meanwhile. The provider
 * re-derives the full status on its next initialize() call, which happens on
 * the first settings change.
 */
export function buildReadyStatus(): EngineStatus {
  return { phase: 'ready', backend: 'unknown', quantization: 'fp32' };
}
