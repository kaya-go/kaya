/**
 * SaveStatus - Visual indicator for auto-save status
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import './SaveStatus.css';

interface SaveStatusProps {
  isSaving?: boolean;
  lastSaveTime?: Date | null;
}

export const SaveStatus: React.FC<SaveStatusProps> = ({ isSaving = false, lastSaveTime }) => {
  const { t } = useTranslation();
  const [showSaved, setShowSaved] = React.useState(false);

  React.useEffect(() => {
    if (lastSaveTime && !isSaving) {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [lastSaveTime, isSaving]);

  if (!showSaved && !isSaving) return null;

  return (
    <div className="save-status">
      {isSaving ? (
        <>
          <span className="save-status-icon saving">●</span>
          <span className="save-status-text">{t('saveStatus.saving')}</span>
        </>
      ) : (
        <>
          <span className="save-status-icon saved">✓</span>
          <span className="save-status-text">{t('saveStatus.saved')}</span>
        </>
      )}
    </div>
  );
};
