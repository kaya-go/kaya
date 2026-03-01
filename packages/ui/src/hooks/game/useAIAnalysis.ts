import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  loadModelData,
  saveModelData,
  deleteModelData,
  loadModelLibrary,
  saveModelLibrary,
  loadSelectedModelId,
  saveSelectedModelId,
  getStoredModelIds,
  type StoredModelMetadata,
} from '../../services/modelStorage';
import { type AIModel, type AISettings, type GameInfo, type AIModelEntry } from '../../types/game';
import { GoBoard, Vertex } from '@kaya/goboard';
import { GameTreeNode } from '@kaya/gametree';
import { AnalysisResult } from '@kaya/ai-engine';
import { isTauriApp } from '../../services/fileSave';
import { fetch as tauriFetch } from '@tauri-apps/plugin-http';

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
const PREDEFINED_MODELS: Array<{
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
  // In Tauri desktop, default to native for best performance
  if (isTauriDesktop()) {
    return 'native';
  }
  // In web, default to WebGPU if available for GPU acceleration
  if (isWebGPUAvailable()) {
    return 'webgpu';
  }
  return 'wasm';
}

// Default AI settings
const DEFAULT_AI_SETTINGS: AISettings = {
  minProb: 0.01,
  maxTopMoves: 5, // Show up to 5 top moves by default
  // Default depends on environment - set dynamically
  backend: 'wasm', // This will be overridden by loadAISettings
  saveAnalysisToSgf: true,
  numVisits: 1, // Policy-only by default (fastest); increase for MCTS tree search
  webgpuBatchSize: 4, // Default batch size for WebGPU graph capture
};

// Load AI settings from localStorage
function loadAISettings(): AISettings {
  const hasGPU = isWebGPUAvailable();
  const isTauri = isTauriDesktop();
  const defaultBackend = getDefaultBackend();

  try {
    const stored = localStorage.getItem(AI_SETTINGS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate backend - if GPU was selected but not available, fallback to WASM
      let backend = parsed.backend;

      // 'native', 'native-cpu', and 'pytorch' are only valid in Tauri desktop app
      // If we're on web and backend is one of these, fallback to 'wasm'
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
        backend = 'wasm'; // GPU not available, fallback
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
  // Return defaults with environment-specific backend
  return {
    ...DEFAULT_AI_SETTINGS,
    backend: defaultBackend,
  };
}

// Save AI settings to localStorage
function saveAISettings(settings: AISettings): void {
  try {
    localStorage.setItem(AI_SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn('[AI:Settings] Failed to save to localStorage:', e);
  }
}

interface UseAIAnalysisProps {
  currentBoard: GoBoard;
  gameInfo: GameInfo;
  currentNode: GameTreeNode | null;
}

// Helper to parse GTP vertex
function parseGTPVertex(coord: string, boardSize: number): Vertex | null {
  if (coord.toLowerCase() === 'pass') return null;
  const alpha = 'ABCDEFGHJKLMNOPQRSTUVWXYZ';
  if (coord.length < 2) return null;

  const x = alpha.indexOf(coord[0].toUpperCase());
  const y = boardSize - parseInt(coord.slice(1), 10);

  if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) return null;
  return [x, y];
}

// Type for pending analysis action
type PendingAnalysisAction = 'analysisBar' | 'ownership' | 'topMoves' | null;

export function useAIAnalysis({ currentBoard }: UseAIAnalysisProps) {
  // Legacy model state (for backward compatibility with AIAnalysisOverlay)
  const [customAIModel, setCustomAIModel] = useState<AIModel | null>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isAIConfigOpen, setAIConfigOpen] = useState(false);
  const [analysisMode, setAnalysisMode] = useState(false);
  // Track pending analysis action to trigger after model download
  const [pendingAnalysisAction, setPendingAnalysisAction] = useState<PendingAnalysisAction>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResultState, setAnalysisResultState] = useState<any | null>(null);
  const [aiSettings, setAISettingsState] = useState<AISettings>(loadAISettings);

  // Simple wrapper for consistency with context API
  const setAnalysisResult = useCallback((result: any | null) => {
    setAnalysisResultState(result);
  }, []);
  const analysisResult = analysisResultState;
  const [engineState, setEngineState] = useState<string>('ready');

  // Analysis cache (persisted across renders)
  const analysisCache = useRef<Map<string, AnalysisResult>>(new Map());

  // Shared cache size state - updated by all components that modify the cache
  const [analysisCacheSize, setAnalysisCacheSize] = useState<number>(0);

  // Function to sync cache size with actual cache
  const updateAnalysisCacheSize = useCallback(() => {
    setAnalysisCacheSize(analysisCache.current.size);
  }, []);

  // Model Library state
  const [modelLibrary, setModelLibrary] = useState<AIModelEntry[]>([]);
  const [selectedModelId, setSelectedModelIdState] = useState<string | null>(null);
  const downloadingRef = useRef<Set<string>>(new Set());

  // Initialize model library on mount
  useEffect(() => {
    const initModelLibrary = async () => {
      try {
        // Load stored model metadata
        const storedMetadata = await loadModelLibrary();
        const storedIds = await getStoredModelIds();
        const savedSelectedId = await loadSelectedModelId();

        // Build library from predefined models + stored user models
        const library: AIModelEntry[] = [];

        // Add predefined models
        for (const preset of PREDEFINED_MODELS) {
          const storedMeta = storedMetadata.find(m => m.id === preset.id);
          const isDownloaded = storedIds.includes(preset.id);

          library.push({
            id: preset.id,
            name: preset.name,
            description: preset.description,
            url: preset.url,
            predefinedId: preset.predefinedId,
            recommended: preset.recommended,
            isDefault: preset.isDefault,
            baseModelIndex: preset.baseModelIndex,
            quantization: preset.quantization,
            isDownloaded,
            size: storedMeta?.size,
            date: storedMeta?.date,
          });
        }

        // Add user-uploaded models
        const userModels = storedMetadata.filter(m => m.isUserModel);
        for (const userModel of userModels) {
          const isDownloaded = storedIds.includes(userModel.id);
          if (isDownloaded) {
            library.push({
              id: userModel.id,
              name: userModel.name,
              description: userModel.description,
              size: userModel.size,
              date: userModel.date,
              isDownloaded: true,
              isUserModel: true,
            });
          }
        }

        setModelLibrary(library);

        // Set selected model
        if (savedSelectedId && library.some(m => m.id === savedSelectedId && m.isDownloaded)) {
          setSelectedModelIdState(savedSelectedId);
        } else {
          // Default to strongest model if downloaded, otherwise first downloaded
          const defaultModel =
            library.find(m => m.predefinedId === 'strongest' && m.isDownloaded) ||
            library.find(m => m.isDownloaded);
          if (defaultModel) {
            setSelectedModelIdState(defaultModel.id);
            await saveSelectedModelId(defaultModel.id);
          }
        }

        setIsModelLoaded(true);
      } catch (err) {
        console.error('[AI:Download] Failed to initialize model library:', err);
        setIsModelLoaded(true);
      }
    };

    initModelLibrary();
  }, []);

  // Sync customAIModel metadata with selectedModelId for backward compatibility
  // IMPORTANT: We do NOT load the actual model data here to avoid keeping ~700MB in memory.
  // The data is loaded on-demand when analysis starts (in AIAnalysisOverlay).
  useEffect(() => {
    if (!selectedModelId || !isModelLoaded) {
      setCustomAIModel(null);
      return;
    }

    const model = modelLibrary.find(m => m.id === selectedModelId);
    if (model && model.isDownloaded) {
      // Only store metadata - NOT the actual ArrayBuffer data
      // Use selectedModelId as a marker that data should be loaded on-demand
      setCustomAIModel({
        data: selectedModelId, // This is now just an ID reference, not actual data
        name: model.name,
        size: model.size,
        date: model.date,
      });
    } else {
      setCustomAIModel(null);
    }
  }, [selectedModelId, isModelLoaded, modelLibrary]);

  // Download a model
  const downloadModel = useCallback(
    async (id: string) => {
      const model = modelLibrary.find(m => m.id === id);
      if (!model || !model.url || downloadingRef.current.has(id)) return;

      downloadingRef.current.add(id);

      // Update library to show downloading state
      setModelLibrary(prev =>
        prev.map(m => (m.id === id ? { ...m, isDownloading: true, downloadProgress: 0 } : m))
      );

      try {
        let response: Response | null = null;
        let lastError: any = null;

        if (isTauriApp()) {
          try {
            response = await tauriFetch(model.url);
          } catch (e) {
            lastError = e;
          }
        } else {
          // Web environment: Direct download from Hugging Face (CORS enabled)
          try {
            console.log(`[ModelDownload] Downloading: ${model.url}`);
            const res = await fetch(model.url);
            if (res.ok) {
              console.log(`[ModelDownload] Success`);
              response = res;
            } else {
              console.warn(`[ModelDownload] Failed: ${res.status} ${res.statusText}`);
            }
          } catch (e) {
            lastError = e;
            console.warn(`[ModelDownload] Network error:`, e);
          }
        }

        if (!response || !response.ok) {
          throw new Error(
            `Failed to download: ${response?.statusText || lastError?.message || 'Unknown error'}`
          );
        }

        const contentLength = response.headers.get('Content-Length');
        const total = contentLength ? parseInt(contentLength, 10) : 0;
        let loaded = 0;

        const reader = response.body?.getReader();
        if (!reader) throw new Error('ReadableStream not supported');

        const chunks: Uint8Array[] = [];

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          chunks.push(value);
          loaded += value.length;
          if (total) {
            const progress = Math.round((loaded / total) * 100);
            setModelLibrary(prev =>
              prev.map(m => (m.id === id ? { ...m, downloadProgress: progress } : m))
            );
          }
        }

        // Concatenate chunks directly into a single ArrayBuffer to avoid memory bloat
        // (Blob + arrayBuffer() creates multiple copies and can crash the browser)
        const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
        const buffer = new ArrayBuffer(totalLength);
        const view = new Uint8Array(buffer);
        let offset = 0;
        for (const chunk of chunks) {
          view.set(chunk, offset);
          offset += chunk.length;
        }
        // Free chunks memory immediately
        chunks.length = 0;

        // Save to storage
        await saveModelData(id, buffer);

        // Update metadata
        const storedMetadata = await loadModelLibrary();
        const newMetadata: StoredModelMetadata = {
          id,
          name: model.name,
          description: model.description,
          size: buffer.byteLength,
          date: Date.now(),
          predefinedId: model.predefinedId,
          url: model.url,
        };

        const existingIndex = storedMetadata.findIndex(m => m.id === id);
        if (existingIndex >= 0) {
          storedMetadata[existingIndex] = newMetadata;
        } else {
          storedMetadata.push(newMetadata);
        }
        await saveModelLibrary(storedMetadata);

        // Update library state
        setModelLibrary(prev =>
          prev.map(m =>
            m.id === id
              ? {
                  ...m,
                  isDownloaded: true,
                  isDownloading: false,
                  downloadProgress: undefined,
                  size: buffer.byteLength,
                  date: Date.now(),
                }
              : m
          )
        );

        // Auto-select the newly downloaded model
        setSelectedModelIdState(id);
        await saveSelectedModelId(id);

        // Use default toast if available (not available in hook, relying on UI feedback)
      } catch (err) {
        console.error('[AI:Download] Failed to download model:', err);
        setModelLibrary(prev =>
          prev.map(m =>
            m.id === id ? { ...m, isDownloading: false, downloadProgress: undefined } : m
          )
        );
        throw err;
      } finally {
        downloadingRef.current.delete(id);
      }
    },
    [modelLibrary, selectedModelId]
  );

  // Delete a model
  const deleteModel = useCallback(
    async (id: string) => {
      try {
        // Delete data from IndexedDB storage (browser local storage)
        await deleteModelData(id);

        // If running in Tauri, also delete from the native cache directory
        if (isTauriApp()) {
          try {
            // Get the Tauri invoke function from the global window object
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const w = window as any;
            const invoke = w.__TAURI__?.core?.invoke || w.__TAURI_INTERNALS__?.invoke;

            if (typeof invoke === 'function') {
              await invoke('onnx_delete_cached_model', { modelId: id });
            }
          } catch (tauriErr) {
            // Log but don't fail - IndexedDB deletion is the primary storage
            console.warn('[AI:Download] Failed to delete model from Tauri cache:', tauriErr);
          }
        }

        // Update metadata
        const storedMetadata = await loadModelLibrary();
        const model = modelLibrary.find(m => m.id === id);

        if (model?.isUserModel) {
          // Remove user model entirely from metadata
          const filtered = storedMetadata.filter(m => m.id !== id);
          await saveModelLibrary(filtered);

          // Remove from library
          setModelLibrary(prev => prev.filter(m => m.id !== id));
        } else {
          // Keep predefined model in library but mark as not downloaded
          setModelLibrary(prev =>
            prev.map(m =>
              m.id === id ? { ...m, isDownloaded: false, size: undefined, date: undefined } : m
            )
          );
        }

        // If this was the selected model, clear selection
        if (selectedModelId === id) {
          setSelectedModelIdState(null);
          await saveSelectedModelId(null);
          setCustomAIModel(null);
        }
      } catch (err) {
        console.error('[AI:Download] Failed to delete model:', err);
        throw err;
      }
    },
    [modelLibrary, selectedModelId]
  );

  // Upload a model
  const uploadModel = useCallback(async (file: File) => {
    const id = `user-${Date.now()}-${file.name}`;
    const buffer = await file.arrayBuffer();

    // Save to storage
    await saveModelData(id, buffer);

    // Update metadata
    const storedMetadata = await loadModelLibrary();
    const newMetadata: StoredModelMetadata = {
      id,
      name: file.name,
      description: 'User uploaded model',
      size: file.size,
      date: Date.now(),
      isUserModel: true,
    };
    storedMetadata.push(newMetadata);
    await saveModelLibrary(storedMetadata);

    // Add to library
    const newEntry: AIModelEntry = {
      id,
      name: file.name,
      description: 'User uploaded model',
      size: file.size,
      date: Date.now(),
      isDownloaded: true,
      isUserModel: true,
    };

    setModelLibrary(prev => [...prev, newEntry]);

    // Auto-select the uploaded model
    setSelectedModelIdState(id);
    await saveSelectedModelId(id);
  }, []);

  // Set selected model ID with persistence
  const setSelectedModelId = useCallback(async (id: string | null) => {
    setSelectedModelIdState(id);
    await saveSelectedModelId(id);
  }, []);

  // Legacy wrapper for setCustomAIModel (for backward compatibility)
  const handleSetCustomAIModel = useCallback(
    async (model: AIModel | null) => {
      // This is now handled through the model library
      // But we keep it for backward compatibility
      if (model && model.data instanceof File) {
        await uploadModel(model.data);
      } else if (!model) {
        // Clear selection
        setSelectedModelIdState(null);
        await saveSelectedModelId(null);
        setCustomAIModel(null);
      }
    },
    [uploadModel]
  );

  const setAISettings = useCallback((settings: Partial<AISettings>) => {
    setAISettingsState(prev => {
      const newSettings = { ...prev, ...settings };
      saveAISettings(newSettings);
      return newSettings;
    });
  }, []);

  // Derived values
  // Ownership heatmap state
  const [showOwnership, setShowOwnership] = useState(false);
  // Top moves heatmap state (default OFF - user must enable)
  const [showTopMoves, setShowTopMoves] = useState(false);
  // Analysis bar visibility (independent from analysisMode which controls engine)
  const [showAnalysisBar, setShowAnalysisBar] = useState(false);

  // Helper to check if any analysis feature is active
  const checkShouldDisableAnalysis = useCallback(
    (newShowOwnership: boolean, newShowTopMoves: boolean, newShowAnalysisBar: boolean) => {
      // Disable analysis mode only if ALL toggles are off
      return !newShowOwnership && !newShowTopMoves && !newShowAnalysisBar;
    },
    []
  );

  // Check if any model is downloaded
  const hasAnyDownloadedModel = useMemo(
    () => modelLibrary.some(m => m.isDownloaded),
    [modelLibrary]
  );

  // Effect to trigger pending analysis action after a model is downloaded
  useEffect(() => {
    if (hasAnyDownloadedModel && pendingAnalysisAction) {
      // A model was downloaded and we have a pending action
      const action = pendingAnalysisAction;
      setPendingAnalysisAction(null);

      // Execute the pending action
      if (action === 'analysisBar') {
        setShowAnalysisBar(true);
        setShowTopMoves(true);
        setAnalysisMode(true);
      } else if (action === 'ownership') {
        setShowOwnership(true);
        setAnalysisMode(true);
      } else if (action === 'topMoves') {
        setShowTopMoves(true);
        setAnalysisMode(true);
      }
    }
  }, [hasAnyDownloadedModel, pendingAnalysisAction]);

  const toggleOwnership = useCallback(() => {
    // If trying to enable but no model is downloaded, open config dialog instead
    if (!showOwnership && !hasAnyDownloadedModel) {
      setPendingAnalysisAction('ownership');
      setAIConfigOpen(true);
      return;
    }

    setShowOwnership(prev => {
      const newValue = !prev;
      // When enabling ownership view, also enable analysis mode to start the engine
      if (newValue && !analysisMode) {
        setAnalysisMode(true);
      } else if (!newValue && analysisMode) {
        // Check if we should disable analysis mode (all toggles off)
        if (checkShouldDisableAnalysis(!prev, showTopMoves, showAnalysisBar)) {
          setAnalysisMode(false);
        }
      }
      return newValue;
    });
  }, [
    analysisMode,
    setAnalysisMode,
    showTopMoves,
    showAnalysisBar,
    showOwnership,
    hasAnyDownloadedModel,
    setAIConfigOpen,
    checkShouldDisableAnalysis,
  ]);

  const toggleTopMoves = useCallback(() => {
    // If trying to enable but no model is downloaded, open config dialog instead
    if (!showTopMoves && !hasAnyDownloadedModel) {
      setPendingAnalysisAction('topMoves');
      setAIConfigOpen(true);
      return;
    }

    setShowTopMoves(prev => {
      const newValue = !prev;
      // When enabling top moves view, also enable analysis mode to start the engine
      if (newValue && !analysisMode) {
        setAnalysisMode(true);
      } else if (!newValue && analysisMode) {
        // Check if we should disable analysis mode (all toggles off)
        if (checkShouldDisableAnalysis(showOwnership, !prev, showAnalysisBar)) {
          setAnalysisMode(false);
        }
      }
      return newValue;
    });
  }, [
    analysisMode,
    setAnalysisMode,
    showOwnership,
    showAnalysisBar,
    showTopMoves,
    hasAnyDownloadedModel,
    setAIConfigOpen,
    checkShouldDisableAnalysis,
  ]);

  const toggleShowAnalysisBar = useCallback(() => {
    // If trying to enable but no model is downloaded, open config dialog instead
    if (!showAnalysisBar && !hasAnyDownloadedModel) {
      setPendingAnalysisAction('analysisBar');
      setAIConfigOpen(true);
      return;
    }

    setShowAnalysisBar(prev => {
      const newValue = !prev;
      // Sync showTopMoves with showAnalysisBar:
      // - When enabling analysis bar, also enable top moves
      // - When disabling analysis bar, also disable top moves
      setShowTopMoves(newValue);
      // Sync analysisMode with showAnalysisBar:
      // - When enabling analysis bar, enable analysisMode to trigger live analysis
      // - When disabling analysis bar, check if all toggles are off
      if (newValue && !analysisMode) {
        setAnalysisMode(true);
      } else if (!newValue && analysisMode) {
        // When closing analysis bar, also turn off top moves (already done above)
        // Check if we should disable analysis mode (all toggles off)
        // Note: showTopMoves will be set to false above, so use false for the check
        if (checkShouldDisableAnalysis(showOwnership, false, false)) {
          setAnalysisMode(false);
        }
      }
      return newValue;
    });
  }, [
    analysisMode,
    setAnalysisMode,
    showOwnership,
    showAnalysisBar,
    hasAnyDownloadedModel,
    setAIConfigOpen,
    checkShouldDisableAnalysis,
  ]);

  const winRate = useMemo(() => analysisResult?.winRate ?? null, [analysisResult]);
  const scoreLead = useMemo(() => analysisResult?.scoreLead ?? null, [analysisResult]);
  const bestMove = useMemo(() => {
    if (!analysisResult?.moveSuggestions?.[0]?.move) return null;
    return parseGTPVertex(analysisResult.moveSuggestions[0].move, currentBoard.width);
  }, [analysisResult, currentBoard.width]);

  return {
    customAIModel,
    setCustomAIModel: handleSetCustomAIModel,
    isModelLoaded,
    isAIConfigOpen,
    setAIConfigOpen,
    analysisMode,
    setAnalysisMode,
    isAnalyzing,
    setIsAnalyzing,
    analysisResult,
    setAnalysisResult,
    showOwnership,
    toggleOwnership,
    showTopMoves,
    toggleTopMoves,
    showAnalysisBar,
    setShowAnalysisBar,
    toggleShowAnalysisBar,
    aiSettings,
    setAISettings,
    winRate,
    scoreLead,
    bestMove,
    engineState,
    analysisCache,
    analysisCacheSize,
    updateAnalysisCacheSize,
    // Model Library
    modelLibrary,
    selectedModelId,
    setSelectedModelId,
    downloadModel,
    deleteModel,
    uploadModel,
  };
}
