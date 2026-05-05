/**
 * Engine status — a single discriminated union that drives the status pill
 * and replaces the four flag-fields the old context exposed
 * (engine, isInitializing, activeBackend, error).
 */

import type { BackendId, Quantization } from '@kaya/ai-engine';

export type EngineStatus =
  | { phase: 'idle' }
  | { phase: 'probing' }
  | {
      phase: 'loading-model';
      modelId: string;
      quantization: Quantization;
      progress?: number;
      message?: string;
    }
  | {
      phase: 'initializing';
      backend: BackendId;
      chainStep: number;
      chainTotal: number;
    }
  | {
      phase: 'ready';
      backend: string;
      quantization: Quantization;
      reasoning: string;
    }
  | { phase: 'error'; message: string };

export const idleStatus: EngineStatus = { phase: 'idle' };

export function isReady(s: EngineStatus): s is Extract<EngineStatus, { phase: 'ready' }> {
  return s.phase === 'ready';
}

export function isBusy(s: EngineStatus): boolean {
  return s.phase === 'probing' || s.phase === 'loading-model' || s.phase === 'initializing';
}
