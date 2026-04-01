/**
 * IndexedDB storage for custom Moku detection ONNX models.
 * Reuses the same KayaDB database as AI model storage but with a dedicated key.
 */

const DB_NAME = 'KayaDB';
const MODELS_STORE = 'models';
const DB_VERSION = 2;

const MOKU_CUSTOM_MODEL_KEY = 'moku-custom-model';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = event => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(MODELS_STORE)) {
        db.createObjectStore(MODELS_STORE);
      }
    };
  });
}

export async function saveMokuCustomModel(data: ArrayBuffer): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(MODELS_STORE, 'readwrite');
    const store = tx.objectStore(MODELS_STORE);
    const request = store.put(data, MOKU_CUSTOM_MODEL_KEY);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function loadMokuCustomModel(): Promise<ArrayBuffer | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(MODELS_STORE, 'readonly');
    const store = tx.objectStore(MODELS_STORE);
    const request = store.get(MOKU_CUSTOM_MODEL_KEY);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || null);
  });
}

export async function deleteMokuCustomModel(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(MODELS_STORE, 'readwrite');
    const store = tx.objectStore(MODELS_STORE);
    const request = store.delete(MOKU_CUSTOM_MODEL_KEY);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}
