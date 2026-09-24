import React from 'react';
import { LuSave, LuTrash2, LuX } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';
import './UnsavedChangesDialog.css';

export type UnsavedChangesAction = 'save' | 'discard' | 'cancel';

interface UnsavedChangesDialogProps {
  isOpen: boolean;
  /** Whether the game is from the library (can be saved) */
  canSave: boolean;
  onAction: (action: UnsavedChangesAction) => void;
}

export const UnsavedChangesDialog: React.FC<UnsavedChangesDialogProps> = ({
  isOpen,
  canSave,
  onAction,
}) => {
  const { t } = useTranslation();
  // Backing out of this dialog is treated as "cancel" — it is the safe choice.
  useCloseOnBack(isOpen, () => onAction('cancel'));
  if (!isOpen) return null;

  return (
    <div className="unsaved-changes-overlay" onClick={() => onAction('cancel')}>
      <div className="unsaved-changes-dialog" onClick={e => e.stopPropagation()}>
        <div className="unsaved-changes-header">
          <h2>{t('unsavedChanges')}</h2>
        </div>
        <div className="unsaved-changes-content">
          {canSave ? <p>{t('unsavedChangesPrompt')}</p> : <p>{t('unsavedChangesLost')}</p>}
        </div>
        <div className="unsaved-changes-actions">
          <button className="unsaved-changes-btn cancel" onClick={() => onAction('cancel')}>
            <LuX size={16} />
            {t('cancel')}
          </button>
          <button className="unsaved-changes-btn discard" onClick={() => onAction('discard')}>
            <LuTrash2 size={16} />
            {t('discard')}
          </button>
          {canSave && (
            <button className="unsaved-changes-btn save" onClick={() => onAction('save')}>
              <LuSave size={16} />
              {t('save')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
