/**
 * I18nProvider Component
 *
 * Wraps the application with react-i18next I18nProvider and handles
 * locale initialization and switching.
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { I18nextProvider } from 'react-i18next';
import { i18n, type Locale, locales, loadLocale, detectLocale, defaultLocale } from './index';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => Promise<void>;
  locales: typeof locales;
  isLoading: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

interface I18nProviderProps {
  children: ReactNode;
}

/**
 * Inner component that syncs i18n language changes with React state
 */
function I18nSync({ children }: { children: ReactNode }): React.ReactElement {
  const [locale, setLocaleState] = useState<Locale>(() => {
    // Initialize from i18n's current language
    const currentLang = i18n.language;
    return (currentLang in locales ? currentLang : defaultLocale) as Locale;
  });
  const [isLoading, setIsLoading] = useState(true);

  // Initialize on mount
  useEffect(() => {
    const init = async () => {
      const detectedLocale = detectLocale();
      await loadLocale(detectedLocale);
      setLocaleState(detectedLocale);
      setIsLoading(false);
    };
    init();
  }, []);

  // Listen to i18n language changes - use the actual i18n instance from the module
  // (not the wrapped one from useTranslation which may have issues with event listeners in v16+)
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      if (lng in locales) {
        setLocaleState(lng as Locale);
      }
    };

    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  const setLocale = useCallback(
    async (newLocale: Locale) => {
      if (newLocale === locale) return;

      setIsLoading(true);
      try {
        await loadLocale(newLocale);
        // The languageChanged event will update the state
      } finally {
        setIsLoading(false);
      }
    },
    [locale]
  );

  const contextValue: I18nContextValue = {
    locale,
    setLocale,
    locales,
    isLoading,
  };

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
}

export function I18nProvider({ children }: I18nProviderProps): React.ReactElement {
  return (
    <I18nextProvider i18n={i18n}>
      <I18nSync>{children}</I18nSync>
    </I18nextProvider>
  );
}
