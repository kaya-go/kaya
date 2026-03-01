import React from 'react';
import './AnalysisChart.css';
import { useAnalysisChartData, CHART_PADDING } from './useAnalysisChartData';
import { WinRateAxis, ScoreLeadAxis, MoveNumberAxis } from './AnalysisChartAxes';

export type { AnalysisDataPoint } from './useAnalysisChartData';

export interface AnalysisChartProps {
  /** Array of data points to display */
  data: import('./useAnalysisChartData').AnalysisDataPoint[];
  /** Current move number (for highlighting current position) */
  currentMoveNumber: number;
  /** Total moves in the branch (for x-axis range) */
  totalMoves: number;
  /** Callback when user clicks on a data point (with analysis data) */
  onNavigate?: (nodeId: number | string) => void;
  /** Callback when user clicks on any position (by move number) */
  onNavigateToMove?: (moveNumber: number) => void;
  /** Whether to show win rate line */
  showWinRate?: boolean;
  /** Whether to show score lead line */
  showScoreLead?: boolean;
  /** Callback when toggle changes */
  onToggleWinRate?: () => void;
  onToggleScoreLead?: () => void;
}

/**
 * Custom SVG chart for displaying AI analysis results (win rate and score lead)
 * along the current game branch.
 */
export const AnalysisChart: React.FC<AnalysisChartProps> = ({
  data,
  currentMoveNumber,
  totalMoves,
  onNavigate,
  onNavigateToMove,
  showWinRate = true,
  showScoreLead = true,
  onToggleWinRate,
  onToggleScoreLead,
}) => {
  const {
    svgRef,
    wrapperRef,
    chartConfig,
    hoverInfo,
    handleMouseMove,
    handleMouseLeave,
    handleClick,
    winRatePath,
    scoreLeadPath,
    xScale,
    winRateYScale,
    scoreYScale,
    xTicks,
    formatScore,
    formatWinRate,
    currentX,
    currentData,
  } = useAnalysisChartData({
    data,
    currentMoveNumber,
    totalMoves,
    onNavigate,
    onNavigateToMove,
    showWinRate,
    showScoreLead,
  });

  return (
    <div className="analysis-chart-container">
      {/* Chart */}
      <div ref={wrapperRef} className="analysis-chart-wrapper">
        <svg
          ref={svgRef}
          className="analysis-chart-svg"
          width={chartConfig.width}
          height={chartConfig.height}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          style={{ cursor: hoverInfo ? 'pointer' : 'default' }}
        >
          {/* Background */}
          <rect
            x={CHART_PADDING.left}
            y={CHART_PADDING.top}
            width={chartConfig.innerWidth}
            height={chartConfig.innerHeight}
            className="chart-background"
          />

          {/* 50% line for win rate */}
          {showWinRate && (
            <line
              x1={CHART_PADDING.left}
              y1={winRateYScale(0.5)}
              x2={CHART_PADDING.left + chartConfig.innerWidth}
              y2={winRateYScale(0.5)}
              className="chart-midline"
            />
          )}

          {/* Zero line for score */}
          {showScoreLead && (
            <line
              x1={CHART_PADDING.left}
              y1={scoreYScale(0)}
              x2={CHART_PADDING.left + chartConfig.innerWidth}
              y2={scoreYScale(0)}
              className="chart-zeroline"
            />
          )}

          {/* Win rate line */}
          {showWinRate && <path d={winRatePath} className="chart-line winrate-line" />}

          {/* Score lead line */}
          {showScoreLead && <path d={scoreLeadPath} className="chart-line score-line" />}

          {/* Current position indicator */}
          {currentX !== null && (
            <line
              x1={currentX}
              y1={CHART_PADDING.top}
              x2={currentX}
              y2={CHART_PADDING.top + chartConfig.innerHeight}
              className="chart-current-line"
            />
          )}

          {/* Hover indicator */}
          {hoverInfo && (
            <line
              x1={hoverInfo.x}
              y1={CHART_PADDING.top}
              x2={hoverInfo.x}
              y2={CHART_PADDING.top + chartConfig.innerHeight}
              className="chart-hover-line"
            />
          )}

          {/* Y-Axis: Win Rate (left) */}
          {showWinRate && <WinRateAxis chartConfig={chartConfig} winRateYScale={winRateYScale} />}

          {/* Y-Axis: Score Lead (right) */}
          {showScoreLead && <ScoreLeadAxis chartConfig={chartConfig} scoreYScale={scoreYScale} />}

          {/* X-Axis: Move number */}
          <MoveNumberAxis chartConfig={chartConfig} xScale={xScale} xTicks={xTicks} />
        </svg>
      </div>

      {/* Current position info */}
      <div className="analysis-chart-current-info">
        <span className="current-move">Move {currentMoveNumber}</span>
        {currentData ? (
          <>
            <span className="current-winrate winrate-value">
              {formatWinRate(currentData.blackWinRate)}
            </span>
            <span
              className={`current-score ${
                currentData.scoreLead >= 0 ? 'score-positive' : 'score-negative'
              }`}
            >
              {formatScore(currentData.scoreLead)}
            </span>
          </>
        ) : (
          <span className="current-no-data">Not analyzed</span>
        )}
      </div>

      {/* Perspective note */}
      <div className="analysis-chart-perspective-note">
        <em>Win rate and score are from Black's perspective</em>
      </div>
    </div>
  );
};
