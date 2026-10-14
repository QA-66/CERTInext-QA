const { defineConfig } = require('@playwright/test');
export default defineConfig({
  testDir: './tests',
 globalSetup: "./global-setup.js",
  reporter:[['html', {open: "on_failure"}]],
  use: {
 
    browserName: 'chromium',
    headless: false,
    trace: 'retain-on-failure',
    storageState: "./playwright/.auth/auth.json"
  },
 
timeout: 100 * 1000, // 100 seconds
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    },
  ],
});