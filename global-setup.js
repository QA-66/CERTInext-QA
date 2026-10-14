import { chromium, expect } from "@playwright/test";
require('dotenv').config()
async function globalsetup() {
const browser = await chromium.launch({headless: false});
const context =await browser.newContext();
const page= await context.newPage();
await page.goto(process.env.BASE_URL);
await page.locator('#SSOlogin').click();
await page.waitForTimeout(3000);
await page.screenshot({path: 'loginscreen.png'});
await page.locator('#i0116').fill(process.env.EMAIL_ID);
await page.getByRole("button",{name:'Next'}).click();
await page.getByPlaceholder("Password").fill(process.env.PASSWORD);
await page.getByRole("button", {name:'Sign in'}).click();
await page.getByRole("button", {name: 'Yes'}).click();
await page.locator('#proceedToLogin3').click();
await page.waitForURL("https://qa.certinext.io/dashboard");
await page.context().storageState({path: "./playwright/.auth/auth.json"})
}
module.exports=globalsetup;