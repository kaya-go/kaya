/**
 * Tree node renderer and drag preview for the library panel.
 *
 * react-arborist takes the row renderer as a *component type*, so a renderer
 * built inside a hook would get a new identity whenever the panel re-renders,
 * and React would unmount and remount every row. That destroys DOM state such
 * as the focused rename field. The renderer is therefore a module-level
 * component, and everything it needs from the panel travels through
 * LibraryTreeNodeContext.
 */

import React, { createContext, useContext, useMemo, useRef } from 'react';
import type { NodeRendererProps, DragPreviewProps } from 'react-arborist';
import { useTranslation } from 'react-i18next';
import { LuFolder, LuFile, LuChevronRight, LuFolderOpen } from 'react-icons/lu';
import { useLibrary } from '../../contexts/LibraryContext';
import { useGameTreeFile } from '../../contexts/selectors';
import type { LibraryItem, LibraryItemId } from '@kaya/game-library';
import { formatFileSize } from '@kaya/game-library';
import { LibraryRenameInput } from './LibraryRenameInput';

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

interface LibraryTreeNodeContextValue {
  renamingId: LibraryItemId | null;
  setRenamingId: (id: LibraryItemId | null) => void;
  handleRename: (value: string) => void;
  handleContextMenu: (e: React.MouseEvent, item: LibraryItem) => void;
  loadedFileAncestorIds: Set<LibraryItemId>;
  /** Click bookkeeping is shared by every row: ranges and double-click detection. */
  lastClickedIdRef: React.RefObject<LibraryItemId | null>;
  lastClickTimeRef: React.RefObject<number>;
  lastClickIdRef: React.RefObject<string | null>;
}

const LibraryTreeNodeContext = createContext<LibraryTreeNodeContextValue | null>(null);

export interface LibraryTreeNodeProviderProps {
  renamingId: LibraryItemId | null;
  setRenamingId: (id: LibraryItemId | null) => void;
  handleRename: (value: string) => void;
  handleContextMenu: (e: React.MouseEvent, item: LibraryItem) => void;
  loadedFileAncestorIds: Set<LibraryItemId>;
  children: React.ReactNode;
}

export function LibraryTreeNodeProvider({
  renamingId,
  setRenamingId,
  handleRename,
  handleContextMenu,
  loadedFileAncestorIds,
  children,
}: LibraryTreeNodeProviderProps) {
  const lastClickedIdRef = useRef<LibraryItemId | null>(null);
  const lastClickTimeRef = useRef<number>(0);
  const lastClickIdRef = useRef<string | null>(null);

  const value = useMemo<LibraryTreeNodeContextValue>(
    () => ({
      renamingId,
      setRenamingId,
      handleRename,
      handleContextMenu,
      loadedFileAncestorIds,
      lastClickedIdRef,
      lastClickTimeRef,
      lastClickIdRef,
    }),
    [renamingId, setRenamingId, handleRename, handleContextMenu, loadedFileAncestorIds]
  );

  return (
    <LibraryTreeNodeContext.Provider value={value}>{children}</LibraryTreeNodeContext.Provider>
  );
}

export function LibraryTreeNodeRenderer({ node, style, dragHandle }: NodeRendererProps<TreeNode>) {
  const context = useContext(LibraryTreeNodeContext);
  if (!context) {
    throw new Error('LibraryTreeNodeRenderer must be rendered inside a LibraryTreeNodeProvider');
  }

  const {
    renamingId,
    setRenamingId,
    handleRename,
    handleContextMenu,
    loadedFileAncestorIds,
    lastClickedIdRef,
    lastClickTimeRef,
    lastClickIdRef,
  } = context;

  const { selectedIds, loadedFileId, selectItem, selectRange, toggleItemSelection, openFile } =
    useLibrary();
  const { isDirty } = useGameTreeFile();
  const { t } = useTranslation();

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
        <LibraryRenameInput
          initialValue={item.name}
          onCommit={handleRename}
          onCancel={() => setRenamingId(null)}
        />
      ) : (
        <span className="library-tree-node-name">
          {isLoaded && isDirty && (
            <span className="library-dirty-indicator" title={t('library.unsavedChangesIndicator')}>
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
}
