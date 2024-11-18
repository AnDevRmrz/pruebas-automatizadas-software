const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

When('I click in posts', async function () {
    let element = await this.driver.$('a[data-test-nav="posts"]'); // Reemplaza con el selector correcto
    return await element.click();
});

When('I click in new post', async function () {
    let element = await this.driver.$("div[class='view-actions-top-row'] a[class='ember-view gh-btn gh-btn-primary']"); 
    return await element.click();
});

When('I type post title {string}', async function (title) {
    let element = await this.driver.$("div[class='gh-editor-title-container'] textarea[class='gh-editor-title  ember-text-area gh-input ember-view']"); 
    return await element.setValue(title);
});

When('I type post description {string}', async function (content) {
    let element = await this.driver.$('.kg-prose');
    return await element.setValue(content);
});

When('I click in publish post', async function () {
    let element = await this.driver.$('[data-test-button="publish-flow"]');
    return await element.click();
});

When('I click in post link', async function () {
    let element = await this.driver.$('[data-test-link="posts"]');
    return await element.click();
});

When('I click in continue post', async function () {
    let element = await this.driver.$("button[class='gh-btn gh-btn-black gh-btn-large']");
    return await element.click();
});

When('I click in confirm publish post', async function () {
    let element = await this.driver.$("button[class='gh-btn gh-btn-large gh-btn-pulse ember-view']");
    return await element.click();
});

When('I click in post analytic', async function () {
    let element = await this.driver.$("a[class='ember-view permalink gh-list-data gh-post-list-button']");
    return await element.click();
});

When('I click in close modal', async function () {
    let element = await this.driver.$('button[data-test-button="close-publish-flow"]');
    return await element.click();
});

When('I click in post name', async function () {
    let element = await this.driver.$('a[class="ember-view permalink gh-list-data gh-post-list-title"]');
    return await element.click();
});

When('I do right click over the post', async function () {
    let element = await this.driver.$('.gh-content-entry-title');
    await element.waitForDisplayed();
    await element.click({ button: 'right' });
});

When('I click in delete post', async function () {
    // Selecciona el botón "Delete" y desplázate a él para asegurarte de que está visible en el viewport
    let element = await this.driver.$('[data-test-button="delete"]');
    await element.scrollIntoView();
    await element.waitForDisplayed(); // Espera a que el botón "Delete" esté visible
    await element.click(); // Intenta hacer clic en el botón "Delete"
});

When('I click in confirm delete post', async function () {
    let element = await this.driver.$('[data-test-button="confirm"]');
    return await element.click();
});

Then('I check that the deleted post with title {string} is no longer existent', async function (title) {
    let elements = await this.driver.$$('.gh-content-entry-title');
    let elementFound = false;
    for (const row of elements) {      
      if (row.getText() === title) {
        elementFound = true;
        break;
      }
    }
    assert.equal(elementFound, false);
});

Then('there is a post with title {string}', async function (postTitle) {
    let titleElements = await this.driver.$$("div[class='gh-posts-list-item-group'] h3[class='gh-content-entry-title']");
    let titleValues = await Promise.all(titleElements.map(async (value) => await value.getText()));    
    assert.equal(titleValues.includes(postTitle), true);
});

Then('the post title is {string}', async function (postTitle) {
    let element = await this.driver.$("div[class='flex flex-column flex-grow-1'] h2[class='gh-canvas-title gh-post-title']");
    let titleElement = await element.getText();
    assert.equal(titleElement,postTitle);
});

Then('I click in analytics button and delete post', async function () {
    let element = await this.driver.$('button[data-test-button="delete-post"]');
    return await element.click();
});

Then('I click in update post', async function () {
    let element = await this.driver.$('[data-test-button="publish-save"]');
    return await element.click();
});
