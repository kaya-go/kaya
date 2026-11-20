/**
 * useRecognitionWorker – the shared board recognition worker, and its Moku
 * detector loaded once for every dialog that opens.
 */
import { useEffect, useRef, useState, type RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { MOKU_BUNDLED_MODEL_FILE } from '@kaya/board-recognition';
import { isTauriApp } from '@kaya/platform';
import type { BoardRecognitionWorker } from '../../../../workers/BoardRecognitionWorker';
import {
  acquireSharedWorker,
  releaseSharedWorker,
  isSharedMokuReady,
  markSharedMokuReady,
} from '../../../../workers/BoardRecognitionWorker';
import { loadMokuCustomModel } from '../../../../services/mokuModelStorage';

/** Where the ONNX Runtime wasm files are served, as AIEngineContext finds them. */
function mokuWasmPath(): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const envPrefix = (import.meta as any).env?.VITE_ASSET_PREFIX;
  if (isTauriApp()) return '/wasm/';
  if (envPrefix && envPrefix !== '/') {
    return envPrefix.endsWith('/') ? `${envPrefix}wasm/` : `${envPrefix}/wasm/`;
  }
  return new URL('wasm/', document.baseURI || window.location.href).href;
}

/**
 * Holds the shared worker in `workerRef` while mounted, and loads its Moku
 * detector unless a previous dialog already did.
 */
export function useRecognitionWorker(
  workerRef: RefObject<BoardRecognitionWorker | null>,
  detectionModelSource: 'default' | 'custom',
  onLoadError: (message: string) => void
) {
  const { t } = useTranslation();

  // A detector a previous dialog loaded is ready from the first render. Learnt
  // in an effect instead, it came too late for the load effect below, which
  // started a load the next render then abandoned: "Loading AI model…" for good.
  const [mokuReady, setMokuReady] = useState(isSharedMokuReady);
  const [mokuLoading, setMokuLoading] = useState(false);
  const [mokuProgress, setMokuProgress] = useState(() => (isSharedMokuReady() ? 1 : 0));

  const onLoadErrorRef = useRef(onLoadError);
  useEffect(() => {
    onLoadErrorRef.current = onLoadError;
  }, [onLoadError]);

  // ── Worker lifecycle (shared singleton with idle timeout) ───────
  useEffect(() => {
    workerRef.current = acquireSharedWorker();
    return () => {
      releaseSharedWorker();
      workerRef.current = null;
    };
  }, [workerRef]);

  // ── Init moku detector ─────────────────────────────
  useEffect(() => {
    const worker = workerRef.current;
    if (!worker || mokuReady) return;
    let cancelled = false;
    setMokuLoading(true);
    setMokuProgress(0);

    const initWorker = async () => {
      let modelData: ArrayBuffer | undefined;
      if (detectionModelSource === 'custom') {
        const customModel = await loadMokuCustomModel();
        if (customModel) {
          modelData = customModel;
        }
      }

      await worker.mokuInit(
        {
          wasmPath: mokuWasmPath(),
          ...(isTauriApp() &&
            !modelData && { bundledModelUrl: `/models/${MOKU_BUNDLED_MODEL_FILE}` }),
        },
        progress => {
          if (!cancelled) setMokuProgress(progress);
        },
        modelData
      );
    };

    initWorker()
      .then(() => {
        // The worker holds the detector even if this dialog closed meanwhile.
        markSharedMokuReady(worker);
        if (!cancelled) {
          setMokuReady(true);
          setMokuLoading(false);
          setMokuProgress(1);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setMokuLoading(false);
          setMokuProgress(0);
          const reason = err instanceof Error ? err.message : String(err);
          console.error('[BoardRecognition] Moku init failed:', reason);
          onLoadErrorRef.current(t('boardRecognition.mokuError', { reason }));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [workerRef, mokuReady, t, detectionModelSource]);

  return { mokuReady, mokuLoading, mokuProgress };
}
