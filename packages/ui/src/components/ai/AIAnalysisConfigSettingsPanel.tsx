import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuSettings, LuChevronDown, LuChevronRight } from 'react-icons/lu';
import type { AISettings } from '../../types/game';
import { BackendSelector } from './BackendSelector';
import { MctsVisitsSelector } from './MctsVisitsSelector';

export interface AIAnalysisConfigSettingsPanelProps {
  aiSettings: AISettings;
  setAISettings: (settings: Partial<AISettings>) => void;
}

export const AIAnalysisConfigSettingsPanel: React.FC<AIAnalysisConfigSettingsPanelProps> = ({
  aiSettings,
  setAISettings,
}) => {
  const { t } = useTranslation();
  // Auto-expand the Advanced section if the user has a non-auto backend set —
  // they're already off the happy path and shouldn't have to hunt for it.
  const [advancedOpen, setAdvancedOpen] = useState(
    aiSettings.backend !== undefined && aiSettings.backend !== 'auto'
  );

  const showBatchSlider = aiSettings.backend === 'webgpu' || aiSettings.backend === 'webnn';

  return (
    <section className="ai-config-section">
      <div className="section-header">
        <LuSettings className="section-icon" />
        <h3>{t('aiConfig.analysisOptions')}</h3>
      </div>

      <div className="settings-list">
        {/* Search Visits — primary user control */}
        <div className="setting-item setting-item-full">
          <div className="setting-info">
            <label htmlFor="num-visits-selector" className="setting-label">
              {t('aiConfig.numVisits')}
              <span className="setting-value">{aiSettings.numVisits}</span>
            </label>
            <p className="setting-description">{t('aiConfig.numVisitsDescription')}</p>
          </div>
          <MctsVisitsSelector
            id="num-visits-selector"
            value={aiSettings.numVisits}
            onChange={visits => setAISettings({ numVisits: visits })}
          />
        </div>

        {/* Heatmap display controls */}
        <div className="setting-item">
          <div className="setting-info">
            <label htmlFor="max-top-moves-slider" className="setting-label">
              {t('aiConfig.maxTopMoves')}
              <span className="setting-value">{aiSettings.maxTopMoves}</span>
            </label>
            <p className="setting-description">{t('aiConfig.maxTopMovesDescription')}</p>
          </div>
          <input
            id="max-top-moves-slider"
            type="range"
            min="1"
            max="10"
            step="1"
            value={aiSettings.maxTopMoves}
            onChange={e => setAISettings({ maxTopMoves: parseInt(e.target.value) })}
            className="ai-slider"
          />
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <label htmlFor="min-prob-slider" className="setting-label">
              {t('aiConfig.minProbability')}
              <span className="setting-value">{(aiSettings.minProb * 100).toFixed(0)}%</span>
            </label>
            <p className="setting-description">{t('aiConfig.minProbabilityDescription')}</p>
          </div>
          <input
            id="min-prob-slider"
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={aiSettings.minProb}
            onChange={e => setAISettings({ minProb: parseFloat(e.target.value) })}
            className="ai-slider"
          />
        </div>

        {/* Save Analysis to SGF */}
        <div className="setting-item setting-item-toggle setting-item-full">
          <div className="setting-info">
            <label htmlFor="save-analysis-check" className="setting-label">
              {t('aiConfig.saveAnalysisToSgf')}
            </label>
            <p className="setting-description">{t('aiConfig.saveAnalysisToSgfDescription')}</p>
          </div>
          <button
            id="save-analysis-check"
            type="button"
            role="switch"
            aria-checked={aiSettings.saveAnalysisToSgf}
            className={`toggle-switch ${aiSettings.saveAnalysisToSgf ? 'active' : ''}`}
            onClick={() => setAISettings({ saveAnalysisToSgf: !aiSettings.saveAnalysisToSgf })}
          >
            <span className="toggle-switch-handle" />
          </button>
        </div>

        {/* Advanced disclosure */}
        <div className="setting-item setting-item-full ai-advanced-section">
          <button
            type="button"
            className="ai-advanced-toggle"
            aria-expanded={advancedOpen}
            onClick={() => setAdvancedOpen(o => !o)}
          >
            {advancedOpen ? <LuChevronDown /> : <LuChevronRight />}
            <span>{t('aiConfig.advancedSettings')}</span>
          </button>
          {!advancedOpen && (
            <p className="setting-description ai-advanced-hint">
              {t('aiConfig.advancedSettingsHint')}
            </p>
          )}
          {advancedOpen && (
            <div className="ai-advanced-body">
              <div className="setting-info">
                <label className="setting-label">{t('aiConfig.inferenceBackend')}</label>
                <p className="setting-description">{t('aiConfig.inferenceBackendDescription')}</p>
              </div>
              <BackendSelector
                value={aiSettings.backend}
                onChange={backend => setAISettings({ backend })}
              />
              <div className={`batch-size-setting${showBatchSlider ? '' : ' batch-size-disabled'}`}>
                <div className="setting-info">
                  <label htmlFor="webgpu-batch-slider" className="setting-label">
                    {t('aiConfig.webgpuBatchSize')}
                    <span className="setting-value">{aiSettings.webgpuBatchSize}</span>
                  </label>
                  <p className="setting-description">{t('aiConfig.webgpuBatchSizeDescription')}</p>
                </div>
                <input
                  id="webgpu-batch-slider"
                  type="range"
                  min="1"
                  max="16"
                  step="1"
                  value={aiSettings.webgpuBatchSize}
                  onChange={e => setAISettings({ webgpuBatchSize: parseInt(e.target.value) })}
                  className="ai-slider"
                  disabled={!showBatchSlider}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
