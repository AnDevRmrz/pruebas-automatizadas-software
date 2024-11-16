const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

When('I click on create account button', async function () {
    let element = await this.driver.$('a[href*="setup/two"]');
    return await element.click();
});

When('I type title {string}', async function (title) {
    let element = await this.driver.$('#blog-title');
    return await element.setValue(title);
});

When('I type full name {string}', async function (name) {
    let element = await this.driver.$('#name');
    return await element.setValue(name);
});

When('I type email address {string}', async function (email) {
    let element = await this.driver.$('#email');
    return await element.setValue(email);
});

When('I type password {string}', async function (password) {
    let element = await this.driver.$('#password');
    return await element.setValue(password);
});

When('I click on last step button', async function () {
    let element = await this.driver.$('button[tabindex="5"]');
    return await element.click();
});

When('I click on take me to the site', async function () {
    let element = await this.driver.$('button[class=gh-flow-skip]');
    return await element.click();
});

When('I type email login {string}', async function (email) {
    let element = await this.driver.$('input[name=identification]');
    return await element.setValue(email);
});

When('I type password login {string}', async function (email) {
    let element = await this.driver.$('input[name=password]');
    return await element.setValue(email);
});

When('I click in sign in', async function () {
    let element = await this.driver.$('button[class*="login"]');    
    return await element.click();
});

Then('The title is visible', async function() {

    let elements = await this.driver.$('.gh-canvas-title');    
    const text = await elements.getText();    
    return text === 'Let’s get started!';
});