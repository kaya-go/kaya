import React, { useMemo } from 'react';
import {
  LuZap,
  LuPlus,
  LuFolderOpen,
  LuSave,
  LuCopy,
  LuClipboardPaste,
  LuDownload,
  LuBookmarkPlus,
  LuMenu,
  LuCamera,
} from 'react-icons/lu';
import { useTranslation } from 'react-i18next';
import { OverflowMenu, type OverflowItem } from '../ui/OverflowMenu';
import type { ShortcutId, KeyBinding } from '../../contexts/KeyboardShortcutsContext';

interface HeaderFileControlsProps {
  filenameInputRef: React.RefObject<HTMLInputElement | null>;
  currentBoardWidth: number;
  currentBoardHeight: number;
  fileName: string | null;
  isDirty: boolean;
  loadedFileId: string | null;
  isEditingFilename: boolean;
  editedFilename: string;
  onOpenMobileMenu: () => void;
  onQuickNewGame: () => void;
  onNewGame: () => void;
  onOpenClick: () => void;
  onScanBoardClick: () => void;
  onSaveClick: () => void;
  onSaveAsClick: () => void;
  onExportClick: () => void;
  onCopyClick: () => void;
  onPasteClick: () => void;
  onFilenameClick: () => void;
  onFilenameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilenameBlur: () => void;
  onFilenameKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  getBinding: (id: ShortcutId) => KeyBinding;
  bindingToDisplayString: (binding: KeyBinding) => string;
}

export const HeaderFileControls: React.FC<HeaderFileControlsProps> = ({
  filenameInputRef,
  currentBoardWidth,
  currentBoardHeight,
  fileName,
  isDirty,
  loadedFileId,
  isEditingFilename,
  editedFilename,
  onOpenMobileMenu,
  onQuickNewGame,
  onNewGame,
  onOpenClick,
  onScanBoardClick,
  onSaveClick,
  onSaveAsClick,
  onExportClick,
  onCopyClick,
  onPasteClick,
  onFilenameClick,
  onFilenameChange,
  onFilenameBlur,
  onFilenameKeyDown,
  getBinding,
  bindingToDisplayString,
}) => {
  const { t } = useTranslation();

  const items: OverflowItem[] = useMemo(
    () => [
      {
        id: 'quick-new',
        label: t('quickNewGame'),
        icon: <LuZap size={18} />,
        onClick: onQuickNewGame,
        className: 'quick-new-button',
      },
      {
        id: 'new',
        label: t('new'),
        icon: <LuPlus size={18} />,
        onClick: onNewGame,
      },
      {
        id: 'open',
        label: t('open'),
        icon: <LuFolderOpen size={18} />,
        onClick: onOpenClick,
      },
      {
        id: 'scan-board',
        label: t('scanBoard'),
        icon: <LuCamera size={18} />,
        onClick: onScanBoardClick,
      },
      {
        id: 'save',
        label: `${t('save')}`,
        icon: <LuSave size={18} />,
        onClick: onSaveClick,
        disabled: !isDirty && loadedFileId !== null,
      },
      {
        id: 'save-as',
        label: t('saveAsShort'),
        icon: <LuBookmarkPlus size={18} />,
        onClick: onSaveAsClick,
      },
      {
        id: 'export',
        label: t('export'),
        icon: <LuDownload size={18} />,
        onClick: onExportClick,
      },
      {
        id: 'copy',
        label: t('copy'),
        icon: <LuCopy size={18} />,
        onClick: onCopyClick,
      },
      {
        id: 'paste',
        label: t('paste'),
        icon: <LuClipboardPaste size={18} />,
        onClick: onPasteClick,
      },
    ],
    [
      t,
      onQuickNewGame,
      onNewGame,
      onOpenClick,
      onScanBoardClick,
      onSaveClick,
      onSaveAsClick,
      onExportClick,
      onCopyClick,
      onPasteClick,
      isDirty,
      loadedFileId,
    ]
  );

  const filenameElement = fileName ? (
    isEditingFilename ? (
      <input
        ref={filenameInputRef}
        type="text"
        className="header-filename-input"
        value={editedFilename}
        onChange={onFilenameChange}
        onBlur={onFilenameBlur}
        onKeyDown={onFilenameKeyDown}
        onKeyUp={e => e.stopPropagation()}
        onKeyPress={e => e.stopPropagation()}
      />
    ) : (
      <span className="header-filename" onClick={onFilenameClick} title={t('clickToRename')}>
        {isDirty && (
          <span className="header-dirty-indicator" title={t('unsavedChanges')}>
            •
          </span>
        )}
        {fileName}
      </span>
    )
  ) : null;

  return (
    <div className="header-file-controls">
      {/* Mobile hamburger — visible only on small screens */}
      <button onClick={onOpenMobileMenu} title={t('menu')} className="header-mobile-menu-btn">
        <LuMenu size={24} />
      </button>

      {/* Desktop overflow menu — hidden on mobile */}
      <OverflowMenu
        items={items}
        className="header-overflow-menu header-desktop-only"
        pinned={['quick-new', 'new', 'open']}
        trailing={filenameElement}
        moreLabel={t('moreActions')}
        renderItem={item => (
          <button
            key={item.id}
            className={`header-btn-primary ${item.className ?? ''}`}
            onClick={item.onClick}
            disabled={item.disabled}
            title={item.label}
          >
            {item.icon} <span className="btn-text">{item.label}</span>
          </button>
        )}
      />

      {/* Show filename on mobile (outside the overflow menu) */}
      <div className="header-mobile-filename">{filenameElement}</div>
    </div>
  );
};
