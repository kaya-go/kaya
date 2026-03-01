import React from 'react';
import { useTranslation } from 'react-i18next';
import { LuPalette, LuCheck } from 'react-icons/lu';
import { useBoardTheme } from '@kaya/themes';
import './KayaConfigThemes.css';

export const KayaConfigThemeTab: React.FC = () => {
  const { t } = useTranslation();
  const { boardTheme, setBoardTheme, availableThemes } = useBoardTheme();

  return (
    <section className="kaya-config-section">
      <div className="section-header">
        <LuPalette className="section-icon" />
        <h3>{t('kayaConfig.themeSettings')}</h3>
      </div>

      <div className="config-note" style={{ marginBottom: '16px' }}>
        {t('kayaConfig.themeDescription')}
      </div>

      <div className="theme-grid">
        {availableThemes.map(theme => (
          <div
            key={theme.id}
            className={`theme-card ${boardTheme === theme.id ? 'selected' : ''}`}
            onClick={() => setBoardTheme(theme.id as any)}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setBoardTheme(theme.id as any);
              }
            }}
          >
            <div
              className="theme-preview"
              style={{
                backgroundColor: theme.board.backgroundColor,
                borderColor: theme.board.borderColor,
                backgroundImage: theme.boardTextureUrl
                  ? `url(${theme.boardTextureUrl})`
                  : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Two stones displayed side by side */}
              <div className="theme-preview-stones">
                <div
                  className="theme-preview-stone black"
                  style={{
                    backgroundColor: theme.blackStoneUrl
                      ? 'transparent'
                      : theme.stones.black.backgroundColor,
                    backgroundImage: theme.blackStoneUrl
                      ? `url(${theme.blackStoneUrl})`
                      : undefined,
                    backgroundSize: 'contain',
                    top: '50%',
                    left: '35%',
                    // Apply stone size from theme (scales the 44px base size)
                    width: theme.stones.black.size
                      ? `calc(44px * ${parseFloat(theme.stones.black.size) / 100})`
                      : undefined,
                    height: theme.stones.black.size
                      ? `calc(44px * ${parseFloat(theme.stones.black.size) / 100})`
                      : undefined,
                    border: theme.stones.black.borderWidth
                      ? `${theme.stones.black.borderWidth} solid ${theme.stones.black.borderColor}`
                      : undefined,
                    // Only apply box-shadow for themes without custom stone images
                    // Themes with custom SVGs have shadows baked into the image
                    boxShadow:
                      !theme.blackStoneUrl && theme.stones.black.shadowColor !== 'transparent'
                        ? `${theme.stones.black.shadowOffsetX} ${theme.stones.black.shadowOffsetY} ${theme.stones.black.shadowBlur} ${theme.stones.black.shadowColor}`
                        : 'none',
                  }}
                />
                <div
                  className="theme-preview-stone white"
                  style={{
                    backgroundColor: theme.whiteStoneUrl
                      ? 'transparent'
                      : theme.stones.white.backgroundColor,
                    backgroundImage: theme.whiteStoneUrl
                      ? `url(${theme.whiteStoneUrl})`
                      : undefined,
                    backgroundSize: 'contain',
                    top: '50%',
                    left: '65%',
                    // Apply stone size from theme (scales the 44px base size)
                    width: theme.stones.white.size
                      ? `calc(44px * ${parseFloat(theme.stones.white.size) / 100})`
                      : undefined,
                    height: theme.stones.white.size
                      ? `calc(44px * ${parseFloat(theme.stones.white.size) / 100})`
                      : undefined,
                    border: theme.stones.white.borderWidth
                      ? `${theme.stones.white.borderWidth} solid ${theme.stones.white.borderColor}`
                      : undefined,
                    // Only apply box-shadow for themes without custom stone images
                    // Themes with custom SVGs have shadows baked into the image
                    boxShadow:
                      !theme.whiteStoneUrl && theme.stones.white.shadowColor !== 'transparent'
                        ? `${theme.stones.white.shadowOffsetX} ${theme.stones.white.shadowOffsetY} ${theme.stones.white.shadowBlur} ${theme.stones.white.shadowColor}`
                        : 'none',
                  }}
                />
              </div>
            </div>
            <div className="theme-info">
              <div className="theme-name">
                {t(`kayaConfig.themes.${theme.id}.name`, { defaultValue: theme.name })}
                {boardTheme === theme.id && (
                  <span className="theme-active-badge">
                    <LuCheck size={12} />
                  </span>
                )}
              </div>
              <div className="theme-description">
                {t(`kayaConfig.themes.${theme.id}.description`, {
                  defaultValue: theme.description,
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
