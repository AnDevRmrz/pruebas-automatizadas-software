const { Given, When, Then } = require('@cucumber/cucumber');

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

When('I click in create account', async function () {
    let element = await this.driver.$('#ember4');    
    return await element.click();
});

When('I type email login {string}', async function (email) {
    let element = await this.driver.$('#identification');
    return await element.setValue(email);
});

When('I click in sign in', async function () {
    let element = await this.driver.$('#ember5');    
    return await element.click();
});

Then('The title is visible', async function() {

    let elements = await this.driver.$('.gh-canvas-title');    
    const text = await elements.getText();    
    return text === 'Let’s get started!';
});

When('I click in posts', async function () {
    let element = await this.driver.$('[data-test-nav="posts"]'); // Reemplaza con el selector correcto
    return await element.click();
});

When('I click in new post', async function () {
    let element = await this.driver.$('[data-test-new-post-button]'); // Reemplaza con el selector correcto
    return await element.click();
});

When('I type post title {string}', async function (title) {
    let element = await this.driver.$('.gh-editor-title  ember-text-area gh-input ember-view'); // Reemplaza con el selector correcto
    return await element.setValue(title);
});

When('I type some text {string}', async function (text) {
    let element = await this.driver.$('.kg-prose'); // Reemplaza con el selector correcto
    return await element.setValue(text);
});

Then('publish button is visible', async function () {
    let element = await this.driver.$('.gh-btn gh-btn-editor darkgrey gh-publish-trigger'); // Reemplaza con el selector correcto
    return await element.isDisplayed();
});

When('I click in publish', async function () {
    let element = await this.driver.$('.gh-btn gh-btn-black gh-btn-large'); // Reemplaza con el selector correcto
    return await element.click();
});

When('I click in continue', async function () {
    let element = await this.driver.$('[data-test-button="confirm-publish"]'); // Reemplaza con el selector correcto
    return await element.click();
});