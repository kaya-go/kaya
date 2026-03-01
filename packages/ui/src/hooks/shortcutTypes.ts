/**
 * Keyboard Shortcuts — Types, constants, and default shortcuts map
 */

/** Storage key for keyboard shortcuts */
export const SHORTCUTS_STORAGE_KEY = 'kaya-keyboard-shortcuts';

/** Modifier keys */
export interface ModifierKeys {
  ctrl: boolean;
  shift: boolean;
  alt: boolean;
  meta: boolean;
}

/** A single key binding */
export interface KeyBinding {
  key: string;
  modifiers: ModifierKeys;
}

/** Shortcut action categories */
export type ShortcutCategory = 'navigation' | 'board' | 'file' | 'view' | 'ai' | 'edit';

/** A keyboard shortcut definition */
export interface ShortcutDefinition {
  id: string;
  category: ShortcutCategory;
  defaultBinding: KeyBinding;
  customBinding?: KeyBinding;
  isCustomized?: boolean;
}

/** All available shortcut IDs */
export type ShortcutId =
  // Navigation shortcuts
  | 'nav.back'
  | 'nav.forward'
  | 'nav.start'
  | 'nav.end'
  | 'nav.branchUp'
  | 'nav.branchDown'
  // File shortcuts
  | 'file.save'
  | 'file.saveAs'
  | 'file.paste'
  // View shortcuts
  | 'view.toggleHeader'
  | 'view.toggleSidebar'
  | 'view.toggleLibrary'
  | 'view.toggleFullscreen'
  | 'view.openSettings'
  // Board mode shortcuts
  | 'board.toggleEditMode'
  | 'board.toggleNavigationMode'
  | 'board.toggleScoringMode'
  | 'board.toggleAnalysis'
  | 'board.toggleSound'
  | 'board.toggleNextMove'
  // AI shortcuts
  | 'ai.suggestMove'
  | 'ai.toggleTopMoves'
  | 'ai.toggleOwnership'
  // Edit shortcuts
  | 'edit.undo'
  | 'edit.redo'
  | 'edit.makeMainBranch';

/** Modifier key for the current platform (Cmd on Mac, Ctrl elsewhere) */
export const isMac =
  typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);

/** Create a key binding helper */
export function createBinding(key: string, options?: Partial<ModifierKeys>): KeyBinding {
  return {
    key: key.toLowerCase(),
    modifiers: {
      ctrl: options?.ctrl ?? false,
      shift: options?.shift ?? false,
      alt: options?.alt ?? false,
      meta: options?.meta ?? false,
    },
  };
}

/** Create a platform-aware binding (Cmd on Mac, Ctrl elsewhere) */
export function createPlatformBinding(
  key: string,
  options?: Partial<Omit<ModifierKeys, 'ctrl' | 'meta'>>
): KeyBinding {
  return createBinding(key, {
    ...options,
    ctrl: !isMac,
    meta: isMac,
  });
}

/** Default shortcuts configuration */
export const DEFAULT_SHORTCUTS: Record<ShortcutId, Omit<ShortcutDefinition, 'id'>> = {
  // Navigation
  'nav.back': {
    category: 'navigation',
    defaultBinding: createBinding('arrowleft'),
  },
  'nav.forward': {
    category: 'navigation',
    defaultBinding: createBinding('arrowright'),
  },
  'nav.start': {
    category: 'navigation',
    defaultBinding: createBinding('home'),
  },
  'nav.end': {
    category: 'navigation',
    defaultBinding: createBinding('end'),
  },
  'nav.branchUp': {
    category: 'navigation',
    defaultBinding: createBinding('arrowup'),
  },
  'nav.branchDown': {
    category: 'navigation',
    defaultBinding: createBinding('arrowdown'),
  },

  // File operations
  'file.save': {
    category: 'file',
    defaultBinding: createPlatformBinding('s'),
  },
  'file.saveAs': {
    category: 'file',
    defaultBinding: createPlatformBinding('s', { shift: true }),
  },
  'file.paste': {
    category: 'file',
    defaultBinding: createPlatformBinding('v'),
  },

  // View shortcuts
  'view.toggleHeader': {
    category: 'view',
    defaultBinding: createPlatformBinding('m', { shift: true }),
  },
  'view.toggleSidebar': {
    category: 'view',
    defaultBinding: createPlatformBinding('b', { shift: true }),
  },
  'view.toggleLibrary': {
    category: 'view',
    defaultBinding: createPlatformBinding('l'),
  },
  'view.toggleFullscreen': {
    category: 'view',
    defaultBinding: createBinding('f'),
  },
  'view.openSettings': {
    category: 'view',
    defaultBinding: createPlatformBinding(','),
  },

  // Board mode shortcuts
  'board.toggleEditMode': {
    category: 'board',
    defaultBinding: createBinding('e'),
  },
  'board.toggleNavigationMode': {
    category: 'board',
    defaultBinding: createBinding('n'),
  },
  'board.toggleScoringMode': {
    category: 'board',
    defaultBinding: createBinding('s'),
  },
  'board.toggleAnalysis': {
    category: 'board',
    defaultBinding: createBinding('a'),
  },
  'board.toggleSound': {
    category: 'board',
    defaultBinding: createBinding('s', { shift: true }),
  },
  'board.toggleNextMove': {
    category: 'board',
    defaultBinding: createBinding('x'),
  },

  // AI shortcuts
  'ai.suggestMove': {
    category: 'ai',
    defaultBinding: createBinding('g'),
  },
  'ai.toggleTopMoves': {
    category: 'ai',
    defaultBinding: createBinding('t'),
  },
  'ai.toggleOwnership': {
    category: 'ai',
    defaultBinding: createBinding('o'),
  },

  // Edit shortcuts
  'edit.undo': {
    category: 'edit',
    defaultBinding: createPlatformBinding('z'),
  },
  'edit.redo': {
    category: 'edit',
    defaultBinding: createPlatformBinding('z', { shift: true }),
  },
  'edit.makeMainBranch': {
    category: 'edit',
    defaultBinding: createPlatformBinding('m', { shift: true }),
  },
};

/** Collision info when two shortcuts have the same binding */
export interface ShortcutCollision {
  existingShortcutId: ShortcutId;
  binding: KeyBinding;
}

/** Stored custom shortcuts (only stores customized ones) */
export type StoredShortcuts = Partial<Record<ShortcutId, KeyBinding>>;
