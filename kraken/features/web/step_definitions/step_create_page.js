
const { Given, When, Then } = require('@cucumber/cucumber');

//create page

When('I click on Pages', async function () {
    let element = await this.driver.$('[data-test-nav="pages"]');
    return await element.click();
});

When('I click on New page', async function () {
    let element = await this.driver.$('[data-test-new-page-button]');
    return await element.click();
});

When('I type page title {string}', async function (title) {
    let element = await this.driver.$('[data-test-editor-title-input]');
    return await element.setValue(title);
});

When('I type page description {string}', async function (description) {
    let element = await this.driver.$('.kg-prose');
    return await element.setValue(description);
});

When('I click on Publish', async function () {
    let element = await this.driver.$('[data-test-button="publish-flow"]');
    return await element.click();
});

When('I click on Final Review', async function () {
    let element = await this.driver.$('[data-test-button="continue"]');
    return await element.click();
});

When('I click on Publish Page right now', async function () {
    let element = await this.driver.$('[data-test-button="confirm-publish"]');
    return await element.click();
});

Then('the page title is visible', async function () {
    let element = await this.driver.$('h2');
    const text = await element.getText();
    return text === 'Title';
});

When('the page description is visible', async function () {
    let element = await this.driver.$('.post-excerpt');
    const text = await element.getText();
    return text === 'Description';
});

When('I click on close', async function () {
    let element = await this.driver.$('[data-test-button="close-publish-flow"]');
    return await element.click();
});