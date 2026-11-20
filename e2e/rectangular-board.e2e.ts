/**
 * A rectangular board is as wide as its width and as tall as its height,
 * for its markers and for the keyboard cursor
 */

import { test, expect, type Page } from '@playwright/test';

test.setTimeout(20000);
test.use({ locale: 'en-US' });

// 9 columns, 13 rows; circles in the bottom-left and bottom-right corners.
const TALL_GAME = '(;GM[1]FF[4]SZ[9:13]CR[am][im])';

const headerOpen = (page: Page) => page.locator('.app-header input[type="file"][accept^=".sgf"]');
const vertex = (page: Page, x: number, y: number) =>
  page.locator(`.shudan-vertex[data-x="${x}"][data-y="${y}"]`);

async function openTallGame(page: Page) {
  await page.goto('/');
  await expect(page.locator('.shudan-goban')).toBeVisible();
  await headerOpen(page).setInputFiles({
    name: 'tall.sgf',
    mimeType: 'application/x-go-sgf',
    buffer: Buffer.from(TALL_GAME),
  });
  await expect(vertex(page, 8, 12)).toBeVisible();
  await expect(vertex(page, 9, 0)).toHaveCount(0);
}

test.describe('Rectangular board', () => {
  test('markers on the rows past the width are drawn', async ({ page }) => {
    await openTallGame(page);
    await expect(vertex(page, 0, 12).locator('.shudan-marker-circle')).toBeVisible();
    await expect(vertex(page, 8, 12).locator('.shudan-marker-circle')).toBeVisible();
  });

  test('the cursor starts at the centre and wraps at the width', async ({ page }) => {
    await openTallGame(page);
    await page.keyboard.press('n');

    const cursor = page.locator('.shudan-cursor-marker');
    await expect(cursor).toHaveCount(1);
    await expect(vertex(page, 4, 6).locator('.shudan-cursor-marker')).toHaveCount(1);

    for (let i = 0; i < 5; i++) await page.keyboard.press('ArrowRight');
    await expect(vertex(page, 0, 6).locator('.shudan-cursor-marker')).toHaveCount(1);

    for (let i = 0; i < 7; i++) await page.keyboard.press('ArrowDown');
    await expect(vertex(page, 0, 0).locator('.shudan-cursor-marker')).toHaveCount(1);
  });
});
