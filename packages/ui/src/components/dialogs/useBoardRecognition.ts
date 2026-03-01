/**
 * useBoardRecognition – manages the board recognition worker lifecycle,
 * image loading, detection, and reclassification logic.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type {
  BoardCorners,
  CalibrationHint,
  Point,
  RecognitionResult,
  RawImage,
} from '@kaya/board-recognition';
import { orderCorners, buildSGF, mapStonesToGrid } from '@kaya/board-recognition';
import { BoardRecognitionWorker } from '../../workers/BoardRecognitionWorker';
import { isTauriApp } from '@kaya/platform';

const RECLASSIFY_DEBOUNCE_MS = 350;

/** Max dimension for the working image used in warp / classify. */
const MAX_WORKING_DIM = 1600;

export const PRESET_SIZES: number[] = [9, 13, 19];

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

type BoardSize = number;

export interface BoardRecognitionState {
  rawImage: RawImage | null;
  objectURL: string | null;
  corners: BoardCorners | null;
  setCorners: React.Dispatch<React.SetStateAction<BoardCorners | null>>;
  result: RecognitionResult | null;
  setResult: React.Dispatch<React.SetStateAction<RecognitionResult | null>>;
  analyzing: boolean;
  warping: boolean;
  loadError: string | null;
  mokuReady: boolean;
  mokuLoading: boolean;
  mokuProgress: number;
  gridCorners: BoardCorners | null;
  setGridCorners: React.Dispatch<React.SetStateAction<BoardCorners | null>>;
  gridCornersRef: React.MutableRefObject<BoardCorners | null>;
  hints: CalibrationHint[];
  setHints: React.Dispatch<React.SetStateAction<CalibrationHint[]>>;
  scheduleReclassify: (newCorners: BoardCorners) => void;
  reclassifyWithHints: (newHints: CalibrationHint[]) => void;
  doReclassifyNow: (
    srcCorners: BoardCorners,
    gc: BoardCorners | null,
    h: CalibrationHint[]
  ) => void;
  handleMokuThresholdChange: (newThreshold: number) => void;
  rawDimsRef: React.MutableRefObject<{ width: number; height: number }>;
  cornersRef: React.MutableRefObject<BoardCorners | null>;
}

export function useBoardRecognition(
  file: File,
  boardSize: BoardSize | null,
  detectionBackend: 'classic' | 'moku',
  mokuThreshold: number,
  setMokuThreshold: React.Dispatch<React.SetStateAction<number>>
): BoardRecognitionState {
  const { t } = useTranslation();

  // ── State ──────────────────────────────────────────────
  const [rawImage, setRawImage] = useState<RawImage | null>(null);
  const [objectURL, setObjectURL] = useState<string | null>(null);
  const [corners, setCorners] = useState<BoardCorners | null>(null);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [warping, setWarping] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [mokuReady, setMokuReady] = useState(false);
  const [mokuLoading, setMokuLoading] = useState(false);
  const [mokuProgress, setMokuProgress] = useState(0);
  const [gridCorners, setGridCorners] = useState<BoardCorners | null>(null);
  const [hints, setHints] = useState<CalibrationHint[]>([]);

  // ── Refs ───────────────────────────────────────────────
  const rawDimsRef = useRef({ width: 1, height: 1 });
  const objectURLRef = useRef<string | null>(null);
  const cornersRef = useRef<BoardCorners | null>(null);
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
    setMokuProgress(0);

    // Compute wasmPath — match AIEngineContext pattern for Tauri compatibility
    const envPrefix = (import.meta as any).env?.VITE_ASSET_PREFIX;
    let wasmPath: string;
    if (isTauriApp()) {
      wasmPath = '/wasm/';
    } else if (envPrefix && envPrefix !== '/') {
      wasmPath = envPrefix.endsWith('/') ? `${envPrefix}wasm/` : `${envPrefix}/wasm/`;
    } else {
      wasmPath = new URL('wasm/', document.baseURI || window.location.href).href;
    }

    workerRef.current
      .mokuInit({ wasmPath }, progress => {
        if (!cancelled) setMokuProgress(progress);
      })
      .then(() => {
        if (!cancelled) {
          setMokuReady(true);
          setMokuLoading(false);
          setMokuProgress(1);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMokuLoading(false);
          setMokuProgress(0);
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
    setHints([]);

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
        if (r.estimatedGridCorners) {
          setGridCorners(r.estimatedGridCorners);
          gridCornersRef.current = r.estimatedGridCorners;
        }
        setAnalyzing(false);
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError(t('boardRecognition.analysisError'));
          setAnalyzing(false);
        }
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
            if (r.estimatedGridCorners) {
              setGridCorners(r.estimatedGridCorners);
              gridCornersRef.current = r.estimatedGridCorners;
            }
            setHints([]);
            setAnalyzing(false);
          })
          .catch(() => {
            if (reclassifySeqRef.current === seq) setAnalyzing(false);
          });
      }, RECLASSIFY_DEBOUNCE_MS);
    },
    [detectionBackend, mokuReady, rawImage, boardSize, setMokuThreshold]
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

        // Defer the expensive warp to the worker
        warpDebounceRef.current = setTimeout(() => {
          if (reclassifySeqRef.current !== seq || !workerRef.current) return;
          setWarping(true);
          workerRef.current
            .warpOnly(rawImage.data, rawImage.width, rawImage.height, newCorners, 800, insetDst)
            .then(r => {
              if (reclassifySeqRef.current !== seq) return;
              setResult(prev => (prev ? { ...prev, warpedImage: r.warpedImage } : prev));
            })
            .catch(() => {
              /* ignore stale/cancelled */
            })
            .finally(() => {
              if (reclassifySeqRef.current === seq) setWarping(false);
            });
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
            if (r.estimatedGridCorners) {
              setGridCorners(r.estimatedGridCorners);
              gridCornersRef.current = r.estimatedGridCorners;
            }
            setAnalyzing(false);
          })
          .catch(() => {
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
          setAnalyzing(false);
        })
        .catch(() => {
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
          setAnalyzing(false);
        })
        .catch(() => {
          if (reclassifySeqRef.current === seq) setAnalyzing(false);
        });
    },
    [rawImage, boardSize]
  );

  return {
    rawImage,
    objectURL,
    corners,
    setCorners,
    result,
    setResult,
    analyzing,
    warping,
    loadError,
    mokuReady,
    mokuLoading,
    mokuProgress,
    gridCorners,
    setGridCorners,
    gridCornersRef,
    hints,
    setHints,
    scheduleReclassify,
    reclassifyWithHints,
    doReclassifyNow,
    handleMokuThresholdChange,
    rawDimsRef,
    cornersRef,
  };
}
