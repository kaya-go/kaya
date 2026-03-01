/**
 * AppDropZone - Global drag and drop handler for SGF files
 *
 * Wraps the entire application to handle file drops on the Goban area.
 * Drops on the Library panel are handled separately by LibraryPanel (for web),
 * or intercepted here for Tauri (native file drops bypass HTML5 drag events).
 * Files dropped on the game area are loaded directly into the game.
 * Files dropped on the library are saved to the library.
 */

import React, { useState, useCallback, ReactNode, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useGameTree } from '../../contexts/GameTreeContext';
import { useLibrary } from '../../contexts/LibraryContext';
import { useTauriDrag } from '../../contexts/TauriDragContext';
import { BoardRecognitionDialog } from '../dialogs/BoardRecognitionDialog';
import { useTauriDragDrop, usePasteHandler } from './useDropZoneEffects';
import './AppDropZone.css';

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.bmp'];

interface AppDropZoneProps {
  children: ReactNode;
  onFileDrop?: (file: File) => void;
}

// Check if the drop target is inside the library panel (for HTML5 drag events)
const isInsideLibrary = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  return target.closest('.library-panel') !== null;
};

export const AppDropZone: React.FC<AppDropZoneProps> = ({ children, onFileDrop }) => {
  const { t } = useTranslation();
  const { loadSGF, loadSGFAsync, setFileName, setCustomAIModel } = useGameTree();
  const { clearLoadedFile, createFile, importZip, checkUnsavedChanges } = useLibrary();
  const { setTauriDragging, setOverLibrary } = useTauriDrag();
  const [isDragging, setIsDragging] = useState(false);
  const [isOverLibrary, setIsOverLibrary] = useState(false);
  const [recognitionFile, setRecognitionFile] = useState<File | null>(null);

  // Use ref to track library state for Tauri event handler (avoids stale closure)
  const isOverLibraryRef = useRef(false);

  // Sync local state to context for Tauri drags
  const updateDragState = useCallback(
    (dragging: boolean) => {
      setIsDragging(dragging);
      setTauriDragging(dragging);
    },
    [setTauriDragging]
  );

  const updateLibraryState = useCallback(
    (over: boolean) => {
      setIsOverLibrary(over);
      setOverLibrary(over);
      isOverLibraryRef.current = over;
    },
    [setOverLibrary]
  );

  // Tauri native drag-drop handling
  useTauriDragDrop({
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
  });

  // Paste and keyboard shortcut handling
  usePasteHandler({ loadSGFAsync, setFileName, clearLoadedFile, checkUnsavedChanges });

  const handleFileLoad = useCallback(
    async (file: File) => {
      if (file.name.endsWith('.onnx')) {
        setCustomAIModel({
          data: file,
          name: file.name,
          date: file.lastModified,
          size: file.size,
        });
        alert(`Loaded AI model: ${file.name}`);
        return;
      }

      // Route image files to the recognition dialog
      const lowerName = file.name.toLowerCase();
      if (IMAGE_EXTENSIONS.some(ext => lowerName.endsWith(ext))) {
        setRecognitionFile(file);
        return;
      }

      if (onFileDrop) {
        onFileDrop(file);
        return;
      }

      // Check for unsaved changes first
      const canProceed = await checkUnsavedChanges();
      if (!canProceed) return;

      const reader = new FileReader();
      reader.onload = e => {
        const content = e.target?.result as string;
        if (content) {
          try {
            loadSGF(content);
            setFileName(file.name);
            clearLoadedFile(); // Clear library loaded indicator
          } catch (error) {
            alert(`Failed to load SGF file: ${error}`);
          }
        }
      };
      reader.readAsText(file);
    },
    [loadSGF, setFileName, setCustomAIModel, clearLoadedFile, checkUnsavedChanges]
  );

  const handleRecognitionImport = useCallback(
    async (sgf: string, filename: string) => {
      setRecognitionFile(null);
      const canProceed = await checkUnsavedChanges();
      if (!canProceed) return;
      try {
        loadSGF(sgf);
        setFileName(filename);
        clearLoadedFile();
      } catch (error) {
        alert(`Failed to load recognized board: ${error}`);
      }
    },
    [loadSGF, setFileName, clearLoadedFile, checkUnsavedChanges]
  );

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    // Check if entering library area
    setIsOverLibrary(isInsideLibrary(e.target));
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Continuously update library hover state
    setIsOverLibrary(isInsideLibrary(e.target));
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only hide overlay when leaving the dropzone wrapper entirely
    if (e.currentTarget === e.target) {
      setIsDragging(false);
      setIsOverLibrary(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      setIsOverLibrary(false);

      // Don't handle drops on library - LibraryPanel handles those
      if (isInsideLibrary(e.target)) {
        return;
      }

      const file = e.dataTransfer.files?.[0];
      const lowerName = file?.name.toLowerCase() ?? '';
      if (
        file &&
        (lowerName.endsWith('.sgf') ||
          lowerName.endsWith('.onnx') ||
          IMAGE_EXTENSIONS.some(ext => lowerName.endsWith(ext)))
      ) {
        handleFileLoad(file);
      } else if (file) {
        alert('Please drop a .sgf, .onnx, or image file');
      }
    },
    [handleFileLoad]
  );

  return (
    <div
      className={`app-dropzone-wrapper ${isDragging ? 'dragging' : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
      {isDragging && !isOverLibrary && (
        <div className="app-dropzone-overlay">
          <div className="app-dropzone-content">
            <div className="app-dropzone-icon">📁</div>
            <div className="app-dropzone-text">{t('dropzone.dropToLoad')}</div>
            <div className="app-dropzone-hint">{t('dropzone.dropOnLibrary')}</div>
          </div>
        </div>
      )}
      {recognitionFile && (
        <BoardRecognitionDialog
          file={recognitionFile}
          onImport={handleRecognitionImport}
          onClose={() => setRecognitionFile(null)}
        />
      )}
    </div>
  );
};
