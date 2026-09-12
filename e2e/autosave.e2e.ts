/**
 * Auto-save tests
 *
 * Saving on unmount / page refresh runs a full synchronous save: SGF
 * serialization plus a localStorage write. It has to stay off the navigation
 * path. With the game state in that effect's dependency list, React ran its
 * cleanup on every move change and wrote the whole game per arrow key,
 * defeating the 2s debounce.
 */

import { test, expect } from '@playwright/test';

test.setTimeout(20000);

const AUTO_SAVE_KEY = 'kaya-auto-save';

/** Counts writes to the auto-save key, before any app code runs. */
async function countAutoSaveWrites(page: import('@playwright/test').Page) {
  await page.addInitScript(key => {
    const counter = window as unknown as { __autoSaveWrites: number };
    counter.__autoSaveWrites = 0;
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function (name: string, value: string) {
      if (name === key) counter.__autoSaveWrites++;
      return originalSetItem.call(this, name, value);
    };
  }, AUTO_SAVE_KEY);
}

const reads = () =>
  (window as unknown as { __autoSaveWrites: number }).__autoSaveWrites satisfies number;

test.describe('Auto-save', () => {
  test('navigating does not rewrite the game on every step', async ({ page }) => {
    await countAutoSaveWrites(page);
    await page.goto('/');
    await expect(page.locator('.shudan-goban')).toBeVisible();

    const moves: [number, number][] = [
      [3, 3],
      [15, 3],
      [3, 15],
      [15, 15],
      [9, 3],
      [3, 9],
      [15, 9],
      [9, 15],
      [9, 9],
    ];
    for (const [x, y] of moves) {
      await page.locator(`.shudan-vertex[data-x="${x}"][data-y="${y}"]`).click();
    }
    await expect(page.locator('.shudan-vertex[data-x="9"][data-y="9"]')).toHaveClass(
      /shudan-sign_1/
    );

    const before = await page.evaluate(reads);

    // Walk backwards well inside the 2s debounce window, then jump back to the
    // end. The assertions matter: they prove navigation really happened, so the
    // write count below is measured over real navigation steps.
    const lastStone = page.locator('.shudan-vertex[data-x="9"][data-y="9"]');
    for (let i = 0; i < 8; i++) await page.keyboard.press('ArrowLeft');
    await expect(lastStone).not.toHaveClass(/shudan-sign_1/);
    await page.keyboard.press('End');
    await expect(lastStone).toHaveClass(/shudan-sign_1/);

    const after = await page.evaluate(reads);

    // 0 is the expected value; 1 tolerates a debounced save landing mid-walk.
    expect(after - before).toBeLessThanOrEqual(1);
  });

  test('saves the game when the page unloads inside the debounce window', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.shudan-goban')).toBeVisible();
    await page.evaluate(key => localStorage.removeItem(key), AUTO_SAVE_KEY);

    await page.locator('.shudan-vertex[data-x="3"][data-y="3"]').click();
    await expect(page.locator('.shudan-vertex[data-x="3"][data-y="3"]')).toHaveClass(
      /shudan-sign_1/
    );

    // Refreshing right after a move, before the debounce fires, must not lose it.
    await page.evaluate(() => window.dispatchEvent(new Event('beforeunload')));

    const saved = await page.evaluate(key => localStorage.getItem(key), AUTO_SAVE_KEY);
    expect(saved).toContain('B[dd]');
  });

  test('still saves the game once the debounce elapses', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.shudan-goban')).toBeVisible();

    await page.locator('.shudan-vertex[data-x="3"][data-y="3"]').click();
    await expect(page.locator('.shudan-vertex[data-x="3"][data-y="3"]')).toHaveClass(
      /shudan-sign_1/
    );

    await page.waitForFunction(key => localStorage.getItem(key) !== null, AUTO_SAVE_KEY, {
      timeout: 10000,
    });
    const saved = await page.evaluate(key => localStorage.getItem(key), AUTO_SAVE_KEY);
    expect(saved).toContain('B[dd]');
  });
});
