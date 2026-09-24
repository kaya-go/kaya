/**
 * GameTreeGraph - React Flow implementation for large game trees
 *
 * Features:
 * - Handles 60K+ nodes with virtualization
 * - Automatic layout with elkjs
 * - Built-in pan/zoom
 * - Custom node rendering (Go stones)
 * - Right-click / long-press branch management menu
 */

import React, { useCallback, useEffect, useImperativeHandle, forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactFlow, { Background, Controls, MiniMap, ProOptions } from 'reactflow';
import type { Node as FlowNode } from 'reactflow';
import 'reactflow/dist/style.css';
import {
  LuArrowUpToLine,
  LuCopy,
  LuClipboardPaste,
  LuScissors,
  LuTrash2,
  LuListX,
  LuUnlink,
} from 'react-icons/lu';
import type { GameTree } from '@kaya/gametree';
import { StoneNode } from './StoneNode';
import { GameTreeContextMenu, type GameTreeMenuItem } from './GameTreeContextMenu';
import { useGameTreeLayout } from './useGameTreeLayout';
import { useUndoToast } from './useUndoToast';
import { useGameTree } from '../../contexts/GameTreeContext';
import { useGameTreeEdit } from '../../contexts/selectors';
import { hasOtherBranches, isOnMainLine } from '../../hooks/game/branchOperations';
import type { SGFProperty } from '../../types/game';
import {
  GAMETREE_NODE_LONGPRESS_EVENT,
  type GameTreeNodeLongPressDetail,
} from './gametree-graph-utils';
import './GameTreeGraph.css';

// Define nodeTypes outside component to prevent ReactFlow warning
const nodeTypes = { stone: StoneNode };

export interface GameTreeGraphRef {
  centerOnCurrentNode: () => void;
}

export interface GameTreeGraphProps {
  horizontal?: boolean;
  onLayoutChange?: (horizontal: boolean) => void;
  showMinimap?: boolean;
}

interface MenuState {
  nodeId: number | string;
  x: number;
  y: number;
  /** The tree the menu was opened on. Any edit or undo replaces it. */
  tree: GameTree<SGFProperty> | null;
}

export const GameTreeGraph = forwardRef<GameTreeGraphRef, GameTreeGraphProps>(
  ({ horizontal: controlledHorizontal, onLayoutChange, showMinimap = false }, ref) => {
    const { t } = useTranslation();
    const { gameTree, currentNodeId, goToNode } = useGameTree();
    const {
      copiedBranch,
      copyNode,
      pasteNode,
      cutNode,
      makeMainVariation,
      deleteNode,
      deleteContinuation,
      deleteOtherBranches,
    } = useGameTreeEdit();
    const [menu, setMenu] = useState<MenuState | null>(null);
    const withUndoToast = useUndoToast();

    const {
      nodes,
      edges,
      graphExtent,
      containerRef,
      reactFlowInstance,
      centerOnCurrentNode,
      onNodeClick,
      handleMove,
      handleMoveEnd,
    } = useGameTreeLayout(controlledHorizontal, showMinimap);

    useImperativeHandle(
      ref,
      () => ({
        centerOnCurrentNode,
      }),
      [centerOnCurrentNode]
    );

    const openMenu = useCallback(
      (nodeId: number | string, x: number, y: number) => {
        // Branch actions operate on the current node, so select it first.
        goToNode(nodeId);
        setMenu({ nodeId, x, y, tree: gameTree });
      },
      [goToNode, gameTree]
    );

    const closeMenu = useCallback(() => setMenu(null), []);

    // Every action runs on the *current* node. If anything moves the cursor or
    // replaces the tree while the menu is open (wheel navigation, Cmd/Ctrl+Z),
    // the menu would act on a node it was not opened on, so it closes instead.
    const menuIsCurrent =
      menu !== null && menu.tree === gameTree && String(menu.nodeId) === String(currentNodeId);
    useEffect(() => {
      if (menu && !menuIsCurrent) setMenu(null);
    }, [menu, menuIsCurrent]);

    const handleNodeContextMenu = useCallback(
      (event: React.MouseEvent, node: FlowNode) => {
        event.preventDefault();
        const nodeId = node.data?.nodeId;
        if (nodeId === undefined) return;
        openMenu(nodeId, event.clientX, event.clientY);
      },
      [openMenu]
    );

    // Touch devices never fire contextmenu (iOS Safari in particular), so the
    // stone node dispatches a long-press event instead.
    useEffect(() => {
      const handleLongPress = (event: Event) => {
        const detail = (event as CustomEvent<GameTreeNodeLongPressDetail>).detail;
        if (!detail) return;
        openMenu(detail.nodeId, detail.clientX, detail.clientY);
      };

      window.addEventListener(GAMETREE_NODE_LONGPRESS_EVENT, handleLongPress as EventListener);
      return () =>
        window.removeEventListener(GAMETREE_NODE_LONGPRESS_EVENT, handleLongPress as EventListener);
    }, [openMenu]);

    const handleNodeClick = useCallback(
      (event: React.MouseEvent, node: FlowNode) => {
        closeMenu();
        onNodeClick(event, node);
      },
      [closeMenu, onNodeClick]
    );

    const menuItems: GameTreeMenuItem[] = [];
    if (menu && menuIsCurrent && gameTree) {
      const node = gameTree.get(menu.nodeId);
      const isRoot = node?.parentId == null;
      const hasContinuation = (node?.children.length ?? 0) > 0;

      menuItems.push(
        {
          id: 'make-main',
          label: t('editToolbar.makeMainBranch'),
          icon: <LuArrowUpToLine size={14} />,
          disabled: isOnMainLine(gameTree, menu.nodeId),
          onSelect: makeMainVariation,
        },
        {
          id: 'copy',
          label: t('editToolbar.copy'),
          icon: <LuCopy size={14} />,
          disabled: isRoot,
          onSelect: copyNode,
        },
        {
          id: 'cut',
          label: t('editToolbar.cutBranch'),
          icon: <LuScissors size={14} />,
          disabled: isRoot,
          onSelect: withUndoToast(cutNode, t('gameTree.branchCut')),
        },
        {
          id: 'paste',
          label: t('editToolbar.paste'),
          icon: <LuClipboardPaste size={14} />,
          disabled: !copiedBranch,
          onSelect: pasteNode,
        },
        {
          id: 'delete-continuation',
          label: t('editToolbar.deleteContinuation'),
          icon: <LuUnlink size={14} />,
          disabled: !hasContinuation,
          separatorBefore: true,
          onSelect: withUndoToast(deleteContinuation, t('gameTree.continuationDeleted')),
        },
        {
          id: 'delete',
          label: t('editToolbar.deleteCurrentBranch'),
          icon: <LuTrash2 size={14} />,
          disabled: isRoot,
          danger: true,
          onSelect: withUndoToast(deleteNode, t('gameTree.branchDeleted')),
        },
        {
          id: 'delete-others',
          label: t('editToolbar.deleteOtherBranches'),
          icon: <LuListX size={14} />,
          disabled: !hasOtherBranches(gameTree, menu.nodeId),
          danger: true,
          onSelect: withUndoToast(deleteOtherBranches, t('gameTree.otherBranchesDeleted')),
        }
      );
    }

    return (
      <div
        ref={containerRef}
        className="gametree-graph-container"
        style={{ width: '100%', height: '100%', position: 'relative' }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={handleNodeClick}
          onNodeContextMenu={handleNodeContextMenu}
          onPaneClick={closeMenu}
          onMoveStart={closeMenu}
          onMove={handleMove}
          onMoveEnd={handleMoveEnd}
          nodeTypes={nodeTypes}
          onInit={instance => {
            reactFlowInstance.current = instance;
          }}
          proOptions={{ hideAttribution: true } as ProOptions}
          fitView
          fitViewOptions={{
            padding: 0.05,
            minZoom: 0.2,
            maxZoom: 1.5,
          }}
          minZoom={0.1}
          maxZoom={4}
          translateExtent={graphExtent}
          onlyRenderVisibleElements={true}
          panOnDrag={true}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          preventScrolling={true}
          zoomOnDoubleClick={false}
          selectNodesOnDrag={false}
        >
          <Background />
          <Controls
            showInteractive={false}
            style={{
              background: 'var(--bg-secondary, rgba(0,0,0,0.8))',
              border: '1px solid var(--border-color, #333)',
            }}
          />
          {showMinimap && (
            <MiniMap
              pannable
              zoomable
              nodeColor={node => {
                const color = node.data?.color;
                if (color === 'black') return '#000';
                if (color === 'white') return '#FFF';
                return '#CCC';
              }}
              style={{
                background: 'var(--bg-secondary, rgba(10,12,18,0.6))',
                border: '1px solid var(--border-color, #333)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
                cursor: 'grab',
              }}
              maskColor="rgba(8,10,14,0.25)"
              nodeStrokeColor="var(--border-color, #333)"
            />
          )}
        </ReactFlow>
        {menu && menuIsCurrent && (
          <GameTreeContextMenu
            x={menu.x}
            y={menu.y}
            ariaLabel={t('gameTree.branchActions')}
            items={menuItems}
            onClose={closeMenu}
          />
        )}
      </div>
    );
  }
);

GameTreeGraph.displayName = 'GameTreeGraph';
