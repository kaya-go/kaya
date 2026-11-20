/**
 * LoadingOverlay Component
 *
 * Displays a loading overlay with progress bar for long-running operations
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGameTreeFile } from '../../contexts/GameTreeContext';
import { loadingPercent } from '../../utils/loadingProgress';
import './LoadingOverlay.css';

export const LoadingOverlay: React.FC = () => {
  const { t } = useTranslation();
  const { isLoadingSGF, loadingProgress, loadingMessage } = useGameTreeFile();

  if (!isLoadingSGF) {
    return null;
  }

  const percent = loadingPercent(loadingProgress);

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
              <div className="loading-progress-fill" style={{ width: `${percent}%` }}></div>
            </div>
            <div className="loading-progress-text">{percent}%</div>
          </div>

          <div className="loading-message">{loadingMessage && t(loadingMessage)}</div>
        </div>
      </div>
    </div>
  );
};
