/**
 * Every auto-pick reason must be translatable in every locale.
 *
 * The ids live in `@kaya/ai-engine` and the pill renders them as
 * `aiConfig.backendReason.<reason>`. Nothing else couples the two lists, so a
 * new id without translations would silently fall back to the backend name in
 * every language instead of failing loudly. The labels also have to stay short:
 * the pill shares the settings header with the close button.
 */

import { describe, test, expect } from 'bun:test';
// From source, not the package entry: that resolves to the built `dist`, so the
// test would need `build:packages` first and could check a stale list.
import { AUTO_PICK_REASONS } from '../../ai-engine/src/auto-config';

import en from '../../i18n/src/locales/en.json';
import zh from '../../i18n/src/locales/zh.json';
import ko from '../../i18n/src/locales/ko.json';
import ja from '../../i18n/src/locales/ja.json';
import fr from '../../i18n/src/locales/fr.json';
import de from '../../i18n/src/locales/de.json';
import es from '../../i18n/src/locales/es.json';
import it from '../../i18n/src/locales/it.json';

const LOCALES = { en, zh, ko, ja, fr, de, es, it };
const MAX_LABEL_LENGTH = 24;
const KNOWN = new Set<string>(AUTO_PICK_REASONS);

function reasonsFor(messages: unknown): Record<string, string> {
  return (messages as { aiConfig: { backendReason: Record<string, string> } }).aiConfig
    .backendReason;
}

describe('aiConfig.backendReason coverage', () => {
  test('every locale translates every auto-pick reason', () => {
    const problems: string[] = [];
    for (const [locale, messages] of Object.entries(LOCALES)) {
      const reasons = reasonsFor(messages);
      for (const reason of AUTO_PICK_REASONS) {
        if (!reasons[reason]) problems.push(`${locale}: missing "${reason}"`);
      }
    }
    expect(problems).toEqual([]);
  });

  test('no locale carries a reason the engine cannot produce', () => {
    const problems: string[] = [];
    for (const [locale, messages] of Object.entries(LOCALES)) {
      for (const key of Object.keys(reasonsFor(messages))) {
        if (!KNOWN.has(key)) problems.push(`${locale}: unexpected "${key}"`);
      }
    }
    expect(problems).toEqual([]);
  });

  test(`labels stay within ${MAX_LABEL_LENGTH} chars so the pill is not clipped`, () => {
    // A rough proxy: the real constraint is rendered width, and CJK and Latin
    // glyphs hit it at very different character counts ("WASM (네이티브 없음)" is
    // 15 chars but 122px). The CSS clips as a backstop either way.
    const problems: string[] = [];
    for (const [locale, messages] of Object.entries(LOCALES)) {
      for (const [reason, label] of Object.entries(reasonsFor(messages))) {
        if (label.length > MAX_LABEL_LENGTH) {
          problems.push(`${locale}.${reason}: ${label.length} chars — "${label}"`);
        }
      }
    }
    expect(problems).toEqual([]);
  });
});
