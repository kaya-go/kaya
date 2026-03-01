import React, { useMemo, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LuMap,
  LuZap,
  LuSquare,
  LuTrash2,
  LuInfo,
  LuLayers,
  LuLoader,
  LuBrain,
} from 'react-icons/lu';
import { useGameTree } from '../../contexts/GameTreeContext';
import { useKeyboardShortcuts } from '../../contexts/KeyboardShortcutsContext';
import { AnalysisLegendModal } from './AnalysisLegendModal';
import {
  createInitialAnalysisState,
  updateAnalysisState,
  generateAnalysisCacheKey,
  smoothAnalysisResult,
} from '../../utils/aiAnalysis';
import { getPathToNode } from '../../utils/gameCache';
import { AnalysisChart, type AnalysisDataPoint } from './AnalysisChart';
import { useAIAnalysis } from '../ai/AIAnalysisOverlay';
import './AnalysisGraphPanel.css';
import './AnalysisGraphPanelControls.css';
import './AnalysisGraphPanelChart.css';

export interface AnalysisGraphPanelProps {
  className?: string;
}

/**
 * Panel displaying win rate and score lead graphs for AI analysis results.
 * Shows graphs when there are AI analysis results for positions on the current branch.
 */
export const AnalysisGraphPanel: React.FC<AnalysisGraphPanelProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const {
    gameTree,
    currentNodeId,
    rootId,
    gameInfo,
    analysisCache,
    analysisCacheSize,
    navigate,
    navigateToMove,
    analysisMode,
    toggleAnalysisMode,
  } = useGameTree();

  const {
    analyzeFullGame,
    stopFullGameAnalysis,
    isFullGameAnalyzing,
    isStopping,
    fullGameProgress,
    isInitializing,
    pendingFullGameAnalysis,
    toggleOwnership,
    showOwnership,
    clearAnalysisCache,
    showTopMoves,
    toggleTopMoves,
    isAnalyzing,
  } = useAIAnalysis();

  const { getBinding, bindingToDisplayString } = useKeyboardShortcuts();

  // Toggle state for showing/hiding each metric
  const [showWinRate, setShowWinRate] = useState(true);
  const [showScoreLead, setShowScoreLead] = useState(true);
  const [showMoveStrengthInfo, setShowMoveStrengthInfo] = useState(false);

  const handleToggleWinRate = useCallback(() => {
    setShowWinRate(prev => !prev);
  }, []);

  const handleToggleScoreLead = useCallback(() => {
    setShowScoreLead(prev => !prev);
  }, []);

  // Build data points from the current branch (root → current → end of branch)
  const analysisData = useMemo((): {
    dataPoints: AnalysisDataPoint[];
    totalPositions: number;
    currentPositionIndex: number;
    analyzedCount: number;
  } => {
    if (!gameTree || rootId === null || rootId === undefined || currentNodeId === null) {
      return { dataPoints: [], totalPositions: 0, currentPositionIndex: 0, analyzedCount: 0 };
    }

    const boardSize = gameInfo.boardSize ?? 19;
    const komi = gameInfo.komi ?? 7.5;

    // Step 1: Get path from root to current node (this is the branch we're on)
    const pathToCurrentNode = getPathToNode(gameTree, currentNodeId);
    const currentPositionIndex = pathToCurrentNode.length - 1;

    // Step 2: Extend from current node to end of branch (following first child)
    const fullPath: Array<{ id: number | string; data: any }> = [...pathToCurrentNode];
    let lastNode = pathToCurrentNode[pathToCurrentNode.length - 1];

    while (lastNode && lastNode.children.length > 0) {
      const nextChild = lastNode.children[0];
      fullPath.push(nextChild);
      lastNode = nextChild;
    }

    if (fullPath.length === 0)
      return { dataPoints: [], totalPositions: 0, currentPositionIndex: 0, analyzedCount: 0 };

    // First pass: compute all cache keys and collect raw results
    const cacheKeys: string[] = [];
    const rawResults: (import('@kaya/ai-engine').AnalysisResult | null)[] = [];
    let state = createInitialAnalysisState(boardSize);

    for (let i = 0; i < fullPath.length; i++) {
      const pathNode = fullPath[i];
      state = updateAnalysisState(state, pathNode as any, i);

      // Generate cache key for this position
      const cacheKey = generateAnalysisCacheKey(
        state.board.signMap,
        state.nextToPlay,
        komi,
        state.history
      );
      cacheKeys.push(cacheKey);

      // Collect raw result (or null if not cached)
      rawResults.push(analysisCache.current.get(cacheKey) ?? null);
    }

    // Count how many positions have analysis results
    const analyzedCount = rawResults.filter(r => r !== null).length;

    // Second pass: apply smoothing and build data points
    const points: AnalysisDataPoint[] = [];

    for (let i = 0; i < fullPath.length; i++) {
      const result = rawResults[i];
      if (!result) continue;

      // Apply smoothing using previous position only
      const prevResult = i > 0 ? rawResults[i - 1] : null;
      const smoothed = smoothAnalysisResult(result, prevResult);

      points.push({
        moveNumber: i,
        nodeId: fullPath[i].id,
        blackWinRate: smoothed.winRate,
        scoreLead: smoothed.scoreLead,
      });
    }

    return {
      dataPoints: points,
      totalPositions: fullPath.length,
      currentPositionIndex,
      analyzedCount,
    };
  }, [gameTree, rootId, currentNodeId, gameInfo, analysisCache, analysisCacheSize]);

  const { dataPoints, totalPositions, currentPositionIndex, analyzedCount } = analysisData;

  const handleNavigate = useCallback(
    (nodeId: number | string) => {
      navigate(nodeId);
    },
    [navigate]
  );

  const handleNavigateToMove = useCallback(
    (targetMoveNumber: number) => {
      navigateToMove(targetMoveNumber);
    },
    [navigateToMove]
  );

  const isFullyAnalyzed = totalPositions > 0 && dataPoints.length === totalPositions;

  return (
    <div className={`analysis-graph-panel ${className}`}>
      {/* Single unified toolbar */}
      <div className="analysis-panel-toolbar">
        {/* Analysis Mode Toggle */}
        <button
          className={`analysis-mode-indicator ${analysisMode ? 'active' : ''}`}
          onClick={toggleAnalysisMode}
          title={analysisMode ? t('analysis.analysisModeOn') : t('analysis.analysisModeOff')}
          aria-label={analysisMode ? t('analysis.analysisModeOn') : t('analysis.analysisModeOff')}
        >
          <span className="analysis-mode-dot" />
          <LuBrain size={14} />
        </button>

        <div className="analysis-toolbar-separator" />

        {/* Board overlay toggles */}
        <button
          className={`analysis-overlay-button ${showOwnership ? 'active' : ''}`}
          onClick={toggleOwnership}
          disabled={isInitializing}
          title={`${t('analysis.toggleOwnership')} (${bindingToDisplayString(getBinding('ai.toggleOwnership'))})`}
          aria-label={t('analysis.toggleOwnership')}
          aria-pressed={showOwnership}
        >
          <LuMap size={14} />
        </button>
        <button
          className={`analysis-overlay-button ${showTopMoves ? 'active' : ''}`}
          onClick={toggleTopMoves}
          disabled={isInitializing}
          title={`${t('analysis.toggleTopMoves')} (${bindingToDisplayString(getBinding('ai.toggleTopMoves'))})`}
          aria-label={t('analysis.toggleTopMoves')}
          aria-pressed={showTopMoves}
        >
          <LuLayers size={14} />
        </button>

        <div className="analysis-toolbar-separator" />

        {/* Action buttons */}
        <button
          className={`analysis-action-button ${isFullGameAnalyzing ? 'active analyzing' : ''}`}
          title={
            isFullGameAnalyzing
              ? t('analysis.stopAnalysis')
              : pendingFullGameAnalysis
                ? t('analysis.waitingForEngine')
                : t('analysis.analyzeFullGame')
          }
          onClick={isFullGameAnalyzing ? stopFullGameAnalysis : analyzeFullGame}
          disabled={isInitializing || isStopping || pendingFullGameAnalysis || isFullyAnalyzed}
          aria-label={t('analysis.analyzeFullGame')}
        >
          {isFullGameAnalyzing ? <LuSquare size={14} /> : <LuZap size={14} />}
        </button>
        <button
          className="analysis-action-button"
          title={
            analysisCacheSize > 0
              ? t('analysis.clearCacheWithCount', { count: analysisCacheSize })
              : t('analysis.noCachedAnalysis')
          }
          onClick={clearAnalysisCache}
          disabled={analysisCacheSize === 0 || isFullGameAnalyzing}
          aria-label={t('analysis.clearCache')}
        >
          <LuTrash2 size={14} />
        </button>
        <button
          className="analysis-action-button"
          title={t('analysis.analysisLegend')}
          onClick={() => setShowMoveStrengthInfo(true)}
          aria-label={t('analysis.analysisLegend')}
        >
          <LuInfo size={14} />
        </button>

        <div className="analysis-toolbar-separator" />

        {/* Position count */}
        <span
          className="analysis-positions-count"
          title={t('analysis.positionsAnalyzed', {
            analyzed: analyzedCount,
            total: totalPositions,
          })}
        >
          {analyzedCount}/{totalPositions}
        </span>
      </div>

      {/* Chart legend row - Win Rate / Score toggles */}
      <div className="analysis-chart-legend">
        <button
          className={`analysis-legend-toggle ${showWinRate ? 'active' : ''}`}
          onClick={handleToggleWinRate}
          title={t('analysis.toggleWinRate')}
          aria-label={t('analysis.toggleWinRate')}
          aria-pressed={showWinRate}
        >
          <span className="legend-indicator legend-winrate" />
          <span className="legend-label">{t('analysis.winRate')}</span>
        </button>
        <button
          className={`analysis-legend-toggle ${showScoreLead ? 'active' : ''}`}
          onClick={handleToggleScoreLead}
          title={t('analysis.toggleScore')}
          aria-label={t('analysis.toggleScore')}
          aria-pressed={showScoreLead}
        >
          <span className="legend-indicator legend-score" />
          <span className="legend-label">{t('analysis.score')}</span>
        </button>
      </div>

      {(isInitializing || isAnalyzing) && (
        <div className="analysis-status-bar">
          <LuLoader className="analysis-spinner" />
          <span>{isInitializing ? t('analysis.initializingEngine') : t('analysis.analyzing')}</span>
        </div>
      )}

      {/* Progress bar shown above chart during analysis */}
      {isFullGameAnalyzing && (
        <div className="analysis-progress-inline">
          <span className="analysis-progress-label">
            {isStopping
              ? t('analysis.stopping')
              : t('analysis.analyzingProgress', { progress: Math.round(fullGameProgress) })}
          </span>
          <div className="analysis-progress-bar-inline">
            <div className="analysis-progress-bar" style={{ width: `${fullGameProgress}%` }} />
          </div>
          <button
            className="analysis-stop-button-small"
            onClick={stopFullGameAnalysis}
            disabled={isStopping}
            title={t('analysis.stopAnalysisButton')}
          >
            ✕
          </button>
        </div>
      )}

      {/* Always show the chart - allows clicking to navigate even without analysis */}
      <AnalysisChart
        data={dataPoints}
        currentMoveNumber={currentPositionIndex}
        totalMoves={totalPositions > 0 ? totalPositions - 1 : 0}
        onNavigate={handleNavigate}
        onNavigateToMove={handleNavigateToMove}
        showWinRate={showWinRate}
        showScoreLead={showScoreLead}
        onToggleWinRate={handleToggleWinRate}
        onToggleScoreLead={handleToggleScoreLead}
      />

      <AnalysisLegendModal
        isOpen={showMoveStrengthInfo}
        onClose={() => setShowMoveStrengthInfo(false)}
      />
    </div>
  );
};
