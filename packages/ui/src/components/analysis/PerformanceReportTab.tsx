/**
 * Performance Report Tab
 *
 * Displays game performance analysis with accuracy metrics,
 * move distribution, and key mistakes.
 */

import React, { useMemo, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { LuInfo, LuLoader } from 'react-icons/lu';
import { useGameTree } from '../../contexts/GameTreeContext';
import { useAIAnalysis } from '../ai/AIAnalysisOverlay';
import { type GamePhase, type MistakeInfo, DEFAULT_PHASE_THRESHOLDS } from '@kaya/ai-engine';
import { DistributionBars, getCategoryColor } from './PerformanceReportDistribution';
import { buildPerformanceReport } from './performanceReportUtils';
import './PerformanceReportTab.css';
import './PerformanceReportDistribution.css';
import './PerformanceReportHelpModal.css';

// Re-export for external consumers
export { getCategoryColor } from './PerformanceReportDistribution';

type PhaseFilter = 'entireGame' | GamePhase;

/**
 * Performance Report Tab Component
 */
export const PerformanceReportTab: React.FC = () => {
  const { t } = useTranslation();
  const { gameTree, currentNodeId, rootId, gameInfo, analysisCache, analysisCacheSize, navigate } =
    useGameTree();

  const { isFullGameAnalyzing, fullGameProgress, analyzeFullGame, isInitializing } =
    useAIAnalysis();

  const [phaseFilter, setPhaseFilter] = useState<PhaseFilter>('entireGame');

  // Generate the performance report from analysis cache
  const report = useMemo(() => {
    if (!gameTree || rootId === null || rootId === undefined) {
      return null;
    }
    return buildPerformanceReport(gameTree, rootId, currentNodeId, gameInfo, analysisCache, t);
  }, [gameTree, rootId, currentNodeId, gameInfo, analysisCache, analysisCacheSize, t]);

  // Get filtered stats based on phase
  const filteredStats = useMemo(() => {
    if (!report) return null;

    if (phaseFilter === 'entireGame') {
      return {
        black: report.black,
        white: report.white,
      };
    }

    // Get phase-specific stats
    const blackPhase = report.black.byPhase[phaseFilter];
    const whitePhase = report.white.byPhase[phaseFilter];

    if (!blackPhase && !whitePhase) {
      return null;
    }

    return {
      black: blackPhase,
      white: whitePhase,
    };
  }, [report, phaseFilter]);

  // Get filtered key mistakes based on phase
  const filteredKeyMistakes = useMemo(() => {
    if (!report) return [];

    if (phaseFilter === 'entireGame') {
      return report.keyMistakes;
    }

    // Get phase thresholds
    const boardSize = gameInfo.boardSize ?? 19;
    const thresholds = DEFAULT_PHASE_THRESHOLDS[boardSize] ?? DEFAULT_PHASE_THRESHOLDS[19];

    // Filter mistakes by phase based on move number
    return report.keyMistakes.filter(mistake => {
      const moveNum = mistake.moveNumber;
      switch (phaseFilter) {
        case 'opening':
          return moveNum <= thresholds.openingEnd;
        case 'middleGame':
          return moveNum > thresholds.openingEnd && moveNum <= thresholds.middleGameEnd;
        case 'endGame':
          return moveNum > thresholds.middleGameEnd;
        default:
          return true;
      }
    });
  }, [report, phaseFilter, gameInfo.boardSize]);

  // Handle clicking on a mistake to navigate
  const handleMistakeClick = useCallback(
    (nodeId: string | number) => {
      navigate(nodeId);
    },
    [navigate]
  );

  // Check if we have enough analysis data
  const hasAnalysisData = report && report.analyzedMoves > 0;
  const analysisPercentage = report
    ? Math.round((report.analyzedMoves / report.totalMoves) * 100)
    : 0;

  // Loading state
  if (isInitializing) {
    return (
      <div className="performance-report-tab">
        <div className="performance-report-placeholder">
          <LuLoader className="performance-report-spinner" />
          <p>{t('analysis.initializingEngine')}</p>
        </div>
      </div>
    );
  }

  // No data state
  if (!hasAnalysisData) {
    return (
      <div className="performance-report-tab">
        <div className="performance-report-placeholder">
          <LuInfo size={32} />
          <p>{t('performanceReport.noAnalysisData')}</p>
          <p className="performance-report-hint">{t('performanceReport.runAnalysisHint')}</p>
          {!isFullGameAnalyzing && (
            <button
              className="performance-report-analyze-button"
              onClick={analyzeFullGame}
              disabled={isInitializing}
            >
              {t('analysis.analyzeFullGame')}
            </button>
          )}
          {isFullGameAnalyzing && (
            <div className="performance-report-progress">
              <span>
                {t('analysis.analyzingProgress', { progress: Math.round(fullGameProgress) })}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="performance-report-tab">
      {/* Analysis status */}
      {!report.analysisComplete && (
        <div className="performance-report-status">
          <span>
            {t('performanceReport.partialAnalysis', {
              analyzed: report.analyzedMoves,
              total: report.totalMoves,
              percentage: analysisPercentage,
            })}
          </span>
        </div>
      )}

      {/* Phase filter tabs */}
      <div className="performance-report-phase-tabs">
        <button
          className={`phase-tab ${phaseFilter === 'entireGame' ? 'active' : ''}`}
          onClick={() => setPhaseFilter('entireGame')}
          tabIndex={-1}
        >
          {t('performanceReport.entireGame')}
        </button>
        <button
          className={`phase-tab ${phaseFilter === 'opening' ? 'active' : ''}`}
          onClick={() => setPhaseFilter('opening')}
          disabled={!report.black.byPhase.opening && !report.white.byPhase.opening}
          tabIndex={-1}
        >
          {t('performanceReport.opening')}
        </button>
        <button
          className={`phase-tab ${phaseFilter === 'middleGame' ? 'active' : ''}`}
          onClick={() => setPhaseFilter('middleGame')}
          disabled={!report.black.byPhase.middleGame && !report.white.byPhase.middleGame}
          tabIndex={-1}
        >
          {t('performanceReport.middleGame')}
        </button>
        <button
          className={`phase-tab ${phaseFilter === 'endGame' ? 'active' : ''}`}
          onClick={() => setPhaseFilter('endGame')}
          disabled={!report.black.byPhase.endGame && !report.white.byPhase.endGame}
          tabIndex={-1}
        >
          {t('performanceReport.endGame')}
        </button>
      </div>

      {/* Player comparison */}
      <div className="performance-report-comparison">
        {/* Black player */}
        <div className="player-stats player-black">
          <div className="player-header">
            <span className="player-stone black" />
            <span className="player-name">{report.blackPlayer}</span>
          </div>
          {filteredStats?.black && (
            <>
              <div className="stat-row">
                <span className="stat-label">{t('performanceReport.accuracy')}</span>
                <span className="stat-value accuracy-value">
                  {filteredStats.black.accuracy.toFixed(1)}%
                </span>
              </div>
              <div className="stat-row">
                <span className="stat-label">{t('performanceReport.top5Percent')}</span>
                <span className="stat-value">{filteredStats.black.top5Percentage.toFixed(1)}%</span>
              </div>
            </>
          )}
        </div>

        {/* White player */}
        <div className="player-stats player-white">
          <div className="player-header">
            <span className="player-stone white" />
            <span className="player-name">{report.whitePlayer}</span>
          </div>
          {filteredStats?.white && (
            <>
              <div className="stat-row">
                <span className="stat-label">{t('performanceReport.accuracy')}</span>
                <span className="stat-value accuracy-value">
                  {filteredStats.white.accuracy.toFixed(1)}%
                </span>
              </div>
              <div className="stat-row">
                <span className="stat-label">{t('performanceReport.top5Percent')}</span>
                <span className="stat-value">{filteredStats.white.top5Percentage.toFixed(1)}%</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Move distribution */}
      {filteredStats?.black?.distribution && filteredStats?.white?.distribution && (
        <div className="performance-report-distribution">
          <h4 className="distribution-title">{t('performanceReport.moveDistribution')}</h4>
          <div className="distribution-comparison">
            {/* Black distribution */}
            <div className="distribution-column">
              <DistributionBars distribution={filteredStats.black.distribution} align="right" />
            </div>
            {/* Labels */}
            <div className="distribution-labels">
              <div className="distribution-label" style={{ color: getCategoryColor('aiMove') }}>
                {t('performanceReport.aiMove')}
              </div>
              <div className="distribution-label" style={{ color: getCategoryColor('good') }}>
                {t('performanceReport.good')}
              </div>
              <div className="distribution-label" style={{ color: getCategoryColor('inaccuracy') }}>
                {t('performanceReport.inaccuracy')}
              </div>
              <div className="distribution-label" style={{ color: getCategoryColor('mistake') }}>
                {t('performanceReport.mistake')}
              </div>
              <div className="distribution-label" style={{ color: getCategoryColor('blunder') }}>
                {t('performanceReport.blunder')}
              </div>
            </div>
            {/* White distribution */}
            <div className="distribution-column">
              <DistributionBars distribution={filteredStats.white.distribution} align="left" />
            </div>
          </div>
        </div>
      )}

      {/* Key mistakes */}
      {filteredKeyMistakes.length > 0 && (
        <div className="performance-report-mistakes">
          <h4 className="mistakes-title">{t('performanceReport.keyMistakes')}</h4>
          <div className="mistakes-list">
            {filteredKeyMistakes.slice(0, 5).map((mistake: MistakeInfo, index: number) => (
              <button
                key={index}
                className="mistake-item"
                onClick={() => handleMistakeClick(mistake.nodeId)}
              >
                <span className="mistake-move-number">
                  {t('performanceReport.moveNumber', { number: mistake.moveNumber })}
                </span>
                <span className={`mistake-player ${mistake.player === 'B' ? 'black' : 'white'}`}>
                  (
                  {mistake.player === 'B'
                    ? t('performanceReport.blackShort')
                    : t('performanceReport.whiteShort')}
                  )
                </span>
                <span
                  className="mistake-category"
                  style={{ color: getCategoryColor(mistake.category) }}
                >
                  {mistake.moveRank > 0
                    ? t('performanceReport.rankN', { n: mistake.moveRank })
                    : t(`performanceReport.${mistake.category}`)}
                </span>
                <span className="mistake-moves">
                  {mistake.playedMove} → {mistake.bestMove}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
