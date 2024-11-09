const { Given, When, Then } = require('@cucumber/cucumber');
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