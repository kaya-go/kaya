import { describe, expect, test } from 'bun:test';
import { createUpdatePrompt, SNOOZE_MS, type AnswerStorage } from '../src/updatePrompt';

function memoryStorage(): AnswerStorage & { data: Map<string, string> } {
  const data = new Map<string, string>();
  return {
    data,
    getItem: key => data.get(key) ?? null,
    setItem: (key, value) => void data.set(key, value),
  };
}

const NOW = 1_800_000_000_000;

describe('web update prompt', () => {
  test('shows for a new build when the user never answered', () => {
    expect(createUpdatePrompt(memoryStorage()).shouldShow('abc', NOW)).toBe(true);
  });

  test('a skipped build never shows again, a later build does', () => {
    const prompt = createUpdatePrompt(memoryStorage());
    prompt.skip('abc');
    expect(prompt.shouldShow('abc', NOW)).toBe(false);
    expect(prompt.shouldShow('abc', NOW + 365 * SNOOZE_MS)).toBe(false);
    expect(prompt.shouldShow('def', NOW)).toBe(true);
  });

  test('snooze hides every build until it expires', () => {
    const prompt = createUpdatePrompt(memoryStorage());
    prompt.snooze(NOW);
    expect(prompt.shouldShow('abc', NOW + SNOOZE_MS - 1)).toBe(false);
    expect(prompt.shouldShow('def', NOW + SNOOZE_MS - 1)).toBe(false);
    expect(prompt.shouldShow('abc', NOW + SNOOZE_MS)).toBe(true);
  });

  test('the answer survives a reload and reaches another tab', () => {
    const storage = memoryStorage();
    const firstTab = createUpdatePrompt(storage);
    const secondTab = createUpdatePrompt(storage);
    firstTab.skip('abc');
    expect(secondTab.shouldShow('abc', NOW)).toBe(false);
    expect(createUpdatePrompt(storage).shouldShow('abc', NOW)).toBe(false);
  });

  test('snoozing keeps an earlier skip', () => {
    const prompt = createUpdatePrompt(memoryStorage());
    prompt.skip('abc');
    prompt.snooze(NOW);
    expect(prompt.shouldShow('abc', NOW + SNOOZE_MS)).toBe(false);
  });

  test('the answer holds in memory when storage is unavailable or throws', () => {
    const throwing: AnswerStorage = {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
    };
    for (const storage of [null, throwing]) {
      const prompt = createUpdatePrompt(storage);
      prompt.skip('abc');
      expect(prompt.shouldShow('abc', NOW)).toBe(false);
      expect(prompt.shouldShow('def', NOW)).toBe(true);
    }
  });

  test('a corrupt stored answer is ignored', () => {
    for (const raw of ['not json', '42', 'null', '{"skippedHash":7,"snoozedUntil":"soon"}']) {
      const storage = memoryStorage();
      storage.data.set('kaya-web-update-prompt', raw);
      expect(createUpdatePrompt(storage).shouldShow('abc', NOW)).toBe(true);
    }
  });
});
