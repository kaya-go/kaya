/**
 * A file opens with everything it holds: the forms SGF allows a property to be
 * written in all reach the board.
 */

import { readFileSync } from 'fs';
import { test, expect, type Page } from '@playwright/test';

test.setTimeout(20000);

// The same game in GB2312, Shift_JIS, ... bytes, shared with the unit tests.
const charsetFixture = (name: string) =>
  readFileSync(new URL(`../packages/sgf/tests/fixtures/charsets/${name}`, import.meta.url));

test.use({ locale: 'en-US' });

const file = (name: string, content: string | Buffer) => ({
  name,
  mimeType: 'application/x-go-sgf',
  buffer: typeof content === 'string' ? Buffer.from(content) : content,
});

const headerOpen = (page: Page) => page.locator('.app-header input[type="file"][accept^=".sgf"]');
const vertex = (page: Page, x: number, y: number) =>
  page.locator(`.shudan-vertex[data-x="${x}"][data-y="${y}"]`);

test.describe('SGF load content', () => {
  test('a compressed list of setup stones puts every stone of the rectangle on the board', async ({
    page,
  }) => {
    await page.goto('/');
    await headerOpen(page).setInputFiles(file('setup.sgf', '(;GM[1]FF[4]SZ[19]AB[aa:cc])'));

    await expect(page.locator('.shudan-vertex.shudan-sign_1')).toHaveCount(9);
    await expect(vertex(page, 0, 0)).toHaveClass(/shudan-sign_1/);
    await expect(vertex(page, 2, 2)).toHaveClass(/shudan-sign_1/);
  });

  test('a GB2312 file shows its names, and is copied out as UTF-8', async ({
    page,
    context,
    baseURL,
  }) => {
    // Tauri reads the clipboard through its own plugin, not navigator.clipboard.
    test.skip(baseURL?.includes(':1420') ?? false, 'Clipboard API not available in Tauri');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');
    await headerOpen(page).setInputFiles(file('gb2312.sgf', charsetFixture('gb2312.sgf')));

    await expect(page.locator('.board-controls').getByText('柯洁')).toBeVisible();

    await page.getByRole('button', { name: /copy/i }).click();
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toContain('CA[UTF-8]');
    expect(copied).toContain('PB[柯洁]');
    expect(copied).toContain(';B[pd]C[星位]');
    expect(copied).not.toContain('\uFFFD');
  });

  test('a Shift_JIS file imported into the library opens with its names', async ({ page }) => {
    await page.goto('/');
    // The library has read IndexedDB: an import before that is not listed.
    await expect(page.getByText('Your library is empty')).toBeVisible();
    await page
      .locator('.library-panel input[type="file"]')
      .setInputFiles(file('shift_jis.sgf', charsetFixture('shift_jis.sgf')));

    const row = page.locator('.library-tree-node', { hasText: 'shift_jis.sgf' });
    await row.dblclick();
    await expect(page.locator('.board-controls').getByText('井山裕太')).toBeVisible();
  });
});
