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
