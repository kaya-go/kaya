/**
 * useBoardRecognition – manages the board recognition worker lifecycle,
 * image loading, detection, and reclassification logic.
 */
import { startTransition, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type {
  BoardCorners,
  CalibrationHint,
  RecognitionResult,
  RawImage,
} from '@kaya/board-recognition';
import type { BoardRecognitionWorker } from '../../../../workers/BoardRecognitionWorker';
import {
  acquireSharedWorker,
  releaseSharedWorker,
  isSharedMokuReady,
  setSharedMokuReady,
} from '../../../../workers/BoardRecognitionWorker';
import { isTauriApp } from '@kaya/platform';
import {
  computeInsetDst,
  buildMokuResult,
  fixResultCorners,
  safeCorners,
  fileToDownscaledImage,
  MAX_WORKING_DIM,
  type BoardRecognitionState,
} from '../utils/boardRecognitionHelpers';

export const PRESET_SIZES: number[] = [9, 13, 19];
export type { BoardRecognitionState };

type BoardSize = number;

export function useBoardRecognition(
  file: File,
  boardSize: BoardSize | null,
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
  const [loadError, setLoadError] = useState<string | null>(null);
  const [mokuReady, setMokuReady] = useState(false);
  const [mokuLoading, setMokuLoading] = useState(false);
  const [mokuProgress, setMokuProgress] = useState(0);
  const [gridCorners, setGridCorners] = useState<BoardCorners | null>(null);
  const [hints, setHints] = useState<CalibrationHint[]>([]);
  const [cornersManuallySet, setCornersManuallySet] = useState(false);

  // ── Refs ───────────────────────────────────────────────
  const rawDimsRef = useRef({ width: 1, height: 1 });
  const objectURLRef = useRef<string | null>(null);
  const cornersRef = useRef<BoardCorners | null>(null);
  const workerRef = useRef<BoardRecognitionWorker | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reclassifySeqRef = useRef(0);
  const gridCornersRef = useRef<BoardCorners | null>(null);
  const mokuThresholdRef = useRef(0.95);

  const autoCornersRef = useRef<BoardCorners | null>(null);
  const hasInitialDetectionRef = useRef(false);
  const cornersManuallySetRef = useRef(false);

  /** Update grid corners state + ref in one call. */
  const updateGrid = (gc: BoardCorners | null) => {
    setGridCorners(gc);
    gridCornersRef.current = gc;
  };

  // ── Worker lifecycle (shared singleton with idle timeout) ───────
  useEffect(() => {
    const w = acquireSharedWorker();
    workerRef.current = w;
    // If moku was already initialized in a previous dialog session, mark ready
    if (isSharedMokuReady()) {
      setMokuReady(true);
      setMokuProgress(1);
    }
    return () => {
      releaseSharedWorker();
      workerRef.current = null;
    };
  }, []);

  // Keep refs in sync with React state
  useEffect(() => {
    cornersRef.current = corners;
  }, [corners]);
  useEffect(() => {
    cornersManuallySetRef.current = cornersManuallySet;
  }, [cornersManuallySet]);
  useEffect(() => {
    mokuThresholdRef.current = mokuThreshold;
  }, [mokuThreshold]);

  // ── Init moku detector ─────────────────────────────
  useEffect(() => {
    if (!workerRef.current || mokuReady) return;
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
      .mokuInit(
        {
          wasmPath,
          ...(isTauriApp() && { bundledModelUrl: '/models/moku-v3.onnx' }),
        },
        progress => {
          if (!cancelled) setMokuProgress(progress);
        }
      )
      .then(() => {
        if (!cancelled) {
          setMokuReady(true);
          setMokuLoading(false);
          setMokuProgress(1);
          setSharedMokuReady(true);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setMokuLoading(false);
          setMokuProgress(0);
          const reason = err instanceof Error ? err.message : String(err);
          console.error('[BoardRecognition] Moku init failed:', reason);
          setLoadError(t('boardRecognition.mokuError', { reason }));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [mokuReady, t]);

  // ── Load & downscale image ────────────────────────────
  useEffect(() => {
    let cancelled = false;
    hasInitialDetectionRef.current = false;
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
    if (!mokuReady) return;

    // If corners were manually placed and we already have cached detections,
    // just re-map stones with the existing manual corners — no worker call needed.
    if (cornersManuallySetRef.current && hasInitialDetectionRef.current && cornersRef.current) {
      const currentCorners = cornersRef.current;
      // Still need to re-filter to get updated raw detections for the new board size
      workerRef.current
        .mokuRefilter({
          boardSize,
          threshold: 1 - mokuThresholdRef.current,
        })
        .then(r => {
          // Update auto-detected corners reference without overwriting manual corners
          const { corners: safe } = fixResultCorners(r, rawImage.width, rawImage.height);
          autoCornersRef.current = safe;
          // Re-map stones using the user's manual corners
          const rebuilt = buildMokuResult(r, currentCorners, boardSize);
          setResult(rebuilt);
          const insetDst = computeInsetDst();
          updateGrid(insetDst);
          setHints([]);
        })
        .catch(() => {});
      return;
    }

    let cancelled = false;
    setAnalyzing(true);
    setResult(null);
    setHints([]);

    // If we already ran inference once, just re-filter cached outputs
    const useRefilter = hasInitialDetectionRef.current;
    const promise = useRefilter
      ? workerRef.current.mokuRefilter({
          boardSize,
          threshold: 1 - mokuThresholdRef.current,
        })
      : workerRef.current.mokuDetect(rawImage.data, rawImage.width, rawImage.height, {
          boardSize,
          threshold: 1 - mokuThresholdRef.current,
        });

    promise
      .then(r => {
        if (cancelled) return;
        hasInitialDetectionRef.current = true;
        const { corners: safe } = fixResultCorners(r, rawImage.width, rawImage.height);
        const cornersChanged = safe !== r.corners;
        autoCornersRef.current = safe;
        setCornersManuallySet(false);
        setCorners(safe);

        if (cornersChanged && r.mokuRawDetections) {
          // Corners were replaced by fallback: re-map stones with corrected corners
          const rebuilt = buildMokuResult(r, safe, boardSize!);
          setResult(rebuilt);
          if (rebuilt.estimatedGridCorners) {
            updateGrid(rebuilt.estimatedGridCorners);
          }
          setAnalyzing(false);
        } else {
          setResult(r);
          if (r.estimatedGridCorners) {
            updateGrid(r.estimatedGridCorners);
          }
          setAnalyzing(false);
        }
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
  }, [rawImage, boardSize, mokuReady, t]);

  // ── Moku sensitivity state update (no commit) ──────────
  const handleMokuThresholdChange = useCallback(
    (newThreshold: number) => {
      setMokuThreshold(newThreshold);
      mokuThresholdRef.current = newThreshold;
    },
    [setMokuThreshold]
  );

  /** Commit sensitivity: re-filter cached inference results (no ONNX re-run). */
  const commitMokuThreshold = useCallback(() => {
    const sensitivity = mokuThresholdRef.current;

    if (!mokuReady || !rawImage || !boardSize || !workerRef.current) return;

    const seq = ++reclassifySeqRef.current;

    workerRef.current
      .mokuRefilter({
        boardSize,
        threshold: 1 - sensitivity,
      })
      .then(r => {
        if (reclassifySeqRef.current !== seq) return;

        // Refilter only re-thresholds stones — corners, grid, and warpedImage
        // are unchanged. Update only the stone-related fields to avoid
        // triggering expensive re-renders of both panels.
        if (cornersManuallySet && cornersRef.current) {
          const remapped = buildMokuResult(
            r,
            cornersRef.current,
            boardSize,
            gridCornersRef.current
          );
          setResult(prev =>
            prev
              ? {
                  ...prev,
                  stones: remapped.stones,
                  sgf: remapped.sgf,
                  mokuRawDetections: remapped.mokuRawDetections,
                }
              : remapped
          );
        } else {
          setResult(prev =>
            prev
              ? {
                  ...prev,
                  stones: r.stones,
                  sgf: r.sgf,
                  mokuRawDetections: r.mokuRawDetections,
                }
              : r
          );
        }
        setHints(prev => (prev.length === 0 ? prev : []));
      })
      .catch(() => {
        // Refilter failed — silently ignore (worker may have been disposed)
      });
  }, [mokuReady, rawImage, boardSize, cornersManuallySet]);

  /** Cancel any pending or in-flight reclassification (called when user starts a new corner drag). */
  const cancelReclassify = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    // Bump sequence so any in-flight worker results are discarded
    ++reclassifySeqRef.current;
    // Cancel pending worker requests
    workerRef.current?.cancelAll();
    setAnalyzing(false);
  }, []);

  // ── Debounced reclassify (called after corner drag) ───
  const scheduleReclassify = useCallback(
    (newCorners: BoardCorners) => {
      if (!rawImage || !boardSize) return;
      setCornersManuallySet(true);

      if (debounceRef.current) clearTimeout(debounceRef.current);

      ++reclassifySeqRef.current;

      // Update stones + grid immediately (cheap)
      if (result?.mokuRawDetections) {
        const partialResult = buildMokuResult(result, newCorners, boardSize);
        const insetDst = computeInsetDst();

        startTransition(() => {
          setResult(partialResult);
          updateGrid(insetDst);
        });
      }
    },
    [rawImage, boardSize, result]
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
          startTransition(() => {
            setResult(r);
            setAnalyzing(false);
          });
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
          startTransition(() => {
            setResult(r);
            setAnalyzing(false);
          });
        })
        .catch(() => {
          if (reclassifySeqRef.current === seq) setAnalyzing(false);
        });
    },
    [rawImage, boardSize]
  );

  // ── Reset corners to auto-detected positions ──
  const resetCornersToAuto = useCallback(() => {
    const autoCorners = autoCornersRef.current;
    if (!autoCorners || !rawImage || !boardSize) return;
    setCornersManuallySet(false);
    setCorners(autoCorners);
    cornersRef.current = autoCorners;
    setHints([]);
    updateGrid(null);
    // Reclassify without marking as manually set
    if (result?.mokuRawDetections) {
      const insetDst = computeInsetDst();
      const resetResult = buildMokuResult(result, autoCorners, boardSize, insetDst);
      setResult(resetResult);
      updateGrid(insetDst);
    }
  }, [rawImage, boardSize, result, setCorners]);

  return {
    rawImage,
    objectURL,
    corners,
    setCorners,
    result,
    setResult,
    analyzing,
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
    cancelReclassify,
    reclassifyWithHints,
    doReclassifyNow,
    handleMokuThresholdChange,
    commitMokuThreshold,
    rawDimsRef,
    cornersRef,
    cornersManuallySet,
    resetCornersToAuto,
  };
}
