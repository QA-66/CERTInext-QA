require('dotenv').config({
    path: 'D:/PlaywrightAutomation/.env'
});
const {test, expect} = require('@playwright/test');

test('Add new user', async({page})=>{

await page.goto("https://qa.certinext.io/");
await page.locator('#dashboardRedirect').click();
await page.locator('[class="quickLink-icon me-md-2"]').click();
await page.getByRole('link', { name: 'Add New User' }).click();
await page.getByRole('textbox', { name: 'Maximum 50 characters allowed' }).fill('Test User');
await page.locator('#email').fill('sneha.k@emudhra.com');
await page.locator('#role_6').check();
await page.locator('[onclick="saveUser()"]').click();
//await page.screenshot({path: 'adduser.png'});
const errormessage= await page.locator('[class="toast-message"]').textContent();
console.log("Error message is: "+errormessage);
});

test('Export the users data to excel', async({page})=>{
await page.goto("https://qa.certinext.io/");
await page.locator('#dashboardRedirect').click();
await page.locator('[class="fa fa-cog"]').click();
await page.locator('[data-activevalue="addUsersPage"]').click();
await page.locator('[class="fa fa-file-excel-o"]').click();
});

test('View user status before activation', async({page})=>{
await page.goto("https://qa.certinext.io/");
await page.locator('#dashboardRedirect').click();
await page.locator('[class="fa fa-cog"]').click();
await page.locator('[data-activevalue="addUsersPage"]').click();
await page.locator('[class="btn btn-secondary dropdown-toggle"]').click();
await page.locator("[onclick=\"viewUser('7uuLW0RVVcg=')\"]").click();
const status =await page.locator('[class="badge bg-warning"]').textContent();
console.log("User status is: "+status);
});

test('Resend activation email for user', async({page})=>{
await page.goto("https://qa.certinext.io/");
await page.locator('#dashboardRedirect').click();
await page.locator('[class="fa fa-cog"]').click();
await page.locator('[data-activevalue="addUsersPage"]').click();
await page.locator('[class="btn btn-secondary dropdown-toggle"]').click();
await page.locator('[onclick="resendActivationEmailForUser(\'7uuLW0RVVcg=\')"]').click();
const resendemailstatus =await page.locator('[class="toast-message"]').textContent();
console.log("Resend activation email status: "+resendemailstatus);
});