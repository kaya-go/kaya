import type { ReactNode } from 'react';
import type {
  LibraryFile,
  LibraryFolder,
  LibraryItem,
  LibraryItemId,
  LibraryStats,
  ImportResult,
} from '@kaya/game-library';
import type { SgfDefect } from '@kaya/sgf';

/**
 * What a duplication made, and the items it could not copy. One failure does
 * not stop it: the rest of the folder is still copied.
 */
export interface DuplicateResult {
  copies: LibraryItem[];
  failures: Array<{ name: string; cause: unknown }>;
}

export interface LibraryContextValue {
  /** Whether the library is initialized */
  isInitialized: boolean;
  /** Whether the library is loading */
  isLoading: boolean;
  /** All library items */
  items: LibraryItem[];
  /** Currently selected item ID */
  selectedId: LibraryItemId | null;
  /** Currently selected item IDs (for multi-select) */
  selectedIds: Set<LibraryItemId>;
  /** Currently expanded folder IDs */
  expandedIds: Set<LibraryItemId>;
  /** Currently loaded file ID (the file displayed on the goban) */
  loadedFileId: LibraryItemId | null;
  /** Library statistics */
  stats: LibraryStats | null;
  /** Error message if any */
  error: string | null;

  // Actions
  /** Refresh the library items */
  refresh: () => Promise<void>;
  /** Select an item (replaces current selection) */
  selectItem: (id: LibraryItemId | null) => void;
  /** Toggle item selection (for ctrl/cmd-click) */
  toggleItemSelection: (id: LibraryItemId) => void;
  /** Select range of items (for shift-click) */
  selectRange: (fromId: LibraryItemId, toId: LibraryItemId) => void;
  /** Clear all selection */
  clearSelection: () => void;
  /** Replace the selection. The anchor is the row arrow keys extend from. */
  replaceSelection: (ids: readonly LibraryItemId[], anchorId: LibraryItemId | null) => void;
  /** Toggle folder expansion */
  toggleExpanded: (id: LibraryItemId) => void;
  /** Expand a folder */
  expandFolder: (id: LibraryItemId) => void;
  /** Collapse a folder */
  collapseFolder: (id: LibraryItemId) => void;
  /** Create a new folder */
  createFolder: (name: string, parentId?: LibraryItemId | null) => Promise<LibraryFolder>;
  /** Create a new file */
  createFile: (
    name: string,
    content: string,
    parentId?: LibraryItemId | null
  ) => Promise<LibraryFile>;
  /** Rename an item */
  renameItem: (id: LibraryItemId, newName: string) => Promise<void>;
  /** Move multiple items into the same parent, refreshing the library once */
  moveItems: (ids: LibraryItemId[], newParentId: LibraryItemId | null) => Promise<void>;
  /** Delete an item */
  deleteItem: (id: LibraryItemId) => Promise<void>;
  /** Delete multiple items */
  deleteItems: (ids: LibraryItemId[]) => Promise<void>;
  /**
   * Open a file (load into game tree). Resolves to what a stored file held
   * that could not be read and was left out (empty when it opened as is).
   */
  openFile: (id: LibraryItemId) => Promise<SgfDefect[]>;
  /** Save current game to library */
  saveCurrentGame: (name: string, parentId?: LibraryItemId | null) => Promise<LibraryFile | null>;
  /** Update file content */
  updateFile: (id: LibraryItemId, content: string) => Promise<void>;
  /** Update the currently loaded file with current game content */
  updateLoadedFile: () => Promise<boolean>;
  /** Import ZIP file */
  importZip: (data: ArrayBuffer) => Promise<ImportResult>;
  /** Export library as ZIP */
  exportZip: () => Promise<void>;
  /** Download a single file as .sgf */
  downloadFile: (id: LibraryItemId) => Promise<void>;
  /** Download a folder and its contents as .zip */
  downloadFolder: (id: LibraryItemId) => Promise<void>;
  /** Download multiple items as a single .zip */
  downloadItems: (ids: LibraryItemId[]) => Promise<void>;
  /** Clear all library data */
  clearLibrary: () => Promise<void>;
  /** Clear the loaded file indicator (call when loading from outside library) */
  clearLoadedFile: () => void;
  /**
   * Copy items for paste. Without a destination, each copy sits beside its
   * source under a "(copy)" name. A destination (null is the root) is a paste:
   * the name is kept, and uniquified only when that folder already has it.
   */
  duplicateItems: (
    ids: LibraryItemId[],
    destinationParentId?: LibraryItemId | null
  ) => Promise<DuplicateResult>;
  /** Check for unsaved changes and prompt user. Returns true if safe to proceed. */
  checkUnsavedChanges: () => Promise<boolean>;
}

export interface LibraryProviderProps {
  children: ReactNode;
  /** Callback when a file is opened */
  /** Loads the content into the editor. A rejection means the file is not opened. */
  onFileOpen?: (content: string, name: string) => void | Promise<void>;
  /** Get current game content for saving */
  getCurrentGameContent?: () => string | null;
  /** Check if there are unsaved changes */
  getIsDirty?: () => boolean;
  /** Callback after successful save (to reset dirty state) */
  onSaveComplete?: () => void;
  /**
   * Notify the outside that the loaded file's stored name changed (after
   * sanitize / uniqueness on rename, or uniquify on move into a collision).
   * e.g. the header session filename.
   */
  onLoadedFileRenamed?: (newName: string) => void;
}
