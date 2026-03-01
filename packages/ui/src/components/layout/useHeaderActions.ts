import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import {
  useGameTreeFile,
  useGameTreeBoard,
  useGameTreeEdit,
  useGameTreeAI,
} from '../../contexts/selectors';
import { useLibrary } from '../../contexts/LibraryContext';
import { useGameSounds } from '../../useGameSounds';
import { useKeyboardShortcuts } from '../../contexts/KeyboardShortcutsContext';
import type { NewGameConfig } from '../../contexts/GameTreeContext';
import { saveFile, isTauriApp } from '@kaya/platform';
import { loadContentOrOGSUrl, getFilenameForSGF } from '../../services/ogsLoader';
import { readClipboardText, writeClipboardText } from '@kaya/platform';
import { useToast } from '../ui/Toast';

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.bmp'];

export function useHeaderActions() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { soundEnabled, toggleSound } = useGameSounds();
  const { matchesShortcut, getBinding, bindingToDisplayString } = useKeyboardShortcuts();
  const { loadSGFAsync, exportSGF, newGame, fileName, setFileName, isDirty, triggerAutoSave } =
    useGameTreeFile();
  const { currentBoard, gameInfo } = useGameTreeBoard();
  const { makeMainVariation, undo, redo, canUndo, canRedo } = useGameTreeEdit();
  const { setAIConfigOpen } = useGameTreeAI();
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
  const filenameInputRef = useRef<HTMLInputElement>(null);

  const [recognitionFile, setRecognitionFile] = useState<File | null>(null);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isNewGameDialogOpen, setIsNewGameDialogOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const [isSaveToLibraryDialogOpen, setIsSaveToLibraryDialogOpen] = useState(false);
  const [isEditingFilename, setIsEditingFilename] = useState(false);
  const [editedFilename, setEditedFilename] = useState('');

  const { messages, showToast, closeToast } = useToast();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    async (sgf: string, filename: string) => {
      setRecognitionFile(null);
      const canProceed = await checkUnsavedChanges();
      if (!canProceed) return;
      try {
        await loadSGFAsync(sgf);
        setFileName(filename);
        clearLoadedFile();
      } catch (error) {
        alert(`Failed to load recognized board: ${error}`);
      }
    },
    [loadSGFAsync, setFileName, clearLoadedFile, checkUnsavedChanges]
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

  const handleFilenameClick = useCallback(() => {
    if (fileName) {
      setEditedFilename(fileName);
      setIsEditingFilename(true);
    }
  }, [fileName]);

  const handleFilenameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedFilename(e.target.value);
  }, []);

  const handleFilenameBlur = useCallback(async () => {
    if (editedFilename.trim()) {
      const newName = editedFilename.trim().endsWith('.sgf')
        ? editedFilename.trim()
        : `${editedFilename.trim()}.sgf`;
      setFileName(newName);
      if (loadedFileId) {
        try {
          await renameItem(loadedFileId, newName);
        } catch (error) {
          console.error('Failed to rename file in library:', error);
        }
      }
    }
    setIsEditingFilename(false);
  }, [editedFilename, setFileName, loadedFileId, renameItem]);

  const handleFilenameKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.stopPropagation();
      if (e.key === 'Enter') {
        e.preventDefault();
        handleFilenameBlur();
      } else if (e.key === 'Escape') {
        setIsEditingFilename(false);
      }
    },
    [handleFilenameBlur]
  );

  useEffect(() => {
    if (isEditingFilename && filenameInputRef.current) {
      filenameInputRef.current.focus();
      filenameInputRef.current.select();
    }
  }, [isEditingFilename]);

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

  const toggleFullscreen = useCallback(async () => {
    const isTauri =
      isTauriApp() ||
      (typeof window !== 'undefined' && ('__TAURI__' in window || '__TAURI_INTERNALS__' in window));

    if (isTauri) {
      try {
        const { getCurrentWindow } = await import('@tauri-apps/api/window');
        const appWindow = getCurrentWindow();
        const isFullscreen = await appWindow.isFullscreen();
        await appWindow.setFullscreen(!isFullscreen);
        setIsFullscreen(!isFullscreen);
      } catch (e) {
        console.error('Failed to toggle fullscreen in Tauri:', e);
      }
      return;
    }

    if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
      const docEl = document.documentElement as any;
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen().catch((e: any) => {
          console.error(`Error attempting to enable full-screen mode: ${e.message} (${e.name})`);
        });
        setIsFullscreen(true);
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
        setIsFullscreen(true);
      } else {
        console.warn('Fullscreen API is not supported in this environment');
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
        setIsFullscreen(false);
      }
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (matchesShortcut(e, 'file.save')) {
        e.preventDefault();
        handleSaveClick();
        return;
      }
      if (matchesShortcut(e, 'file.saveAs')) {
        e.preventDefault();
        handleSaveAsClick();
        return;
      }
      if (matchesShortcut(e, 'edit.makeMainBranch')) {
        e.preventDefault();
        makeMainVariation();
        return;
      }
      if (matchesShortcut(e, 'edit.undo')) {
        e.preventDefault();
        if (canUndo) undo();
        return;
      }
      if (matchesShortcut(e, 'edit.redo')) {
        e.preventDefault();
        if (canRedo) redo();
        return;
      }
      if (matchesShortcut(e, 'view.openSettings')) {
        e.preventDefault();
        setAIConfigOpen(true);
        return;
      }
      if (matchesShortcut(e, 'view.toggleFullscreen')) {
        toggleFullscreen();
        return;
      }
      if (matchesShortcut(e, 'board.toggleSound')) {
        toggleSound();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
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
    matchesShortcut,
  ]);

  return {
    fileInputRef,
    scanBoardInputRef,
    filenameInputRef,
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
    isEditingFilename,
    editedFilename,

    messages,
    closeToast,
    isFullscreen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    defaultSaveFileName,
    handleRecognitionImport,
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
    handleFilenameClick,
    handleFilenameChange,
    handleFilenameBlur,
    handleFilenameKeyDown,
    toggleFullscreen,
  };
}
