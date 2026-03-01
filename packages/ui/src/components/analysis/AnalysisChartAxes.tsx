import React from 'react';
import type { ChartConfig } from './useAnalysisChartData';
import { CHART_PADDING } from './useAnalysisChartData';

interface WinRateAxisProps {
  chartConfig: ChartConfig;
  winRateYScale: (winRate: number) => number;
}

export const WinRateAxis: React.FC<WinRateAxisProps> = ({ chartConfig, winRateYScale }) => (
  <g className="axis axis-left">
    <line
      x1={CHART_PADDING.left}
      y1={CHART_PADDING.top}
      x2={CHART_PADDING.left}
      y2={CHART_PADDING.top + chartConfig.innerHeight}
      className="axis-line"
    />
    {/* 100% Black */}
    <text
      x={CHART_PADDING.left - 4}
      y={CHART_PADDING.top + 5}
      className="axis-label winrate-label-top"
    >
      100%
    </text>
    {/* 50% */}
    <text
      x={CHART_PADDING.left - 4}
      y={winRateYScale(0.5) + 4}
      className="axis-label winrate-label-mid"
    >
      50%
    </text>
    {/* 0% Black (100% White) */}
    <text
      x={CHART_PADDING.left - 4}
      y={CHART_PADDING.top + chartConfig.innerHeight}
      className="axis-label winrate-label-bottom"
    >
      0%
    </text>
    {/* Axis label */}
    <text
      x={8}
      y={CHART_PADDING.top + chartConfig.innerHeight / 2}
      className="axis-title winrate-axis-title"
      transform={`rotate(-90, 8, ${CHART_PADDING.top + chartConfig.innerHeight / 2})`}
    >
      Win Rate
    </text>
  </g>
);

interface ScoreLeadAxisProps {
  chartConfig: ChartConfig;
  scoreYScale: (score: number) => number;
}

export const ScoreLeadAxis: React.FC<ScoreLeadAxisProps> = ({ chartConfig, scoreYScale }) => (
  <g className="axis axis-right">
    <line
      x1={CHART_PADDING.left + chartConfig.innerWidth}
      y1={CHART_PADDING.top}
      x2={CHART_PADDING.left + chartConfig.innerWidth}
      y2={CHART_PADDING.top + chartConfig.innerHeight}
      className="axis-line"
    />
    {/* Max score (Black ahead) */}
    <text
      x={CHART_PADDING.left + chartConfig.innerWidth + 4}
      y={CHART_PADDING.top + 5}
      className="axis-label score-label-value"
    >
      +{chartConfig.scoreRange}
    </text>
    {/* Zero */}
    <text
      x={CHART_PADDING.left + chartConfig.innerWidth + 4}
      y={scoreYScale(0) + 4}
      className="axis-label score-label-value"
    >
      0
    </text>
    {/* Min score (White ahead) */}
    <text
      x={CHART_PADDING.left + chartConfig.innerWidth + 4}
      y={CHART_PADDING.top + chartConfig.innerHeight}
      className="axis-label score-label-value"
    >
      -{chartConfig.scoreRange}
    </text>
    {/* Axis label */}
    <text
      x={chartConfig.width - 8}
      y={CHART_PADDING.top + chartConfig.innerHeight / 2}
      className="axis-title score-axis-title"
      transform={`rotate(90, ${chartConfig.width - 8}, ${CHART_PADDING.top + chartConfig.innerHeight / 2})`}
    >
      Score
    </text>
  </g>
);

interface MoveNumberAxisProps {
  chartConfig: ChartConfig;
  xScale: (moveNumber: number) => number;
  xTicks: number[];
}

export const MoveNumberAxis: React.FC<MoveNumberAxisProps> = ({ chartConfig, xScale, xTicks }) => (
  <g className="axis axis-bottom">
    <line
      x1={CHART_PADDING.left}
      y1={CHART_PADDING.top + chartConfig.innerHeight}
      x2={CHART_PADDING.left + chartConfig.innerWidth}
      y2={CHART_PADDING.top + chartConfig.innerHeight}
      className="axis-line"
    />
    {xTicks.map(tick => (
      <g key={tick}>
        <line
          x1={xScale(tick)}
          y1={CHART_PADDING.top + chartConfig.innerHeight}
          x2={xScale(tick)}
          y2={CHART_PADDING.top + chartConfig.innerHeight + 4}
          className="axis-tick"
        />
        <text
          x={xScale(tick)}
          y={CHART_PADDING.top + chartConfig.innerHeight + 16}
          className="axis-label axis-label-bottom"
        >
          {tick}
        </text>
      </g>
    ))}
  </g>
);
