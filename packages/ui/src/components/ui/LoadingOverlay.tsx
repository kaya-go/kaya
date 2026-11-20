/**
 * LoadingOverlay Component
 *
 * Displays a loading overlay with progress bar for long-running operations
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGameTreeFile } from '../../contexts/GameTreeContext';
import './LoadingOverlay.css';

export const LoadingOverlay: React.FC = () => {
  const { t } = useTranslation();
  const { isLoadingSGF, loadingProgress, loadingMessage } = useGameTreeFile();

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

          <div className="loading-progress-container">
            <div className="loading-progress-bar">
              <div className="loading-progress-fill" style={{ width: `${loadingProgress}%` }}></div>
            </div>
            <div className="loading-progress-text">{loadingProgress}%</div>
          </div>

          <div className="loading-message">{loadingMessage && t(loadingMessage)}</div>
        </div>
      </div>
    </div>
  );
};
