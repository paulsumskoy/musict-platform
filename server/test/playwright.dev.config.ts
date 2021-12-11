import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './e2e/playwright',
  testMatch: '*.spec.ts',
  timeout: 30000,
  use: {
    viewport: { width: 1400, height: 800 },
    baseURL: 'http://localhost:5000',
  },
};

export default config;
