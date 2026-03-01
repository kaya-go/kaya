/**
 * Library Storage Types
 *
 * Type definitions for the game library manager.
 */

/** Unique identifier for library items */
export type LibraryItemId = string;

/** Type of library item */
export type LibraryItemType = 'file' | 'folder';

/** Metadata for an SGF file */
export interface SGFMetadata {
  /** Game name (from GN property) */
  gameName?: string;
  /** Black player name (from PB property) */
  blackPlayer?: string;
  /** White player name (from PW property) */
  whitePlayer?: string;
  /** Black player rank (from BR property) */
  blackRank?: string;
  /** White player rank (from WR property) */
  whiteRank?: string;
  /** Game result (from RE property) */
  result?: string;
  /** Date played (from DT property) */
  date?: string;
  /** Event name (from EV property) */
  event?: string;
  /** Board size (from SZ property) */
  boardSize?: number;
  /** Komi (from KM property) */
  komi?: number;
  /** Handicap (from HA property) */
  handicap?: number;
  /** Number of moves in the game */
  moveCount?: number;
}

/** Base interface for library items */
export interface LibraryItemBase {
  /** Unique identifier */
  id: LibraryItemId;
  /** Display name (filename without extension for files) */
  name: string;
  /** Item type */
  type: LibraryItemType;
  /** Parent folder ID (null for root items) */
  parentId: LibraryItemId | null;
  /** Creation timestamp */
  createdAt: number;
  /** Last modified timestamp */
  updatedAt: number;
}

/** A folder in the library */
export interface LibraryFolder extends LibraryItemBase {
  type: 'folder';
  /** Number of items in this folder (including subfolders) */
  itemCount: number;
}

/** A file (SGF game) in the library */
export interface LibraryFile extends LibraryItemBase {
  type: 'file';
  /** SGF content */
  content: string;
  /** Extracted metadata from SGF */
  metadata: SGFMetadata;
  /** File size in bytes */
  size: number;
}

/** Union type for any library item */
export type LibraryItem = LibraryFolder | LibraryFile;

/** Options for creating a new file */
export interface CreateFileOptions {
  name: string;
  content: string;
  parentId?: LibraryItemId | null;
}

/** Options for creating a new folder */
export interface CreateFolderOptions {
  name: string;
  parentId?: LibraryItemId | null;
}

/** Options for moving an item */
export interface MoveItemOptions {
  itemId: LibraryItemId;
  newParentId: LibraryItemId | null;
}

/** Options for renaming an item */
export interface RenameItemOptions {
  itemId: LibraryItemId;
  newName: string;
}

/** Result of an import operation */
export interface ImportResult {
  success: boolean;
  imported: number;
  failed: number;
  errors: string[];
}

/** Result of an export operation */
export interface ExportResult {
  success: boolean;
  data?: Blob;
  error?: string;
}

/** Storage statistics */
export interface LibraryStats {
  totalFiles: number;
  totalFolders: number;
  totalSize: number;
}

/** Abstract interface for library storage */
export interface LibraryStorage {
  /** Initialize the storage (create database, etc.) */
  initialize(): Promise<void>;

  /** Get all items in a folder (or root if parentId is null) */
  getItems(parentId?: LibraryItemId | null): Promise<LibraryItem[]>;

  /** Get all items recursively */
  getAllItems(): Promise<LibraryItem[]>;

  /** Get a single item by ID */
  getItem(id: LibraryItemId): Promise<LibraryItem | null>;

  /** Create a new file */
  createFile(options: CreateFileOptions): Promise<LibraryFile>;

  /** Create a new folder */
  createFolder(options: CreateFolderOptions): Promise<LibraryFolder>;

  /** Update a file's content */
  updateFile(id: LibraryItemId, content: string): Promise<LibraryFile>;

  /** Rename an item */
  renameItem(options: RenameItemOptions): Promise<LibraryItem>;

  /** Move an item to a new parent */
  moveItem(options: MoveItemOptions): Promise<LibraryItem>;

  /** Delete an item (and all children if folder) */
  deleteItem(id: LibraryItemId): Promise<void>;

  /** Import files from a ZIP archive */
  importZip(data: ArrayBuffer): Promise<ImportResult>;

  /** Export the entire library as a ZIP archive */
  exportZip(): Promise<ExportResult>;

  /** Get storage statistics */
  getStats(): Promise<LibraryStats>;

  /** Clear all data */
  clear(): Promise<void>;
}
