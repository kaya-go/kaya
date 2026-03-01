/**
 * BoardRecognitionDialog – lets the user:
 *  1. Select the board size (9 / 13 / 19) before analysis
 *  2. Review & drag the auto-detected corner handles to correct perspective
 *  3. See the warped board preview with detected stones overlaid
 *  4. Click stones on the preview to calibrate the classifier
 *  5. Import the result as an SGF
 *
 * Heavy image processing runs in a Web Worker so the UI stays responsive.
 */
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type {
  BoardCorners,
  CalibrationHint,
  DetectedStone,
  Point,
  RecognitionResult,
  RawImage,
  StoneColor,
} from '@kaya/board-recognition';
import { orderCorners, buildSGF, warpPerspective, mapStonesToGrid } from '@kaya/board-recognition';
import { BoardRecognitionWorker } from '../../workers/BoardRecognitionWorker';
import './BoardRecognitionDialog.css';

// ──────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────

type BoardSize = 9 | 13 | 19;
type CalibrationMode = 'black' | 'white' | 'empty' | null;

interface Props {
  file: File;
  onImport: (sgf: string, filename: string) => void;
  onClose: () => void;
}

// ──────────────────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────────────────

/** Max dimension for the working image used in warp / classify. */
const MAX_WORKING_DIM = 1600;
const RECLASSIFY_DEBOUNCE_MS = 350;
const CORNER_HANDLE_RADIUS = 12;
const CORNER_HIT_RADIUS = 28;
const WARP_SIZE = 800;

// ──────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────

/** Load a File into an RGBA pixel buffer, downscaled to maxDim. */
async function fileToDownscaledImage(
  file: File,
  maxDim: number
): Promise<{ raw: RawImage; objectURL: string }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, w, h);
      const id = ctx.getImageData(0, 0, w, h);
      resolve({
        raw: { data: id.data, width: w, height: h },
        objectURL: url,
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
}

function rawImageToDataURL(raw: RawImage): string {
  const canvas = document.createElement('canvas');
  canvas.width = raw.width;
  canvas.height = raw.height;
  const ctx = canvas.getContext('2d')!;
  const id = ctx.createImageData(raw.width, raw.height);
  id.data.set(raw.data);
  ctx.putImageData(id, 0, 0);
  return canvas.toDataURL();
}

/** Check if a mouse position is near any corner handle. */
function nearCornerIdx(mx: number, my: number, corners: BoardCorners, hitRadius: number): number {
  for (let i = 0; i < 4; i++) {
    const [cx, cy] = corners[i];
    if (Math.hypot(mx - cx, my - cy) < hitRadius) return i;
  }
  return -1;
}

// ──────────────────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────────────────

export const BoardRecognitionDialog: React.FC<Props> = ({ file, onImport, onClose }) => {
  const { t } = useTranslation();

  // ── State ──────────────────────────────────────────────
  const [boardSize, setBoardSize] = useState<BoardSize | null>(null);
  const [rawImage, setRawImage] = useState<RawImage | null>(null);
  const [objectURL, setObjectURL] = useState<string | null>(null);
  const [corners, setCorners] = useState<BoardCorners | null>(null);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [warpedURL, setWarpedURL] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [canvasCursor, setCanvasCursor] = useState('default');

  // Calibration state
  const [calibrationMode, setCalibrationMode] = useState<CalibrationMode>(null);
  const [hints, setHints] = useState<CalibrationHint[]>([]);

  // Grid corner alignment state (phase 2)
  const [gridCorners, setGridCorners] = useState<BoardCorners | null>(null);
  const [gridClicks, setGridClicks] = useState<Point[]>([]);
  const [settingGrid, setSettingGrid] = useState(false);

  // Detection backend state
  const [detectionBackend, setDetectionBackend] = useState<'classic' | 'moku'>('moku');
  const [mokuThreshold, setMokuThreshold] = useState(0.05);
  const [mokuReady, setMokuReady] = useState(false);
  const [mokuLoading, setMokuLoading] = useState(false);

  // ── Refs ───────────────────────────────────────────────
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef(1); // canvas pixel scale (rawImage → canvas px), used in paintCanvas
  const imgRef = useRef<HTMLImageElement | null>(null);
  const rawDimsRef = useRef({ width: 1, height: 1 });
  const objectURLRef = useRef<string | null>(null);
  const cornersRef = useRef<BoardCorners | null>(null);
  const dragOffsetRef = useRef<[number, number]>([0, 0]);
  const workerRef = useRef<BoardRecognitionWorker | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warpDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reclassifySeqRef = useRef(0);
  const boardSizeRef = useRef<BoardSize | null>(null);
  const gridCornersRef = useRef<BoardCorners | null>(null);
  const mokuThresholdRef = useRef(0.05);
  const thresholdDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Worker lifecycle ──────────────────────────────────
  useEffect(() => {
    const w = new BoardRecognitionWorker();
    workerRef.current = w;
    return () => {
      w.dispose();
      workerRef.current = null;
      if (thresholdDebounceRef.current) clearTimeout(thresholdDebounceRef.current);
    };
  }, []);

  // Keep refs in sync with React state
  useEffect(() => {
    cornersRef.current = corners;
  }, [corners]);
  useEffect(() => {
    boardSizeRef.current = boardSize;
  }, [boardSize]);
  useEffect(() => {
    gridCornersRef.current = gridCorners;
  }, [gridCorners]);
  useEffect(() => {
    mokuThresholdRef.current = mokuThreshold;
  }, [mokuThreshold]);

  // ── Init moku detector when backend switches ─────────
  useEffect(() => {
    if (detectionBackend !== 'moku' || !workerRef.current || mokuReady) return;
    let cancelled = false;
    setMokuLoading(true);
    workerRef.current
      .mokuInit()
      .then(() => {
        if (!cancelled) {
          setMokuReady(true);
          setMokuLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMokuLoading(false);
          setLoadError(t('boardRecognition.mokuError'));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [detectionBackend, mokuReady, t]);

  // ── Load & downscale image ────────────────────────────
  useEffect(() => {
    let cancelled = false;
    fileToDownscaledImage(file, MAX_WORKING_DIM)
      .then(({ raw, objectURL: url }) => {
        if (cancelled) {
          URL.revokeObjectURL(url);
          return;
        }
        setRawImage(raw);
        rawDimsRef.current = { width: raw.width, height: raw.height };
        objectURLRef.current = url;
        setObjectURL(url);
      })
      .catch(() => {
        if (!cancelled) setLoadError(t('boardRecognition.loadError'));
      });
    return () => {
      cancelled = true;
      if (objectURLRef.current) URL.revokeObjectURL(objectURLRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, t]);

  // ── Run recognition when boardSize + rawImage ready ───
  useEffect(() => {
    if (!rawImage || !boardSize || !workerRef.current) return;
    if (detectionBackend === 'moku' && !mokuReady) return;

    let cancelled = false;
    setAnalyzing(true);
    setResult(null);
    setWarpedURL(null);
    setHints([]);
    setCalibrationMode(null);

    const promise =
      detectionBackend === 'moku'
        ? workerRef.current.mokuDetect(rawImage.data, rawImage.width, rawImage.height, {
            boardSize,
            threshold: mokuThresholdRef.current,
          })
        : workerRef.current.recognizeBoard(rawImage.data, rawImage.width, rawImage.height, {
            boardSize,
          });

    promise
      .then(r => {
        if (cancelled) return;
        setCorners(r.corners);
        setResult(r);
        setWarpedURL(rawImageToDataURL(r.warpedImage));
        if (r.estimatedGridCorners) {
          setGridCorners(r.estimatedGridCorners);
          gridCornersRef.current = r.estimatedGridCorners;
        }
      })
      .catch(() => {
        if (!cancelled) setLoadError(t('boardRecognition.analysisError'));
      })
      .finally(() => {
        if (!cancelled) setAnalyzing(false);
      });

    return () => {
      cancelled = true;
    };
  }, [rawImage, boardSize, detectionBackend, mokuReady, t]);

  // ── Debounced moku threshold re-detection ────────────
  const handleMokuThresholdChange = useCallback(
    (newThreshold: number) => {
      setMokuThreshold(newThreshold);
      mokuThresholdRef.current = newThreshold;

      if (
        detectionBackend !== 'moku' ||
        !mokuReady ||
        !rawImage ||
        !boardSize ||
        !workerRef.current
      )
        return;

      if (thresholdDebounceRef.current) clearTimeout(thresholdDebounceRef.current);

      const seq = ++reclassifySeqRef.current;
      thresholdDebounceRef.current = setTimeout(() => {
        if (!workerRef.current) return;
        setAnalyzing(true);

        workerRef.current
          .mokuDetect(rawImage.data, rawImage.width, rawImage.height, {
            boardSize,
            threshold: newThreshold,
          })
          .then(r => {
            if (reclassifySeqRef.current !== seq) return;
            setCorners(r.corners);
            setResult(r);
            setWarpedURL(rawImageToDataURL(r.warpedImage));
            if (r.estimatedGridCorners) {
              setGridCorners(r.estimatedGridCorners);
              gridCornersRef.current = r.estimatedGridCorners;
            }
            setHints([]);
          })
          .catch(() => {
            /* ignore stale/cancelled */
          })
          .finally(() => {
            if (reclassifySeqRef.current === seq) setAnalyzing(false);
          });
      }, RECLASSIFY_DEBOUNCE_MS);
    },
    [detectionBackend, mokuReady, rawImage, boardSize]
  );

  // ── Debounced reclassify (called after corner drag) ───
  const scheduleReclassify = useCallback(
    (newCorners: BoardCorners) => {
      if (!rawImage || !boardSize) return;

      if (debounceRef.current) clearTimeout(debounceRef.current);

      const seq = ++reclassifySeqRef.current;

      // In moku mode: update stones + grid immediately (cheap),
      // defer the expensive warpPerspective to avoid UI freeze.
      if (detectionBackend === 'moku' && result?.mokuRawDetections) {
        if (warpDebounceRef.current) clearTimeout(warpDebounceRef.current);

        const rawDets = result.mokuRawDetections!;
        const stones = mapStonesToGrid(rawDets, newCorners, boardSize);

        // Inset destination so the board has visible margins in the warped output
        const WARP_MARGIN = 0.08;
        const m = Math.round(800 * WARP_MARGIN);
        const insetDst: [Point, Point, Point, Point] = [
          [m, m],
          [799 - m, m],
          [799 - m, 799 - m],
          [m, 799 - m],
        ];
        const grid: BoardCorners = insetDst;

        // Immediately update stones + grid (no warp yet)
        const partialResult: RecognitionResult = {
          ...result,
          boardSize,
          stones,
          corners: newCorners,
          cornersDetected: true,
          sgf: buildSGF(boardSize, stones),
          estimatedGridCorners: grid,
          mokuRawDetections: rawDets,
        };
        setResult(partialResult);
        setGridCorners(grid);
        gridCornersRef.current = grid;

        // Defer the expensive warp
        warpDebounceRef.current = setTimeout(() => {
          if (reclassifySeqRef.current !== seq) return;
          const warped = warpPerspective(rawImage, newCorners, 800, insetDst);
          setResult(prev => (prev ? { ...prev, warpedImage: warped } : prev));
          setWarpedURL(rawImageToDataURL(warped));
        }, RECLASSIFY_DEBOUNCE_MS);
        return;
      }

      // Classic mode: send to worker
      if (!workerRef.current) return;

      debounceRef.current = setTimeout(() => {
        if (!workerRef.current) return;
        setAnalyzing(true);

        workerRef.current
          .reclassifyWithCorners(rawImage.data, rawImage.width, rawImage.height, newCorners, {
            boardSize,
          })
          .then(r => {
            if (reclassifySeqRef.current !== seq) return;
            setResult(r);
            setWarpedURL(rawImageToDataURL(r.warpedImage));
            // Restore estimated grid inset for the new warp
            if (r.estimatedGridCorners) {
              setGridCorners(r.estimatedGridCorners);
              gridCornersRef.current = r.estimatedGridCorners;
            }
          })
          .catch(() => {
            /* ignore stale/cancelled */
          })
          .finally(() => {
            if (reclassifySeqRef.current === seq) setAnalyzing(false);
          });
      }, RECLASSIFY_DEBOUNCE_MS);
    },
    [rawImage, boardSize, detectionBackend, result]
  );

  // ── Reclassify with hints (called after calibration click) ──
  const reclassifyWithHints = useCallback(
    (newHints: CalibrationHint[]) => {
      if (!rawImage || !boardSize || !workerRef.current || !corners) return;

      if (debounceRef.current) clearTimeout(debounceRef.current);

      const seq = ++reclassifySeqRef.current;
      setAnalyzing(true);

      const gc = gridCornersRef.current;
      const opts = gc ? { boardSize, gridCorners: gc } : { boardSize };

      workerRef.current
        .reclassifyWithHints(
          rawImage.data,
          rawImage.width,
          rawImage.height,
          corners,
          newHints,
          opts
        )
        .then(r => {
          if (reclassifySeqRef.current !== seq) return;
          setResult(r);
          setWarpedURL(rawImageToDataURL(r.warpedImage));
        })
        .catch(() => {
          /* ignore stale/cancelled */
        })
        .finally(() => {
          if (reclassifySeqRef.current === seq) setAnalyzing(false);
        });
    },
    [rawImage, boardSize, corners]
  );

  // ── Reclassify with grid corners ──
  const doReclassifyNow = useCallback(
    (srcCorners: BoardCorners, gc: BoardCorners | null, h: CalibrationHint[]) => {
      if (!rawImage || !boardSize || !workerRef.current) return;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      const seq = ++reclassifySeqRef.current;
      setAnalyzing(true);

      const opts = gc ? { boardSize, gridCorners: gc } : { boardSize };
      const promise =
        h.length > 0
          ? workerRef.current.reclassifyWithHints(
              rawImage.data,
              rawImage.width,
              rawImage.height,
              srcCorners,
              h,
              opts
            )
          : workerRef.current.reclassifyWithCorners(
              rawImage.data,
              rawImage.width,
              rawImage.height,
              srcCorners,
              opts
            );

      promise
        .then(r => {
          if (reclassifySeqRef.current !== seq) return;
          setResult(r);
          setWarpedURL(rawImageToDataURL(r.warpedImage));
        })
        .catch(() => {
          /* ignore stale/cancelled */
        })
        .finally(() => {
          if (reclassifySeqRef.current === seq) setAnalyzing(false);
        });
    },
    [rawImage, boardSize]
  );

  // ── Load display image into imgRef ────────────────────
  useEffect(() => {
    if (!objectURL) return;
    imgRef.current = null;
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      paintCanvas(cornersRef.current);
    };
    img.src = objectURL;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectURL]);

  // ── Synchronous canvas paint ──────────────────────────
  const paintCanvas = useCallback((currentCorners: BoardCorners | null) => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!img || !canvas || !container) return;

    const containerW = container.clientWidth;
    const containerH = container.clientHeight;
    const { width: rawW, height: rawH } = rawDimsRef.current;

    // Scale so the image fits in the container; use rawImage dimensions
    // so that scaleRef maps rawImage coords ↔ canvas coords correctly.
    const scale = Math.min(containerW / rawW, containerH / rawH, 1);
    scaleRef.current = scale;
    const dw = Math.round(rawW * scale);
    const dh = Math.round(rawH * scale);

    if (canvas.width !== dw || canvas.height !== dh) {
      canvas.width = dw;
      canvas.height = dh;
    }

    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0, dw, dh);

    if (currentCorners) {
      const pts = currentCorners.map(([x, y]: [number, number]) => [x * scale, y * scale]);

      // Board boundary outline
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < 4; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.strokeStyle = 'rgba(0, 140, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Corner handles
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
  }, []);

  // Repaint when corners state changes
  useEffect(() => {
    paintCanvas(corners);
  }, [corners, paintCanvas]);
  useLayoutEffect(() => {
    paintCanvas(corners);
  }, [corners, paintCanvas]);

  // ── Canvas pointer events ─────────────────────────────

  const getImagePos = useCallback((e: React.PointerEvent): [number, number] => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const { width: rawW, height: rawH } = rawDimsRef.current;
    // Map from CSS pixels to rawImage coordinates directly,
    // accounting for any CSS scaling of the canvas element.
    return [
      ((e.clientX - rect.left) / rect.width) * rawW,
      ((e.clientY - rect.top) / rect.height) * rawH,
    ];
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!cornersRef.current) return;
      const canvas = canvasRef.current!;
      const rect = canvas.getBoundingClientRect();
      const { width: rawW } = rawDimsRef.current;
      const cssToRaw = rawW / rect.width; // pixels per CSS pixel
      const [mx, my] = getImagePos(e);
      const hr = CORNER_HIT_RADIUS * cssToRaw;
      const idx = nearCornerIdx(mx, my, cornersRef.current, hr);
      if (idx >= 0) {
        const [cx, cy] = cornersRef.current[idx];
        dragOffsetRef.current = [cx - mx, cy - my];
        setDragIdx(idx);
        setCanvasCursor('grabbing');
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        e.preventDefault();
      }
    },
    [getImagePos]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const canvas = canvasRef.current;
      const rect = canvas?.getBoundingClientRect();
      const { width: rawW } = rawDimsRef.current;
      const cssToRaw = rect ? rawW / rect.width : 1;

      if (dragIdx === null && cornersRef.current) {
        const [mx, my] = getImagePos(e);
        const hr = CORNER_HIT_RADIUS * cssToRaw;
        const idx = nearCornerIdx(mx, my, cornersRef.current, hr);
        setCanvasCursor(idx >= 0 ? 'grab' : 'crosshair');
      }

      if (dragIdx === null || !cornersRef.current || !rawImage) return;
      e.preventDefault();
      const [mx, my] = getImagePos(e);
      const [ox, oy] = dragOffsetRef.current;
      const clamped: [number, number] = [
        Math.max(0, Math.min(rawImage.width - 1, mx + ox)),
        Math.max(0, Math.min(rawImage.height - 1, my + oy)),
      ];
      const updated = [...cornersRef.current] as BoardCorners;
      updated[dragIdx] = clamped;
      cornersRef.current = updated;
      paintCanvas(updated);
    },
    [dragIdx, rawImage, paintCanvas, getImagePos]
  );

  const onPointerUp = useCallback(
    (_e: React.PointerEvent) => {
      if (dragIdx === null) return;
      setDragIdx(null);
      setCanvasCursor('crosshair');
      const finalCorners = cornersRef.current;
      if (finalCorners) {
        const ordered = orderCorners(finalCorners);
        setCorners(ordered);
        // Clear hints and user grid clicks — they're no longer valid for the new warp.
        // gridCorners will be auto-reset to the new estimate by scheduleReclassify callback.
        setHints([]);
        setGridClicks([]);
        setSettingGrid(false);
        scheduleReclassify(ordered);
      }
    },
    [dragIdx, scheduleReclassify]
  );

  // ── Grid corner click handler (phase 2) ───────────────
  const onGridClick = useCallback(
    (warpX: number, warpY: number) => {
      const pt: Point = [warpX, warpY];

      // If gridCorners already set, replace the nearest corner (fine-tuning)
      if (gridCorners) {
        let bestIdx = 0,
          bestDist = Infinity;
        for (let i = 0; i < 4; i++) {
          const d = Math.hypot(warpX - gridCorners[i][0], warpY - gridCorners[i][1]);
          if (d < bestDist) {
            bestDist = d;
            bestIdx = i;
          }
        }
        const updated = [...gridCorners] as BoardCorners;
        updated[bestIdx] = pt;
        setGridCorners(updated);
        gridCornersRef.current = updated;
        setHints([]);
        if (corners) doReclassifyNow(corners, updated, []);
        return;
      }

      // Accumulate clicks until we have 4
      const next = [...gridClicks, pt];
      if (next.length >= 4) {
        const ordered = orderCorners(next.slice(0, 4));
        setGridCorners(ordered);
        gridCornersRef.current = ordered;
        setGridClicks([]);
        setHints([]);
        if (corners) doReclassifyNow(corners, ordered, []);
      } else {
        setGridClicks(next);
      }
    },
    [gridClicks, gridCorners, corners, doReclassifyNow]
  );

  const toggleGridMode = useCallback(() => {
    if (settingGrid) {
      setSettingGrid(false);
      setGridClicks([]);
    } else {
      setSettingGrid(true);
      setGridClicks([]);
      setCalibrationMode(null);
    }
  }, [settingGrid]);

  const resetGrid = useCallback(() => {
    setGridCorners(null);
    gridCornersRef.current = null;
    setGridClicks([]);
    setSettingGrid(false);
    setHints([]);
    if (corners) doReclassifyNow(corners, null, []);
  }, [corners, doReclassifyNow]);

  // ── Preview click for calibration ─────────────────────
  const onPreviewClick = useCallback(
    (col: number, row: number) => {
      if (!calibrationMode || !boardSize || !result) return;

      const color: StoneColor | 'empty' = calibrationMode;
      const newHint: CalibrationHint = { x: col, y: row, color };

      // Replace or add hint for this intersection
      const updated = hints.filter(h => !(h.x === col && h.y === row));
      updated.push(newHint);
      setHints(updated);

      if (detectionBackend === 'moku') {
        // In moku mode, apply hints directly to the stones array
        // without re-running any engine
        const baseStones = result.stones.filter(
          s => !updated.some(h => h.x === s.x && h.y === s.y)
        );
        const addedStones = updated
          .filter(h => h.color !== 'empty')
          .map(h => ({ x: h.x, y: h.y, color: h.color as StoneColor }));
        const newStones = [...baseStones, ...addedStones];
        const newResult: RecognitionResult = {
          ...result,
          stones: newStones,
          sgf: buildSGF(result.boardSize as 9 | 13 | 19, newStones),
        };
        setResult(newResult);
      } else {
        reclassifyWithHints(updated);
      }
    },
    [calibrationMode, boardSize, hints, reclassifyWithHints, detectionBackend, result]
  );

  // ── Import ────────────────────────────────────────────
  const handleImport = useCallback(() => {
    if (!result) return;
    const baseName = file.name.replace(/\.[^.]+$/, '');
    onImport(result.sgf, `${baseName}.sgf`);
  }, [result, file.name, onImport]);

  // ── Board size buttons ────────────────────────────────
  const SIZES: BoardSize[] = [9, 13, 19];

  return (
    <div
      className="brd-overlay"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="brd-dialog">
        {/* Header */}
        <div className="brd-header">
          <h2 className="brd-title">{t('boardRecognition.title')}</h2>
          <button className="brd-close" onClick={onClose} aria-label={t('close')}>
            ✕
          </button>
        </div>

        {/* Board size selector */}
        <div className="brd-size-row">
          <span className="brd-size-label">{t('boardRecognition.selectSize')}</span>
          {SIZES.map(s => (
            <button
              key={s}
              className={`brd-size-btn${boardSize === s ? ' active' : ''}`}
              onClick={() => setBoardSize(s)}
            >
              {s}×{s}
            </button>
          ))}
          <span className="brd-size-sep" />
          <span className="brd-size-label">{t('boardRecognition.backend')}</span>
          <button
            className={`brd-size-btn${detectionBackend === 'classic' ? ' active' : ''}`}
            onClick={() => setDetectionBackend('classic')}
          >
            {t('boardRecognition.backendClassic')}
          </button>
          <button
            className={`brd-size-btn${detectionBackend === 'moku' ? ' active' : ''}`}
            onClick={() => setDetectionBackend('moku')}
          >
            {t('boardRecognition.backendMoku')}
          </button>
          {detectionBackend === 'moku' && (
            <>
              {mokuLoading && (
                <span className="brd-moku-status brd-moku-loading">
                  {t('boardRecognition.loadingModel')}
                </span>
              )}
              {mokuReady && (
                <>
                  <span className="brd-size-label brd-threshold-label">
                    {t('boardRecognition.threshold')}
                  </span>
                  <input
                    type="range"
                    className="brd-threshold-slider"
                    min={0.01}
                    max={0.99}
                    step={0.01}
                    value={mokuThreshold}
                    onChange={e => handleMokuThresholdChange(Number(e.target.value))}
                  />
                  <span className="brd-threshold-value">{mokuThreshold.toFixed(2)}</span>
                </>
              )}
            </>
          )}
        </div>

        {loadError && <div className="brd-error">{loadError}</div>}

        <div className="brd-body">
          {/* Left: original image with draggable corners */}
          <div className="brd-panel brd-panel-photo">
            <div className="brd-panel-title">{t('boardRecognition.photo')}</div>
            <div className="brd-canvas-wrap" ref={containerRef}>
              {objectURL ? (
                <canvas
                  ref={canvasRef}
                  className="brd-canvas"
                  style={{
                    cursor: dragIdx !== null ? 'grabbing' : corners ? canvasCursor : 'default',
                    touchAction: 'none',
                  }}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                />
              ) : (
                <div className="brd-placeholder">{t('loading.loading')}</div>
              )}
            </div>
            {corners && <div className="brd-hint">{t('boardRecognition.dragHint')}</div>}
          </div>

          {/* Right: warped board preview */}
          <div className="brd-panel brd-panel-preview">
            <div className="brd-panel-title">{t('boardRecognition.preview')}</div>
            <div className="brd-preview-wrap">
              {analyzing && (
                <div className="brd-analyzing">
                  <div className="brd-spinner" />
                  <span>{t('boardRecognition.analyzing')}</span>
                </div>
              )}
              {!analyzing && !boardSize && (
                <div className="brd-placeholder">{t('boardRecognition.chooseSizeFirst')}</div>
              )}
              {!analyzing && boardSize && warpedURL && result && (
                <BoardPreview
                  warpedURL={warpedURL}
                  result={result}
                  hints={hints}
                  calibrationMode={calibrationMode}
                  onIntersectionClick={onPreviewClick}
                  gridCorners={gridCorners}
                  settingGrid={settingGrid}
                  gridClicks={gridClicks}
                  onGridClick={onGridClick}
                />
              )}
            </div>

            {/* Grid alignment + Calibration toolbar + stats */}
            {result && !analyzing && (
              <div className="brd-calibration-area">
                <div className="brd-stats">
                  <span className="brd-stat black">
                    ● {result.stones.filter((s: DetectedStone) => s.color === 'black').length}
                  </span>
                  <span className="brd-stat white">
                    ○ {result.stones.filter((s: DetectedStone) => s.color === 'white').length}
                  </span>
                  {!result.cornersDetected && (
                    <span className="brd-warn">{t('boardRecognition.cornersManual')}</span>
                  )}
                </div>
                <div className="brd-calibration-row">
                  <span className="brd-calibration-label">{t('boardRecognition.alignGrid')}</span>
                  <button
                    className={`brd-cal-btn brd-cal-grid${settingGrid ? ' active' : ''}`}
                    onClick={toggleGridMode}
                    title={t('boardRecognition.alignGrid')}
                  >
                    ⊞
                  </button>
                  {gridCorners && (
                    <button
                      className="brd-cal-btn brd-cal-reset"
                      onClick={resetGrid}
                      title={t('boardRecognition.resetGrid')}
                    >
                      ↺
                    </button>
                  )}
                  <span className="brd-calibration-sep" />
                  <span className="brd-calibration-label">{t('boardRecognition.calibrate')}</span>
                  <button
                    className={`brd-cal-btn brd-cal-black${calibrationMode === 'black' ? ' active' : ''}`}
                    onClick={() => {
                      setCalibrationMode(calibrationMode === 'black' ? null : 'black');
                      setSettingGrid(false);
                      setGridClicks([]);
                    }}
                    title={t('boardRecognition.markBlack')}
                  >
                    ●
                  </button>
                  <button
                    className={`brd-cal-btn brd-cal-white${calibrationMode === 'white' ? ' active' : ''}`}
                    onClick={() => {
                      setCalibrationMode(calibrationMode === 'white' ? null : 'white');
                      setSettingGrid(false);
                      setGridClicks([]);
                    }}
                    title={t('boardRecognition.markWhite')}
                  >
                    ○
                  </button>
                  <button
                    className={`brd-cal-btn brd-cal-empty${calibrationMode === 'empty' ? ' active' : ''}`}
                    onClick={() => {
                      setCalibrationMode(calibrationMode === 'empty' ? null : 'empty');
                      setSettingGrid(false);
                      setGridClicks([]);
                    }}
                    title={t('boardRecognition.markEmpty')}
                  >
                    ✕
                  </button>
                  {hints.length > 0 && (
                    <button
                      className="brd-cal-btn brd-cal-reset"
                      onClick={() => {
                        setHints([]);
                        if (corners) doReclassifyNow(corners, gridCornersRef.current, []);
                      }}
                      title={t('boardRecognition.resetCalibration')}
                    >
                      ↺
                    </button>
                  )}
                </div>
                {settingGrid && (
                  <div className="brd-hint">
                    {gridCorners
                      ? t('boardRecognition.gridFineTuneHint')
                      : t('boardRecognition.gridClickHint', { count: gridClicks.length })}
                  </div>
                )}
                {calibrationMode && !settingGrid && (
                  <div className="brd-hint">{t('boardRecognition.calibrateHint')}</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="brd-footer">
          <button className="brd-btn brd-btn-cancel" onClick={onClose}>
            {t('cancel')}
          </button>
          <button
            className="brd-btn brd-btn-import"
            onClick={handleImport}
            disabled={!result || analyzing}
          >
            {t('boardRecognition.importSGF')}
          </button>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────
// Sub-component: warped board preview with stone overlay
// ──────────────────────────────────────────────────────────

interface PreviewProps {
  warpedURL: string;
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

const BoardPreview: React.FC<PreviewProps> = ({
  warpedURL,
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
  const imgCacheRef = useRef<HTMLImageElement | null>(null);

  const paint = useCallback(
    (img: HTMLImageElement) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const size = canvas.clientWidth || 360;
      canvas.width = size;
      canvas.height = size;
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
        ctx.fillStyle =
          h.color === 'black' ? '#00e5ff' : h.color === 'white' ? '#ff6600' : '#44ff44';
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
    },
    [result, hints, gridCorners, gridClicks, settingGrid]
  );

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imgCacheRef.current = img;
      paint(img);
    };
    img.src = warpedURL;
  }, [warpedURL, paint]);

  useEffect(() => {
    if (imgCacheRef.current) paint(imgCacheRef.current);
  }, [hints, paint, gridCorners, gridClicks, settingGrid]);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const size = canvas.clientWidth || 360;
      const scale = size / WARP_SIZE;
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

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
