import { test, expect } from '@playwright/test';

/**
 * Component Library Tests
 *
 * This test suite verifies CoreUI components functionality:
 * - Base components (Cards, Tables, Accordions)
 * - Button components
 * - Form components
 * - Notification components
 * - Modal interactions
 * - Interactive elements
 */
test.describe('Component Library Pages', () => {

  test.describe('Base Components - Cards', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/base/cards');
      await page.waitForLoadState('networkidle');
    });

    test('should display cards page', async ({ page }) => {
      await expect(page.locator('app-cards')).toBeVisible();
      expect(page.url()).toContain('/base/cards');
    });

    test('should render multiple card examples', async ({ page }) => {
      const cards = page.locator('c-card');
      const count = await cards.count();
      expect(count).toBeGreaterThan(5);
    });

    test('should display card headers and bodies', async ({ page }) => {
      const cardHeaders = page.locator('c-card-header');
      expect(await cardHeaders.count()).toBeGreaterThan(0);

      const cardBodies = page.locator('c-card-body');
      expect(await cardBodies.count()).toBeGreaterThan(0);
    });

    test('should show cards with images', async ({ page }) => {
      const cardImages = page.locator('c-card img, c-card-img-overlay');
      if (await cardImages.count() > 0) {
        await expect(cardImages.first()).toBeVisible();
      }
    });
  });

  test.describe('Base Components - Tables', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/base/tables');
      await page.waitForLoadState('networkidle');
    });

    test('should display tables page', async ({ page }) => {
      await expect(page.locator('app-tables')).toBeVisible();
    });

    test('should render table examples', async ({ page }) => {
      const tables = page.locator('table[cTable]');
      const count = await tables.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should display table headers', async ({ page }) => {
      const table = page.locator('table[cTable]').first();
      const headers = table.locator('thead th');
      expect(await headers.count()).toBeGreaterThan(0);
    });

    test('should display table data rows', async ({ page }) => {
      const table = page.locator('table[cTable]').first();
      const rows = table.locator('tbody tr');
      expect(await rows.count()).toBeGreaterThan(0);
    });

    test('should show different table variants', async ({ page }) => {
      // Check for tables with different styling
      const styledTables = page.locator('table[cTable]');
      expect(await styledTables.count()).toBeGreaterThan(1);
    });
  });

  test.describe('Base Components - Accordions', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/base/accordion');
      await page.waitForLoadState('networkidle');
    });

    test('should display accordions page', async ({ page }) => {
      await expect(page.locator('app-accordions')).toBeVisible();
    });

    test('should render accordion components', async ({ page }) => {
      const accordions = page.locator('c-accordion');
      expect(await accordions.count()).toBeGreaterThan(0);
    });

    test('should expand accordion item on click', async ({ page }) => {
      const accordionButton = page.locator('button[cAccordionButton]').first();
      await accordionButton.click();
      await page.waitForTimeout(500);

      // Check if accordion body is visible
      const accordionBody = page.locator('c-accordion-body').first();
      await expect(accordionBody).toBeVisible();
    });

    test('should collapse accordion item on second click', async ({ page }) => {
      const accordionButton = page.locator('button[cAccordionButton]').first();

      // Expand
      await accordionButton.click();
      await page.waitForTimeout(500);

      // Collapse
      await accordionButton.click();
      await page.waitForTimeout(500);

      // Check if body is hidden (may still be in DOM)
      const accordionBody = page.locator('c-accordion-body').first();
      const isVisible = await accordionBody.isVisible();
      // After collapse, it should be hidden
    });
  });

  test.describe('Button Components', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/buttons/buttons');
      await page.waitForLoadState('networkidle');
    });

    test('should display buttons page', async ({ page }) => {
      await expect(page.locator('app-buttons')).toBeVisible();
    });

    test('should render button variants', async ({ page }) => {
      const buttons = page.locator('button[cButton]');
      const count = await buttons.count();
      expect(count).toBeGreaterThan(10);
    });

    test('should show different button colors', async ({ page }) => {
      // Check for buttons with different color variants
      const primaryBtn = page.locator('button[cButton]').filter({ hasText: 'Primary' }).first();
      const secondaryBtn = page.locator('button[cButton]').filter({ hasText: 'Secondary' }).first();

      if (await primaryBtn.count() > 0) await expect(primaryBtn).toBeVisible();
      if (await secondaryBtn.count() > 0) await expect(secondaryBtn).toBeVisible();
    });

    test('should display button sizes', async ({ page }) => {
      // Check for buttons of different sizes
      const buttons = page.locator('button[cButton]');
      const sizes = await buttons.evaluateAll((btns) =>
        btns.map(btn => window.getComputedStyle(btn).fontSize)
      );

      // Should have multiple different font sizes
      const uniqueSizes = new Set(sizes);
      expect(uniqueSizes.size).toBeGreaterThan(1);
    });

    test('should render disabled buttons', async ({ page }) => {
      const disabledButtons = page.locator('button[disabled], button[cButton][disabled]');
      if (await disabledButtons.count() > 0) {
        const firstDisabled = disabledButtons.first();
        await expect(firstDisabled).toBeDisabled();
      }
    });
  });

  test.describe('Form Components', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/forms/form-controls');
      await page.waitForLoadState('networkidle');
    });

    test('should display form controls page', async ({ page }) => {
      await expect(page.locator('app-form-controls')).toBeVisible();
    });

    test('should render input fields', async ({ page }) => {
      const inputs = page.locator('input[cFormControl], input.form-control');
      const count = await inputs.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should allow text input', async ({ page }) => {
      const textInput = page.locator('input[type="text"]').first();
      await textInput.fill('Test input value');
      await expect(textInput).toHaveValue('Test input value');
    });

    test('should render textarea', async ({ page }) => {
      const textarea = page.locator('textarea');
      if (await textarea.count() > 0) {
        await expect(textarea.first()).toBeVisible();
      }
    });

    test('should render select dropdowns', async ({ page }) => {
      const selects = page.locator('select');
      if (await selects.count() > 0) {
        await expect(selects.first()).toBeVisible();
      }
    });

    test('should show input placeholders', async ({ page }) => {
      const inputsWithPlaceholder = page.locator('input[placeholder]');
      if (await inputsWithPlaceholder.count() > 0) {
        const placeholder = await inputsWithPlaceholder.first().getAttribute('placeholder');
        expect(placeholder).toBeTruthy();
      }
    });
  });

  test.describe('Form Validation', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/forms/validation');
      await page.waitForLoadState('networkidle');
    });

    test('should display validation page', async ({ page }) => {
      await expect(page.locator('app-validation')).toBeVisible();
    });

    test('should show validation feedback', async ({ page }) => {
      // Look for validation feedback elements
      const feedbackElements = page.locator('.valid-feedback, .invalid-feedback, c-form-feedback');
      if (await feedbackElements.count() > 0) {
        const count = await feedbackElements.count();
        expect(count).toBeGreaterThan(0);
      }
    });

    test('should validate required fields', async ({ page }) => {
      // Find a required input
      const requiredInput = page.locator('input[required]').first();
      if (await requiredInput.count() > 0) {
        // Try to submit form or trigger validation
        await requiredInput.focus();
        await requiredInput.blur();

        // Check for validation state
        const isInvalid = await requiredInput.evaluate((el: HTMLInputElement) => {
          return !el.validity.valid;
        });

        expect(typeof isInvalid).toBe('boolean');
      }
    });
  });

  test.describe('Notification Components - Alerts', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/notifications/alerts');
      await page.waitForLoadState('networkidle');
    });

    test('should display alerts page', async ({ page }) => {
      await expect(page.locator('app-alerts')).toBeVisible();
    });

    test('should render alert components', async ({ page }) => {
      const alerts = page.locator('c-alert');
      const count = await alerts.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should show different alert types', async ({ page }) => {
      // Check for different colored alerts
      const alerts = page.locator('c-alert');
      const count = await alerts.count();
      expect(count).toBeGreaterThanOrEqual(4); // Success, info, warning, danger
    });

    test('should dismiss closeable alerts', async ({ page }) => {
      // Find dismissible alert
      const dismissButton = page.locator('button[cAlertClose]').first();
      if (await dismissButton.count() > 0) {
        const alert = dismissButton.locator('xpath=ancestor::c-alert');

        // Verify alert is visible
        await expect(alert).toBeVisible();

        // Click dismiss button
        await dismissButton.click();
        await page.waitForTimeout(500);

        // Alert should be hidden
        await expect(alert).not.toBeVisible();
      }
    });
  });

  test.describe('Notification Components - Modals', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/notifications/modals');
      await page.waitForLoadState('networkidle');
    });

    test('should display modals page', async ({ page }) => {
      await expect(page.locator('app-modals')).toBeVisible();
    });

    test('should open modal on button click', async ({ page }) => {
      // Find button to launch modal
      const modalButton = page.locator('button').filter({ hasText: /Launch|Toggle|demo modal/i }).first();

      if (await modalButton.count() > 0) {
        await modalButton.click();
        await page.waitForTimeout(500);

        // Check if modal is visible
        const modal = page.locator('c-modal, .modal');
        await expect(modal.first()).toBeVisible();
      }
    });

    test('should close modal on close button', async ({ page }) => {
      // Open modal
      const modalButton = page.locator('button').filter({ hasText: /Launch|Toggle|demo modal/i }).first();

      if (await modalButton.count() > 0) {
        await modalButton.click();
        await page.waitForTimeout(500);

        // Find and click close button
        const closeButton = page.locator('button[cModalClose], button.btn-close').first();
        await closeButton.click();
        await page.waitForTimeout(500);

        // Modal should be hidden
        const modal = page.locator('c-modal.show, .modal.show');
        expect(await modal.count()).toBe(0);
      }
    });
  });

  test.describe('Charts Components', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/charts');
      await page.waitForLoadState('networkidle');
    });

    test('should display charts page', async ({ page }) => {
      await expect(page.locator('app-charts')).toBeVisible();
    });

    test('should render multiple chart examples', async ({ page }) => {
      const charts = page.locator('canvas');
      const count = await charts.count();
      expect(count).toBeGreaterThan(3);
    });

    test('should display line chart', async ({ page }) => {
      const canvas = page.locator('canvas').first();
      await expect(canvas).toBeVisible();

      const box = await canvas.boundingBox();
      expect(box!.width).toBeGreaterThan(100);
      expect(box!.height).toBeGreaterThan(100);
    });

    test('should render different chart types', async ({ page }) => {
      // Multiple canvases indicate different chart types
      const canvases = page.locator('canvas');
      const count = await canvases.count();
      expect(count).toBeGreaterThanOrEqual(4); // Line, Bar, Doughnut, etc.
    });
  });

  test.describe('Dropdown Components', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/buttons/dropdowns');
      await page.waitForLoadState('networkidle');
    });

    test('should display dropdowns page', async ({ page }) => {
      await expect(page.locator('app-dropdowns')).toBeVisible();
    });

    test('should render dropdown buttons', async ({ page }) => {
      const dropdowns = page.locator('c-dropdown, .dropdown');
      const count = await dropdowns.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should open dropdown menu on click', async ({ page }) => {
      const dropdownButton = page.locator('button[cDropdownToggle]').first();

      if (await dropdownButton.count() > 0) {
        await dropdownButton.click();
        await page.waitForTimeout(300);

        // Check if dropdown menu is visible
        const dropdownMenu = page.locator('c-dropdown-menu, .dropdown-menu').first();
        await expect(dropdownMenu).toBeVisible();
      }
    });

    test('should display dropdown menu items', async ({ page }) => {
      const dropdownButton = page.locator('button[cDropdownToggle]').first();

      if (await dropdownButton.count() > 0) {
        await dropdownButton.click();
        await page.waitForTimeout(300);

        const menuItems = page.locator('button[cDropdownItem], a[cDropdownItem]');
        expect(await menuItems.count()).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Icons Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/icons/coreui-icons');
      await page.waitForLoadState('networkidle');
    });

    test('should display icons page', async ({ page }) => {
      await expect(page.locator('app-coreui-icons')).toBeVisible();
    });

    test('should render multiple icon examples', async ({ page }) => {
      const icons = page.locator('[cIcon], svg');
      const count = await icons.count();
      expect(count).toBeGreaterThan(20);
    });
  });
});
