import type { PlaywrightTestConfig } from '@playwright/test';

function readEnvInt(name: string, fallback: number): number {
  const raw = process.env[name];
  if (raw === undefined || raw === '') return fallback;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

const WIREframe_PORT = 4570;

const config: PlaywrightTestConfig = {
  globalSetup: './tests/e2e/setup/global-setup.ts',
  globalTeardown: './tests/e2e/setup/global-teardown.ts',
  testDir: 'tests/e2e',
  testMatch: /(.+\.)?e2e\.test\.[jt]s/,
  timeout: 60000,
  expect: { timeout: 10000 },
  retries: readEnvInt('PW_RETRIES', 0),
  workers: readEnvInt('PW_WORKERS', 1),
  webServer: {
    command: `pnpm -C wireframe dev --port ${WIREframe_PORT} --host 127.0.0.1`,
    port: WIREframe_PORT,
    reuseExistingServer: !process.env.CI && process.env.PW_DISABLE_REUSE_SERVER !== '1',
    timeout: 120000
  },
  use: {
    baseURL: `http://127.0.0.1:${WIREframe_PORT}`,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    navigationTimeout: 45000,
    actionTimeout: 45000,
    serviceWorkers: 'block'
  },
  projects: [
    {
      name: 'wireframe',
      use: { browserName: 'chromium' }
    }
  ]
};

export default config;
