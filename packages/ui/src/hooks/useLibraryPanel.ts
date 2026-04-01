/**
 * Library Integration Hook
 *
 * Hook for managing library panel state with localStorage persistence.
 */

import { useState, useEffect, useCallback } from 'react';
import { useKeyboardShortcuts } from '../contexts/KeyboardShortcutsContext';

const STORAGE_KEY = 'kaya-show-library';

export function useLibraryPanel() {
  const { matchesShortcut } = useKeyboardShortcuts();

  // Load saved preference from localStorage
  const [showLibrary, setShowLibrary] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) return saved === 'true';
    }
    return true;
  });

  // Save preference when it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, String(showLibrary));
    }
  }, [showLibrary]);

  // Toggle function
  const toggleLibrary = useCallback(() => {
    setShowLibrary(prev => !prev);
  }, []);

  // Keyboard shortcut for library toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (matchesShortcut(e, 'view.toggleLibrary')) {
        e.preventDefault();
        toggleLibrary();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleLibrary, matchesShortcut]);

  return {
    showLibrary,
    setShowLibrary,
    toggleLibrary,
  };
}
