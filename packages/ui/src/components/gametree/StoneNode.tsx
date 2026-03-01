/**
 * Custom React Flow node component for rendering Go stones with 3D effect.
 */

import React from 'react';
import { Handle, Position } from 'reactflow';
import { useGameTreeCore } from '../../contexts/GameTreeContext';

function getHandleStyle(position: Position): React.CSSProperties {
  const base: React.CSSProperties = {
    opacity: 0,
    width: 0,
    height: 0,
    border: 'none',
    background: 'transparent',
    pointerEvents: 'none',
  };

  switch (position) {
    case Position.Left:
      return { ...base, left: 0, transform: 'translate(0, -50%)' };
    case Position.Right:
      return { ...base, right: 0, transform: 'translate(0, -50%)' };
    case Position.Top:
      return { ...base, top: 0, transform: 'translate(-50%, 0)' };
    case Position.Bottom:
      return { ...base, bottom: 0, transform: 'translate(-50%, 0)' };
    default:
      return base;
  }
}

// Memoized to prevent unnecessary re-renders (React Flow best practice)
// Uses optimized selector to only subscribe to currentNodeId changes
export const StoneNode = React.memo(({ data }: { data: any }) => {
  const { currentNodeId } = useGameTreeCore();
  const {
    color,
    moveNumber,
    hasComment,
    hasMarkers,
    hasSetupStones,
    horizontal,
    isRoot,
    nodeId,
    isPass,
  } = data;

  // Calculate isCurrent directly from context
  // This prevents rebuilding entire nodes array on every navigation
  const isCurrent = String(nodeId) === String(currentNodeId);

  const targetPosition = horizontal ? Position.Left : Position.Top;
  const sourcePosition = horizontal ? Position.Right : Position.Bottom;
  const targetHandleStyle = React.useMemo(() => getHandleStyle(targetPosition), [targetPosition]);
  const sourceHandleStyle = React.useMemo(() => getHandleStyle(sourcePosition), [sourcePosition]);

  const stoneStyle = React.useMemo(() => {
    if (isRoot) {
      return {
        background: '#666',
        color: 'white',
        boxShadow: isCurrent
          ? '0 2px 4px rgba(0, 0, 0, 0.2), 0 0 0 3px #4A9EFF'
          : '0 2px 4px rgba(0, 0, 0, 0.2)',
        border: '1px solid #888',
      };
    }
    if (isPass) {
      return {
        background: color === 'black' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.3)',
        boxShadow: isCurrent ? '0 0 0 3px #4A9EFF' : 'none',
        border: `2px solid ${color === 'black' ? '#333' : '#aaa'}`,
      };
    }
    if (color === 'black') {
      return {
        background: 'radial-gradient(circle at 35% 35%, #555 0%, #222 30%, #000 100%)',
        boxShadow: isCurrent
          ? '0 2px 4px rgba(0, 0, 0, 0.4), 0 0 0 3px #4A9EFF'
          : '0 2px 4px rgba(0, 0, 0, 0.4), 0 0 0 1.5px rgba(255, 255, 255, 0.45)',
        border: 'none',
      };
    } else {
      return {
        background:
          'radial-gradient(circle at 30% 30%, #fff 0%, #f0f0f0 25%, #d5d5d5 60%, #bbb 100%)',
        boxShadow: isCurrent
          ? '0 3px 5px rgba(0, 0, 0, 0.3), 0 0 0 3px #4A9EFF'
          : '0 3px 5px rgba(0, 0, 0, 0.3), 0 0 0 1.5px rgba(0, 0, 0, 0.35)',
        border: 'none',
      };
    }
  }, [isRoot, color, isCurrent, isPass]);

  return (
    <>
      <Handle type="target" position={targetPosition} style={targetHandleStyle} />
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: isRoot ? '2px' : '50%',
          ...stoneStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: isPass ? '11px' : '10px',
          fontWeight: 'bold',
          color: isPass
            ? color === 'black'
              ? '#333'
              : '#888'
            : color === 'black' || isRoot
              ? '#FFF'
              : '#000',
          position: 'relative',
        }}
      >
        {isRoot ? '' : isPass ? 'P' : moveNumber > 0 && moveNumber}
        {hasComment && (
          <div
            style={{
              position: 'absolute',
              top: -2,
              right: hasMarkers ? 2 : -2,
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: '#FF6B6B',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            }}
          />
        )}
        {hasMarkers && (
          <div
            style={{
              position: 'absolute',
              top: -2,
              right: -2,
              width: 5,
              height: 5,
              borderRadius: '1px',
              backgroundColor: '#4A9EFF',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            }}
          />
        )}
        {hasSetupStones && (
          <div
            style={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              width: 5,
              height: 5,
              borderRadius: '1px',
              backgroundColor: '#51CF66',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            }}
          />
        )}
      </div>
      <Handle type="source" position={sourcePosition} style={sourceHandleStyle} />
    </>
  );
});

StoneNode.displayName = 'StoneNode';
