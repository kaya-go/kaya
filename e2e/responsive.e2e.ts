/**
 * Responsive design and viewport tests
 */

import { test, expect } from '@playwright/test';

test.setTimeout(10000);

test.describe('Responsive Design', () => {
  test('mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Game tree on a phone', () => {
  test.use({ locale: 'en-US' });

  /* React Flow marks its nodes role="button", so the mobile touch-target rule
     matches them. The layout worker spaces stones on a 24 px grid; inflated
     tiles drift off their edge handles and the lines collapse into stubs. */
  test('stones keep the 24 px size the layout depends on', async ({ page }) => {
    test.setTimeout(15000);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.getByRole('button', { name: 'New Game', exact: true }).click();
    await page.locator('.shudan-vertex[data-x="3"][data-y="3"]').click();
    await page.getByRole('tab', { name: /tree/i }).click();

    const stones = page.locator('.react-flow__node-stone');
    await expect(stones).toHaveCount(2);
    // Layout size, not the bounding box: React Flow zooms the viewport.
    const sizes = await stones.evaluateAll(nodes =>
      nodes.map(node => [(node as HTMLElement).offsetWidth, (node as HTMLElement).offsetHeight])
    );
    expect(sizes).toEqual([
      [24, 24],
      [24, 24],
    ]);
  });
});

test.describe('Dark Mode', () => {
  test('respects dark mode', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
  });
});
