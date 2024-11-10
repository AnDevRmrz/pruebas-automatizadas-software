const { SignInPage } = require("../page_objects/sign_in_page");
const { expect } = require('@playwright/test');
const playwright = require("playwright");
const { Scenario } = require("../util/util");

async function createPage() {
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 500 });
    const context = await browser.newContext();
    const page = await context.newPage();
    const scenario = new Scenario(page, "006 - Create Page");
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const pageTitle = "Title";
    const pageDescription = "Description";

    try {
        // Given
        const signInPage = new SignInPage(scenario);
        await signInPage.goto();
        const dashboard = await signInPage.signIn(email, password);
        
        // When
        const listPagesPage = await dashboard.goToPages();
        const createPagePage = await listPagesPage.goToNewPage();
        await createPagePage.createPage(pageTitle, pageDescription);
        
        // Then
        expect(await createPagePage.verifyTitleInModal(pageTitle)).toBeTruthy();
        expect(await createPagePage.verifyDescriptionInModal(pageDescription)).toBeTruthy();
        await createPagePage.closePublishFlow();
        await listPagesPage.goto();
        expect(await listPagesPage.verifyTitleInList(pageTitle)).toBeTruthy();
        
    } finally {
        await browser.close();
        scenario.successful();
        return ;
    }
}

module.exports = { createPage };