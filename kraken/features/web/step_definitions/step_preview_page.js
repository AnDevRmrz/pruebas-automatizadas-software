const { Given, When, Then } = require('@cucumber/cucumber');
// View page, first we need the previous test to have a page


When('I click on Page settings', async function () {
    let element = await this.driver.$('button.settings-menu-toggle[title="Settings"]');
    await element.waitForDisplayed();
    return await element.click();
});

When('I click on view Page', async function () {
    let element = await this.driver.$('.post-view-link');
    await element.waitForDisplayed();
    return await element.click();
});

Then('I check the title on view page', async function () {
    let element = await this.driver.$('.gh-article-title');
    await element.waitForDisplayed();
    let titleText = await element.getText();
    return titleText === "Title Changed";
});

Then('I check the description on view page', async function () {
    let element = await this.driver.$('.gh-content');
    await element.waitForDisplayed();
    let descriptionText = await element.getText();
    return descriptionText === "Description Changed";
});
