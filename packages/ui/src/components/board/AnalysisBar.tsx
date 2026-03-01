/**
 * AnalysisBar - AI analysis summary bar
 *
 * Displays win rate, score lead, and analysis controls.
 * Self-contained: calls its own hooks for AI analysis state.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { LuMap, LuLayers, LuZap, LuSquare, LuTrash2, LuInfo } from 'react-icons/lu';
import { useKeyboardShortcuts } from '../../contexts/KeyboardShortcutsContext';
import { useGameTreeAI } from '../../contexts/selectors';
import { useAIAnalysis } from '../ai/AIAnalysisOverlay';

interface AnalysisBarProps {
  onShowLegend: () => void;
}

export const AnalysisBar: React.FC<AnalysisBarProps> = ({ onShowLegend }) => {
  const { t } = useTranslation();
  const { bindingToDisplayString, getBinding } = useKeyboardShortcuts();
  const { showAnalysisBar } = useGameTreeAI();

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
    backendFallbackMessage,
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
              <div className="ai-analysis-summary__metric" style={{ minWidth: '90px' }}>
                <span className="ai-analysis-summary__metric-value">
                  {formatWinRate(analysisResult?.winRate)}
                </span>
                <span className="ai-analysis-summary__metric-label">
                  {t('analysisBar.blackWinRate')}
                </span>
              </div>

              <div className="ai-analysis-summary__separator" />

              <div className="ai-analysis-summary__metric" style={{ minWidth: '70px' }}>
                <span className="ai-analysis-summary__metric-value">
                  {analysisResult ? (
                    <>
                      {analysisResult.scoreLead >= 0 ? 'B+' : 'W+'}
                      {formatScoreLead(Math.abs(analysisResult.scoreLead))}
                    </>
                  ) : (
                    '—'
                  )}
                </span>
                <span className="ai-analysis-summary__metric-label">
                  {t('analysisBar.scoreLead')}
                </span>
              </div>
            </div>

            <div className="ai-analysis-summary__actions">
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
            {backendFallbackMessage && (
              <span
                className="ai-analysis-summary__progress ai-analysis-summary__progress--warning"
                style={{ display: 'block', opacity: 1 }}
              >
                ⚠️ {backendFallbackMessage}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
