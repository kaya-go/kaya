/**
 * CommentEditor Component
 *
 * Displays and edits comments for the current move with markdown support.
 * Uses a shared context to synchronize state between header actions and editor.
 */

import React, { useState, useCallback, useEffect, useContext, createContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useGameTreeBoard, useGameTreeEdit } from '../../contexts/GameTreeContext';
import {
  COMMENT_FONT_SCALE_MAX,
  COMMENT_FONT_SCALE_MIN,
  COMMENT_FONT_SCALE_STEP,
  clampCommentFontScale,
} from '../../utils/commentFontScale';
import './CommentEditor.css';

// ============================================================================
// Context for shared editing state
// ============================================================================

interface CommentEditorContextValue {
  moveNumber: number;
  isEditing: boolean;
  editText: string;
  setEditText: (text: string) => void;
  currentComment: string;
  currentNodeId: string | number | null;
  handleEdit: () => void;
  handleSave: () => void;
  handleCancel: () => void;
  fontScale: number;
  adjustFontScale: (delta: number) => void;
  canIncreaseFont: boolean;
  canDecreaseFont: boolean;
}

const CommentEditorContext = createContext<CommentEditorContextValue | null>(null);

/**
 * Provider component that manages comment editing state.
 * Wrap your app with this to share state between CommentHeaderActions and CommentEditor.
 */
export const CommentEditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentNode, moveNumber, gameSettings, setGameSettings } = useGameTreeBoard();
  const { setNodeComment: updateComment } = useGameTreeEdit();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const prevNodeIdRef = useRef<string | number | null>(null);

  const fontScale = gameSettings.commentFontScale;
  const adjustFontScale = useCallback(
    (delta: number) => {
      setGameSettings({ commentFontScale: clampCommentFontScale(fontScale + delta) });
    },
    [fontScale, setGameSettings]
  );
  const canIncreaseFont = fontScale < COMMENT_FONT_SCALE_MAX;
  const canDecreaseFont = fontScale > COMMENT_FONT_SCALE_MIN;

  const currentComment = currentNode?.data.C?.[0] || '';
  const currentNodeId = currentNode?.id ?? null;

  // Reset editing state when navigating to a different node
  useEffect(() => {
    if (prevNodeIdRef.current !== currentNodeId) {
      setEditText(currentComment);
      setIsEditing(false);
      prevNodeIdRef.current = currentNodeId;
    }
  }, [currentNodeId, currentComment]);

  // Update edit text when comment changes externally (but not while editing)
  useEffect(() => {
    if (!isEditing) {
      setEditText(currentComment);
    }
  }, [currentComment, isEditing]);

  const handleEdit = useCallback(() => {
    setEditText(currentComment);
    setIsEditing(true);
  }, [currentComment]);

  const handleSave = useCallback(() => {
    updateComment(editText);
    setIsEditing(false);
  }, [editText, updateComment]);

  const handleCancel = useCallback(() => {
    setEditText(currentComment);
    setIsEditing(false);
  }, [currentComment]);

  const value: CommentEditorContextValue = {
    moveNumber,
    isEditing,
    editText,
    setEditText,
    currentComment,
    currentNodeId,
    handleEdit,
    handleSave,
    handleCancel,
    fontScale,
    adjustFontScale,
    canIncreaseFont,
    canDecreaseFont,
  };

  return <CommentEditorContext.Provider value={value}>{children}</CommentEditorContext.Provider>;
};

/**
 * Hook to access the shared comment editor state.
 * Must be used within a CommentEditorProvider.
 */
export const useCommentEditorState = (): CommentEditorContextValue => {
  const context = useContext(CommentEditorContext);
  if (!context) {
    throw new Error('useCommentEditorState must be used within a CommentEditorProvider');
  }
  return context;
};

// ============================================================================
// Header Actions Component
// ============================================================================

/**
 * Header actions for the comment panel.
 * Shows edit button when not editing, save/cancel when editing.
 */
export const CommentHeaderActions: React.FC = () => {
  const { t } = useTranslation();
  const {
    moveNumber,
    isEditing,
    handleEdit,
    handleSave,
    handleCancel,
    adjustFontScale,
    canIncreaseFont,
    canDecreaseFont,
  } = useCommentEditorState();

  return (
    <>
      {moveNumber > 0 && (
        <span className="move-number">{t('comment.move', { number: moveNumber })}</span>
      )}
      {!isEditing && (
        <div className="comment-fontsize-controls">
          <button
            type="button"
            onClick={() => adjustFontScale(-COMMENT_FONT_SCALE_STEP)}
            disabled={!canDecreaseFont}
            className="comment-fontsize-button"
            title={t('comment.decreaseTextSize')}
            aria-label={t('comment.decreaseTextSize')}
          >
            A&minus;
          </button>
          <button
            type="button"
            onClick={() => adjustFontScale(COMMENT_FONT_SCALE_STEP)}
            disabled={!canIncreaseFont}
            className="comment-fontsize-button"
            title={t('comment.increaseTextSize')}
            aria-label={t('comment.increaseTextSize')}
          >
            A+
          </button>
        </div>
      )}
      {!isEditing && (
        <button
          onClick={handleEdit}
          className="comment-edit-button"
          title={t('comment.editComment')}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      )}
      {isEditing && (
        <div className="comment-actions">
          <button
            onClick={handleSave}
            className="comment-save-button"
            title={t('comment.saveShortcut')}
          >
            {t('comment.save')}
          </button>
          <button
            onClick={handleCancel}
            className="comment-cancel-button"
            title={t('comment.cancelShortcut')}
          >
            {t('comment.cancel')}
          </button>
        </div>
      )}
    </>
  );
};

// ============================================================================
// Comment Editor Component
// ============================================================================

/**
 * Main comment editor component.
 * Displays markdown-rendered comments or an editable textarea.
 */
export const CommentEditor: React.FC = () => {
  const { t } = useTranslation();
  const {
    isEditing,
    editText,
    setEditText,
    currentComment,
    currentNodeId,
    handleEdit,
    handleSave,
    handleCancel,
    fontScale,
  } = useCommentEditorState();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Drive comment text size from the persisted scale via a CSS variable.
  const fontScaleStyle = { '--comment-font-scale': fontScale } as React.CSSProperties;

  // Focus textarea when entering edit mode
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      // Move cursor to end
      const len = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(len, len);
    }
  }, [isEditing]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Stop propagation to prevent global keyboard shortcuts from firing
      e.stopPropagation();

      if (e.key === 'Escape') {
        e.preventDefault();
        handleCancel();
      } else if (e.key === 'Enter' && !e.shiftKey) {
        // Enter without Shift saves the comment
        e.preventDefault();
        handleSave();
      } else if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        // Ctrl/Cmd+S also saves
        e.preventDefault();
        handleSave();
      }
      // Shift+Enter naturally inserts a newline (default textarea behavior)
    },
    [handleCancel, handleSave]
  );

  if (currentNodeId === null) {
    return (
      <div className="comment-editor">
        <div className="comment-empty">{t('comment.noMoveSelected')}</div>
      </div>
    );
  }

  return (
    <div
      className={`comment-editor ${isEditing ? 'comment-editor--editing' : ''}`}
      style={fontScaleStyle}
    >
      {isEditing ? (
        <div className="comment-editor-container">
          <textarea
            ref={textareaRef}
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="comment-textarea"
            placeholder={t('comment.placeholder')}
          />
          <div className="comment-hint">{t('comment.enterHint')}</div>
        </div>
      ) : (
        <div className="comment-display" onClick={handleEdit}>
          {currentComment ? (
            <div className="comment-markdown">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentComment}</ReactMarkdown>
            </div>
          ) : (
            <div className="comment-empty">{t('comment.noComment')}</div>
          )}
        </div>
      )}
    </div>
  );
};
