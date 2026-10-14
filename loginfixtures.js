import { test as base } from '@playwright/test';

export const test = base.extend({

    loginPage: async ({ page }, use) => {

        await page.goto('https://qa.certinext.io/');

        // Microsoft Login
        await page.locator('#SSOlogin').click();

        await page.locator('#i0116').fill(process.env.EMAIL_ID);
        await page.locator('#idSIButton9').click();

        await page.locator('#i0118').fill(process.env.PASSWORD);
        await page.locator("[data-report-event='Signin_Submit']").click();

        await page.locator(
            '[class="win-button button_primary high-contrast-overrides button ext-button primary ext-primary"]'
        ).click();

        await page.locator('#proceedToLogin3').click();

        // Wait for CERTInext login to complete
        await page.waitForTimeout(5000);

        // Pass the logged-in page to the test
        await use(page);
    }
});

export { expect } from '@playwright/test';