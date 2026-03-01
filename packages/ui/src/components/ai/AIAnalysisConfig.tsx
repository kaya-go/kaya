import React, { useEffect, useState, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { LuX, LuBrain, LuCpu } from 'react-icons/lu';
import { useGameTree } from '../../contexts/GameTreeContext';
import { useToast } from '../ui/Toast';
import { BASE_MODELS, parseModelId, getModelId } from '../../hooks/game/useAIAnalysis';
import { AIAnalysisConfigModelsPanel } from './AIAnalysisConfigModelsPanel';
import { AIAnalysisConfigSettingsPanel } from './AIAnalysisConfigSettingsPanel';
import './AIAnalysisConfig.css';
import './AIAnalysisConfigModels.css';
import './AIAnalysisConfigModelItems.css';
import './AIAnalysisConfigBanner.css';
import './AIAnalysisConfigSettings.css';

export const AIAnalysisConfig: React.FC = () => {
  const { t } = useTranslation();
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [expandedModelIndex, setExpandedModelIndex] = useState<number | null>(null);
  const {
    aiSettings,
    setAISettings,
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

  const isAnyDownloading = modelLibrary.some(m => m.isDownloading);
  const hasAnyDownloaded = modelLibrary.some(m => m.isDownloaded);

  const recommendedModelId = useMemo(() => {
    const recommendedBase = BASE_MODELS.findIndex(m => m.recommended);
    if (recommendedBase >= 0) {
      return getModelId(recommendedBase, 'fp16');
    }
    return null;
  }, []);

  const recommendedModel = useMemo(() => {
    if (!recommendedModelId) return null;
    return modelLibrary.find(m => m.id === recommendedModelId) || null;
  }, [recommendedModelId, modelLibrary]);

  const handleDownloadRecommended = async () => {
    if (recommendedModelId) {
      try {
        await downloadModel(recommendedModelId);
      } catch (err) {
        showToast(t('aiConfig.modelDownloadFailed'), 'error');
      }
    }
  };

  const modalContent = (
    <div
      className="ai-info-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Analysis configuration"
      onClick={closeModal}
    >
      <div
        className="ai-info-modal"
        onClick={event => event.stopPropagation()}
        onPointerDown={event => event.stopPropagation()}
        onWheel={event => event.stopPropagation()}
        onTouchMove={event => event.stopPropagation()}
      >
        <div className="ai-info-header">
          <div className="ai-info-title">
            <LuBrain className="ai-info-icon-main" />
            <h2>{t('aiConfig.title')}</h2>
          </div>
          <button
            className="ai-info-close"
            onClick={closeModal}
            aria-label="Close analysis config dialog"
          >
            <LuX />
          </button>
        </div>

        <div className="ai-info-content">
          <div className="ai-config-container">
            <AIAnalysisConfigModelsPanel
              modelsByBase={modelsByBase}
              userModels={userModels}
              expandedModelIndex={expandedModelIndex}
              onToggleExpand={handleToggleExpand}
              selectedModelId={selectedModelId}
              onSelect={handleSelect}
              onDownload={handleDownload}
              onDelete={handleDelete}
              isAnyDownloading={isAnyDownloading}
              hasAnyDownloaded={hasAnyDownloaded}
              recommendedModel={recommendedModel}
              onDownloadRecommended={handleDownloadRecommended}
              fileInputRef={fileInputRef}
              onFileSelect={handleFileSelect}
            />

            <AIAnalysisConfigSettingsPanel aiSettings={aiSettings} setAISettings={setAISettings} />

            {/* KataGo Attribution Footer */}
            <div className="ai-config-footer">
              {t('aiConfig.poweredBy')}{' '}
              <a
                href="https://github.com/lightvector/KataGo"
                target="_blank"
                rel="noopener noreferrer"
              >
                KataGo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        className="ai-info-trigger"
        onClick={() => setAIConfigOpen(true)}
        title={t('aiConfig.title')}
        aria-label={t('aiConfig.title')}
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
