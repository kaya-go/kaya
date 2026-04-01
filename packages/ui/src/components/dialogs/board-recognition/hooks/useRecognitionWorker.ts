import { useEffect, useRef } from 'react';
import { BoardRecognitionWorker } from '../../../../workers/BoardRecognitionWorker';

export function useRecognitionWorker(
  detectionBackend: 'moku' | 'classic',
  mokuReady: boolean,
  onMokuReady: () => void,
  onMokuLoading: (progress: number) => void,
  onMokuError: (reason: string) => void
) {
  const workerRef = useRef<BoardRecognitionWorker | null>(null);

  useEffect(() => {
    const w = new BoardRecognitionWorker();
    workerRef.current = w;
    return () => {
      w.dispose();
      workerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (detectionBackend !== 'moku' || !workerRef.current || mokuReady) return;
    let cancelled = false;

    setTimeout(() => {
      if (cancelled) return;
      onMokuLoading(0);
      workerRef.current
        ?.mokuInit(undefined, progress => {
          if (!cancelled) onMokuLoading(progress);
        })
        .then(() => {
          if (!cancelled) onMokuReady();
        })
        .catch((err: unknown) => {
          if (!cancelled) {
            const reason = err instanceof Error ? err.message : String(err);
            onMokuError(reason);
          }
        });
    }, 50);

    return () => {
      cancelled = true;
    };
  }, [detectionBackend, mokuReady, onMokuReady, onMokuLoading, onMokuError]);

  return workerRef;
}
