/**
 * The submit loop of a full-game analysis run, apart from React so that how a
 * run ends (done, stopped, failed) is decided in one place and tested.
 */

import type { AnalysisQueue, AnalysisRequest, SubmitOptions } from '@kaya/ai-engine';
import type { TFunction } from 'i18next';
import { isAbortError } from '../../utils/aiAnalysis';

/** What the analysis bar says about the last full-game run, once it ended. */
export type FullGameNotice =
  { kind: 'all-analyzed'; count: number } | { kind: 'failed'; message: string };

export function formatFullGameNotice(notice: FullGameNotice, t: TFunction): string {
  return notice.kind === 'all-analyzed'
    ? `✓ ${t('analysis.allPositionsAnalyzed', { count: notice.count })}`
    : t('analysis.fullGameFailed', { message: notice.message });
}

export type FullGameRunOutcome =
  { status: 'done' } | { status: 'stopped' } | { status: 'failed'; message: string };

export interface FullGamePosition {
  /** Index of the position in the analysed sequence. */
  index: number;
  request: AnalysisRequest;
}

export interface FullGameSlice {
  positions: FullGamePosition[];
  /** Wall time the slice took, in milliseconds. */
  durationMs: number;
}

/**
 * Submit the positions slice by slice: a batch per slice for the policy-only
 * fast path, one request at a time otherwise. A cancelled request (the user
 * stopped, or a newer run replaced this one) stops the run; any other error
 * fails it, and the caller must say so.
 *
 * `submitOpts` is the scheduling lane for every slice (batch + cancel tag);
 * it is independent of whether the slice uses submit or submitBatch.
 */
export async function runFullGameSlices(
  queue: Pick<AnalysisQueue, 'submit' | 'submitBatch'>,
  positions: FullGamePosition[],
  {
    batchSize,
    onSlice,
    submitOpts,
  }: {
    batchSize: number;
    onSlice: (slice: FullGameSlice) => void;
    submitOpts: SubmitOptions;
  }
): Promise<FullGameRunOutcome> {
  const useBatch = batchSize > 1;

  for (let i = 0; i < positions.length; i += batchSize) {
    const slice = positions.slice(i, i + batchSize);
    const start = performance.now();

    try {
      if (useBatch && slice.length > 1) {
        const handles = queue.submitBatch(
          slice.map(p => p.request),
          submitOpts
        );
        await Promise.all(handles.map(h => h.result));
      } else {
        for (const p of slice) {
          await queue.submit(p.request, submitOpts).result;
        }
      }
    } catch (err) {
      if (isAbortError(err)) return { status: 'stopped' };
      console.error('[BatchAnalysis] Slice failed:', err);
      return { status: 'failed', message: err instanceof Error ? err.message : String(err) };
    }

    onSlice({ positions: slice, durationMs: performance.now() - start });
  }

  return { status: 'done' };
}
