/**
 * @kaya/shudan - Goban coordinate labels
 *
 * Renders row/column coordinate labels around the board edges
 */

import * as React from 'react';

interface CoordXProps {
  xs: number[];
  vertexSize: number;
  coordFunc: (x: number) => string | number;
  position: 'top' | 'bottom';
}

export const CoordX: React.FC<CoordXProps> = ({ xs, vertexSize, coordFunc, position }) => (
  <div
    className="shudan-coord-x"
    style={{
      display: 'flex',
      height: vertexSize * 0.6,
      position: 'relative',
      marginLeft: vertexSize,
      ...(position === 'bottom' ? { marginTop: -(vertexSize * 0.3) } : {}),
    }}
  >
    {xs.map((x: number) => (
      <div
        key={`coord-x-${position}-${x}`}
        style={{
          position: 'absolute',
          left: x * vertexSize + vertexSize / 2,
          width: vertexSize,
          transform: 'translateX(-50%)',
          textAlign: 'center',
          fontSize: Math.max(10, vertexSize / 2),
          lineHeight: `${vertexSize * 0.6}px`,
          userSelect: 'none',
        }}
      >
        {coordFunc(x)}
      </div>
    ))}
  </div>
);

interface CoordYProps {
  ys: number[];
  vertexSize: number;
  coordFunc: (y: number) => string | number;
  contentHeight: number;
  position: 'left' | 'right';
}

export const CoordY: React.FC<CoordYProps> = ({
  ys,
  vertexSize,
  coordFunc,
  contentHeight,
  position,
}) => (
  <div
    className="shudan-coord-y"
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: vertexSize,
      position: 'relative',
      height: contentHeight,
      marginTop: vertexSize / 2,
    }}
  >
    {ys.map((y: number) => (
      <div
        key={`coord-y-${position}-${y}`}
        style={{
          position: 'absolute',
          top: y * vertexSize,
          height: vertexSize,
          transform: 'translateY(-50%)',
          width: '100%',
          textAlign: 'center',
          fontSize: Math.max(10, vertexSize / 2),
          lineHeight: `${vertexSize}px`,
          userSelect: 'none',
        }}
      >
        {coordFunc(y)}
      </div>
    ))}
  </div>
);
