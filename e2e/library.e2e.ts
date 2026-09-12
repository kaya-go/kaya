/**
 * Library panel tests
 *
 * Covers the inline rename flow. The tree renderer is handed to react-arborist
 * as a component type, so an unstable renderer identity remounts rows and
 * destroys the focused rename field (see #146): these tests pin that down by
 * typing in the middle of a name and checking the caret never jumps.
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
