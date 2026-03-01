/**
 * Context menu for library items - rendered as a portal.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  LuFolderPlus,
  LuDownload,
  LuTrash2,
  LuPencil,
  LuPlay,
  LuFolder,
  LuCopy,
} from 'react-icons/lu';
import type { LibraryItem, LibraryItemId } from '@kaya/game-library';

interface ContextMenuState {
  x: number;
  y: number;
  item: LibraryItem | null;
}

export interface LibraryContextMenuProps {
  contextMenu: ContextMenuState;
  selectedIds: Set<LibraryItemId>;
  onOpen: (item: LibraryItem) => void;
  onNewFolder: (parentId: string | null) => void;
  onStartRename: (item: LibraryItem) => void;
  onDuplicate: (item: LibraryItem) => void;
  onBatchDuplicate: (ids: LibraryItemId[]) => void;
  onBatchDownload: (ids: LibraryItemId[]) => void;
  onBatchDelete: (ids: LibraryItemId[]) => void;
  onDelete: (item: LibraryItem) => void;
  onDownloadFile: (id: LibraryItemId) => void;
  onDownloadFolder: (id: LibraryItemId) => void;
  onMoveToRoot: (item: LibraryItem) => void;
  onClose: () => void;
}

export const LibraryContextMenu: React.FC<LibraryContextMenuProps> = ({
  contextMenu,
  selectedIds,
  onOpen,
  onNewFolder,
  onStartRename,
  onDuplicate,
  onBatchDuplicate,
  onBatchDownload,
  onBatchDelete,
  onDelete,
  onDownloadFile,
  onDownloadFolder,
  onMoveToRoot,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className="library-context-menu"
      style={{
        left: contextMenu.x,
        top: contextMenu.y,
      }}
      ref={el => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          let newLeft = contextMenu.x;
          let newTop = contextMenu.y;

          if (rect.right > viewportWidth) {
            newLeft = viewportWidth - rect.width - 8;
          }
          if (newLeft < 0) newLeft = 8;

          if (rect.bottom > viewportHeight) {
            newTop = viewportHeight - rect.height - 8;
          }
          if (newTop < 0) newTop = 8;

          if (newLeft !== contextMenu.x || newTop !== contextMenu.y) {
            el.style.left = `${newLeft}px`;
            el.style.top = `${newTop}px`;
          }
        }
      }}
      onClick={e => e.stopPropagation()}
    >
      {/* Empty space context menu */}
      {contextMenu.item === null ? (
        <div
          className="library-context-menu-item"
          onClick={() => {
            onNewFolder(null);
            onClose();
          }}
        >
          <span className="library-context-menu-item-icon">
            <LuFolderPlus size={14} />
          </span>
          {t('library.newFolder')}
        </div>
      ) : selectedIds.size > 1 ? (
        <>
          <div className="library-context-menu-header">
            {t('library.itemsSelected', { count: selectedIds.size })}
          </div>
          <div className="library-context-menu-separator" />
          <div
            className="library-context-menu-item"
            onClick={() => onBatchDuplicate([...selectedIds])}
          >
            <span className="library-context-menu-item-icon">
              <LuCopy size={14} />
            </span>
            {t('library.duplicateItems', { count: selectedIds.size })}
          </div>
          <div
            className="library-context-menu-item"
            onClick={() => onBatchDownload([...selectedIds])}
          >
            <span className="library-context-menu-item-icon">
              <LuDownload size={14} />
            </span>
            {t('library.downloadItems', { count: selectedIds.size })}
          </div>
          <div className="library-context-menu-separator" />
          <div
            className="library-context-menu-item danger"
            onClick={() => onBatchDelete([...selectedIds])}
          >
            <span className="library-context-menu-item-icon">
              <LuTrash2 size={14} />
            </span>
            {t('library.deleteItems', { count: selectedIds.size })}
          </div>
        </>
      ) : (
        <>
          {(() => {
            const item = contextMenu.item!;
            return (
              <>
                {item.type === 'file' && (
                  <div className="library-context-menu-item" onClick={() => onOpen(item)}>
                    <span className="library-context-menu-item-icon">
                      <LuPlay size={14} />
                    </span>
                    {t('library.load')}
                  </div>
                )}
                {item.type === 'folder' && (
                  <div
                    className="library-context-menu-item"
                    onClick={() => {
                      onNewFolder(item.id);
                      onClose();
                    }}
                  >
                    <span className="library-context-menu-item-icon">
                      <LuFolderPlus size={14} />
                    </span>
                    {t('library.newFolder')}
                  </div>
                )}
                <div className="library-context-menu-item" onClick={() => onStartRename(item)}>
                  <span className="library-context-menu-item-icon">
                    <LuPencil size={14} />
                  </span>
                  {t('library.rename')}
                </div>
                <div className="library-context-menu-item" onClick={() => onDuplicate(item)}>
                  <span className="library-context-menu-item-icon">
                    <LuCopy size={14} />
                  </span>
                  {t('library.duplicate')}
                </div>
                <div
                  className="library-context-menu-item"
                  onClick={() => {
                    if (item.type === 'file') {
                      onDownloadFile(item.id);
                    } else {
                      onDownloadFolder(item.id);
                    }
                    onClose();
                  }}
                >
                  <span className="library-context-menu-item-icon">
                    <LuDownload size={14} />
                  </span>
                  {t('library.download')}
                </div>
                {item.parentId !== null && (
                  <>
                    <div className="library-context-menu-separator" />
                    <div className="library-context-menu-item" onClick={() => onMoveToRoot(item)}>
                      <span className="library-context-menu-item-icon">
                        <LuFolder size={14} />
                      </span>
                      {t('library.moveToRoot')}
                    </div>
                  </>
                )}
                <div className="library-context-menu-separator" />
                <div className="library-context-menu-item danger" onClick={() => onDelete(item)}>
                  <span className="library-context-menu-item-icon">
                    <LuTrash2 size={14} />
                  </span>
                  {t('library.delete')}
                </div>
              </>
            );
          })()}
        </>
      )}
    </div>
  );
};
