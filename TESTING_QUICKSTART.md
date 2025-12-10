# Playwright Testing - Quick Start Guide

## Getting Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
npx playwright install chromium
```

### 2. Run All Tests
```bash
npm run test:e2e
```

### 3. View Results
```bash
npm run test:report
```

That's it! Your tests are now running.

---

## Run Tests Interactively

### UI Mode (Recommended for Development)
```bash
npm run test:e2e:ui
```

This opens an interactive interface where you can:
- See all tests visually
- Run individual tests
- Watch test execution
- Debug failures
- View traces

### Headed Mode (See the Browser)
```bash
npm run test:e2e:headed
```

Watch the tests run in a real browser window.

---

## Test Specific Features

### Dashboard Only
```bash
npx playwright test e2e/01-dashboard.spec.ts
```

### Navigation Only
```bash
npx playwright test e2e/02-navigation-routing.spec.ts
```

### Sidebar Only
```bash
npx playwright test e2e/03-sidebar-interactions.spec.ts
```

### Responsive Design Only
```bash
npx playwright test e2e/04-responsive-design.spec.ts
```

### Components Only
```bash
npx playwright test e2e/05-component-library.spec.ts
```

---

## Debug a Failing Test

### Option 1: Debug Mode
```bash
npm run test:e2e:debug
```

This opens Playwright Inspector where you can:
- Step through test execution
- Inspect elements
- View console logs
- Take screenshots

### Option 2: Run Single Test
```bash
npx playwright test -g "should load dashboard page successfully"
```

### Option 3: Pause in Test
Add this line to your test:
```typescript
await page.pause();
```

---

## Browser Selection

### Chrome Only
```bash
npm run test:e2e:chromium
```

### Firefox Only
```bash
npm run test:e2e:firefox
```

### Safari (WebKit) Only
```bash
npm run test:e2e:webkit
```

### Mobile Only
```bash
npm run test:e2e:mobile
```

---

## Common Scenarios

### Run Tests While Developing
```bash
# Terminal 1: Start dev server
npm start

# Terminal 2: Run tests in watch mode
npm run test:e2e:ui
```

### Run Tests Before Commit
```bash
npm run test:e2e:chromium
```

### Check Mobile Compatibility
```bash
npx playwright test --project="Mobile Chrome" --project="Mobile Safari"
```

### Generate Coverage Report
```bash
npm run test:e2e
npm run test:report
```

---

## Understanding Test Results

### Success Output
```
✓ 110 tests passed (5.2s)
```

### Failure Output
```
✘ 1 test failed
  - e2e/01-dashboard.spec.ts:20:7 › should load dashboard page
```

View details:
```bash
npm run test:report
```

---

## File Structure

```
e2e/
├── 01-dashboard.spec.ts          # 10 tests
├── 02-navigation-routing.spec.ts # 17 tests
├── 03-sidebar-interactions.spec.ts # 17 tests
├── 04-responsive-design.spec.ts  # 24 tests
├── 05-component-library.spec.ts  # 42 tests
└── README.md                     # Quick reference

Total: 110 tests
```

---

## Troubleshooting

### Tests Won't Run
```bash
# Reinstall Playwright
npx playwright install

# Clear cache
rm -rf node_modules package-lock.json
npm install
```

### Dev Server Won't Start
```bash
# Kill existing process
pkill -f "ng serve"

# Restart
npm start
```

### Port 4200 Already in Use
```bash
# Find and kill process
lsof -ti:4200 | xargs kill -9

# Or use different port
ng serve --port 4300
```

Update `playwright.config.ts`:
```typescript
baseURL: 'http://localhost:4300'
```

### Tests are Slow
```bash
# Run only chromium
npm run test:e2e:chromium

# Reduce workers
npx playwright test --workers=2
```

### Flaky Tests
```bash
# Add retries
npx playwright test --retries=2

# Run with trace
npx playwright test --trace on
```

---

## Next Steps

1. **Read Full Documentation**: See [PLAYWRIGHT_TESTING.md](./PLAYWRIGHT_TESTING.md)
2. **Explore Test Files**: Check [e2e/README.md](./e2e/README.md)
3. **Write Your Own Tests**: Follow existing patterns
4. **Integrate with CI/CD**: See CI/CD section in main docs

---

## Quick Commands Reference

| Command | Description |
|---------|-------------|
| `npm run test:e2e` | Run all tests |
| `npm run test:e2e:headed` | Run with visible browser |
| `npm run test:e2e:ui` | Interactive UI mode |
| `npm run test:e2e:debug` | Debug mode |
| `npm run test:e2e:chromium` | Chrome only |
| `npm run test:e2e:firefox` | Firefox only |
| `npm run test:e2e:webkit` | Safari only |
| `npm run test:e2e:mobile` | Mobile browsers |
| `npm run test:report` | View HTML report |

---

## Need Help?

1. Check [PLAYWRIGHT_TESTING.md](./PLAYWRIGHT_TESTING.md) for detailed docs
2. View [e2e/README.md](./e2e/README.md) for test patterns
3. Visit [Playwright Docs](https://playwright.dev/)
4. Check [CoreUI Angular Docs](https://coreui.io/angular/docs/)

---

**Happy Testing!** 🎭
