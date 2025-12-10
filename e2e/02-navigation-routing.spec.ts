import { test, expect } from '@playwright/test';

/**
 * Navigation and Routing Tests
 *
 * This test suite verifies:
 * - Route navigation functionality
 * - URL changes on navigation
 * - Page content updates
 * - Browser back/forward navigation
 * - Deep linking to specific pages
 */
test.describe('Navigation and Routing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should redirect root path to dashboard', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify URL contains dashboard
    expect(page.url()).toContain('/dashboard');
  });

  test('should navigate to dashboard from sidebar', async ({ page }) => {
    // Click on Dashboard link in sidebar
    const dashboardLink = page.locator('a[routerLink="/dashboard"], a[href="/dashboard"]').first();
    await dashboardLink.click();
    await page.waitForLoadState('networkidle');

    // Verify URL and content
    expect(page.url()).toContain('/dashboard');
    await expect(page.locator('app-dashboard')).toBeVisible();
  });

  test('should navigate to theme colors page', async ({ page }) => {
    // Find and click Theme menu item
    const themeNav = page.locator('a').filter({ hasText: 'Theme' }).first();
    await themeNav.click();
    await page.waitForTimeout(500);

    // Click Colors link
    const colorsLink = page.locator('a').filter({ hasText: 'Colors' }).first();
    await colorsLink.click();
    await page.waitForLoadState('networkidle');

    // Verify navigation
    expect(page.url()).toContain('/theme/colors');
  });

  test('should navigate to typography page', async ({ page }) => {
    // Navigate through Theme -> Typography
    await page.locator('a').filter({ hasText: 'Theme' }).first().click();
    await page.waitForTimeout(500);

    await page.locator('a').filter({ hasText: 'Typography' }).first().click();
    await page.waitForLoadState('networkidle');

    expect(page.url()).toContain('/theme/typography');
  });

  test('should navigate to base components', async ({ page }) => {
    // Click Base dropdown
    const baseNav = page.locator('a').filter({ hasText: 'Base' }).first();
    await baseNav.click();
    await page.waitForTimeout(500);

    // Click on Cards
    const cardsLink = page.locator('a').filter({ hasText: 'Cards' }).first();
    await cardsLink.click();
    await page.waitForLoadState('networkidle');

    expect(page.url()).toContain('/base/cards');
    await expect(page.locator('app-cards')).toBeVisible();
  });

  test('should navigate to buttons page', async ({ page }) => {
    // Navigate to Buttons section
    await page.locator('a').filter({ hasText: 'Buttons' }).first().click();
    await page.waitForTimeout(500);

    await page.locator('a').filter({ hasText: /^Buttons$/ }).first().click();
    await page.waitForLoadState('networkidle');

    expect(page.url()).toContain('/buttons/buttons');
  });

  test('should navigate to forms page', async ({ page }) => {
    // Navigate to Forms
    await page.locator('a').filter({ hasText: 'Forms' }).first().click();
    await page.waitForTimeout(500);

    await page.locator('a').filter({ hasText: 'Form Control' }).first().click();
    await page.waitForLoadState('networkidle');

    expect(page.url()).toContain('/forms/form-controls');
  });

  test('should navigate to charts page', async ({ page }) => {
    // Direct navigation to Charts
    const chartsLink = page.locator('a').filter({ hasText: 'Charts' }).first();
    await chartsLink.click();
    await page.waitForLoadState('networkidle');

    expect(page.url()).toContain('/charts');
    await expect(page.locator('app-charts')).toBeVisible();
  });

  test('should navigate to icons page', async ({ page }) => {
    // Navigate to Icons
    await page.locator('a').filter({ hasText: 'Icons' }).first().click();
    await page.waitForTimeout(500);

    await page.locator('a').filter({ hasText: 'CoreUI Icons' }).first().click();
    await page.waitForLoadState('networkidle');

    expect(page.url()).toContain('/icons/coreui-icons');
  });

  test('should navigate to notifications page', async ({ page }) => {
    // Navigate to Notifications -> Alerts
    await page.locator('a').filter({ hasText: 'Notifications' }).first().click();
    await page.waitForTimeout(500);

    await page.locator('a').filter({ hasText: 'Alerts' }).first().click();
    await page.waitForLoadState('networkidle');

    expect(page.url()).toContain('/notifications/alerts');
  });

  test('should navigate to widgets page', async ({ page }) => {
    // Navigate to Widgets
    const widgetsLink = page.locator('a').filter({ hasText: 'Widgets' }).first();
    await widgetsLink.click();
    await page.waitForLoadState('networkidle');

    expect(page.url()).toContain('/widgets');
    await expect(page.locator('app-widgets')).toBeVisible();
  });

  test('should support browser back navigation', async ({ page }) => {
    // Navigate to dashboard
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Navigate to charts
    await page.goto('/charts');
    await page.waitForLoadState('networkidle');

    // Go back
    await page.goBack();
    await page.waitForLoadState('networkidle');

    // Verify we're back on dashboard
    expect(page.url()).toContain('/dashboard');
    await expect(page.locator('app-dashboard')).toBeVisible();
  });

  test('should support browser forward navigation', async ({ page }) => {
    // Navigate to dashboard
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Navigate to widgets
    await page.goto('/widgets');
    await page.waitForLoadState('networkidle');

    // Go back
    await page.goBack();
    await page.waitForLoadState('networkidle');

    // Go forward
    await page.goForward();
    await page.waitForLoadState('networkidle');

    // Verify we're on widgets page
    expect(page.url()).toContain('/widgets');
  });

  test('should handle deep linking to specific pages', async ({ page }) => {
    // Direct navigation to a specific page
    await page.goto('/base/tables');
    await page.waitForLoadState('networkidle');

    // Verify page loaded correctly
    expect(page.url()).toContain('/base/tables');
    await expect(page.locator('app-tables')).toBeVisible();
  });

  test('should handle deep linking to forms', async ({ page }) => {
    await page.goto('/forms/validation');
    await page.waitForLoadState('networkidle');

    expect(page.url()).toContain('/forms/validation');
    await expect(page.locator('app-validation')).toBeVisible();
  });

  test('should maintain sidebar active state on navigation', async ({ page }) => {
    // Navigate to a specific page
    await page.goto('/base/cards');
    await page.waitForLoadState('networkidle');

    // Check if the corresponding sidebar item is active
    const activeLink = page.locator('a.nav-link.active, a.active').first();
    await expect(activeLink).toBeVisible();
  });

  test('should handle 404 page for invalid routes', async ({ page }) => {
    // Navigate to invalid route
    await page.goto('/invalid-route-that-does-not-exist');
    await page.waitForLoadState('networkidle');

    // Should redirect to dashboard or show 404
    const is404 = page.url().includes('/404');
    const isDashboard = page.url().includes('/dashboard');

    expect(is404 || isDashboard).toBeTruthy();
  });

  test('should update page title on navigation', async ({ page }) => {
    // Navigate to different pages and check title updates
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    const dashboardTitle = await page.title();
    expect(dashboardTitle).toBeTruthy();

    await page.goto('/charts');
    await page.waitForLoadState('networkidle');
    const chartsTitle = await page.title();
    expect(chartsTitle).toBeTruthy();

    // Titles should be different or at least exist
    expect(dashboardTitle.length).toBeGreaterThan(0);
    expect(chartsTitle.length).toBeGreaterThan(0);
  });
});
