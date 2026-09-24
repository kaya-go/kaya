/**
 * SaveFileDialog - Dialog for entering filename when saving
 *
 * Web-friendly alternative to browser prompt()
 */

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';
import './SaveFileDialog.css';

interface SaveFileDialogProps {
  isOpen: boolean;
  defaultFileName: string;
  onClose: () => void;
  onSave: (fileName: string) => void;
}

export const SaveFileDialog: React.FC<SaveFileDialogProps> = ({
  isOpen,
  defaultFileName,
  onClose,
  onSave,
}) => {
  const { t } = useTranslation();
  useCloseOnBack(isOpen, onClose);
  const [fileName, setFileName] = useState(defaultFileName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setFileName(defaultFileName);
      // Focus input after dialog opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isOpen, defaultFileName]);

  if (!isOpen) return null;

  const handleSave = () => {
    const trimmed = fileName.trim();
    if (!trimmed) return;

    // Ensure .sgf extension
    const finalFileName = trimmed.endsWith('.sgf') ? trimmed : `${trimmed}.sgf`;
    onSave(finalFileName);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="save-file-dialog-overlay" onClick={onClose}>
      <div className="save-file-dialog" onClick={e => e.stopPropagation()}>
        <h2>{t('saveGame')}</h2>

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
        </div>

        <div className="save-file-dialog-buttons">
          <button onClick={onClose} className="button-secondary">
            {t('cancel')}
          </button>
          <button onClick={handleSave} className="button-primary" disabled={!fileName.trim()}>
            {t('save')}
          </button>
        </div>
      </div>
    </div>
  );
};
