const { SignInPage } = require("../page_objects/sign_in_page");
const { expect } = require("@playwright/test");
const playwright = require("playwright");
const { Scenario } = require("../util/util");

async function createPage() {
  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 500,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, "006 - Create Page");
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const pageTitle = "Title";
  const pageDescription = "Description";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

  // When
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(pageTitle, pageDescription, false);

  // Then
  await listFilterDeletePagePage.goto();
  expect(
    await listFilterDeletePagePage.verifyTitleInList(pageTitle)
  ).toBeTruthy();

  await browser.close();
  scenario.successful();
  return;
}

async function deletePage() {
  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 500,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, "010 - Delete Page");
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const pageToDelete = "Title changed"; // El título de la página que queremos eliminar
  const pageDescription = "Description";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

  // When
  const listPagePage = await dashboard.goToPages();
  const createDeletePagePage = await listPagePage.goToNewPage();
  await createDeletePagePage.createPage(pageToDelete, pageDescription, false);

  await createDeletePagePage.deletePage();

  // Then
  await listPagePage.goto();
  const isDeleted =
    (await listPagePage.verifyTitleChanged(pageToDelete)) === false; // Si no encuentra el título, está eliminado
  expect(isDeleted).toBeTruthy();

  await browser.close();
  scenario.successful();
}

module.exports = {
  createPage,
  deletePage,
};
