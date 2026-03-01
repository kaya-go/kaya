/**
 * Library Panel Component
 *
 * A collapsible panel for managing the game library.
 */

import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Tree } from 'react-arborist';
import { LuFolderPlus, LuUpload, LuDownload, LuTrash2, LuCopy } from 'react-icons/lu';
import { useLibrary } from '../../contexts/LibraryContext';
import { useTauriDrag } from '../../contexts/TauriDragContext';
import type { LibraryItemId } from '@kaya/game-library';
import { formatFileSize } from '@kaya/game-library';
import { BoardRecognitionDialog } from '../dialogs/BoardRecognitionDialog';
import { LibraryContextMenu } from './LibraryContextMenu';
import { NewFolderDialog, ConfirmDialog } from './LibraryDialogs';
import { useLibraryActions } from './useLibraryActions';
import { type TreeNode, DragPreview, useNodeRenderer } from './LibraryTreeNode';
import './LibraryPanel.css';
import './LibraryPanelTree.css';
import './LibraryPanelOverlays.css';

export interface LibraryPanelProps {
  width?: number;
  collapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
}

export function LibraryPanel({ collapsed = false, onCollapseChange }: LibraryPanelProps) {
  const { t } = useTranslation();
  const {
    isInitialized,
    isLoading,
    items,
    selectedId,
    selectedIds,
    loadedFileId,
    stats,
    error,
    clearSelection,
    exportZip,
  } = useLibrary();

  const { isTauriDragging, isOverLibrary: isTauriOverLibrary } = useTauriDrag();

  const actions = useLibraryActions();
  const {
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
    fileInputRef,
    newFolderInputInitialized,
    handleDrop,
    handleDragOver,
    handleDragLeave,
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
    downloadFile,
    downloadFolder,
  } = actions;

  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [treeHeight, setTreeHeight] = useState(400);
  const [treeWidth, setTreeWidth] = useState(250);

  // Resize observer for tree dimensions
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const updateDimensions = (width: number, height: number) => {
      const adjustedHeight = height - 16;
      const adjustedWidth = width - 16;
      if (adjustedHeight > 0) setTreeHeight(adjustedHeight);
      if (adjustedWidth > 0) setTreeWidth(adjustedWidth);
    };

    const rect = container.getBoundingClientRect();
    updateDimensions(rect.width, rect.height);

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        updateDimensions(entry.contentRect.width, entry.contentRect.height);
      }
    });
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  // Build tree data from flat items
  const treeData = useMemo((): TreeNode[] => {
    const itemMap = new Map<string, TreeNode>();
    const roots: TreeNode[] = [];

    for (const item of items) {
      itemMap.set(item.id, {
        id: item.id,
        name: item.name,
        children: item.type === 'folder' ? [] : undefined,
        data: item,
      });
    }

    for (const item of items) {
      const node = itemMap.get(item.id)!;
      if (item.parentId && itemMap.has(item.parentId)) {
        const parent = itemMap.get(item.parentId)!;
        parent.children?.push(node);
      } else {
        roots.push(node);
      }
    }

    const sortNodes = (nodes: TreeNode[]) => {
      nodes.sort((a, b) => {
        if (a.data.type !== b.data.type) {
          return a.data.type === 'folder' ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });
      for (const node of nodes) {
        if (node.children) {
          sortNodes(node.children);
        }
      }
    };
    sortNodes(roots);

    return roots;
  }, [items]);

  // Computed ancestor IDs for highlighting
  const loadedFileAncestorIds = useMemo(() => {
    if (!loadedFileId) return new Set<LibraryItemId>();

    const ancestors = new Set<LibraryItemId>();
    const loadedItem = items.find(item => item.id === loadedFileId);
    if (!loadedItem) return ancestors;

    let parentId = loadedItem.parentId;
    while (parentId) {
      ancestors.add(parentId);
      const parent = items.find(item => item.id === parentId);
      parentId = parent?.parentId ?? null;
    }
    return ancestors;
  }, [loadedFileId, items]);

  const NodeRenderer = useNodeRenderer({
    renamingId: actions.renamingId,
    renameValue: actions.renameValue,
    setRenameValue: actions.setRenameValue,
    setRenamingId: actions.setRenamingId,
    renameInputInitialized: actions.renameInputInitialized,
    handleRename: actions.handleRename,
    handleContextMenu: actions.handleContextMenu,
    loadedFileAncestorIds,
  });

  if (collapsed) {
    return null;
  }

  return (
    <div
      ref={panelRef}
      className="library-panel"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {/* Header */}
      <div className="library-header">
        <div className="library-actions">
          <button
            className="library-btn"
            onClick={() => handleNewFolder()}
            title={t('library.newFolder')}
          >
            <LuFolderPlus size={16} />
          </button>
          <button
            className="library-btn"
            onClick={handleImportClick}
            title={t('library.importSgfZip')}
          >
            <LuUpload size={16} />
          </button>
          <button
            className="library-btn"
            onClick={exportZip}
            title={t('library.exportLibraryAsZip')}
          >
            <LuDownload size={16} />
          </button>
          <button
            className="library-btn danger"
            onClick={handleClearLibrary}
            title={t('library.clearLibrary')}
            disabled={items.length === 0}
          >
            <LuTrash2 size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="library-content" ref={contentRef} onContextMenu={handleEmptySpaceContextMenu}>
        {error && <div className="library-error">{error}</div>}

        {isLoading && !isInitialized ? (
          <div className="library-loading">{t('library.loading')}</div>
        ) : items.length === 0 ? (
          <div className="library-empty">
            <div className="library-empty-icon">📚</div>
            <div className="library-empty-text">{t('library.emptyLibrary')}</div>
            <div className="library-empty-hint">{t('library.emptyLibraryHint')}</div>
          </div>
        ) : (
          <div className="library-tree" onWheel={e => e.stopPropagation()}>
            <Tree
              data={treeData}
              openByDefault={false}
              width={treeWidth}
              height={treeHeight}
              indent={16}
              rowHeight={32}
              selection={selectedId || undefined}
              onMove={handleTreeMove}
              disableDrag={false}
              disableDrop={args => {
                if (!args.parentNode) return false;
                const treeNode = args.parentNode.data;
                if (!treeNode || !treeNode.data) return true;
                return treeNode.data.type !== 'folder';
              }}
              dndRootElement={panelRef.current}
              renderDragPreview={DragPreview}
            >
              {NodeRenderer}
            </Tree>
          </div>
        )}
      </div>

      {/* Selection bar */}
      {selectedIds.size > 1 && (
        <div className="library-selection-bar">
          <span className="library-selection-count">
            {t('library.itemsSelected', { count: selectedIds.size })}
          </span>
          <div className="library-selection-actions">
            <button
              className="library-btn"
              onClick={() => handleBatchDuplicate([...selectedIds])}
              title={t('library.duplicateSelected')}
            >
              <LuCopy size={14} />
            </button>
            <button
              className="library-btn"
              onClick={() => handleBatchDownload([...selectedIds])}
              title={t('library.downloadSelected')}
            >
              <LuDownload size={14} />
            </button>
            <button
              className="library-btn danger"
              onClick={() => handleBatchDelete([...selectedIds])}
              title={t('library.deleteSelected')}
            >
              <LuTrash2 size={14} />
            </button>
            <button
              className="library-btn"
              onClick={clearSelection}
              title={t('library.clearSelection')}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      {stats && stats.totalFiles > 0 && selectedIds.size <= 1 && (
        <div className="library-stats">
          {t('library.gamesCount', { count: stats.totalFiles })} •{' '}
          {t('library.foldersCount', { count: stats.totalFolders })} •{' '}
          {formatFileSize(stats.totalSize)}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".sgf,.zip,.jpg,.jpeg,.png,.webp,.bmp"
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Drop overlay */}
      {(isDraggingOver || (isTauriDragging && isTauriOverLibrary)) && (
        <div className="library-drop-zone">
          <span className="library-drop-zone-text">{t('library.dropToAdd')}</span>
        </div>
      )}

      {/* Context menu */}
      {contextMenu &&
        createPortal(
          <LibraryContextMenu
            contextMenu={contextMenu}
            selectedIds={selectedIds}
            onOpen={handleOpen}
            onNewFolder={handleNewFolder}
            onStartRename={startRename}
            onDuplicate={handleDuplicate}
            onBatchDuplicate={handleBatchDuplicate}
            onBatchDownload={handleBatchDownload}
            onBatchDelete={handleBatchDelete}
            onDelete={handleDelete}
            onDownloadFile={downloadFile}
            onDownloadFolder={downloadFolder}
            onMoveToRoot={handleMoveToRoot}
            onClose={() => setContextMenu(null)}
          />,
          document.body
        )}

      {/* New Folder Dialog */}
      {showNewFolderDialog &&
        createPortal(
          <NewFolderDialog
            name={newFolderName}
            onNameChange={setNewFolderName}
            onConfirm={handleCreateFolder}
            onClose={() => setShowNewFolderDialog(false)}
            inputRef={input => {
              if (input && !newFolderInputInitialized.current) {
                newFolderInputInitialized.current = true;
                input.focus();
                input.select();
              }
            }}
          />,
          document.body
        )}

      {/* Confirmation Dialog */}
      {confirmDialog &&
        createPortal(
          <ConfirmDialog dialog={confirmDialog} onClose={() => setConfirmDialog(null)} />,
          document.body
        )}

      {recognitionFile &&
        createPortal(
          <BoardRecognitionDialog
            file={recognitionFile}
            onImport={handleLibraryRecognitionImport}
            onClose={() => setRecognitionFile(null)}
          />,
          document.body
        )}
    </div>
  );
}
