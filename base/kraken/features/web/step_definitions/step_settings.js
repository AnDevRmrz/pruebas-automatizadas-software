const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

/**
 * E2E Settings' steps
 */

When('I click on the settings button', async function () {
    let element = await this.driver.$("a[href*='settings']");
    return await element.click();
});

When('I click on the general settings option button', async function () {
    let element = await this.driver.$("a[href*='settings/general']");
    return await element.click();
});

When('I click on the expand button of title & description', async function () {
    let element = await this.driver.$$(".gh-expandable-header button")[0];
    return await element.click();
});

When('I type site title {string}', async function (siteTitle) {
    let element = await this.driver.$$(".gh-setting-content-extended input")[0];
    return await element.setValue(siteTitle);
});

When('I type site description {string}', async function (siteDescription) {
    let element = await this.driver.$$(".gh-setting-content-extended input")[1];
    return await element.setValue(siteDescription);
});

When('I click on the save settings button', async function () {
    let element = await this.driver.$("section[class=view-actions] button");
    return await element.click();
});

When('I click on the expand button of set timezone', async function () {
    let element = await this.driver.$$(".gh-expandable-header button")[1];
    return await element.click();
});

When('I select the second option of the timezone that is Hawaii', async function () {
    let element = await this.driver.$("#timezone");
    await element.selectByIndex(1);
});

Then('I can see the site title as {string}', async function (siteTitle) {    

    let element = await this.driver.$$(".gh-setting-content-extended input")[0];    
    let elementValue = await element.getValue();    
    assert.equal(elementValue.includes(siteTitle), true);
});

Then('I can see the site description as {string}', async function (siteDescription) {    

    let element = await this.driver.$$(".gh-setting-content-extended input")[1];    
    let elementValue = await element.getValue();    
    assert.equal(elementValue.includes(siteDescription), true);
});

Then('I can see the new site timezone as Hawaii', async function () {

    let element = await this.driver.$("#timezone");
    let elementValue = await element.getValue();
    assert.equal(elementValue.includes("Pacific/Honolulu"), true);
});