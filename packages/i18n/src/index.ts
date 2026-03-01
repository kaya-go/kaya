/**
 * i18n Configuration for Kaya
 *
 * Uses react-i18next for internationalization.
 * Supported locales: en, zh, ko, ja, fr, de, es, it
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import all translations statically to ensure they're bundled correctly
import en from './locales/en.json';
import zh from './locales/zh.json';
import ko from './locales/ko.json';
import ja from './locales/ja.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import es from './locales/es.json';
import it from './locales/it.json';

export const locales = {
  en: 'English',
  zh: '中文',
  ko: '한국어',
  ja: '日本語',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
  it: 'Italiano',
} as const;

export type Locale = keyof typeof locales;

export const defaultLocale: Locale = 'en';

// Storage key for persisting locale preference
const LOCALE_STORAGE_KEY = 'kaya-locale';

/**
 * Detect the user's preferred locale
 */
export function detectLocale(): Locale {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && stored in locales) {
      return stored as Locale;
    }

    const browserLang = navigator.language.split('-')[0];
    if (browserLang in locales) {
      return browserLang as Locale;
    }
  }

  return defaultLocale;
}

// Type for nested translation resources - i18next expects ResourceKey which allows nested objects
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TranslationResource = Record<string, any>;

// Map of all locale translations (statically imported)
const localeMessages: Record<Locale, TranslationResource> = {
  en,
  zh,
  ko,
  ja,
  fr,
  de,
  es,
  it,
};

/**
 * Load messages for a locale
 */
export async function loadLocale(locale: Locale): Promise<void> {
  if (!i18n.hasResourceBundle(locale, 'translation')) {
    const messages = localeMessages[locale];
    if (messages) {
      i18n.addResourceBundle(locale, 'translation', messages);
    }
  }

  await i18n.changeLanguage(locale);

  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }
}

/**
 * Get the current active locale
 */
export function getLocale(): Locale {
  return (i18n.language as Locale) || defaultLocale;
}

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
  },
  lng: detectLocale(),
  fallbackLng: defaultLocale,
  interpolation: {
    escapeValue: false, // React already escapes
  },
  react: {
    useSuspense: false, // Disable suspense to avoid issues with lazy loading
    bindI18n: 'languageChanged loaded', // Re-render on language change
    bindI18nStore: 'added removed', // Re-render when resources change
  },
});

export { i18n };

// Re-export provider and hook
export { I18nProvider, useI18n } from './I18nProvider';
