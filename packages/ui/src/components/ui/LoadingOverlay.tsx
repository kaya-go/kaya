/**
 * LoadingOverlay Component
 *
 * Shown while an SGF file loads: a spinner and the current step. It shows no
 * percentage on purpose: the parse, the tree build and the commit run in one
 * task, so the browser never paints a value between the first and the last.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGameTreeFile } from '../../contexts/GameTreeContext';
import './LoadingOverlay.css';

export const LoadingOverlay: React.FC = () => {
  const { t } = useTranslation();
  const { isLoadingSGF, loadingMessage } = useGameTreeFile();

  if (!isLoadingSGF) {
    return null;
  }

  return (
    <div className="loading-overlay">
      <div className="loading-modal">
        <div className="loading-header">
          <h3>{t('loading.loadingSgfFile')}</h3>
        </div>

        <div className="loading-content">
          <div className="loading-spinner"></div>

          <div className="loading-message">{loadingMessage && t(loadingMessage)}</div>
        </div>
      </div>
    </div>
  );
};
