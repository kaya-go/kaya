import { useState, useEffect, useCallback, useRef } from 'react';
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
import { type AIModel, type AIModelEntry } from '../../types/game';
import { isTauriApp } from '@kaya/platform';
import { fetch as tauriFetch } from '@tauri-apps/plugin-http';
import { PREDEFINED_MODELS } from './ai-analysis-types';

export function useModelLibrary() {
  // Legacy model state (for backward compatibility with AIAnalysisOverlay)
  const [customAIModel, setCustomAIModel] = useState<AIModel | null>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

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
      setCustomAIModel({
        data: selectedModelId,
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
            const w = window as any;
            const invoke = w.__TAURI__?.core?.invoke || w.__TAURI_INTERNALS__?.invoke;

            if (typeof invoke === 'function') {
              await invoke('onnx_delete_cached_model', { modelId: id });
            }
          } catch (tauriErr) {
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
      if (model && model.data instanceof File) {
        await uploadModel(model.data);
      } else if (!model) {
        setSelectedModelIdState(null);
        await saveSelectedModelId(null);
        setCustomAIModel(null);
      }
    },
    [uploadModel]
  );

  return {
    customAIModel,
    setCustomAIModel: handleSetCustomAIModel,
    isModelLoaded,
    modelLibrary,
    selectedModelId,
    setSelectedModelId,
    downloadModel,
    deleteModel,
    uploadModel,
  };
}
