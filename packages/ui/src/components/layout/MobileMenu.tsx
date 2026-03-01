import React, { useState } from 'react';
import {
  LuX,
  LuSun,
  LuMoon,
  LuVolume2,
  LuVolumeX,
  LuGithub,
  LuPlus,
  LuFolderOpen,
  LuSave,
  LuBookmarkPlus,
  LuDownload,
  LuCopy,
  LuClipboardPaste,
  LuZap,
  LuLayoutDashboard,
  LuGlobe,
  LuCheck,
  LuChevronRight,
  LuCamera,
} from 'react-icons/lu';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { useGameSounds } from '../../useGameSounds';
import { useI18n } from '@kaya/i18n';
import type { Locale } from '@kaya/i18n';
import type { VersionData } from './StatusBar';
import './MobileMenu.css';

// Flag emojis for each locale
const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  zh: '🇨🇳',
  ko: '🇰🇷',
  ja: '🇯🇵',
  fr: '🇫🇷',
  de: '🇩🇪',
  es: '🇪🇸',
  it: '🇮🇹',
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  versionData?: VersionData;
  onNewGame: () => void;
  onQuickNewGame: () => void;
  onOpen: () => void;
  onScanBoard: () => void;
  onSave: () => void;
  onSaveAs: () => void;
  onExport: () => void;
  onCopySGF: () => void;
  onPasteSGF: () => void;
  onGoHome?: () => void;
  isDirty?: boolean;
  /** Whether the current game is loaded from the library */
  isInLibrary?: boolean;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  versionData,
  onNewGame,
  onQuickNewGame,
  onOpen,
  onScanBoard,
  onSave,
  onSaveAs,
  onExport,
  onCopySGF,
  onPasteSGF,
  onGoHome,
  isDirty = false,
  isInLibrary = false,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { soundEnabled, toggleSound } = useGameSounds();
  const { t } = useTranslation();
  const { locale, setLocale, locales } = useI18n();
  const [showLanguages, setShowLanguages] = useState(false);

  if (!isOpen) return null;

  const handleLanguageSelect = async (newLocale: Locale) => {
    await setLocale(newLocale);
    setShowLanguages(false);
  };

  return (
    <>
      <div className="mobile-menu-overlay" onClick={onClose} />
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <h2 className="mobile-menu-title">
            Kaya
            {versionData?.version && (
              <span className="mobile-menu-version-tag">v{versionData.version}</span>
            )}
          </h2>
          <button className="mobile-menu-close" onClick={onClose}>
            <LuX size={24} />
          </button>
        </div>

        <div className="mobile-menu-content">
          <div className="mobile-menu-section">
            <h3 className="mobile-menu-section-title">{t('game')}</h3>
            {onGoHome && (
              <button
                className="mobile-menu-item"
                onClick={() => {
                  onGoHome();
                  onClose();
                }}
              >
                <LuLayoutDashboard size={20} />
                <span>{t('home')}</span>
              </button>
            )}
            <button
              className="mobile-menu-item"
              onClick={() => {
                onQuickNewGame();
                onClose();
              }}
            >
              <LuZap size={20} />
              <span>{t('quickNewGame')}</span>
            </button>
            <button
              className="mobile-menu-item"
              onClick={() => {
                onNewGame();
                onClose();
              }}
            >
              <LuPlus size={20} />
              <span>{t('newGameEllipsis')}</span>
            </button>
            <button
              className="mobile-menu-item"
              onClick={() => {
                onOpen();
                onClose();
              }}
            >
              <LuFolderOpen size={20} />
              <span>{t('openSgf')}</span>
            </button>
            <button
              className="mobile-menu-item"
              onClick={() => {
                onScanBoard();
                onClose();
              }}
            >
              <LuCamera size={20} />
              <span>{t('scanBoard')}</span>
            </button>
            <button
              className="mobile-menu-item"
              onClick={() => {
                onSave();
                onClose();
              }}
              disabled={!isDirty && isInLibrary}
            >
              <LuSave size={20} />
              <span>{t('save')}</span>
            </button>
            <button
              className="mobile-menu-item"
              onClick={() => {
                onSaveAs();
                onClose();
              }}
            >
              <LuBookmarkPlus size={20} />
              <span>{t('saveAs')}</span>
            </button>
            <button
              className="mobile-menu-item"
              onClick={() => {
                onExport();
                onClose();
              }}
            >
              <LuDownload size={20} />
              <span>{t('exportToDisk')}</span>
            </button>
          </div>

          <div className="mobile-menu-section">
            <h3 className="mobile-menu-section-title">{t('edit')}</h3>
            <button
              className="mobile-menu-item"
              onClick={() => {
                onCopySGF();
                onClose();
              }}
            >
              <LuCopy size={20} />
              <span>{t('copySgf')}</span>
            </button>
            <button
              className="mobile-menu-item"
              onClick={() => {
                onPasteSGF();
                onClose();
              }}
            >
              <LuClipboardPaste size={20} />
              <span>{t('pasteSgf')}</span>
            </button>
          </div>

          <div className="mobile-menu-section">
            <h3 className="mobile-menu-section-title">{t('settings')}</h3>
            <button className="mobile-menu-item" onClick={toggleTheme}>
              {theme === 'dark' ? <LuSun size={20} /> : <LuMoon size={20} />}
              <span>{theme === 'dark' ? t('lightMode') : t('darkMode')}</span>
            </button>
            <button className="mobile-menu-item" onClick={toggleSound}>
              {soundEnabled ? <LuVolume2 size={20} /> : <LuVolumeX size={20} />}
              <span>{soundEnabled ? t('muteSounds') : t('enableSounds')}</span>
            </button>
            <button
              className="mobile-menu-item mobile-menu-item-expandable"
              onClick={() => setShowLanguages(!showLanguages)}
            >
              <LuGlobe size={20} />
              <span>{t('language')}</span>
              <span className="mobile-menu-item-value">
                {localeFlags[locale]} {locales[locale]}
              </span>
              <LuChevronRight
                size={16}
                className={`mobile-menu-chevron ${showLanguages ? 'expanded' : ''}`}
              />
            </button>
            {showLanguages && (
              <div className="mobile-menu-submenu">
                {(Object.entries(locales) as [Locale, string][]).map(([code, name]) => (
                  <button
                    key={code}
                    className={`mobile-menu-submenu-item ${code === locale ? 'active' : ''}`}
                    onClick={() => handleLanguageSelect(code)}
                  >
                    <span className="mobile-menu-flag">{localeFlags[code]}</span>
                    <span className="mobile-menu-language-name">{name}</span>
                    {code === locale && <LuCheck size={16} className="mobile-menu-check" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mobile-menu-section">
            <a
              href="https://github.com/kaya-go/kaya"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-menu-item"
            >
              <LuGithub size={20} />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="mobile-menu-footer">
          {versionData && (
            <div className="mobile-menu-version-info">
              <div>
                {t('version')} {versionData.version}
              </div>
              {versionData.gitHash && (
                <div>
                  {t('commit')} {versionData.gitHash.substring(0, 7)}
                </div>
              )}
              {versionData.buildDate && (
                <div>
                  {t('date')} {new Date(versionData.buildDate).toLocaleDateString()}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
