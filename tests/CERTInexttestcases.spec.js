import { test, expect } from '../loginfixtures.js';

test('Verify CERTInext Dashboard', async ({ page, loginPage }) => {

  await page.locator("[class='mdi mdi-clipboard-text-outline']").click();
  await page.locator('#plNewPolicyBtn').click();
  await page.locator('#polAddRuleBtn').click();
  await page.locator('[data-code="ALLOWED_ALGORITHMS"]').click();
 await page.locator('#polVal').fill('RSA, ECC');
 await page.locator('#polAddToDraft').click();
});

test('Verify CERTInext Dashboard', async ({ page, loginPage }) => {

  await page.locator("[class='mdi mdi-clipboard-text-outline']").click();
  await page.locator('#plNewPolicyBtn').click();
  await page.locator('#polAddRuleBtn').click();
  await page.locator('[data-code="ALLOWED_ALGORITHMS"]').click();
 await page.locator('#polVal').fill('RSA, ECC');
 await page.locator('#polAddToDraft').click();
});