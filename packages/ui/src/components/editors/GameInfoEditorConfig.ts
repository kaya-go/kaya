/**
 * GameInfoEditor configuration - types, field config, and utilities
 */

import React from 'react';

// Helper function to detect and render URLs as clickable links
export const renderTextWithLinks = (text: string): React.ReactNode[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return React.createElement(
        'a',
        {
          key: index,
          href: part,
          target: '_blank',
          rel: 'noopener noreferrer',
          className: 'game-info-link',
        },
        part
      );
    }
    return part;
  });
};

export type EditableField =
  | 'gameName'
  | 'date'
  | 'place'
  | 'playerBlack'
  | 'rankBlack'
  | 'playerWhite'
  | 'rankWhite'
  | 'komi'
  | 'handicap'
  | 'rules'
  | 'timeControl'
  | 'result';

export interface FieldConfig {
  key: EditableField;
  labelKey: string;
  placeholderKey: string;
  type?: 'text' | 'number';
  step?: string;
  min?: string;
  max?: string;
  alwaysShow?: boolean;
  fallbackKey?: string;
  hasLinkRender?: boolean;
}

export interface TranslatedFieldConfig {
  key: EditableField;
  label: string;
  placeholder: string;
  type?: 'text' | 'number';
  step?: string;
  min?: string;
  max?: string;
  alwaysShow?: boolean;
  renderValue?: (value: string | number | undefined) => React.ReactNode;
}

export const FIELD_CONFIG_KEYS: FieldConfig[] = [
  {
    key: 'gameName',
    labelKey: 'gameInfo.game',
    placeholderKey: 'gameInfo.untitled',
    alwaysShow: true,
    fallbackKey: 'gameInfo.untitled',
  },
  { key: 'date', labelKey: 'gameInfo.date', placeholderKey: 'gameInfo.datePlaceholder' },
  {
    key: 'place',
    labelKey: 'gameInfo.place',
    placeholderKey: 'gameInfo.placePlaceholder',
    hasLinkRender: true,
  },
  {
    key: 'playerBlack',
    labelKey: 'gameInfo.black',
    placeholderKey: 'gameInfo.black',
    alwaysShow: true,
    fallbackKey: 'gameInfo.black',
  },
  { key: 'rankBlack', labelKey: 'gameInfo.blackRank', placeholderKey: 'gameInfo.rankPlaceholder' },
  {
    key: 'playerWhite',
    labelKey: 'gameInfo.white',
    placeholderKey: 'gameInfo.white',
    alwaysShow: true,
    fallbackKey: 'gameInfo.white',
  },
  { key: 'rankWhite', labelKey: 'gameInfo.whiteRank', placeholderKey: 'gameInfo.rankPlaceholder' },
  {
    key: 'komi',
    labelKey: 'gameInfo.komi',
    placeholderKey: 'gameInfo.komiPlaceholder',
    type: 'number',
    step: '0.5',
    alwaysShow: true,
  },
  {
    key: 'handicap',
    labelKey: 'gameInfo.handicap',
    placeholderKey: 'gameInfo.handicapPlaceholder',
    type: 'number',
    min: '0',
    max: '9',
  },
  { key: 'rules', labelKey: 'gameInfo.rules', placeholderKey: 'gameInfo.rulesPlaceholder' },
  { key: 'timeControl', labelKey: 'gameInfo.time', placeholderKey: 'gameInfo.timePlaceholder' },
  { key: 'result', labelKey: 'gameInfo.result', placeholderKey: 'gameInfo.resultPlaceholder' },
];
