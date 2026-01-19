import { test, expect } from '@playwright/test';

/**
 * Core E2E Tests - Simple functionality tests
 */
test.describe('Application E2E Tests', () => {

  // Dashboard Tests
  test('should load dashboard page', async ({ page }) => {
    await page.goto('/#/dashboard');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/CoreUI/);
    await expect(page.locator('app-dashboard')).toBeVisible();
  });

  test('should display traffic widgets', async ({ page }) => {
    await page.goto('/#/dashboard');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('app-widgets-dropdown')).toBeVisible();
  });

  test('should render traffic chart', async ({ page }) => {
    await page.goto('/#/dashboard');
    await page.waitForLoadState('networkidle');
    const canvas = page.locator('canvas').first();
    await expect(canvas).toBeVisible({ timeout: 10000 });
  });

  test('should display user table', async ({ page }) => {
    await page.goto('/#/dashboard');
    await page.waitForLoadState('networkidle');
    const table = page.locator('table[cTable]');
    await table.scrollIntoViewIfNeeded();
    await expect(table).toBeVisible();
    expect(await page.locator('tbody tr').count()).toBeGreaterThan(0);
  });

  // Navigation Tests
  test('should redirect root to dashboard', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('dashboard');
  });

  test('should navigate via direct URL to charts', async ({ page }) => {
    await page.goto('/#/charts');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('app-charts')).toBeVisible();
  });

  test('should navigate via direct URL to widgets', async ({ page }) => {
    await page.goto('/#/widgets');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('app-widgets')).toBeVisible();
  });

  test('should support browser back navigation', async ({ page }) => {
    await page.goto('/#/dashboard');
    await page.waitForLoadState('networkidle');
    await page.goto('/#/charts');
    await page.waitForLoadState('networkidle');
    await page.goBack();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('dashboard');
  });

  // Sidebar Tests
  test('should display sidebar', async ({ page }) => {
    await page.goto('/#/dashboard');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('c-sidebar').first()).toBeVisible();
  });

  test('should have navigation items', async ({ page }) => {
    await page.goto('/#/dashboard');
    await page.waitForLoadState('networkidle');
    const navItems = page.locator('c-sidebar-nav a');
    expect(await navItems.count()).toBeGreaterThan(5);
  });

  // Component Pages Tests
  test('should display cards page', async ({ page }) => {
    await page.goto('/#/base/cards');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('app-cards')).toBeVisible();
    expect(await page.locator('c-card').count()).toBeGreaterThan(5);
  });

  test('should display tables page', async ({ page }) => {
    await page.goto('/#/base/tables');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('app-tables')).toBeVisible();
  });

  test('should display buttons page', async ({ page }) => {
    await page.goto('/#/buttons/buttons');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('app-buttons')).toBeVisible();
    expect(await page.locator('button[cButton]').count()).toBeGreaterThan(10);
  });

  test('should display form controls page', async ({ page }) => {
    await page.goto('/#/forms/form-control');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('app-form-controls')).toBeVisible();
  });

  test('should display alerts page', async ({ page }) => {
    await page.goto('/#/notifications/alerts');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('app-alerts')).toBeVisible();
    expect(await page.locator('c-alert').count()).toBeGreaterThan(0);
  });

  test('should display modals page', async ({ page }) => {
    await page.goto('/#/notifications/modal');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('app-modals')).toBeVisible();
  });

  test('should display charts page', async ({ page }) => {
    await page.goto('/#/charts');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('app-charts')).toBeVisible();
    expect(await page.locator('canvas').count()).toBeGreaterThan(3);
  });

  test('should display dropdowns page', async ({ page }) => {
    await page.goto('/#/buttons/dropdowns');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('app-dropdowns')).toBeVisible();
  });

  test('should display icons page', async ({ page }) => {
    await page.goto('/#/icons/coreui-icons');
    await page.waitForLoadState('networkidle');
    // Icons component uses default selector, check for card content instead
    await expect(page.locator('c-card').first()).toBeVisible();
  });

  test('should display theme colors page', async ({ page }) => {
    await page.goto('/#/theme/colors');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('app-theme-color').first()).toBeVisible();
  });
});
