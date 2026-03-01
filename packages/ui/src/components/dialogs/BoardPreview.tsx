/**
 * BoardPreview – warped board preview with stone overlay
 *
 * Sub-component of BoardRecognitionDialog that renders the warped
 * board image on a canvas with grid lines, detected stones, hints,
 * and grid corner markers overlaid.
 */
import React, { useCallback, useEffect, useRef } from 'react';
import type {
  BoardCorners,
  CalibrationHint,
  Point,
  RecognitionResult,
  RawImage,
} from '@kaya/board-recognition';

const WARP_SIZE = 800;

type CalibrationMode = 'black' | 'white' | 'empty' | null;

interface PreviewProps {
  result: RecognitionResult;
  hints: CalibrationHint[];
  calibrationMode: CalibrationMode;
  onIntersectionClick: (col: number, row: number) => void;
  gridCorners: BoardCorners | null;
  settingGrid: boolean;
  gridClicks: Point[];
  onGridClick: (warpX: number, warpY: number) => void;
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
  hints,
  calibrationMode,
  onIntersectionClick,
  gridCorners,
  settingGrid,
  gridClicks,
  onGridClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bitmapRef = useRef<ImageBitmap | null>(null);
  const warpedImageRef = useRef<RawImage | null>(null);
  const paintRef = useRef<() => void>(() => {});

  const paintCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img = bitmapRef.current;
    if (!canvas || !img) return;
    const size = canvas.clientWidth || 360;
    if (canvas.width !== size || canvas.height !== size) {
      canvas.width = size;
      canvas.height = size;
    }
    const ctx = canvas.getContext('2d')!;
    const scale = size / WARP_SIZE;

    ctx.drawImage(img, 0, 0, size, size);

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
      const CORNER_COLORS = ['#ff4444', '#ffaa00', '#ff4444', '#ffaa00'];
      for (let i = 0; i < 4; i++) {
        const cx = gridCorners[i][0] * scale;
        const cy = gridCorners[i][1] * scale;
        ctx.beginPath();
        ctx.arc(cx, cy, 7, 0, Math.PI * 2);
        ctx.fillStyle = CORNER_COLORS[i];
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 8px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(CORNER_LABELS[i], cx, cy);
      }
    }
  }, [result, hints, gridCorners, gridClicks, settingGrid]);

  // Keep paintRef in sync so the bitmap effect can call the latest paint
  paintRef.current = paintCanvas;

  // Create ImageBitmap asynchronously when warpedImage reference changes
  useEffect(() => {
    const raw = result.warpedImage;
    if (raw === warpedImageRef.current) return;
    warpedImageRef.current = raw;

    let cancelled = false;
    const imageData = new ImageData(
      new Uint8ClampedArray(
        raw.data.buffer as ArrayBuffer,
        raw.data.byteOffset,
        raw.data.byteLength
      ),
      raw.width,
      raw.height
    );
    createImageBitmap(imageData).then(bmp => {
      if (cancelled) {
        bmp.close();
        return;
      }
      bitmapRef.current?.close();
      bitmapRef.current = bmp;
      paintRef.current();
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.warpedImage]);

  // Clean up bitmap on unmount
  useEffect(() => {
    return () => {
      bitmapRef.current?.close();
    };
  }, []);

  // Repaint when overlay data changes
  useEffect(() => {
    paintCanvas();
  }, [result, hints, paintCanvas, gridCorners, gridClicks, settingGrid]);

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
    <canvas
      ref={canvasRef}
      className="brd-preview-canvas"
      style={{ cursor: settingGrid || calibrationMode ? 'crosshair' : 'default' }}
      onClick={onClick}
    />
  );
};
