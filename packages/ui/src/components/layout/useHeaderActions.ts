import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import {
  useGameTreeFile,
  useGameTreeBoard,
  useGameTreeEdit,
  useGameTreeAI,
  useGameTreeActions,
} from '../../contexts/selectors';
import { useLibrary } from '../../contexts/LibraryContext';
import { useGameSounds } from '../../useGameSounds';
import { useKeyboardShortcuts } from '../../contexts/KeyboardShortcutsContext';
import type { NewGameConfig } from '../../contexts/GameTreeContext';
import { saveFile } from '@kaya/platform';
import { loadContentOrOGSUrl, getFilenameForSGF } from '../../services/ogsLoader';
import { readClipboardText, writeClipboardText } from '@kaya/platform';
import { useToast } from '../ui/Toast';
import { useFullscreen } from './useFullscreen';
import { useFilenameEditor } from './useFilenameEditor';
import { useHeaderKeyboardShortcuts } from './useHeaderKeyboardShortcuts';

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.bmp'];

export function useHeaderActions(options?: { onNavigateToBoard?: () => void }) {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { soundEnabled, toggleSound } = useGameSounds();
  const { getBinding, bindingToDisplayString } = useKeyboardShortcuts();
  const { loadSGFAsync, exportSGF, newGame, fileName, setFileName, isDirty, triggerAutoSave } =
    useGameTreeFile();
  const { currentBoard, gameInfo } = useGameTreeBoard();
  const { makeMainVariation, undo, redo, canUndo, canRedo, addSetupPosition } = useGameTreeEdit();
  const { setAIConfigOpen } = useGameTreeAI();
  const { playMove } = useGameTreeActions();
  const {
    clearLoadedFile,
    loadedFileId,
    renameItem,
    checkUnsavedChanges,
    updateLoadedFile,
    saveCurrentGame,
    items: libraryItems,
    selectedId: librarySelectedId,
  } = useLibrary();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const scanBoardInputRef = useRef<HTMLInputElement>(null);

  const [recognitionFile, setRecognitionFile] = useState<File | null>(null);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isNewGameDialogOpen, setIsNewGameDialogOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const [isSaveToLibraryDialogOpen, setIsSaveToLibraryDialogOpen] = useState(false);

  const { messages, showToast, closeToast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const filenameEditor = useFilenameEditor({ fileName, setFileName, loadedFileId, renameItem });

  const defaultSaveFileName = useMemo(() => {
    if (fileName) return fileName;
    if (gameInfo.gameName) {
      const safeName = gameInfo.gameName.replace(/[/\\?%*:|"<>]/g, '-').trim();
      return safeName.endsWith('.sgf') ? safeName : `${safeName}.sgf`;
    }
    const black = gameInfo.playerBlack?.trim();
    const white = gameInfo.playerWhite?.trim();
    if (black && white) {
      const safeName = `${black} vs ${white}`.replace(/[/\\?%*:|"<>]/g, '-');
      return `${safeName}.sgf`;
    }
    return 'game.sgf';
  }, [fileName, gameInfo.gameName, gameInfo.playerBlack, gameInfo.playerWhite]);

  const handleFileLoad = useCallback(
    async (file: File) => {
      const lowerName = file.name.toLowerCase();
      if (IMAGE_EXTENSIONS.some(ext => lowerName.endsWith(ext))) {
        setRecognitionFile(file);
        return;
      }
      const canProceed = await checkUnsavedChanges();
      if (!canProceed) return;
      const reader = new FileReader();
      reader.onload = async e => {
        const content = e.target?.result as string;
        if (content) {
          try {
            await loadSGFAsync(content);
            setFileName(file.name);
            clearLoadedFile();
          } catch (error) {
            alert(`Failed to load SGF file: ${error}`);
          }
        }
      };
      reader.readAsText(file);
    },
    [loadSGFAsync, setFileName, clearLoadedFile, checkUnsavedChanges] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const handleRecognitionImport = useCallback(
    (
      stones: { x: number; y: number; color: 'black' | 'white' }[],
      boardSize: number,
      mode: 'blank' | 'merge'
    ) => {
      setRecognitionFile(null);
      const ALPHA = 'abcdefghijklmnopqrstuvwxyz';
      const coord = (col: number, row: number) => ALPHA[col] + ALPHA[row];
      const blackCoords = stones.filter(s => s.color === 'black').map(s => coord(s.x, s.y));
      const whiteCoords = stones.filter(s => s.color === 'white').map(s => coord(s.x, s.y));

      // In 'blank' mode, clear all intersections first so the position starts from an empty board
      let clearCoords: string[] | undefined;
      if (mode === 'blank') {
        clearCoords = [];
        for (let x = 0; x < boardSize; x++) {
          for (let y = 0; y < boardSize; y++) {
            clearCoords.push(coord(x, y));
          }
        }
      }

      addSetupPosition(
        blackCoords,
        whiteCoords,
        `Board recognition (${boardSize}×${boardSize}, ${stones.length} stones)`,
        clearCoords
      );
    },
    [addSetupPosition]
  );

  const handleRecognitionImportSGF = useCallback(
    (sgf: string) => {
      setRecognitionFile(null);
      clearLoadedFile();
      loadSGFAsync(sgf);
      setFileName('scan.sgf');
      options?.onNavigateToBoard?.();
    },
    [loadSGFAsync, setFileName, clearLoadedFile, options?.onNavigateToBoard]
  );

  const handleOpenClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleScanBoardClick = useCallback(() => {
    setIsScanModalOpen(true);
  }, []);

  const handleScanFileSelected = useCallback((file: File) => {
    setRecognitionFile(file);
    setIsScanModalOpen(false);
  }, []);

  const handleScanBoardInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRecognitionFile(file);
    }
    if (scanBoardInputRef.current) {
      scanBoardInputRef.current.value = '';
    }
  }, []);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileLoad(file);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [handleFileLoad]
  );

  const handleSaveWithFileName = useCallback(
    async (newFileName: string) => {
      const sgfContent = exportSGF();
      const finalFileName = newFileName.endsWith('.sgf') ? newFileName : `${newFileName}.sgf`;
      const savedFileName = await saveFile(sgfContent, finalFileName);
      if (savedFileName) {
        setFileName(savedFileName);
        showToast(`Exported "${finalFileName}"`, 'success');
        triggerAutoSave();
      }
    },
    [exportSGF, setFileName, showToast, triggerAutoSave]
  );

  const handleSaveClick = useCallback(async () => {
    if (loadedFileId) {
      const success = await updateLoadedFile();
      if (success) {
        showToast('Saved to library', 'success');
        triggerAutoSave();
      } else {
        showToast('Library file not found, saving as new...', 'info');
        setIsSaveToLibraryDialogOpen(true);
      }
      return;
    }
    if (defaultSaveFileName && defaultSaveFileName !== 'game.sgf') {
      const savedFile = await saveCurrentGame(defaultSaveFileName, null);
      if (savedFile) {
        const finalName = defaultSaveFileName.endsWith('.sgf')
          ? defaultSaveFileName
          : `${defaultSaveFileName}.sgf`;
        setFileName(finalName);
        showToast(`Saved "${defaultSaveFileName}" to library`, 'success');
        triggerAutoSave();
      } else {
        showToast('Failed to save to library', 'error');
      }
    } else {
      setIsSaveToLibraryDialogOpen(true);
    }
  }, [
    loadedFileId,
    updateLoadedFile,
    defaultSaveFileName,
    saveCurrentGame,
    setFileName,
    showToast,
    triggerAutoSave,
  ]);

  const handleSaveAsClick = useCallback(() => {
    setIsSaveToLibraryDialogOpen(true);
  }, []);

  const handleExportClick = useCallback(() => {
    handleSaveWithFileName(defaultSaveFileName);
  }, [handleSaveWithFileName, defaultSaveFileName]);

  const handleSaveToLibrary = useCallback(
    async (name: string, folderId: string | null) => {
      const savedFile = await saveCurrentGame(name, folderId);
      if (savedFile) {
        setFileName(name.endsWith('.sgf') ? name : `${name}.sgf`);
        showToast(`Saved "${name}" to library`, 'success');
        triggerAutoSave();
      } else {
        showToast('Failed to save to library', 'error');
      }
    },
    [saveCurrentGame, setFileName, showToast, triggerAutoSave]
  );

  const handleNewGame = useCallback(() => {
    const isBoardEmpty = currentBoard.isEmpty();
    if (isBoardEmpty) setIsNewGameDialogOpen(true);
    else setIsConfirmationDialogOpen(true);
  }, [currentBoard]);

  const handleConfirmationConfirm = useCallback(() => {
    setIsConfirmationDialogOpen(false);
    setIsNewGameDialogOpen(true);
  }, []);

  const handleConfirmationCancel = useCallback(() => {
    setIsConfirmationDialogOpen(false);
  }, []);

  const handleQuickNewGame = useCallback(async () => {
    const canProceed = await checkUnsavedChanges();
    if (!canProceed) return;
    newGame({
      boardSize: currentBoard.width,
      playerBlack: 'Black',
      playerWhite: 'White',
      rankBlack: '',
      rankWhite: '',
      komi: 6.5,
      handicap: 0,
    });
    clearLoadedFile();
  }, [newGame, currentBoard, clearLoadedFile, checkUnsavedChanges]);

  const handleNewGameConfirm = useCallback(
    async (config: NewGameConfig) => {
      const canProceed = await checkUnsavedChanges();
      if (!canProceed) return;
      newGame(config);
      clearLoadedFile();
    },
    [newGame, clearLoadedFile, checkUnsavedChanges]
  );

  const handleCopyClick = useCallback(async () => {
    try {
      const sgfContent = exportSGF();
      await writeClipboardText(sgfContent);
      showToast('SGF copied to clipboard!', 'success');
      triggerAutoSave();
    } catch (error) {
      showToast(`Failed to copy: ${error}`, 'error');
    }
  }, [exportSGF, showToast, triggerAutoSave]);

  const handlePasteClick = useCallback(async () => {
    try {
      const content = await readClipboardText();
      if (!content.trim()) {
        showToast('Clipboard is empty', 'error');
        return;
      }
      const canProceed = await checkUnsavedChanges();
      if (!canProceed) return;
      const result = await loadContentOrOGSUrl(content);

      await loadSGFAsync(result.sgf);
      setFileName(getFilenameForSGF(result));
      clearLoadedFile();
    } catch (error) {
      console.error('Failed to paste:', error);
      showToast(`Failed to paste: ${error}`, 'error');
    }
  }, [loadSGFAsync, setFileName, clearLoadedFile, checkUnsavedChanges, showToast]);

  useHeaderKeyboardShortcuts({
    handleSaveClick,
    handleSaveAsClick,
    toggleFullscreen,
    toggleSound,
    makeMainVariation,
    undo,
    redo,
    canUndo,
    canRedo,
    setAIConfigOpen,
  });

  return {
    fileInputRef,
    scanBoardInputRef,
    filenameInputRef: filenameEditor.filenameInputRef,
    t,
    theme,
    toggleTheme,
    soundEnabled,
    toggleSound,
    getBinding,
    bindingToDisplayString,
    fileName,
    isDirty,
    currentBoard,
    loadedFileId,
    libraryItems,
    librarySelectedId,
    recognitionFile,
    setRecognitionFile,
    isNewGameDialogOpen,
    setIsNewGameDialogOpen,
    isConfirmationDialogOpen,
    isSaveToLibraryDialogOpen,
    setIsSaveToLibraryDialogOpen,
    isEditingFilename: filenameEditor.isEditingFilename,
    editedFilename: filenameEditor.editedFilename,

    messages,
    closeToast,
    isFullscreen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    defaultSaveFileName,
    handleRecognitionImport,
    handleRecognitionImportSGF,
    playMove,
    handleOpenClick,
    handleScanBoardClick,
    handleScanFileSelected,
    isScanModalOpen,
    setIsScanModalOpen,
    handleFileInputChange,
    handleScanBoardInputChange,
    handleSaveClick,
    handleSaveAsClick,
    handleExportClick,
    handleSaveToLibrary,
    handleNewGame,
    handleConfirmationConfirm,
    handleConfirmationCancel,
    handleQuickNewGame,
    handleNewGameConfirm,
    handleCopyClick,
    handlePasteClick,
    handleFilenameClick: filenameEditor.handleFilenameClick,
    handleFilenameChange: filenameEditor.handleFilenameChange,
    handleFilenameBlur: filenameEditor.handleFilenameBlur,
    handleFilenameKeyDown: filenameEditor.handleFilenameKeyDown,
    toggleFullscreen,
  };
}
