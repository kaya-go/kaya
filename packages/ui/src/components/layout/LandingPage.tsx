import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuPlay, LuFolderOpen, LuLibrary, LuCamera, LuDownload, LuShare } from 'react-icons/lu';
import { AppDropZone, type AppDropZoneRef } from '../file/AppDropZone';
import { ScanOptionsModal } from '../dialogs/ScanOptionsModal';
import type { PwaInstallState } from '../../hooks/usePwaInstall';
import './LandingPage.css';

export interface LandingPageProps {
  onNewGame: () => void;
  onContinue?: () => void;
  onOpenLibrary: () => void;
  onFileDrop: (file: File) => void;
  onNavigateToBoard?: () => void;
  version?: string;
  hasSavedGame?: boolean;
  logoUrl?: string;
  pwaInstall?: PwaInstallState;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNewGame,
  onContinue,
  onOpenLibrary,
  onFileDrop,
  onNavigateToBoard,
  version,
  hasSavedGame,
  logoUrl,
  pwaInstall,
}) => {
  const { t } = useTranslation();
  const dropZoneRef = useRef<AppDropZoneRef>(null);
  const openInputRef = useRef<HTMLInputElement>(null);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);

  const handleScanClick = useCallback(() => {
    setIsScanModalOpen(true);
  }, []);

  const handleScanFileSelected = useCallback((file: File) => {
    dropZoneRef.current?.loadFile(file);
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
          <div className="landing-brand">
            {logoUrl && <img src={logoUrl} alt="Kaya" className="landing-logo" />}
            <h1 className="landing-title">Kaya</h1>
          </div>
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

            <button className="landing-button secondary" onClick={handleScanClick}>
              <LuCamera size={24} />
              <span>{t('landing.scanBoard')}</span>
            </button>

            <ScanOptionsModal
              isOpen={isScanModalOpen}
              onClose={() => setIsScanModalOpen(false)}
              onSelectFile={handleScanFileSelected}
            />

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

            {pwaInstall &&
              !pwaInstall.isInstalled &&
              (pwaInstall.canPrompt ? (
                <button className="landing-button secondary" onClick={pwaInstall.promptInstall}>
                  <LuDownload size={24} />
                  <span>{t('pwa.installApp')}</span>
                </button>
              ) : pwaInstall.isIOS ? (
                <div className="landing-ios-install">
                  <LuShare size={16} />
                  <span>{t('pwa.iosTapShare')}</span>
                </div>
              ) : null)}

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
