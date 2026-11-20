/**
 * The analysis chart plots one point per position of the branch, and a click
 * goes to the position under the pointer, analysed or not
 */

import { test, expect, type Page } from '@playwright/test';

test.setTimeout(20000);
test.use({ locale: 'en-US' });

// Five positions: the root, B, a comment-only node, W, B. The comment node
// is a position of the branch but not a move, so move counts and positions
// part ways after it.
const GAME = '(;GM[1]FF[4]SZ[9];B[aa];C[a comment, no move];W[bb];B[cc])';

const vertex = (page: Page, x: number, y: number) =>
  page.locator(`.shudan-vertex[data-x="${x}"][data-y="${y}"]`);

/** Click the chart at a position index, given the branch's last index. */
async function clickPosition(page: Page, index: number, lastIndex: number) {
  const svg = page.locator('.analysis-chart-svg');
  const box = (await svg.boundingBox())!;
  // CHART_PADDING: left 40, right 36; the plot spans what is between.
  const position = { x: 40 + (index / lastIndex) * (box.width - 76), y: box.height / 2 };
  await svg.hover({ position });
  await expect(page.locator('.chart-hover-line')).toHaveCount(1);
  await svg.click({ position });
}

test('a click on an unanalysed point goes to that position of the branch', async ({ page }) => {
  await page.goto('/');
  await page.locator('.app-header input[type="file"][accept^=".sgf"]').setInputFiles({
    name: 'comment.sgf',
    mimeType: 'application/x-go-sgf',
    buffer: Buffer.from(GAME),
  });
  await expect(page.locator('.app-header')).toContainText('comment.sgf');
  await page.keyboard.press('Home');
  await expect(vertex(page, 0, 0)).not.toHaveClass(/shudan-sign_1/);
  await expect(page.locator('.analysis-chart-svg')).toBeVisible();

  // Position 3 is W[bb]: the third move would be B[cc].
  await clickPosition(page, 3, 4);
  await expect(vertex(page, 1, 1)).toHaveClass(/shudan-sign_-1/);
  await expect(vertex(page, 2, 2)).not.toHaveClass(/shudan-sign_1/);

  // Position 2 is the comment node.
  await clickPosition(page, 2, 4);
  await expect(vertex(page, 1, 1)).not.toHaveClass(/shudan-sign_-1/);
  await expect(page.getByText('a comment, no move')).toBeVisible();
});
