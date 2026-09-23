/**
 * GameInfoEditor - UI component for editing game metadata
 *
 * Features:
 * - Click-to-edit inline editing for visible fields
 * - Edit mode toggle to show and edit all fields (including empty ones)
 * - Escape cancels current edit, Enter saves (Ctrl/Cmd+Enter in comments)
 */

import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LuPencil } from 'react-icons/lu';
import { useGameTreeBoard } from '../../contexts/GameTreeContext';
import { useAIAnalysis } from '../ai/AIAnalysisOverlay';
import type { GameInfoPatch } from '../../types/game';
import type { EditableField, TranslatedFieldConfig } from './GameInfoEditorConfig';
import { FIELD_CONFIG_KEYS, PLAYER_ROW_KEYS, renderTextWithLinks } from './GameInfoEditorConfig';
import { GameInfoField, PlayerRow } from './GameInfoFields';
import './GameInfoEditor.css';

type EditElement = HTMLInputElement | HTMLTextAreaElement;

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
      dividerBefore: config.dividerBefore,
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
  const inputRef = useRef<EditElement>(null);

  // Suppress unused variable warning - clearAnalysisCache is available for future use
  void clearAnalysisCache;

  // Reset edit mode when game changes (loading or creating a new game). Not on
  // mount: switching between the desktop and mobile layouts remounts the
  // editor, and a controlled edit mode should survive that.
  const lastGameIdRef = useRef(gameId);
  useEffect(() => {
    if (lastGameIdRef.current === gameId) return;
    lastGameIdRef.current = gameId;
    setIsEditMode(false);
    setEditingField(null);
    setEditValue('');
  }, [gameId, setIsEditMode]);

  // Focus input when editing starts. The comment textarea gets the caret at
  // the end instead of a full selection, so one stray key can't replace it.
  useEffect(() => {
    const el = inputRef.current;
    if (!editingField || !el) return;
    el.focus();
    if (el instanceof HTMLTextAreaElement) el.setSelectionRange(el.value.length, el.value.length);
    else el.select();
  }, [editingField]);

  const getFieldValue = useCallback(
    (field: EditableField): string | number | undefined => gameInfo[field],
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
      const update: GameInfoPatch = {};

      if (field === 'komi') {
        const n = trimmed ? parseFloat(trimmed) : 6.5;
        update.komi = Number.isFinite(n) ? n : 6.5;
      } else if (field === 'handicap') {
        const n = trimmed ? parseInt(trimmed, 10) : 0;
        update.handicap = Number.isFinite(n) ? n : 0;
      } else {
        Object.assign(update, { [field]: trimmed });
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
    (e: React.KeyboardEvent<EditElement>) => {
      e.stopPropagation();
      if (e.key === 'Enter') {
        const isMultiline = e.currentTarget.tagName === 'TEXTAREA';
        if (isMultiline && !e.metaKey && !e.ctrlKey) return;
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
        {fieldConfigs.map(config => {
          if (config.key === 'playerBlack') {
            return renderPlayerRow('playerBlack', 'rankBlack', t('gameInfo.black'));
          }
          if (config.key === 'playerWhite') {
            return renderPlayerRow('playerWhite', 'rankWhite', t('gameInfo.white'));
          }
          if (PLAYER_ROW_KEYS.has(config.key)) return null;
          return renderField(config);
        })}

        {isEditMode && <div className="info-hint">{t('gameInfo.editHint')}</div>}
      </div>
    </div>
  );
};
