/**
 * The requests of one live analysis run, apart from React so that how a run
 * stops is decided in one place and tested.
 */

import type { AnalysisQueue, AnalysisRequest, AnalysisResult } from '@kaya/ai-engine';
import { isAbortError } from '../../utils/aiAnalysis';

export interface LiveRunResult {
  /** The parent position at one visit, the smoothing baseline; null at the root. */
  prev: AnalysisResult | null;
  current: AnalysisResult;
  /** Requests the engine ran; the others were answered from the cache. */
  inferences: number;
}

/**
 * Analyse the parent position at one visit, then the current one at full depth.
 * Aborting `signal` (analysis turned off, or a newer run) cancels the request in
 * flight and submits nothing more, whichever step the run is at. The run then
 * resolves to null, as it does when the queue cancels its request.
 */
export async function runLiveRequests(
  queue: Pick<AnalysisQueue, 'submit' | 'cancel'>,
  { prev, current }: { prev: AnalysisRequest | null; current: AnalysisRequest },
  signal: AbortSignal
): Promise<LiveRunResult | null> {
  let inferences = 0;

  /** The request's result, or null once the run is stopped. */
  const ask = async (request: AnalysisRequest): Promise<AnalysisResult | null> => {
    if (signal.aborted) return null;
    const handle = queue.submit(request);
    const cancel = () => queue.cancel(handle.id);
    signal.addEventListener('abort', cancel, { once: true });
    try {
      const result = await handle.result;
      if (handle.id) inferences++;
      return signal.aborted ? null : result;
    } catch (err) {
      if (isAbortError(err)) return null;
      throw err;
    } finally {
      signal.removeEventListener('abort', cancel);
    }
  };

  let prevResult: AnalysisResult | null = null;
  if (prev) {
    prevResult = await ask(prev);
    if (!prevResult) return null;
  }
  const currentResult = await ask(current);
  if (!currentResult) return null;
  return { prev: prevResult, current: currentResult, inferences };
}
