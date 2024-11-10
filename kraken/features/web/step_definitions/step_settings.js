const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

/**
 * E2E Settings' steps
 */

When('I click on the settings button', async function () {
    let element = await this.driver.$("a[data-test-nav='settings']");
    return await element.click();
});

When('I click on the edit button of title & description', async function () {
    let element = await this.driver.$("div[data-testid='title-and-description'] button");
    return await element.click();
});

When('I type site title {string}', async function (siteTitle) {
    let element = await this.driver.$("div[data-testid='title-and-description'] input[placeholder='Site title']");
    return await element.setValue(siteTitle);
});

When('I type site description {string}', async function (siteDescription) {
    let element = await this.driver.$("div[data-testid='title-and-description'] input[placeholder='Site description']");
    return await element.setValue(siteDescription);
});

When('I click on the save button of title & description', async function () {
    let element = await this.driver.$("div[data-testid='title-and-description'] button[class*='bg-green']");
    return await element.click();
});

When('I click on the edit button of site timezone', async function () {
    let element = await this.driver.$("div[data-testid='timezone'] button");
    return await element.click();
});

When('I click on the timezone combobox', async function () {
    let element = await this.driver.$("div[data-testid='timezone-select']");
    return await element.click();
});

When('I select {string} timezone', async function (timezone) {
    let element = await this.driver.$("div[data-testid='timezone'] input");
    await element.setValue(timezone);
    return element.keys('Enter');
});

When('I click on the save button of site timezone', async function () {
    let element = await this.driver.$("div[data-testid='timezone'] button[class*='bg-green']");
    return await element.click();
});

Then('I can see the site title as {string}', async function (siteTitle) {    

    let elements = await this.driver.$$("div[data-testid='title-and-description'] div[class='flex items-center mt-1']");
    let values = await Promise.all(elements.map(async (value) => await value.getText()));    
    assert.equal(values.includes(siteTitle), true);
});

Then('I can see the site description as {string}', async function (siteTitle) {    

    let elements = await this.driver.$$("div[data-testid='title-and-description'] div[class='flex items-center mt-1']");
    let values = await Promise.all(elements.map(async (value) => await value.getText()));    
    assert.equal(values.includes(siteTitle), true);
});

Then('I can see the new site timezone as {string}', async function (siteTimezone) {    

    let elements = await this.driver.$$("div[data-testid='timezone'] div[class='flex flex-col']");
    let values = await Promise.all(elements.map(async (value) => await value.getText()));
    let includesSiteTimezone = values.some( value => value.includes(siteTimezone));    
    assert.equal(includesSiteTimezone, true);
});