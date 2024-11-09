
const { Given, When, Then } = require('@cucumber/cucumber');

// Filter Page, first we need a Page with draft

When('I click on filter all Pages', async function () {
    let element = await this.driver.$('.ember-power-select-trigger');
    await element.waitForDisplayed();
    return await element.click();
});

When('I click on draft Pages', async function () {
    let element = await this.driver.$('[data-option-index="1"]');
    await element.waitForDisplayed();
    return await element.click();
});

Then('I check the title drafted', async function () {
    let element = await this.driver.$('.gh-content-entry-title');
    await element.waitForDisplayed();
    let titleText = await element.getText();
    return titleText === "Title draft";
});

Then('I check the attribute draft', async function () {
    let element = await this.driver.$('.gh-content-entry-status .draft');
    await element.waitForDisplayed();
    let statusText = await element.getText();
    return statusText === "Draft";
});