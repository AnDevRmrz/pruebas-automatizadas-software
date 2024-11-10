const { SignInPage } = require("../page_objects/sign_in_page");
const { expect } = require('@playwright/test');
const playwright = require("playwright");

async function createPage() {

  const browser = await playwright["chromium"].launch({ headless: false, slowMo: 500});
  const context = await browser.newContext();
  const page = await context.newPage();  
  const email = "alguien@hotmail.com";
  const password = "123456#213asdf"
  const tagName = "Tag Name Test";
  const tagSlug = "slug-test";
  const tagDescription = "Description Test";

  // Given
  const signInPage = new SignInPage(page);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

}