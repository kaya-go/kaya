/**
 * Keyboard Shortcuts Management Hook
 *
 * Centralized management of all keyboard shortcuts with:
 * - Customizable key bindings
 * - Collision detection
 * - LocalStorage persistence
 * - Cross-platform modifier key handling (Ctrl/Cmd)
 */

import { useCallback, useEffect, useMemo, useState, useRef } from 'react';

import type {
  KeyBinding,
  ShortcutCategory,
  ShortcutCollision,
  ShortcutDefinition,
  ShortcutId,
  StoredShortcuts,
} from './shortcutTypes';
import { createBinding, DEFAULT_SHORTCUTS } from './shortcutTypes';
import {
  bindingsEqual,
  bindingToDisplayString,
  createBindingFromEvent,
  eventMatchesBinding,
  loadStoredShortcuts,
  saveStoredShortcuts,
} from './shortcutUtils';

// Re-export all public types, constants and utilities so existing consumers work unchanged
export type {
  ModifierKeys,
  KeyBinding,
  ShortcutCategory,
  ShortcutDefinition,
  ShortcutId,
  ShortcutCollision,
} from './shortcutTypes';
export { createBinding, createPlatformBinding, DEFAULT_SHORTCUTS } from './shortcutTypes';
export {
  bindingToDisplayString,
  eventMatchesBinding,
  bindingsEqual,
  createBindingFromEvent,
} from './shortcutUtils';

/**
 * Hook for managing keyboard shortcuts
 */
export function useKeyboardShortcuts() {
  const [storedShortcuts, setStoredShortcuts] = useState<StoredShortcuts>(loadStoredShortcuts);

  // Build the complete shortcuts map with custom overrides
  const shortcuts = useMemo((): Record<ShortcutId, ShortcutDefinition> => {
    const result: Record<string, ShortcutDefinition> = {};

    for (const [id, def] of Object.entries(DEFAULT_SHORTCUTS)) {
      const shortcutId = id as ShortcutId;
      const customBinding = storedShortcuts[shortcutId];

      result[shortcutId] = {
        id: shortcutId,
        ...def,
        customBinding,
        isCustomized: customBinding !== undefined,
      };
    }

    return result as Record<ShortcutId, ShortcutDefinition>;
  }, [storedShortcuts]);

  // Keep a ref to shortcuts for stable callback access (used by matchesShortcut)
  const shortcutsRef = useRef(shortcuts);
  useEffect(() => {
    shortcutsRef.current = shortcuts;
  }, [shortcuts]);

  // Get the active binding for a shortcut (custom or default)
  // This is reactive - UI will update when shortcuts change
  const getBinding = useCallback(
    (id: ShortcutId): KeyBinding => {
      const shortcut = shortcuts[id];
      return shortcut.customBinding ?? shortcut.defaultBinding;
    },
    [shortcuts]
  );

  // Check for collisions when setting a new binding
  const checkCollision = useCallback(
    (binding: KeyBinding, excludeId?: ShortcutId): ShortcutCollision | null => {
      for (const [id, shortcut] of Object.entries(shortcuts)) {
        if (id === excludeId) continue;

        const activeBinding = shortcut.customBinding ?? shortcut.defaultBinding;
        if (bindingsEqual(binding, activeBinding)) {
          return {
            existingShortcutId: id as ShortcutId,
            binding,
          };
        }
      }
      return null;
    },
    [shortcuts]
  );

  // Set a custom binding for a shortcut
  // skipCollisionCheck: set to true when collision has already been resolved
  const setBinding = useCallback(
    (id: ShortcutId, binding: KeyBinding, skipCollisionCheck = false): ShortcutCollision | null => {
      // Check for collision (unless already handled)
      if (!skipCollisionCheck) {
        const collision = checkCollision(binding, id);
        if (collision) {
          return collision;
        }
      }

      // Check if it's the same as default
      const defaultBinding = DEFAULT_SHORTCUTS[id].defaultBinding;
      if (bindingsEqual(binding, defaultBinding)) {
        // Remove custom binding if it's the same as default
        const newStored = { ...storedShortcuts };
        delete newStored[id];
        setStoredShortcuts(newStored);
        saveStoredShortcuts(newStored);
      } else {
        // Store the custom binding
        const newStored = { ...storedShortcuts, [id]: binding };
        setStoredShortcuts(newStored);
        saveStoredShortcuts(newStored);
      }

      return null;
    },
    [storedShortcuts, checkCollision]
  );

  // Clear collision by removing the conflicting shortcut's binding and setting the new one
  const clearCollisionAndSetBinding = useCallback(
    (collisionId: ShortcutId, targetId: ShortcutId, binding: KeyBinding): void => {
      // Update both in the same state update to avoid stale closure issues
      const newStored = { ...storedShortcuts };
      // Disable the conflicting shortcut
      newStored[collisionId] = createBinding('');
      // Set the new binding for the target
      const defaultBinding = DEFAULT_SHORTCUTS[targetId].defaultBinding;
      if (bindingsEqual(binding, defaultBinding)) {
        delete newStored[targetId];
      } else {
        newStored[targetId] = binding;
      }
      setStoredShortcuts(newStored);
      saveStoredShortcuts(newStored);
    },
    [storedShortcuts]
  );

  // Clear collision by removing the conflicting shortcut's binding (legacy, kept for compatibility)
  const clearCollision = useCallback(
    (collisionId: ShortcutId): void => {
      const newStored = { ...storedShortcuts };
      // Set the conflicting shortcut to an empty binding (disabled)
      newStored[collisionId] = createBinding('');
      setStoredShortcuts(newStored);
      saveStoredShortcuts(newStored);
    },
    [storedShortcuts]
  );

  // Reset a shortcut to its default binding
  const resetBinding = useCallback(
    (id: ShortcutId): void => {
      const newStored = { ...storedShortcuts };
      delete newStored[id];
      setStoredShortcuts(newStored);
      saveStoredShortcuts(newStored);
    },
    [storedShortcuts]
  );

  // Reset all shortcuts to defaults
  const resetAllBindings = useCallback((): void => {
    setStoredShortcuts({});
    saveStoredShortcuts({});
  }, []);

  // Check if a keyboard event matches a shortcut
  // Uses ref to always read latest shortcuts without re-registering event listeners
  const matchesShortcut = useCallback(
    (event: KeyboardEvent, id: ShortcutId): boolean => {
      const shortcut = shortcutsRef.current[id];
      const binding = shortcut.customBinding ?? shortcut.defaultBinding;
      // If binding is empty (disabled), don't match
      if (!binding.key) return false;
      return eventMatchesBinding(event, binding);
    },
    [] // No dependencies - always reads from ref
  );

  // Get all shortcuts grouped by category
  const shortcutsByCategory = useMemo(() => {
    const categories: Record<ShortcutCategory, ShortcutDefinition[]> = {
      navigation: [],
      board: [],
      file: [],
      view: [],
      ai: [],
      edit: [],
    };

    for (const shortcut of Object.values(shortcuts)) {
      categories[shortcut.category].push(shortcut);
    }

    return categories;
  }, [shortcuts]);

  return {
    shortcuts,
    shortcutsByCategory,
    getBinding,
    setBinding,
    resetBinding,
    resetAllBindings,
    checkCollision,
    clearCollision,
    clearCollisionAndSetBinding,
    matchesShortcut,
    bindingToDisplayString,
    createBindingFromEvent,
  };
}

/** Context type for keyboard shortcuts */
export type KeyboardShortcutsContextType = ReturnType<typeof useKeyboardShortcuts>;
