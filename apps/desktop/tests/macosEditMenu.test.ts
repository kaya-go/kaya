/**
 * On macOS, Cmd+C, Cmd+V, Cmd+X, Cmd+A and Cmd+Z in a text field are menu key
 * equivalents: the webview copies, pastes or selects only when the app menu
 * has the matching item. The desktop app shipped from v0.3.0 to v0.4.18 with
 * a Kaya submenu alone, and none of these shortcuts worked in any text field.
 * See specs/2026-11-20-macos-edit-menu.md.
 */

import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const lib = readFileSync(join(import.meta.dir, '../src-tauri/src/lib.rs'), 'utf8');

// The block built only on macOS, up to the menu it installs.
const macosMenu = lib.match(
  /#\[cfg\(target_os = "macos"\)\]\s*\{[\s\S]*?app\.set_menu\(menu\)/
)?.[0];

describe('macOS app menu', () => {
  test('is found in lib.rs', () => {
    expect(macosMenu).toBeDefined();
  });

  test.each(['undo', 'redo', 'cut', 'copy', 'paste', 'select_all'])(
    'has the predefined %s item',
    item => {
      expect(macosMenu).toContain(`PredefinedMenuItem::${item}(`);
    }
  );

  test('installs the Edit submenu next to the Kaya one', () => {
    expect(macosMenu).toMatch(/Menu::with_items\(handle, &\[&app_menu, &edit_menu\]\)/);
  });
});
