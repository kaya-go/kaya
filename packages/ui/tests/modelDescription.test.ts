/**
 * The model library showed "User uploaded model", stored in English at upload
 * time, as the description of every custom model in every language. The text
 * is now chosen at display time, so rows stored that way read translated too.
 */

import { describe, test, expect } from 'bun:test';
import type { TFunction } from 'i18next';
import { modelDescription } from '../src/utils/modelDescription';

import en from '../../i18n/src/locales/en.json';
import zh from '../../i18n/src/locales/zh.json';
import ko from '../../i18n/src/locales/ko.json';
import ja from '../../i18n/src/locales/ja.json';
import fr from '../../i18n/src/locales/fr.json';
import de from '../../i18n/src/locales/de.json';
import es from '../../i18n/src/locales/es.json';
import it from '../../i18n/src/locales/it.json';

const LOCALES = { en, zh, ko, ja, fr, de, es, it };

/** A translator over one locale file, keyed by dotted path. */
function translator(messages: unknown): TFunction {
  return ((key: string) =>
    key
      .split('.')
      .reduce<unknown>(
        (node, part) => (node as Record<string, unknown> | undefined)?.[part],
        messages
      ) ?? key) as unknown as TFunction;
}

describe('modelDescription', () => {
  test('a custom model stored with the English text reads in the current language', () => {
    const stored = { description: 'User uploaded model', isUserModel: true };
    expect(modelDescription(stored, translator(fr))).toBe(fr.aiConfig.customModelDescription);
    expect(modelDescription(stored, translator(ja))).toBe(ja.aiConfig.customModelDescription);
  });

  test('a custom model uploaded now, with no stored text, gets the same label', () => {
    expect(modelDescription({ description: '', isUserModel: true }, translator(de))).toBe(
      de.aiConfig.customModelDescription
    );
  });

  test('a catalog model keeps its own description', () => {
    expect(modelDescription({ description: 'Latest checkpoint' }, translator(fr))).toBe(
      'Latest checkpoint'
    );
  });

  test('every locale translates the label', () => {
    for (const [locale, messages] of Object.entries(LOCALES)) {
      const label = (messages.aiConfig as Record<string, string>).customModelDescription;
      expect(label ? null : locale).toBeNull();
    }
  });
});
