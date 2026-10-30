require('dotenv').config({
    path: 'D:/PlaywrightAutomation/.env'
});
const {test, expect} = require('@playwright/test');
const {templateFilePath} = require('../testdata.js');
const UsersandRolesPage = require('../PageObjectModel/Bulkimportpage.js');
test('Add new user from Dashboard Quick actions', async({page})=>{

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
await page.waitForLoadState('networkidle');
});

test('Export the users data to PDF', async({page})=>{
await page.goto("https://qa.certinext.io/");
await page.locator('#dashboardRedirect').click();
await page.locator('[class="fa fa-cog"]').click();
await page.locator('[data-activevalue="addUsersPage"]').click();
await page.locator('[onclick="detailsToExcel(\'2\')"]').click();
await page.waitForLoadState('domcontentloaded');
});


test('View user status before activation', async({page})=>{
await page.goto("https://qa.certinext.io/");
await page.locator('#dashboardRedirect').click();
await page.locator('[class="fa fa-cog"]').click();
await page.locator('[data-activevalue="addUsersPage"]').click();
await page.locator('[class="btn btn-secondary dropdown-toggle"]').nth(0).click();
await page.locator('a').filter({ hasText: 'View' }).first().click();
const status =await page.locator('[class="badge bg-warning"]').textContent();
console.log("User status is: "+status);
});

test('Resend activation email for user', async({page})=>{
await page.goto("https://qa.certinext.io/");
await page.locator('#dashboardRedirect').click();
await page.locator('[class="fa fa-cog"]').click();
await page.locator('[data-activevalue="addUsersPage"]').first().click();
await page.locator('[class="btn btn-secondary dropdown-toggle"]').nth(0).click();
await page.locator('a').filter({ hasText: 'Resend Email' }).first().click();
const resendemailstatus =await page.locator('[class="toast-message"]').textContent();
console.log("Resend activation email status: "+resendemailstatus);
});

test('Add user from Settings page', async({page})=>{

await page.goto("https://qa.certinext.io/");
await page.locator('#dashboardRedirect').click();
await page.locator('[class="fa fa-cog"]').click();
await page.locator('[data-activevalue="addUsersPage"]').click();
await page.locator('[title="Create User"]').click();
await page.getByRole('textbox', { name: 'Maximum 50 characters allowed' }).fill('Newuser');
await page.locator('#email').fill('karthik.pn@emudhra.com');
await page.locator('#role_6').check();
await page.locator('[onclick="saveUser()"]').click();
//await page.screenshot({path: 'adduser.png'});
const errormessage= await page.locator('[class="toast-message"]').textContent();
console.log("Message is: "+errormessage);

});


test('Bulk import users from excel', async({page})=>{
const usersPage= new UsersandRolesPage(page);
await usersPage.NavigatetoBulkimportuserstab();
await page.locator('#bulkImportExcelFile').setInputFiles(templateFilePath);
await page.waitForTimeout(3000);
const importerror =await page.locator('#bulkImportUploadText').textContent();
console.log("Import error message: "+importerror);
const table = page.locator('#bulkImportValidationErrors');
const rows = table.locator('tr');
const rowCount = await rows.count();
for (let i = 0; i < rowCount; i++) {
  const cells = rows.nth(i).locator('th, td');
  const cellCount = await cells.count();
  const rowData = [];

  for (let j = 0; j < cellCount; j++) {
    rowData.push(
      (await cells.nth(j).innerText()).trim()
    );
  }

  console.log(rowData.join(' | '));
}
});

test('Download template to Bulk Import', async({page})=>{
const usersPage= new UsersandRolesPage(page);
await usersPage.NavigatetoBulkimportuserstab();
await page.locator('[onclick="generateBulkImportUsersExcel()"]').click();
const templateDownloadStatus = await page.locator('[class="toast toast-success"]').textContent();
console.log("Template download status: "+templateDownloadStatus);
});