import type { AutoPick, BackendId } from '@kaya/ai-engine';
import type { ModelQuantization } from '../../hooks/game/ai-analysis-types';
import type { AISettings } from '../../types/game';
import type { EngineStatus } from './engineStatus';

/** User-friendly backend display names for toasts. */
export function backendDisplayName(backend: string): string {
  switch (backend) {
    case 'webgpu':
    case 'webgpu-gc':
      return 'GPU';
    case 'native':
    case 'native-cpu':
      return 'Native';
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

export const QUANT_LABELS: Record<ModelQuantization, string> = {
  fp32: 'Full Quality',
  fp16: 'Balanced',
  uint8: 'Compact',
};

/**
 * Decide which backend chain to use:
 *  - settings.backend === 'auto' → full auto-pick (preferred default)
 *  - explicit setting → start from that backend, fall through the rest
 */
export function resolveBackendChain(settings: AISettings, autoPick: AutoPick): BackendId[] {
  const explicit = settings.backend;
  if (!explicit || explicit === 'auto') {
    return autoPick.backendChain;
  }
  // Map old backend ids to BackendId; 'native' → 'native-gpu'
  const mapped: BackendId =
    explicit === 'native'
      ? 'native-gpu'
      : explicit === 'webnn' || explicit === 'webgl'
        ? 'wasm'
        : (explicit as BackendId);
  // Start from explicit, then fall through the auto chain (de-duped).
  return [mapped, ...autoPick.backendChain.filter(b => b !== mapped)];
}

/** Quantization label inferred from a model name (best effort). */
export function quantFromModelName(name: string): ModelQuantization {
  if (/\.fp16\.|-fp16/i.test(name)) return 'fp16';
  if (/\.uint8\.|-quant/i.test(name)) return 'uint8';
  return 'fp32';
}

/**
 * Module reloads lose auto-pick reasoning, so rebuild a minimal ready
 * status. The provider re-derives full reasoning on its next initialize()
 * call, which happens on first settings change.
 */
export function buildReadyStatus(): EngineStatus {
  return { phase: 'ready', backend: 'unknown', quantization: 'fp32', reasoning: '' };
}
