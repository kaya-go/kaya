import { useEffect } from 'react';
import { useKeyboardShortcuts } from '../../contexts/KeyboardShortcutsContext';

export function useHeaderKeyboardShortcuts(handlers: {
  handleSaveClick: () => void;
  handleSaveAsClick: () => void;
  toggleFullscreen: () => void;
  toggleSound: () => void;
  makeMainVariation: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  setAIConfigOpen: (open: boolean) => void;
}): void {
  const { matchesShortcut } = useKeyboardShortcuts();
  const {
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
  } = handlers;

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
}
