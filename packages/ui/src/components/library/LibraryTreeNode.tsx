/**
 * Tree node renderer and drag preview for the library panel.
 */

import React, { useCallback, useRef } from 'react';
import type { NodeRendererProps, DragPreviewProps } from 'react-arborist';
import { LuFolder, LuFile, LuChevronRight, LuFolderOpen } from 'react-icons/lu';
import { useLibrary } from '../../contexts/LibraryContext';
import { useGameTreeFile } from '../../contexts/selectors';
import type { LibraryItem, LibraryItemId } from '@kaya/game-library';
import { formatFileSize } from '@kaya/game-library';

export interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  data: LibraryItem;
}

export const DragPreview: React.FC<DragPreviewProps> = ({ mouse, isDragging, dragIds }) => {
  if (!isDragging || !mouse) return null;

  return (
    <div
      className="library-drag-preview"
      style={{
        position: 'fixed',
        left: mouse.x + 8,
        top: mouse.y - 8,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translateY(-50%)',
      }}
    >
      {dragIds.length === 1 ? '📄 Moving item...' : `📄 Moving ${dragIds.length} items...`}
    </div>
  );
};

export interface UseNodeRendererOptions {
  renamingId: LibraryItemId | null;
  renameValue: string;
  setRenameValue: (value: string) => void;
  setRenamingId: (id: LibraryItemId | null) => void;
  renameInputInitialized: React.MutableRefObject<boolean>;
  handleRename: () => void;
  handleContextMenu: (e: React.MouseEvent, item: LibraryItem) => void;
  loadedFileAncestorIds: Set<LibraryItemId>;
}

export function useNodeRenderer(options: UseNodeRendererOptions) {
  const {
    renamingId,
    renameValue,
    setRenameValue,
    setRenamingId,
    renameInputInitialized,
    handleRename,
    handleContextMenu,
    loadedFileAncestorIds,
  } = options;

  const { selectedIds, loadedFileId, selectItem, selectRange, toggleItemSelection, openFile } =
    useLibrary();
  const { isDirty } = useGameTreeFile();

  const lastClickedIdRef = useRef<LibraryItemId | null>(null);
  const lastClickTimeRef = useRef<number>(0);
  const lastClickIdRef = useRef<string | null>(null);

  const NodeRenderer = useCallback(
    ({ node, style, dragHandle }: NodeRendererProps<TreeNode>) => {
      const item = node.data.data;
      const isFolder = item.type === 'folder';
      const isSelected = selectedIds.has(item.id);
      const isExpanded = node.isOpen;
      const isRenaming = renamingId === item.id;
      const isDropTarget = node.willReceiveDrop;
      const isLoaded = loadedFileId === item.id;
      const hasLoadedDescendant = isFolder && !isExpanded && loadedFileAncestorIds.has(item.id);

      const handleClick = (e: React.MouseEvent) => {
        const now = Date.now();
        const isDoubleClick =
          lastClickIdRef.current === item.id && now - lastClickTimeRef.current < 400;

        lastClickTimeRef.current = now;
        lastClickIdRef.current = item.id;

        if (isDoubleClick && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
          if (item.type === 'file') {
            openFile(item.id);
          }
          return;
        }

        if (e.shiftKey && lastClickedIdRef.current) {
          e.preventDefault();
          selectRange(lastClickedIdRef.current, item.id);
        } else if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          toggleItemSelection(item.id);
          lastClickedIdRef.current = item.id;
        } else {
          selectItem(item.id);
          lastClickedIdRef.current = item.id;
          if (item.type === 'folder') {
            node.toggle();
          }
        }
      };

      return (
        <div
          ref={dragHandle}
          style={style}
          className={`library-tree-node ${isSelected ? 'selected' : ''} ${isDropTarget ? 'drop-target' : ''} ${isLoaded ? 'loaded' : ''} ${hasLoadedDescendant ? 'has-loaded' : ''}`}
          onClick={handleClick}
          onContextMenu={e => handleContextMenu(e, item)}
        >
          {isFolder && (
            <span
              className={`library-tree-node-arrow ${isExpanded ? 'expanded' : ''}`}
              onClick={e => {
                e.stopPropagation();
                node.toggle();
              }}
            >
              <LuChevronRight size={14} />
            </span>
          )}
          <span className="library-tree-node-icon">
            {isFolder ? (
              isExpanded ? (
                <LuFolderOpen size={16} />
              ) : (
                <LuFolder size={16} />
              )
            ) : (
              <LuFile size={16} />
            )}
          </span>
          {isRenaming ? (
            <input
              type="text"
              className="library-tree-node-input"
              value={renameValue}
              onChange={e => setRenameValue(e.target.value)}
              onBlur={handleRename}
              onKeyDown={e => {
                e.stopPropagation();
                if (e.key === 'Enter') handleRename();
                if (e.key === 'Escape') {
                  setRenamingId(null);
                  setRenameValue('');
                }
              }}
              onKeyUp={e => e.stopPropagation()}
              onKeyPress={e => e.stopPropagation()}
              autoFocus
              onClick={e => e.stopPropagation()}
              ref={input => {
                if (input && !renameInputInitialized.current) {
                  renameInputInitialized.current = true;
                  input.focus();
                  input.select();
                }
              }}
            />
          ) : (
            <span className="library-tree-node-name">
              {isLoaded && isDirty && (
                <span className="library-dirty-indicator" title="Unsaved changes">
                  •
                </span>
              )}
              {item.name}
            </span>
          )}
          {item.type === 'file' && (
            <span className="library-tree-node-meta">{formatFileSize(item.size)}</span>
          )}
        </div>
      );
    },
    [
      selectedIds,
      renamingId,
      renameValue,
      loadedFileId,
      loadedFileAncestorIds,
      isDirty,
      selectItem,
      selectRange,
      toggleItemSelection,
      handleContextMenu,
      handleRename,
      openFile,
      setRenameValue,
      setRenamingId,
      renameInputInitialized,
    ]
  );

  return NodeRenderer;
}
