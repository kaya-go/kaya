/**
 * Keyboard Shortcuts — Utility functions for binding display, matching, and storage
 */

import type { KeyBinding, StoredShortcuts } from './shortcutTypes';
import { isMac, SHORTCUTS_STORAGE_KEY } from './shortcutTypes';

/** Convert a KeyBinding to a display string */
export function bindingToDisplayString(binding: KeyBinding): string {
  const parts: string[] = [];
  const { modifiers, key } = binding;

  if (modifiers.ctrl) parts.push(isMac ? '⌃' : 'Ctrl');
  if (modifiers.alt) parts.push(isMac ? '⌥' : 'Alt');
  if (modifiers.shift) parts.push(isMac ? '⇧' : 'Shift');
  if (modifiers.meta) parts.push(isMac ? '⌘' : 'Win');

  // Format special keys
  let displayKey = key;
  switch (key.toLowerCase()) {
    case 'arrowleft':
      displayKey = '←';
      break;
    case 'arrowright':
      displayKey = '→';
      break;
    case 'arrowup':
      displayKey = '↑';
      break;
    case 'arrowdown':
      displayKey = '↓';
      break;
    case 'home':
      displayKey = 'Home';
      break;
    case 'end':
      displayKey = 'End';
      break;
    case 'escape':
      displayKey = 'Esc';
      break;
    case 'enter':
      displayKey = '↵';
      break;
    case 'backspace':
      displayKey = '⌫';
      break;
    case 'delete':
      displayKey = 'Del';
      break;
    case 'tab':
      displayKey = 'Tab';
      break;
    case ' ':
      displayKey = 'Space';
      break;
    case ',':
      displayKey = ',';
      break;
    default:
      displayKey = key.length === 1 ? key.toUpperCase() : key;
  }

  parts.push(displayKey);
  return parts.join(isMac ? '' : '+');
}

/** Check if a KeyboardEvent matches a KeyBinding */
export function eventMatchesBinding(event: KeyboardEvent, binding: KeyBinding): boolean {
  const { modifiers, key } = binding;
  const eventKey = event.key.toLowerCase();

  // Check modifiers
  const ctrlMatch = modifiers.ctrl === event.ctrlKey;
  const shiftMatch = modifiers.shift === event.shiftKey;
  const altMatch = modifiers.alt === event.altKey;
  const metaMatch = modifiers.meta === event.metaKey;

  // Check key
  const keyMatch = eventKey === key.toLowerCase();

  return ctrlMatch && shiftMatch && altMatch && metaMatch && keyMatch;
}

/** Compare two bindings for equality */
export function bindingsEqual(a: KeyBinding, b: KeyBinding): boolean {
  return (
    a.key.toLowerCase() === b.key.toLowerCase() &&
    a.modifiers.ctrl === b.modifiers.ctrl &&
    a.modifiers.shift === b.modifiers.shift &&
    a.modifiers.alt === b.modifiers.alt &&
    a.modifiers.meta === b.modifiers.meta
  );
}

/** Load stored shortcuts from localStorage */
export function loadStoredShortcuts(): StoredShortcuts {
  try {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(SHORTCUTS_STORAGE_KEY);
    if (!stored) return {};
    return JSON.parse(stored) as StoredShortcuts;
  } catch {
    return {};
  }
}

/** Save shortcuts to localStorage */
export function saveStoredShortcuts(shortcuts: StoredShortcuts): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SHORTCUTS_STORAGE_KEY, JSON.stringify(shortcuts));
  } catch (e) {
    console.warn('Failed to save shortcuts to localStorage:', e);
  }
}

/** Create a KeyBinding from a KeyboardEvent */
export function createBindingFromEvent(event: KeyboardEvent): KeyBinding | null {
  // Ignore modifier-only key presses
  if (['Control', 'Shift', 'Alt', 'Meta'].includes(event.key)) {
    return null;
  }

  return {
    key: event.key.toLowerCase(),
    modifiers: {
      ctrl: event.ctrlKey,
      shift: event.shiftKey,
      alt: event.altKey,
      meta: event.metaKey,
    },
  };
}
