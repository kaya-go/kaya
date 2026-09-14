/**
 * Library panel tests
 *
 * Covers the inline rename flow. The tree renderer is handed to react-arborist
 * as a component type, so an unstable renderer identity remounts rows and
 * destroys the focused rename field (see #146): these tests pin that down by
 * typing in the middle of a name and checking the caret never jumps.
 *
 * Also covers how the context menu is dismissed, including after a tree drag
 * (see #181).
 */

import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

test.setTimeout(20000);

/** Creates a folder in the library and returns its row locator. */
async function createFolder(page: Page, name: string) {
  await page.goto('/');

  const newFolderButton = page.locator('.library-btn[title="New Folder"]');
  await expect(newFolderButton).toBeVisible();
  await newFolderButton.click();

  const dialogInput = page.locator('.library-dialog-input');
  await expect(dialogInput).toBeVisible();
  await dialogInput.fill(name);
  await page.locator('.library-dialog-btn.primary').click();

  const row = page.locator('.library-tree-node', { hasText: name });
  await expect(row).toBeVisible();
  return row;
}

/** Opens the context menu on a row and starts renaming it. */
async function startRename(page: Page, row: ReturnType<Page['locator']>) {
  await row.click({ button: 'right' });
  await page.locator('.library-context-menu-item', { hasText: 'Rename' }).click();

  const input = page.locator('.library-tree-node-input');
  await expect(input).toBeFocused();
  return input;
}

test.describe('Library rename', () => {
  test('keeps the caret in place while typing', async ({ page }) => {
    const row = await createFolder(page, 'Joseki');
    const input = await startRename(page, row);

    // The name starts out selected; collapse the selection to the start and
    // walk the caret to just after "Jos".
    await page.keyboard.press('ArrowLeft');
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press('ArrowRight');
    }

    // Each keystroke must land where the caret is, not at the end of the name.
    await page.keyboard.type('XYZ');

    await expect(input).toHaveValue('JosXYZeki');
    expect(await input.evaluate(el => (el as HTMLInputElement).selectionStart)).toBe(6);
  });

  test('commits the new name on Enter', async ({ page }) => {
    const row = await createFolder(page, 'Fuseki');
    const input = await startRename(page, row);

    await input.fill('Renamed Fuseki');
    await page.keyboard.press('Enter');

    await expect(input).toHaveCount(0);
    await expect(page.locator('.library-tree-node', { hasText: 'Renamed Fuseki' })).toBeVisible();
  });

  test('discards the edit on Escape', async ({ page }) => {
    const row = await createFolder(page, 'Tsumego');
    const input = await startRename(page, row);

    await input.fill('Should not stick');
    await page.keyboard.press('Escape');

    await expect(input).toHaveCount(0);
    await expect(page.locator('.library-tree-node', { hasText: 'Tsumego' })).toBeVisible();
    await expect(page.locator('.library-tree-node', { hasText: 'Should not stick' })).toHaveCount(
      0
    );
  });
});

// The menu opens with its top-left corner on the right-click point (the row's
// centre), so follow-up pointer actions aim at the row's top-left corner to stay
// clear of it.
const ROW_CORNER = { x: 5, y: 5 };

test.describe('Library context menu', () => {
  test('closes on Escape', async ({ page }) => {
    const row = await createFolder(page, 'Openings');
    await row.click({ button: 'right' });
    await expect(page.locator('.library-context-menu')).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(page.locator('.library-context-menu')).toHaveCount(0);
  });

  test('closes on a press outside it', async ({ page }) => {
    const row = await createFolder(page, 'Middlegame');
    await row.click({ button: 'right' });
    await expect(page.locator('.library-context-menu')).toBeVisible();

    await row.click({ position: ROW_CORNER });

    await expect(page.locator('.library-context-menu')).toHaveCount(0);
  });

  test('closes on wheel scroll over the tree', async ({ page }) => {
    const row = await createFolder(page, 'Endgame');
    await row.click({ button: 'right' });
    await expect(page.locator('.library-context-menu')).toBeVisible();

    await row.hover({ position: ROW_CORNER });
    await page.mouse.wheel(0, 100);

    await expect(page.locator('.library-context-menu')).toHaveCount(0);
  });

  test('does not stick after dragging an item into a folder', async ({ page }) => {
    const target = await createFolder(page, 'Alpha');
    const source = await createFolder(page, 'Beta');
    await source.click({ button: 'right' });
    await expect(page.locator('.library-context-menu')).toBeVisible();

    // HTML5 drag-and-drop fires no click, which is what used to leave the menu open.
    // Locator.dragTo jumps to the target in one move, too fast for react-dnd to
    // register a hover, so drive the mouse in steps.
    const from = (await source.boundingBox())!;
    const to = (await target.boundingBox())!;
    await page.mouse.move(from.x + ROW_CORNER.x, from.y + ROW_CORNER.y);
    await page.mouse.down();
    await page.mouse.move(from.x + 15, from.y + 10, { steps: 5 });
    await page.mouse.move(to.x + to.width / 2, to.y + to.height / 2, { steps: 10 });
    await page.mouse.up();

    await expect(page.locator('.library-context-menu')).toHaveCount(0);
    await expect(
      page.locator('[role="treeitem"][aria-level="2"]', { hasText: 'Beta' })
    ).toBeVisible();
  });
});
