/**
 * Hook encapsulating all Library Panel action handlers and related state.
 */

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  type DragEvent,
  type MouseEvent,
  type RefObject,
} from 'react';
import type { TreeApi } from 'react-arborist';
import { useTranslation } from 'react-i18next';
import { useLibrary } from '../../contexts/LibraryContext';
import { buildSGF } from '@kaya/board-recognition';
import { decodeSgf } from '@kaya/sgf';
import type { LibraryItem, LibraryItemId } from '@kaya/game-library';
import { contextMenuSelection } from '../../utils/librarySelection';
import type { TreeNode } from './LibraryTreeNode';
import type { ConfirmDialogState } from './LibraryDialogs';
import type { DuplicateResult } from '../../contexts/library-types';
import { useToast } from '../ui/Toast';
import {
  formatDuplicateError,
  formatImportResultError,
  formatImportResultWarning,
  formatLibraryFileImportError,
} from '../../utils/sgfLoadErrors';
import { useOpenLibraryFile } from './useOpenLibraryFile';

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.bmp'];

export interface ContextMenuState {
  x: number;
  y: number;
  item: LibraryItem | null;
}

export function useLibraryActions(treeRef: RefObject<TreeApi<TreeNode> | null>) {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const openFile = useOpenLibraryFile();
  const {
    items,
    selectedId,
    selectedIds,
    loadedFileId,
    createFolder,
    createFile,
    deleteItem,
    deleteItems,
    moveItem,
    moveItems,
    importZip,
    downloadFile,
    downloadFolder,
    downloadItems,
    clearLibrary,
    duplicateItem,
    duplicateItems,
    toggleExpanded,
    selectItem,
  } = useLibrary();

  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [recognitionFile, setRecognitionFile] = useState<File | null>(null);
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderParent, setNewFolderParent] = useState<LibraryItemId | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const newFolderInputInitialized = useRef(false);

  // Shared .sgf / .zip / image import used by drop and the file picker.
  const importLibraryFiles = useCallback(
    async (files: File[], parentId: string | null) => {
      // The recognition dialog takes one photo. It opens once the other files
      // are stored, so a photo in a multi-file import does not drop the rest.
      let photo: File | null = null;
      for (const file of files) {
        const lowerName = file.name.toLowerCase();
        if (IMAGE_EXTENSIONS.some(ext => lowerName.endsWith(ext))) {
          photo ??= file;
          continue;
        }
        if (lowerName.endsWith('.sgf')) {
          try {
            await createFile(file.name, decodeSgf(await file.arrayBuffer()), parentId);
          } catch (error) {
            showToast(formatLibraryFileImportError(error, t), 'error');
          }
        } else if (lowerName.endsWith('.zip')) {
          const buffer = await file.arrayBuffer();
          const result = await importZip(buffer);
          const message = formatImportResultError(result, t);
          if (message) showToast(message, 'error');
          const warning = formatImportResultWarning(result, t);
          if (warning) showToast(warning, 'info');
        }
      }
      if (photo) setRecognitionFile(photo);
    },
    [createFile, importZip, showToast, t]
  );

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

      await importLibraryFiles(files, targetFolderId);
    },
    [importLibraryFiles, selectedId, items]
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

  const handleContextMenu = useCallback(
    (e: MouseEvent, item: LibraryItem) => {
      e.preventDefault();
      e.stopPropagation();
      // The menu describes the selection. A row outside it becomes the selection;
      // a row already inside a group leaves the group in place.
      const next = contextMenuSelection(selectedIds, item.id);
      if (next !== selectedIds) selectItem(item.id);
      setContextMenu({ x: e.clientX, y: e.clientY, item });
    },
    [selectedIds, selectItem]
  );

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

      await importLibraryFiles(Array.from(files), null);
      e.target.value = '';
    },
    [importLibraryFiles]
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
      setNewFolderName(t('library.newFolder'));
      newFolderInputInitialized.current = false;
      setShowNewFolderDialog(true);
    },
    [selectedId, items, t]
  );

  const handleCreateFolder = useCallback(async () => {
    if (newFolderName.trim()) {
      await createFolder(newFolderName.trim(), newFolderParent);
    }
    setShowNewFolderDialog(false);
    setNewFolderName('');
    setNewFolderParent(null);
  }, [newFolderName, newFolderParent, createFolder]);

  // node.edit() sets the tree's editing id. canDrag is false while that is set,
  // so a drag inside the rename field selects text instead of moving the row.
  const startRename = useCallback(
    (item: LibraryItem) => {
      setContextMenu(null);
      void treeRef.current?.edit(item.id);
    },
    [treeRef]
  );

  const handleDelete = useCallback(
    (item: LibraryItem) => {
      const title = item.type === 'folder' ? t('library.deleteFolder') : t('library.deleteFile');
      const message =
        item.type === 'folder'
          ? t('library.deleteFolderConfirm', { name: item.name })
          : t('library.deleteFileConfirm', { name: item.name });

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
    [deleteItem, t]
  );

  const handleBatchDelete = useCallback(
    (ids: LibraryItemId[]) => {
      const count = ids.length;
      setConfirmDialog({
        title: t('library.deleteItemsTitle', { count }),
        message: t('library.deleteItemsConfirm', { count }),
        danger: true,
        onConfirm: async () => {
          await deleteItems(ids);
          setConfirmDialog(null);
        },
      });
      setContextMenu(null);
    },
    [deleteItems, t]
  );

  const handleBatchDownload = useCallback(
    async (ids: LibraryItemId[]) => {
      await downloadItems(ids);
      setContextMenu(null);
    },
    [downloadItems]
  );

  // A duplication copies what it can and names what it could not.
  const reportDuplicate = useCallback(
    async (duplicate: Promise<DuplicateResult>) => {
      setContextMenu(null);
      const message = formatDuplicateError(await duplicate, t);
      if (message) showToast(message, 'error');
    },
    [showToast, t]
  );

  const handleBatchDuplicate = useCallback(
    (ids: LibraryItemId[]) => reportDuplicate(duplicateItems(ids)),
    [duplicateItems, reportDuplicate]
  );

  const handleClearLibrary = useCallback(() => {
    if (items.length === 0) return;

    setConfirmDialog({
      title: t('library.clearLibraryTitle'),
      message: t('library.clearLibraryConfirm', { count: items.length }),
      danger: true,
      onConfirm: async () => {
        await clearLibrary();
        setConfirmDialog(null);
      },
    });
  }, [items.length, clearLibrary, t]);

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
    (item: LibraryItem) => reportDuplicate(duplicateItem(item.id)),
    [duplicateItem, reportDuplicate]
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
