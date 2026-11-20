import { useEffect } from 'react';
import { useKeyboardShortcuts, type ShortcutId } from '../../contexts/KeyboardShortcutsContext';
import { hasOpenOverlay } from '../../hooks/useCloseOnBack';
import { isTextEntryTarget } from '../../utils/shortcutGuard';

/** The header shortcuts that wait while a dialog or menu is open: all but fullscreen. */
const WAIT_BEHIND_DIALOG: ShortcutId[] = [
  'file.save',
  'file.saveAs',
  'edit.makeMainBranch',
  'edit.undo',
  'edit.redo',
  'view.openSettings',
  'board.toggleSound',
];

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
      if (isTextEntryTarget(e.target)) return;

      // Fullscreen is a window command, like the browser's own F11: it changes
      // neither the game nor what an open dialog asks, so it works everywhere.
      if (matchesShortcut(e, 'view.toggleFullscreen')) {
        // preventDefault matters for F11 on Linux/Wayland — some compositors
        // would otherwise consume it for their own window fullscreen action.
        e.preventDefault();
        toggleFullscreen();
        return;
      }

      // Behind a dialog or menu the others wait: undo, redo and reordering
      // would change the game the dialog asks about (Ctrl+Z behind Resign
      // changed the side that resigned), save and settings would open a second
      // dialog. They still claim their keys, so that the browser or the macOS
      // Edit menu does not run its own Save Page or Undo instead.
      if (hasOpenOverlay()) {
        if (WAIT_BEHIND_DIALOG.some(id => matchesShortcut(e, id))) e.preventDefault();
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
