/**
 * Regression tests for the backend vocabulary boundary.
 *
 * A WebGPU session with graph capture reports the runtime label `'webgpu-gc'`
 * (see `OnnxEngine.getRuntimeInfo`). That label is not a member of
 * `AISettings['backend']`. It used to be persisted verbatim, and the next
 * initialization then matched no case in `initOneBackend`'s switch, kept its
 * `['wasm']` defaults and quietly ran on WASM — in the field this read as
 * "WebGPU doesn't work in Firefox", because only the *first* initialization of
 * a session used the GPU.
 *
 * See specs/2026-09-22-webgpu-gc-backend-label.md.
 */

import { describe, test, expect } from 'bun:test';
import type { AutoPick } from '@kaya/ai-engine';
import type { AISettings } from '../src/types/game';
import {
  RUNTIME_WEBGPU_GC,
  runtimeBackendToSetting,
  settingToChainBackend,
} from '../src/contexts/ai/backendVocabulary';
import { readyReason, resolveBackendChain } from '../src/contexts/ai/engineHelpers';

/** Runtime labels `getRuntimeInfo().backend` can report today. */
const RUNTIME_LABELS = [
  'webgpu',
  RUNTIME_WEBGPU_GC,
  'webnn',
  'wasm',
  'native',
  'native-cpu',
  'pytorch',
];

/** A probe that found a browser GPU: WebGPU preferred, WASM as fallback. */
const webAutoPick: AutoPick = {
  modelId: 'kata1-b28-latest',
  quantization: 'fp16',
  backendChain: ['webgpu', 'wasm'],
  reason: 'webgpu',
};

/** Every backend id `initOneBackend` has a case for. */
const CHAIN_VOCABULARY = ['webgpu', 'wasm', 'native-gpu', 'native-cpu', 'pytorch'];

function settings(backend: AISettings['backend']): AISettings {
  return {
    minProb: 0.01,
    maxTopMoves: 5,
    backend,
    saveAnalysisToSgf: true,
    numVisits: 32,
    fullGameNumVisits: 10,
    webgpuBatchSize: 4,
    heatMapMetric: 'policy',
  };
}

describe('runtimeBackendToSetting', () => {
  test('collapses the graph-capture label onto the webgpu setting', () => {
    expect(runtimeBackendToSetting(RUNTIME_WEBGPU_GC)).toBe('webgpu');
  });

  test('every runtime label maps to a settings value the chain can interpret', () => {
    for (const runtime of RUNTIME_LABELS) {
      const persisted = runtimeBackendToSetting(runtime);
      expect(settingToChainBackend(persisted)).not.toBeNull();
    }
  });

  test('an unknown runtime label becomes auto instead of being written through', () => {
    expect(runtimeBackendToSetting('webgpu-something-new')).toBe('auto');
    expect(runtimeBackendToSetting('')).toBe('auto');
  });
});

describe('settingToChainBackend', () => {
  test('keeps the explicit backends working', () => {
    expect(settingToChainBackend('webgpu')).toBe('webgpu');
    expect(settingToChainBackend('wasm')).toBe('wasm');
    expect(settingToChainBackend('native')).toBe('native-gpu');
    expect(settingToChainBackend('native-cpu')).toBe('native-cpu');
    expect(settingToChainBackend('pytorch')).toBe('pytorch');
  });

  test('maps the legacy web backends onto the WASM/ONNX path', () => {
    expect(settingToChainBackend('webnn')).toBe('wasm');
    expect(settingToChainBackend('webgl')).toBe('wasm');
  });

  test('returns null (let the probe decide) for auto and for junk', () => {
    expect(settingToChainBackend('auto')).toBeNull();
    expect(settingToChainBackend('cpu')).toBeNull();
  });

  test('the stale runtime label is not a settings value either', () => {
    // loadAISettings' whitelist sends it to 'auto', which is also the platform-
    // correct answer on desktop, where the WebGPU chain cannot run.
    expect(settingToChainBackend(RUNTIME_WEBGPU_GC)).toBeNull();
  });
});

describe('resolveBackendChain', () => {
  test('auto uses the probe chain unchanged', () => {
    expect(resolveBackendChain(settings('auto'), webAutoPick)).toEqual(['webgpu', 'wasm']);
  });

  test('explicit webgpu starts the chain and the auto chain follows', () => {
    expect(resolveBackendChain(settings('webgpu'), webAutoPick)).toEqual(['webgpu', 'wasm']);
  });

  test('explicit wasm keeps the auto chain as its fallback', () => {
    expect(resolveBackendChain(settings('wasm'), webAutoPick)).toEqual(['wasm', 'webgpu']);
  });

  test('an unrecognised setting falls back to the probe chain', () => {
    const junk = 'webgpu-gc-typo' as AISettings['backend'];
    expect(resolveBackendChain(settings(junk), webAutoPick)).toEqual(['webgpu', 'wasm']);
  });

  /**
   * The invariant that broke in the field: `initOneBackend` switches on the
   * chain and has a case per BackendId, so a chain entry outside that set is
   * either a thrown error or — before this was fixed — a silent WASM session
   * built from the switch's own defaults.
   */
  test('the chain only ever contains backend ids initOneBackend handles', () => {
    const persisted = [
      'auto',
      'webgpu',
      'wasm',
      'native',
      'native-cpu',
      'pytorch',
      'webnn',
      'webgl',
      RUNTIME_WEBGPU_GC, // what a pre-fix build wrote into localStorage
      'cpu',
    ];

    for (const backend of persisted) {
      const chain = resolveBackendChain(settings(backend as AISettings['backend']), webAutoPick);
      for (const entry of chain) {
        expect(CHAIN_VOCABULARY).toContain(entry);
      }
    }
  });

  /* The field symptom: persisting what the runtime reported must not point the
     next initialization at a different backend. */
  test('persisting the reported backend does not change the next chain', () => {
    const first = resolveBackendChain(settings('webgpu'), webAutoPick);
    const persisted = runtimeBackendToSetting(RUNTIME_WEBGPU_GC);
    const second = resolveBackendChain(settings(persisted), webAutoPick);

    expect(second).toEqual(first);
    expect(second[0]).toBe('webgpu');
  });
});

/* The status pill shows the reason as the name of the running backend, so it
   must never describe a backend other than the one that came up. */
describe('readyReason', () => {
  test('auto landing on its preferred backend keeps the reason', () => {
    expect(readyReason('auto', webAutoPick, 'webgpu')).toBe('webgpu');
    // Graph capture is still the preferred WebGPU backend.
    expect(readyReason('auto', webAutoPick, RUNTIME_WEBGPU_GC)).toBe('webgpu');
  });

  test('a fallback down the chain drops the reason', () => {
    expect(readyReason('auto', webAutoPick, 'wasm')).toBeUndefined();
  });

  test('the native runtime label matches the native-gpu chain entry', () => {
    const desktop: AutoPick = {
      ...webAutoPick,
      backendChain: ['native-gpu', 'native-cpu'],
      reason: 'nativeGpu',
    };
    expect(readyReason('auto', desktop, 'native')).toBe('nativeGpu');
    expect(readyReason('auto', desktop, 'native-cpu')).toBeUndefined();
  });

  test('a backend chosen in settings drops the reason, even when it is the preferred one', () => {
    expect(readyReason('webgpu', webAutoPick, 'webgpu')).toBeUndefined();
    expect(readyReason('wasm', webAutoPick, 'wasm')).toBeUndefined();
  });
});
