# Playwright E2E Testing Guide

## CoreUI Free Angular Admin Template - Test Suite Documentation

This comprehensive Playwright test suite validates the functionality, responsiveness, and user interactions of the CoreUI Angular 20 admin dashboard template with CoreUI components.

---

## Table of Contents

- [Overview](#overview)
- [Test Suite Structure](#test-suite-structure)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Configuration](#configuration)
- [Writing New Tests](#writing-new-tests)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

---

## Overview

### Technology Stack

- **Framework**: Angular 20.3.14
- **UI Library**: CoreUI 5.5.24
- **Testing Tool**: Playwright
- **Browsers**: Chromium, Firefox, WebKit
- **Language**: TypeScript

### Key Features Tested

- Dashboard with charts and widgets
- Navigation and routing
- Sidebar interactions
- Responsive design across devices
- CoreUI component library functionality

---

## Test Suite Structure

```
coreui-free-angular-admin-template/
├── e2e/
│   ├── 01-dashboard.spec.ts           # Dashboard functionality tests
│   ├── 02-navigation-routing.spec.ts  # Navigation and routing tests
│   ├── 03-sidebar-interactions.spec.ts # Sidebar behavior tests
│   ├── 04-responsive-design.spec.ts   # Responsive layout tests
│   └── 05-component-library.spec.ts   # Component library tests
├── playwright.config.ts               # Playwright configuration
├── playwright-report/                 # HTML test reports (generated)
└── test-results/                      # Test results and artifacts (generated)
```

---

## Installation

### Prerequisites

- Node.js 20.19.0+ or 22.12.0+ or 24.0.0+
- npm 9+

### Setup Steps

1. **Install project dependencies**:
   ```bash
   npm install
   ```

2. **Install Playwright**:
   ```bash
   npm install -D @playwright/test
   ```

3. **Install Playwright browsers**:
   ```bash
   npx playwright install
   ```

   Or install specific browsers:
   ```bash
   npx playwright install chromium firefox webkit
   ```

---

## Running Tests

### Basic Commands

#### Run all tests (headless mode):
```bash
npx playwright test
```

#### Run tests in headed mode (see browser):
```bash
npx playwright test --headed
```

#### Run specific test file:
```bash
npx playwright test e2e/01-dashboard.spec.ts
```

#### Run tests in debug mode:
```bash
npx playwright test --debug
```

#### Run tests in UI mode (interactive):
```bash
npx playwright test --ui
```

### Running Tests by Browser

#### Chromium only:
```bash
npx playwright test --project=chromium
```

#### Firefox only:
```bash
npx playwright test --project=firefox
```

#### WebKit only:
```bash
npx playwright test --project=webkit
```

#### Mobile browsers:
```bash
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"
```

### Running Specific Test Suites

#### Dashboard tests:
```bash
npx playwright test e2e/01-dashboard.spec.ts
```

#### Navigation tests:
```bash
npx playwright test e2e/02-navigation-routing.spec.ts
```

#### Sidebar tests:
```bash
npx playwright test e2e/03-sidebar-interactions.spec.ts
```

#### Responsive design tests:
```bash
npx playwright test e2e/04-responsive-design.spec.ts
```

#### Component library tests:
```bash
npx playwright test e2e/05-component-library.spec.ts
```

### View Test Results

#### Open HTML report:
```bash
npx playwright show-report
```

#### Generate and open report:
```bash
npx playwright test --reporter=html
npx playwright show-report
```

---

## Test Coverage

### 1. Dashboard Tests (`01-dashboard.spec.ts`)

Tests dashboard page functionality including:

- ✅ Page loading and rendering
- ✅ Traffic widgets display
- ✅ Main traffic chart rendering
- ✅ Traffic period controls (Day/Month/Year)
- ✅ Period switching functionality
- ✅ Brand widgets display
- ✅ User table with data
- ✅ Progress bars in table
- ✅ Responsive layout
- ✅ Chart loading without errors

**Total Tests**: 10

### 2. Navigation and Routing Tests (`02-navigation-routing.spec.ts`)

Tests application routing and navigation:

- ✅ Root path redirect to dashboard
- ✅ Dashboard navigation
- ✅ Theme pages navigation (Colors, Typography)
- ✅ Base components navigation
- ✅ Buttons page navigation
- ✅ Forms page navigation
- ✅ Charts page navigation
- ✅ Icons page navigation
- ✅ Notifications page navigation
- ✅ Widgets page navigation
- ✅ Browser back navigation
- ✅ Browser forward navigation
- ✅ Deep linking support
- ✅ Sidebar active state
- ✅ 404 page handling
- ✅ Page title updates

**Total Tests**: 17

### 3. Sidebar Interactions Tests (`03-sidebar-interactions.spec.ts`)

Tests sidebar behavior and interactions:

- ✅ Sidebar visibility on desktop
- ✅ Navigation items display
- ✅ Dropdown menu expansion
- ✅ Dropdown menu collapse
- ✅ Multiple menu independence
- ✅ Submenu navigation
- ✅ Active item highlighting
- ✅ Sidebar toggle/minimize
- ✅ All main sections visibility
- ✅ Sidebar scrolling
- ✅ Menu item icons
- ✅ Keyboard navigation
- ✅ Enter key navigation
- ✅ Submenu toggle behavior
- ✅ Scroll position maintenance
- ✅ Brand logo display
- ✅ Accessibility attributes

**Total Tests**: 17

### 4. Responsive Design Tests (`04-responsive-design.spec.ts`)

Tests responsive layout across devices:

#### Mobile Viewport (iPhone 12):
- ✅ Dashboard rendering
- ✅ Sidebar hidden initially
- ✅ Mobile menu toggle button
- ✅ Sidebar toggle functionality
- ✅ Single column widget layout
- ✅ Table column hiding
- ✅ Touch interactions
- ✅ Vertical scrolling

#### Tablet Viewport (iPad):
- ✅ Dashboard rendering
- ✅ Sidebar visibility
- ✅ Two-column widget layout
- ✅ Navigation support

#### Desktop Viewport (1920x1080):
- ✅ Full layout rendering
- ✅ Four-column widgets
- ✅ All table columns visible
- ✅ Wide main chart
- ✅ Sidebar persistence

#### Responsive Breakpoints:
- ✅ 576px (small)
- ✅ 768px (medium)
- ✅ 992px (large)
- ✅ 1200px (extra large)

#### Additional:
- ✅ Orientation changes
- ✅ Content overflow handling

**Total Tests**: 24

### 5. Component Library Tests (`05-component-library.spec.ts`)

Tests CoreUI components functionality:

#### Cards:
- ✅ Page display
- ✅ Multiple card examples
- ✅ Card headers and bodies
- ✅ Cards with images

#### Tables:
- ✅ Page display
- ✅ Table examples
- ✅ Table headers
- ✅ Table data rows
- ✅ Table variants

#### Accordions:
- ✅ Page display
- ✅ Accordion rendering
- ✅ Expand on click
- ✅ Collapse on click

#### Buttons:
- ✅ Page display
- ✅ Button variants
- ✅ Button colors
- ✅ Button sizes
- ✅ Disabled buttons

#### Forms:
- ✅ Page display
- ✅ Input fields
- ✅ Text input functionality
- ✅ Textarea rendering
- ✅ Select dropdowns
- ✅ Input placeholders

#### Form Validation:
- ✅ Page display
- ✅ Validation feedback
- ✅ Required field validation

#### Alerts:
- ✅ Page display
- ✅ Alert rendering
- ✅ Alert types
- ✅ Dismissible alerts

#### Modals:
- ✅ Page display
- ✅ Modal opening
- ✅ Modal closing

#### Charts:
- ✅ Page display
- ✅ Multiple chart examples
- ✅ Line chart display
- ✅ Different chart types

#### Dropdowns:
- ✅ Page display
- ✅ Dropdown buttons
- ✅ Dropdown menu opening
- ✅ Menu items display

#### Icons:
- ✅ Page display
- ✅ Multiple icon examples

**Total Tests**: 42

### Grand Total: **110 Tests**

---

## Configuration

### Playwright Configuration (`playwright.config.ts`)

Key configuration options:

```typescript
{
  testDir: './e2e',
  timeout: 30000,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],

  webServer: {
    command: 'npm start',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
}
```

### Customization Options

#### Change base URL:
```typescript
use: {
  baseURL: 'http://localhost:4300', // Your custom port
}
```

#### Adjust timeouts:
```typescript
timeout: 60000, // 60 seconds for slow tests
actionTimeout: 15000, // 15 seconds for actions
```

#### Enable video recording for all tests:
```typescript
video: 'on', // Always record video
```

#### Change screenshot behavior:
```typescript
screenshot: 'on', // Always take screenshots
```

---

## Writing New Tests

### Test Structure Template

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/your-route');
    await page.waitForLoadState('networkidle');
  });

  test('should do something', async ({ page }) => {
    // Arrange
    const element = page.locator('your-selector');

    // Act
    await element.click();

    // Assert
    await expect(element).toBeVisible();
  });
});
```

### Best Practices

1. **Use meaningful test descriptions**:
   ```typescript
   test('should display error message when form is invalid', async ({ page }) => {
     // Test implementation
   });
   ```

2. **Wait for page to be ready**:
   ```typescript
   await page.waitForLoadState('networkidle');
   ```

3. **Use specific locators**:
   ```typescript
   // Good
   page.locator('button[data-testid="submit"]')

   // Better
   page.getByRole('button', { name: 'Submit' })
   ```

4. **Add timeouts for dynamic content**:
   ```typescript
   await expect(element).toBeVisible({ timeout: 10000 });
   ```

5. **Clean up after tests**:
   ```typescript
   test.afterEach(async ({ page }) => {
     // Cleanup code
   });
   ```

### Common Selectors for CoreUI Components

```typescript
// Cards
page.locator('c-card')
page.locator('c-card-body')
page.locator('c-card-header')

// Buttons
page.locator('button[cButton]')

// Forms
page.locator('input[cFormControl]')
page.locator('textarea')
page.locator('select')

// Navigation
page.locator('c-sidebar')
page.locator('a.nav-link')

// Tables
page.locator('table[cTable]')
page.locator('thead th')
page.locator('tbody tr')

// Charts
page.locator('canvas')
page.locator('c-chart')

// Modals
page.locator('c-modal')
page.locator('button[cModalClose]')

// Alerts
page.locator('c-alert')
page.locator('button[cAlertClose]')
```

---

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Install Playwright Browsers
      run: npx playwright install --with-deps chromium

    - name: Run Playwright tests
      run: npx playwright test --project=chromium

    - name: Upload test results
      uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

### GitLab CI Example

Create `.gitlab-ci.yml`:

```yaml
image: mcr.microsoft.com/playwright:v1.40.0-focal

stages:
  - test

playwright:
  stage: test
  script:
    - npm ci
    - npx playwright test
  artifacts:
    when: always
    paths:
      - playwright-report/
      - test-results/
    expire_in: 1 week
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Tests failing with "Navigation timeout"

**Solution**: Increase timeout in config:
```typescript
navigationTimeout: 60000, // 60 seconds
```

#### 2. Dev server not starting

**Solution**: Check if port 4200 is available:
```bash
lsof -ti:4200 | xargs kill -9  # Kill process on port 4200
npm start
```

#### 3. Tests pass locally but fail in CI

**Solution**:
- Use consistent viewport sizes
- Add explicit waits: `await page.waitForLoadState('networkidle')`
- Set retries: `retries: 2`

#### 4. Flaky tests

**Solution**:
- Add `await page.waitForTimeout(500)` after interactions
- Use `toBeVisible({ timeout: 10000 })` with longer timeouts
- Wait for network idle: `await page.waitForLoadState('networkidle')`

#### 5. Screenshots/videos not generated

**Solution**: Check configuration:
```typescript
screenshot: 'only-on-failure',
video: 'retain-on-failure',
```

#### 6. Selector not found

**Solution**:
- Inspect the page: `await page.pause()`
- Use Playwright Inspector: `npx playwright test --debug`
- Try different selectors: CSS, text, role-based

#### 7. Memory issues with parallel tests

**Solution**: Limit workers:
```typescript
workers: 2, // Reduce number of parallel workers
```

### Debug Commands

```bash
# Run with debug output
DEBUG=pw:api npx playwright test

# Run in headed mode with slow motion
npx playwright test --headed --slow-mo=1000

# Run single test in debug mode
npx playwright test e2e/01-dashboard.spec.ts --debug

# Generate trace
npx playwright test --trace on
npx playwright show-trace trace.zip
```

---

## Additional Resources

### Official Documentation

- [Playwright Documentation](https://playwright.dev/)
- [Angular Testing Guide](https://angular.io/guide/testing)
- [CoreUI Documentation](https://coreui.io/angular/docs/)

### Playwright APIs

- [Locators API](https://playwright.dev/docs/api/class-locator)
- [Assertions API](https://playwright.dev/docs/api/class-locatorassertions)
- [Page API](https://playwright.dev/docs/api/class-page)

### Test Patterns

- [Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Test Fixtures](https://playwright.dev/docs/test-fixtures)

---

## Package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:chromium": "playwright test --project=chromium",
    "test:e2e:firefox": "playwright test --project=firefox",
    "test:e2e:webkit": "playwright test --project=webkit",
    "test:e2e:mobile": "playwright test --project='Mobile Chrome'",
    "test:report": "playwright show-report"
  }
}
```

Usage:
```bash
npm run test:e2e
npm run test:e2e:headed
npm run test:e2e:ui
npm run test:report
```

---

## Continuous Improvement

### Test Maintenance Checklist

- [ ] Update tests when UI changes
- [ ] Remove obsolete tests
- [ ] Add tests for new features
- [ ] Review and fix flaky tests
- [ ] Update selectors if component structure changes
- [ ] Keep Playwright updated: `npm update @playwright/test`
- [ ] Review test coverage regularly
- [ ] Document custom test helpers

### Performance Tips

1. Use `test.describe.parallel()` for independent tests
2. Reuse authentication state with `storageState`
3. Mock API calls when appropriate
4. Use `test.slow()` for known slow tests
5. Profile tests with `--trace on`

---

## Support and Contribution

For issues or questions:
1. Check existing test failures in reports
2. Review Playwright documentation
3. Check CoreUI Angular documentation
4. Review this guide's troubleshooting section

When reporting issues, include:
- Test file and name
- Error message
- Screenshots/videos from test results
- Playwright version
- Browser version

---

**Last Updated**: December 2025
**Playwright Version**: Latest
**Angular Version**: 20.3.14
**CoreUI Version**: 5.5.24
