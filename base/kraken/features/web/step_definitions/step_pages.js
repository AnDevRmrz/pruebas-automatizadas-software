const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

When('I click on Pages', async function () {
    let element = await this.driver.$('a[href="#/pages/"]');
    return await element.click();
});

When('I click on New page', async function () {
    let element = await this.driver.$('a[href="#/editor/page/"]'); 
    return await element.click();
});

When('I type page title {string}', async function (title) {
    let element = await this.driver.$('textarea[placeholder="Page Title"]'); 
    return await element.setValue(title);
});

When('I type page description {string}', async function (description) {
    let element = await this.driver.$('p[data-koenig-dnd-droppable="true"]');
    element.click();
    await new Promise(r => setTimeout(r, 500));
    return await element.setValue(description);
});

When('I click in publish page menu', async function () {
    let element = await this.driver.$('div[class="gh-publishmenu ember-view"] div');
    return await element.click();
});

When('I click in publish page button', async function () {
    let element = await this.driver.$(".gh-publishmenu-button");
    return await element.click();
});

When('I click in page settings gear button', async function () {
    let element = await this.driver.$('button[title="Settings"]');
    return await element.click();
});

When('I click in delete page button', async function () {
    let element = await this.driver.$('.settings-menu-delete-button');
    return await element.click();
});

When('I click in delete page confirmation button', async function () {
    let element = await this.driver.$('button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]');
    return await element.click();
});

Then('there is a page with title {string}', async function (postTitle) {
    let titleElements = await this.driver.$$("h3[class='gh-content-entry-title']");
    let titleValues = await Promise.all(titleElements.map(async (value) => await value.getText()));    
    assert.equal(titleValues.includes(postTitle), true);
});

Then('there is not a page with title {string}', async function (postTitle) {
    let titleElements = await this.driver.$$("h3[class='gh-content-entry-title']");
    let titleValues = await Promise.all(titleElements.map(async (value) => await value.getText()));    
    assert.equal(titleValues.includes(postTitle), false);
});
