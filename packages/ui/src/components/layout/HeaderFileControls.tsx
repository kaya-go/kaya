import React from 'react';
import {
  LuZap,
  LuPlus,
  LuFolderOpen,
  LuSave,
  LuCopy,
  LuClipboardPaste,
  LuDownload,
  LuBookmarkPlus,
  LuEllipsis,
  LuMenu,
} from 'react-icons/lu';
import { useTranslation } from 'react-i18next';
import type { ShortcutId, KeyBinding } from '../../contexts/KeyboardShortcutsContext';

interface HeaderFileControlsProps {
  moreMenuRef: React.RefObject<HTMLDivElement | null>;
  filenameInputRef: React.RefObject<HTMLInputElement | null>;
  currentBoardWidth: number;
  currentBoardHeight: number;
  fileName: string | null;
  isDirty: boolean;
  loadedFileId: string | null;
  isEditingFilename: boolean;
  editedFilename: string;
  showMoreMenu: boolean;
  setShowMoreMenu: (show: boolean) => void;
  onOpenMobileMenu: () => void;
  onQuickNewGame: () => void;
  onNewGame: () => void;
  onOpenClick: () => void;
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
  moreMenuRef,
  filenameInputRef,
  currentBoardWidth,
  currentBoardHeight,
  fileName,
  isDirty,
  loadedFileId,
  isEditingFilename,
  editedFilename,
  showMoreMenu,
  setShowMoreMenu,
  onOpenMobileMenu,
  onQuickNewGame,
  onNewGame,
  onOpenClick,
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

  return (
    <div className="header-file-controls">
      {/* Primary actions - always visible */}
      <button onClick={onOpenMobileMenu} title={t('menu')} className="header-mobile-menu-btn">
        <LuMenu size={24} />
      </button>

      {/* Primary actions - always visible on desktop, hidden on mobile */}
      <button
        onClick={onQuickNewGame}
        title={`Quick New Game (${currentBoardWidth}×${currentBoardHeight}) - ⚠️ Erases current game without saving!`}
        className="quick-new-button header-desktop-only"
      >
        <LuZap size={18} />
      </button>
      <button
        onClick={onNewGame}
        title={t('newGame')}
        className="header-btn-primary header-desktop-only"
      >
        <LuPlus size={18} /> <span className="btn-text">{t('new')}</span>
      </button>
      <button
        onClick={onOpenClick}
        title={t('openSgfFile')}
        className="header-btn-primary header-desktop-only"
      >
        <LuFolderOpen size={18} /> <span className="btn-text">{t('open')}</span>
      </button>
      <button
        onClick={onSaveClick}
        title={`${t('saveToLibrary')} (${bindingToDisplayString(getBinding('file.save'))})`}
        className="header-btn-primary header-desktop-only"
        disabled={!isDirty && loadedFileId !== null}
      >
        <LuSave size={18} /> <span className="btn-text">{t('save')}</span>
      </button>
      <button
        onClick={onSaveAsClick}
        title={`${t('saveAs')} (${bindingToDisplayString(getBinding('file.saveAs'))})`}
        className="header-btn-primary header-desktop-only"
      >
        <LuBookmarkPlus size={18} /> <span className="btn-text">{t('saveAsShort')}</span>
      </button>
      <button
        onClick={onExportClick}
        title={t('exportToDisk')}
        className="header-btn-primary header-desktop-only"
      >
        <LuDownload size={18} /> <span className="btn-text">{t('export')}</span>
      </button>

      {/* Secondary actions - collapse on small screens */}
      <div className="header-secondary-actions">
        <button
          onClick={onCopyClick}
          title={t('copySgfToClipboard')}
          className="header-btn-secondary"
        >
          <LuCopy size={18} /> <span className="btn-text">{t('copy')}</span>
        </button>
        <button
          onClick={onPasteClick}
          title={`${t('pasteSgfOrOgs')} (${bindingToDisplayString(getBinding('file.paste'))})`}
          className="header-btn-secondary"
        >
          <LuClipboardPaste size={18} /> <span className="btn-text">{t('paste')}</span>
        </button>
      </div>

      {/* More menu for collapsed actions on small screens */}
      <div className="header-more-menu-container" ref={moreMenuRef}>
        <button
          className="header-more-btn"
          onClick={() => setShowMoreMenu(!showMoreMenu)}
          title={t('moreActions')}
        >
          <LuEllipsis size={18} />
        </button>
        {showMoreMenu && (
          <div className="header-more-menu">
            <button
              onClick={() => {
                onCopyClick();
                setShowMoreMenu(false);
              }}
            >
              <LuCopy size={16} /> {t('copySgf')}
            </button>
            <button
              onClick={() => {
                onPasteClick();
                setShowMoreMenu(false);
              }}
            >
              <LuClipboardPaste size={16} /> {t('pasteSgfUrl')}
            </button>
          </div>
        )}
      </div>

      {fileName &&
        (isEditingFilename ? (
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
        ))}
    </div>
  );
};
