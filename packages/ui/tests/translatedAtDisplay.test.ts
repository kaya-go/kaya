/**
 * Two strings were shown in English in every language: the description of the
 * catalog model in the model library, and the toast for a game too large to
 * autosave. Both are now translation keys, resolved where they are shown.
 */

import { describe, test, expect } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { BASE_MODELS } from '../src/hooks/game/ai-analysis-types';

import en from '../../i18n/src/locales/en.json';
import zh from '../../i18n/src/locales/zh.json';
import ko from '../../i18n/src/locales/ko.json';
import ja from '../../i18n/src/locales/ja.json';
import fr from '../../i18n/src/locales/fr.json';
import de from '../../i18n/src/locales/de.json';
import es from '../../i18n/src/locales/es.json';
import it from '../../i18n/src/locales/it.json';

const LOCALES = { en, zh, ko, ja, fr, de, es, it };

/** Locales where `key` (dotted path) has no text. */
function missingIn(key: string): string[] {
  return Object.entries(LOCALES)
    .filter(([, messages]) => {
      const value = key
        .split('.')
        .reduce<unknown>(
          (node, part) => (node as Record<string, unknown> | undefined)?.[part],
          messages
        );
      return typeof value !== 'string' || value.length === 0;
    })
    .map(([locale]) => locale);
}

describe('strings translated where they are shown', () => {
  test('every catalog model description is translated in every locale', () => {
    for (const model of BASE_MODELS) {
      expect({ key: model.descriptionKey, missing: missingIn(model.descriptionKey) }).toEqual({
        key: model.descriptionKey,
        missing: [],
      });
    }
  });

  test('the autosave limit toast is translated in every locale', () => {
    expect(missingIn('toast.autoSaveTooLarge')).toEqual([]);
  });

  test('neither app hardcodes the autosave toast', () => {
    for (const app of ['web', 'desktop']) {
      const source = readFileSync(
        join(import.meta.dir, `../../../apps/${app}/src/App.tsx`),
        'utf8'
      );
      expect(source).not.toContain('too large for auto-save');
      expect(source).toContain("t('toast.autoSaveTooLarge')");
    }
  });
});
