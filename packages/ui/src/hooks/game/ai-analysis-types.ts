import { type AISettings } from '../../types/game';
import { MAX_VISITS } from '../../components/ai/mcts-visits-presets';
import { Vertex } from '@kaya/goboard';

const AI_SETTINGS_STORAGE_KEY = 'kaya-ai-settings';

// Hugging Face model repository commit hash for version pinning
// Use a specific commit to ensure reproducible model downloads
// Update this when releasing new model versions
const HF_MODEL_REVISION = '0.2.2'; // Use tag name for readability
const HF_REPO_BASE = `https://huggingface.co/kaya-go/kaya/resolve/${HF_MODEL_REVISION}`;

// Model quantization types - exported for UI components
export type ModelQuantization = 'fp32' | 'fp16' | 'uint8';

// Helper to generate model URL from name and quantization
function getModelUrl(modelName: string, quantization: ModelQuantization): string {
  return `${HF_REPO_BASE}/${modelName}/${modelName}.${quantization}.onnx`;
}

// Base model definition type - exported for UI components
export interface BaseModelDefinition {
  /** Internal name used for file paths */
  name: string;
  /** User-friendly display name */
  displayName: string;
  /** Short description */
  description: string;
  /** Whether this is the recommended model */
  recommended?: boolean;
  /** Whether this is the default model */
  isDefault?: boolean;
}

/**
 * Display name for a precision. Technical rather than a quality tier, and
 * deliberately not translated: "FP16" reads the same in every locale, and a
 * tier name like "Balanced" implies a speed/accuracy dial that does not
 * exist — which variant is fastest depends on the backend, not the variant.
 */
export const QUANT_DISPLAY_NAMES: Record<ModelQuantization, string> = {
  fp32: 'FP32',
  fp16: 'FP16',
  uint8: 'INT8',
};

// Quantization variant type - exported for UI components
export interface QuantizationVariant {
  /** Quantization type */
  quantization: ModelQuantization;
  /** i18n key for the user-friendly label */
  labelKey: string;
  /** i18n key for the description of this variant */
  descKey: string;
  /** Approximate file size */
  size: string;
}

// Base model definitions - exported for UI components.
// Single canonical model — picked at refactor 2026-05-04. The previously
// shipped "strongest" variant (kata1-b28c512nbt-adam-s11165M) is no longer
// listed; getModelId/parseModelId still understand its IDs so users with
// stored model selections continue to work, but they're guided toward the
// latest by recommended/isDefault.
export const BASE_MODELS: BaseModelDefinition[] = [
  {
    name: 'kata1-b28c512nbt-s12043015936-d5616446734',
    displayName: 'kata1-b28c512nbt-s12043M',
    description: 'Latest checkpoint (Dec 2025)',
    recommended: true,
    isDefault: true,
  },
];

// Quantization variants - exported for UI components.
//
// Framed as footprint, not as a quality tier. fp16 and uint8 are lossy
// transforms of the same weights, so they can only lose accuracy relative to
// fp32 — and which one is *fastest* depends entirely on the backend, not on
// the variant (on CoreML fp32 beats fp16; on a WebGPU adapter with
// shader-f16 the reverse holds). Speed is therefore auto-config's job, and
// the only thing left for the user to weigh is download, disk and memory
// cost. See specs/2026-09-12-precision-follows-the-backend.md.
export const QUANTIZATION_OPTIONS: QuantizationVariant[] = [
  {
    quantization: 'fp32',
    labelKey: 'aiConfig.quantLabel.fp32',
    descKey: 'aiConfig.quantDesc.fp32',
    size: '~280 MB',
  },
  {
    quantization: 'fp16',
    labelKey: 'aiConfig.quantLabel.fp16',
    descKey: 'aiConfig.quantDesc.fp16',
    size: '~140 MB',
  },
  {
    quantization: 'uint8',
    labelKey: 'aiConfig.quantLabel.uint8',
    descKey: 'aiConfig.quantDesc.uint8',
    size: '~75 MB',
  },
];

// Helper to generate model ID from base model index and quantization.
// The single canonical model uses the 'latest' prefix. The legacy
// 'strongest' prefix still parses (for back-compat with stored
// selectedModelId values), and resolves to the same baseModelIndex=0.
export function getModelId(baseModelIndex: number, quantization: ModelQuantization): string {
  // baseModelIndex is always 0 in the current single-model lineup.
  const suffix = quantization === 'fp32' ? '' : quantization === 'fp16' ? '-fp16' : '-quant';
  return `katago-latest${suffix}`;
}

// Helper to parse model ID back to base model index and quantization.
// Accepts the legacy 'strongest' prefix; both map to baseModelIndex=0.
export function parseModelId(
  modelId: string
): { baseModelIndex: number; quantization: ModelQuantization } | null {
  const match = modelId.match(/^katago-(strongest|latest)(-fp16|-quant)?$/);
  if (!match) return null;

  const baseModelIndex = 0;
  const quantization: ModelQuantization =
    match[2] === '-fp16' ? 'fp16' : match[2] === '-quant' ? 'uint8' : 'fp32';

  return { baseModelIndex, quantization };
}

// Generate predefined models from base definitions and quantization variants
export const PREDEFINED_MODELS: Array<{
  id: string;
  name: string;
  description: string;
  url: string;
  size: string;
  predefinedId: string;
  baseModelIndex: number;
  quantization: ModelQuantization;
  recommended?: boolean;
  isDefault?: boolean;
}> = BASE_MODELS.flatMap((model, modelIndex) =>
  QUANTIZATION_OPTIONS.map(variant => {
    const id = getModelId(modelIndex, variant.quantization);
    return {
      id,
      name: `${model.displayName}${
        variant.quantization === 'fp32' ? '' : ` (${QUANT_DISPLAY_NAMES[variant.quantization]})`
      }`,
      description: model.description,
      url: getModelUrl(model.name, variant.quantization),
      size: variant.size,
      predefinedId: id,
      baseModelIndex: modelIndex,
      quantization: variant.quantization,
      // No per-variant recommended/isDefault flag. Which precision to prefer
      // is a property of the host, not of the variant, so it is decided at
      // runtime from the probe (see `useAutoPick` / `pickQuantization`). The
      // static flag this used to carry hardcoded fp16 and, like the value
      // `pickQuantization` returned, was read by nobody.
    };
  })
);

// Check if WebGPU is available
function isWebGPUAvailable(): boolean {
  return typeof navigator !== 'undefined' && !!(navigator as any).gpu;
}

// Check if running in Tauri (used for default backend selection)
function isTauriDesktop(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
}

// Default backend is 'auto' — AIEngineContext probes the host and picks
// the best chain (see packages/ai-engine/src/auto-config.ts). Explicit
// values remain available for advanced overrides.
function getDefaultBackend(): AISettings['backend'] {
  return 'auto';
}

// Default AI settings
const DEFAULT_AI_SETTINGS: AISettings = {
  minProb: 0.01,
  maxTopMoves: 5,
  backend: 'auto',
  saveAnalysisToSgf: true,
  numVisits: 32,
  fullGameNumVisits: 10,
  webgpuBatchSize: 4,
  heatMapMetric: 'policy',
};

// Load AI settings from localStorage
export function loadAISettings(): AISettings {
  const hasGPU = isWebGPUAvailable();
  const isTauri = isTauriDesktop();
  const defaultBackend = getDefaultBackend();

  try {
    const stored = localStorage.getItem(AI_SETTINGS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      let backend = parsed.backend;

      // 'native', 'native-cpu', and 'pytorch' are only valid in Tauri desktop app
      if ((backend === 'native' || backend === 'native-cpu' || backend === 'pytorch') && !isTauri) {
        console.log('[AI Settings] Native/PyTorch backend not available on web, using auto');
        backend = 'auto';
      } else if (
        !['auto', 'native', 'native-cpu', 'pytorch', 'webgpu', 'webnn', 'webgl', 'wasm'].includes(
          backend
        )
      ) {
        backend = defaultBackend;
      } else if (backend === 'webgpu' && !hasGPU) {
        backend = 'auto';
      }

      return {
        minProb:
          typeof parsed.minProb === 'number' && parsed.minProb >= 0 && parsed.minProb <= 1
            ? parsed.minProb
            : DEFAULT_AI_SETTINGS.minProb,
        maxTopMoves:
          typeof parsed.maxTopMoves === 'number' &&
          parsed.maxTopMoves >= 1 &&
          parsed.maxTopMoves <= 10
            ? parsed.maxTopMoves
            : DEFAULT_AI_SETTINGS.maxTopMoves,
        backend,
        saveAnalysisToSgf:
          typeof parsed.saveAnalysisToSgf === 'boolean'
            ? parsed.saveAnalysisToSgf
            : DEFAULT_AI_SETTINGS.saveAnalysisToSgf,
        numVisits:
          typeof parsed.numVisits === 'number' &&
          parsed.numVisits >= 1 &&
          parsed.numVisits <= MAX_VISITS
            ? Math.round(parsed.numVisits)
            : DEFAULT_AI_SETTINGS.numVisits,
        fullGameNumVisits:
          typeof parsed.fullGameNumVisits === 'number' &&
          parsed.fullGameNumVisits >= 1 &&
          parsed.fullGameNumVisits <= MAX_VISITS
            ? Math.round(parsed.fullGameNumVisits)
            : DEFAULT_AI_SETTINGS.fullGameNumVisits,
        webgpuBatchSize:
          typeof parsed.webgpuBatchSize === 'number' &&
          parsed.webgpuBatchSize >= 1 &&
          parsed.webgpuBatchSize <= 16
            ? Math.round(parsed.webgpuBatchSize)
            : DEFAULT_AI_SETTINGS.webgpuBatchSize,
        heatMapMetric: ['policy', 'winRate', 'scoreLead'].includes(parsed.heatMapMetric)
          ? parsed.heatMapMetric
          : DEFAULT_AI_SETTINGS.heatMapMetric,
      };
    }
  } catch (e) {
    console.warn('[AI:Settings] Failed to load from localStorage:', e);
  }
  return {
    ...DEFAULT_AI_SETTINGS,
    backend: defaultBackend,
  };
}

// Save AI settings to localStorage
export function saveAISettings(settings: AISettings): void {
  try {
    localStorage.setItem(AI_SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn('[AI:Settings] Failed to save to localStorage:', e);
  }
}

// Helper to parse GTP vertex
export function parseGTPVertex(coord: string, boardSize: number): Vertex | null {
  if (coord.toLowerCase() === 'pass') return null;
  const alpha = 'ABCDEFGHJKLMNOPQRSTUVWXYZ';
  if (coord.length < 2) return null;

  const x = alpha.indexOf(coord[0].toUpperCase());
  const y = boardSize - parseInt(coord.slice(1), 10);

  if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) return null;
  return [x, y];
}

// Type for pending analysis action
export type PendingAnalysisAction = 'analysisBar' | 'ownership' | 'topMoves' | null;

export interface UseAIAnalysisProps {
  currentBoard: GoBoard;
  gameInfo: GameInfo;
  currentNode: GameTreeNode | null;
}

// Re-export types needed by consumers
import { GoBoard } from '@kaya/goboard';
import { GameTreeNode } from '@kaya/gametree';
import { type GameInfo } from '../../types/game';
