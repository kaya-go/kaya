/**
 * @kaya/shudan - Goban utility functions
 *
 * Helper functions for stone rendering and marker display
 */

import * as React from 'react';

/**
 * Get CSS transform for fuzzy stone placement
 * Shifts: 0=none, 1=left, 2=top, 3=right, 4=bottom, 5-8=diagonals
 */
export function getShiftTransform(shift: number): string {
  const shifts: Record<number, string> = {
    1: 'translate(-0.1em, 0)',
    2: 'translate(0, -0.1em)',
    3: 'translate(0.1em, 0)',
    4: 'translate(0, 0.1em)',
    5: 'translate(-0.06em, -0.06em)',
    6: 'translate(0.06em, -0.06em)',
    7: 'translate(0.06em, 0.06em)',
    8: 'translate(-0.06em, 0.06em)',
  };
  return shifts[shift] || '';
}

/**
 * Render SGF marker (MA, TR, CR, SQ, LB)
 * Styled to match OGS: black markers with semi-transparent grey background
 */
export function renderMarker(
  marker: { type?: string | null; label?: string | null },
  color: string,
  vertexSize: number,
  onStone: boolean
): React.ReactNode {
  // CRITICAL: Markers must be perfectly centered (no fuzzy placement)
  // Use fixed positioning without any transform offsets
  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    zIndex: 20, // Au-dessus du point de dernière pierre (zIndex 10)
  };

  // Determine marker color based on background
  // If on stone: White on Black stone, Black on White stone
  // If on empty: Always Black
  const markerColor = onStone ? (color === '#fff' ? '#000000' : '#ffffff') : '#000000';

  // Label marker (LB) - with background for visibility
  if (marker.type === 'label' && marker.label) {
    return (
      <div
        className="shudan-marker shudan-marker-label"
        style={{
          ...baseStyle,
          fontSize: Math.max(12, vertexSize * 0.65),
          fontWeight: '400',
          color: markerColor,
          lineHeight: 1,
          fontFamily: 'Arial, sans-serif',
          textAlign: 'center',
          padding: onStone ? '0' : '2px 4px',
          backgroundColor: onStone ? 'transparent' : 'rgba(255, 255, 255, 0.9)',
          borderRadius: onStone ? '0' : '3px',
        }}
      >
        {marker.label}
      </div>
    );
  }

  // SVG-based markers (MA, TR, CR, SQ) - no background
  const svgSize = vertexSize * 0.85;

  return (
    <svg
      className={`shudan-marker shudan-marker-${marker.type}`}
      style={{
        ...baseStyle,
        width: svgSize,
        height: svgSize,
      }}
      viewBox="0 0 100 100"
    >
      {marker.type === 'cross' && (
        // X marker (MA) - 30% smaller
        <g stroke={markerColor} strokeWidth={12} strokeLinecap="round">
          <line x1="30" y1="30" x2="70" y2="70" />
          <line x1="70" y1="30" x2="30" y2="70" />
        </g>
      )}
      {marker.type === 'circle' && (
        // Circle marker (CR) - stroke color depends on background
        <circle cx="50" cy="50" r="38" fill="none" stroke={markerColor} strokeWidth={10} />
      )}
      {marker.type === 'triangle' && (
        // Triangle marker (TR) - stroke color depends on background
        <polygon
          points="50,12 88,80 12,80"
          fill="none"
          stroke={markerColor}
          strokeWidth={10}
          strokeLinejoin="round"
        />
      )}
      {marker.type === 'square' && (
        // Square marker (SQ) - stroke color depends on background
        <rect
          x="15"
          y="15"
          width="70"
          height="70"
          fill="none"
          stroke={markerColor}
          strokeWidth={10}
        />
      )}
      {marker.type === 'point' && (
        // Small filled black circle
        <circle cx="50" cy="50" r="20" fill="#000000" />
      )}
      {marker.type === 'setup' && (
        // Small filled green square for setup stones
        <rect x="40" y="40" width="20" height="20" fill="#51CF66" rx="2" />
      )}
    </svg>
  );
}
