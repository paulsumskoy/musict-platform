import { Browser } from '@playwright/test';
import { URLS } from './enums';

export const visit = async (browser: Browser, path: URLS) => {
  const page = await browser.newPage();
  await page.goto(path);
  return page;
};
