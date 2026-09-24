import React from 'react';
import { useTranslation } from 'react-i18next';
import { LuX, LuExternalLink } from 'react-icons/lu';
import type { VersionData } from '../layout/StatusBar';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';
import './AboutDialog.css';

interface AboutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  versionData?: VersionData;
}

const GITHUB_REPO_URL = 'https://github.com/kaya-go/kaya';

export const AboutDialog: React.FC<AboutDialogProps> = ({ isOpen, onClose, versionData }) => {
  const { t } = useTranslation();
  useCloseOnBack(isOpen, onClose);

  if (!isOpen) return null;

  // Format version data
  let version: string | undefined;
  let gitHash: string | undefined;
  let buildDateFormatted: string | undefined;
  let versionUrl: string | undefined;
  let commitUrl: string | undefined;

  if (versionData) {
    version = versionData.version;
    gitHash = versionData.gitHash;
    buildDateFormatted = new Date(versionData.buildDate).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    commitUrl = `${GITHUB_REPO_URL}/commit/${gitHash}`;
    // For dev versions, link to the commit instead of a release that doesn't exist
    if (version.includes('-dev') || version.includes('-')) {
      versionUrl = commitUrl;
    } else {
      versionUrl = `${GITHUB_REPO_URL}/releases/tag/v${version}`;
    }
  }

  return (
    <div className="about-overlay" onClick={onClose}>
      <div className="about-dialog" onClick={e => e.stopPropagation()}>
        <button className="about-close-button" onClick={onClose} title={t('close')}>
          <LuX size={18} />
        </button>

        <div className="about-header">
          <img src="/icon.png" alt="Kaya" className="about-logo" />
          <h1 className="about-title">Kaya</h1>
        </div>

        <p className="about-description">{t('aboutDescription')}</p>

        <div className="about-info">
          {versionData ? (
            <>
              <div className="about-info-row">
                <span className="about-label">{t('aboutVersion')}:</span>
                <a
                  href={versionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-link"
                >
                  v{version} <LuExternalLink size={12} />
                </a>
              </div>
              <div className="about-info-row">
                <span className="about-label">{t('aboutCommit')}:</span>
                <a
                  href={commitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-link"
                >
                  {gitHash} <LuExternalLink size={12} />
                </a>
              </div>
              <div className="about-info-row">
                <span className="about-label">{t('aboutBuildDate')}:</span>
                <span className="about-value">{buildDateFormatted}</span>
              </div>
            </>
          ) : (
            <div className="about-info-row">
              <span className="about-value">{t('aboutVersionNotAvailable')}</span>
            </div>
          )}
          <div className="about-info-row">
            <span className="about-label">{t('aboutLicense')}:</span>
            <span className="about-value">AGPL-3.0</span>
          </div>
        </div>

        <div className="about-links">
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="about-github-link"
          >
            {t('aboutGitHub')} <LuExternalLink size={14} />
          </a>
          <a
            href={`${GITHUB_REPO_URL}/issues/new/choose`}
            target="_blank"
            rel="noopener noreferrer"
            className="about-github-link"
          >
            {t('aboutReportIssue')} <LuExternalLink size={14} />
          </a>
        </div>

        <p className="about-copyright">© 2025 Kaya Team</p>
      </div>
    </div>
  );
};
