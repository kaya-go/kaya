/**
 * Width and height of the library tree, from the content box around it.
 * The tree takes explicit pixel sizes, so a flex parent has to be measured.
 */

import { useEffect, useRef, useState } from 'react';

export function useLibraryTreeSize(active: boolean) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [treeHeight, setTreeHeight] = useState(400);
  const [treeWidth, setTreeWidth] = useState(250);

  // Re-measure when the panel opens again. A collapsed panel unmounts the
  // content box, and an observer attached to the previous box never sees it.
  useEffect(() => {
    if (!active) return;
    const container = contentRef.current;
    if (!container) return;

    const updateDimensions = (width: number, height: number) => {
      const adjustedHeight = height - 16;
      const adjustedWidth = width - 16;
      if (adjustedHeight > 0) setTreeHeight(adjustedHeight);
      if (adjustedWidth > 0) setTreeWidth(adjustedWidth);
    };

    const rect = container.getBoundingClientRect();
    updateDimensions(rect.width, rect.height);

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        updateDimensions(entry.contentRect.width, entry.contentRect.height);
      }
    });
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [active]);

  return { contentRef, treeHeight, treeWidth };
}
