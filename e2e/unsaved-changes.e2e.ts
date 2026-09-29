/**
 * Unsaved-changes marker
 *
 * The file is dirty when the game tree differs from the one last loaded or
 * saved, compared by identity. Undoing every edit restores that exact tree, so
 * the marker has to go away again.
 */

import { test, expect } from '@playwright/test';

test.setTimeout(15000);

test.describe('Unsaved changes', () => {
  test('undoing back to the loaded game clears the marker', async ({ page }) => {
    await page.goto('/');
    await page.locator('.app-header input[type="file"][accept^=".sgf"]').setInputFiles({
      name: 'dirty.sgf',
      mimeType: 'application/x-go-sgf',
      buffer: Buffer.from('(;GM[1]FF[4]SZ[19];B[pd];W[dp])'),
    });

    // The filename renders in both the desktop and the mobile header slot.
    const marker = page.locator('.header-dirty-indicator');
    await expect(page.locator('.header-filename').first()).toContainText('dirty.sgf');
    await expect(marker).toHaveCount(0);

    const tengen = page.locator('.shudan-vertex[data-x="9"][data-y="9"]');
    await tengen.click();
    await expect(tengen).toHaveClass(/shudan-sign_(1|-1)/);
    await expect(marker.first()).toBeAttached();

    await page.keyboard.press('ControlOrMeta+z');
    await expect(tengen).not.toHaveClass(/shudan-sign_(1|-1)/);
    await expect(marker).toHaveCount(0);

    await page.keyboard.press('ControlOrMeta+Shift+z');
    await expect(tengen).toHaveClass(/shudan-sign_(1|-1)/);
    await expect(marker.first()).toBeAttached();
  });
});
