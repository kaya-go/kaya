/**
 * Hook encapsulating all Library Panel action handlers and related state.
 */

import { useState, useCallback, useRef, useEffect, type DragEvent, type MouseEvent } from 'react';
import { useLibrary } from '../../contexts/LibraryContext';
import { buildSGF } from '@kaya/board-recognition';
import type { LibraryItem, LibraryItemId } from '@kaya/game-library';
import type { ConfirmDialogState } from './LibraryDialogs';

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.bmp'];

export interface ContextMenuState {
  x: number;
  y: number;
  item: LibraryItem | null;
}

export function useLibraryActions() {
  const {
    items,
    selectedId,
    selectedIds,
    loadedFileId,
    createFolder,
    createFile,
    deleteItem,
    deleteItems,
    renameItem,
    moveItem,
    moveItems,
    openFile,
    importZip,
    downloadFile,
    downloadFolder,
    downloadItems,
    clearLibrary,
    duplicateItem,
    duplicateItems,
    toggleExpanded,
  } = useLibrary();

  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [renamingId, setRenamingId] = useState<LibraryItemId | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [recognitionFile, setRecognitionFile] = useState<File | null>(null);
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderParent, setNewFolderParent] = useState<LibraryItemId | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const newFolderInputInitialized = useRef(false);

  // Close the context menu on a pointer press or wheel outside it, or on Escape.
  // pointerdown precedes any drag, so react-arborist's HTML5 DnD (which fires no
  // click) closes it too; wheel keeps the fixed-position menu from floating over
  // another row once the tree scrolls.
  const isContextMenuOpen = contextMenu !== null;
  useEffect(() => {
    if (!isContextMenuOpen) return;
    const closeIfOutside = (e: Event) => {
      if (e.target instanceof Element && e.target.closest('.library-context-menu')) return;
      setContextMenu(null);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setContextMenu(null);
    };
    // Capture phase, so handlers that stop propagation (e.g. the tree's onWheel) can't swallow it
    document.addEventListener('pointerdown', closeIfOutside, true);
    document.addEventListener('wheel', closeIfOutside, { capture: true, passive: true });
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', closeIfOutside, true);
      document.removeEventListener('wheel', closeIfOutside, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isContextMenuOpen]);

  const handleDrop = useCallback(
    async (e: DragEvent<HTMLDivElement>) => {
      const files = Array.from(e.dataTransfer.files);
      if (files.length === 0) return;

      e.preventDefault();
      e.stopPropagation();
      setIsDraggingOver(false);
      // An external file drop fires no click or dragstart in the page
      setContextMenu(null);

      let targetFolderId: string | null = null;
      if (selectedId) {
        const selectedItem = items.find(i => i.id === selectedId);
        if (selectedItem) {
          targetFolderId = selectedItem.type === 'folder' ? selectedId : selectedItem.parentId;
        }
      }

      for (const file of files) {
        const lowerName = file.name.toLowerCase();
        if (IMAGE_EXTENSIONS.some(ext => lowerName.endsWith(ext))) {
          setRecognitionFile(file);
          return;
        } else if (lowerName.endsWith('.sgf')) {
          const content = await file.text();
          try {
            await createFile(file.name, content, targetFolderId);
          } catch {
            // Ignore invalid files
          }
        } else if (lowerName.endsWith('.zip')) {
          const buffer = await file.arrayBuffer();
          await importZip(buffer);
        }
      }
    },
    [createFile, importZip, selectedId, items] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    if (!e.dataTransfer.types.includes('Files')) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (!isDraggingOver) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDraggingOver(false);
    },
    [isDraggingOver]
  );

  const handleContextMenu = useCallback((e: MouseEvent, item: LibraryItem) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY, item });
  }, []);

  const handleEmptySpaceContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY, item: null });
  }, []);

  const handleImportClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;

      for (const file of Array.from(files)) {
        const lowerName = file.name.toLowerCase();
        if (IMAGE_EXTENSIONS.some(ext => lowerName.endsWith(ext))) {
          setRecognitionFile(file);
          e.target.value = '';
          return;
        } else if (lowerName.endsWith('.sgf')) {
          const content = await file.text();
          try {
            await createFile(file.name, content, null);
          } catch {
            // Ignore invalid files
          }
        } else if (lowerName.endsWith('.zip')) {
          const buffer = await file.arrayBuffer();
          await importZip(buffer);
        }
      }

      e.target.value = '';
    },
    [createFile, importZip] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const handleLibraryRecognitionImport = useCallback(
    async (stones: { x: number; y: number; color: 'black' | 'white' }[], boardSize: number) => {
      setRecognitionFile(null);
      try {
        const sgf = buildSGF(boardSize, stones);
        const filename = `scan-${boardSize}x${boardSize}.sgf`;
        await createFile(filename, sgf, null);
      } catch {
        // Ignore
      }
    },
    [createFile]
  );

  const handleNewFolder = useCallback(
    (parentIdOverride?: string | null) => {
      let parentId: string | null = null;
      if (parentIdOverride !== undefined) {
        parentId = parentIdOverride;
      } else {
        const selectedItem = selectedId ? items.find(i => i.id === selectedId) : null;
        parentId = selectedItem?.type === 'folder' ? selectedId : selectedItem?.parentId || null;
      }
      setNewFolderParent(parentId);
      setNewFolderName('New Folder');
      newFolderInputInitialized.current = false;
      setShowNewFolderDialog(true);
    },
    [selectedId, items]
  );

  const handleCreateFolder = useCallback(async () => {
    if (newFolderName.trim()) {
      await createFolder(newFolderName.trim(), newFolderParent);
    }
    setShowNewFolderDialog(false);
    setNewFolderName('');
    setNewFolderParent(null);
  }, [newFolderName, newFolderParent, createFolder]);

  const startRename = useCallback((item: LibraryItem) => {
    setRenamingId(item.id);
    setContextMenu(null);
  }, []);

  const handleRename = useCallback(
    async (value: string) => {
      try {
        if (renamingId && value.trim()) {
          await renameItem(renamingId, value.trim());
        }
      } catch (error) {
        console.error('Failed to rename library item:', error);
      } finally {
        setRenamingId(null);
      }
    },
    [renamingId, renameItem]
  );

  const handleDelete = useCallback(
    (item: LibraryItem) => {
      const title = item.type === 'folder' ? 'Delete Folder' : 'Delete File';
      const message =
        item.type === 'folder'
          ? `Delete folder "${item.name}" and all its contents?`
          : `Delete "${item.name}"?`;

      setConfirmDialog({
        title,
        message,
        danger: true,
        onConfirm: async () => {
          await deleteItem(item.id);
          setConfirmDialog(null);
        },
      });
      setContextMenu(null);
    },
    [deleteItem]
  );

  const handleBatchDelete = useCallback(
    (ids: LibraryItemId[]) => {
      const count = ids.length;
      setConfirmDialog({
        title: `Delete ${count} Items`,
        message: `Delete ${count} selected items? This cannot be undone.`,
        danger: true,
        onConfirm: async () => {
          await deleteItems(ids);
          setConfirmDialog(null);
        },
      });
      setContextMenu(null);
    },
    [deleteItems]
  );

  const handleBatchDownload = useCallback(
    async (ids: LibraryItemId[]) => {
      await downloadItems(ids);
      setContextMenu(null);
    },
    [downloadItems]
  );

  const handleBatchDuplicate = useCallback(
    async (ids: LibraryItemId[]) => {
      await duplicateItems(ids);
      setContextMenu(null);
    },
    [duplicateItems]
  );

  const handleClearLibrary = useCallback(() => {
    if (items.length === 0) return;

    setConfirmDialog({
      title: 'Clear Library',
      message: `Delete all ${items.length} items from your library? This cannot be undone.`,
      danger: true,
      onConfirm: async () => {
        await clearLibrary();
        setConfirmDialog(null);
      },
    });
  }, [items.length, clearLibrary]);

  const handleOpen = useCallback(
    (item: LibraryItem) => {
      if (item.type === 'file') {
        openFile(item.id);
      } else {
        toggleExpanded(item.id);
      }
      setContextMenu(null);
    },
    [openFile, toggleExpanded]
  );

  const handleMoveToRoot = useCallback(
    async (item: LibraryItem) => {
      if (item.parentId !== null) {
        await moveItem(item.id, null);
      }
      setContextMenu(null);
    },
    [moveItem]
  );

  const handleDuplicate = useCallback(
    async (item: LibraryItem) => {
      await duplicateItem(item.id);
      setContextMenu(null);
    },
    [duplicateItem]
  );

  const handleTreeMove = useCallback(
    async (args: { dragIds: string[]; parentId: string | null; index: number }) => {
      const { dragIds, parentId } = args;
      // Dropping among its own siblings changes nothing: the tree sorts by type, then name
      const ids = dragIds.filter(id => items.find(i => i.id === id)?.parentId !== parentId);
      if (ids.length === 0) return;
      // react-arborist does not await onMove, so a rejection here would go unhandled
      try {
        await moveItems(ids, parentId);
      } catch (error) {
        console.error('Failed to move library items:', error);
      }
    },
    [items, moveItems]
  );

  return {
    // State
    contextMenu,
    setContextMenu,
    renamingId,
    setRenamingId,
    isDraggingOver,
    recognitionFile,
    setRecognitionFile,
    showNewFolderDialog,
    setShowNewFolderDialog,
    newFolderName,
    setNewFolderName,
    confirmDialog,
    setConfirmDialog,

    // Refs
    fileInputRef,
    newFolderInputInitialized,

    // Handlers
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleContextMenu,
    handleEmptySpaceContextMenu,
    handleImportClick,
    handleFileChange,
    handleLibraryRecognitionImport,
    handleNewFolder,
    handleCreateFolder,
    startRename,
    handleRename,
    handleDelete,
    handleBatchDelete,
    handleBatchDownload,
    handleBatchDuplicate,
    handleClearLibrary,
    handleOpen,
    handleMoveToRoot,
    handleDuplicate,
    handleTreeMove,

    // Re-exported from useLibrary for convenience
    downloadFile,
    downloadFolder,
  };
}
