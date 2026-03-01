import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  LuBrain,
  LuTrash2,
  LuUpload,
  LuDownload,
  LuCheck,
  LuLoader,
  LuChevronDown,
  LuChevronRight,
} from 'react-icons/lu';
import type { AIModelEntry } from '../../types/game';
import { BASE_MODELS, QUANTIZATION_OPTIONS } from '../../hooks/game/useAIAnalysis';

export interface AIAnalysisConfigModelsPanelProps {
  modelsByBase: Map<number, AIModelEntry[]>;
  userModels: AIModelEntry[];
  expandedModelIndex: number | null;
  onToggleExpand: (baseIndex: number) => void;
  selectedModelId: string | null;
  onSelect: (id: string) => void;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
  isAnyDownloading: boolean;
  hasAnyDownloaded: boolean;
  recommendedModel: AIModelEntry | null;
  onDownloadRecommended: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AIAnalysisConfigModelsPanel: React.FC<AIAnalysisConfigModelsPanelProps> = ({
  modelsByBase,
  userModels,
  expandedModelIndex,
  onToggleExpand,
  selectedModelId,
  onSelect,
  onDownload,
  onDelete,
  isAnyDownloading,
  hasAnyDownloaded,
  recommendedModel,
  onDownloadRecommended,
  fileInputRef,
  onFileSelect,
}) => {
  const { t } = useTranslation();

  return (
    <section className="ai-config-section">
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
            onClick={onDownloadRecommended}
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
          const hasSelected = variants.some(v => v.id === selectedModelId);
          const hasDownloaded = variants.some(v => v.isDownloaded);
          const downloadedCount = variants.filter(v => v.isDownloaded).length;

          return (
            <div key={baseIndex} className="model-base-group">
              {/* Base Model Header */}
              <div
                className={`model-base-header ${isExpanded ? 'expanded' : ''} ${hasSelected ? 'has-selected' : ''}`}
                onClick={() => onToggleExpand(baseIndex)}
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
                    const variant = variants.find(v => v.quantization === quantOption.quantization);
                    if (!variant) return null;

                    return (
                      <div
                        key={variant.id}
                        className={`model-variant-item ${variant.isDownloaded ? 'downloaded' : ''} ${
                          selectedModelId === variant.id ? 'selected' : ''
                        }`}
                        onClick={() => variant.isDownloaded && onSelect(variant.id)}
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
                                onDelete(variant.id);
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
                                onDownload(variant.id);
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
                  onClick={() => model.isDownloaded && onSelect(model.id)}
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
                        onDelete(model.id);
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
          onChange={onFileSelect}
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
  );
};
