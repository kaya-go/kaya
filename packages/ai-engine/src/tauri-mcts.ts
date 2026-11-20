/**
 * Native MCTS searches over IPC (`onnx_analyze_mcts`), cancellable with an
 * AbortSignal: one position, or a batch searched one position at a time.
 *
 * An abort names its search by an id Rust hands out (`onnx_mcts_request_id`):
 * Rust keeps an abort that arrives before the search does, and its ids keep
 * growing across engine rebuilds and webview reloads, where a counter here
 * would start over. See specs/2026-11-20-native-search-abort-and-lock.md.
 */

import type { SignMap } from '@kaya/goboard';
import type { EngineAnalysisOptions } from './base-engine';
import type { MCTSProgress } from './onnx-types';
import type { TauriInvokeFn, TauriListenFn } from './tauri-utils';
import { DEFAULT_KOMI, type AnalysisResult } from './types';

export interface NativeSearchIpc {
  invoke: TauriInvokeFn;
  listen: TauriListenFn | null;
  /** `invoke` for the search itself, which reports a lost engine. */
  invokeAnalysis: <T>(cmd: string, args: Record<string, unknown>) => Promise<T>;
}

/** An "mcts-progress" event: the progress of the search `requestId`. */
type SearchProgress = MCTSProgress & { requestId: number };

interface NativeSearchResult {
  moveSuggestions: {
    move: string;
    probability: number;
    winRate?: number;
    scoreLead?: number;
    visits?: number;
  }[];
  winRate: number;
  scoreLead: number;
  currentTurn: string;
  ownership?: number[];
  visits?: number;
}

/** The `koInfo` a caller passed, as the native side takes it: null without a ko. */
export function nativeKo(
  options: EngineAnalysisOptions
): { sign: number; vertex: [number, number] } | null {
  const koInfo = options.koInfo as { sign: number; vertex: [number, number] } | undefined;
  return koInfo && koInfo.sign !== 0 ? { sign: koInfo.sign, vertex: koInfo.vertex } : null;
}

function abortError(): Error {
  const error = new Error('MCTS search aborted');
  error.name = 'AbortError';
  return error;
}

/** The preemption of a batch, carrying what it finished: one entry per input. */
function batchAbortError(partialResults: (AnalysisResult | null)[]): Error {
  const error = new Error('Batch analysis aborted') as Error & {
    partialResults?: (AnalysisResult | null)[];
  };
  error.name = 'AbortError';
  error.partialResults = partialResults;
  return error;
}

/**
 * One search per position, for a batch that asks for more than one visit.
 *
 * A preemption (the batch's signal) stops it before the next search, with an
 * AbortError whose `partialResults` hold each finished position and null for
 * the rest: the queue caches them, and the re-queued batch skips them. The
 * search the abort cut short came back shallower than asked, and is left out.
 */
export async function runNativeSearches(
  inputs: { signMap: SignMap; options?: EngineAnalysisOptions }[],
  search: (signMap: SignMap, options?: EngineAnalysisOptions) => Promise<AnalysisResult>
): Promise<AnalysisResult[]> {
  const signal = inputs[0]?.options?.signal as AbortSignal | undefined;
  const results: (AnalysisResult | null)[] = inputs.map(() => null);

  for (let i = 0; i < inputs.length; i++) {
    if (signal?.aborted) throw batchAbortError(results);
    const { signMap, options } = inputs[i];
    let result: AnalysisResult;
    try {
      result = await search(signMap, options);
    } catch (e) {
      if (signal?.aborted) throw batchAbortError(results);
      throw e;
    }
    // An abort during the search stops it early, unless it had already done
    // every visit it was asked for.
    const wanted = options?.numVisits ?? 1;
    if (signal?.aborted && (result.visits ?? wanted) < wanted) throw batchAbortError(results);
    results[i] = result;
  }
  return results as AnalysisResult[];
}

export async function runNativeSearch(
  ipc: NativeSearchIpc,
  signMap: SignMap,
  options: EngineAnalysisOptions
): Promise<AnalysisResult> {
  const onProgress = options.onProgress as ((p: MCTSProgress) => void) | undefined;
  const signal = options.signal as AbortSignal | undefined;

  const requestId = await ipc.invoke<number>('onnx_mcts_request_id');
  if (signal?.aborted) throw abortError();

  let unlisten: (() => void) | undefined;
  if (onProgress && ipc.listen) {
    // Every search emits on this one event name, and an event from the search
    // before this one can still arrive: keep this search's own.
    unlisten = await ipc.listen<SearchProgress>('mcts-progress', ({ payload }) => {
      const { requestId: from, ...progress } = payload;
      if (from === requestId) onProgress(progress);
    });
  }

  const abort = () => {
    ipc.invoke('onnx_abort_mcts', { requestId }).catch(() => {});
  };
  signal?.addEventListener('abort', abort, { once: true });

  try {
    // A signal aborted before the listener was attached never fires it.
    if (signal?.aborted) throw abortError();

    // Single IPC call — entire MCTS runs in Rust
    const result = await ipc.invokeAnalysis<NativeSearchResult>('onnx_analyze_mcts', {
      requestId,
      signMap: signMap.map(row => row.map(s => s as number)),
      options: {
        komi: options.komi ?? DEFAULT_KOMI,
        nextToPlay: options.nextToPlay ?? null,
        history: (options.history ?? []).map((m: { color: number; x: number; y: number }) => ({
          color: m.color,
          x: m.x,
          y: m.y,
        })),
        numVisits: options.numVisits ?? 1,
        includeMove: options.includeMove ?? null,
        koInfo: nativeKo(options),
      },
    });

    return {
      moveSuggestions: result.moveSuggestions,
      winRate: result.winRate,
      scoreLead: result.scoreLead,
      currentTurn: result.currentTurn as 'B' | 'W',
      ownership: result.ownership,
      visits: result.visits,
    };
  } catch (e) {
    // Rust answers a search aborted before it started with an error string.
    if (signal?.aborted) throw abortError();
    throw e;
  } finally {
    unlisten?.();
    signal?.removeEventListener('abort', abort);
  }
}
