import React from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { LuX, LuBrain, LuSettings, LuCpu, LuGamepad2, LuPalette, LuKeyboard } from 'react-icons/lu';
import { ShortcutsTab } from '../settings/ShortcutsTab';
import { useKayaConfig, type UseKayaConfigReturn } from './useKayaConfig';
import { KayaConfigAnalysisTab } from './KayaConfigAnalysisTab';
import { KayaConfigThemeTab } from './KayaConfigThemeTab';
import './KayaConfig.css';

// Game Tab Content (small enough to keep inline)
type GameTabProps = Pick<UseKayaConfigReturn, 'gameSettings' | 'setGameSettings'>;

const GameTab: React.FC<GameTabProps> = ({ gameSettings, setGameSettings }) => {
  const { t } = useTranslation();

  return (
    <section className="kaya-config-section">
      <div className="section-header">
        <LuGamepad2 className="section-icon" />
        <h3>{t('kayaConfig.boardSettings')}</h3>
      </div>

      <div className="settings-list">
        {/* Show Coordinates Toggle */}
        <div className="setting-item setting-item-toggle setting-item-full">
          <div className="setting-info">
            <label htmlFor="show-coordinates-check" className="setting-label">
              {t('kayaConfig.showCoordinates')}
            </label>
            <p className="setting-description">{t('kayaConfig.showCoordinatesDescription')}</p>
          </div>
          <div className="toggle-with-label">
            <span className={`toggle-status ${gameSettings.showCoordinates ? 'on' : 'off'}`}>
              {gameSettings.showCoordinates ? 'On' : 'Off'}
            </span>
            <button
              id="show-coordinates-check"
              type="button"
              role="switch"
              aria-checked={gameSettings.showCoordinates}
              className={`toggle-switch ${gameSettings.showCoordinates ? 'active' : ''}`}
              onClick={() => setGameSettings({ showCoordinates: !gameSettings.showCoordinates })}
            >
              <span className="toggle-switch-handle" />
            </button>
          </div>
        </div>

        {/* Fuzzy Stone Placement Toggle */}
        <div className="setting-item setting-item-toggle setting-item-full">
          <div className="setting-info">
            <label htmlFor="fuzzy-placement-check" className="setting-label">
              {t('kayaConfig.fuzzyStonePlacement')}
            </label>
            <p className="setting-description">{t('kayaConfig.fuzzyStonePlacementDescription')}</p>
          </div>
          <div className="toggle-with-label">
            <span className={`toggle-status ${gameSettings.fuzzyStonePlacement ? 'on' : 'off'}`}>
              {gameSettings.fuzzyStonePlacement ? 'On' : 'Off'}
            </span>
            <button
              id="fuzzy-placement-check"
              type="button"
              role="switch"
              aria-checked={gameSettings.fuzzyStonePlacement}
              className={`toggle-switch ${gameSettings.fuzzyStonePlacement ? 'active' : ''}`}
              onClick={() =>
                setGameSettings({ fuzzyStonePlacement: !gameSettings.fuzzyStonePlacement })
              }
            >
              <span className="toggle-switch-handle" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const KayaConfig: React.FC = () => {
  const config = useKayaConfig();
  const {
    t,
    portalContainer,
    activeTab,
    setActiveTab,
    closeModal,
    isAIConfigOpen,
    setAIConfigOpen,
    gameSettings,
    setGameSettings,
  } = config;

  const modalContent = (
    <div
      className="kaya-config-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={t('kayaConfig.title')}
      onClick={closeModal}
    >
      <div
        className="kaya-config-modal"
        onClick={event => event.stopPropagation()}
        onPointerDown={event => event.stopPropagation()}
        onWheel={event => event.stopPropagation()}
        onTouchMove={event => event.stopPropagation()}
      >
        <div className="kaya-config-header">
          <div className="kaya-config-title">
            <LuSettings className="kaya-config-icon-main" />
            <h2>{t('kayaConfig.title')}</h2>
          </div>
          <button
            className="kaya-config-close"
            onClick={closeModal}
            aria-label={t('kayaConfig.close')}
          >
            <LuX />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="kaya-config-tabs">
          <button
            className={`kaya-config-tab ${activeTab === 'analysis' ? 'active' : ''}`}
            onClick={() => setActiveTab('analysis')}
          >
            <LuBrain size={16} />
            {t('kayaConfig.analysisTab')}
          </button>
          <button
            className={`kaya-config-tab ${activeTab === 'game' ? 'active' : ''}`}
            onClick={() => setActiveTab('game')}
          >
            <LuGamepad2 size={16} />
            {t('kayaConfig.gameTab')}
          </button>
          <button
            className={`kaya-config-tab ${activeTab === 'theme' ? 'active' : ''}`}
            onClick={() => setActiveTab('theme')}
          >
            <LuPalette size={16} />
            {t('kayaConfig.themeTab')}
          </button>
          <button
            className={`kaya-config-tab ${activeTab === 'shortcuts' ? 'active' : ''}`}
            onClick={() => setActiveTab('shortcuts')}
          >
            <LuKeyboard size={16} />
            {t('kayaConfig.shortcutsTab')}
          </button>
        </div>

        <div className="kaya-config-content">
          <div className="kaya-config-container">
            {activeTab === 'analysis' && <KayaConfigAnalysisTab {...config} />}
            {activeTab === 'game' && (
              <GameTab gameSettings={gameSettings} setGameSettings={setGameSettings} />
            )}
            {activeTab === 'theme' && <KayaConfigThemeTab />}
            {activeTab === 'shortcuts' && <ShortcutsTab />}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        className="kaya-config-trigger"
        onClick={() => setAIConfigOpen(true)}
        title={t('kayaConfig.title')}
        aria-label={t('kayaConfig.title')}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: '4px',
          border: 'none',
          background: 'transparent',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
          e.currentTarget.style.color = 'var(--text-primary)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--text-secondary)';
        }}
      >
        <LuCpu size={20} />
      </button>

      {isAIConfigOpen && portalContainer && createPortal(modalContent, portalContainer)}
    </>
  );
};

// Backward compatibility alias
export const AIAnalysisConfig = KayaConfig;
