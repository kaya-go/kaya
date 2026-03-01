/**
 * Hook managing game tree layout computation via web worker with sync fallback.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Node, Edge, ReactFlowInstance, CoordinateExtent } from 'reactflow';
import { useGameTree } from '../../contexts/GameTreeContext';
import { useTheme } from '../../contexts/ThemeContext';
import { rafThrottle } from '../../utils/throttle';
import {
  scheduleDeferred,
  cancelDeferred,
  layoutOGSSync,
  buildGraphElements,
  type IdleCallbackHandle,
} from './gametree-graph-utils';

const VIEWPORT_PADDING = 200;
const DEFAULT_TRANSLATE_EXTENT: CoordinateExtent = [
  [-VIEWPORT_PADDING, -VIEWPORT_PADDING],
  [VIEWPORT_PADDING, VIEWPORT_PADDING],
];

const LOCAL_STORAGE_ZOOM_KEY = 'kaya-game-tree-zoom';

export interface UseGameTreeLayoutResult {
  nodes: Node[];
  edges: Edge[];
  graphExtent: CoordinateExtent;
  allNodesRef: React.MutableRefObject<Node[]>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  reactFlowInstance: React.MutableRefObject<ReactFlowInstance | null>;
  horizontal: boolean;
  edgeColor: string;
  isLoading: boolean;
  updateVisibleNodes: () => void;
  centerOnCurrentNode: () => void;
  onNodeClick: (event: React.MouseEvent, node: Node) => void;
  handleMove: () => void;
  handleMoveEnd: () => void;
}

export function useGameTreeLayout(
  controlledHorizontal: boolean | undefined,
  showMinimap: boolean
): UseGameTreeLayoutResult {
  const { gameTree, rootId, currentNodeId, goToNode } = useGameTree();
  const { theme } = useTheme();
  const edgeColor = theme === 'dark' ? '#fff' : '#333';
  const [internalHorizontal, setInternalHorizontal] = React.useState(true);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [graphExtent, setGraphExtent] = useState<CoordinateExtent>(DEFAULT_TRANSLATE_EXTENT);
  const allNodesRef = useRef<Node[]>([]);
  const allEdgesRef = useRef<Edge[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [needsLayout, setNeedsLayout] = React.useState(true);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);
  const prevCurrentNodeId = useRef<string | number | null>(null);
  const hasInitializedView = useRef(false);
  const visibleNodeIdsRef = useRef<Set<string>>(new Set());
  const panFrameRef = useRef<number | null>(null);
  const persistedZoomRef = useRef<number | null>(null);
  const layoutTaskRef = useRef<IdleCallbackHandle | null>(null);
  const prevHorizontalRef = useRef<boolean | undefined>(undefined);
  const centerAfterLayoutRef = useRef(false);

  const currentNodeIdRef = useRef(currentNodeId);
  useEffect(() => {
    currentNodeIdRef.current = currentNodeId;
  }, [currentNodeId]);

  // Initialize worker
  useEffect(() => {
    if (typeof Worker !== 'undefined') {
      workerRef.current = new Worker(
        new URL('../../workers/graphLayout.worker.js', import.meta.url),
        { type: 'module' }
      );
    }
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  // Load persisted zoom once on mount
  React.useEffect(() => {
    if (persistedZoomRef.current !== null) return;
    if (typeof window === 'undefined' || !window.localStorage) return;
    const stored = window.localStorage.getItem(LOCAL_STORAGE_ZOOM_KEY);
    const parsed = stored ? parseFloat(stored) : NaN;
    if (Number.isFinite(parsed)) {
      persistedZoomRef.current = parsed;
    }
  }, []);

  const horizontal = controlledHorizontal ?? internalHorizontal;

  const containerDimensionsRef = React.useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const updateVisibleNodes = useCallback(() => {
    if (allNodesRef.current.length > 0) {
      setNodes(allNodesRef.current);
      setEdges(allEdgesRef.current);
    }
  }, []);

  const throttledUpdateVisibleNodes = useMemo(
    () => rafThrottle(updateVisibleNodes),
    [updateVisibleNodes]
  );

  useEffect(() => {
    return () => {
      throttledUpdateVisibleNodes.cancel();
    };
  }, [throttledUpdateVisibleNodes]);

  const centerOnCurrentNode = useCallback(() => {
    if (currentNodeId === null || !reactFlowInstance.current) return;

    const currentNode = allNodesRef.current.find(n => n.id === String(currentNodeId));
    if (!currentNode) return;

    const { x, y } = currentNode.position;
    reactFlowInstance.current.setCenter(x + 12, y + 12, { zoom: 1.5, duration: 200 });
    setTimeout(() => updateVisibleNodes(), 250);
  }, [currentNodeId, updateVisibleNodes]);

  // Handle container resize
  useEffect(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    containerDimensionsRef.current = { width: rect.width, height: rect.height };

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        containerDimensionsRef.current = {
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        };
      }
      if (reactFlowInstance.current) {
        updateVisibleNodes();
      }
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [updateVisibleNodes]);

  // Trigger fresh layout when tree or direction changes
  React.useEffect(() => {
    if (prevHorizontalRef.current !== undefined && prevHorizontalRef.current !== horizontal) {
      centerAfterLayoutRef.current = true;
    }
    prevHorizontalRef.current = horizontal;

    setNeedsLayout(true);
    visibleNodeIdsRef.current = new Set();
  }, [gameTree, rootId, horizontal, edgeColor]);

  // Build layout when necessary
  React.useEffect(() => {
    if (!needsLayout && layoutTaskRef.current !== null) {
      cancelDeferred(layoutTaskRef.current);
      layoutTaskRef.current = null;
    }

    if (!needsLayout) {
      return;
    }

    const runLayout = () => {
      layoutTaskRef.current = null;

      if (!gameTree || rootId === null) {
        setNodes([]);
        setEdges([]);
        visibleNodeIdsRef.current = new Set();
        setIsLoading(false);
        setNeedsLayout(false);
        return;
      }

      const root = gameTree.get(rootId);
      if (!root) {
        setNeedsLayout(false);
        return;
      }

      setIsLoading(true);

      const {
        nodes: rawNodes,
        edges: rawEdges,
        includedNodeIds,
      } = buildGraphElements(root, currentNodeId, horizontal, edgeColor);

      const applyLayout = (layoutedNodes: Node[], layoutedEdges: Edge[]) => {
        allNodesRef.current = layoutedNodes;
        allEdgesRef.current = layoutedEdges;

        if (layoutedNodes.length > 0) {
          let minX = Infinity;
          let minY = Infinity;
          let maxX = -Infinity;
          let maxY = -Infinity;

          for (const node of layoutedNodes) {
            const width = node.width ?? 24;
            const height = node.height ?? 24;
            minX = Math.min(minX, node.position.x);
            minY = Math.min(minY, node.position.y);
            maxX = Math.max(maxX, node.position.x + width);
            maxY = Math.max(maxY, node.position.y + height);
          }

          if (
            Number.isFinite(minX) &&
            Number.isFinite(minY) &&
            Number.isFinite(maxX) &&
            Number.isFinite(maxY)
          ) {
            setGraphExtent([
              [minX - VIEWPORT_PADDING, minY - VIEWPORT_PADDING],
              [maxX + VIEWPORT_PADDING, maxY + VIEWPORT_PADDING],
            ]);
          }
        } else {
          setGraphExtent(DEFAULT_TRANSLATE_EXTENT);
        }

        setNodes(layoutedNodes);
        setEdges(layoutedEdges);

        visibleNodeIdsRef.current = new Set(Array.from(includedNodeIds).map(id => String(id)));
        setIsLoading(false);
        setNeedsLayout(false);

        if (!hasInitializedView.current) {
          hasInitializedView.current = true;
          setTimeout(() => {
            if (!reactFlowInstance.current) return;

            const targetNodeId = currentNodeIdRef.current;
            const currentNode = layoutedNodes.find((n: Node) => n.id === String(targetNodeId));
            const zoom = persistedZoomRef.current ?? 1;

            if (currentNode) {
              reactFlowInstance.current.setCenter(
                currentNode.position.x + 12,
                currentNode.position.y + 12,
                { zoom, duration: 0 }
              );
            } else if (persistedZoomRef.current) {
              const viewport = reactFlowInstance.current.getViewport();
              reactFlowInstance.current.setViewport(
                { x: viewport.x, y: viewport.y, zoom },
                { duration: 0 }
              );
            } else {
              reactFlowInstance.current.fitView({
                padding: 0.05,
                duration: 0,
                maxZoom: 1.5,
              });
            }
          }, 50);
        } else if (centerAfterLayoutRef.current) {
          centerAfterLayoutRef.current = false;
          setTimeout(() => {
            if (!reactFlowInstance.current) return;

            const targetNodeId = currentNodeIdRef.current;
            const currentNode = layoutedNodes.find((n: Node) => n.id === String(targetNodeId));

            if (currentNode) {
              const viewport = reactFlowInstance.current.getViewport();
              reactFlowInstance.current.setCenter(
                currentNode.position.x + 12,
                currentNode.position.y + 12,
                { zoom: viewport.zoom, duration: 200 }
              );
            }
          }, 50);
        }
      };

      if (workerRef.current) {
        workerRef.current.onmessage = (e: MessageEvent) => {
          const { nodes: layoutedNodes, edges: layoutedEdges } = e.data;
          applyLayout(layoutedNodes, layoutedEdges);
        };

        workerRef.current.postMessage({
          nodes: rawNodes,
          edges: rawEdges,
          direction: horizontal ? 'LR' : 'TB',
        });
      } else {
        const { nodes: layoutedNodes, edges: layoutedEdges } = layoutOGSSync(
          rawNodes,
          rawEdges,
          horizontal ? 'LR' : 'TB'
        );
        applyLayout(layoutedNodes, layoutedEdges);
      }
    };

    if (layoutTaskRef.current === null) {
      layoutTaskRef.current = scheduleDeferred(runLayout);
    }

    return () => {
      if (layoutTaskRef.current !== null) {
        cancelDeferred(layoutTaskRef.current);
        layoutTaskRef.current = null;
      }
    };
  }, [needsLayout, gameTree, rootId, horizontal, currentNodeId, edgeColor, setNodes, setEdges]);

  // Ensure the currently selected node is visible
  React.useEffect(() => {
    if (currentNodeId === null) return;

    if (needsLayout || visibleNodeIdsRef.current.size === 0) {
      return;
    }

    const currentIdString = String(currentNodeId);
    if (!visibleNodeIdsRef.current.has(currentIdString)) {
      setNeedsLayout(true);
    }
  }, [currentNodeId, needsLayout]);

  // Pan to current node without changing zoom
  React.useEffect(() => {
    if (currentNodeId === null || !reactFlowInstance.current) return;

    if (panFrameRef.current !== null) {
      cancelAnimationFrame(panFrameRef.current);
    }

    panFrameRef.current = requestAnimationFrame(() => {
      const currentNode = allNodesRef.current.find(n => n.id === String(currentNodeId));
      if (!currentNode || !reactFlowInstance.current) {
        return;
      }

      if (prevCurrentNodeId.current === currentNodeId) {
        return;
      }

      const { x, y } = currentNode.position;
      const zoom = reactFlowInstance.current.getZoom();
      reactFlowInstance.current.setCenter(x + 12, y + 12, { zoom, duration: 0 });
      prevCurrentNodeId.current = currentNodeId;

      updateVisibleNodes();
    });
  }, [currentNodeId, updateVisibleNodes]);

  // Clean up pending pan animation
  React.useEffect(() => {
    return () => {
      if (panFrameRef.current !== null) {
        cancelAnimationFrame(panFrameRef.current);
        panFrameRef.current = null;
      }
    };
  }, []);

  // Reset initialization flag when file changes
  React.useEffect(() => {
    hasInitializedView.current = false;
    prevCurrentNodeId.current = null;
  }, [gameTree, rootId]);

  // Re-center on the current node after layout direction toggle
  React.useEffect(() => {
    prevCurrentNodeId.current = null;
  }, [horizontal]);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const nodeId = node.id === '0' ? 0 : Number(node.id);
      goToNode(nodeId);
    },
    [goToNode]
  );

  const handleMove = useCallback(() => {
    // Intentionally empty - all nodes are always rendered
  }, []);

  const handleMoveEnd = useCallback(() => {
    if (!reactFlowInstance.current) return;
    const { zoom } = reactFlowInstance.current.getViewport();
    persistedZoomRef.current = zoom;
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(LOCAL_STORAGE_ZOOM_KEY, zoom.toString());
    }
  }, []);

  return {
    nodes,
    edges,
    graphExtent,
    allNodesRef,
    containerRef,
    reactFlowInstance,
    horizontal,
    edgeColor,
    isLoading,
    updateVisibleNodes,
    centerOnCurrentNode,
    onNodeClick,
    handleMove,
    handleMoveEnd,
  };
}
