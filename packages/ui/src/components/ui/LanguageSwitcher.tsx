/**
 * LanguageSwitcher Component
 *
 * Compact language selector with globe icon and 2-letter code.
 * Dropdown shows flag + full language name.
 */

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LuGlobe, LuCheck, LuChevronDown } from 'react-icons/lu';
import { useI18n } from '@kaya/i18n';
import type { Locale } from '@kaya/i18n';
import './LanguageSwitcher.css';

// Flag emojis for each locale
const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  zh: '🇨🇳',
  ko: '🇰🇷',
  ja: '🇯🇵',
  fr: '🇫🇷',
  de: '🇩🇪',
  es: '🇪🇸',
  it: '🇮🇹',
};

// 2-letter codes for display
const localeCodes: Record<Locale, string> = {
  en: 'EN',
  zh: '中',
  ko: '한',
  ja: '日',
  fr: 'FR',
  de: 'DE',
  es: 'ES',
  it: 'IT',
};

export function LanguageSwitcher(): React.ReactElement {
  const { t } = useTranslation();
  const { locale, setLocale, locales, isLoading } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleSelect = async (newLocale: Locale) => {
    if (newLocale !== locale) {
      await setLocale(newLocale);
    }
    setIsOpen(false);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button
        className="language-switcher-button"
        onClick={handleToggle}
        disabled={isLoading}
        title={`${t('language')}: ${locales[locale]}`}
        aria-label={t('languageSwitcher.changeLanguage')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        type="button"
      >
        <LuGlobe size={16} />
        <span className="language-switcher-code">{localeCodes[locale]}</span>
        <LuChevronDown size={12} className={`language-switcher-chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="language-switcher-dropdown" role="listbox">
          <div className="language-switcher-dropdown-header">
            {t('languageSwitcher.selectLanguage')}
          </div>
          {(Object.entries(locales) as [Locale, string][]).map(([code, name]) => (
            <button
              key={code}
              className={`language-switcher-option ${code === locale ? 'active' : ''}`}
              onClick={() => handleSelect(code)}
              role="option"
              aria-selected={code === locale}
              type="button"
            >
              <span className="language-flag">{localeFlags[code]}</span>
              <span className="language-name">{name}</span>
              <span className="language-code-badge">{localeCodes[code]}</span>
              {code === locale && <LuCheck size={14} className="language-check" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
