/**
 * Utility functions for GameTreeGraph layout and graph building.
 */

import type { Node, Edge } from 'reactflow';
import type { GameTreeNode } from '@kaya/gametree';
import type { SGFProperty } from '../../contexts/GameTreeContext';

const LAYOUT_IDLE_TIMEOUT = 150;

type IdleCallbackHandle = number;

type RequestIdleCallbackFn = (
  callback: IdleRequestCallback,
  options?: IdleRequestOptions
) => number;

type CancelIdleCallbackFn = (handle: number) => void;

export const scheduleDeferred = (callback: () => void): IdleCallbackHandle => {
  if (typeof window === 'undefined') {
    callback();
    return 0;
  }

  const win = window as typeof window & {
    requestIdleCallback?: RequestIdleCallbackFn;
  };

  if (win.requestIdleCallback) {
    return win.requestIdleCallback(() => callback(), { timeout: LAYOUT_IDLE_TIMEOUT });
  }

  return window.setTimeout(callback, 16);
};

export const cancelDeferred = (handle: IdleCallbackHandle): void => {
  if (handle === 0) {
    return;
  }

  if (typeof window === 'undefined') {
    return;
  }

  const win = window as typeof window & {
    cancelIdleCallback?: CancelIdleCallbackFn;
  };

  if (win.cancelIdleCallback) {
    win.cancelIdleCallback(handle);
    return;
  }

  window.clearTimeout(handle);
};

export { type IdleCallbackHandle };

// Node size constants (must match worker)
const NODE_WIDTH = 24;
const NODE_HEIGHT = 24;
const H_SPACING = 14;
const V_SPACING = 18;

export function getNodeColor(node: GameTreeNode<SGFProperty>): 'black' | 'white' | 'empty' {
  if (node.data.B) return 'black';
  if (node.data.W) return 'white';
  return 'empty';
}

export function isPassNode(node: GameTreeNode<SGFProperty>): boolean {
  const blackMove = node.data.B?.[0];
  const whiteMove = node.data.W?.[0];

  if (blackMove !== undefined) {
    return blackMove === '' || blackMove === 'tt';
  }
  if (whiteMove !== undefined) {
    return whiteMove === '' || whiteMove === 'tt';
  }

  return false;
}

export function hasComment(node: GameTreeNode<SGFProperty>): boolean {
  return !!(node.data.C && node.data.C[0] && node.data.C[0].trim() !== '');
}

export function hasMarkers(node: GameTreeNode<SGFProperty>): boolean {
  const markerProps = ['TR', 'SQ', 'CR', 'MA', 'LB'];
  return markerProps.some(prop => node.data[prop] && (node.data[prop] as string[]).length > 0);
}

export function hasSetupStones(node: GameTreeNode<SGFProperty>): boolean {
  const setupProps = ['AB', 'AW', 'AE'];
  return setupProps.some(prop => node.data[prop] && (node.data[prop] as string[]).length > 0);
}

/**
 * OGS-style layout algorithm (sync version for fallback)
 */
export function layoutOGSSync(
  nodes: Node[],
  edges: Edge[],
  direction: 'TB' | 'LR'
): { nodes: Node[]; edges: Edge[] } {
  if (nodes.length === 0) return { nodes, edges };

  const childrenMap = new Map<string, string[]>();
  const parentMap = new Map<string, string>();

  for (const edge of edges) {
    if (!childrenMap.has(edge.source)) {
      childrenMap.set(edge.source, []);
    }
    childrenMap.get(edge.source)!.push(edge.target);
    parentMap.set(edge.target, edge.source);
  }

  const nodeIds = new Set(nodes.map(n => n.id));
  let rootId: string | null = null;
  for (const nodeId of nodeIds) {
    if (!parentMap.has(nodeId)) {
      rootId = nodeId;
      break;
    }
  }

  if (!rootId) {
    rootId = nodes[0].id;
  }

  const positions = new Map<string, { x: number; y: number }>();
  const isHorizontal = direction === 'LR';
  const nodeSpacing = NODE_HEIGHT + H_SPACING;

  const nextOffsetAtDepth = new Map<number, number>();

  function assignPositions(nodeId: string, depth: number, inheritedOffset: number): void {
    const children = childrenMap.get(nodeId) || [];
    const nextAvailable = nextOffsetAtDepth.get(depth) ?? 0;
    const actualOffset =
      inheritedOffset < 0 ? nextAvailable : Math.max(inheritedOffset, nextAvailable);
    const mainAxisPos = depth * (isHorizontal ? NODE_WIDTH + V_SPACING : NODE_HEIGHT + V_SPACING);

    if (isHorizontal) {
      positions.set(nodeId, { x: mainAxisPos, y: actualOffset });
    } else {
      positions.set(nodeId, { x: actualOffset, y: mainAxisPos });
    }

    nextOffsetAtDepth.set(depth, actualOffset + nodeSpacing);

    if (children.length === 0) return;

    for (let i = 0; i < children.length; i++) {
      if (i === 0) {
        assignPositions(children[i], depth + 1, actualOffset);
      } else {
        assignPositions(children[i], depth + 1, -1);
      }
    }
  }

  assignPositions(rootId, 0, 0);

  const layoutedNodes = nodes.map(node => {
    const pos = positions.get(node.id);
    return pos ? { ...node, position: pos } : node;
  });

  return { nodes: layoutedNodes, edges };
}

/**
 * Find the path from root to target node
 */
export function findPathToNode(
  node: GameTreeNode<SGFProperty>,
  targetId: string | number,
  visited = new Set<string | number>()
): GameTreeNode<SGFProperty>[] | null {
  if (visited.has(node.id)) return null;
  visited.add(node.id);

  if (node.id === targetId) {
    return [node];
  }

  for (const child of node.children) {
    const path = findPathToNode(child, targetId, visited);
    if (path) {
      return [node, ...path];
    }
  }

  return null;
}

/**
 * Build graph elements with smart node selection for large trees.
 *
 * Strategy: Prioritize Path + Siblings.
 * 1. Always include all nodes on the path from root to currentNode
 * 2. Always include all siblings of path nodes (alternative variations)
 * 3. Fill remaining capacity with depth-first from included nodes
 */
export function buildGraphElements(
  rootNode: GameTreeNode<SGFProperty>,
  currentNodeId: string | number | null,
  horizontal: boolean,
  edgeColor: string = '#fff'
): { nodes: Node[]; edges: Edge[]; includedNodeIds: Set<string | number> } {
  const MAX_NODES = 1000;

  const includedNodes = new Set<string | number>();
  const nodeMap = new Map<string | number, GameTreeNode<SGFProperty>>();

  function buildMap(n: GameTreeNode<SGFProperty>) {
    nodeMap.set(n.id, n);
    for (const child of n.children) {
      buildMap(child);
    }
  }
  buildMap(rootNode);

  // Phase 1: Find path to current node and include path + siblings
  const pathNodes = currentNodeId !== null ? findPathToNode(rootNode, currentNodeId) : null;

  includedNodes.add(rootNode.id);

  if (pathNodes) {
    for (const node of pathNodes) {
      includedNodes.add(node.id);
    }
  }

  // Include siblings of all path nodes (alternative variations)
  if (pathNodes) {
    for (const pathNode of pathNodes) {
      if (pathNode.parentId !== null) {
        const parent = nodeMap.get(pathNode.parentId);
        if (parent) {
          for (const sibling of parent.children) {
            includedNodes.add(sibling.id);
          }
        }
      }
    }
  }

  // Also include all direct children of root
  for (const child of rootNode.children) {
    includedNodes.add(child.id);
  }

  // Phase 2: Fill remaining capacity with depth-first traversal
  const queue: GameTreeNode<SGFProperty>[] = [];

  if (pathNodes) {
    for (const pathNode of pathNodes) {
      for (const child of pathNode.children) {
        if (!includedNodes.has(child.id)) {
          queue.push(child);
        }
      }
    }
  }

  for (const nodeId of includedNodes) {
    const node = nodeMap.get(nodeId);
    if (node) {
      for (const child of node.children) {
        if (!includedNodes.has(child.id) && !queue.some(q => q.id === child.id)) {
          queue.push(child);
        }
      }
    }
  }

  while (queue.length > 0 && includedNodes.size < MAX_NODES) {
    const node = queue.shift()!;
    if (includedNodes.has(node.id)) continue;

    includedNodes.add(node.id);

    for (const child of node.children) {
      if (!includedNodes.has(child.id)) {
        queue.push(child);
      }
    }
  }

  // Phase 3: Build React Flow nodes with move numbers
  const nodes: Node[] = [];
  const moveNumbers = new Map<string | number, number>();

  function calculateMoveNumbers(n: GameTreeNode<SGFProperty>, moveNum: number) {
    const color = getNodeColor(n);
    const currentMoveNum = color !== 'empty' ? moveNum + 1 : moveNum;
    moveNumbers.set(n.id, currentMoveNum);

    for (const child of n.children) {
      if (includedNodes.has(child.id)) {
        calculateMoveNumbers(child, currentMoveNum);
      }
    }
  }
  calculateMoveNumbers(rootNode, 0);

  for (const nodeId of includedNodes) {
    const n = nodeMap.get(nodeId);
    if (!n) continue;

    const color = getNodeColor(n);
    const isRoot = n.id === rootNode.id;
    const isPass = isPassNode(n);
    const moveNum = moveNumbers.get(n.id) ?? 0;

    nodes.push({
      id: String(n.id),
      type: 'stone',
      position: { x: 0, y: 0 },
      data: {
        nodeId: n.id,
        color,
        moveNumber: color !== 'empty' ? moveNum : 0,
        hasComment: hasComment(n),
        hasMarkers: hasMarkers(n),
        hasSetupStones: hasSetupStones(n),
        horizontal,
        isRoot,
        isPass,
      },
    });
  }

  // Phase 4: Create edges between included nodes
  const edges: Edge[] = [];
  for (const nodeId of includedNodes) {
    const n = nodeMap.get(nodeId);
    if (!n) continue;

    for (const child of n.children) {
      if (includedNodes.has(child.id)) {
        edges.push({
          id: `e${String(n.id)}-${String(child.id)}`,
          source: String(n.id),
          target: String(child.id),
          style: { stroke: edgeColor, strokeWidth: 1.5 },
        });
      }
    }
  }

  return { nodes, edges, includedNodeIds: includedNodes };
}
