import { useState, useEffect, useCallback, useRef } from 'react';
import {
  saveModelData,
  deleteModelData,
  loadModelLibrary,
  saveModelLibrary,
  loadSelectedModelId,
  saveSelectedModelId,
  getStoredModelIds,
  parseModelFilename,
  sha256Base64Url,
  type ModelUpload,
  type StoredModelMetadata,
} from '../../services/modelStorage';
import { type AIModel, type AIModelEntry } from '../../types/game';
import { isTauriApp } from '@kaya/platform';
import { modelCacheIdFromStorageId } from '../../contexts/ai/engineLoader';
import { listDiskCachedModels, type DiskCachedModel } from '../../services/modelDiskCache';
import { PREDEFINED_MODELS } from './ai-analysis-types';

export function useModelLibrary() {
  // The selected library model, as the engine reads it. Always derived from
  // `selectedModelId` by the effect below; nothing else sets it.
  const [customAIModel, setCustomAIModel] = useState<AIModel | null>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  // Model Library state
  const [modelLibrary, setModelLibrary] = useState<AIModelEntry[]>([]);
  const [selectedModelId, setSelectedModelIdState] = useState<string | null>(null);
  const downloadingRef = useRef<Set<string>>(new Set());
  // Same file dropped twice shares one upload before the bytes are hashed.
  // Same bytes under two names share one upload once the digest is known.
  // Lookup and insert stay synchronous so the second caller cannot miss the first.
  const uploadInflightRef = useRef({
    byFile: new Map<string, Promise<void>>(),
    byHash: new Map<string, Promise<void>>(),
  });

  // Initialize model library on mount
  useEffect(() => {
    const initModelLibrary = async () => {
      try {
        // Load stored model metadata
        const storedMetadata = await loadModelLibrary();
        const storedIds = await getStoredModelIds();
        const savedSelectedId = await loadSelectedModelId();
        const diskModels = await listDiskCachedModels();

        // Disk entries claimed by a known model; whatever is left over is a
        // model whose IndexedDB metadata is gone but whose bytes are still here.
        const claimedDiskIds = new Set<string>();
        const onDisk = (id: string): DiskCachedModel | undefined => {
          const cacheId = modelCacheIdFromStorageId(id);
          const entry = diskModels.get(cacheId);
          if (entry) claimedDiskIds.add(cacheId);
          return entry;
        };

        // Build library from predefined models + stored user models
        const library: AIModelEntry[] = [];

        // Add predefined models
        for (const preset of PREDEFINED_MODELS) {
          const storedMeta = storedMetadata.find(m => m.id === preset.id);
          const disk = onDisk(preset.id);
          const isDownloaded = storedIds.includes(preset.id) || disk !== undefined;

          library.push({
            ...preset,
            isDownloaded,
            size: storedMeta?.size ?? disk?.size,
            date: storedMeta?.date ?? disk?.modified,
            hash: storedMeta?.hash,
          });
        }

        // Add user-uploaded models
        const userModels = storedMetadata.filter(m => m.isUserModel);
        for (const userModel of userModels) {
          const disk = onDisk(userModel.id);
          const isDownloaded = storedIds.includes(userModel.id) || disk !== undefined;
          if (isDownloaded) {
            library.push({
              ...userModel,
              // A row saved before displayName existed kept the whole filename in `name`.
              ...(userModel.displayName ? {} : parseModelFilename(userModel.name)),
              size: userModel.size ?? disk?.size,
              date: userModel.date ?? disk?.modified,
              isDownloaded: true,
              isUserModel: true,
            });
          }
        }

        // Recover models that only exist on disk. Their cache ID is all we
        // have left of the original name, so it doubles as the display name.
        for (const [cacheId, disk] of diskModels) {
          if (claimedDiskIds.has(cacheId)) continue;
          library.push({
            id: cacheId,
            name: cacheId,
            displayName: cacheId,
            description: '',
            size: disk.size,
            date: disk.modified,
            isDownloaded: true,
            isUserModel: true,
          });
        }

        setModelLibrary(library);

        // Set selected model. Migrate legacy 'katago-strongest-*' IDs to
        // their 'katago-latest-*' equivalents — the strongest model was
        // dropped from the lineup at refactor 2026-05-04.
        const migratedId = savedSelectedId?.replace(/^katago-strongest/, 'katago-latest') ?? null;
        if (migratedId && library.some(m => m.id === migratedId && m.isDownloaded)) {
          setSelectedModelIdState(migratedId);
          if (migratedId !== savedSelectedId) {
            await saveSelectedModelId(migratedId);
          }
        } else {
          // Default to the first downloaded model.
          const defaultModel = library.find(m => m.isDownloaded);
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
        id: model.id,
        name: model.name,
        quantization: model.quantization,
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
        let downloadedSize: number;
        let hash: string;

        if (isTauriApp()) {
          // Use Rust-side download for reliable streaming + progress on all platforms
          // (Tauri plugin-http ReadableStream is broken on WebKitGTK/Linux)
          const { invoke } = await import('@tauri-apps/api/core');
          const { listen: tauriListen } = await import('@tauri-apps/api/event');

          // Listen for progress events from Rust
          const unlisten = await tauriListen('download-progress', (event: any) => {
            const { percent } = event.payload as {
              downloaded: number;
              total: number;
              percent: number;
            };
            setModelLibrary(prev =>
              prev.map(m => (m.id === id ? { ...m, downloadProgress: percent } : m))
            );
          });

          let tempPath: string | undefined;
          try {
            // Rust downloads to a temp file and returns the path
            tempPath = await invoke<string>('download_file', { url: model.url });

            // Disk cache is the source of truth on Tauri — skip the IndexedDB
            // mirror (would re-read $APPDATA via plugin-fs, rejected on Linux, #103).
            const modelCacheId = modelCacheIdFromStorageId(id);
            const cacheResult = await invoke<{ path: string; size: number; hash: string }>(
              'onnx_cache_downloaded_file',
              { tempPath, modelId: modelCacheId }
            );
            downloadedSize = cacheResult.size;
            hash = cacheResult.hash;
          } finally {
            unlisten();
          }
        } else {
          // Web environment: Direct download from Hugging Face (CORS enabled).
          // Browser users need the bytes in IndexedDB (no native disk cache).
          let response: Response;
          try {
            console.log(`[ModelDownload] Downloading: ${model.url}`);
            response = await fetch(model.url);
            if (!response.ok) {
              throw new Error(`HTTP ${response.status} ${response.statusText}`);
            }
          } catch (e: any) {
            throw new Error(`Download failed: ${e.message || 'Network error'}`);
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

          // Concatenate chunks into a single ArrayBuffer
          const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
          const buffer = new ArrayBuffer(totalLength);
          const view = new Uint8Array(buffer);
          let offset = 0;
          for (const chunk of chunks) {
            view.set(chunk, offset);
            offset += chunk.length;
          }
          chunks.length = 0;

          hash = await sha256Base64Url(buffer);
          await saveModelData(id, buffer);
          downloadedSize = buffer.byteLength;
        }

        // Update metadata (size comes from disk on Tauri, from buffer on web)
        const storedMetadata = await loadModelLibrary();
        const newMetadata: StoredModelMetadata = {
          id,
          name: model.name,
          displayName: model.displayName,
          description: model.description,
          size: downloadedSize,
          date: Date.now(),
          url: model.url,
          quantization: model.quantization,
          hash,
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
                  size: downloadedSize,
                  date: Date.now(),
                  hash,
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
    [modelLibrary]
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
              await invoke('onnx_delete_cached_model', {
                modelId: modelCacheIdFromStorageId(id),
              });
            }
          } catch (tauriErr) {
            console.warn('[AI:Download] Failed to delete model from Tauri cache:', tauriErr);
          }
        }

        // The stored row describes the bytes that are now gone (size, date,
        // hash), so it goes for a catalog model too: a hash left behind would
        // make a later upload of the same file select a model that is not there.
        const storedMetadata = await loadModelLibrary();
        await saveModelLibrary(storedMetadata.filter(m => m.id !== id));

        const model = modelLibrary.find(m => m.id === id);
        if (model?.isUserModel) {
          setModelLibrary(prev => prev.filter(m => m.id !== id));
        } else {
          // A catalog model stays listed, ready to download again.
          setModelLibrary(prev =>
            prev.map(m =>
              m.id === id
                ? { ...m, isDownloaded: false, size: undefined, date: undefined, hash: undefined }
                : m
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

  // Upload a model. A second drop of the same file, or of the same bytes, selects the copy already stored.
  const uploadModel = useCallback(async (file: ModelUpload) => {
    const fingerprint = `${file.name}\0${file.size}\0${file.lastModified}`;
    const pendingFile = uploadInflightRef.current.byFile.get(fingerprint);
    if (pendingFile) return pendingFile;

    let task!: Promise<void>;
    task = (async () => {
      const buffer = await file.arrayBuffer();
      const hash = await sha256Base64Url(buffer);

      const pendingHash = uploadInflightRef.current.byHash.get(hash);
      if (pendingHash && pendingHash !== task) {
        await pendingHash;
      } else {
        uploadInflightRef.current.byHash.set(hash, task);
      }

      try {
        const [storedMetadata, storedIds, diskModels] = await Promise.all([
          loadModelLibrary(),
          getStoredModelIds(),
          listDiskCachedModels(),
        ]);
        // A stored row can outlive its bytes (the browser evicted them, the
        // file left the models directory). Only a row that still has its bytes
        // is the copy already stored; `initModelLibrary` applies the same test.
        const hasBytes = (id: string) =>
          storedIds.includes(id) || diskModels.has(modelCacheIdFromStorageId(id));
        const existing = storedMetadata.find(m => m.hash === hash && hasBytes(m.id));
        if (existing) {
          setSelectedModelIdState(existing.id);
          await saveSelectedModelId(existing.id);
          return;
        }

        const parsed = parseModelFilename(file.name);
        const id = `${parsed.displayName}-${hash.slice(0, 12)}`;

        await saveModelData(id, buffer);

        const newMetadata: StoredModelMetadata = {
          id,
          ...parsed,
          description: 'User uploaded model',
          size: file.size,
          date: Date.now(),
          isUserModel: true,
          hash,
        };
        // Replace a row left under the same id by bytes that are gone.
        await saveModelLibrary([...storedMetadata.filter(m => m.id !== id), newMetadata]);

        const newEntry: AIModelEntry = {
          ...newMetadata,
          isDownloaded: true,
        };
        setModelLibrary(prev => [...prev.filter(m => m.id !== id), newEntry]);
        setSelectedModelIdState(id);
        await saveSelectedModelId(id);
      } finally {
        if (uploadInflightRef.current.byHash.get(hash) === task) {
          uploadInflightRef.current.byHash.delete(hash);
        }
      }
    })();

    // Register before this function awaits. The async body has already yielded
    // on arrayBuffer(), so a second drop in a later turn sees this promise.
    uploadInflightRef.current.byFile.set(fingerprint, task);
    try {
      await task;
    } finally {
      if (uploadInflightRef.current.byFile.get(fingerprint) === task) {
        uploadInflightRef.current.byFile.delete(fingerprint);
      }
    }
  }, []);

  // Set selected model ID with persistence
  const setSelectedModelId = useCallback(async (id: string | null) => {
    setSelectedModelIdState(id);
    await saveSelectedModelId(id);
  }, []);

  return {
    customAIModel,
    isModelLoaded,
    modelLibrary,
    selectedModelId,
    setSelectedModelId,
    downloadModel,
    deleteModel,
    uploadModel,
  };
}
