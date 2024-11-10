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

// Delete page, first we need the previous test to have a page

When('I do right click over the Title Changed', async function () {
    let element = await this.driver.$('.gh-content-entry-title');
    await element.waitForDisplayed();
    await element.click({ button: 'right' });
});

When('I click on delete', async function () {
    // Selecciona el botón "Delete" y desplázate a él para asegurarte de que está visible en el viewport
    let element = await this.driver.$('[data-test-button="delete"]');
    await element.scrollIntoView();
    await element.waitForDisplayed(); // Espera a que el botón "Delete" esté visible
    await element.click(); // Intenta hacer clic en el botón "Delete"
});


When('I click on big delete once again', async function () {
    let element = await this.driver.$('[data-test-button="confirm"]');
    return await element.click();
});

Then('I check that the deleted page is no longer existent', async function () {
    let elements = await this.driver.$$('.gh-content-entry-title');
    return elements.length === 2; // Predetermined page and drafted page
});


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

Then('I check the title page is visible in list', async function () {
    let element = await this.driver.$('.gh-content-entry-title');
    let titleText = await element.getText();
    return titleText === "Title";
});