import { describe, expect, test } from 'bun:test';
import {
  applyDownloadEvent,
  NO_PROGRESS,
  progressKey,
  progressPercent,
} from '../src/updateProgress';

describe('update download progress', () => {
  test('accumulates chunks against the announced size', () => {
    let p = applyDownloadEvent(NO_PROGRESS, { event: 'Started', data: { contentLength: 1000 } });
    p = applyDownloadEvent(p, { event: 'Progress', data: { chunkLength: 250 } });
    p = applyDownloadEvent(p, { event: 'Progress', data: { chunkLength: 249 } });
    expect(p).toEqual({ downloaded: 499, total: 1000 });
    expect(progressPercent(p)).toBe(49);
    expect(applyDownloadEvent(p, { event: 'Finished' })).toEqual(p);
  });

  test('has no percentage without a Content-Length', () => {
    const p = applyDownloadEvent(NO_PROGRESS, { event: 'Started', data: {} });
    const q = applyDownloadEvent(p, { event: 'Progress', data: { chunkLength: 2_500_000 } });
    expect(progressPercent(q)).toBeNull();
    expect(progressKey(q)).toBe('2.5 MB');
  });

  test('never reports more than 100%', () => {
    expect(progressPercent({ downloaded: 1200, total: 1000 })).toBe(100);
  });

  test('changes its key only when the display would change', () => {
    const total = 111_796_129;
    expect(progressKey({ downloaded: 1_000_000, total })).toBe(
      progressKey({ downloaded: 1_100_000, total })
    );
    expect(progressKey({ downloaded: 1_000_000, total })).not.toBe(
      progressKey({ downloaded: 1_200_000, total })
    );
  });
});
