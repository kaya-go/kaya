import type { DownloadEvent } from '@tauri-apps/plugin-updater';

export interface DownloadProgress {
  downloaded: number;
  /** From Content-Length; null when the server didn't send one. */
  total: number | null;
}

export const NO_PROGRESS: DownloadProgress = { downloaded: 0, total: null };

export function applyDownloadEvent(
  progress: DownloadProgress,
  event: DownloadEvent
): DownloadProgress {
  switch (event.event) {
    case 'Started':
      return { downloaded: 0, total: event.data.contentLength ?? null };
    case 'Progress':
      return { ...progress, downloaded: progress.downloaded + event.data.chunkLength };
    case 'Finished':
      return progress;
  }
}

/** Whole percent, capped at 100, or null when the size is unknown. */
export function progressPercent({ downloaded, total }: DownloadProgress): number | null {
  if (!total) return null;
  return Math.min(100, Math.floor((downloaded / total) * 100));
}

/**
 * What the progress display shows, as a key that only changes when the display
 * does. The plugin reports every network chunk — about 7,000 for the macOS
 * bundle — so re-rendering on each one would be wasted work.
 */
export function progressKey(progress: DownloadProgress): string {
  const percent = progressPercent(progress);
  return percent === null ? `${toMegabytes(progress.downloaded)} MB` : `${percent}%`;
}

export function toMegabytes(bytes: number): string {
  return (bytes / 1_000_000).toFixed(1);
}
