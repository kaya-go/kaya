import React from 'react';
import { LuDownload, LuX, LuShare } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';
import type { PwaInstallState } from '../../hooks/usePwaInstall';
import './PwaInstallBanner.css';

interface PwaInstallBannerProps {
  pwa: PwaInstallState;
}

export const PwaInstallBanner: React.FC<PwaInstallBannerProps> = ({ pwa }) => {
  const { t } = useTranslation();

  // Don't show if already installed, already dismissed, or no install option
  if (pwa.isInstalled || pwa.dismissed) return null;
  if (!pwa.canPrompt && !pwa.isIOS) return null;

  return (
    <div className="pwa-install-banner">
      <div className="pwa-install-banner-content">
        {pwa.isIOS ? (
          <>
            <LuShare size={20} />
            <span>{t('pwa.iosTapShare')}</span>
          </>
        ) : (
          <>
            <LuDownload size={20} />
            <span>{t('pwa.installPrompt')}</span>
            <button className="pwa-install-banner-btn" onClick={pwa.promptInstall}>
              {t('pwa.install')}
            </button>
          </>
        )}
      </div>
      <button className="pwa-install-banner-close" onClick={pwa.dismiss} aria-label={t('close')}>
        <LuX size={18} />
      </button>
    </div>
  );
};
