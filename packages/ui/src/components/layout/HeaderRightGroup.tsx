import React from 'react';
import {
  LuSun,
  LuMoon,
  LuVolume2,
  LuVolumeX,
  LuGithub,
  LuMaximize,
  LuMinimize,
  LuPanelTopClose,
  LuLibrary,
  LuPanelRight,
} from 'react-icons/lu';
import { useTranslation } from 'react-i18next';
import type { ShortcutId, KeyBinding } from '../../contexts/KeyboardShortcutsContext';
import { GamepadIndicator } from '../gamepad/GamepadIndicator';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { KayaConfig } from '../ai/KayaConfig';

interface HeaderRightGroupProps {
  showThemeToggle: boolean;
  showLibrary?: boolean;
  showSidebar?: boolean;
  onToggleLibrary?: () => void;
  onToggleSidebar?: () => void;
  onHide?: () => void;
  theme: string;
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  getBinding: (id: ShortcutId) => KeyBinding;
  bindingToDisplayString: (binding: KeyBinding) => string;
}

export const HeaderRightGroup: React.FC<HeaderRightGroupProps> = ({
  showThemeToggle,
  showLibrary,
  showSidebar,
  onToggleLibrary,
  onToggleSidebar,
  onHide,
  theme,
  toggleTheme,
  soundEnabled,
  toggleSound,
  isFullscreen,
  toggleFullscreen,
  getBinding,
  bindingToDisplayString,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className="header-right-group"
      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
    >
      <KayaConfig />
      {showThemeToggle && (
        <div className="header-toggles">
          {onToggleLibrary && (
            <button
              className={`panel-toggle ${showLibrary ? 'active' : ''}`}
              onClick={onToggleLibrary}
              title={showLibrary ? `${t('hideLibrary')} (Ctrl+L)` : `${t('showLibrary')} (Ctrl+L)`}
            >
              <LuLibrary size={20} />
            </button>
          )}
          {onToggleSidebar && (
            <button
              className={`panel-toggle ${showSidebar ? 'active' : ''}`}
              onClick={onToggleSidebar}
              title={showSidebar ? `${t('hideSidebar')} (Ctrl+B)` : `${t('showSidebar')} (Ctrl+B)`}
            >
              <LuPanelRight size={20} />
            </button>
          )}
          <GamepadIndicator />
          <button
            className="fullscreen-toggle"
            onClick={toggleFullscreen}
            title={
              isFullscreen
                ? `${t('exitFullscreen')} (${bindingToDisplayString(getBinding('view.toggleFullscreen'))})`
                : `${t('enterFullscreen')} (${bindingToDisplayString(getBinding('view.toggleFullscreen'))})`
            }
          >
            {isFullscreen ? <LuMinimize size={20} /> : <LuMaximize size={20} />}
          </button>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={theme === 'dark' ? t('switchToLightMode') : t('switchToDarkMode')}
          >
            {theme === 'dark' ? <LuSun size={20} /> : <LuMoon size={20} />}
          </button>
          <button
            className="sound-toggle"
            onClick={toggleSound}
            title={
              soundEnabled
                ? `${t('muteSounds')} (${bindingToDisplayString(getBinding('board.toggleSound'))})`
                : `${t('enableSounds')} (${bindingToDisplayString(getBinding('board.toggleSound'))})`
            }
          >
            {soundEnabled ? <LuVolume2 size={20} /> : <LuVolumeX size={20} />}
          </button>
          <LanguageSwitcher />
          <a
            href="https://github.com/kaya-go/kaya"
            target="_blank"
            rel="noopener noreferrer"
            title={t('viewOnGitHub')}
          >
            <LuGithub size={20} />
          </a>
          {onHide && (
            <button
              onClick={onHide}
              title={`${t('hideMenu')} (${bindingToDisplayString(getBinding('view.toggleHeader'))})`}
            >
              <LuPanelTopClose size={20} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
