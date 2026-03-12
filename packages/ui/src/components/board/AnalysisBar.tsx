/**
 * AnalysisBar - AI analysis summary bar
 *
 * Displays win rate, score lead, and analysis controls.
 * Self-contained: calls its own hooks for AI analysis state.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  LuMap,
  LuLayers,
  LuZap,
  LuSquare,
  LuTrash2,
  LuInfo,
  LuSearch,
  LuChartBar,
} from 'react-icons/lu';
import { useKeyboardShortcuts } from '../../contexts/KeyboardShortcutsContext';
import { useGameTreeAI } from '../../contexts/selectors';
import { useAIAnalysis } from '../ai/AIAnalysisOverlay';

const VISITS_PRESETS = [1, 4, 10, 32, 64, 128, 256, 400];

interface AnalysisBarProps {
  onShowLegend: () => void;
}

export const AnalysisBar: React.FC<AnalysisBarProps> = ({ onShowLegend }) => {
  const { t } = useTranslation();
  const { bindingToDisplayString, getBinding } = useKeyboardShortcuts();
  const { showAnalysisBar, setAISettings, aiSettings } = useGameTreeAI();

  const {
    showOwnership,
    toggleOwnership,
    showTopMoves,
    toggleTopMoves,
    isInitializing,
    isAnalyzing,
    error: analysisError,
    analysisResult,
    analyzeFullGame,
    stopFullGameAnalysis,
    isFullGameAnalyzing,
    isStopping,
    fullGameProgress,
    fullGameCurrentMove,
    fullGameTotalMoves,
    fullGameETA,
    allAnalyzedMessage,
    analysisCacheSize,
    clearAnalysisCache,
    pendingFullGameAnalysis,
    nativeUploadProgress,
    configuredNumVisits,
    mctsProgress,
    nextMoveInfo,
  } = useAIAnalysis();

  const formatWinRate = (value?: number | null) => {
    if (value === null || value === undefined) return '—';
    return `${(value * 100).toFixed(1)}%`;
  };

  const formatScoreLead = (value?: number | null) => {
    if (value === null || value === undefined) return '—';
    return value.toFixed(1);
  };

  if (!showAnalysisBar && !isFullGameAnalyzing) return null;

  // During multi-visit MCTS, show live-updating metrics from progress
  const showLiveProgress = mctsProgress !== null;
  const displayWinRate = showLiveProgress ? mctsProgress.winRate : analysisResult?.winRate;
  const displayScoreLead = showLiveProgress ? mctsProgress.scoreLead : analysisResult?.scoreLead;
  const hasMetrics = showLiveProgress || analysisResult != null;

  return (
    <div className="ai-analysis-summary">
      {analysisError ? (
        <div className="ai-analysis-summary__error">
          <span>⚠️</span> {analysisError}
        </div>
      ) : (
        <div
          className="ai-analysis-summary__container"
          style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <div className="ai-analysis-summary__content">
            <div className="ai-analysis-summary__metrics-group">
              {/* Loading/Analyzing indicator - always reserves space to prevent layout shift */}
              <div
                className="ai-analysis-summary__loading-indicator"
                style={{
                  visibility: isInitializing || isAnalyzing ? 'visible' : 'hidden',
                }}
              >
                <span className="ai-analysis-summary__spinner">⟳</span>
                <span className="ai-analysis-summary__loading-text">
                  {isInitializing
                    ? nativeUploadProgress
                      ? nativeUploadProgress.stage === 'uploading'
                        ? t('analysisBar.uploadingModel', {
                            progress: nativeUploadProgress.progress,
                          })
                        : nativeUploadProgress.stage === 'checking-cache'
                          ? t('analysisBar.checkingCache')
                          : t('analysisBar.initializing')
                      : t('analysisBar.loading')
                    : t('analysisBar.analyzing')}
                </span>
              </div>
              <div
                className={`ai-analysis-summary__metric${showLiveProgress ? ' ai-analysis-summary__metric--in-progress' : ''}`}
                style={{ minWidth: '90px' }}
              >
                <span className="ai-analysis-summary__metric-value">
                  {formatWinRate(displayWinRate)}
                </span>
                <span className="ai-analysis-summary__metric-label">
                  {t('analysisBar.blackWinRate')}
                </span>
              </div>

              <div className="ai-analysis-summary__separator" />

              <div
                className={`ai-analysis-summary__metric${showLiveProgress ? ' ai-analysis-summary__metric--in-progress' : ''}`}
                style={{ minWidth: '70px' }}
              >
                <span className="ai-analysis-summary__metric-value">
                  {hasMetrics ? (
                    <>
                      {(displayScoreLead ?? 0) >= 0 ? 'B+' : 'W+'}
                      {formatScoreLead(Math.abs(displayScoreLead ?? 0))}
                    </>
                  ) : (
                    '—'
                  )}
                </span>
                <span className="ai-analysis-summary__metric-label">
                  {t('analysisBar.scoreLead')}
                </span>
              </div>

              {nextMoveInfo && nextMoveInfo.deltaScoreLead != null && (
                <>
                  <div className="ai-analysis-summary__separator" />
                  <div className="ai-analysis-summary__metric" style={{ minWidth: '80px' }}>
                    <span
                      className="ai-analysis-summary__metric-value"
                      style={{
                        color:
                          nextMoveInfo.rank === 0
                            ? 'var(--analysis-best-color, #4caf50)'
                            : Math.abs(nextMoveInfo.deltaScoreLead) < 0.5
                              ? 'var(--analysis-good-color, #8bc34a)'
                              : Math.abs(nextMoveInfo.deltaScoreLead) < 2
                                ? 'var(--analysis-ok-color, #ff9800)'
                                : 'var(--analysis-bad-color, #f44336)',
                      }}
                    >
                      {nextMoveInfo.rank === 0
                        ? t('analysisBar.bestMove')
                        : `${nextMoveInfo.deltaScoreLead >= 0 ? '+' : ''}${nextMoveInfo.deltaScoreLead.toFixed(1)}`}
                    </span>
                    <span className="ai-analysis-summary__metric-label">
                      {nextMoveInfo.gtp} {nextMoveInfo.rank >= 0 ? `#${nextMoveInfo.rank + 1}` : ''}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="ai-analysis-summary__actions">
              <button
                className={`gameboard-action-button gameboard-metric-button ${aiSettings.heatMapMetric !== 'policy' ? 'active' : ''}`}
                title={t('analysisBar.metricTooltip')}
                onClick={() => {
                  const modes: Array<'policy' | 'winRate' | 'scoreLead'> = [
                    'policy',
                    'winRate',
                    'scoreLead',
                  ];
                  const idx = modes.indexOf(aiSettings.heatMapMetric ?? 'policy');
                  const next = modes[(idx + 1) % modes.length];
                  setAISettings({ heatMapMetric: next });
                }}
                disabled={isInitializing}
              >
                <LuChartBar />
                <span className="gameboard-metric-button__label">
                  {t(`analysisBar.metric_${aiSettings.heatMapMetric ?? 'policy'}`)}
                </span>
              </button>
              <button
                className={`gameboard-action-button gameboard-visits-button ${configuredNumVisits > 1 ? 'active' : ''}`}
                title={t('analysisBar.visitsTooltip', { count: configuredNumVisits })}
                onClick={() => {
                  const idx = VISITS_PRESETS.indexOf(configuredNumVisits);
                  const next = VISITS_PRESETS[(idx + 1) % VISITS_PRESETS.length];
                  setAISettings({ numVisits: next });
                }}
                onDoubleClick={() => {
                  setAISettings({ numVisits: 1 });
                }}
                disabled={isInitializing}
              >
                <LuSearch />
                <span className="gameboard-visits-button__label">
                  {mctsProgress
                    ? `${mctsProgress.completedVisits}/${mctsProgress.totalVisits}`
                    : configuredNumVisits}
                </span>
              </button>
              <button
                className={`gameboard-action-button gameboard-heatmap-button ${showOwnership ? 'active' : ''}`}
                title={`${t('analysis.toggleOwnership')} (${bindingToDisplayString(getBinding('ai.toggleOwnership'))})`}
                onClick={toggleOwnership}
                disabled={isInitializing}
              >
                <LuMap />
              </button>
              <button
                className={`gameboard-action-button gameboard-topmoves-button ${showTopMoves ? 'active' : ''}`}
                title={`${t('analysis.toggleTopMoves')} (${bindingToDisplayString(getBinding('ai.toggleTopMoves'))})`}
                onClick={toggleTopMoves}
                disabled={isInitializing}
              >
                <LuLayers />
              </button>
              <button
                className={`gameboard-action-button ${isFullGameAnalyzing ? 'active analyzing' : ''}`}
                title={
                  isFullGameAnalyzing
                    ? t('analysis.stopAnalysis')
                    : pendingFullGameAnalysis
                      ? t('analysis.waitingForEngine')
                      : t('analysisBar.analyzeFullGameLong')
                }
                onClick={isFullGameAnalyzing ? stopFullGameAnalysis : analyzeFullGame}
                disabled={isInitializing || isStopping || pendingFullGameAnalysis}
              >
                {isFullGameAnalyzing ? <LuSquare /> : <LuZap />}
              </button>
              <button
                className="gameboard-action-button gameboard-clear-cache-button"
                title={
                  analysisCacheSize > 0
                    ? t('analysis.clearCacheWithCount', { count: analysisCacheSize })
                    : t('analysis.noCachedAnalysis')
                }
                onClick={clearAnalysisCache}
                disabled={analysisCacheSize === 0 || isFullGameAnalyzing}
              >
                <LuTrash2 />
              </button>
              <button
                className="gameboard-action-button"
                title={t('analysis.analysisLegend')}
                onClick={onShowLegend}
              >
                <LuInfo />
              </button>
            </div>
          </div>
          <div className="ai-analysis-summary__progress-row">
            <span
              className={`ai-analysis-summary__progress ${allAnalyzedMessage ? 'ai-analysis-summary__progress--success' : ''}`}
              style={{
                opacity: isFullGameAnalyzing || allAnalyzedMessage ? 1 : 0,
                display: isFullGameAnalyzing || allAnalyzedMessage ? 'block' : 'none',
              }}
            >
              {isStopping
                ? t('analysis.stopping')
                : allAnalyzedMessage
                  ? `✓ ${allAnalyzedMessage}`
                  : isFullGameAnalyzing
                    ? `${fullGameCurrentMove}/${fullGameTotalMoves} (${fullGameProgress}%)${fullGameETA ? ` • ETA: ${fullGameETA}` : ''}`
                    : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
