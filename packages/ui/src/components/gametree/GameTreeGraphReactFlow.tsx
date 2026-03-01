/**
 * GameTreeGraph - React Flow implementation for large game trees
 *
 * Features:
 * - Handles 60K+ nodes with virtualization
 * - Automatic layout with elkjs
 * - Built-in pan/zoom
 * - Custom node rendering (Go stones)
 */

import React, { useImperativeHandle, forwardRef } from 'react';
import ReactFlow, { Background, Controls, MiniMap, ProOptions } from 'reactflow';
import 'reactflow/dist/style.css';
import { StoneNode } from './StoneNode';
import { useGameTreeLayout } from './useGameTreeLayout';
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

export const GameTreeGraph = forwardRef<GameTreeGraphRef, GameTreeGraphProps>(
  ({ horizontal: controlledHorizontal, onLayoutChange, showMinimap = false }, ref) => {
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

    return (
      <div
        ref={containerRef}
        className="gametree-graph-container"
        style={{ width: '100%', height: '100%', position: 'relative' }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
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
      </div>
    );
  }
);

GameTreeGraph.displayName = 'GameTreeGraph';
