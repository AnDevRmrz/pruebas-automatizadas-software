
const { Given, When, Then } = require('@cucumber/cucumber');

// Edit page, first we need the previous created page to edit it

When('I click on Go to Editor', async function () {
    let element = await this.driver.$('[title="Go to Editor"]');
    return await element.click();
});

When('I change the title {string}', async function (title) {
    let element = await this.driver.$('[data-test-editor-title-input]');
    return await element.setValue(title);
});

When('I change the description {string}', async function (description) {
    let element = await this.driver.$('.kg-prose');
    await element.click(); 
    await this.driver.keys(['Control', 'a']);
    await this.driver.keys('Backspace'); 
    return await element.setValue(description);
});

When('I click on Update', async function () {
    let element = await this.driver.$('[data-test-button="publish-save"]');
    return await element.click();
});

When('I click on Go back', async function () {
    let element = await this.driver.$('[data-test-link="pages"]');
    return await element.click();
});

Then('I check the Title Changed', async function () {
    let element = await this.driver.$('.gh-content-entry-title');
    let titleText = await element.getText();
    return titleText === "Title Changed";
});
