/**
 * Analysis Panel with Tabs
 *
 * Container component that provides tabbed navigation between
 * the analysis graph and performance report views.
 */

import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';
import { LuChartLine, LuChartBar, LuInfo, LuX } from 'react-icons/lu';
import { AnalysisGraphPanel } from './AnalysisGraphPanel';
import { PerformanceReportTab, getCategoryColor } from './PerformanceReportTab';
import './AnalysisPanel.css';

export type AnalysisPanelTab = 'graph' | 'report';

export interface AnalysisPanelProps {
  className?: string;
  defaultTab?: AnalysisPanelTab;
}

/**
 * Tabbed analysis panel containing graph and report views
 */
export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({
  className = '',
  defaultTab = 'graph',
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<AnalysisPanelTab>(defaultTab);
  const [showHelp, setShowHelp] = useState(false);
  useCloseOnBack(showHelp, () => setShowHelp(false));

  const handleTabChange = useCallback((tab: AnalysisPanelTab) => {
    setActiveTab(tab);
  }, []);

  return (
    <div className={`analysis-panel ${className}`}>
      <div className="analysis-panel-tabs">
        <button
          className={`analysis-panel-tab ${activeTab === 'graph' ? 'active' : ''}`}
          onClick={() => handleTabChange('graph')}
          title={t('analysisPanel.graphTab')}
          aria-selected={activeTab === 'graph'}
          role="tab"
          tabIndex={-1}
        >
          <LuChartLine size={14} />
          <span>{t('analysisPanel.graphTab')}</span>
        </button>
        <button
          className={`analysis-panel-tab ${activeTab === 'report' ? 'active' : ''}`}
          onClick={() => handleTabChange('report')}
          title={t('analysisPanel.reportTab')}
          aria-selected={activeTab === 'report'}
          role="tab"
          tabIndex={-1}
        >
          <LuChartBar size={14} />
          <span>{t('analysisPanel.reportTab')}</span>
        </button>
        {activeTab === 'report' && (
          <button
            className="analysis-panel-help-button"
            onClick={() => setShowHelp(true)}
            title={t('performanceReport.help.title')}
            tabIndex={-1}
          >
            <LuInfo size={14} />
          </button>
        )}
      </div>

      <div className="analysis-panel-content" role="tabpanel">
        {activeTab === 'graph' && <AnalysisGraphPanel />}
        {activeTab === 'report' && <PerformanceReportTab />}
      </div>

      {/* Help Modal - rendered via portal to document body */}
      {showHelp &&
        createPortal(
          <div className="performance-report-help-overlay" onClick={() => setShowHelp(false)}>
            <div className="performance-report-help-modal" onClick={e => e.stopPropagation()}>
              <div className="help-modal-header">
                <h3>{t('performanceReport.help.title')}</h3>
                <button className="help-modal-close" onClick={() => setShowHelp(false)}>
                  <LuX size={20} />
                </button>
              </div>
              <div className="help-modal-content">
                <section className="help-section">
                  <h4>{t('performanceReport.help.accuracyTitle')}</h4>
                  <p>{t('performanceReport.help.accuracyDesc')}</p>
                </section>
                <section className="help-section">
                  <h4>{t('performanceReport.help.top5Title')}</h4>
                  <p>{t('performanceReport.help.top5Desc')}</p>
                </section>
                <section className="help-section">
                  <h4>{t('performanceReport.help.distributionTitle')}</h4>
                  <p>{t('performanceReport.help.distributionDesc')}</p>
                  <ul className="help-category-list">
                    <li>
                      <span style={{ color: getCategoryColor('aiMove') }}>
                        {t('performanceReport.aiMove')}
                      </span>
                      : {t('performanceReport.help.aiMoveDesc')}
                    </li>
                    <li>
                      <span style={{ color: getCategoryColor('good') }}>
                        {t('performanceReport.good')}
                      </span>
                      : {t('performanceReport.help.goodDesc')}
                    </li>
                    <li>
                      <span style={{ color: getCategoryColor('inaccuracy') }}>
                        {t('performanceReport.inaccuracy')}
                      </span>
                      : {t('performanceReport.help.inaccuracyDesc')}
                    </li>
                    <li>
                      <span style={{ color: getCategoryColor('mistake') }}>
                        {t('performanceReport.mistake')}
                      </span>
                      : {t('performanceReport.help.mistakeDesc')}
                    </li>
                    <li>
                      <span style={{ color: getCategoryColor('blunder') }}>
                        {t('performanceReport.blunder')}
                      </span>
                      : {t('performanceReport.help.blunderDesc')}
                    </li>
                  </ul>
                </section>
                <section className="help-section">
                  <h4>{t('performanceReport.help.keyMistakesTitle')}</h4>
                  <p>{t('performanceReport.help.keyMistakesDesc')}</p>
                </section>
                <section className="help-section">
                  <h4>{t('performanceReport.help.phasesTitle')}</h4>
                  <p>{t('performanceReport.help.phasesDesc')}</p>
                </section>
                <section className="help-section help-note">
                  <p>{t('performanceReport.help.note')}</p>
                </section>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
