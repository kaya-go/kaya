/**
 * Library Panel Component
 *
 * A collapsible panel for managing the game library.
 */

import React, { useCallback, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Tree } from 'react-arborist';
import { LuFolderPlus, LuUpload, LuDownload, LuTrash2 } from 'react-icons/lu';
import { useLibrary } from '../../contexts/LibraryContext';
import { useTauriDrag } from '../../contexts/TauriDragContext';
import { formatFileSize } from '@kaya/game-library';
import { BoardRecognitionDialog } from '../dialogs/board-recognition/BoardRecognitionDialog';
import { LibraryContextMenu } from './LibraryContextMenu';
import { NewFolderDialog, ConfirmDialog } from './LibraryDialogs';
import { useLibraryActions } from './useLibraryActions';
import { DragPreview, LibraryTreeNodeProvider, LibraryTreeNodeRenderer } from './LibraryTreeNode';
import { buildLibraryTree } from './libraryTreeData';
import { ancestorIds } from '../../utils/librarySelection';
import { LIBRARY_SELECTION_LOCK, useLibraryTreeBinding } from './useLibraryTreeBinding';
import { useLibraryTreeSize } from './useLibraryTreeSize';
import { useLibraryClipboard } from './useLibraryClipboard';
import { useLibraryTreeKeys } from './useLibraryTreeKeys';
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
    expandedIds,
    loadedFileId,
    expandFolder,
    collapseFolder,
    renameItem,
    stats,
    error,
    clearSelection,
    replaceSelection,
    exportZip,
  } = useLibrary();

  const { isTauriDragging, isOverLibrary: isTauriOverLibrary } = useTauriDrag();

  const { treeRef, onToggle, onSelect } = useLibraryTreeBinding({
    items,
    collapsed,
    selectedId,
    selectedIds,
    expandedIds,
    loadedFileId,
    expandFolder,
    collapseFolder,
    replaceSelection,
  });

  const actions = useLibraryActions(treeRef);
  const clipboard = useLibraryClipboard();
  const { canPaste, cutIds, copy, cut, paste } = clipboard;
  const { onKeyDownCapture, onKeyDown, onPaste } = useLibraryTreeKeys(
    treeRef,
    selectedIds,
    clipboard
  );
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
    handleClearLibrary,
    handleOpen,
    handleTreeMove,
    downloadFile,
    downloadFolder,
  } = actions;

  const handleTreeRename = useCallback(
    async ({ id, name }: { id: string; name: string }) => {
      try {
        await renameItem(id, name);
      } catch (error) {
        console.error('Failed to rename library item:', error);
      }
    },
    [renameItem]
  );

  const panelRef = useRef<HTMLDivElement>(null);
  const { contentRef, treeHeight, treeWidth } = useLibraryTreeSize(!collapsed);

  const treeData = useMemo(() => buildLibraryTree(items), [items]);

  // Folders that contain the game on the board. A collapsed one keeps a dot.
  const loadedFileAncestorIds = useMemo(
    () => ancestorIds(items, loadedFileId),
    [items, loadedFileId]
  );

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
          <div
            className="library-tree"
            onWheel={e => e.stopPropagation()}
            onKeyDownCapture={onKeyDownCapture}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
          >
            <LibraryTreeNodeProvider
              handleContextMenu={actions.handleContextMenu}
              loadedFileAncestorIds={loadedFileAncestorIds}
              cutIds={cutIds}
            >
              <Tree
                ref={treeRef}
                data={treeData}
                openByDefault={false}
                width={treeWidth}
                height={treeHeight}
                indent={16}
                rowHeight={32}
                selection={LIBRARY_SELECTION_LOCK}
                selectionFollowsFocus
                onSelect={onSelect}
                onToggle={onToggle}
                onRename={handleTreeRename}
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
                {LibraryTreeNodeRenderer}
              </Tree>
            </LibraryTreeNodeProvider>
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
            onBatchDownload={handleBatchDownload}
            onBatchDelete={handleBatchDelete}
            onDelete={handleDelete}
            onDownloadFile={downloadFile}
            onDownloadFolder={downloadFolder}
            onCopy={() => copy([...selectedIds])}
            onCut={() => cut([...selectedIds])}
            onPaste={parentId => void paste(parentId)}
            canPaste={canPaste}
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
