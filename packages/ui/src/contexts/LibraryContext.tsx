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
import type { LibraryItemId } from '@kaya/game-library';
import { getLibraryStorage } from '@kaya/game-library';
import {
  UnsavedChangesDialog,
  type UnsavedChangesAction,
} from '../components/dialogs/UnsavedChangesDialog';
import type { LibraryContextValue, LibraryProviderProps } from './library-types';
import { useLibrarySelection } from './useLibrarySelection';
import { useLibraryFileOps } from './useLibraryFileOps';
import { useLibraryItems } from './useLibraryItems';
import { useTranslation } from 'react-i18next';
import { useToast } from '../components/ui/Toast';

export type { LibraryContextValue, LibraryProviderProps };

const LibraryContext = createContext<LibraryContextValue | null>(null);

const LOADED_FILE_ID_KEY = 'kaya-library-loaded-file-id';

export function LibraryProvider({
  children,
  onFileOpen,
  getCurrentGameContent,
  getIsDirty,
  onSaveComplete,
  onLoadedFileRenamed,
}: LibraryProviderProps) {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { isInitialized, isLoading, items, stats, error, setError, refresh } = useLibraryItems();
  const [loadedFileId, setLoadedFileIdState] = useState<LibraryItemId | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LOADED_FILE_ID_KEY);
      return saved ? saved : null;
    }
    return null;
  });

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
      // Use the returned name: storage may sanitize or uniquify it.
      const renamed = await storage.renameItem({ itemId: id, newName });
      await refresh();
      // Notify outside when the loaded file's stored name changed.
      if (id === loadedFileId) {
        onLoadedFileRenamed?.(renamed.name);
      }
    },
    [refresh, loadedFileId, onLoadedFileRenamed]
  );

  const moveItems = useCallback(
    async (ids: LibraryItemId[], newParentId: LibraryItemId | null) => {
      const storage = getLibraryStorage();
      // Destination may uniquify the name; remember if the open file's stored name changed.
      let loadedFileNewName: string | undefined;
      try {
        for (const id of ids) {
          // Use the returned name: storage may uniquify on collision in the destination.
          const moved = await storage.moveItem({ itemId: id, newParentId });
          if (id === loadedFileId) {
            loadedFileNewName = moved.name;
          }
        }
      } finally {
        // Refresh once, even after a partial failure, so the tree matches storage
        await refresh();
        if (newParentId) {
          expandFolder(newParentId);
        }
        // Same path as renameItem: keep the header session filename aligned.
        if (loadedFileNewName !== undefined) {
          onLoadedFileRenamed?.(loadedFileNewName);
        }
      }
    },
    [refresh, expandFolder, loadedFileId, onLoadedFileRenamed]
  );

  const moveItem = useCallback(
    (id: LibraryItemId, newParentId: LibraryItemId | null) => moveItems([id], newParentId),
    [moveItems]
  );

  // Deleting a folder deletes its files: drop the open file's id if it went too.
  const forgetLoadedFileIfGone = useCallback(async () => {
    if (loadedFileId && !(await getLibraryStorage().getItem(loadedFileId))) {
      setLoadedFileId(null);
    }
  }, [loadedFileId, setLoadedFileId]);

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
      await forgetLoadedFileIfGone();
      await refresh();
    },
    [refresh, selectedId, forgetLoadedFileIfGone, setSelectedId, setSelectedIds]
  );

  const deleteItems = useCallback(
    async (ids: LibraryItemId[]) => {
      const storage = getLibraryStorage();
      for (const id of ids) {
        await storage.deleteItem(id);
      }
      await forgetLoadedFileIfGone();
      setSelectedId(null);
      setSelectedIds(new Set());
      await refresh();
    },
    [refresh, forgetLoadedFileIfGone, setSelectedId, setSelectedIds]
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

      // Save that did not write must not let the caller replace the game.
      let outcome = action;
      if (action === 'save') {
        const saved = await updateLoadedFile().catch(err => {
          console.error('[Library] Save before leaving the game failed:', err);
          return false;
        });
        if (!saved) {
          outcome = 'cancel';
          showToast(t('toast.failedToSave'), 'error');
        }
      }

      unsavedDialogResolveRef.current?.(outcome);
      unsavedDialogResolveRef.current = null;
    },
    [updateLoadedFile, showToast, t]
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
        // Marked as the open file only once the editor has it: a content the
        // editor refuses leaves the game in place, under its own name.
        await onFileOpen(item.content, nameWithExt);
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

  const clearLibrary = useCallback(async () => {
    const storage = getLibraryStorage();
    await storage.clear();
    setSelectedId(null);
    setLoadedFileId(null);
    setExpandedIds(new Set());
    await refresh();
  }, [refresh, setSelectedId, setLoadedFileId, setExpandedIds]);

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
      moveItems,
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
      moveItems,
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
