import { test, Page, expect } from '@playwright/test';
import { URLS } from '../utils/enums';
import { visit } from '../utils/visit';

test.describe('visit tracks page', () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await visit(browser, URLS.HOME);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('visit home page', async () => {
    await expect(page).toHaveURL(URLS.HOME);
  });

  test('home page should have element with text "Welcome!"', async () => {
    const greetingLocator = page.locator('text="Welcome!"');
    expect(await greetingLocator.elementHandle()).not.toBeNull();
  });

  test('visit tracks page', async () => {
    await page.goto(URLS.TRACKS);
    await expect(page).toHaveURL(URLS.TRACKS);
  });

  test('tracks page should have element with text "Track List"', async () => {
    const listLocator = page.locator('h1 >> text="Track List"');
    expect(await listLocator.elementHandle()).not.toBeNull();
  });
});
