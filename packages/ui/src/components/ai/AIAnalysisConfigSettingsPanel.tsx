import React from 'react';
import { useTranslation } from 'react-i18next';
import { LuSettings } from 'react-icons/lu';
import type { AISettings } from '../../types/game';
import { isTauriApp } from '@kaya/platform';

export interface AIAnalysisConfigSettingsPanelProps {
  aiSettings: AISettings;
  setAISettings: (settings: Partial<AISettings>) => void;
}

export const AIAnalysisConfigSettingsPanel: React.FC<AIAnalysisConfigSettingsPanelProps> = ({
  aiSettings,
  setAISettings,
}) => {
  const { t } = useTranslation();

  return (
    <section className="ai-config-section">
      <div className="section-header">
        <LuSettings className="section-icon" />
        <h3>{t('aiConfig.analysisOptions')}</h3>
      </div>

      <div className="settings-list">
        {/* Backend Selection - Full width */}
        <div className="setting-item setting-item-full">
          <div className="setting-info">
            <label htmlFor="backend-select" className="setting-label">
              {t('aiConfig.inferenceBackend')}
            </label>
            <p className="setting-description">{t('aiConfig.inferenceBackendDescription')}</p>
          </div>
          <select
            id="backend-select"
            value={
              // If GPU was selected but not available, show WASM as selected
              aiSettings.backend === 'webgpu' &&
              !(typeof navigator !== 'undefined' && (navigator as any).gpu)
                ? 'wasm'
                : aiSettings.backend
            }
            onChange={e => setAISettings({ backend: e.target.value as any })}
            className="ai-select"
          >
            {/* Native backends: fastest, only available in Tauri desktop app */}
            {isTauriApp() && (
              <>
                <option value="native">{t('aiConfig.nativeAuto')}</option>
                <option value="native-cpu">{t('aiConfig.nativeCpu')}</option>
              </>
            )}
            {/* Only show WebGPU if supported */}
            {typeof navigator !== 'undefined' && (navigator as any).gpu && (
              <option value="webgpu">{t('aiConfig.webgpu')}</option>
            )}
            <option value="wasm">{t('aiConfig.wasm')}</option>
          </select>
        </div>

        {/* Batch Size - visible when WebGPU or WebNN is selected */}
        {(aiSettings.backend === 'webgpu' || aiSettings.backend === 'webnn') && (
          <div className="setting-item setting-item-full">
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
            />
          </div>
        )}

        {/* Max Top Moves - Left column */}
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

        {/* Min Probability - Right column */}
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

        {/* Search Visits - Full width */}
        <div className="setting-item setting-item-full">
          <div className="setting-info">
            <label htmlFor="num-visits-slider" className="setting-label">
              {t('aiConfig.numVisits')}
              <span className="setting-value">{aiSettings.numVisits}</span>
            </label>
            <p className="setting-description">{t('aiConfig.numVisitsDescription')}</p>
          </div>
          <input
            id="num-visits-slider"
            type="range"
            min="1"
            max="400"
            step="1"
            value={aiSettings.numVisits}
            onChange={e => setAISettings({ numVisits: parseInt(e.target.value) })}
            className="ai-slider"
          />
        </div>

        {/* Save Analysis to SGF - Full width toggle */}
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
      </div>
    </section>
  );
};
