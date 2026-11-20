/**
 * Utility for storing AI models in IndexedDB
 * This allows persisting large model files (10-100MB) that won't fit in localStorage
 *
 * Storage structure:
 * - models store: Individual model data keyed by model ID
 * - metadata store: Model metadata and library state
 */

const DB_NAME = 'KayaDB';
const MODELS_STORE = 'models';
const METADATA_STORE = 'model_metadata';
const LIBRARY_KEY = 'model_library';
const SELECTED_MODEL_KEY = 'selected_model';
const DB_VERSION = 2; // Bumped for new structure

// Legacy key for migration
const LEGACY_MODEL_KEY = 'custom_katago_model';

export type ModelQuantization = 'fp32' | 'fp16' | 'uint8';

/**
 * `{name}.{quantization}.onnx` → network name plus precision.
 * A file with no precision token keeps the stem as `name` and leaves
 * `quantization` unset. Call once, when the file enters the library.
 */
export function parseModelFilename(
  filename: string
): Pick<StoredModelMetadata, 'name' | 'quantization'> {
  const base = filename.split(/[/\\]/).pop() ?? filename;
  const stem = base.replace(/\.onnx$/i, '');
  const match = stem.match(/^(.*)\.(fp32|fp16|uint8)$/i);
  if (!match?.[1]) return { name: stem || base };
  const token = match[2].toLowerCase();
  if (token === 'fp16' || token === 'fp32' || token === 'uint8') {
    return { name: match[1], quantization: token };
  }
  return { name: stem || base };
}

export interface StoredModelMetadata {
  id: string;
  /**
   * KataGo network name (`kata1-…` on katagotraining.org), or the filename
   * of a user upload. Every precision of one network shares this name.
   * Not include quantization and suffix, like `kata1-b28c512nbt-s12043015936-d5616446734`
   */
  name: string;
  /**
   * Which ONNX precision this row is. A standard filename is
   * `{name}.{quantization}.onnx`; user uploads set this from that token
   * when it is present, and leave it unset otherwise.
   */
  quantization?: ModelQuantization;
  /** Short label. Precision variants append FP16 / INT8; user uploads repeat `name`. */
  displayName: string;
  description: string;
  /** Byte size once the file is on disk. The catalog leaves this unset. */
  size?: number;
  date?: number;
  isUserModel?: boolean;
  url?: string;
}

/**
 * Open the IndexedDB database
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = event => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create models store if it doesn't exist
      if (!db.objectStoreNames.contains(MODELS_STORE)) {
        db.createObjectStore(MODELS_STORE);
      }

      // Create metadata store if it doesn't exist
      if (!db.objectStoreNames.contains(METADATA_STORE)) {
        db.createObjectStore(METADATA_STORE);
      }
    };
  });
}

/**
 * Save model data to IndexedDB
 */
export async function saveModelData(id: string, data: ArrayBuffer): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MODELS_STORE, 'readwrite');
    const store = transaction.objectStore(MODELS_STORE);
    const request = store.put(data, id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

/**
 * Load model data from IndexedDB
 */
export async function loadModelData(id: string): Promise<ArrayBuffer | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MODELS_STORE, 'readonly');
    const store = transaction.objectStore(MODELS_STORE);
    const request = store.get(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || null);
  });
}

/**
 * Delete model data from IndexedDB
 */
export async function deleteModelData(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MODELS_STORE, 'readwrite');
    const store = transaction.objectStore(MODELS_STORE);
    const request = store.delete(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

/**
 * Save model library metadata
 */
export async function saveModelLibrary(models: StoredModelMetadata[]): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(METADATA_STORE, 'readwrite');
    const store = transaction.objectStore(METADATA_STORE);
    const request = store.put(models, LIBRARY_KEY);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

/**
 * Load model library metadata
 */
export async function loadModelLibrary(): Promise<StoredModelMetadata[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(METADATA_STORE, 'readonly');
    const store = transaction.objectStore(METADATA_STORE);
    const request = store.get(LIBRARY_KEY);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || []);
  });
}

/**
 * Save selected model ID
 */
export async function saveSelectedModelId(id: string | null): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(METADATA_STORE, 'readwrite');
    const store = transaction.objectStore(METADATA_STORE);
    const request = id ? store.put(id, SELECTED_MODEL_KEY) : store.delete(SELECTED_MODEL_KEY);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

/**
 * Load selected model ID
 */
export async function loadSelectedModelId(): Promise<string | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(METADATA_STORE, 'readonly');
    const store = transaction.objectStore(METADATA_STORE);
    const request = store.get(SELECTED_MODEL_KEY);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || null);
  });
}

/**
 * Check if a model has data stored
 */
export async function hasModelData(id: string): Promise<boolean> {
  const data = await loadModelData(id);
  return data !== null;
}

/**
 * Get all model IDs with stored data
 */
export async function getStoredModelIds(): Promise<string[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MODELS_STORE, 'readonly');
    const store = transaction.objectStore(MODELS_STORE);
    const request = store.getAllKeys();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result as string[]);
  });
}

// =============================================================================
// Legacy compatibility functions (for migration from old single-model storage)
// =============================================================================

/**
 * Save the model buffer or URL to IndexedDB (LEGACY - for backward compatibility)
 * @deprecated Use saveModelData instead
 */
export async function saveModel(
  model: ArrayBuffer | string,
  metadata?: { name?: string; date?: number; size?: number }
): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MODELS_STORE, 'readwrite');
    const store = transaction.objectStore(MODELS_STORE);
    const value = {
      data: model,
      ...metadata,
    };
    const request = store.put(value, LEGACY_MODEL_KEY);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

/**
 * Load the model buffer or URL from IndexedDB (LEGACY - for backward compatibility)
 * @deprecated Use loadModelData instead
 */
export async function loadModel(): Promise<{
  data: ArrayBuffer | string;
  name?: string;
  date?: number;
  size?: number;
} | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MODELS_STORE, 'readonly');
    const store = transaction.objectStore(MODELS_STORE);
    const request = store.get(LEGACY_MODEL_KEY);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const result = request.result;
      if (!result) {
        resolve(null);
        return;
      }

      // Handle legacy format (raw ArrayBuffer or string)
      if (result instanceof ArrayBuffer || typeof result === 'string') {
        resolve({ data: result });
      } else {
        // New format (object)
        resolve(result);
      }
    };
  });
}

/**
 * Clear the stored model (LEGACY - for backward compatibility)
 * @deprecated Use deleteModelData instead
 */
export async function clearModel(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MODELS_STORE, 'readwrite');
    const store = transaction.objectStore(MODELS_STORE);
    const request = store.delete(LEGACY_MODEL_KEY);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}
