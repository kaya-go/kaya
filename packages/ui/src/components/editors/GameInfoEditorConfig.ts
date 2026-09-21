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
  | 'eventName'
  | 'round'
  | 'date'
  | 'place'
  | 'playerBlack'
  | 'rankBlack'
  | 'teamBlack'
  | 'playerWhite'
  | 'rankWhite'
  | 'teamWhite'
  | 'komi'
  | 'handicap'
  | 'rules'
  | 'timeControl'
  | 'overtime'
  | 'result'
  | 'opening'
  | 'annotator'
  | 'source'
  | 'user'
  | 'copyright'
  | 'gameComment';

export interface FieldConfig {
  key: EditableField;
  labelKey: string;
  placeholderKey: string;
  type?: 'text' | 'number' | 'textarea';
  step?: string;
  min?: string;
  max?: string;
  alwaysShow?: boolean;
  fallbackKey?: string;
  hasLinkRender?: boolean;
  dividerBefore?: boolean;
}

export interface TranslatedFieldConfig {
  key: EditableField;
  label: string;
  placeholder: string;
  type?: 'text' | 'number' | 'textarea';
  step?: string;
  min?: string;
  max?: string;
  alwaysShow?: boolean;
  dividerBefore?: boolean;
  renderValue?: (value: string | number | undefined) => React.ReactNode;
}

export const PLAYER_ROW_KEYS = new Set<EditableField>([
  'playerBlack',
  'rankBlack',
  'playerWhite',
  'rankWhite',
]);

export const FIELD_CONFIG_KEYS: FieldConfig[] = [
  {
    key: 'gameName',
    labelKey: 'gameInfo.game',
    placeholderKey: 'gameInfo.untitled',
    alwaysShow: true,
    fallbackKey: 'gameInfo.untitled',
  },
  { key: 'eventName', labelKey: 'gameInfo.event', placeholderKey: 'gameInfo.eventPlaceholder' },
  { key: 'round', labelKey: 'gameInfo.round', placeholderKey: 'gameInfo.roundPlaceholder' },
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
    key: 'teamBlack',
    labelKey: 'gameInfo.blackTeam',
    placeholderKey: 'gameInfo.teamPlaceholder',
  },
  {
    key: 'playerWhite',
    labelKey: 'gameInfo.white',
    placeholderKey: 'gameInfo.white',
    alwaysShow: true,
    fallbackKey: 'gameInfo.white',
  },
  { key: 'rankWhite', labelKey: 'gameInfo.whiteRank', placeholderKey: 'gameInfo.rankPlaceholder' },
  {
    key: 'teamWhite',
    labelKey: 'gameInfo.whiteTeam',
    placeholderKey: 'gameInfo.teamPlaceholder',
  },
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
  {
    key: 'overtime',
    labelKey: 'gameInfo.overtime',
    placeholderKey: 'gameInfo.overtimePlaceholder',
  },
  { key: 'result', labelKey: 'gameInfo.result', placeholderKey: 'gameInfo.resultPlaceholder' },
  { key: 'opening', labelKey: 'gameInfo.opening', placeholderKey: 'gameInfo.openingPlaceholder' },
  {
    key: 'annotator',
    labelKey: 'gameInfo.annotator',
    placeholderKey: 'gameInfo.annotatorPlaceholder',
    dividerBefore: true,
  },
  {
    key: 'source',
    labelKey: 'gameInfo.source',
    placeholderKey: 'gameInfo.sourcePlaceholder',
    hasLinkRender: true,
  },
  { key: 'user', labelKey: 'gameInfo.user', placeholderKey: 'gameInfo.userPlaceholder' },
  {
    key: 'copyright',
    labelKey: 'gameInfo.copyright',
    placeholderKey: 'gameInfo.copyrightPlaceholder',
    hasLinkRender: true,
  },
  {
    key: 'gameComment',
    labelKey: 'gameInfo.gameComment',
    placeholderKey: 'gameInfo.gameCommentPlaceholder',
    type: 'textarea',
    hasLinkRender: true,
  },
];
