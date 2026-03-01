import type { ReactNode } from 'react';
import type {
  LibraryFile,
  LibraryFolder,
  LibraryItem,
  LibraryItemId,
  LibraryStats,
  ImportResult,
} from '@kaya/game-library';

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
  /** Move an item */
  moveItem: (id: LibraryItemId, newParentId: LibraryItemId | null) => Promise<void>;
  /** Delete an item */
  deleteItem: (id: LibraryItemId) => Promise<void>;
  /** Delete multiple items */
  deleteItems: (ids: LibraryItemId[]) => Promise<void>;
  /** Open a file (load into game tree) */
  openFile: (id: LibraryItemId) => Promise<void>;
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
  /** Duplicate an item (file or folder) */
  duplicateItem: (id: LibraryItemId) => Promise<LibraryItem | null>;
  /** Duplicate multiple items */
  duplicateItems: (ids: LibraryItemId[]) => Promise<LibraryItem[]>;
  /** Check for unsaved changes and prompt user. Returns true if safe to proceed. */
  checkUnsavedChanges: () => Promise<boolean>;
}

export interface LibraryProviderProps {
  children: ReactNode;
  /** Callback when a file is opened */
  onFileOpen?: (content: string, name: string) => void;
  /** Get current game content for saving */
  getCurrentGameContent?: () => string | null;
  /** Check if there are unsaved changes */
  getIsDirty?: () => boolean;
  /** Callback after successful save (to reset dirty state) */
  onSaveComplete?: () => void;
}
