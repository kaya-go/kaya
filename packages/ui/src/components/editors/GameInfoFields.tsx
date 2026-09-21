/**
 * GameInfoFields - Sub-components for rendering editable fields in GameInfoEditor
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import type { EditableField, TranslatedFieldConfig } from './GameInfoEditorConfig';

type EditElement = HTMLInputElement | HTMLTextAreaElement;

interface InlineEditInputProps {
  inputRef?: React.RefObject<EditElement | null>;
  type?: 'text' | 'number' | 'textarea';
  step?: string;
  min?: string;
  max?: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<EditElement>) => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<EditElement>) => void;
  placeholder?: string;
}

const InlineEditInput: React.FC<InlineEditInputProps> = ({
  inputRef,
  type = 'text',
  step,
  min,
  max,
  className = 'inline-edit-input',
  value,
  onChange,
  onBlur,
  onKeyDown,
  placeholder,
}) => {
  const shared = {
    value,
    onChange,
    onBlur,
    onKeyDown,
    onKeyUp: (e: React.KeyboardEvent<EditElement>) => e.stopPropagation(),
    placeholder,
  };

  if (type === 'textarea') {
    return (
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement | null>}
        className={`${className} inline-edit-textarea`}
        rows={3}
        {...shared}
      />
    );
  }

  return (
    <input
      ref={inputRef as React.RefObject<HTMLInputElement | null>}
      type={type}
      step={step}
      min={min}
      max={max}
      className={className}
      {...shared}
    />
  );
};

interface GameInfoFieldProps {
  config: TranslatedFieldConfig;
  value: string | number | undefined;
  isEditMode: boolean;
  isEditing: boolean;
  editValue: string;
  inputRef: React.RefObject<EditElement | null>;
  onEditValueChange: (value: string) => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<EditElement>) => void;
  onFieldClick: (field: EditableField) => void;
}

export const GameInfoField: React.FC<GameInfoFieldProps> = ({
  config,
  value,
  isEditMode,
  isEditing,
  editValue,
  inputRef,
  onEditValueChange,
  onBlur,
  onKeyDown,
  onFieldClick,
}) => {
  const { t } = useTranslation();
  const hasValue = value !== undefined && value !== '' && value !== 0;

  // In normal mode, hide empty fields (unless alwaysShow)
  if (!isEditMode && !config.alwaysShow && !hasValue) {
    return null;
  }

  // Special handling for handicap - only show if > 0 in non-edit mode
  if (config.key === 'handicap' && !isEditMode && (!value || value === 0)) {
    return null;
  }

  // Determine display value
  let displayValue: React.ReactNode;
  if (config.renderValue) {
    displayValue = config.renderValue(value);
  } else if (config.key === 'komi') {
    displayValue = value ?? 6.5;
  } else {
    displayValue = value || null;
  }

  if ((displayValue == null || displayValue === '') && isEditMode && config.key !== 'komi') {
    displayValue = <em className="empty-placeholder">{t('gameInfo.clickToAdd')}</em>;
  }

  const rowClass = [
    'game-info-row',
    'game-info-row-clickable',
    config.dividerBefore ? 'divider-before' : '',
    config.type === 'textarea' ? 'game-info-row-multiline' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const startEdit = (e: React.MouseEvent) => {
    if (isEditing) return;
    if ((e.target as HTMLElement).closest('a')) return;
    onFieldClick(config.key);
  };

  return (
    <div className={rowClass} onClick={startEdit}>
      <strong>{config.label}:</strong>{' '}
      {isEditing ? (
        <InlineEditInput
          inputRef={inputRef}
          type={config.type}
          step={config.step}
          min={config.min}
          max={config.max}
          className={
            config.type === 'number'
              ? 'inline-edit-input'
              : 'inline-edit-input inline-edit-input-grow'
          }
          value={editValue}
          onChange={e => onEditValueChange(e.target.value)}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          placeholder={config.placeholder}
        />
      ) : (
        <span
          className={`editable-field ${isEditMode ? 'edit-mode' : ''} ${
            config.type === 'textarea' ? 'editable-field-multiline' : ''
          }`}
          title={t('gameInfo.clickToEdit')}
        >
          {displayValue}
        </span>
      )}
    </div>
  );
};

interface PlayerRowProps {
  playerKey: 'playerBlack' | 'playerWhite';
  rankKey: 'rankBlack' | 'rankWhite';
  label: string;
  playerValue: string | number | undefined;
  rankValue: string | number | undefined;
  playerConfig: TranslatedFieldConfig;
  rankConfig: TranslatedFieldConfig;
  isEditMode: boolean;
  editingField: EditableField | null;
  editValue: string;
  inputRef: React.RefObject<EditElement | null>;
  onEditValueChange: (value: string) => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<EditElement>) => void;
  onFieldClick: (field: EditableField) => void;
}

export const PlayerRow: React.FC<PlayerRowProps> = ({
  playerKey,
  rankKey,
  label,
  playerValue,
  rankValue,
  playerConfig,
  rankConfig,
  isEditMode,
  editingField,
  editValue,
  inputRef,
  onEditValueChange,
  onBlur,
  onKeyDown,
  onFieldClick,
}) => {
  const { t } = useTranslation();
  const isEditingPlayer = editingField === playerKey;
  const isEditingRank = editingField === rankKey;

  return (
    <div className="game-info-row">
      <strong>{label}:</strong>{' '}
      {isEditingPlayer ? (
        <InlineEditInput
          inputRef={inputRef}
          className="inline-edit-input inline-edit-input-grow"
          value={editValue}
          onChange={e => onEditValueChange(e.target.value)}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          placeholder={playerConfig.placeholder}
        />
      ) : (
        <span
          className={`editable-field ${isEditMode ? 'edit-mode' : ''}`}
          onClick={() => onFieldClick(playerKey)}
          title={t('gameInfo.clickToEditName')}
        >
          {playerValue || (
            <em>{playerKey === 'playerBlack' ? t('gameInfo.black') : t('gameInfo.white')}</em>
          )}
        </span>
      )}
      {(rankValue || isEditMode) && (
        <>
          {' '}
          {isEditingRank ? (
            <>
              (
              <InlineEditInput
                inputRef={inputRef}
                className="inline-edit-input inline-edit-input-small"
                value={editValue}
                onChange={e => onEditValueChange(e.target.value)}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                placeholder={rankConfig.placeholder}
              />
              )
            </>
          ) : (
            <span
              className={`editable-field editable-rank ${isEditMode ? 'edit-mode' : ''}`}
              onClick={() => onFieldClick(rankKey)}
              title={t('gameInfo.clickToEditRank')}
            >
              ({rankValue || <em>{t('gameInfo.rankFallback')}</em>})
            </span>
          )}
        </>
      )}
    </div>
  );
};
