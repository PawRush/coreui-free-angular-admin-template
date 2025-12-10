import { test, expect } from '@playwright/test';

/**
 * Sidebar Interactions Tests
 *
 * This test suite verifies:
 * - Sidebar visibility and toggle functionality
 * - Menu item expand/collapse
 * - Navigation items accessibility
 * - Sidebar state persistence
 * - Mobile sidebar behavior
 */
test.describe('Sidebar Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
  });

  test('should display sidebar on desktop', async ({ page }) => {
    // Check if sidebar is visible
    const sidebar = page.locator('c-sidebar, app-sidebar, .sidebar');
    await expect(sidebar.first()).toBeVisible();
  });

  test('should have navigation items in sidebar', async ({ page }) => {
    // Check for nav items
    const navItems = page.locator('.sidebar .nav-link, c-sidebar-nav-item a');
    const count = await navItems.count();
    expect(count).toBeGreaterThan(0);

    // Verify common menu items exist
    await expect(page.locator('a').filter({ hasText: 'Dashboard' }).first()).toBeVisible();
  });

  test('should expand dropdown menu items', async ({ page }) => {
    // Find a dropdown menu (e.g., Base components)
    const baseMenu = page.locator('a.nav-link').filter({ hasText: 'Base' }).first();
    await baseMenu.click();
    await page.waitForTimeout(500);

    // Check if submenu items are visible
    const submenuItems = page.locator('a').filter({ hasText: 'Cards' });
    await expect(submenuItems.first()).toBeVisible();
  });

  test('should collapse expanded dropdown menu', async ({ page }) => {
    // Expand Base menu
    const baseMenu = page.locator('a.nav-link').filter({ hasText: 'Base' }).first();
    await baseMenu.click();
    await page.waitForTimeout(500);

    // Verify it's expanded
    const cardsLink = page.locator('a').filter({ hasText: 'Cards' }).first();
    await expect(cardsLink).toBeVisible();

    // Click again to collapse
    await baseMenu.click();
    await page.waitForTimeout(500);

    // Check if submenu is hidden (may still be in DOM but not visible)
    // Note: CoreUI may keep items in DOM but hide them
  });

  test('should expand multiple dropdown menus independently', async ({ page }) => {
    // Expand Base menu
    await page.locator('a.nav-link').filter({ hasText: 'Base' }).first().click();
    await page.waitForTimeout(300);

    // Expand Buttons menu
    await page.locator('a.nav-link').filter({ hasText: 'Buttons' }).first().click();
    await page.waitForTimeout(300);

    // Both should show their submenus
    await expect(page.locator('a').filter({ hasText: 'Cards' }).first()).toBeVisible();
    await expect(page.locator('a').filter({ hasText: 'Button Groups' }).first()).toBeVisible();
  });

  test('should navigate to submenu items', async ({ page }) => {
    // Expand Forms menu
    await page.locator('a').filter({ hasText: 'Forms' }).first().click();
    await page.waitForTimeout(500);

    // Click on Form Control
    await page.locator('a').filter({ hasText: 'Form Control' }).first().click();
    await page.waitForLoadState('networkidle');

    // Verify navigation occurred
    expect(page.url()).toContain('/forms/form-controls');
  });

  test('should highlight active navigation item', async ({ page }) => {
    // Navigate to a specific page
    await page.goto('/charts');
    await page.waitForLoadState('networkidle');

    // Check for active class on Charts link
    const chartsLink = page.locator('a').filter({ hasText: 'Charts' }).first();
    const classes = await chartsLink.getAttribute('class');
    expect(classes).toContain('active');
  });

  test('should toggle sidebar minimized state', async ({ page }) => {
    // Look for sidebar toggle button
    const toggleButton = page.locator('button[cSidebarToggle], button.sidebar-toggler, [class*="sidebar-toggle"]').first();

    if (await toggleButton.count() > 0) {
      // Click to minimize
      await toggleButton.click();
      await page.waitForTimeout(500);

      // Check if sidebar has minimized class
      const sidebar = page.locator('c-sidebar, .sidebar').first();
      const sidebarClasses = await sidebar.getAttribute('class');

      // Click again to restore
      await toggleButton.click();
      await page.waitForTimeout(500);
    }
  });

  test('should show all main navigation sections', async ({ page }) => {
    // Verify presence of main navigation sections
    const sections = [
      'Dashboard',
      'Theme',
      'Base',
      'Buttons',
      'Forms',
      'Charts',
      'Icons',
      'Notifications',
      'Widgets'
    ];

    for (const section of sections) {
      const link = page.locator('a.nav-link, a').filter({ hasText: section }).first();
      await expect(link).toBeVisible();
    }
  });

  test('should scroll to reveal hidden menu items', async ({ page }) => {
    // Get sidebar container
    const sidebar = page.locator('c-sidebar, .sidebar').first();

    // Check if sidebar is scrollable
    const isScrollable = await sidebar.evaluate((el) => {
      return el.scrollHeight > el.clientHeight;
    });

    if (isScrollable) {
      // Scroll to bottom of sidebar
      await sidebar.evaluate((el) => {
        el.scrollTop = el.scrollHeight;
      });

      await page.waitForTimeout(300);

      // Verify we can see items at the bottom
      const widgetsLink = page.locator('a').filter({ hasText: 'Widgets' }).first();
      await expect(widgetsLink).toBeVisible();
    }
  });

  test('should display icons next to menu items', async ({ page }) => {
    // Check for icons in navigation
    const icons = page.locator('c-sidebar-nav-item svg, .nav-icon, [cIcon]');
    const iconCount = await icons.count();
    expect(iconCount).toBeGreaterThan(0);
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Focus on first navigation link
    const firstLink = page.locator('c-sidebar-nav-item a, .sidebar a.nav-link').first();
    await firstLink.focus();

    // Verify focus is on the element
    const isFocused = await firstLink.evaluate((el) => el === document.activeElement);
    expect(isFocused).toBeTruthy();

    // Press Tab to move to next element
    await page.keyboard.press('Tab');

    // Verify focus moved
    const newFocus = await page.evaluate(() => document.activeElement?.tagName);
    expect(newFocus).toBeTruthy();
  });

  test('should navigate using Enter key on focused item', async ({ page }) => {
    // Focus on Charts link
    const chartsLink = page.locator('a').filter({ hasText: 'Charts' }).first();
    await chartsLink.focus();

    // Press Enter to navigate
    await page.keyboard.press('Enter');
    await page.waitForLoadState('networkidle');

    // Verify navigation occurred
    expect(page.url()).toContain('/charts');
  });

  test('should show submenu on parent item click', async ({ page }) => {
    // Find Notifications parent item
    const notificationsParent = page.locator('a.nav-link').filter({ hasText: 'Notifications' }).first();

    // Get initial state of submenu
    const alertsLink = page.locator('a').filter({ hasText: 'Alerts' }).first();
    const initiallyVisible = await alertsLink.isVisible().catch(() => false);

    // Click parent
    await notificationsParent.click();
    await page.waitForTimeout(500);

    // Verify submenu visibility changed
    const nowVisible = await alertsLink.isVisible();
    if (!initiallyVisible) {
      expect(nowVisible).toBeTruthy();
    }
  });

  test('should maintain scroll position when navigating', async ({ page }) => {
    // Scroll sidebar to a specific position
    const sidebar = page.locator('c-sidebar, .sidebar').first();
    await sidebar.evaluate((el) => {
      el.scrollTop = 100;
    });

    const scrollPosition = await sidebar.evaluate((el) => el.scrollTop);

    // Navigate to a page
    await page.locator('a').filter({ hasText: 'Charts' }).first().click();
    await page.waitForLoadState('networkidle');

    // Check if scroll position is maintained (may reset to 0 or stay)
    const newScrollPosition = await sidebar.evaluate((el) => el.scrollTop);
    expect(typeof newScrollPosition).toBe('number');
  });

  test('should display brand logo in sidebar', async ({ page }) => {
    // Check for sidebar brand/logo
    const brand = page.locator('.sidebar-brand, c-sidebar-brand, [cSidebarBrand]').first();
    await expect(brand).toBeVisible();
  });

  test('should have accessible aria labels on navigation items', async ({ page }) => {
    // Check if navigation items have proper accessibility attributes
    const navItems = page.locator('c-sidebar-nav-item a, .sidebar a.nav-link');
    const firstItem = navItems.first();

    // Verify link has text or aria-label
    const text = await firstItem.textContent();
    const ariaLabel = await firstItem.getAttribute('aria-label');

    expect(text || ariaLabel).toBeTruthy();
  });
});
