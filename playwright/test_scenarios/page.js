const { SignInPage } = require("../page_objects/sign_in_page");
const { expect } = require("@playwright/test");
const playwright = require("playwright");
const { Scenario } = require("../util/util");

async function createPage(pageTitle,pageDescription,scenario_name) {

  if (typeof pageTitle !== "string" || typeof pageDescription !== "string"|| typeof scenario_name !== "string") {
    throw new TypeError("Both pageTitle, pageDescription and scenario_name must be strings");
  }

  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 500,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  //const scenario = new Scenario(page, "006 - Create Page");
  const scenario = new Scenario(page, scenario_name);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  //const pageTitle = "Title";
  //const pageDescription = "Description";

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

async function editPage(newTitle,newDescription,scenario_name) {

  if (typeof newTitle !== "string" || typeof newDescription !== "string") {
    throw new TypeError("Both newTitle and newDescription must be strings");
  }

  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 500,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  //const scenario = new Scenario(page, "007 - Edit Page");
  const scenario = new Scenario(page, scenario_name);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const previousPageTitle= "Title for editPage"
  const previousPageDescription = "Description for editpage"
  //const newTitle = "Title changed";
  //const newDescription = "Description changed";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  // When
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(previousPageTitle, previousPageDescription, false);
  await createPagePage.closePublishFlow();
  await listFilterDeletePagePage.goto();
  const editPagePage = await listFilterDeletePagePage.goToEditPage(previousPageTitle);
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

async function previewPage(pageTitle,pageDescription,scenario_name) {
  // El expected title que se espera debe ser el que se edito o el que se creo sin editar, al igual que la descripcion
  if (typeof pageTitle !== "string" || typeof pageDescription !== "string") {
    throw new TypeError("Both newTitle and newDescription must be strings");
  }

  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 500,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  //const scenario = new Scenario(page, "008 - Preview Page");
  const scenario = new Scenario(page, scenario_name);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  //const expectedTitle = "Title changed";
  //const expectedDescription = "Description changed";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

  // When
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(pageTitle, pageDescription, false);
  await createPagePage.closePublishFlow();
  await listFilterDeletePagePage.goto();
  const editPreviewPagePage = await listFilterDeletePagePage.goToEditPage(
    pageTitle
  );
  await editPreviewPagePage.openSettings();
  const previewPage = await editPreviewPagePage.viewPage();

  // Then
  expect(await previewPage.verifyPreviewTitle(pageTitle)).toBeTruthy();
  expect(
    await previewPage.verifyPreviewDescription(pageDescription)
  ).toBeTruthy();

  await browser.close();
  scenario.successful();
  return;
}

async function filterDraftPages(draftPageTitle,pageDescription,scenario_name) {

  if (typeof draftPageTitle !== "string" || typeof pageDescription !== "string") {
    throw new TypeError("Both draftPageTitle and pageDescription must be strings");
  }

  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 500,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  //const scenario = new Scenario(page, "009 - Filter Draft Pages");
  const scenario = new Scenario(page, scenario_name);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  //const draftPageTitle = "Title draft";
  const expectedAttribute = "Draft";
  //const pageDescription = "Description draft";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(draftPageTitle, pageDescription, true);
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

async function deletePage(pageToDelete,pageDescription,scenario_name) {
  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 500,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  //const scenario = new Scenario(page, "010 - Delete Page");
  const scenario = new Scenario(page, scenario_name);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  //const pageToDelete = "Title changed 1"; 
  //const pageDescription = "My description";

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
    (await listFilterDeletePagePage.verifyTitleChanged(pageToDelete)) === false;
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
