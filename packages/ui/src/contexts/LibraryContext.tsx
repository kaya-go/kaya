/**
 * Library Context
 *
 * Provides library state and operations to components.
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import type { LibraryItem, LibraryItemId, LibraryStats } from '@kaya/game-library';
import { getLibraryStorage, initializeLibraryStorage } from '@kaya/game-library';
import {
  UnsavedChangesDialog,
  type UnsavedChangesAction,
} from '../components/dialogs/UnsavedChangesDialog';
import type { LibraryContextValue, LibraryProviderProps } from './library-types';
import { useLibrarySelection } from './useLibrarySelection';
import { useLibraryFileOps } from './useLibraryFileOps';

export type { LibraryContextValue, LibraryProviderProps };

const LibraryContext = createContext<LibraryContextValue | null>(null);

const LOADED_FILE_ID_KEY = 'kaya-library-loaded-file-id';

export function LibraryProvider({
  children,
  onFileOpen,
  getCurrentGameContent,
  getIsDirty,
  onSaveComplete,
}: LibraryProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [loadedFileId, setLoadedFileIdState] = useState<LibraryItemId | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LOADED_FILE_ID_KEY);
      return saved ? saved : null;
    }
    return null;
  });
  const [stats, setStats] = useState<LibraryStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Unsaved changes dialog state
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [unsavedDialogCanSave, setUnsavedDialogCanSave] = useState(false);
  const unsavedDialogResolveRef = useRef<((action: UnsavedChangesAction) => void) | null>(null);

  // Selection and expansion state
  const {
    selectedId,
    selectedIds,
    expandedIds,
    setSelectedId,
    setSelectedIds,
    setExpandedIds,
    selectItem,
    toggleItemSelection,
    selectRange,
    clearSelection,
    toggleExpanded,
    expandFolder,
    collapseFolder,
  } = useLibrarySelection(items);

  // Persist loadedFileId to localStorage
  const setLoadedFileId = useCallback((id: LibraryItemId | null) => {
    setLoadedFileIdState(id);
    if (typeof window !== 'undefined') {
      if (id) {
        localStorage.setItem(LOADED_FILE_ID_KEY, String(id));
      } else {
        localStorage.removeItem(LOADED_FILE_ID_KEY);
      }
    }
  }, []);

  // Initialize storage
  useEffect(() => {
    const init = async () => {
      try {
        await initializeLibraryStorage();
        setIsInitialized(true);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize library');
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  // Refresh items when initialized
  const refresh = useCallback(async () => {
    if (!isInitialized) return;

    setIsLoading(true);
    try {
      const storage = getLibraryStorage();
      const allItems = await storage.getAllItems();
      const libraryStats = await storage.getStats();
      setItems(allItems);
      setStats(libraryStats);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load library');
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      refresh();
    }
  }, [isInitialized, refresh]);

  // File operations (download, import/export, duplicate)
  const {
    importZip,
    exportZip,
    downloadFile,
    downloadFolder,
    downloadItems,
    duplicateItem,
    duplicateItems,
  } = useLibraryFileOps({ refresh, setError });

  // CRUD operations
  const createFolder = useCallback(
    async (name: string, parentId: LibraryItemId | null = null) => {
      const storage = getLibraryStorage();
      const folder = await storage.createFolder({ name, parentId });
      await refresh();
      if (parentId) {
        expandFolder(parentId);
      }
      return folder;
    },
    [refresh, expandFolder]
  );

  const createFile = useCallback(
    async (name: string, content: string, parentId: LibraryItemId | null = null) => {
      const storage = getLibraryStorage();
      const file = await storage.createFile({ name, content, parentId });
      await refresh();
      if (parentId) {
        expandFolder(parentId);
      }
      return file;
    },
    [refresh, expandFolder]
  );

  const renameItem = useCallback(
    async (id: LibraryItemId, newName: string) => {
      const storage = getLibraryStorage();
      await storage.renameItem({ itemId: id, newName });
      await refresh();
    },
    [refresh]
  );

  const moveItem = useCallback(
    async (id: LibraryItemId, newParentId: LibraryItemId | null) => {
      const storage = getLibraryStorage();
      await storage.moveItem({ itemId: id, newParentId });
      await refresh();
      if (newParentId) {
        expandFolder(newParentId);
      }
    },
    [refresh, expandFolder]
  );

  const deleteItem = useCallback(
    async (id: LibraryItemId) => {
      const storage = getLibraryStorage();
      await storage.deleteItem(id);
      if (selectedId === id) {
        setSelectedId(null);
      }
      setSelectedIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      if (loadedFileId === id) {
        setLoadedFileId(null);
      }
      await refresh();
    },
    [refresh, selectedId, loadedFileId, setLoadedFileId, setSelectedId, setSelectedIds]
  );

  const deleteItems = useCallback(
    async (ids: LibraryItemId[]) => {
      const storage = getLibraryStorage();
      for (const id of ids) {
        await storage.deleteItem(id);
        if (loadedFileId === id) {
          setLoadedFileId(null);
        }
      }
      setSelectedId(null);
      setSelectedIds(new Set());
      await refresh();
    },
    [refresh, loadedFileId, setLoadedFileId, setSelectedId, setSelectedIds]
  );

  // Unsaved changes dialog helpers
  const showUnsavedChangesDialog = useCallback(
    (canSave: boolean): Promise<UnsavedChangesAction> => {
      return new Promise(resolve => {
        unsavedDialogResolveRef.current = resolve;
        setUnsavedDialogCanSave(canSave);
        setShowUnsavedDialog(true);
      });
    },
    []
  );

  const handleUnsavedDialogAction = useCallback(
    async (action: UnsavedChangesAction) => {
      setShowUnsavedDialog(false);

      if (action === 'save' && loadedFileId && getCurrentGameContent) {
        const content = getCurrentGameContent();
        if (content) {
          const storage = getLibraryStorage();
          const existingFile = await storage.getItem(loadedFileId);
          if (existingFile && existingFile.type === 'file') {
            await storage.updateFile(loadedFileId, content);
            await refresh();
            onSaveComplete?.();
          }
        }
      }

      if (unsavedDialogResolveRef.current) {
        unsavedDialogResolveRef.current(action);
        unsavedDialogResolveRef.current = null;
      }
    },
    [loadedFileId, getCurrentGameContent, refresh, onSaveComplete]
  );

  const checkUnsavedChanges = useCallback(async (): Promise<boolean> => {
    if (!getIsDirty || !getIsDirty()) {
      return true;
    }

    const canSave = !!(loadedFileId && getCurrentGameContent);
    const action = await showUnsavedChangesDialog(canSave);

    if (action === 'cancel') {
      return false;
    }

    return true;
  }, [getIsDirty, loadedFileId, getCurrentGameContent, showUnsavedChangesDialog]);

  // File open/save operations
  const openFile = useCallback(
    async (id: LibraryItemId) => {
      if (id === loadedFileId) {
        return;
      }

      const canProceed = await checkUnsavedChanges();
      if (!canProceed) {
        return;
      }

      const storage = getLibraryStorage();
      const item = await storage.getItem(id);
      if (item && item.type === 'file' && onFileOpen) {
        const nameWithExt = item.name.toLowerCase().endsWith('.sgf')
          ? item.name
          : `${item.name}.sgf`;
        onFileOpen(item.content, nameWithExt);
        setLoadedFileId(id);
      }
    },
    [onFileOpen, loadedFileId, checkUnsavedChanges, setLoadedFileId]
  );

  const clearLoadedFile = useCallback(() => {
    setLoadedFileId(null);
  }, [setLoadedFileId]);

  const saveCurrentGame = useCallback(
    async (name: string, parentId: LibraryItemId | null = null) => {
      if (!getCurrentGameContent) return null;
      const content = getCurrentGameContent();
      if (!content) return null;

      const file = await createFile(name, content, parentId);
      if (file) {
        setLoadedFileId(file.id);
        onSaveComplete?.();
      }
      return file;
    },
    [getCurrentGameContent, createFile, setLoadedFileId, onSaveComplete]
  );

  const updateFile = useCallback(
    async (id: LibraryItemId, content: string) => {
      const storage = getLibraryStorage();
      await storage.updateFile(id, content);
      await refresh();
    },
    [refresh]
  );

  const updateLoadedFile = useCallback(async () => {
    if (!loadedFileId || !getCurrentGameContent) return false;
    const content = getCurrentGameContent();
    if (!content) return false;

    const storage = getLibraryStorage();

    const existingFile = await storage.getItem(loadedFileId);
    if (!existingFile || existingFile.type !== 'file') {
      setLoadedFileId(null);
      return false;
    }

    await storage.updateFile(loadedFileId, content);
    await refresh();
    onSaveComplete?.();
    return true;
  }, [loadedFileId, getCurrentGameContent, refresh, setLoadedFileId, onSaveComplete]);

  const clearLibrary = useCallback(async () => {
    const storage = getLibraryStorage();
    await storage.clear();
    setSelectedId(null);
    setExpandedIds(new Set());
    await refresh();
  }, [refresh, setSelectedId, setExpandedIds]);

  const value = useMemo<LibraryContextValue>(
    () => ({
      isInitialized,
      isLoading,
      items,
      selectedId,
      selectedIds,
      expandedIds,
      loadedFileId,
      stats,
      error,
      refresh,
      selectItem,
      toggleItemSelection,
      selectRange,
      clearSelection,
      toggleExpanded,
      expandFolder,
      collapseFolder,
      createFolder,
      createFile,
      renameItem,
      moveItem,
      deleteItem,
      deleteItems,
      openFile,
      saveCurrentGame,
      updateFile,
      updateLoadedFile,
      importZip,
      exportZip,
      downloadFile,
      downloadFolder,
      downloadItems,
      clearLibrary,
      clearLoadedFile,
      duplicateItem,
      duplicateItems,
      checkUnsavedChanges,
    }),
    [
      isInitialized,
      isLoading,
      items,
      selectedId,
      selectedIds,
      expandedIds,
      loadedFileId,
      stats,
      error,
      refresh,
      selectItem,
      toggleItemSelection,
      selectRange,
      clearSelection,
      toggleExpanded,
      expandFolder,
      collapseFolder,
      createFolder,
      createFile,
      renameItem,
      moveItem,
      deleteItem,
      deleteItems,
      openFile,
      saveCurrentGame,
      updateFile,
      updateLoadedFile,
      importZip,
      exportZip,
      downloadFile,
      downloadFolder,
      downloadItems,
      clearLibrary,
      clearLoadedFile,
      duplicateItem,
      duplicateItems,
      checkUnsavedChanges,
    ]
  );

  return (
    <LibraryContext.Provider value={value}>
      {children}
      <UnsavedChangesDialog
        isOpen={showUnsavedDialog}
        canSave={unsavedDialogCanSave}
        onAction={handleUnsavedDialogAction}
      />
    </LibraryContext.Provider>
  );
}

export function useLibrary(): LibraryContextValue {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
}
