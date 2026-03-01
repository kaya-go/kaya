/**
 * GameInfoEditor - UI component for editing game metadata
 *
 * Features:
 * - Click-to-edit inline editing for visible fields
 * - Edit mode toggle to show and edit all fields (including empty ones)
 * - Escape cancels current edit, Enter saves
 */

import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LuPencil } from 'react-icons/lu';
import { useGameTreeBoard } from '../../contexts/GameTreeContext';
import { useAIAnalysis } from '../ai/AIAnalysisOverlay';
import type { EditableField, TranslatedFieldConfig } from './GameInfoEditorConfig';
import { FIELD_CONFIG_KEYS, renderTextWithLinks } from './GameInfoEditorConfig';
import { GameInfoField, PlayerRow } from './GameInfoFields';
import './GameInfoEditor.css';

// Hook to get game info editor state for external header actions
export const useGameInfoEditMode = () => {
  const { gameId } = useGameTreeBoard();
  const [isEditMode, setIsEditMode] = useState(false);

  // Reset edit mode when game changes
  useEffect(() => {
    setIsEditMode(false);
  }, [gameId]);

  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => !prev);
  }, []);

  return { isEditMode, setIsEditMode, toggleEditMode };
};

// Header actions component for external use
export const GameInfoHeaderActions: React.FC<{
  isEditMode: boolean;
  onToggle: () => void;
}> = ({ isEditMode, onToggle }) => {
  const { t } = useTranslation();
  return (
    <button
      className={`info-edit-button ${isEditMode ? 'active' : ''}`}
      onClick={onToggle}
      title={isEditMode ? t('gameInfo.exitEditMode') : t('gameInfo.editAllFields')}
    >
      <LuPencil size={14} />
    </button>
  );
};

interface GameInfoEditorProps {
  isEditMode?: boolean;
  onEditModeChange?: (isEditMode: boolean) => void;
}

export const GameInfoEditor: React.FC<GameInfoEditorProps> = ({
  isEditMode: externalIsEditMode,
  onEditModeChange,
}) => {
  const { t } = useTranslation();
  const { gameInfo, updateGameInfo, gameId } = useGameTreeBoard();
  const { clearAnalysisCache } = useAIAnalysis();

  const fieldConfigs: TranslatedFieldConfig[] = useMemo(() => {
    return FIELD_CONFIG_KEYS.map(config => ({
      key: config.key,
      label: t(config.labelKey),
      placeholder: t(config.placeholderKey),
      type: config.type,
      step: config.step,
      min: config.min,
      max: config.max,
      alwaysShow: config.alwaysShow,
      renderValue: config.fallbackKey
        ? (v: string | number | undefined) => v || <em>{t(config.fallbackKey!)}</em>
        : config.hasLinkRender
          ? (v: string | number | undefined) => (v ? renderTextWithLinks(String(v)) : null)
          : undefined,
    }));
  }, [t]);

  // Internal edit mode state (used if not controlled externally)
  const [internalIsEditMode, setInternalIsEditMode] = useState(false);

  // Use external or internal edit mode
  const isEditMode = externalIsEditMode ?? internalIsEditMode;
  const setIsEditMode = onEditModeChange ?? setInternalIsEditMode;

  // Currently editing field (for inline editing)
  const [editingField, setEditingField] = useState<EditableField | null>(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Suppress unused variable warning - clearAnalysisCache is available for future use
  void clearAnalysisCache;

  // Reset edit mode when game changes (loading or creating a new game)
  useEffect(() => {
    setIsEditMode(false);
    setEditingField(null);
    setEditValue('');
  }, [gameId, setIsEditMode]);

  // Focus input when editing starts
  useEffect(() => {
    if (editingField && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingField]);

  const getFieldValue = useCallback(
    (field: EditableField): string | number | undefined => {
      switch (field) {
        case 'gameName':
          return gameInfo.gameName;
        case 'date':
          return gameInfo.date;
        case 'place':
          return gameInfo.place;
        case 'playerBlack':
          return gameInfo.playerBlack;
        case 'rankBlack':
          return gameInfo.rankBlack;
        case 'playerWhite':
          return gameInfo.playerWhite;
        case 'rankWhite':
          return gameInfo.rankWhite;
        case 'komi':
          return gameInfo.komi;
        case 'handicap':
          return gameInfo.handicap;
        case 'rules':
          return gameInfo.rules;
        case 'timeControl':
          return gameInfo.timeControl;
        case 'result':
          return gameInfo.result;
        default:
          return undefined;
      }
    },
    [gameInfo]
  );

  const handleFieldClick = useCallback(
    (field: EditableField) => {
      const value = getFieldValue(field);
      setEditValue(value !== undefined ? String(value) : '');
      setEditingField(field);
    },
    [getFieldValue]
  );

  const saveField = useCallback(
    (field: EditableField, value: string) => {
      const trimmed = value.trim();

      // Build update object with only the changed field
      const update: Record<string, string | number | undefined> = {};

      if (field === 'komi') {
        update.komi = trimmed ? parseFloat(trimmed) : 6.5;
      } else if (field === 'handicap') {
        update.handicap = trimmed ? parseInt(trimmed, 10) : 0;
      } else {
        update[field] = trimmed || undefined;
      }

      updateGameInfo(update);
      setEditingField(null);
      setEditValue('');
    },
    [updateGameInfo]
  );

  const handleBlur = useCallback(() => {
    if (editingField) {
      saveField(editingField, editValue);
    }
  }, [editingField, editValue, saveField]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.stopPropagation();
      if (e.key === 'Enter') {
        e.preventDefault();
        if (editingField) {
          saveField(editingField, editValue);
        }
      } else if (e.key === 'Escape') {
        setEditingField(null);
        setEditValue('');
      }
    },
    [editingField, editValue, saveField]
  );

  const toggleEditMode = useCallback(() => {
    const newValue = !isEditMode;
    setIsEditMode(newValue);
    // Close any inline editing when toggling edit mode
    setEditingField(null);
    setEditValue('');
  }, [isEditMode, setIsEditMode]);

  const renderField = (config: TranslatedFieldConfig) => (
    <GameInfoField
      key={config.key}
      config={config}
      value={getFieldValue(config.key)}
      isEditMode={isEditMode}
      isEditing={editingField === config.key}
      editValue={editValue}
      inputRef={inputRef}
      onEditValueChange={setEditValue}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onFieldClick={handleFieldClick}
    />
  );

  const renderPlayerRow = (
    playerKey: 'playerBlack' | 'playerWhite',
    rankKey: 'rankBlack' | 'rankWhite',
    label: string
  ) => (
    <PlayerRow
      key={playerKey}
      playerKey={playerKey}
      rankKey={rankKey}
      label={label}
      playerValue={getFieldValue(playerKey)}
      rankValue={getFieldValue(rankKey)}
      playerConfig={fieldConfigs.find(c => c.key === playerKey)!}
      rankConfig={fieldConfigs.find(c => c.key === rankKey)!}
      isEditMode={isEditMode}
      editingField={editingField}
      editValue={editValue}
      inputRef={inputRef}
      onEditValueChange={setEditValue}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onFieldClick={handleFieldClick}
    />
  );

  return (
    <div className="game-info-editor">
      <div className="game-info-display">
        {/* Game Name */}
        {renderField(fieldConfigs.find(c => c.key === 'gameName')!)}

        {/* Date */}
        {renderField(fieldConfigs.find(c => c.key === 'date')!)}

        {/* Place */}
        {renderField(fieldConfigs.find(c => c.key === 'place')!)}

        {/* Black Player with Rank */}
        {renderPlayerRow('playerBlack', 'rankBlack', t('gameInfo.black'))}

        {/* White Player with Rank */}
        {renderPlayerRow('playerWhite', 'rankWhite', t('gameInfo.white'))}

        {/* Komi */}
        {renderField(fieldConfigs.find(c => c.key === 'komi')!)}

        {/* Handicap */}
        {renderField(fieldConfigs.find(c => c.key === 'handicap')!)}

        {/* Rules */}
        {renderField(fieldConfigs.find(c => c.key === 'rules')!)}

        {/* Time Control */}
        {renderField(fieldConfigs.find(c => c.key === 'timeControl')!)}

        {/* Result */}
        {renderField(fieldConfigs.find(c => c.key === 'result')!)}

        {/* Edit mode hint */}
        {isEditMode && <div className="info-hint">{t('gameInfo.editHint')}</div>}
      </div>
    </div>
  );
};
