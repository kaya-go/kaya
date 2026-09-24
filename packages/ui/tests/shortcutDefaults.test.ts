/**
 * Guards DEFAULT_SHORTCUTS against two actions sharing a default binding.
 *
 * Each shortcut is handled by its own window keydown listener, so a shared
 * binding fires both. `view.toggleHeader` and `edit.makeMainBranch` both
 * defaulted to Cmd/Ctrl+Shift+M: one press toggled the header and reordered
 * the game tree. The settings collision dialog only guards manual rebinds.
 *
 * See specs/2026-09-24-gametree-branch-management.md.
 */

import { test, expect } from 'bun:test';
import { DEFAULT_SHORTCUTS, type KeyBinding } from '../src/hooks/shortcutTypes';

const describeBinding = ({ key, modifiers }: KeyBinding): string =>
  [
    modifiers.ctrl && 'ctrl',
    modifiers.meta && 'meta',
    modifiers.alt && 'alt',
    modifiers.shift && 'shift',
    key,
  ]
    .filter(Boolean)
    .join('+');

test('no two shortcuts share a default binding', () => {
  const owners = new Map<string, string[]>();
  for (const [id, { defaultBinding }] of Object.entries(DEFAULT_SHORTCUTS)) {
    const binding = describeBinding(defaultBinding);
    owners.set(binding, [...(owners.get(binding) ?? []), id]);
  }

  const collisions = [...owners].filter(([, ids]) => ids.length > 1);
  expect(collisions).toEqual([]);
});
