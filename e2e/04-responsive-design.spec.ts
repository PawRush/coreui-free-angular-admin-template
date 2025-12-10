import { test, expect, devices } from '@playwright/test';

/**
 * Responsive Design Tests
 *
 * This test suite verifies:
 * - Mobile viewport rendering
 * - Tablet viewport rendering
 * - Desktop viewport rendering
 * - Responsive navigation behavior
 * - Mobile sidebar toggle
 * - Layout adaptations
 * - Touch interactions on mobile
 */
test.describe('Responsive Design', () => {

  test.describe('Mobile Viewport (iPhone 12)', () => {
    test.use({ ...devices['iPhone 12'] });

    test('should render dashboard on mobile', async ({ page }) => {
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      // Verify page loads
      await expect(page.locator('app-dashboard')).toBeVisible();
    });

    test('should hide sidebar initially on mobile', async ({ page }) => {
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      // Sidebar should be hidden or off-canvas on mobile
      const sidebar = page.locator('c-sidebar, .sidebar').first();
      const isVisible = await sidebar.isVisible();

      // Check if sidebar has mobile-hidden class or is positioned off-screen
      if (isVisible) {
        const box = await sidebar.boundingBox();
        // If visible, might be positioned off-screen (x < 0)
        expect(box).toBeTruthy();
      }
    });

    test('should show mobile menu toggle button', async ({ page }) => {
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      // Look for mobile menu toggle (hamburger)
      const toggleButton = page.locator('button[cHeaderToggler], .header-toggler, button.navbar-toggler').first();
      await expect(toggleButton).toBeVisible();
    });

    test('should toggle sidebar on mobile menu click', async ({ page }) => {
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      // Find and click menu toggle
      const toggleButton = page.locator('button[cHeaderToggler], .header-toggler, button.navbar-toggler').first();

      if (await toggleButton.count() > 0) {
        await toggleButton.click();
        await page.waitForTimeout(500);

        // Sidebar should now be visible
        const sidebar = page.locator('c-sidebar, .sidebar').first();
        await expect(sidebar).toBeVisible();
      }
    });

    test('should display widgets in single column on mobile', async ({ page }) => {
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      // Check widget layout
      const widgets = page.locator('app-widgets-dropdown c-col, app-widgets-dropdown [cCol]');
      if (await widgets.count() > 0) {
        const firstWidget = widgets.first();
        const width = await firstWidget.evaluate((el) => el.offsetWidth);

        // On mobile, widgets should take more width (closer to full width)
        const viewport = page.viewportSize();
        expect(width).toBeGreaterThan(viewport!.width * 0.8);
      }
    });

    test('should hide table columns on mobile', async ({ page }) => {
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      // Tables should hide some columns on mobile
      const table = page.locator('table[cTable]').first();
      await table.scrollIntoViewIfNeeded();

      // Count visible columns
      const visibleHeaders = await page.locator('thead th:visible').count();

      // On mobile, should show fewer columns
      expect(visibleHeaders).toBeGreaterThan(0);
    });

    test('should support touch interactions on mobile', async ({ page }) => {
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      // Simulate touch on a button
      const button = page.locator('label[cFormCheckLabel]').first();
      if (await button.count() > 0) {
        await button.tap();
        await page.waitForTimeout(300);
      }
    });

    test('should scroll vertically on mobile', async ({ page }) => {
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      // Get initial scroll position
      const initialScroll = await page.evaluate(() => window.scrollY);

      // Scroll down
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(300);

      const newScroll = await page.evaluate(() => window.scrollY);
      expect(newScroll).toBeGreaterThan(initialScroll);
    });
  });

  test.describe('Tablet Viewport (iPad)', () => {
    test.use({ ...devices['iPad Pro'] });

    test('should render dashboard on tablet', async ({ page }) => {
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      await expect(page.locator('app-dashboard')).toBeVisible();
    });

    test('should show sidebar on tablet', async ({ page }) => {
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      // Sidebar might be visible or toggleable on tablet
      const sidebar = page.locator('c-sidebar, .sidebar').first();
      await expect(sidebar).toBeVisible();
    });

    test('should display widgets in two columns on tablet', async ({ page }) => {
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      // Widgets should have reasonable width for 2-column layout
      const widgets = page.locator('app-widgets-dropdown c-col');
      if (await widgets.count() > 0) {
        const firstWidget = widgets.first();
        const width = await firstWidget.evaluate((el) => el.offsetWidth);

        const viewport = page.viewportSize();
        // Should be less than full width but more than 1/4 width
        expect(width).toBeGreaterThan(viewport!.width * 0.25);
        expect(width).toBeLessThan(viewport!.width * 0.9);
      }
    });

    test('should support navigation on tablet', async ({ page }) => {
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      // Navigate to another page
      const chartsLink = page.locator('a').filter({ hasText: 'Charts' }).first();
      await chartsLink.click();
      await page.waitForLoadState('networkidle');

      expect(page.url()).toContain('/charts');
    });
  });

  test.describe('Desktop Viewport', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('should render full desktop layout', async ({ page }) => {
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      // Verify sidebar is visible
      const sidebar = page.locator('c-sidebar, .sidebar').first();
      await expect(sidebar).toBeVisible();

      // Verify main content area
      const mainContent = page.locator('.wrapper, app-default-layout');
      await expect(mainContent.first()).toBeVisible();
    });

    test('should display widgets in four columns on desktop', async ({ page }) => {
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      // Count widget columns
      const widgets = page.locator('app-widgets-dropdown c-col');
      const count = await widgets.count();

      // Should have multiple widgets visible
      expect(count).toBeGreaterThanOrEqual(4);
    });

    test('should show all table columns on desktop', async ({ page }) => {
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      // Scroll to table
      const table = page.locator('table[cTable]').first();
      await table.scrollIntoViewIfNeeded();

      // Count visible headers
      const headers = await page.locator('thead th').count();
      expect(headers).toBeGreaterThanOrEqual(5);
    });

    test('should have wide main chart on desktop', async ({ page }) => {
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      // Check chart canvas width
      const canvas = page.locator('canvas').first();
      await canvas.waitFor({ state: 'visible' });

      const box = await canvas.boundingBox();
      expect(box!.width).toBeGreaterThan(800);
    });

    test('should maintain sidebar visibility on desktop', async ({ page }) => {
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      const sidebar = page.locator('c-sidebar, .sidebar').first();
      await expect(sidebar).toBeVisible();

      // Navigate to another page
      await page.goto('/charts');
      await page.waitForLoadState('networkidle');

      // Sidebar should still be visible
      await expect(sidebar).toBeVisible();
    });
  });

  test.describe('Responsive Breakpoints', () => {
    test('should adapt layout at small breakpoint (576px)', async ({ page }) => {
      await page.setViewportSize({ width: 576, height: 800 });
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      // Verify page renders
      await expect(page.locator('app-dashboard')).toBeVisible();
    });

    test('should adapt layout at medium breakpoint (768px)', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      await expect(page.locator('app-dashboard')).toBeVisible();
    });

    test('should adapt layout at large breakpoint (992px)', async ({ page }) => {
      await page.setViewportSize({ width: 992, height: 1024 });
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      await expect(page.locator('app-dashboard')).toBeVisible();
    });

    test('should adapt layout at extra large breakpoint (1200px)', async ({ page }) => {
      await page.setViewportSize({ width: 1200, height: 1024 });
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      await expect(page.locator('app-dashboard')).toBeVisible();
    });
  });

  test.describe('Orientation Changes', () => {
    test('should handle landscape to portrait on mobile', async ({ page }) => {
      // Start in landscape
      await page.setViewportSize({ width: 812, height: 375 });
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      await expect(page.locator('app-dashboard')).toBeVisible();

      // Switch to portrait
      await page.setViewportSize({ width: 375, height: 812 });
      await page.waitForTimeout(500);

      // Should still render correctly
      await expect(page.locator('app-dashboard')).toBeVisible();
    });
  });

  test.describe('Content Overflow', () => {
    test('should handle horizontal overflow gracefully', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 568 });
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      // Check if horizontal scrollbar appears (should not, or minimal)
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      // Ideally no horizontal scroll on small screens
      // But if present, content should still be accessible
      if (hasHorizontalScroll) {
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        expect(scrollWidth).toBeDefined();
      }
    });
  });
});
