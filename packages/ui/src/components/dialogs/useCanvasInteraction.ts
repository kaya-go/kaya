/**
 * useCanvasInteraction – manages the photo canvas: painting the image
 * with corner handles, and pointer events for dragging corners.
 */
import React, { useCallback, useLayoutEffect, useRef } from 'react';
import type { BoardCorners, RawImage } from '@kaya/board-recognition';
import { orderCorners } from '@kaya/board-recognition';

const CORNER_HANDLE_RADIUS = 12;
const CORNER_HIT_RADIUS = 28;

/** Check if a mouse position is near any corner handle. */
function nearCornerIdx(mx: number, my: number, corners: BoardCorners, hitRadius: number): number {
  for (let i = 0; i < 4; i++) {
    const [cx, cy] = corners[i];
    if (Math.hypot(mx - cx, my - cy) < hitRadius) return i;
  }
  return -1;
}

interface CanvasInteractionOptions {
  rawImage: RawImage | null;
  objectURL: string | null;
  corners: BoardCorners | null;
  setCorners: React.Dispatch<React.SetStateAction<BoardCorners | null>>;
  setHints: React.Dispatch<React.SetStateAction<any[]>>;
  setGridClicks: React.Dispatch<React.SetStateAction<any[]>>;
  setSettingGrid: React.Dispatch<React.SetStateAction<boolean>>;
  scheduleReclassify: (newCorners: BoardCorners) => void;
  rawDimsRef: React.MutableRefObject<{ width: number; height: number }>;
  cornersRef: React.MutableRefObject<BoardCorners | null>;
}

export function useCanvasInteraction(options: CanvasInteractionOptions) {
  const {
    rawImage,
    objectURL,
    corners,
    setCorners,
    setHints,
    setGridClicks,
    setSettingGrid,
    scheduleReclassify,
    rawDimsRef,
    cornersRef,
  } = options;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const bgBitmapRef = useRef<ImageBitmap | null>(null);
  const dragIdxRef = useRef<number | null>(null);
  const dragOffsetRef = useRef<[number, number]>([0, 0]);

  // ── Load display image into imgRef ────────────────────
  React.useEffect(() => {
    if (!objectURL) return;
    imgRef.current = null;
    bgBitmapRef.current?.close();
    bgBitmapRef.current = null;
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      paintCanvas(cornersRef.current);
    };
    img.src = objectURL;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectURL]);

  // ── Synchronous canvas paint ──────────────────────────
  const paintCanvas = useCallback(
    (currentCorners: BoardCorners | null) => {
      const img = imgRef.current;
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!img || !canvas || !container) return;

      const containerW = container.clientWidth;
      const containerH = container.clientHeight;
      const { width: rawW, height: rawH } = rawDimsRef.current;

      const scale = Math.min(containerW / rawW, containerH / rawH, 1);
      const dw = Math.round(rawW * scale);
      const dh = Math.round(rawH * scale);

      if (canvas.width !== dw || canvas.height !== dh) {
        canvas.width = dw;
        canvas.height = dh;
        bgBitmapRef.current?.close();
        bgBitmapRef.current = null;
      }

      const ctx = canvas.getContext('2d')!;

      if (bgBitmapRef.current) {
        ctx.drawImage(bgBitmapRef.current, 0, 0);
      } else {
        ctx.drawImage(img, 0, 0, dw, dh);
        if (typeof createImageBitmap !== 'undefined') {
          createImageBitmap(canvas).then(bmp => {
            bgBitmapRef.current?.close();
            bgBitmapRef.current = bmp;
          });
        }
      }

      if (currentCorners) {
        const pts = currentCorners.map(([x, y]: [number, number]) => [x * scale, y * scale]);

        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < 4; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.closePath();
        ctx.strokeStyle = 'rgba(0, 140, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();

        const COLORS = ['#ff4444', '#ffaa00', '#ff4444', '#ffaa00'];
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.arc(pts[i][0], pts[i][1], CORNER_HANDLE_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = COLORS[i];
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    },
    [rawDimsRef]
  );

  // Repaint when corners state changes
  useLayoutEffect(() => {
    paintCanvas(corners);
  }, [corners, paintCanvas]);

  // ── Canvas pointer events ─────────────────────────────

  const getImagePos = useCallback(
    (e: React.PointerEvent): [number, number] => {
      const canvas = canvasRef.current!;
      const rect = canvas.getBoundingClientRect();
      const { width: rawW, height: rawH } = rawDimsRef.current;
      return [
        ((e.clientX - rect.left) / rect.width) * rawW,
        ((e.clientY - rect.top) / rect.height) * rawH,
      ];
    },
    [rawDimsRef]
  );

  const setCursor = useCallback((cursor: string) => {
    const c = canvasRef.current;
    if (c) c.style.cursor = cursor;
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!cornersRef.current) return;
      const canvas = canvasRef.current!;
      const rect = canvas.getBoundingClientRect();
      const { width: rawW } = rawDimsRef.current;
      const cssToRaw = rawW / rect.width;
      const [mx, my] = getImagePos(e);
      const hr = CORNER_HIT_RADIUS * cssToRaw;
      const idx = nearCornerIdx(mx, my, cornersRef.current, hr);
      if (idx >= 0) {
        const [cx, cy] = cornersRef.current[idx];
        dragOffsetRef.current = [cx - mx, cy - my];
        dragIdxRef.current = idx;
        setCursor('grabbing');
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        e.preventDefault();
      }
    },
    [getImagePos, setCursor, rawDimsRef, cornersRef]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const canvas = canvasRef.current;
      const rect = canvas?.getBoundingClientRect();
      const { width: rawW } = rawDimsRef.current;
      const cssToRaw = rect ? rawW / rect.width : 1;
      const di = dragIdxRef.current;

      if (di === null && cornersRef.current) {
        const [mx, my] = getImagePos(e);
        const hr = CORNER_HIT_RADIUS * cssToRaw;
        const idx = nearCornerIdx(mx, my, cornersRef.current, hr);
        setCursor(idx >= 0 ? 'grab' : 'crosshair');
      }

      if (di === null || !cornersRef.current || !rawImage) return;
      e.preventDefault();
      const [mx, my] = getImagePos(e);
      const [ox, oy] = dragOffsetRef.current;
      const clamped: [number, number] = [
        Math.max(0, Math.min(rawImage.width - 1, mx + ox)),
        Math.max(0, Math.min(rawImage.height - 1, my + oy)),
      ];
      const updated = [...cornersRef.current] as BoardCorners;
      updated[di] = clamped;
      cornersRef.current = updated;
      paintCanvas(updated);
    },
    [rawImage, paintCanvas, getImagePos, setCursor, rawDimsRef, cornersRef]
  );

  const onPointerUp = useCallback(
    (_e: React.PointerEvent) => {
      if (dragIdxRef.current === null) return;
      dragIdxRef.current = null;
      setCursor('crosshair');
      const finalCorners = cornersRef.current;
      if (finalCorners) {
        const ordered = orderCorners(finalCorners);
        setCorners(ordered);
        setHints([]);
        setGridClicks([]);
        setSettingGrid(false);
        scheduleReclassify(ordered);
      }
    },
    [scheduleReclassify, setCursor, setCorners, setHints, setGridClicks, setSettingGrid, cornersRef]
  );

  return {
    canvasRef,
    containerRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
}
