const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

/**
 * E2E Tag's steps
 */

When('I click on tag main option', async function () {
    let element = await this.driver.$('a[href*="tags"]');
    return await element.click();
});

When('I click on new tag button', async function () {
    let element = await this.driver.$("a[href*='tags/new/']");
    return await element.click();
});

When('I type in the tag name field {string}', async function (tagName) {
    let element = await this.driver.$('#tag-name');
    return await element.setValue(tagName);
});

When('I clean the slug field', async function () {
    let element = await this.driver.$('#tag-slug');
    return await element.setValue("");
});

When('I type in the slug field {string}', async function (tagSlug) {
    let element = await this.driver.$('#tag-slug');
    return await element.setValue(tagSlug);
});

When('I type in the description field {string}', async function (tagDescription) {
    let element = await this.driver.$('#tag-description');
    return await element.setValue(tagDescription);
});

When('I click on the save tag button', async function () {
    let element = await this.driver.$('section[class=view-actions] button');
    return await element.click();
});

When('I click on the row with {string} tag slug', async function (slug) {
    let element = await this.driver.$(`.gh-tags-list-item a[href*='${slug}']`);
    return await element.click();
});

When('I click on the delete tag button', async function () {
    let element = await this.driver.$('button[class*="gh-btn-red"]');
    return await element.click();
});

When('I confirm the deletion of the tag', async function () {
    let element = await this.driver.$('.modal-footer button[class*="gh-btn-red"]');
    return await element.click();
});

Then('I go to tags', async function() {
    let element = await this.driver.$('a[href*="tags"]');
    return await element.click();
});

Then('I can see a row with tag title name {string}', async function (tagName) {    

    let titleElements = await this.driver.$$('.gh-tag-list-name');
    let titleValues = await Promise.all(titleElements.map(async (value) => await value.getText()));    
    assert.equal(titleValues.includes(tagName), true);
});

Then('I can see a row with tag description {string}', async function (tagDescription) {

    let descriptionElements = await this.driver.$$('.gh-tag-list-description');
    let descriptionValues = await Promise.all(descriptionElements.map(async (value) => await value.getText()));    
    assert.equal(descriptionValues.includes(tagDescription), true);
});

Then('I can see a row with slug {string}', async function (slug) {    

    let slugElements = await this.driver.$$('.gh-tag-list-slug span');
    let slugValues = await Promise.all(slugElements.map(async (value) => await value.getText()));    
    assert.equal(slugValues.includes(slug), true);
});

Then('I cannot see a row with tag title name {string}', async function (tagName) {    

    let titleElements = await this.driver.$$('.gh-tag-list-name');
    let titleValues = await Promise.all(titleElements.map(async (value) => await value.getText()));    
    assert.equal(titleValues.includes(tagName), false);
});

Then('I cannot see a row with tag description {string}', async function (tagDescription) {

    let descriptionElements = await this.driver.$$('.gh-tag-list-description');
    let descriptionValues = await Promise.all(descriptionElements.map(async (value) => await value.getText()));    
    assert.equal(descriptionValues.includes(tagDescription), false);
});

Then('I cannot see a row with slug {string}', async function (slug) {    
    
    let slugElements = await this.driver.$$('.gh-tag-list-slug span');
    let slugValues = await Promise.all(slugElements.map(async (value) => await value.getText()));    
    assert.equal(slugValues.includes(slug), false);
});