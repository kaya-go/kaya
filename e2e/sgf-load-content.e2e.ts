/**
 * A file opens with everything it holds: the forms SGF allows a property to be
 * written in all reach the board.
 */

import { test, expect, type Page } from '@playwright/test';

test.setTimeout(20000);
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
});
