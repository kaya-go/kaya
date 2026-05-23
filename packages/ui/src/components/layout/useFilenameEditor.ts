import React, { useCallback, useEffect, useRef, useState } from 'react';

export function useFilenameEditor(args: {
  fileName: string | null | undefined;
  setFileName: (name: string) => void;
  loadedFileId: string | null | undefined;
  renameItem: (id: string, newName: string) => Promise<unknown>;
}) {
  const { fileName, setFileName, loadedFileId, renameItem } = args;

  const filenameInputRef = useRef<HTMLInputElement>(null);
  const [isEditingFilename, setIsEditingFilename] = useState(false);
  const [editedFilename, setEditedFilename] = useState('');

  const handleFilenameClick = useCallback(() => {
    if (fileName) {
      setEditedFilename(fileName);
      setIsEditingFilename(true);
    }
  }, [fileName]);

  const handleFilenameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedFilename(e.target.value);
  }, []);

  const handleFilenameBlur = useCallback(async () => {
    if (editedFilename.trim()) {
      const newName = editedFilename.trim().endsWith('.sgf')
        ? editedFilename.trim()
        : `${editedFilename.trim()}.sgf`;
      setFileName(newName);
      if (loadedFileId) {
        try {
          await renameItem(loadedFileId, newName);
        } catch (error) {
          console.error('Failed to rename file in library:', error);
        }
      }
    }
    setIsEditingFilename(false);
  }, [editedFilename, setFileName, loadedFileId, renameItem]);

  const handleFilenameKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.stopPropagation();
      if (e.key === 'Enter') {
        e.preventDefault();
        handleFilenameBlur();
      } else if (e.key === 'Escape') {
        setIsEditingFilename(false);
      }
    },
    [handleFilenameBlur]
  );

  useEffect(() => {
    if (isEditingFilename && filenameInputRef.current) {
      filenameInputRef.current.focus();
      filenameInputRef.current.select();
    }
  }, [isEditingFilename]);

  return {
    filenameInputRef,
    isEditingFilename,
    editedFilename,
    handleFilenameClick,
    handleFilenameChange,
    handleFilenameBlur,
    handleFilenameKeyDown,
  };
}
