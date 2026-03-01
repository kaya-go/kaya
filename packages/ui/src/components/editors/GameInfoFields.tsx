/**
 * GameInfoFields - Sub-components for rendering editable fields in GameInfoEditor
 */

import React from 'react';
import type { EditableField, TranslatedFieldConfig } from './GameInfoEditorConfig';

interface InlineEditInputProps {
  inputRef?: React.RefObject<HTMLInputElement | null>;
  type?: 'text' | 'number';
  step?: string;
  min?: string;
  max?: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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
}) => (
  <input
    ref={inputRef}
    type={type}
    step={step}
    min={min}
    max={max}
    className={className}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    onKeyDown={onKeyDown}
    onKeyUp={e => e.stopPropagation()}
    onKeyPress={e => e.stopPropagation()}
    placeholder={placeholder}
  />
);

interface GameInfoFieldProps {
  config: TranslatedFieldConfig;
  value: string | number | undefined;
  isEditMode: boolean;
  isEditing: boolean;
  editValue: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onEditValueChange: (value: string) => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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
    displayValue =
      value || (isEditMode ? <em className="empty-placeholder">Click to add</em> : null);
  }

  return (
    <div className="game-info-row">
      <strong>{config.label}:</strong>{' '}
      {isEditing ? (
        <InlineEditInput
          inputRef={inputRef}
          type={config.type}
          step={config.step}
          min={config.min}
          max={config.max}
          value={editValue}
          onChange={e => onEditValueChange(e.target.value)}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          placeholder={config.placeholder}
        />
      ) : (
        <span
          className={`editable-field ${isEditMode ? 'edit-mode' : ''}`}
          onClick={() => onFieldClick(config.key)}
          title="Click to edit"
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
  inputRef: React.RefObject<HTMLInputElement | null>;
  onEditValueChange: (value: string) => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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
  const isEditingPlayer = editingField === playerKey;
  const isEditingRank = editingField === rankKey;

  return (
    <div className="game-info-row">
      <strong>{label}:</strong>{' '}
      {isEditingPlayer ? (
        <InlineEditInput
          inputRef={inputRef}
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
          title="Click to edit name"
        >
          {playerValue || <em>{playerKey === 'playerBlack' ? 'Black' : 'White'}</em>}
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
              title="Click to edit rank"
            >
              ({rankValue || <em>rank</em>})
            </span>
          )}
        </>
      )}
    </div>
  );
};
