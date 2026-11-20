import { useCallback } from 'react';
import type {
  LibraryFile,
  LibraryFolder,
  LibraryItem,
  LibraryItemId,
  ImportResult,
} from '@kaya/game-library';
import { getLibraryStorage } from '@kaya/game-library';
import { makeUniqueName } from '@kaya/game-library';
import type { DuplicateResult } from './library-types';

/** "game.sgf" -> "game (copy).sgf", "Joseki" -> "Joseki (copy)". */
const copyName = (name: string): string =>
  name.toLowerCase().endsWith('.sgf') ? `${name.slice(0, -4)} (copy).sgf` : `${name} (copy)`;

interface UseLibraryFileOpsParams {
  refresh: () => Promise<void>;
  setError: (error: string | null) => void;
}

export function useLibraryFileOps({ refresh, setError }: UseLibraryFileOpsParams) {
  const importZip = useCallback(
    async (data: ArrayBuffer) => {
      const storage = getLibraryStorage();
      const result = await storage.importZip(data);
      await refresh();
      return result;
    },
    [refresh]
  );

  const exportZip = useCallback(async () => {
    const storage = getLibraryStorage();
    const result = await storage.exportZip();
    if (result.success && result.data) {
      const url = URL.createObjectURL(result.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kaya-library-${new Date().toISOString().slice(0, 10)}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (result.error) {
      setError(result.error);
    }
  }, [setError]);

  const downloadFile = useCallback(async (id: LibraryItemId) => {
    const storage = getLibraryStorage();
    const item = await storage.getItem(id);
    if (!item || item.type !== 'file') return;

    const blob = new Blob([item.content], { type: 'application/x-go-sgf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const filename = item.name.toLowerCase().endsWith('.sgf') ? item.name : `${item.name}.sgf`;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const downloadFolder = useCallback(
    async (id: LibraryItemId) => {
      const storage = getLibraryStorage();
      const folder = await storage.getItem(id);
      if (!folder || folder.type !== 'folder') return;

      try {
        const JSZip = (await import('jszip')).default;
        const zip = new JSZip();

        const allItems = await storage.getAllItems();

        const pathMap = new Map<LibraryItemId, string>();

        const isDescendantOf = (item: LibraryItem, ancestorId: LibraryItemId): boolean => {
          if (item.parentId === ancestorId) return true;
          if (item.parentId === null) return false;
          const parent = allItems.find(i => i.id === item.parentId);
          return parent ? isDescendantOf(parent, ancestorId) : false;
        };

        const buildRelativePath = (item: LibraryItem): string => {
          if (pathMap.has(item.id)) {
            return pathMap.get(item.id)!;
          }

          let path = item.name;
          if (item.parentId && item.parentId !== id) {
            const parent = allItems.find(i => i.id === item.parentId);
            if (parent) {
              path = buildRelativePath(parent) + '/' + path;
            }
          }
          pathMap.set(item.id, path);
          return path;
        };

        for (const item of allItems) {
          if (item.type === 'file' && (item.parentId === id || isDescendantOf(item, id))) {
            const relativePath = buildRelativePath(item);
            const fullPath = folder.name + '/' + relativePath;
            const filename = item.name.toLowerCase().endsWith('.sgf')
              ? fullPath
              : `${fullPath}.sgf`;
            zip.file(filename, item.content);
          }
        }

        const blob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${folder.name}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (error) {
        setError(
          `Failed to download folder: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    },
    [setError]
  );

  const downloadItems = useCallback(
    async (ids: LibraryItemId[]) => {
      if (ids.length === 0) return;

      if (ids.length === 1) {
        const storage = getLibraryStorage();
        const item = await storage.getItem(ids[0]);
        if (!item) return;
        if (item.type === 'file') {
          await downloadFile(ids[0]);
        } else {
          await downloadFolder(ids[0]);
        }
        return;
      }

      try {
        const storage = getLibraryStorage();
        const JSZip = (await import('jszip')).default;
        const zip = new JSZip();

        const allItems = await storage.getAllItems();
        const itemMap = new Map(allItems.map(item => [item.id, item]));

        const isDescendantOf = (itemId: LibraryItemId, ancestorId: LibraryItemId): boolean => {
          const item = itemMap.get(itemId);
          if (!item) return false;
          if (item.parentId === ancestorId) return true;
          if (item.parentId === null) return false;
          return isDescendantOf(item.parentId, ancestorId);
        };

        const topLevelIds = ids.filter(id => {
          return !ids.some(otherId => otherId !== id && isDescendantOf(id, otherId));
        });

        const addFolderToZip = (folderId: LibraryItemId, basePath: string) => {
          const children = allItems.filter(item => item.parentId === folderId);
          for (const child of children) {
            const path = basePath + '/' + child.name;
            if (child.type === 'file') {
              const filename = child.name.toLowerCase().endsWith('.sgf') ? path : `${path}.sgf`;
              zip.file(filename, child.content);
            } else {
              addFolderToZip(child.id, path);
            }
          }
        };

        for (const id of topLevelIds) {
          const item = itemMap.get(id);
          if (!item) continue;

          if (item.type === 'file') {
            const filename = item.name.toLowerCase().endsWith('.sgf')
              ? item.name
              : `${item.name}.sgf`;
            zip.file(filename, item.content);
          } else {
            addFolderToZip(item.id, item.name);
          }
        }

        const blob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `kaya-selection-${new Date().toISOString().slice(0, 10)}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (error) {
        setError(
          `Failed to download items: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    },
    [downloadFile, downloadFolder, setError]
  );

  // A copy of what is stored: checked as stored content, so a game v0.4.18
  // stored with parts that cannot be read is copied as it is. A failing item
  // is counted and the rest still copied, so a folder is never left half-made.
  // It never throws: every failure is in the result.
  const duplicateItems = useCallback(
    async (ids: LibraryItemId[]): Promise<DuplicateResult> => {
      const storage = getLibraryStorage();
      const result: DuplicateResult = { copies: [], failures: [] };

      const attempt = async <T>(name: string, copy: () => Promise<T>): Promise<T | null> => {
        try {
          return await copy();
        } catch (cause) {
          result.failures.push({ name, cause });
          return null;
        }
      };
      const copyFile = (file: LibraryFile, name: string, parentId: LibraryItemId | null) =>
        storage.createFile({ name, content: file.content, parentId, validation: 'tolerant' });
      const copyFolderContents = async (source: LibraryFolder, destId: LibraryItemId) => {
        const children = await attempt(source.name, () => storage.getItems(source.id));
        for (const child of children ?? []) {
          if (child.type === 'file') {
            await attempt(child.name, () => copyFile(child, child.name, destId));
            continue;
          }
          const folder = await attempt(child.name, () =>
            storage.createFolder({ name: child.name, parentId: destId })
          );
          if (folder) await copyFolderContents(child, folder.id);
        }
      };
      const duplicate = async (item: LibraryItem): Promise<LibraryItem> => {
        const siblings = await storage.getItems(item.parentId);
        const name = makeUniqueName(copyName(item.name), siblings);
        if (item.type === 'file') return copyFile(item, name, item.parentId);
        const folder = await storage.createFolder({ name, parentId: item.parentId });
        await copyFolderContents(item, folder.id);
        return folder;
      };

      for (const id of ids) {
        const item = await attempt(id, () => storage.getItem(id));
        const copy = item && (await attempt(item.name, () => duplicate(item)));
        if (copy) result.copies.push(copy);
      }
      await refresh();
      return result;
    },
    [refresh]
  );

  const duplicateItem = useCallback((id: LibraryItemId) => duplicateItems([id]), [duplicateItems]);

  return {
    importZip,
    exportZip,
    downloadFile,
    downloadFolder,
    downloadItems,
    duplicateItem,
    duplicateItems,
  };
}
