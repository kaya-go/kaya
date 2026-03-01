/**
 * SaveToLibraryDialog - Dialog for saving a game to the library
 *
 * Allows specifying filename and optionally selecting a folder
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { LuFolder, LuFolderOpen, LuChevronRight, LuChevronDown } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';
import type { LibraryItem } from '@kaya/game-library';
import './SaveFileDialog.css';

interface SaveToLibraryDialogProps {
  isOpen: boolean;
  defaultFileName: string;
  libraryItems: LibraryItem[];
  selectedFolderId: string | null;
  onClose: () => void;
  onSave: (fileName: string, folderId: string | null) => void;
}

interface FolderNode {
  id: string;
  name: string;
  children: FolderNode[];
}

export const SaveToLibraryDialog: React.FC<SaveToLibraryDialogProps> = ({
  isOpen,
  defaultFileName,
  libraryItems,
  selectedFolderId,
  onClose,
  onSave,
}) => {
  const { t } = useTranslation();
  const [fileName, setFileName] = useState(defaultFileName);
  const [targetFolderId, setTargetFolderId] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  // Build folder tree from library items
  const folderTree = useMemo(() => {
    const folders = libraryItems.filter(item => item.type === 'folder');
    const folderMap = new Map<string, FolderNode>();

    // Create all folder nodes
    for (const folder of folders) {
      folderMap.set(folder.id, { id: folder.id, name: folder.name, children: [] });
    }

    // Build hierarchy
    const roots: FolderNode[] = [];
    for (const folder of folders) {
      const node = folderMap.get(folder.id)!;
      if (folder.parentId && folderMap.has(folder.parentId)) {
        folderMap.get(folder.parentId)!.children.push(node);
      } else {
        roots.push(node);
      }
    }

    // Sort alphabetically
    const sortNodes = (nodes: FolderNode[]) => {
      nodes.sort((a, b) => a.name.localeCompare(b.name));
      for (const node of nodes) {
        sortNodes(node.children);
      }
    };
    sortNodes(roots);

    return roots;
  }, [libraryItems]);

  useEffect(() => {
    if (isOpen) {
      setFileName(defaultFileName);
      // If a folder is selected in library, use it as default target
      if (selectedFolderId) {
        const selectedItem = libraryItems.find(item => item.id === selectedFolderId);
        if (selectedItem?.type === 'folder') {
          setTargetFolderId(selectedFolderId);
        } else if (selectedItem?.parentId) {
          setTargetFolderId(selectedItem.parentId);
        } else {
          setTargetFolderId(null);
        }
      } else {
        setTargetFolderId(null);
      }
      // Focus input after dialog opens
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 0);
    }
  }, [isOpen, defaultFileName, selectedFolderId, libraryItems]);

  if (!isOpen) return null;

  const handleSave = () => {
    const trimmed = fileName.trim();
    if (!trimmed) return;

    // Ensure .sgf extension
    const finalFileName = trimmed.endsWith('.sgf') ? trimmed : `${trimmed}.sgf`;
    onSave(finalFileName, targetFolderId);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSave();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const toggleExpanded = (folderId: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  };

  const renderFolder = (folder: FolderNode, depth: number = 0): React.ReactNode => {
    const isExpanded = expandedFolders.has(folder.id);
    const isSelected = targetFolderId === folder.id;
    const hasChildren = folder.children.length > 0;

    return (
      <div key={folder.id}>
        <div
          className={`folder-item ${isSelected ? 'selected' : ''}`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => setTargetFolderId(folder.id)}
        >
          {hasChildren ? (
            <span
              className="folder-expand-icon"
              onClick={e => {
                e.stopPropagation();
                toggleExpanded(folder.id);
              }}
            >
              {isExpanded ? <LuChevronDown size={14} /> : <LuChevronRight size={14} />}
            </span>
          ) : (
            <span className="folder-expand-placeholder" />
          )}
          <span className="folder-icon">
            {isExpanded ? <LuFolderOpen size={16} /> : <LuFolder size={16} />}
          </span>
          <span className="folder-name">{folder.name}</span>
        </div>
        {isExpanded && folder.children.map(child => renderFolder(child, depth + 1))}
      </div>
    );
  };

  return (
    <div className="save-file-dialog-overlay" onClick={onClose}>
      <div className="save-file-dialog save-to-library-dialog" onClick={e => e.stopPropagation()}>
        <h2>{t('addToLibrary')}</h2>

        <div className="save-file-dialog-content">
          <label htmlFor="filename">{t('filename')}</label>
          <input
            ref={inputRef}
            id="filename"
            type="text"
            value={fileName}
            onChange={e => setFileName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('gameSgf')}
          />
          <small className="save-file-dialog-hint">
            {fileName.endsWith('.sgf') ? '' : t('extensionNote')}
          </small>

          <label style={{ marginTop: '16px' }}>{t('saveToFolder')}</label>
          <div className="folder-selector">
            <div
              className={`folder-item root-folder ${targetFolderId === null ? 'selected' : ''}`}
              onClick={() => setTargetFolderId(null)}
            >
              <span className="folder-expand-placeholder" />
              <span className="folder-icon">
                <LuFolder size={16} />
              </span>
              <span className="folder-name">{t('libraryRoot')}</span>
            </div>
            {folderTree.map(folder => renderFolder(folder))}
          </div>
        </div>

        <div className="save-file-dialog-buttons">
          <button onClick={onClose} className="button-secondary">
            {t('cancel')}
          </button>
          <button onClick={handleSave} className="button-primary" disabled={!fileName.trim()}>
            {t('saveToLibrary')}
          </button>
        </div>
      </div>
    </div>
  );
};
