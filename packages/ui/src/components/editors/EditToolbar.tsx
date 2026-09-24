/**
 * EditToolbar Component
 *
 * Vertical toolbar for edit mode with tools grouped logically:
 * - Stone placement (Black, White, Alternate, Erase)
 * - Markers (Triangle, Square, Circle, Cross)
 * - Labels (Alphabetic, Numeric)
 * - Branch management (Copy, Paste, Delete)
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  LuCircle,
  LuSquare,
  LuTriangle,
  LuX,
  LuEraser,
  LuType,
  LuHash,
  LuCopy,
  LuClipboardPaste,
  LuTrash2,
  LuRefreshCw,
  LuTrash,
  LuArrowUpToLine,
  LuUndo2,
  LuRedo2,
  LuScissors,
  LuListX,
  LuUnlink,
} from 'react-icons/lu';
import { useGameTreeBoard, useGameTreeEdit, useGameTreeActions } from '../../contexts/selectors';
import './EditToolbar.css';

export const EditToolbar: React.FC = () => {
  const { t } = useTranslation();
  const { currentNode, gameInfo, moveNumber } = useGameTreeBoard();
  const { playMove } = useGameTreeActions();
  const {
    editTool,
    setEditTool,
    editPlayMode,
    setEditPlayMode,
    copiedBranch,
    copyBranch,
    pasteBranch,
    deleteBranch,
    cutNode,
    deleteContinuation,
    removeMarker,
    clearAllMarkersAndLabels,
    clearSetupStones,
    makeMainVariation,
    deleteOtherBranches,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useGameTreeEdit();

  // Get current player from game tree
  // Check PL property first, then handicap, then alternate based on move number
  const currentPlayer = React.useMemo(() => {
    // If current node has a move, next player is the opposite
    if (currentNode?.data.B) return -1; // Black just played, White's turn
    if (currentNode?.data.W) return 1; // White just played, Black's turn

    // No move on current node (root or setup position)
    // Check PL (Player to play) property
    if (currentNode?.data.PL?.[0]) {
      return currentNode.data.PL[0] === 'W' ? -1 : 1;
    }

    // Check handicap - if handicap >= 2, White plays first
    if (gameInfo.handicap && gameInfo.handicap >= 2) {
      // In handicap game, White plays first (at move 0)
      return moveNumber % 2 === 0 ? -1 : 1;
    }

    // Default: Black plays first
    return moveNumber % 2 === 0 ? 1 : -1;
  }, [currentNode, gameInfo.handicap, moveNumber]);

  // The root holds the game-info properties (SZ, KM, …), which do not belong
  // on a pasted child node, and it cannot be deleted, so it cannot be cut.
  const isRoot = currentNode?.parentId == null;

  const toolGroups = [
    {
      label: t('editToolbar.stones'),
      actions: [
        {
          id: 'toggle-mode',
          icon: (
            <div style={{ fontSize: '9px', fontWeight: 'bold', lineHeight: '1' }}>
              {editPlayMode ? 'B' : 'AB'}
            </div>
          ),
          label: editPlayMode ? t('editToolbar.playMode') : t('editToolbar.setupMode'),
          disabled: false,
        },
      ],
      tools: [
        {
          id: 'alternate',
          icon: <LuRefreshCw size={18} />,
          label: t('editToolbar.alternate'),
          isToggle: true,
        },
        {
          id: 'black',
          icon: <div className="stone-icon black-stone" />,
          label: t('editToolbar.black'),
          isToggle: true,
        },
        {
          id: 'white',
          icon: <div className="stone-icon white-stone" />,
          label: t('editToolbar.white'),
          isToggle: true,
        },
      ],
      extraActions: [
        {
          id: 'pass',
          icon: <div style={{ fontSize: '11px', fontWeight: 'bold' }}>{t('editToolbar.pass')}</div>,
          label: t('editToolbar.pass'),
          disabled: false,
        },
        {
          id: 'clear-setup',
          icon: <LuTrash size={18} />,
          label: t('editToolbar.clearSetupStones'),
          disabled: false,
        },
      ],
    },
    {
      label: t('editToolbar.markers'),
      tools: [
        {
          id: 'triangle',
          icon: <LuTriangle size={18} />,
          label: t('editToolbar.triangle'),
          isToggle: true,
        },
        {
          id: 'square',
          icon: <LuSquare size={18} />,
          label: t('editToolbar.square'),
          isToggle: true,
        },
        {
          id: 'circle',
          icon: <LuCircle size={18} />,
          label: t('editToolbar.circle'),
          isToggle: true,
        },
        { id: 'cross', icon: <LuX size={18} />, label: t('editToolbar.cross'), isToggle: true },
        {
          id: 'label-alpha',
          icon: <LuType size={18} />,
          label: t('editToolbar.labelAlpha'),
          isToggle: true,
        },
        {
          id: 'label-num',
          icon: <LuHash size={18} />,
          label: t('editToolbar.labelNum'),
          isToggle: true,
        },
        {
          id: 'erase-marker',
          icon: <LuEraser size={18} />,
          label: t('editToolbar.eraseMarker'),
          isToggle: true,
        },
      ],
      extraActions: [
        {
          id: 'erase-all',
          icon: <LuTrash size={18} />,
          label: t('editToolbar.eraseAll'),
          disabled: false,
        },
      ],
    },
    {
      label: t('editToolbar.branch'),
      actions: [
        {
          id: 'make-main',
          icon: <LuArrowUpToLine size={18} />,
          label: t('editToolbar.makeMainBranch'),
          disabled: false,
        },
        { id: 'copy', icon: <LuCopy size={18} />, label: t('editToolbar.copy'), disabled: isRoot },
        {
          id: 'cut',
          icon: <LuScissors size={18} />,
          label: t('editToolbar.cutBranch'),
          disabled: isRoot,
        },
        {
          id: 'paste',
          icon: <LuClipboardPaste size={18} />,
          label: t('editToolbar.paste'),
          disabled: !copiedBranch,
        },
        {
          id: 'delete-continuation',
          icon: <LuUnlink size={18} />,
          label: t('editToolbar.deleteContinuation'),
          disabled: !currentNode?.children?.length,
        },
        {
          id: 'delete',
          icon: <LuTrash2 size={18} />,
          label: t('editToolbar.deleteCurrentBranch'),
          disabled: false,
        },
        {
          id: 'delete-others',
          icon: <LuListX size={18} />,
          label: t('editToolbar.deleteOtherBranches'),
          disabled: false,
        },
      ],
    },
    {
      label: t('editToolbar.history'),
      actions: [
        {
          id: 'undo',
          icon: <LuUndo2 size={18} />,
          label: t('editToolbar.undo'),
          disabled: !canUndo,
        },
        {
          id: 'redo',
          icon: <LuRedo2 size={18} />,
          label: t('editToolbar.redo'),
          disabled: !canRedo,
        },
      ],
    },
  ];

  const handleAction = (actionId: string) => {
    switch (actionId) {
      case 'toggle-mode':
        setEditPlayMode(!editPlayMode);
        break;
      case 'pass':
        playMove([-1, -1], currentPlayer);
        break;
      case 'clear-setup':
        clearSetupStones();
        break;
      case 'erase-all':
        clearAllMarkersAndLabels();
        break;
      case 'make-main':
        makeMainVariation();
        break;
      case 'copy':
        copyBranch();
        break;
      case 'cut':
        cutNode();
        break;
      case 'paste':
        pasteBranch();
        break;
      case 'delete-continuation':
        deleteContinuation();
        break;
      case 'delete':
        deleteBranch();
        break;
      case 'delete-others':
        deleteOtherBranches();
        break;
      case 'undo':
        undo();
        break;
      case 'redo':
        redo();
        break;
    }
  };

  return (
    <div className="edit-toolbar edit-toolbar-section">
      {toolGroups.map((group, groupIndex) => (
        <div key={group.label} className="edit-toolbar-group">
          <div className="edit-toolbar-group-label">{group.label}</div>
          <div className="edit-toolbar-buttons">
            {group.actions?.map(action => (
              <button
                key={action.id}
                className={`edit-toolbar-button ${action.disabled ? 'disabled' : ''}`}
                onClick={() => !action.disabled && handleAction(action.id)}
                title={action.label}
                disabled={action.disabled}
              >
                {action.icon}
              </button>
            ))}
            {group.tools?.map(tool => {
              const isToggle = 'isToggle' in tool && tool.isToggle;
              const isActive = isToggle && editTool === tool.id;

              return (
                <button
                  key={tool.id}
                  className={`edit-toolbar-button ${isActive ? 'active' : ''}`}
                  onClick={() => setEditTool(tool.id)}
                  title={tool.label}
                >
                  {tool.icon}
                </button>
              );
            })}
            {group.extraActions?.map(action => (
              <button
                key={action.id}
                className={`edit-toolbar-button ${action.disabled ? 'disabled' : ''}`}
                onClick={() => !action.disabled && handleAction(action.id)}
                title={action.label}
                disabled={action.disabled}
              >
                {action.icon}
              </button>
            ))}
          </div>
          {groupIndex < toolGroups.length - 1 && <div className="edit-toolbar-divider" />}
        </div>
      ))}
    </div>
  );
};
