/**
 * useCanvasInteraction – manages the photo canvas: painting the image
 * with corner handles, and pointer events for dragging corners.
 */
import React, { useCallback, useLayoutEffect, useRef } from 'react';
import type { BoardCorners, RawImage } from '@kaya/board-recognition';
import { orderCorners } from '@kaya/board-recognition';

const CORNER_HANDLE_RADIUS = 14;
const CORNER_HIT_RADIUS = 28;
const CROSS_SIZE = 10;
const MAGNIFIER_RADIUS = 60;
const MAGNIFIER_ZOOM = 3;
const MAGNIFIER_OFFSET = 80;
const GRAB_SCALE = 1.45;
const GRAB_ANIM_DURATION = 150; // ms

/** Colors optimized for contrast against Go board (wood tones) images */
const CORNER_COLORS = ['#00e5ff', '#ff4081', '#76ff03', '#ffd740'];

/** Check if a mouse position is near any corner handle. Returns the topmost (last-drawn) match. */
function nearCornerIdx(mx: number, my: number, corners: BoardCorners, hitRadius: number): number {
  let best = -1;
  for (let i = 0; i < 4; i++) {
    const [cx, cy] = corners[i];
    if (Math.hypot(mx - cx, my - cy) < hitRadius) best = i;
  }
  return best;
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
  cancelReclassify: () => void;
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
    cancelReclassify,
    rawDimsRef,
    cornersRef,
  } = options;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const bgBitmapRef = useRef<ImageBitmap | null>(null);
  const isCreatingBitmapRef = useRef(false);
  const dragIdxRef = useRef<number | null>(null);
  const dragOffsetRef = useRef<[number, number]>([0, 0]);
  const dragPosRef = useRef<[number, number] | null>(null);
  const grabAnimRef = useRef<{ startTime: number; rafId: number } | null>(null);
  const grabScaleRef = useRef(1);

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

      // Only invalidate bitmap if size changes significantly to avoid jitter loops
      if (Math.abs(canvas.width - dw) > 1 || Math.abs(canvas.height - dh) > 1) {
        canvas.width = dw;
        canvas.height = dh;
        bgBitmapRef.current?.close();
        bgBitmapRef.current = null;
        isCreatingBitmapRef.current = false;
      }

      const ctx = canvas.getContext('2d')!;

      if (bgBitmapRef.current) {
        ctx.drawImage(bgBitmapRef.current, 0, 0);
      } else {
        ctx.drawImage(img, 0, 0, dw, dh);
        if (typeof createImageBitmap !== 'undefined' && !isCreatingBitmapRef.current) {
          isCreatingBitmapRef.current = true;
          createImageBitmap(canvas)
            .then(bmp => {
              bgBitmapRef.current?.close();
              bgBitmapRef.current = bmp;
              isCreatingBitmapRef.current = false;
              // Force a repaint with the new bitmap
              paintCanvas(cornersRef.current);
            })
            .catch(() => {
              isCreatingBitmapRef.current = false;
            });
        }
      }

      if (currentCorners) {
        const pts = currentCorners.map(([x, y]: [number, number]) => [x * scale, y * scale]);

        // Dashed quadrilateral between corners
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < 4; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.closePath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Corner handles: crosshair + semi-transparent circle border
        for (let i = 0; i < 4; i++) {
          const px = pts[i][0];
          const py = pts[i][1];
          const color = CORNER_COLORS[i];
          const isActive = dragIdxRef.current === i;
          const s = isActive ? grabScaleRef.current : 1;
          const r = CORNER_HANDLE_RADIUS * s;
          const cs = CROSS_SIZE * s;
          const lw = isActive ? 2.5 : 2;

          // Semi-transparent filled circle
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fillStyle = color + (isActive ? '50' : '30');
          ctx.fill();
          ctx.strokeStyle = color;
          ctx.lineWidth = lw;
          ctx.stroke();

          // Crosshair lines
          ctx.strokeStyle = color;
          ctx.lineWidth = lw;
          ctx.beginPath();
          ctx.moveTo(px - cs, py);
          ctx.lineTo(px + cs, py);
          ctx.moveTo(px, py - cs);
          ctx.lineTo(px, py + cs);
          ctx.stroke();
        }

        // Magnifier lens when dragging
        const di = dragIdxRef.current;
        const dragPos = dragPosRef.current;
        if (di !== null && dragPos !== null && img) {
          const [rawX, rawY] = dragPos;
          const sx = rawX * scale;
          const sy = rawY * scale;

          // Position magnifier above/below the drag point to avoid occlusion
          const magY =
            sy - MAGNIFIER_OFFSET - MAGNIFIER_RADIUS > 0
              ? sy - MAGNIFIER_OFFSET
              : sy + MAGNIFIER_OFFSET;
          const magX = Math.max(MAGNIFIER_RADIUS + 4, Math.min(dw - MAGNIFIER_RADIUS - 4, sx));

          ctx.save();
          ctx.beginPath();
          ctx.arc(magX, magY, MAGNIFIER_RADIUS, 0, Math.PI * 2);
          ctx.clip();

          // Draw zoomed image region
          const imgScale = img.naturalWidth / rawDimsRef.current.width;
          const srcSize = MAGNIFIER_RADIUS / (MAGNIFIER_ZOOM * scale);
          const imgSrcSize = srcSize * imgScale;
          const imgX = rawX * imgScale;
          const imgY = rawY * imgScale;
          ctx.drawImage(
            img,
            imgX - imgSrcSize,
            imgY - imgSrcSize,
            imgSrcSize * 2,
            imgSrcSize * 2,
            magX - MAGNIFIER_RADIUS,
            magY - MAGNIFIER_RADIUS,
            MAGNIFIER_RADIUS * 2,
            MAGNIFIER_RADIUS * 2
          );

          // Draw crosshair inside magnifier
          ctx.strokeStyle = CORNER_COLORS[di];
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(magX - 8, magY);
          ctx.lineTo(magX + 8, magY);
          ctx.moveTo(magX, magY - 8);
          ctx.lineTo(magX, magY + 8);
          ctx.stroke();

          ctx.restore();

          // Magnifier border
          ctx.beginPath();
          ctx.arc(magX, magY, MAGNIFIER_RADIUS, 0, Math.PI * 2);
          ctx.strokeStyle = CORNER_COLORS[di];
          ctx.lineWidth = 2.5;
          ctx.stroke();
          // Outer shadow ring
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
          ctx.lineWidth = 1;
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

  /** Start a grab scale-up animation for the active corner handle. */
  const startGrabAnim = useCallback(() => {
    if (grabAnimRef.current) cancelAnimationFrame(grabAnimRef.current.rafId);
    const startTime = performance.now();
    const animate = () => {
      const elapsed = performance.now() - startTime;
      const t = Math.min(1, elapsed / GRAB_ANIM_DURATION);
      // ease-out cubic
      const ease = 1 - (1 - t) * (1 - t) * (1 - t);
      grabScaleRef.current = 1 + (GRAB_SCALE - 1) * ease;
      paintCanvas(cornersRef.current);
      if (t < 1) {
        grabAnimRef.current = { startTime, rafId: requestAnimationFrame(animate) };
      } else {
        grabAnimRef.current = null;
      }
    };
    grabAnimRef.current = { startTime, rafId: requestAnimationFrame(animate) };
  }, [paintCanvas, cornersRef]);

  /** Stop the grab animation and reset scale. */
  const stopGrabAnim = useCallback(() => {
    if (grabAnimRef.current) {
      cancelAnimationFrame(grabAnimRef.current.rafId);
      grabAnimRef.current = null;
    }
    grabScaleRef.current = 1;
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
        // Cancel any pending reclassification so the UI stays fluid
        cancelReclassify();
        const [cx, cy] = cornersRef.current[idx];
        dragOffsetRef.current = [cx - mx, cy - my];
        dragIdxRef.current = idx;
        startGrabAnim();
        setCursor('grabbing');
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        e.preventDefault();
      }
    },
    [getImagePos, setCursor, startGrabAnim, cancelReclassify, rawDimsRef, cornersRef]
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
      dragPosRef.current = clamped;
      paintCanvas(updated);
    },
    [rawImage, paintCanvas, getImagePos, setCursor, rawDimsRef, cornersRef]
  );

  const onPointerUp = useCallback(
    (_e: React.PointerEvent) => {
      if (dragIdxRef.current === null) return;
      stopGrabAnim();
      dragIdxRef.current = null;
      dragPosRef.current = null;
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
    [
      scheduleReclassify,
      setCursor,
      stopGrabAnim,
      setCorners,
      setHints,
      setGridClicks,
      setSettingGrid,
      cornersRef,
    ]
  );

  return {
    canvasRef,
    containerRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
}
