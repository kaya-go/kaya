import React, { useCallback, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { LuCamera, LuUpload, LuRotateCcw, LuExternalLink, LuTriangleAlert } from 'react-icons/lu';
import { useGameTree } from '../../contexts/GameTreeContext';
import { useToast } from '../ui/Toast';
import { saveMokuCustomModel, deleteMokuCustomModel } from '../../services/mokuModelStorage';
import { destroySharedWorker } from '../../workers/BoardRecognitionWorker';
import './KayaConfigDetectionTab.css';

const MOKU_MODEL_URL = 'https://huggingface.co/kaya-go/moku-v3';

export const KayaConfigDetectionTab: React.FC = () => {
  const { t } = useTranslation();
  const { gameSettings, setGameSettings } = useGameTree();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const isCustom = gameSettings.detectionModelSource === 'custom';

  const handleUpload = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      setUploading(true);
      try {
        const buffer = await file.arrayBuffer();
        await saveMokuCustomModel(buffer);
        setGameSettings({
          detectionModelSource: 'custom',
          customDetectionModelName: file.name,
        });
        // Kill existing worker so next dialog open uses the new model
        destroySharedWorker();
        showToast(t('detectionConfig.modelUploadedSuccess'), 'success');
      } catch {
        showToast(t('detectionConfig.modelUploadFailed'), 'error');
      } finally {
        setUploading(false);
        event.target.value = '';
      }
    },
    [setGameSettings, showToast, t]
  );

  const handleReset = useCallback(async () => {
    try {
      await deleteMokuCustomModel();
      setGameSettings({
        detectionModelSource: 'default',
        customDetectionModelName: undefined,
      });
      destroySharedWorker();
      showToast(t('detectionConfig.resetSuccess'), 'success');
    } catch {
      showToast(t('detectionConfig.modelUploadFailed'), 'error');
    }
  }, [setGameSettings, showToast, t]);

  return (
    <div className="detection-tab">
      {/* Current Model Status */}
      <section className="kaya-config-section">
        <div className="section-header">
          <LuCamera className="section-icon" />
          <h3>{t('detectionConfig.currentModel')}</h3>
        </div>

        <div className="detection-model-card">
          <div className="detection-model-info">
            <span className={`detection-model-badge ${isCustom ? 'custom' : 'default'}`}>
              {isCustom
                ? t('detectionConfig.customModelActive')
                : t('detectionConfig.defaultModelName')}
            </span>
            {isCustom && gameSettings.customDetectionModelName && (
              <span className="detection-model-filename">
                {gameSettings.customDetectionModelName}
              </span>
            )}
            {!isCustom && (
              <p className="detection-model-description">
                {t('detectionConfig.defaultModelDescription')}
              </p>
            )}
          </div>
          {!isCustom && (
            <a
              className="detection-model-link"
              href={MOKU_MODEL_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              kaya-go/moku-v3 <LuExternalLink size={12} />
            </a>
          )}
        </div>
      </section>

      {/* Advanced: Custom Model */}
      <section className="kaya-config-section detection-advanced-section">
        <div className="section-header">
          <LuUpload className="section-icon" />
          <h3>{t('detectionConfig.advancedSection')}</h3>
        </div>

        <p className="detection-advanced-description">{t('detectionConfig.advancedDescription')}</p>

        <div className="detection-compatibility-note">
          <LuTriangleAlert size={14} className="detection-warning-icon" />
          <div>
            <strong>{t('detectionConfig.compatibilityWarning')}</strong>
            <p>
              {t('detectionConfig.compatibilityDetails')}{' '}
              <a href={MOKU_MODEL_URL} target="_blank" rel="noopener noreferrer">
                {MOKU_MODEL_URL}
              </a>
            </p>
          </div>
        </div>

        <div className="detection-actions">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            accept=".onnx"
            style={{ display: 'none' }}
          />
          <button
            className="detection-upload-btn"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            <LuUpload size={16} />
            {uploading ? '…' : t('detectionConfig.uploadModel')}
          </button>
          <span className="detection-upload-hint">{t('detectionConfig.uploadHint')}</span>

          {isCustom && (
            <button className="detection-reset-btn" onClick={handleReset}>
              <LuRotateCcw size={14} />
              {t('detectionConfig.resetToDefault')}
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
