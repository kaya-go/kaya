import React, { useEffect, useState, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import {
  LuX,
  LuBrain,
  LuSettings,
  LuTrash2,
  LuUpload,
  LuCpu,
  LuDownload,
  LuCheck,
  LuLoader,
  LuChevronDown,
  LuChevronRight,
  LuGamepad2,
  LuPalette,
} from 'react-icons/lu';
import { useGameTree } from '../../contexts/GameTreeContext';
import { useBoardTheme } from '../../contexts/BoardThemeContext';
import { useToast } from '../ui/Toast';
import { isTauriApp } from '../../services/fileSave';
import {
  BASE_MODELS,
  QUANTIZATION_OPTIONS,
  parseModelId,
  getModelId,
} from '../../hooks/game/useAIAnalysis';
import './KayaConfig.css';

type ConfigTab = 'analysis' | 'game' | 'theme';

export const KayaConfig: React.FC = () => {
  const { t } = useTranslation();
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [expandedModelIndex, setExpandedModelIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<ConfigTab>('analysis');
  const {
    aiSettings,
    setAISettings,
    gameSettings,
    setGameSettings,
    isAIConfigOpen,
    setAIConfigOpen,
    modelLibrary,
    selectedModelId,
    setSelectedModelId,
    downloadModel,
    deleteModel,
    uploadModel,
  } = useGameTree();
  const { showToast } = useToast();
  const { boardTheme, setBoardTheme, availableThemes } = useBoardTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Group models by base model index for hierarchical display
  const modelsByBase = useMemo(() => {
    const grouped = new Map<number, typeof modelLibrary>();
    for (const model of modelLibrary) {
      if (model.baseModelIndex !== undefined) {
        const existing = grouped.get(model.baseModelIndex) || [];
        existing.push(model);
        grouped.set(model.baseModelIndex, existing);
      }
    }
    return grouped;
  }, [modelLibrary]);

  // Get user-uploaded models (those without baseModelIndex)
  const userModels = useMemo(
    () => modelLibrary.filter(m => m.baseModelIndex === undefined),
    [modelLibrary]
  );

  // Track if user has manually interacted with expand/collapse
  const hasUserInteracted = useRef(false);

  // Expand the model that contains the selected variant on initial mount only
  useEffect(() => {
    if (selectedModelId && expandedModelIndex === null && !hasUserInteracted.current) {
      const parsed = parseModelId(selectedModelId);
      if (parsed) {
        setExpandedModelIndex(parsed.baseModelIndex);
      }
    }
  }, [selectedModelId, expandedModelIndex]);

  // Handler for toggling expand/collapse
  const handleToggleExpand = (baseIndex: number) => {
    hasUserInteracted.current = true;
    setExpandedModelIndex(expandedModelIndex === baseIndex ? null : baseIndex);
  };

  // Resolve portal container after mount to avoid SSR issues
  useEffect(() => {
    setPortalContainer(document.body);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (!isAIConfigOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isAIConfigOpen]);

  // Close modal on Escape to mimic native dialogs
  useEffect(() => {
    if (!isAIConfigOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setAIConfigOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isAIConfigOpen, setAIConfigOpen]);

  const closeModal = () => setAIConfigOpen(false);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await uploadModel(file);
        showToast(t('aiConfig.modelUploadedSuccess'), 'success');
      } catch (err) {
        showToast(t('aiConfig.modelUploadFailed'), 'error');
      }
    }
    // Reset input so the same file can be selected again
    event.target.value = '';
  };

  const handleDownload = async (id: string) => {
    try {
      await downloadModel(id);
      showToast(t('aiConfig.modelDownloadedSuccess'), 'success');
    } catch (err) {
      showToast(t('aiConfig.modelDownloadFailed'), 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteModel(id);
      showToast(t('aiConfig.modelDeletedSuccess'), 'success');
    } catch (err) {
      showToast(t('aiConfig.modelDeleteFailed'), 'error');
    }
  };

  const handleSelect = async (id: string) => {
    const model = modelLibrary.find(m => m.id === id);
    if (model?.isDownloaded) {
      await setSelectedModelId(id);
    }
  };

  // Check if any model is currently downloading
  const isAnyDownloading = modelLibrary.some(m => m.isDownloading);

  // Check if any model is downloaded
  const hasAnyDownloaded = modelLibrary.some(m => m.isDownloaded);

  // Get the recommended model's default variant ID (fp32 for full compatibility)
  const recommendedModelId = useMemo(() => {
    const recommendedBase = BASE_MODELS.findIndex(m => m.recommended);
    if (recommendedBase >= 0) {
      return getModelId(recommendedBase, 'fp32');
    }
    return null;
  }, []);

  // Get the recommended model's download state
  const recommendedModel = useMemo(() => {
    if (!recommendedModelId) return null;
    return modelLibrary.find(m => m.id === recommendedModelId) || null;
  }, [recommendedModelId, modelLibrary]);

  // Handle downloading the recommended model (no toast - progress shows in UI)
  const handleDownloadRecommended = async () => {
    if (recommendedModelId) {
      try {
        await downloadModel(recommendedModelId);
      } catch (err) {
        showToast(t('aiConfig.modelDownloadFailed'), 'error');
      }
    }
  };

  // Analysis Tab Content
  const renderAnalysisTab = () => (
    <>
      {/* Model Library Section */}
      <section className="kaya-config-section">
        <div className="section-header">
          <LuBrain className="section-icon" />
          <h3>{t('aiConfig.modelLibrary')}</h3>
        </div>
        <div className="config-note" style={{ marginBottom: '12px' }}>
          {t('aiConfig.modelLibraryDescription')}
        </div>

        {/* Get Started Banner - shown when no models are downloaded */}
        {!hasAnyDownloaded && (
          <div className="model-get-started-banner">
            <div className="get-started-content">
              <LuDownload className="get-started-icon" />
              <div className="get-started-text">
                <strong>{t('aiConfig.getStartedTitle')}</strong>
                <span>{t('aiConfig.getStartedDescription')}</span>
              </div>
            </div>
            <button
              className="get-started-btn"
              onClick={handleDownloadRecommended}
              disabled={isAnyDownloading}
            >
              {recommendedModel?.isDownloading ? (
                <>
                  <LuLoader className="spinning" size={16} />
                  {t('aiConfig.downloading')} {recommendedModel.downloadProgress ?? 0}%
                </>
              ) : (
                <>
                  <LuDownload size={16} />
                  {t('aiConfig.downloadRecommended')}
                </>
              )}
            </button>
          </div>
        )}

        <div className="model-library-list">
          {/* Base Models with Quantization Options */}
          {BASE_MODELS.map((baseModel, baseIndex) => {
            const variants = modelsByBase.get(baseIndex) || [];
            const isExpanded = expandedModelIndex === baseIndex;
            const hasDownloaded = variants.some(v => v.isDownloaded);
            const hasSelected = variants.some(v => v.id === selectedModelId);
            const downloadedCount = variants.filter(v => v.isDownloaded).length;

            return (
              <div key={baseIndex} className="model-base-group">
                {/* Base Model Header */}
                <div
                  className={`model-base-header ${isExpanded ? 'expanded' : ''} ${hasSelected ? 'has-selected' : ''}`}
                  onClick={() => handleToggleExpand(baseIndex)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="model-base-expand">
                    {isExpanded ? <LuChevronDown size={16} /> : <LuChevronRight size={16} />}
                  </div>
                  <div className="model-base-info">
                    <div className="model-base-name">
                      {baseModel.displayName}
                      {baseModel.recommended && (
                        <span className="model-recommended-badge">{t('aiConfig.recommended')}</span>
                      )}
                    </div>
                    <div className="model-base-meta">
                      <span className="model-base-desc">{baseModel.description}</span>
                      {hasDownloaded && (
                        <span className="model-base-downloaded">
                          {downloadedCount}/{variants.length} {t('aiConfig.downloaded')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quantization Variants */}
                {isExpanded && (
                  <div className="model-variants-list">
                    {QUANTIZATION_OPTIONS.map(quantOption => {
                      const variant = variants.find(
                        v => v.quantization === quantOption.quantization
                      );
                      if (!variant) return null;

                      return (
                        <div
                          key={variant.id}
                          className={`model-variant-item ${variant.isDownloaded ? 'downloaded' : ''} ${
                            selectedModelId === variant.id ? 'selected' : ''
                          }`}
                          onClick={() => variant.isDownloaded && handleSelect(variant.id)}
                          role={variant.isDownloaded ? 'button' : undefined}
                          tabIndex={variant.isDownloaded ? 0 : undefined}
                        >
                          <div className="model-variant-info">
                            <div className="model-variant-name">
                              {quantOption.label}
                              {selectedModelId === variant.id && (
                                <span className="model-active-badge">
                                  <LuCheck size={12} /> {t('aiConfig.active')}
                                </span>
                              )}
                            </div>
                            <div className="model-variant-meta">
                              <span className="model-variant-desc">{quantOption.description}</span>
                              <span className="model-variant-size">{quantOption.size}</span>
                            </div>
                          </div>

                          <div className="model-library-actions">
                            {variant.isDownloading ? (
                              <div className="model-download-progress">
                                <LuLoader className="spinning" size={16} />
                                <span>{variant.downloadProgress ?? 0}%</span>
                              </div>
                            ) : variant.isDownloaded ? (
                              <button
                                className="model-action-btn danger"
                                onClick={e => {
                                  e.stopPropagation();
                                  handleDelete(variant.id);
                                }}
                                title={t('aiConfig.deleteModel')}
                              >
                                <LuTrash2 size={16} />
                              </button>
                            ) : (
                              <button
                                className="model-action-btn primary"
                                onClick={e => {
                                  e.stopPropagation();
                                  handleDownload(variant.id);
                                }}
                                disabled={isAnyDownloading}
                                title={t('aiConfig.downloadModel')}
                              >
                                <LuDownload size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* User-uploaded Models */}
          {userModels.length > 0 && (
            <div className="model-base-group user-models">
              <div className="model-base-header user-models-header">
                <div className="model-base-info">
                  <div className="model-base-name">{t('aiConfig.customModels')}</div>
                </div>
              </div>
              <div className="model-variants-list">
                {userModels.map(model => (
                  <div
                    key={model.id}
                    className={`model-variant-item ${model.isDownloaded ? 'downloaded' : ''} ${
                      selectedModelId === model.id ? 'selected' : ''
                    }`}
                    onClick={() => model.isDownloaded && handleSelect(model.id)}
                    role={model.isDownloaded ? 'button' : undefined}
                    tabIndex={model.isDownloaded ? 0 : undefined}
                  >
                    <div className="model-variant-info">
                      <div className="model-variant-name">
                        {model.name}
                        {selectedModelId === model.id && (
                          <span className="model-active-badge">
                            <LuCheck size={12} /> {t('aiConfig.active')}
                          </span>
                        )}
                      </div>
                      <div className="model-variant-meta">
                        <span className="model-variant-desc">{model.description}</span>
                        {model.size && (
                          <span className="model-variant-size">
                            {(model.size / 1024 / 1024).toFixed(1)} MB
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="model-library-actions">
                      <button
                        className="model-action-btn danger"
                        onClick={e => {
                          e.stopPropagation();
                          handleDelete(model.id);
                        }}
                        title={t('aiConfig.deleteModel')}
                      >
                        <LuTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Upload Button */}
        <div className="model-upload-section">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".onnx,.bin"
            style={{ display: 'none' }}
          />
          <button
            className="model-upload-btn"
            onClick={() => fileInputRef.current?.click()}
            disabled={isAnyDownloading}
          >
            <LuUpload size={16} /> {t('aiConfig.uploadCustomModel')}
          </button>
          <p className="model-upload-description">
            {t('aiConfig.uploadCustomModelDescription')}{' '}
            <a
              href="https://github.com/kaya-go/katago-onnx"
              target="_blank"
              rel="noopener noreferrer"
            >
              kaya-go/katago-onnx
            </a>
          </p>
        </div>
      </section>

      {/* Settings Section */}
      <section className="kaya-config-section">
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

          {/* Save Analysis to SGF - Full width toggle */}
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

  // Game Tab Content
  const renderGameTab = () => (
    <section className="kaya-config-section">
      <div className="section-header">
        <LuGamepad2 className="section-icon" />
        <h3>{t('kayaConfig.boardSettings')}</h3>
      </div>

      <div className="settings-list">
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

  // Theme Tab Content
  const renderThemeTab = () => {
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
        </div>

        <div className="kaya-config-content">
          <div className="kaya-config-container">
            {activeTab === 'analysis' && renderAnalysisTab()}
            {activeTab === 'game' && renderGameTab()}
            {activeTab === 'theme' && renderThemeTab()}
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
