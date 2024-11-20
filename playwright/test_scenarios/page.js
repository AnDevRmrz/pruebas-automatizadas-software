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
  expect(await createPagePage.verifyTitleInModal(pageTitle)).toBeTruthy();
  expect(
    await createPagePage.verifyDescriptionInModal(pageDescription)
  ).toBeTruthy();
  await createPagePage.closePublishFlow();
  await listFilterDeletePagePage.goto();
  expect(
    await listFilterDeletePagePage.verifyTitleInList(pageTitle)
  ).toBeTruthy();

  await browser.close();
  scenario.successful();
  return;
}

async function editPage() {
  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 500,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, "007 - Edit Page");
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const newTitle = "Title changed";
  const newDescription = "Description changed";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

  // When
  const listFilterDeletePagePage = await dashboard.goToPages();
  const editPagePage = await listFilterDeletePagePage.goToEditPage("Title");
  await editPagePage.changeTitle(newTitle);
  await editPagePage.changeDescription(newDescription);
  await editPagePage.clickUpdate();
  await editPagePage.goBack();

  // Then
  expect(
    await listFilterDeletePagePage.verifyTitleChanged(newTitle)
  ).toBeTruthy();

  await browser.close();
  scenario.successful();
  return;
}

async function previewPage() {
  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 500,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, "008 - Preview Page");
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const expectedTitle = "Title changed";
  const expectedDescription = "Description changed";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

  // When
  const listFilterDeletePagePage = await dashboard.goToPages();
  const editPreviewPagePage = await listFilterDeletePagePage.goToEditPage(
    "Title changed"
  );
  await editPreviewPagePage.openSettings();
  const previewPage = await editPreviewPagePage.viewPage();

  // Then
  expect(await previewPage.verifyPreviewTitle(expectedTitle)).toBeTruthy();
  expect(
    await previewPage.verifyPreviewDescription(expectedDescription)
  ).toBeTruthy();

  await browser.close();
  scenario.successful();
  return;
}

async function filterDraftPages() {
  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 500,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, "009 - Filter Draft Pages");
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const draftPageTitle = "Title draft";
  const expectedAttribute = "Draft";
  const pageTitle = draftPageTitle;
  const pageDescription = "Description draft";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(pageTitle, pageDescription, true);
  await dashboard.goToPages();

  // When
  await listFilterDeletePagePage.filterByDraft();

  // Then
  const pageAttribute = await listFilterDeletePagePage.getPageAttributeByTitle(
    draftPageTitle
  );
  expect(pageAttribute).toBe(expectedAttribute);
  await browser.close();
  scenario.successful();
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
  const pageToDelete = "Title changed 1"; // El título de la página que queremos eliminar
  const pageDescription = "My description";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

  // When
  const listFilterDeletePagePage = await dashboard.goToPages();

  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(pageToDelete, pageDescription, false);
  await createPagePage.closePublishFlow();
  await listFilterDeletePagePage.goto();

  await listFilterDeletePagePage.rightClickOnPage(pageToDelete);
  await listFilterDeletePagePage.clickDeleteButton();
  await listFilterDeletePagePage.confirmDelete();

  // Then
  await listFilterDeletePagePage.goto();
  const isDeleted =
    (await listFilterDeletePagePage.verifyTitleChanged(pageToDelete)) === false; // Si no encuentra el título, está eliminado
  expect(isDeleted).toBeTruthy();

  await browser.close();
  scenario.successful();
}

module.exports = {
  createPage,
  editPage,
  previewPage,
  filterDraftPages,
  deletePage,
};
