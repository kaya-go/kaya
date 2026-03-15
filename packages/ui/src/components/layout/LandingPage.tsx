import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { LuPlay, LuFolderOpen, LuLibrary, LuCamera } from 'react-icons/lu';
import { AppDropZone, type AppDropZoneRef } from '../file/AppDropZone';
import './LandingPage.css';

export interface LandingPageProps {
  onNewGame: () => void;
  onContinue?: () => void;
  onOpenLibrary: () => void;
  onFileDrop: (file: File) => void;
  onNavigateToBoard?: () => void;
  version?: string;
  hasSavedGame?: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNewGame,
  onContinue,
  onOpenLibrary,
  onFileDrop,
  onNavigateToBoard,
  version,
  hasSavedGame,
}) => {
  const { t } = useTranslation();
  const dropZoneRef = useRef<AppDropZoneRef>(null);
  const scanInputRef = useRef<HTMLInputElement>(null);
  const openInputRef = useRef<HTMLInputElement>(null);

  const handleScanClick = useCallback(() => {
    scanInputRef.current?.click();
  }, []);

  const handleScanChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) dropZoneRef.current?.loadFile(file);
    e.target.value = '';
  }, []);

  const handleOpenClick = useCallback(() => {
    openInputRef.current?.click();
  }, []);

  const handleOpenChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onFileDrop(file);
      e.target.value = '';
    },
    [onFileDrop]
  );

  return (
    <AppDropZone ref={dropZoneRef} onFileDrop={onFileDrop} onNavigateToBoard={onNavigateToBoard}>
      <div className="landing-page">
        <div className="landing-content">
          <h1 className="landing-title">Kaya</h1>
          <p className="landing-subtitle">{t('landing.tagline')}</p>

          <div className="landing-actions">
            {hasSavedGame && onContinue ? (
              <>
                <button className="landing-button primary" onClick={onContinue}>
                  <LuPlay size={24} />
                  <span>{t('landing.continue')}</span>
                </button>
                <button className="landing-button secondary" onClick={onNewGame}>
                  <LuPlay size={24} />
                  <span>{t('landing.newGame')}</span>
                </button>
              </>
            ) : (
              <button className="landing-button primary" onClick={onNewGame}>
                <LuPlay size={24} />
                <span>{t('landing.newGame')}</span>
              </button>
            )}

            <button className="landing-button secondary" onClick={onOpenLibrary}>
              <LuLibrary size={24} />
              <span>{t('landing.library')}</span>
            </button>

            <input
              ref={scanInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleScanChange}
            />
            <button className="landing-button secondary" onClick={handleScanClick}>
              <LuCamera size={24} />
              <span>{t('landing.scanBoard')}</span>
            </button>

            <input
              ref={openInputRef}
              type="file"
              accept=".sgf"
              style={{ display: 'none' }}
              onChange={handleOpenChange}
            />
            <button className="landing-button secondary" onClick={handleOpenClick}>
              <LuFolderOpen size={24} />
              <span>{t('landing.openFile')}</span>
            </button>

            <div className="landing-drop-text">
              <LuFolderOpen size={16} />
              <span>{t('landing.dropSgfToOpen')}</span>
            </div>
          </div>

          <div className="landing-footer">v{version || '0.0.0'}</div>
        </div>
      </div>
    </AppDropZone>
  );
};
