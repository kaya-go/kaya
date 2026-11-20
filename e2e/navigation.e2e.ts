/**
 * Keyboard and game tree navigation tests
 */

import { test, expect } from '@playwright/test';

test.setTimeout(10000);

test.describe('Keyboard Navigation', () => {
  test('arrow keys work', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.shudan-goban')).toBeVisible();

    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('Home');
    await page.keyboard.press('End');

    await expect(page.locator('body')).toBeVisible();
  });

  // The board defers Home and End to the next animation frame. Pressed within
  // one frame, End used to start from the node Home had just left, so it found
  // nothing to do and the game stayed on its first move.
  test('Home then End within one frame ends on the last move', async ({ page }) => {
    await page.goto('/');
    await page.locator('.app-header input[type="file"][accept^=".sgf"]').setInputFiles({
      name: 'short.sgf',
      mimeType: 'application/x-go-sgf',
      buffer: Buffer.from('(;GM[1]FF[4]SZ[19];B[aa];W[bb];B[cc])'),
    });
    const counter = page.locator('.board-controls');
    // A game opens on its last move.
    await expect(counter).toContainText('Move 3 / 3');

    // Both key presses in one task, then let the deferred navigation run.
    await page.evaluate(async () => {
      for (const key of ['Home', 'End']) {
        document.body.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
      }
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    });
    await expect(counter).toContainText('Move 3 / 3');
  });
});

test.describe('Game tree highlight', () => {
  test('follows navigation and stays on one node', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.shudan-goban')).toBeVisible();

    await page.locator('.shudan-vertex[data-x="3"][data-y="3"]').click();
    await page.locator('.shudan-vertex[data-x="15"][data-y="3"]').click();

    const currentNodes = () =>
      page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>('.react-flow__node')]
          .filter(node =>
            [node, ...node.querySelectorAll<HTMLElement>('*')].some(el =>
              getComputedStyle(el).boxShadow.includes('rgb(74, 158, 255)')
            )
          )
          .map(node => node.dataset.id)
      );

    await expect.poll(currentNodes).toHaveLength(1);
    const atEnd = await currentNodes();

    await page.keyboard.press('ArrowLeft');
    await expect.poll(currentNodes).not.toEqual(atEnd);
    await expect.poll(currentNodes).toHaveLength(1);

    await page.keyboard.press('ArrowRight');
    await expect.poll(currentNodes).toEqual(atEnd);
  });
});

test.describe('Game tree view', () => {
  const viewportScale = (page: import('@playwright/test').Page) =>
    page
      .locator('.react-flow__viewport')
      .evaluate(el => new DOMMatrix(getComputedStyle(el).transform).a);

  /** The scale once the view stops moving (re-centring and zooming animate). */
  async function settledScale(page: import('@playwright/test').Page): Promise<number> {
    let scale = NaN;
    await expect
      .poll(
        async () => {
          const previous = scale;
          scale = await viewportScale(page);
          return scale === previous;
        },
        { intervals: [250] }
      )
      .toBe(true);
    return scale;
  }

  test('keeps the zoom the user chose when the game changes', async ({ page }) => {
    await page.goto('/');
    await page.locator('.shudan-vertex[data-x="3"][data-y="3"]').click();
    await expect(page.locator('.react-flow__node[data-id="1"]')).toBeVisible();

    const before = await settledScale(page);
    await page.locator('.react-flow__controls-zoomin').click();
    await page.locator('.react-flow__controls-zoomin').click();
    const zoomed = await settledScale(page);
    expect(zoomed).toBeGreaterThan(before * 1.3);

    await page.locator('.shudan-vertex[data-x="15"][data-y="3"]').click();
    await expect(page.locator('.react-flow__node[data-id="2"]')).toBeVisible();
    expect(await settledScale(page)).toBeCloseTo(zoomed, 3);
  });

  test('follows the current node past the nodes the first layout holds', async ({ page }) => {
    // Over a thousand nodes: the first layout around the root leaves the end out.
    const sgf = '(;GM[1]FF[4]SZ[19]' + ';B[];W[]'.repeat(600) + ')';
    await page.goto('/');
    await page.locator('.app-header input[type="file"][accept^=".sgf"]').setInputFiles({
      name: 'long.sgf',
      mimeType: 'application/x-go-sgf',
      buffer: Buffer.from(sgf),
    });
    await expect(page.locator('.app-header')).toContainText('long.sgf');
    await page.keyboard.press('Home');
    await expect(page.locator('.react-flow__node[data-id="0"]')).toBeVisible();

    await page.keyboard.press('End');
    const last = page.locator('.react-flow__node[data-id="1200"]');
    await expect(last).toBeVisible();

    const pane = (await page.locator('.gametree-graph-container').boundingBox())!;
    const node = (await last.boundingBox())!;
    expect(node.x).toBeGreaterThanOrEqual(pane.x);
    expect(node.y).toBeGreaterThanOrEqual(pane.y);
    expect(node.x + node.width).toBeLessThanOrEqual(pane.x + pane.width);
    expect(node.y + node.height).toBeLessThanOrEqual(pane.y + pane.height);
  });
});

test.describe('Board shortcuts behind an open dialog', () => {
  test('arrow keys leave the game alone while settings are open', async ({ page }) => {
    await page.goto('/');
    const stone = page.locator('.shudan-vertex[data-x="3"][data-y="3"]');
    await stone.click();
    await expect(stone).toHaveClass(/shudan-sign_1/);

    await page.locator('.kaya-config-trigger').click();
    await expect(page.locator('.kaya-config-modal')).toBeVisible();
    await page.locator('.kaya-config-modal').click({ position: { x: 5, y: 5 } });
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('Home');
    await page.keyboard.press('Escape');
    await expect(page.locator('.kaya-config-modal')).toHaveCount(0);

    // Still on the move: the keys pressed under the dialog did not navigate.
    await expect(stone).toHaveClass(/shudan-sign_1/);
    await page.keyboard.press('ArrowLeft');
    await expect(stone).not.toHaveClass(/shudan-sign_1/);
  });
});
