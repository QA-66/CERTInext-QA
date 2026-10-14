require('dotenv').config({
    path: 'D:/PlaywrightAutomation/.env'
});
const {test, expect} = require('@playwright/test');
 
//  test('Verify BOT creation initaitation', async({page})=>
   
// {
// await page.goto('https://qa.certinext.io/dashboard');
// await page.locator('[data-activevalue="certificateDiscoveryDashboard"]').click();
// await page.locator('#create-bot-btn').click();
// await page.locator('#tokenName').fill('new bot');
// await page.locator('#finishBtn').click();
// console.log(await page.locator('div[class="bg-light px-4 py-3"]').textContent());
// console.log("BOT created successfully");
// });
 
test('Verify Discovery using F5 Big IP', async({page})=>

{
    await page.goto('https://qa.certinext.io/dashboard');
    await page.locator('[data-activevalue="certificateDiscoveryDashboard"]').click();
    await page.locator('//div[@class="col-md-3 pe-md-0 mb-2 mb-md-0"]//div[@class="bg-blue-50 p-2 text-center border shadow-sm mb-2 mb-md-0 position-relative h-100"]//div[@class="d-flex justify-content-center align-items-center gap-1"]').click();
    await page.locator('//div[@class="dropdown selectDropdown botActionDropdown position-static"]').selectOption(index=1);
    await page.locator('//i[@class="fa fa-edit"]').click();
    await page.locator('#F5BigIPCheckbox').check();
    await page.locator('##F5BigIPAddress1').fill('3.81.31.52')
    await page.locator('#F5BigIPPort1').fill('8443');
    await page.locator('#F5BigIPUsername1').fill('admin');
    await page.locator('#F5BigIPPassword1').fill('eMudhra@1');
    await page.locator('[onclick="testF5ConnectionBySource(this)"]').click();
    await page.locator('[onclick="checkIfCertificateExistsForEdit(\'hrZ+/dXBNVs=\')"]').click();
});
test('Verify test connection status', async({page})=>
{
await page.goto('https://qa.certinext.io/dashboard');
    await page.locator('//div[@class="col-md-3 pe-md-0 mb-2 mb-md-0"]//div[@class="bg-blue-50 p-2 text-center border shadow-sm mb-2 mb-md-0 position-relative h-100"]//div[@class="d-flex justify-content-center align-items-center gap-1"]').click();
    await page.locator('//div[@class="dropdown selectDropdown botActionDropdown position-static"]').selectOption(index=1);
    await page.locator('//i[@class="fa fa-edit"]').click();
    const F5ConnectionStatus = await page.locator('##f5ConnectionStatus1');
    if(F5ConnectionStatus===success){

        console.log("F5 Connection failed");
    }
    else{
        console.log("F5 Connection successful");
    }
});
