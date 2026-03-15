/**
 * BoardPreview – warped board preview with stone overlay
 *
 * Uses CSS matrix3d for the perspective warp (GPU-accelerated) instead of
 * pixel-by-pixel warpPerspective. The original photo is displayed with a CSS
 * transform computed from the 3×3 homography, and an overlay canvas draws
 * the grid, detected stones, hints, and markers on top.
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  BoardCorners,
  CalibrationHint,
  Point,
  RecognitionResult,
} from '@kaya/board-recognition';
import { computeHomography } from '@kaya/board-recognition';
import type { DeltaStone } from '../BoardRecognitionDialog';

const WARP_SIZE = 800;
const WARP_MARGIN = 0.08;

type CalibrationMode = 'black' | 'white' | 'empty' | null;

interface PreviewProps {
  result: RecognitionResult;
  objectURL: string | null;
  corners: BoardCorners | null;
  hints: CalibrationHint[];
  calibrationMode: CalibrationMode;
  onIntersectionClick: (col: number, row: number) => void;
  gridCorners: BoardCorners | null;
  settingGrid: boolean;
  gridClicks: Point[];
  onGridClick: (warpX: number, warpY: number) => void;
  /** Single move stone to highlight when "add as move" is available */
  moveMarker?: DeltaStone | null;
  /** All delta stones to show (when the user toggles the delta view) */
  delta?: DeltaStone[];
}

/** Compute canvas position for a grid intersection. */
function gridToCanvas(
  col: number,
  row: number,
  boardSize: number,
  scale: number,
  gridCorners: BoardCorners | null
): [number, number] {
  if (gridCorners) {
    const u = col / (boardSize - 1);
    const v = row / (boardSize - 1);
    const [tl, tr, br, bl] = gridCorners;
    return [
      ((1 - u) * (1 - v) * tl[0] + u * (1 - v) * tr[0] + u * v * br[0] + (1 - u) * v * bl[0]) *
        scale,
      ((1 - u) * (1 - v) * tl[1] + u * (1 - v) * tr[1] + u * v * br[1] + (1 - u) * v * bl[1]) *
        scale,
    ];
  }
  const cellSize = ((WARP_SIZE - 1) / (boardSize - 1)) * scale;
  return [col * cellSize, row * cellSize];
}

export const BoardPreview: React.FC<PreviewProps> = ({
  result,
  objectURL,
  corners,
  hints,
  calibrationMode,
  onIntersectionClick,
  gridCorners,
  settingGrid,
  gridClicks,
  onGridClick,
  moveMarker,
  delta,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paintRef = useRef<() => void>(() => {});
  const [containerSize, setContainerSize] = useState(0);

  // Measure the available space from the PARENT wrapper (.brd-preview-wrap)
  // and use the smaller dimension to keep the container square.
  // We observe the parent (not the container itself) to avoid a feedback loop
  // when setting explicit width/height on the container via inline styles.
  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      const s = Math.min(width, height);
      if (s > 0) setContainerSize(s);
    });
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  // Compute CSS matrix3d for the image perspective transform
  const cssTransform = useMemo(() => {
    if (!corners || !containerSize) return '';

    const m = containerSize * WARP_MARGIN;
    const dstCorners: [Point, Point, Point, Point] = [
      [m, m],
      [containerSize - 1 - m, m],
      [containerSize - 1 - m, containerSize - 1 - m],
      [m, containerSize - 1 - m],
    ];

    const H = computeHomography(corners, dstCorners);
    if (!H) return '';

    // Convert 3×3 homography to CSS matrix3d (column-major 4×4)
    return `matrix3d(${H[0]},${H[3]},0,${H[6]},${H[1]},${H[4]},0,${H[7]},0,0,1,0,${H[2]},${H[5]},0,${H[8]})`;
  }, [corners, containerSize]);

  const paintCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerSize) return;
    const size = containerSize;
    if (canvas.width !== size || canvas.height !== size) {
      canvas.width = size;
      canvas.height = size;
    }
    const ctx = canvas.getContext('2d')!;
    const scale = size / WARP_SIZE;

    // Clear — no image drawn, it's handled by the CSS-transformed <img>
    ctx.clearRect(0, 0, size, size);

    const bs = result.boardSize;

    // Grid overlay (bright blue)
    ctx.strokeStyle = 'rgba(0, 140, 255, 0.5)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    for (let i = 0; i < bs; i++) {
      const [hx0, hy0] = gridToCanvas(0, i, bs, scale, gridCorners);
      const [hx1, hy1] = gridToCanvas(bs - 1, i, bs, scale, gridCorners);
      ctx.moveTo(hx0, hy0);
      ctx.lineTo(hx1, hy1);
      const [vx0, vy0] = gridToCanvas(i, 0, bs, scale, gridCorners);
      const [vx1, vy1] = gridToCanvas(i, bs - 1, bs, scale, gridCorners);
      ctx.moveTo(vx0, vy0);
      ctx.lineTo(vx1, vy1);
    }
    ctx.stroke();

    // Draw detected stones
    const cellPx = ((WARP_SIZE - 1) / (bs - 1)) * scale;
    const r = Math.max(3, cellPx * 0.3);
    for (const stone of result.stones) {
      const [cx, cy] = gridToCanvas(stone.x, stone.y, bs, scale, gridCorners);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = stone.color === 'black' ? 'rgba(0,180,255,0.55)' : 'rgba(255,80,0,0.55)';
      ctx.fill();
    }

    // Draw hint markers
    for (const h of hints) {
      const [cx, cy] = gridToCanvas(h.x, h.y, bs, scale, gridCorners);
      const d = Math.max(4, cellPx * 0.18);
      ctx.beginPath();
      ctx.moveTo(cx, cy - d);
      ctx.lineTo(cx + d, cy);
      ctx.lineTo(cx, cy + d);
      ctx.lineTo(cx - d, cy);
      ctx.closePath();
      ctx.fillStyle = h.color === 'black' ? '#00e5ff' : h.color === 'white' ? '#ff6600' : '#44ff44';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Draw grid corner click markers (during grid-setting mode)
    for (let i = 0; i < gridClicks.length; i++) {
      const [wx, wy] = gridClicks[i];
      const cx = wx * scale;
      const cy = wy * scale;
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#00ff88';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#000';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(i + 1), cx, cy);
    }

    // Draw grid corner handles (when gridCorners are set)
    if (gridCorners) {
      const CORNER_LABELS = ['TL', 'TR', 'BR', 'BL'];
      const CORNER_COLORS = ['#00e5ff', '#ff4081', '#76ff03', '#ffd740'];
      const CROSS = 6;
      for (let i = 0; i < 4; i++) {
        const cx = gridCorners[i][0] * scale;
        const cy = gridCorners[i][1] * scale;
        const color = CORNER_COLORS[i];

        // Semi-transparent circle
        ctx.beginPath();
        ctx.arc(cx, cy, 8, 0, Math.PI * 2);
        ctx.fillStyle = color + '30';
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Crosshair
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx - CROSS, cy);
        ctx.lineTo(cx + CROSS, cy);
        ctx.moveTo(cx, cy - CROSS);
        ctx.lineTo(cx, cy + CROSS);
        ctx.stroke();

        // Label
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 7px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(CORNER_LABELS[i], cx, cy - 13);
      }
    }

    // Draw delta markers (added / removed) — same style as detected stones
    if (delta && delta.length > 0) {
      for (const d of delta) {
        const [cx, cy] = gridToCanvas(d.x, d.y, bs, scale, gridCorners);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = d.type === 'added' ? 'rgba(0, 220, 80, 0.55)' : 'rgba(220, 40, 40, 0.55)';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Draw single move marker (prominent ring) when add-as-move is available
    if (moveMarker) {
      const [cx, cy] = gridToCanvas(moveMarker.x, moveMarker.y, bs, scale, gridCorners);
      const rMove = Math.max(5, cellPx * 0.36);
      // Outer glow
      ctx.beginPath();
      ctx.arc(cx, cy, rMove + 2, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 3;
      ctx.stroke();
      // Main ring
      ctx.beginPath();
      ctx.arc(cx, cy, rMove, 0, Math.PI * 2);
      ctx.fillStyle =
        moveMarker.color === 'black' ? 'rgba(0, 220, 80, 0.7)' : 'rgba(0, 220, 80, 0.7)';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      // Triangle pointer inside
      const tri = rMove * 0.45;
      ctx.beginPath();
      ctx.moveTo(cx - tri * 0.7, cy - tri * 0.5);
      ctx.lineTo(cx + tri * 0.7, cy);
      ctx.lineTo(cx - tri * 0.7, cy + tri * 0.5);
      ctx.closePath();
      ctx.fillStyle = '#fff';
      ctx.fill();
    }
  }, [result, hints, gridCorners, gridClicks, settingGrid, delta, moveMarker, containerSize]);

  // Keep paintRef in sync
  paintRef.current = paintCanvas;

  // Repaint when overlay data or container size changes
  useEffect(() => {
    paintCanvas();
  }, [paintCanvas]);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const mx = (e.clientX - rect.left) * scaleX;
      const my = (e.clientY - rect.top) * scaleY;
      const scale = canvas.width / WARP_SIZE;

      if (settingGrid) {
        onGridClick(mx / scale, my / scale);
        return;
      }

      if (!calibrationMode) return;

      // Find nearest grid intersection
      const bs = result.boardSize;
      let bestDist = Infinity,
        bestCol = 0,
        bestRow = 0;
      for (let row = 0; row < bs; row++) {
        for (let col = 0; col < bs; col++) {
          const [gx, gy] = gridToCanvas(col, row, bs, scale, gridCorners);
          const d = Math.hypot(mx - gx, my - gy);
          if (d < bestDist) {
            bestDist = d;
            bestCol = col;
            bestRow = row;
          }
        }
      }
      if (bestCol >= 0 && bestCol < bs && bestRow >= 0 && bestRow < bs) {
        onIntersectionClick(bestCol, bestRow);
      }
    },
    [calibrationMode, settingGrid, result.boardSize, gridCorners, onIntersectionClick, onGridClick]
  );

  return (
    <div
      ref={containerRef}
      className="brd-preview-container"
      style={containerSize > 0 ? { width: containerSize, height: containerSize } : undefined}
    >
      {objectURL && cssTransform && (
        <img
          src={objectURL}
          className="brd-preview-img"
          style={{ transform: cssTransform }}
          draggable={false}
          alt=""
        />
      )}
      <canvas
        ref={canvasRef}
        className="brd-preview-overlay"
        style={{ cursor: settingGrid || calibrationMode ? 'crosshair' : 'default' }}
        onClick={onClick}
      />
    </div>
  );
};
