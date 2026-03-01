/**
 * IndexedDB ZIP Import/Export Operations
 *
 * Handles importing SGF files from ZIP archives and exporting
 * the library as a ZIP archive.
 */

import type JSZipType from 'jszip';
import type {
  LibraryItem,
  LibraryFile,
  LibraryFolder,
  LibraryItemId,
  CreateFileOptions,
  CreateFolderOptions,
  ImportResult,
  ExportResult,
} from './types';
import { ensureSGFExtension } from './utils';

/**
 * Interface for storage operations needed by ZIP import/export.
 */
export interface ZipStorageOperations {
  getAllItems(): Promise<LibraryItem[]>;
  createFile(options: CreateFileOptions): Promise<LibraryFile>;
  createFolder(options: CreateFolderOptions): Promise<LibraryFolder>;
}

/**
 * Import SGF files from a ZIP archive into storage.
 */
export async function importZipToStorage(
  data: ArrayBuffer,
  storage: ZipStorageOperations
): Promise<ImportResult> {
  const result: ImportResult = {
    success: false,
    imported: 0,
    failed: 0,
    errors: [],
  };

  try {
    // Dynamic import of JSZip
    const JSZip = (await import('jszip')).default;
    const zip = await JSZip.loadAsync(data);

    // Create a map of folder paths to folder IDs
    const folderMap = new Map<string, LibraryItemId>();

    // First pass: create folders
    const folderPaths = new Set<string>();
    zip.forEach((relativePath: string, _file: JSZipType.JSZipObject) => {
      const parts = relativePath.split('/');
      let currentPath = '';
      for (let i = 0; i < parts.length - 1; i++) {
        currentPath += (currentPath ? '/' : '') + parts[i];
        folderPaths.add(currentPath);
      }
    });

    // Sort folder paths by depth (create parent folders first)
    const sortedFolderPaths = Array.from(folderPaths).sort(
      (a, b) => a.split('/').length - b.split('/').length
    );

    for (const folderPath of sortedFolderPaths) {
      const parts = folderPath.split('/');
      const folderName = parts[parts.length - 1];
      const parentPath = parts.slice(0, -1).join('/');
      const parentId = parentPath ? folderMap.get(parentPath) || null : null;

      try {
        const folder = await storage.createFolder({ name: folderName, parentId });
        folderMap.set(folderPath, folder.id);
      } catch (error) {
        result.errors.push(`Failed to create folder: ${folderPath}`);
      }
    }

    // Second pass: create files
    const files: Array<{ path: string; file: JSZipType.JSZipObject }> = [];
    zip.forEach((relativePath: string, file: JSZipType.JSZipObject) => {
      if (!file.dir && relativePath.toLowerCase().endsWith('.sgf')) {
        files.push({ path: relativePath, file });
      }
    });

    for (const { path, file } of files) {
      try {
        const content = await file.async('string');
        const parts = path.split('/');
        const fileName = parts[parts.length - 1];
        const parentPath = parts.slice(0, -1).join('/');
        const parentId = parentPath ? folderMap.get(parentPath) || null : null;

        await storage.createFile({
          name: ensureSGFExtension(fileName),
          content,
          parentId,
        });
        result.imported++;
      } catch (error) {
        result.failed++;
        result.errors.push(
          `Failed to import: ${path} - ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    }

    result.success = result.imported > 0;
  } catch (error) {
    result.errors.push(
      `Failed to read ZIP file: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }

  return result;
}

/**
 * Export all library items as a ZIP archive.
 */
export async function exportStorageToZip(storage: ZipStorageOperations): Promise<ExportResult> {
  try {
    // Dynamic import of JSZip
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();

    const allItems = await storage.getAllItems();

    // Build path map for folders
    const pathMap = new Map<LibraryItemId, string>();
    const buildPath = (item: LibraryItem): string => {
      if (pathMap.has(item.id)) {
        return pathMap.get(item.id)!;
      }

      let path = item.name;
      if (item.parentId) {
        const parent = allItems.find(i => i.id === item.parentId);
        if (parent) {
          path = buildPath(parent) + '/' + path;
        }
      }
      pathMap.set(item.id, path);
      return path;
    };

    // Add all items to zip
    for (const item of allItems) {
      const path = buildPath(item);
      if (item.type === 'file') {
        // File names already include .sgf extension
        zip.file(path, item.content);
      }
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    return { success: true, data: blob };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
