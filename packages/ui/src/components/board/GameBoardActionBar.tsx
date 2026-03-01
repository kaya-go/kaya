/**
 * GameBoardActionBar - Top action buttons for the board
 *
 * Pass, resign, scoring, analysis, navigation, edit mode toggles,
 * show next move, and AI suggest move.
 *
 * Uses OverflowMenu so that when the bar is too narrow the rightmost
 * buttons collapse into a dropdown.
 */

import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LuSkipForward,
  LuFlag,
  LuCalculator,
  LuGamepad2,
  LuPencil,
  LuBot,
  LuBrain,
  LuEye,
  LuEyeOff,
  LuLoader,
} from 'react-icons/lu';
import { useKeyboardShortcuts } from '../../contexts/KeyboardShortcutsContext';
import { OverflowMenu, type OverflowItem } from '../ui/OverflowMenu';

interface GameBoardActionBarProps {
  onPass: () => void;
  onResign: () => void;
  onToggleScoringMode: () => void;
  onToggleAnalysisBar: () => void;
  onToggleNavigationMode: () => void;
  onToggleEditMode: () => void;
  onToggleNextMove: () => void;
  onSuggestMove: () => void;
  scoringMode: boolean;
  editMode: boolean;
  showAnalysisBar: boolean;
  navigationMode: boolean;
  showNextMove: boolean;
  isModelLoaded: boolean;
  isGeneratingMove: boolean;
}

export const GameBoardActionBar: React.FC<GameBoardActionBarProps> = ({
  onPass,
  onResign,
  onToggleScoringMode,
  onToggleAnalysisBar,
  onToggleNavigationMode,
  onToggleEditMode,
  onToggleNextMove,
  onSuggestMove,
  scoringMode,
  editMode,
  showAnalysisBar,
  navigationMode,
  showNextMove,
  isModelLoaded,
  isGeneratingMove,
}) => {
  const { t } = useTranslation();
  const { bindingToDisplayString, getBinding } = useKeyboardShortcuts();

  const items: OverflowItem[] = useMemo(() => {
    const list: OverflowItem[] = [
      {
        id: 'pass',
        label: t('gameboardActions.pass'),
        icon: <LuSkipForward size={16} />,
        onClick: onPass,
        disabled: scoringMode || editMode,
        className: 'gameboard-pass-button',
      },
      {
        id: 'resign',
        label: t('gameboardActions.resign'),
        icon: <LuFlag size={16} />,
        onClick: onResign,
        disabled: scoringMode || editMode,
        className: 'gameboard-resign-button',
      },
      {
        id: 'spacer',
        label: '',
        onClick: () => {},
        spacer: true,
      },
      {
        id: 'score',
        label: scoringMode ? t('gameboardActions.scoring') : t('gameboardActions.score'),
        icon: <LuCalculator size={16} />,
        onClick: onToggleScoringMode,
        active: scoringMode,
        className: 'gameboard-score-button',
      },
      {
        id: 'analysis',
        label: showAnalysisBar ? t('gameboardActions.analysis') : t('gameboardActions.analyze'),
        icon: <LuBrain size={16} />,
        onClick: onToggleAnalysisBar,
        active: showAnalysisBar,
        className: 'gameboard-analysis-button',
      },
      {
        id: 'navigate',
        label: t('gameboardActions.navigate'),
        icon: <LuGamepad2 size={16} />,
        onClick: onToggleNavigationMode,
        active: navigationMode,
        className: 'gameboard-navigation-button',
      },
      {
        id: 'edit',
        label: t('gameboardActions.edit'),
        icon: <LuPencil size={16} />,
        onClick: onToggleEditMode,
        active: editMode,
        className: 'gameboard-edit-button',
      },
      {
        id: 'next-move',
        label: showNextMove ? t('gameboardActions.hide') : t('gameboardActions.show'),
        icon: showNextMove ? <LuEyeOff size={16} /> : <LuEye size={16} />,
        onClick: onToggleNextMove,
        active: showNextMove,
        className: 'gameboard-next-move-button',
      },
    ];

    if (isModelLoaded) {
      list.push({
        id: 'suggest-move',
        label: isGeneratingMove
          ? t('gameboardActions.suggesting')
          : t('gameboardActions.suggestMove'),
        icon: isGeneratingMove ? <LuLoader size={16} className="spinner" /> : <LuBot size={16} />,
        onClick: onSuggestMove,
        disabled: isGeneratingMove || scoringMode || editMode,
        className: 'gameboard-suggest-move-button',
      });
    }

    return list;
  }, [
    t,
    onPass,
    onResign,
    onToggleScoringMode,
    onToggleAnalysisBar,
    onToggleNavigationMode,
    onToggleEditMode,
    onToggleNextMove,
    onSuggestMove,
    scoringMode,
    editMode,
    showAnalysisBar,
    navigationMode,
    showNextMove,
    isModelLoaded,
    isGeneratingMove,
    bindingToDisplayString,
    getBinding,
  ]);

  return (
    <OverflowMenu
      items={items}
      className="gameboard-actions-bar"
      pinned={['pass', 'resign', 'score', 'analysis']}
      moreLabel={t('moreActions')}
      renderItem={item => {
        // Build title with keyboard shortcut if applicable
        let title = item.label;
        const shortcutMap: Record<string, string> = {
          score: scoringMode
            ? `${t('gameboardActions.exitScoringMode')} (${bindingToDisplayString(getBinding('board.toggleScoringMode'))})`
            : `${t('gameboardActions.enterScoringMode')} (${bindingToDisplayString(getBinding('board.toggleScoringMode'))})`,
          analysis: showAnalysisBar
            ? `${t('gameboardActions.hideAnalysis')} (${bindingToDisplayString(getBinding('board.toggleAnalysis'))})`
            : `${t('gameboardActions.showAnalysis')} (${bindingToDisplayString(getBinding('board.toggleAnalysis'))})`,
          navigate: navigationMode
            ? `${t('gameboardActions.exitNavigationMode')} (${bindingToDisplayString(getBinding('board.toggleNavigationMode'))})`
            : `${t('gameboardActions.enterNavigationMode')} (${bindingToDisplayString(getBinding('board.toggleNavigationMode'))})`,
          edit: editMode
            ? `${t('gameboardActions.exitEditMode')} (${bindingToDisplayString(getBinding('board.toggleEditMode'))})`
            : `${t('gameboardActions.enterEditMode')} (${bindingToDisplayString(getBinding('board.toggleEditMode'))})`,
          'next-move': showNextMove
            ? `${t('gameboardActions.hideNextMove')} (${bindingToDisplayString(getBinding('board.toggleNextMove'))})`
            : `${t('gameboardActions.showNextMove')} (${bindingToDisplayString(getBinding('board.toggleNextMove'))})`,
          'suggest-move': `${t('gameboardActions.suggestMoveTitle')} (${bindingToDisplayString(getBinding('ai.suggestMove'))})`,
        };
        if (shortcutMap[item.id]) {
          title = shortcutMap[item.id];
        }

        return (
          <button
            key={item.id}
            className={`gameboard-action-button ${item.active ? 'active' : ''} ${item.className ?? ''}`}
            onClick={item.onClick}
            disabled={item.disabled}
            title={title}
          >
            {item.icon}
            <span className="btn-text">{item.label}</span>
          </button>
        );
      }}
    />
  );
};
