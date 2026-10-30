class UsersandRolesPage{
constructor(page){
    this.page=page;
}

async NavigatetoBulkimportuserstab(){
await this.page.goto("https://qa.certinext.io/");
await this.page.locator('#dashboardRedirect').click();
await this.page.locator('[class="fa fa-cog"]').click();
await this.page.locator('[data-activevalue="addUsersPage"]').click();
await this.page.locator('[data-bs-target="#bulkImportUsersModal"]').click();
}};

module.exports=UsersandRolesPage;