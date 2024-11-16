const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

When('I click in posts', async function () {
    let element = await this.driver.$('a[href="#/posts/"]');
    return await element.click();
});

When('I click in new post', async function () {
    let element = await this.driver.$('a[href="#/editor/post/"]'); 
    return await element.click();
});

When('I type post title {string}', async function (title) {
    let element = await this.driver.$('textarea[placeholder="Post Title"]'); 
    return await element.setValue(title);
});

When('I type post description {string}', async function (content) {
    let element = await this.driver.$('p[data-koenig-dnd-droppable="true"]');
    element.click();
    await new Promise(r => setTimeout(r, 500));
    return await element.setValue(content);
});

When('I click in publish post menu', async function () {
    let element = await this.driver.$('div[class="gh-publishmenu ember-view"] div');
    return await element.click();
});

When('I click in publish post button', async function () {
    let element = await this.driver.$(".gh-publishmenu-button");
    return await element.click();
});

When('I click in post settings gear button', async function () {
    let element = await this.driver.$('button[title="Settings"]');
    return await element.click();
});

When('I click in delete post button', async function () {
    let element = await this.driver.$('.settings-menu-delete-button');
    return await element.click();
});

When('I click in delete post confirmation button', async function () {
    let element = await this.driver.$('button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]');
    return await element.click();
});

Then('there is a post with title {string}', async function (postTitle) {
    let titleElements = await this.driver.$$("h3[class='gh-content-entry-title']");
    let titleValues = await Promise.all(titleElements.map(async (value) => await value.getText()));    
    assert.equal(titleValues.includes(postTitle), true);
});

Then('there is not a post with title {string}', async function (postTitle) {
    let titleElements = await this.driver.$$("h3[class='gh-content-entry-title']");
    let titleValues = await Promise.all(titleElements.map(async (value) => await value.getText()));    
    assert.equal(titleValues.includes(postTitle), false);
});