/**
 * Dialog components for the library panel (New Folder, Confirm Delete).
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { LuTriangleAlert } from 'react-icons/lu';

export interface ConfirmDialogState {
  title: string;
  message: string;
  onConfirm: () => void;
  danger?: boolean;
}

export interface NewFolderDialogProps {
  name: string;
  onNameChange: (name: string) => void;
  onConfirm: () => void;
  onClose: () => void;
  inputRef: (input: HTMLInputElement | null) => void;
}

export const NewFolderDialog: React.FC<NewFolderDialogProps> = ({
  name,
  onNameChange,
  onConfirm,
  onClose,
  inputRef,
}) => {
  const { t } = useTranslation();

  return (
    <div className="library-dialog-overlay" onClick={onClose}>
      <div className="library-dialog" onClick={e => e.stopPropagation()}>
        <div className="library-dialog-title">{t('library.newFolder')}</div>
        <input
          type="text"
          className="library-dialog-input"
          value={name}
          onChange={e => onNameChange(e.target.value)}
          onKeyDown={e => {
            e.stopPropagation();
            if (e.key === 'Enter') onConfirm();
            if (e.key === 'Escape') onClose();
          }}
          onKeyUp={e => e.stopPropagation()}
          onKeyPress={e => e.stopPropagation()}
          autoFocus
          ref={inputRef}
        />
        <div className="library-dialog-buttons">
          <button className="library-dialog-btn secondary" onClick={onClose}>
            {t('cancel')}
          </button>
          <button className="library-dialog-btn primary" onClick={onConfirm}>
            {t('library.create')}
          </button>
        </div>
      </div>
    </div>
  );
};

export interface ConfirmDialogProps {
  dialog: ConfirmDialogState;
  onClose: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ dialog, onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="library-dialog-overlay" onClick={onClose}>
      <div
        className={`library-dialog ${dialog.danger ? 'danger' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="library-dialog-header">
          {dialog.danger && (
            <span className="library-dialog-icon">
              <LuTriangleAlert size={20} />
            </span>
          )}
          <div className="library-dialog-title">{dialog.title}</div>
        </div>
        <div className="library-dialog-message">{dialog.message}</div>
        <div className="library-dialog-buttons">
          <button className="library-dialog-btn secondary" onClick={onClose}>
            {t('cancel')}
          </button>
          <button
            className={`library-dialog-btn ${dialog.danger ? 'danger' : 'primary'}`}
            onClick={dialog.onConfirm}
          >
            {t('library.delete')}
          </button>
        </div>
      </div>
    </div>
  );
};
