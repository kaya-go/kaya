/**
 * IndexedDB Database Initialization and Helpers
 *
 * Low-level database operations: opening the database, schema creation,
 * migrations, and IDBRequest helpers.
 */

import type { LibraryItem } from './types';
import { getExtension } from './utils';

export const DB_NAME = 'kaya-library';
export const DB_VERSION = 1;
export const STORE_NAME = 'items';

// Migration key to track if .sgf extension migration has run
const MIGRATION_KEY = 'kaya-library-sgf-extension-migrated';

/**
 * Get an object store from the database for a transaction.
 */
export function getStore(db: IDBDatabase, mode: IDBTransactionMode = 'readonly'): IDBObjectStore {
  const transaction = db.transaction(STORE_NAME, mode);
  return transaction.objectStore(STORE_NAME);
}

/**
 * Wrap an IDBRequest in a Promise.
 */
export function idbRequest<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Open the IndexedDB database, creating object stores and indexes if needed.
 * Includes a timeout to handle environments where IndexedDB may be blocked.
 */
export function openDatabase(): Promise<IDBDatabase> {
  const INIT_TIMEOUT_MS = 10000; // 10 seconds timeout

  return new Promise<IDBDatabase>((resolve, reject) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let completed = false;

    const complete = (success: boolean, result?: IDBDatabase, error?: Error) => {
      if (completed) return;
      completed = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      if (success && result) {
        resolve(result);
      } else {
        reject(error || new Error('Database initialization failed'));
      }
    };

    // Set up timeout
    timeoutId = setTimeout(() => {
      complete(
        false,
        undefined,
        new Error(
          'Database initialization timed out. This may happen in private/incognito browsing mode with strict privacy settings.'
        )
      );
    }, INIT_TIMEOUT_MS);

    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        complete(
          false,
          undefined,
          new Error(
            'Failed to open library database. This may happen in private/incognito browsing mode.'
          )
        );
      };

      request.onsuccess = () => {
        complete(true, request.result);
      };

      request.onupgradeneeded = event => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object store for library items
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });

          // Indexes for efficient querying
          store.createIndex('parentId', 'parentId', { unique: false });
          store.createIndex('type', 'type', { unique: false });
          store.createIndex('name', 'name', { unique: false });
          store.createIndex('updatedAt', 'updatedAt', { unique: false });
        }
      };

      request.onblocked = () => {
        complete(
          false,
          undefined,
          new Error('Database is blocked. Please close other tabs using this application.')
        );
      };
    } catch (err) {
      complete(
        false,
        undefined,
        err instanceof Error ? err : new Error('Failed to initialize database')
      );
    }
  });
}

/**
 * Migration: Add .sgf extension to existing files that don't have it.
 * This runs once after initialization, tracked via localStorage.
 */
export async function migrateSgfExtensions(db: IDBDatabase): Promise<void> {
  // Check if migration has already run
  if (typeof localStorage !== 'undefined' && localStorage.getItem(MIGRATION_KEY)) {
    return;
  }

  const store = getStore(db, 'readwrite');
  const items = await idbRequest<LibraryItem[]>(store.getAll());

  let migrated = 0;
  for (const item of items) {
    if (item.type === 'file') {
      const ext = getExtension(item.name).toLowerCase();
      if (ext !== '.sgf') {
        // Add .sgf extension
        item.name = `${item.name}.sgf`;
        const writeStore = getStore(db, 'readwrite');
        await idbRequest(writeStore.put(item));
        migrated++;
      }
    }
  }

  if (migrated > 0) {
    console.log(`Migrated ${migrated} library files to include .sgf extension`);
  }

  // Mark migration as complete
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(MIGRATION_KEY, 'true');
  }
}
