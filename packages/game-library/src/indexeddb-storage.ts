/**
 * IndexedDB Storage Implementation
 *
 * Web-based storage using IndexedDB for the game library.
 * Works in both web and desktop (Tauri) environments.
 */

import type {
  LibraryStorage,
  LibraryItem,
  LibraryFile,
  LibraryFolder,
  LibraryItemId,
  CreateFileOptions,
  CreateFolderOptions,
  MoveItemOptions,
  RenameItemOptions,
  ImportResult,
  ExportResult,
  LibraryStats,
} from './types';
import {
  generateId,
  now,
  extractSGFMetadata,
  isValidSGF,
  sanitizeFilename,
  ensureSGFExtension,
  makeUniqueName,
} from './utils';
import { openDatabase, migrateSgfExtensions, getStore, idbRequest } from './indexeddb-db-init';
import { importZipToStorage, exportStorageToZip } from './indexeddb-zip-operations';

export class IndexedDBStorage implements LibraryStorage {
  private db: IDBDatabase | null = null;
  private initPromise: Promise<void> | null = null;
  private initError: Error | null = null;

  async initialize(): Promise<void> {
    // If already initialized, return immediately
    if (this.db) return;

    // If initialization failed previously, throw the cached error
    if (this.initError) {
      throw this.initError;
    }

    // If initialization is in progress, wait for it
    if (this.initPromise) {
      return this.initPromise;
    }

    // Check if IndexedDB is available
    if (typeof indexedDB === 'undefined') {
      this.initError = new Error(
        'IndexedDB is not available. Library storage requires IndexedDB support.'
      );
      throw this.initError;
    }

    this.initPromise = (async () => {
      try {
        this.db = await openDatabase();

        // Handle database connection being closed unexpectedly
        this.db.onclose = () => {
          this.db = null;
          this.initPromise = null;
        };

        this.db.onerror = () => {
          console.error('IndexedDB error occurred');
        };

        // Run migrations
        try {
          await migrateSgfExtensions(this.db);
        } catch (migrationError) {
          console.warn('Migration warning:', migrationError);
          // Don't fail initialization for migration errors
        }
      } catch (err) {
        this.initError = err instanceof Error ? err : new Error('Database initialization failed');
        this.initPromise = null;
        throw this.initError;
      }
    })();

    return this.initPromise;
  }

  /**
   * Ensures the database is initialized before performing operations.
   * This allows operations to wait for initialization if it's in progress.
   */
  private async ensureInitialized(): Promise<void> {
    if (this.db) return;

    // If there's an initialization in progress, wait for it
    if (this.initPromise) {
      await this.initPromise;
      return;
    }

    // If there was an initialization error, throw it
    if (this.initError) {
      throw this.initError;
    }

    // Try to initialize
    await this.initialize();
  }

  private getStoreFromDb(mode: IDBTransactionMode = 'readonly'): IDBObjectStore {
    if (!this.db) {
      throw new Error('Database not initialized. Please wait for initialization to complete.');
    }
    return getStore(this.db, mode);
  }

  async getItems(parentId: LibraryItemId | null = null): Promise<LibraryItem[]> {
    await this.ensureInitialized();
    const store = this.getStoreFromDb();
    const index = store.index('parentId');

    // For root items, we need to filter manually since IndexedDB doesn't index null well
    let items: LibraryItem[];
    if (parentId === null) {
      const allItems = await idbRequest<LibraryItem[]>(store.getAll());
      items = allItems.filter(item => item.parentId === null);
    } else {
      items = await idbRequest<LibraryItem[]>(index.getAll(parentId));
    }

    // Sort: folders first, then by name
    return items.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === 'folder' ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
  }

  async getAllItems(): Promise<LibraryItem[]> {
    await this.ensureInitialized();
    const store = this.getStoreFromDb();
    return idbRequest<LibraryItem[]>(store.getAll());
  }

  async getItem(id: LibraryItemId): Promise<LibraryItem | null> {
    await this.ensureInitialized();
    const store = this.getStoreFromDb();
    return idbRequest<LibraryItem | null>(store.get(id));
  }

  async createFile(options: CreateFileOptions): Promise<LibraryFile> {
    await this.ensureInitialized();
    const { name, content, parentId = null } = options;

    if (!isValidSGF(content)) {
      throw new Error('Invalid SGF content');
    }

    // Get existing items in the parent folder for uniqueness check
    const siblings = await this.getItems(parentId);
    const baseName = ensureSGFExtension(sanitizeFilename(name));
    const uniqueName = makeUniqueName(baseName, siblings);

    const metadata = extractSGFMetadata(content);
    const timestamp = now();

    const file: LibraryFile = {
      id: generateId(),
      name: uniqueName,
      type: 'file',
      parentId,
      createdAt: timestamp,
      updatedAt: timestamp,
      content,
      metadata,
      size: new Blob([content]).size,
    };

    const store = this.getStoreFromDb('readwrite');
    await idbRequest(store.add(file));

    // Update parent folder's item count
    if (parentId) {
      await this.updateFolderCount(parentId);
    }

    return file;
  }

  async createFolder(options: CreateFolderOptions): Promise<LibraryFolder> {
    await this.ensureInitialized();
    const { name, parentId = null } = options;

    // Get existing items in the parent folder for uniqueness check
    const siblings = await this.getItems(parentId);
    const sanitizedName = sanitizeFilename(name);
    const uniqueName = makeUniqueName(sanitizedName, siblings);

    const timestamp = now();

    const folder: LibraryFolder = {
      id: generateId(),
      name: uniqueName,
      type: 'folder',
      parentId,
      createdAt: timestamp,
      updatedAt: timestamp,
      itemCount: 0,
    };

    const store = this.getStoreFromDb('readwrite');
    await idbRequest(store.add(folder));

    // Update parent folder's item count
    if (parentId) {
      await this.updateFolderCount(parentId);
    }

    return folder;
  }

  async updateFile(id: LibraryItemId, content: string): Promise<LibraryFile> {
    await this.ensureInitialized();
    const item = await this.getItem(id);
    if (!item || item.type !== 'file') {
      throw new Error('File not found');
    }

    if (!isValidSGF(content)) {
      throw new Error('Invalid SGF content');
    }

    const metadata = extractSGFMetadata(content);
    const updatedFile: LibraryFile = {
      ...item,
      content,
      metadata,
      size: new Blob([content]).size,
      updatedAt: now(),
    };

    const store = this.getStoreFromDb('readwrite');
    await idbRequest(store.put(updatedFile));

    return updatedFile;
  }

  async renameItem(options: RenameItemOptions): Promise<LibraryItem> {
    await this.ensureInitialized();
    const { itemId, newName } = options;

    const item = await this.getItem(itemId);
    if (!item) {
      throw new Error('Item not found');
    }

    // Get siblings for uniqueness check
    const siblings = await this.getItems(item.parentId);
    const sanitizedName = sanitizeFilename(newName);
    const uniqueName = makeUniqueName(sanitizedName, siblings, itemId);

    const updatedItem: LibraryItem = {
      ...item,
      name: uniqueName,
      updatedAt: now(),
    };

    const store = this.getStoreFromDb('readwrite');
    await idbRequest(store.put(updatedItem));

    return updatedItem;
  }

  async moveItem(options: MoveItemOptions): Promise<LibraryItem> {
    await this.ensureInitialized();
    const { itemId, newParentId } = options;

    const item = await this.getItem(itemId);
    if (!item) {
      throw new Error('Item not found');
    }

    // Prevent moving a folder into itself or its descendants
    if (item.type === 'folder' && newParentId) {
      const isDescendant = await this.isDescendant(newParentId, itemId);
      if (isDescendant) {
        throw new Error('Cannot move a folder into its own descendant');
      }
    }

    const oldParentId = item.parentId;

    // Get new siblings for uniqueness check
    const newSiblings = await this.getItems(newParentId);
    const uniqueName = makeUniqueName(item.name, newSiblings, itemId);

    const updatedItem: LibraryItem = {
      ...item,
      name: uniqueName,
      parentId: newParentId,
      updatedAt: now(),
    };

    const store = this.getStoreFromDb('readwrite');
    await idbRequest(store.put(updatedItem));

    // Update folder counts
    if (oldParentId) {
      await this.updateFolderCount(oldParentId);
    }
    if (newParentId) {
      await this.updateFolderCount(newParentId);
    }

    return updatedItem;
  }

  async deleteItem(id: LibraryItemId): Promise<void> {
    await this.ensureInitialized();
    const item = await this.getItem(id);
    if (!item) {
      return;
    }

    const parentId = item.parentId;

    // If it's a folder, delete all children recursively
    if (item.type === 'folder') {
      const children = await this.getItems(id);
      for (const child of children) {
        await this.deleteItem(child.id);
      }
    }

    const store = this.getStoreFromDb('readwrite');
    await idbRequest(store.delete(id));

    // Update parent folder's item count
    if (parentId) {
      await this.updateFolderCount(parentId);
    }
  }

  async importZip(data: ArrayBuffer): Promise<ImportResult> {
    await this.ensureInitialized();
    return importZipToStorage(data, this);
  }

  async exportZip(): Promise<ExportResult> {
    await this.ensureInitialized();
    return exportStorageToZip(this);
  }

  async getStats(): Promise<LibraryStats> {
    await this.ensureInitialized();
    const items = await this.getAllItems();

    let totalFiles = 0;
    let totalFolders = 0;
    let totalSize = 0;

    for (const item of items) {
      if (item.type === 'file') {
        totalFiles++;
        totalSize += item.size;
      } else {
        totalFolders++;
      }
    }

    return { totalFiles, totalFolders, totalSize };
  }

  async clear(): Promise<void> {
    await this.ensureInitialized();
    const store = this.getStoreFromDb('readwrite');
    await idbRequest(store.clear());
  }

  // Private helper methods

  private async updateFolderCount(folderId: LibraryItemId): Promise<void> {
    const folder = await this.getItem(folderId);
    if (!folder || folder.type !== 'folder') return;

    const children = await this.getItems(folderId);

    const updatedFolder: LibraryFolder = {
      ...folder,
      itemCount: children.length,
      updatedAt: now(),
    };

    const store = this.getStoreFromDb('readwrite');
    await idbRequest(store.put(updatedFolder));
  }

  private async isDescendant(
    potentialDescendantId: LibraryItemId,
    ancestorId: LibraryItemId
  ): Promise<boolean> {
    let currentId: LibraryItemId | null = potentialDescendantId;

    while (currentId) {
      if (currentId === ancestorId) {
        return true;
      }
      const item = await this.getItem(currentId);
      currentId = item?.parentId || null;
    }

    return false;
  }
}
