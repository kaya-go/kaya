import { type AISettings } from '../../types/game';
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

// Quantization variant type - exported for UI components
export interface QuantizationVariant {
  /** Quantization type */
  quantization: ModelQuantization;
  /** User-friendly label */
  label: string;
  /** Description of this quantization level */
  description: string;
  /** Approximate file size */
  size: string;
}

// Base model definitions - exported for UI components
export const BASE_MODELS: BaseModelDefinition[] = [
  {
    name: 'kata1-b28c512nbt-adam-s11165M-d5387M',
    displayName: 'kata1-b28c512nbt-s11165M',
    description: 'Strongest network',
    recommended: true,
    isDefault: true,
  },
  {
    name: 'kata1-b28c512nbt-s12043015936-d5616446734',
    displayName: 'kata1-b28c512nbt-s12043M',
    description: 'Latest checkpoint (Dec 2025)',
  },
];

// Quantization variants - exported for UI components
export const QUANTIZATION_OPTIONS: QuantizationVariant[] = [
  {
    quantization: 'fp32',
    label: 'Full Precision (fp32)',
    description: 'Highest accuracy, largest file size',
    size: '~280 MB',
  },
  {
    quantization: 'fp16',
    label: 'Half Precision (fp16)',
    description: 'Good balance of accuracy and size',
    size: '~140 MB',
  },
  {
    quantization: 'uint8',
    label: 'Quantized (uint8)',
    description: 'Smallest size, slightly reduced accuracy',
    size: '~75 MB',
  },
];

// Helper to generate model ID from base model index and quantization
export function getModelId(baseModelIndex: number, quantization: ModelQuantization): string {
  const prefix = baseModelIndex === 0 ? 'strongest' : 'latest';
  const suffix = quantization === 'fp32' ? '' : quantization === 'fp16' ? '-fp16' : '-quant';
  return `katago-${prefix}${suffix}`;
}

// Helper to parse model ID back to base model index and quantization
export function parseModelId(
  modelId: string
): { baseModelIndex: number; quantization: ModelQuantization } | null {
  const match = modelId.match(/^katago-(strongest|latest)(-fp16|-quant)?$/);
  if (!match) return null;

  const baseModelIndex = match[1] === 'strongest' ? 0 : 1;
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
  QUANTIZATION_OPTIONS.map((variant, variantIndex) => {
    const id = getModelId(modelIndex, variant.quantization);
    return {
      id,
      name: `${model.displayName}${variant.quantization === 'fp32' ? '' : ` (${variant.quantization})`}`,
      description: `${model.description}${variant.quantization === 'fp32' ? '' : ` - ${variant.description.toLowerCase()}`}`,
      url: getModelUrl(model.name, variant.quantization),
      size: variant.size,
      predefinedId: id,
      baseModelIndex: modelIndex,
      quantization: variant.quantization,
      // Apply recommended/isDefault to fp16 variant (best balance of quality and GPU memory)
      ...(variantIndex === 1 && model.recommended ? { recommended: true } : {}),
      ...(variantIndex === 1 && model.isDefault ? { isDefault: true } : {}),
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

// Get default backend based on environment
function getDefaultBackend(): 'native' | 'webgpu' | 'wasm' {
  if (isTauriDesktop()) {
    return 'native';
  }
  if (isWebGPUAvailable()) {
    return 'webgpu';
  }
  return 'wasm';
}

// Default AI settings
const DEFAULT_AI_SETTINGS: AISettings = {
  minProb: 0.01,
  maxTopMoves: 5,
  backend: 'wasm', // This will be overridden by loadAISettings
  saveAnalysisToSgf: true,
  numVisits: 1,
  webgpuBatchSize: 4,
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
        console.log(
          '[AI Settings] Native/PyTorch backend not available on web, falling back to wasm'
        );
        backend = 'wasm';
      } else if (
        !['native', 'native-cpu', 'pytorch', 'webgpu', 'webnn', 'webgl', 'wasm'].includes(backend)
      ) {
        backend = defaultBackend;
      } else if (backend === 'webgpu' && !hasGPU) {
        backend = 'wasm';
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
          typeof parsed.numVisits === 'number' && parsed.numVisits >= 1 && parsed.numVisits <= 400
            ? Math.round(parsed.numVisits)
            : DEFAULT_AI_SETTINGS.numVisits,
        webgpuBatchSize:
          typeof parsed.webgpuBatchSize === 'number' &&
          parsed.webgpuBatchSize >= 1 &&
          parsed.webgpuBatchSize <= 16
            ? Math.round(parsed.webgpuBatchSize)
            : DEFAULT_AI_SETTINGS.webgpuBatchSize,
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
