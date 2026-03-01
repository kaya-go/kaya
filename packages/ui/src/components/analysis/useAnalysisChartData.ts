import {
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
  type RefObject,
  type MouseEvent,
} from 'react';

export interface AnalysisDataPoint {
  /** Move number in the branch (0 = root, 1 = first move, etc.) */
  moveNumber: number;
  /** Node ID for navigation */
  nodeId: number | string;
  /** Black's win rate (0-1) */
  blackWinRate: number;
  /** Score lead from Black's perspective (positive = Black ahead) */
  scoreLead: number;
}

export interface ChartConfig {
  width: number;
  height: number;
  innerWidth: number;
  innerHeight: number;
  maxMove: number;
  scoreRange: number;
}

export interface HoverInfo {
  x: number;
  y: number;
  moveNumber: number;
  dataPoint: AnalysisDataPoint | null;
}

export const CHART_HEIGHT = 150;
export const CHART_PADDING = { top: 12, right: 36, bottom: 28, left: 40 };
const WIN_RATE_PADDING = 0.05;

function useContainerWidth(wrapperRef: RefObject<HTMLDivElement | null>): number {
  const [containerWidth, setContainerWidth] = useState(400);

  // Measure container width with ResizeObserver
  // Uses contentRect to avoid forced reflows (clientWidth triggers layout)
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Initial measurement (only once on mount)
    const rect = wrapper.getBoundingClientRect();
    setContainerWidth(rect.width || 400);

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width > 0) {
          setContainerWidth(width);
        }
      }
    });

    resizeObserver.observe(wrapper);
    return () => resizeObserver.disconnect();
  }, []);

  return containerWidth;
}

interface UseAnalysisChartDataParams {
  data: AnalysisDataPoint[];
  currentMoveNumber: number;
  totalMoves: number;
  onNavigate?: (nodeId: number | string) => void;
  onNavigateToMove?: (moveNumber: number) => void;
  showWinRate: boolean;
  showScoreLead: boolean;
}

export function useAnalysisChartData({
  data,
  currentMoveNumber,
  totalMoves,
  onNavigate,
  onNavigateToMove,
  showWinRate,
  showScoreLead,
}: UseAnalysisChartDataParams) {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);
  const containerWidth = useContainerWidth(wrapperRef);

  // Calculate chart dimensions based on actual container width
  const chartConfig = useMemo((): ChartConfig => {
    const width = containerWidth;
    const height = CHART_HEIGHT;
    const innerWidth = width - CHART_PADDING.left - CHART_PADDING.right;
    const innerHeight = height - CHART_PADDING.top - CHART_PADDING.bottom;

    if (data.length === 0) {
      return {
        width,
        height,
        innerWidth,
        innerHeight,
        maxMove: totalMoves,
        // Symmetric score range so 0 is at center (aligns with 50% win rate)
        scoreRange: 20,
      };
    }

    // Use totalMoves for x-axis range (not just data points)
    const maxMove = Math.max(totalMoves, ...data.map(d => d.moveNumber));
    const scores = data.map(d => d.scoreLead);
    const maxAbsScore = Math.max(Math.abs(Math.min(...scores)), Math.abs(Math.max(...scores)), 10);

    // Make score range symmetric around 0 so it aligns with 50% win rate at center
    const scoreRange = Math.ceil(maxAbsScore * 1.1);

    return { width, height, innerWidth, innerHeight, maxMove, scoreRange };
  }, [data, totalMoves, containerWidth]);

  // Scale functions
  const xScale = useCallback(
    (moveNumber: number): number => {
      if (chartConfig.maxMove === 0) return CHART_PADDING.left;
      return CHART_PADDING.left + (moveNumber / chartConfig.maxMove) * chartConfig.innerWidth;
    },
    [chartConfig.maxMove, chartConfig.innerWidth]
  );

  // Win rate Y-axis padding: extend domain slightly below 0% and above 100%
  const winRateYScale = useCallback(
    (winRate: number): number => {
      // Win rate is 0-1, invert so 1 (100% Black) is at top
      // Add padding so the axis extends from -5% to 105%
      const paddedRange = 1 + 2 * WIN_RATE_PADDING;
      const normalized = (1 + WIN_RATE_PADDING - winRate) / paddedRange;
      return CHART_PADDING.top + normalized * chartConfig.innerHeight;
    },
    [chartConfig.innerHeight]
  );

  const scoreYScale = useCallback(
    (score: number): number => {
      // Score is symmetric around 0, which maps to center (same as 50% win rate)
      const normalized = (chartConfig.scoreRange - score) / (2 * chartConfig.scoreRange);
      return CHART_PADDING.top + normalized * chartConfig.innerHeight;
    },
    [chartConfig.scoreRange, chartConfig.innerHeight]
  );

  // Generate path data for lines
  const winRatePath = useMemo(() => {
    if (data.length === 0 || !showWinRate) return '';
    const sortedData = [...data].sort((a, b) => a.moveNumber - b.moveNumber);
    return sortedData
      .map((d, i) => {
        const x = xScale(d.moveNumber);
        const y = winRateYScale(d.blackWinRate);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  }, [data, showWinRate, xScale, winRateYScale]);

  const scoreLeadPath = useMemo(() => {
    if (data.length === 0 || !showScoreLead) return '';
    const sortedData = [...data].sort((a, b) => a.moveNumber - b.moveNumber);
    return sortedData
      .map((d, i) => {
        const x = xScale(d.moveNumber);
        const y = scoreYScale(d.scoreLead);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  }, [data, showScoreLead, xScale, scoreYScale]);

  // Handle mouse events - use actual pixel coordinates
  const handleMouseMove = useCallback(
    (e: MouseEvent<SVGSVGElement>) => {
      if (!svgRef.current) return;

      const rect = svgRef.current.getBoundingClientRect();
      // Direct pixel coordinates (no scaling needed)
      const mouseX = e.clientX - rect.left;

      // Calculate move number from X position (inverse of xScale)
      const innerX = mouseX - CHART_PADDING.left;
      const rawMoveNumber = (innerX / chartConfig.innerWidth) * chartConfig.maxMove;

      // Clamp to valid range and round to nearest integer
      const targetMoveNumber = Math.max(0, Math.min(totalMoves, Math.round(rawMoveNumber)));

      // Find if there's a data point at this move number
      const dataPoint = data.find(d => d.moveNumber === targetMoveNumber) ?? null;

      setHoverInfo({
        x: xScale(targetMoveNumber),
        y: 0,
        moveNumber: targetMoveNumber,
        dataPoint,
      });
    },
    [data, xScale, chartConfig.innerWidth, chartConfig.maxMove, totalMoves]
  );

  const handleMouseLeave = useCallback(() => {
    setHoverInfo(null);
  }, []);

  const handleClick = useCallback(() => {
    if (!hoverInfo) return;

    // If we have a data point with nodeId and onNavigate callback, use it
    if (hoverInfo.dataPoint && onNavigate) {
      onNavigate(hoverInfo.dataPoint.nodeId);
    }
    // Otherwise, use onNavigateToMove with the move number
    else if (onNavigateToMove) {
      onNavigateToMove(hoverInfo.moveNumber);
    }
  }, [hoverInfo, onNavigate, onNavigateToMove]);

  // Generate axis ticks - limit to 5-6 ticks max to avoid overlapping
  const xTicks = useMemo(() => {
    if (chartConfig.maxMove === 0) return [];

    // Target 5-6 ticks max for readability
    const maxTicks = 5;

    // Calculate a nice round step size
    const rawStep = chartConfig.maxMove / maxTicks;
    // Round to nice values: 1, 2, 5, 10, 20, 50, 100, etc.
    const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
    const normalized = rawStep / magnitude;
    let niceStep: number;
    if (normalized <= 1) niceStep = magnitude;
    else if (normalized <= 2) niceStep = 2 * magnitude;
    else if (normalized <= 5) niceStep = 5 * magnitude;
    else niceStep = 10 * magnitude;

    // Generate ticks at nice intervals
    const ticks: number[] = [0];
    let tick = niceStep;
    while (tick < chartConfig.maxMove) {
      ticks.push(tick);
      tick += niceStep;
    }
    // Always include the last move
    if (ticks[ticks.length - 1] !== chartConfig.maxMove) {
      ticks.push(chartConfig.maxMove);
    }
    return ticks;
  }, [chartConfig.maxMove]);

  // Format score for display (always from Black's perspective)
  const formatScore = useCallback((score: number): string => {
    const absScore = Math.abs(score);
    if (score > 0) return `B+${absScore.toFixed(1)}`;
    if (score < 0) return `W+${absScore.toFixed(1)}`;
    return '0';
  }, []);

  // Format win rate for display (always Black's win rate)
  const formatWinRate = useCallback((rate: number): string => {
    const pct = (rate * 100).toFixed(1);
    return `B: ${pct}%`;
  }, []);

  // Current position x coordinate (always calculated, not dependent on having data at that point)
  const currentX = useMemo(() => {
    if (currentMoveNumber < 0 || chartConfig.maxMove === 0) return null;
    return xScale(currentMoveNumber);
  }, [currentMoveNumber, chartConfig.maxMove, xScale]);

  // Find data point for current position (if analyzed)
  const currentData = useMemo(() => {
    return data.find(d => d.moveNumber === currentMoveNumber) ?? null;
  }, [data, currentMoveNumber]);

  return {
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
  };
}
