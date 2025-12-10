# E2E Test Suite - Quick Reference

## Test Files Overview

### 01-dashboard.spec.ts
Tests the main dashboard page functionality:
- Dashboard loading and rendering
- Widget displays (traffic, brand)
- Charts and visualizations
- User data table
- Interactive controls

**Key Components Tested:**
- `app-dashboard`
- `app-widgets-dropdown`
- `app-widgets-brand`
- `c-chart`, `canvas` (Chart.js charts)
- `table[cTable]` (User data)

### 02-navigation-routing.spec.ts
Tests application routing and navigation:
- Route redirects
- Sidebar navigation
- URL changes
- Browser history (back/forward)
- Deep linking
- Page title updates

**Routes Tested:**
- `/dashboard`
- `/theme/colors`, `/theme/typography`
- `/base/*` (cards, tables, etc.)
- `/buttons/*`
- `/forms/*`
- `/charts`
- `/icons/coreui-icons`
- `/notifications/*`
- `/widgets`

### 03-sidebar-interactions.spec.ts
Tests sidebar menu behavior:
- Visibility control
- Menu expansion/collapse
- Navigation items
- Keyboard navigation
- Active state highlighting
- Mobile menu toggle

**Key Selectors:**
- `c-sidebar`, `.sidebar`
- `a.nav-link`
- `button[cSidebarToggle]`
- Navigation icons and items

### 04-responsive-design.spec.ts
Tests responsive layouts across devices:
- Mobile (iPhone 12): 390x844
- Tablet (iPad Pro): 1024x1366
- Desktop: 1920x1080
- Breakpoints: 576px, 768px, 992px, 1200px

**Behaviors Tested:**
- Sidebar visibility
- Column layouts
- Menu toggles
- Touch interactions
- Orientation changes

### 05-component-library.spec.ts
Tests CoreUI component functionality:
- Cards, Tables, Accordions
- Buttons (variants, sizes, states)
- Forms (inputs, validation)
- Alerts, Modals, Dropdowns
- Charts, Icons

**Component Types:**
- `c-card`, `c-card-body`, `c-card-header`
- `button[cButton]`
- `input[cFormControl]`, `textarea`, `select`
- `c-alert`, `c-modal`
- `c-dropdown`

## Running Tests

### Quick Commands
```bash
# All tests
npm run test:e2e

# Specific file
npx playwright test e2e/01-dashboard.spec.ts

# Watch mode / UI
npm run test:e2e:ui

# Debug mode
npm run test:e2e:debug

# Single browser
npm run test:e2e:chromium
```

### Filtering Tests
```bash
# Run tests matching pattern
npx playwright test -g "dashboard"

# Run specific describe block
npx playwright test -g "Dashboard Page"

# Run single test
npx playwright test -g "should load dashboard page successfully"
```

## Common Patterns

### Waiting for Elements
```typescript
// Wait for visibility
await expect(element).toBeVisible({ timeout: 10000 });

// Wait for load state
await page.waitForLoadState('networkidle');

// Wait for selector
await page.waitForSelector('canvas', { timeout: 10000 });
```

### Finding Elements
```typescript
// By selector
page.locator('c-card')

// By text
page.locator('a').filter({ hasText: 'Dashboard' })

// By role
page.getByRole('button', { name: 'Submit' })

// First/last
page.locator('button').first()
page.locator('button').last()
```

### Assertions
```typescript
// Visibility
await expect(element).toBeVisible();
await expect(element).not.toBeVisible();

// Text content
await expect(element).toHaveText('Expected Text');
await expect(element).toContainText('Partial Text');

// Count
expect(await elements.count()).toBe(5);
expect(await elements.count()).toBeGreaterThan(3);

// Attributes
await expect(element).toHaveAttribute('href', '/dashboard');
await expect(element).toHaveClass('active');

// URL
expect(page.url()).toContain('/dashboard');
```

### Interactions
```typescript
// Click
await element.click();

// Type
await input.fill('text');
await input.type('text'); // Simulates typing

// Select
await select.selectOption('value');

// Scroll
await element.scrollIntoViewIfNeeded();

// Hover
await element.hover();
```

## Debugging Tips

### 1. Pause Test Execution
```typescript
await page.pause();
```

### 2. Take Screenshots
```typescript
await page.screenshot({ path: 'screenshot.png' });
```

### 3. Console Logging
```typescript
page.on('console', msg => console.log(msg.text()));
```

### 4. Trace Recording
```bash
npx playwright test --trace on
npx playwright show-trace trace.zip
```

### 5. Headed Mode with Slow Motion
```bash
npx playwright test --headed --slow-mo=1000
```

## Test Maintenance

### Updating Selectors
When CoreUI updates or components change:

1. Inspect the element in browser
2. Update locator in test file
3. Run test to verify
4. Consider using data-testid for stability

### Adding New Tests

1. Choose appropriate test file or create new one
2. Follow existing patterns
3. Use descriptive test names
4. Add comments for complex logic
5. Wait for elements appropriately

### Flaky Test Fixes

Common causes and solutions:

1. **Race conditions**: Add `waitForLoadState('networkidle')`
2. **Timing issues**: Increase timeouts or add explicit waits
3. **Element not found**: Verify selector is correct
4. **Network delays**: Mock API calls or increase timeout

## Performance Tips

- Use `test.describe.parallel()` for independent tests
- Reuse browser contexts when possible
- Skip slow tests in development: `test.skip()`
- Use fixtures for common setup

## Coverage Checklist

When adding new features, ensure tests cover:

- [ ] Component renders correctly
- [ ] User interactions work
- [ ] Navigation functions properly
- [ ] Responsive behavior is correct
- [ ] Error states are handled
- [ ] Loading states display
- [ ] Accessibility is maintained

## Resources

- [Playwright Docs](https://playwright.dev/)
- [CoreUI Angular Docs](https://coreui.io/angular/docs/)
- [Main Testing Guide](../PLAYWRIGHT_TESTING.md)
