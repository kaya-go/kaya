import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuChevronDown, LuChevronRight, LuSettings } from 'react-icons/lu';
import { BackendSelector } from './BackendSelector';
import { KayaConfigModelList } from './KayaConfigModelList';
import { MAX_VISITS, MIN_VISITS } from './mcts-visits-presets';

// Quick-pick presets for full-game analysis. The default (10) is the
// middle option so it's visually anchored.
const FULL_GAME_PRESETS: readonly number[] = [1, 5, 10, 25, 50];
import type { UseKayaConfigReturn } from './useKayaConfig';
import './KayaConfigSettings.css';

type KayaConfigAnalysisTabProps = Pick<
  UseKayaConfigReturn,
  | 'hasAnyDownloaded'
  | 'isAnyDownloading'
  | 'recommendedModel'
  | 'handleDownloadRecommended'
  | 'modelsByBase'
  | 'expandedModelIndex'
  | 'handleToggleExpand'
  | 'selectedModelId'
  | 'handleSelect'
  | 'handleDownload'
  | 'handleDelete'
  | 'userModels'
  | 'fileInputRef'
  | 'handleFileSelect'
  | 'aiSettings'
  | 'setAISettings'
  | 'isLinuxDesktop'
  | 'pytorchAvailable'
  | 'webnnAvailable'
>;

export const KayaConfigAnalysisTab: React.FC<KayaConfigAnalysisTabProps> = ({
  hasAnyDownloaded,
  isAnyDownloading,
  recommendedModel,
  handleDownloadRecommended,
  modelsByBase,
  expandedModelIndex,
  handleToggleExpand,
  selectedModelId,
  handleSelect,
  handleDownload,
  handleDelete,
  userModels,
  fileInputRef,
  handleFileSelect,
  aiSettings,
  setAISettings,
  isLinuxDesktop,
  pytorchAvailable,
  webnnAvailable,
}) => {
  const { t } = useTranslation();
  // Auto-expand Advanced if user has a non-auto backend stored — they're
  // already off the happy path, surface the override they're using.
  const [advancedOpen, setAdvancedOpen] = useState(
    aiSettings.backend !== undefined && aiSettings.backend !== 'auto'
  );
  const showBatchSlider = aiSettings.backend === 'webgpu' || aiSettings.backend === 'webnn';

  return (
    <>
      <KayaConfigModelList
        hasAnyDownloaded={hasAnyDownloaded}
        isAnyDownloading={isAnyDownloading}
        recommendedModel={recommendedModel}
        handleDownloadRecommended={handleDownloadRecommended}
        modelsByBase={modelsByBase}
        expandedModelIndex={expandedModelIndex}
        handleToggleExpand={handleToggleExpand}
        selectedModelId={selectedModelId}
        handleSelect={handleSelect}
        handleDownload={handleDownload}
        handleDelete={handleDelete}
        userModels={userModels}
        fileInputRef={fileInputRef}
        handleFileSelect={handleFileSelect}
      />

      {/* Settings Section */}
      <section className="kaya-config-section">
        <div className="section-header">
          <LuSettings className="section-icon" />
          <h3>{t('aiConfig.analysisOptions')}</h3>
        </div>

        <div className="settings-list">
          {/* Max Top Moves */}
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

          {/* Full Game Search Depth */}
          <div className="setting-item">
            <div className="setting-info">
              <label className="setting-label">
                {t('aiConfig.fullGameNumVisits')}
                <span className="setting-value">{aiSettings.fullGameNumVisits}</span>
              </label>
              <p className="setting-description">{t('aiConfig.fullGameNumVisitsDescription')}</p>
            </div>
            <div className="ai-preset-row">
              {FULL_GAME_PRESETS.map(preset => {
                const active = aiSettings.fullGameNumVisits === preset;
                return (
                  <button
                    key={preset}
                    type="button"
                    className={`ai-preset-chip${active ? ' is-active' : ''}`}
                    aria-pressed={active}
                    onClick={() => setAISettings({ fullGameNumVisits: preset })}
                  >
                    {preset}
                  </button>
                );
              })}
              <input
                id="full-game-visits-input"
                type="number"
                min={MIN_VISITS}
                max={MAX_VISITS}
                step={1}
                value={aiSettings.fullGameNumVisits}
                aria-label={t('aiConfig.fullGameNumVisits')}
                onChange={e => {
                  const parsed = Number.parseInt(e.target.value, 10);
                  if (!Number.isFinite(parsed)) return;
                  const clamped = Math.min(MAX_VISITS, Math.max(MIN_VISITS, parsed));
                  setAISettings({ fullGameNumVisits: clamped });
                }}
                className={`ai-preset-input${FULL_GAME_PRESETS.includes(aiSettings.fullGameNumVisits) ? '' : ' is-custom'}`}
              />
            </div>
          </div>

          {/* Min Probability */}
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
            <div className="toggle-with-label">
              <span className={`toggle-status ${aiSettings.saveAnalysisToSgf ? 'on' : 'off'}`}>
                {aiSettings.saveAnalysisToSgf ? 'On' : 'Off'}
              </span>
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

          {/* Advanced disclosure: backend override + WebGPU batch size */}
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
                  isLinuxDesktop={isLinuxDesktop}
                  pytorchAvailable={pytorchAvailable}
                  webnnAvailable={webnnAvailable}
                />
                <div
                  className={`batch-size-setting${showBatchSlider ? '' : ' batch-size-disabled'}`}
                >
                  <div className="setting-info">
                    <label htmlFor="webgpu-batch-slider" className="setting-label">
                      {t('aiConfig.webgpuBatchSize')}
                      <span className="setting-value">{aiSettings.webgpuBatchSize}</span>
                    </label>
                    <p className="setting-description">
                      {t('aiConfig.webgpuBatchSizeDescription')}
                    </p>
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

      {/* KataGo Attribution Footer */}
      <div className="ai-config-footer">
        {t('aiConfig.poweredBy')}{' '}
        <a href="https://github.com/lightvector/KataGo" target="_blank" rel="noopener noreferrer">
          KataGo
        </a>
      </div>
    </>
  );
};
