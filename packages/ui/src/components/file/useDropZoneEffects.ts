/**
 * Hooks for AppDropZone: Tauri native drag-drop and paste handling.
 */

import { useEffect, useCallback, MutableRefObject, useRef } from 'react';
import { loadContentOrOGSUrl, isOGSUrl, getFilenameForSGF } from '../../services/ogsLoader';
import { readClipboardText } from '@kaya/platform';

// Check if running in Tauri
const isTauri = typeof window !== 'undefined' && '__TAURI__' in window;

// Check if the position is inside the library panel (ignoring overlay elements)
const isPositionInsideLibrary = (x: number, y: number): boolean => {
  const elements = document.elementsFromPoint(x, y);

  for (const el of elements) {
    if (el.closest('.app-dropzone-overlay')) continue;
    if (el.closest('.library-drop-zone')) continue;

    return el.closest('.library-panel') !== null;
  }
  return false;
};

// --- Tauri drag-drop hook ---

interface UseTauriDragDropParams {
  updateDragState: (dragging: boolean) => void;
  updateLibraryState: (over: boolean) => void;
  isOverLibraryRef: MutableRefObject<boolean>;
  loadSGF: (sgf: string) => void;
  setFileName: (name: string) => void;
  setCustomAIModel: (model: {
    data: ArrayBuffer | File;
    name: string;
    date: number;
    size: number;
  }) => void;
  clearLoadedFile: () => void;
  createFile: (name: string, content: string, folderId: string | null) => Promise<unknown>;
  importZip: (buffer: ArrayBuffer) => Promise<unknown>;
  checkUnsavedChanges: () => Promise<boolean>;
}

export function useTauriDragDrop({
  updateDragState,
  updateLibraryState,
  isOverLibraryRef,
  loadSGF,
  setFileName,
  setCustomAIModel,
  clearLoadedFile,
  createFile,
  importZip,
  checkUnsavedChanges,
}: UseTauriDragDropParams) {
  // Guard to prevent duplicate drop processing
  const isProcessingDropRef = useRef(false);

  // Handle file load into current game (from path - Tauri only)
  const handleFileLoadFromPath = useCallback(
    async (filePath: string) => {
      try {
        if (isTauri) {
          const fs = await import('@tauri-apps/plugin-fs');

          if (filePath.endsWith('.onnx')) {
            const content = await fs.readFile(filePath);
            const fileName = filePath.split(/[\/]/).pop() || 'model.onnx';
            setCustomAIModel({
              data: content.buffer,
              name: fileName,
              date: Date.now(),
              size: content.buffer.byteLength,
            });
            alert(`Loaded AI model: ${fileName}`);
            return;
          }

          const canProceed = await checkUnsavedChanges();
          if (!canProceed) return;

          const content = await fs.readTextFile(filePath);
          loadSGF(content);
          const fileName = filePath.split(/[\/]/).pop() || 'unknown.sgf';
          setFileName(fileName);
          clearLoadedFile();
        }
      } catch (error) {
        console.error('Failed to load file:', error);
        alert(`Failed to load file: ${error}`);
      }
    },
    [loadSGF, setFileName, setCustomAIModel, clearLoadedFile, checkUnsavedChanges]
  );

  // Handle file import to library (from path - Tauri only)
  const handleFileImportToLibrary = useCallback(
    async (filePath: string) => {
      try {
        if (isTauri) {
          const fs = await import('@tauri-apps/plugin-fs');

          if (filePath.endsWith('.sgf')) {
            const content = await fs.readTextFile(filePath);
            const fileName = filePath.split(/[\/]/).pop() || 'unknown.sgf';
            await createFile(fileName, content, null);
          } else if (filePath.endsWith('.zip')) {
            const buffer = await fs.readFile(filePath);
            await importZip(buffer.buffer);
          } else {
            alert('Only .sgf and .zip files can be added to the library');
            return;
          }
        }
      } catch (error) {
        console.error('Failed to import file to library:', error);
        alert(`Failed to import file: ${error}`);
      }
    },
    [createFile, importZip]
  );

  // Setup Tauri file drop listener using webviewWindow API
  useEffect(() => {
    if (!isTauri) return;

    let unlistenDrop: (() => void) | undefined;

    const setupTauriListener = async () => {
      try {
        const { getCurrentWebviewWindow } = await import('@tauri-apps/api/webviewWindow');
        const currentWindow = getCurrentWebviewWindow();

        unlistenDrop = await currentWindow.onDragDropEvent((event: any) => {
          const payload = event.payload;

          if (payload.type === 'over') {
            const position = payload.position;
            if (position) {
              updateLibraryState(isPositionInsideLibrary(position.x, position.y));
            }
          } else if (payload.type === 'drop') {
            const paths = payload.paths as string[];

            if (!paths || paths.length === 0) {
              updateDragState(false);
              updateLibraryState(false);
              return;
            }

            if (isProcessingDropRef.current) {
              return;
            }
            isProcessingDropRef.current = true;

            const position = payload.position;
            let droppedOnLibrary = isOverLibraryRef.current;

            if (position) {
              droppedOnLibrary = isPositionInsideLibrary(position.x, position.y);
            }

            updateDragState(false);
            updateLibraryState(false);

            const filePath = paths[0];

            if (droppedOnLibrary) {
              if (filePath.endsWith('.sgf') || filePath.endsWith('.zip')) {
                handleFileImportToLibrary(filePath);
              } else {
                alert('Only .sgf and .zip files can be added to the library');
              }
            } else {
              if (filePath.endsWith('.sgf') || filePath.endsWith('.onnx')) {
                handleFileLoadFromPath(filePath);
              } else {
                alert('Please drop a .sgf or .onnx file');
              }
            }

            setTimeout(() => {
              isProcessingDropRef.current = false;
            }, 100);
          } else if (payload.type === 'enter') {
            isProcessingDropRef.current = false;
            if (payload.paths && payload.paths.length > 0) {
              updateDragState(true);
            }
          } else if (payload.type === 'leave' || payload.type === 'cancel') {
            updateDragState(false);
            updateLibraryState(false);
          }
        });
      } catch (error) {
        console.error('AppDropZone: Failed to setup Tauri listeners:', error);
      }
    };

    setupTauriListener();

    return () => {
      if (unlistenDrop) unlistenDrop();
    };
  }, [handleFileLoadFromPath, handleFileImportToLibrary, updateDragState, updateLibraryState]);
}

// --- Paste handler hook ---

interface UsePasteHandlerParams {
  loadSGFAsync: (sgf: string) => Promise<void>;
  setFileName: (name: string) => void;
  clearLoadedFile: () => void;
  checkUnsavedChanges: () => Promise<boolean>;
}

export function usePasteHandler({
  loadSGFAsync,
  setFileName,
  clearLoadedFile,
  checkUnsavedChanges,
}: UsePasteHandlerParams) {
  // Global paste event handler for SGF content and OGS URLs
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.isContentEditable ||
        target.closest('[contenteditable="true"]')
      ) {
        return;
      }

      const clipboardText = e.clipboardData?.getData('text/plain');
      if (!clipboardText?.trim()) return;

      const trimmed = clipboardText.trim();
      const looksLikeSGF = trimmed.startsWith('(');
      const looksLikeOGSUrl = isOGSUrl(trimmed);

      if (!looksLikeSGF && !looksLikeOGSUrl) {
        return;
      }

      e.preventDefault();

      try {
        const canProceed = await checkUnsavedChanges();
        if (!canProceed) return;

        const result = await loadContentOrOGSUrl(trimmed);
        await loadSGFAsync(result.sgf);
        setFileName(getFilenameForSGF(result));
        clearLoadedFile();
      } catch (error) {
        console.error('Failed to load pasted content:', error);
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [loadSGFAsync, setFileName, clearLoadedFile, checkUnsavedChanges]);

  // Keyboard shortcut handler for Cmd+V/Ctrl+V (fallback for Tauri on macOS)
  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        const target = e.target as HTMLElement;
        if (
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target.isContentEditable ||
          target.closest('[contenteditable="true"]')
        ) {
          return;
        }

        e.preventDefault();

        try {
          const clipboardText = await readClipboardText();
          if (!clipboardText?.trim()) return;

          const trimmed = clipboardText.trim();
          const looksLikeSGF = trimmed.startsWith('(');
          const looksLikeOGSUrl = isOGSUrl(trimmed);

          if (!looksLikeSGF && !looksLikeOGSUrl) {
            return;
          }

          const canProceed = await checkUnsavedChanges();
          if (!canProceed) return;

          const result = await loadContentOrOGSUrl(trimmed);
          await loadSGFAsync(result.sgf);
          setFileName(getFilenameForSGF(result));
          clearLoadedFile();
        } catch (error) {
          console.error('Failed to load pasted content:', error);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [loadSGFAsync, setFileName, clearLoadedFile, checkUnsavedChanges]);
}
