import React from 'react';
import { useTranslation } from 'react-i18next';
import { MobileMenu } from './MobileMenu';
import { NewGameDialog } from '../dialogs/NewGameDialog';
import { ConfirmationDialog } from '../dialogs/ConfirmationDialog';
import { SaveToLibraryDialog } from '../dialogs/SaveToLibraryDialog';
import { ToastContainer } from '../ui/Toast';
import { BoardRecognitionDialog } from '../dialogs/BoardRecognitionDialog';
import { ScanOptionsModal } from '../dialogs/ScanOptionsModal';
import { useHeaderActions } from './useHeaderActions';
import { HeaderFileControls } from './HeaderFileControls';
import { HeaderRightGroup } from './HeaderRightGroup';

import type { VersionData } from './StatusBar';

interface HeaderProps {
  showThemeToggle?: boolean;
  showLibrary?: boolean;
  showSidebar?: boolean;
  onToggleLibrary?: () => void;
  onToggleSidebar?: () => void;
  onHide?: () => void;
  onGoHome?: () => void;
  versionData?: VersionData;
}

export const Header: React.FC<HeaderProps> = ({
  showThemeToggle = true,
  showLibrary,
  showSidebar,
  onToggleLibrary,
  onToggleSidebar,
  onHide,
  onGoHome,
  versionData,
}) => {
  const { t } = useTranslation();
  const actions = useHeaderActions();

  return (
    <>
      <header className="app-header">
        <input
          ref={actions.fileInputRef}
          type="file"
          accept=".sgf,.jpg,.jpeg,.png,.webp,.bmp"
          style={{ display: 'none' }}
          onChange={actions.handleFileInputChange}
        />
        <input
          ref={actions.scanBoardInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.bmp"
          style={{ display: 'none' }}
          onChange={actions.handleScanBoardInputChange}
        />

        <HeaderFileControls
          filenameInputRef={actions.filenameInputRef}
          currentBoardWidth={actions.currentBoard.width}
          currentBoardHeight={actions.currentBoard.height}
          fileName={actions.fileName}
          isDirty={actions.isDirty}
          loadedFileId={actions.loadedFileId}
          isEditingFilename={actions.isEditingFilename}
          editedFilename={actions.editedFilename}
          onOpenMobileMenu={() => actions.setIsMobileMenuOpen(true)}
          onQuickNewGame={actions.handleQuickNewGame}
          onNewGame={actions.handleNewGame}
          onOpenClick={actions.handleOpenClick}
          onScanBoardClick={actions.handleScanBoardClick}
          onSaveClick={actions.handleSaveClick}
          onSaveAsClick={actions.handleSaveAsClick}
          onExportClick={actions.handleExportClick}
          onCopyClick={actions.handleCopyClick}
          onPasteClick={actions.handlePasteClick}
          onFilenameClick={actions.handleFilenameClick}
          onFilenameChange={actions.handleFilenameChange}
          onFilenameBlur={actions.handleFilenameBlur}
          onFilenameKeyDown={actions.handleFilenameKeyDown}
          getBinding={actions.getBinding}
          bindingToDisplayString={actions.bindingToDisplayString}
        />

        <HeaderRightGroup
          showThemeToggle={showThemeToggle}
          showLibrary={showLibrary}
          showSidebar={showSidebar}
          onToggleLibrary={onToggleLibrary}
          onToggleSidebar={onToggleSidebar}
          onHide={onHide}
          theme={actions.theme}
          toggleTheme={actions.toggleTheme}
          soundEnabled={actions.soundEnabled}
          toggleSound={actions.toggleSound}
          isFullscreen={actions.isFullscreen}
          toggleFullscreen={actions.toggleFullscreen}
          getBinding={actions.getBinding}
          bindingToDisplayString={actions.bindingToDisplayString}
        />

        <ToastContainer messages={actions.messages} onClose={actions.closeToast} />

        <NewGameDialog
          isOpen={actions.isNewGameDialogOpen}
          onClose={() => actions.setIsNewGameDialogOpen(false)}
          onConfirm={actions.handleNewGameConfirm}
        />

        <ConfirmationDialog
          isOpen={actions.isConfirmationDialogOpen}
          title={t('startNewGame')}
          message={t('startNewGameConfirm')}
          confirmLabel={t('newGame')}
          onConfirm={actions.handleConfirmationConfirm}
          onCancel={actions.handleConfirmationCancel}
        />

        <SaveToLibraryDialog
          isOpen={actions.isSaveToLibraryDialogOpen}
          defaultFileName={actions.defaultSaveFileName}
          libraryItems={actions.libraryItems}
          selectedFolderId={actions.librarySelectedId}
          onClose={() => actions.setIsSaveToLibraryDialogOpen(false)}
          onSave={actions.handleSaveToLibrary}
        />

        <MobileMenu
          isOpen={actions.isMobileMenuOpen}
          onClose={() => actions.setIsMobileMenuOpen(false)}
          versionData={versionData}
          onNewGame={() => actions.setIsNewGameDialogOpen(true)}
          onQuickNewGame={actions.handleQuickNewGame}
          onOpen={actions.handleOpenClick}
          onScanBoard={actions.handleScanBoardClick}
          onSave={actions.handleSaveClick}
          onSaveAs={actions.handleSaveAsClick}
          onExport={actions.handleExportClick}
          onCopySGF={actions.handleCopyClick}
          onPasteSGF={actions.handlePasteClick}
          onGoHome={onGoHome}
          isDirty={actions.isDirty}
          isInLibrary={actions.loadedFileId !== null}
        />
      </header>
      <ScanOptionsModal
        isOpen={actions.isScanModalOpen}
        onClose={() => actions.setIsScanModalOpen(false)}
        onSelectFile={actions.handleScanFileSelected}
      />
      {actions.recognitionFile && (
        <BoardRecognitionDialog
          file={actions.recognitionFile}
          onImport={actions.handleRecognitionImport}
          onClose={() => actions.setRecognitionFile(null)}
        />
      )}
    </>
  );
};
