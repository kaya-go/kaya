import React from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { LuX } from 'react-icons/lu';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';
import './AnalysisLegendModal.css';

interface AnalysisLegendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalysisLegendModal: React.FC<AnalysisLegendModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  useCloseOnBack(isOpen, onClose);

  if (!isOpen) return null;

  const legendItems = [
    { color: '#17dea3', labelKey: 'analysisLegend.best', probKey: 'analysisLegend.bestProb' },
    { color: '#4998fe', labelKey: 'analysisLegend.great', probKey: 'analysisLegend.greatProb' },
    { color: '#6ed543', labelKey: 'analysisLegend.good', probKey: 'analysisLegend.goodProb' },
    { color: '#f1ad24', labelKey: 'analysisLegend.okay', probKey: 'analysisLegend.okayProb' },
    { color: '#fa412d', labelKey: 'analysisLegend.poor', probKey: 'analysisLegend.poorProb' },
  ];

  return createPortal(
    <div className="move-strength-info-overlay" onClick={onClose}>
      <div className="move-strength-info-modal" onClick={e => e.stopPropagation()}>
        <div className="move-strength-info-header">
          <h3>{t('analysisLegend.title')}</h3>
          <button className="move-strength-info-close" onClick={onClose}>
            <LuX size={18} />
          </button>
        </div>
        <div className="move-strength-info-content">
          <p
            className="move-strength-info-description"
            dangerouslySetInnerHTML={{ __html: t('analysisLegend.policyDescription') }}
          />

          <div className="move-strength-legend">
            {legendItems.map(item => (
              <div key={item.labelKey} className="move-strength-item">
                <div className="move-strength-swatch" style={{ background: item.color }} />
                <div className="move-strength-text">
                  <strong>{t(item.labelKey)}</strong>
                  <span>{t(item.probKey)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="move-strength-info-note">{t('analysisLegend.note')}</div>

          <div className="heatmap-legend">
            <h4>{t('analysisLegend.heatmapOwnership')}</h4>
            <p>{t('analysisLegend.heatmapDescription')}</p>
            <div className="heatmap-legend-items">
              <div className="heatmap-legend-item">
                <div className="heatmap-swatch black-area" />
                <span>{t('analysisLegend.blackArea')}</span>
              </div>
              <div className="heatmap-legend-item">
                <div className="heatmap-swatch white-area" />
                <span>{t('analysisLegend.whiteArea')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
