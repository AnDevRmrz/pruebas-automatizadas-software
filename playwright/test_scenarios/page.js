const { SignInPage } = require("../page_objects/sign_in_page");
const { expect } = require("@playwright/test");
const playwright = require("playwright");
const { Scenario } = require("../util/util");

async function createPage_ValidData(input, scenarioDesc, browserType) {
  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";

  const browser = await playwright[browserType].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioDesc, browserType);
  scenario.begin();

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

  // When
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(
    input.title,
    input.description,
    false,
    false,
    false
  );

  // Then
  expect(await createPagePage.verifyTitleInModal(input.title)).toBeTruthy();
  expect(
    await createPagePage.verifyDescriptionInModal(input.description)
  ).toBeTruthy();
  await createPagePage.closePublishFlow();
  await listFilterDeletePagePage.goto();
  expect(
    await listFilterDeletePagePage.verifyTitleInList(input.title)
  ).toBeTruthy();

  await browser.close();
  scenario.successful();
  return;
}

async function createPage_InvalidData(input, scenarioDesc, browserType) {
  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";

  const browser = await playwright[browserType].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioDesc, browserType);
  scenario.begin();

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

  // When
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(
    input.invalidTitle,
    input.description,
    false,
    true,
    false
  );
  expect(await createPagePage.getErrorMessage()).toBeTruthy();
  await browser.close();
  scenario.successful();
  return;
}

async function editPage_validData(input, scenarioDesc, browserType) {
  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";

  const browser = await playwright[browserType].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioDesc, browserType);
  scenario.begin();

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

  // When
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(
    input.create.title,
    input.create.description,
    false,
    false,
    false
  );
  await createPagePage.closePublishFlow();
  await listFilterDeletePagePage.goto();
  const editPagePage = await listFilterDeletePagePage.goToEditPage(
    input.create.title
  );
  await editPagePage.changeTitle(input.edit.title);
  await editPagePage.changeDescription(input.edit.description);
  await editPagePage.clickUpdate();
  await editPagePage.goBack();

  // Then
  expect(
    await listFilterDeletePagePage.verifyTitleChanged(input.edit.title)
  ).toBeTruthy();

  await browser.close();
  scenario.successful();
  return;
}

async function editPage_InvalidData(input, scenarioDesc, browserType) {
  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";

  const browser = await playwright[browserType].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioDesc, browserType);
  scenario.begin();

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

  // When
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(
    input.create.title,
    input.create.description,
    false,
    false,
    false
  );
  await createPagePage.closePublishFlow();
  await listFilterDeletePagePage.goto();
  const editPagePage = await listFilterDeletePagePage.goToEditPage(
    input.create.title
  );
  await editPagePage.changeTitle(input.edit.invalidTitle);
  await editPagePage.changeDescription(input.edit.description);
  await editPagePage.clickUpdate();

  // Then
  expect(await editPagePage.getUpdateErrorMessage()).toBeTruthy();

  await browser.close();
  scenario.successful();
  return;
}

async function previewPage_ValidData(input, scenarioDesc, browserType) {
  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";

  const browser = await playwright[browserType].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioDesc, browserType);
  scenario.begin();

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

  // When
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(
    input.title,
    input.description,
    false,
    false,
    false
  );
  await createPagePage.closePublishFlow();
  await listFilterDeletePagePage.goto();
  const editPreviewPagePage = await listFilterDeletePagePage.goToEditPage(
    input.title
  );
  await editPreviewPagePage.openSettings();
  const previewPage = await editPreviewPagePage.viewPage();

  // Then
  expect(await previewPage.verifyPreviewTitle(input.title)).toBeTruthy();
  expect(
    await previewPage.verifyPreviewDescription(input.description)
  ).toBeTruthy();

  await browser.close();
  scenario.successful();
  return;
}

async function previewPage_ButtonValidData(input, scenarioDesc, browserType) {
  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";

  const browser = await playwright[browserType].launch({
    headless: false,
    slowMo: 50,
  });

  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioDesc, browserType);
  scenario.begin();

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

  // When
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(
    input.title,
    input.description,
    false,
    false,
    false,
    true
  );
  await createPagePage.fillButton(input.buttonName, input.urlButton);
  await createPagePage.publishPage();
  await createPagePage.closePublishFlow();
  await createPagePage.waitForLoad();
  await listFilterDeletePagePage.goto();
  const editPreviewPagePage = await listFilterDeletePagePage.goToEditPage(
    input.title
  );
  await editPreviewPagePage.openSettings();
  const previewPage = await editPreviewPagePage.viewPage();

  // Then
  const titleVerified = await previewPage.verifyPreviewTitle(input.title);
  expect(titleVerified).toBeTruthy();
  const descriptionVerified = await previewPage.verifyPreviewDescription(
    input.description
  );
  expect(descriptionVerified).toBeTruthy();
  const buttonTextVerified = await previewPage.verifyTextButton(
    input.buttonName
  );
  expect(buttonTextVerified).toBeTruthy();

  await browser.close();
  scenario.successful();
  return;
}

async function previewPage_ButtonInvalidData(input, scenarioDesc, browserType) {
  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";

  const browser = await playwright[browserType].launch({
    headless: false,
    slowMo: 50,
  });

  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioDesc, browserType);
  scenario.begin();

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

  // When
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(
    input.title,
    input.description,
    false,
    false,
    false,
    true
  );
  await createPagePage.fillButton(input.buttonName, input.urlButtonInvalid);
  await createPagePage.publishPage();
  await createPagePage.closePublishFlow();
  await createPagePage.waitForLoad();
  await listFilterDeletePagePage.goto();
  const editPreviewPagePage = await listFilterDeletePagePage.goToEditPage(
    input.title
  );
  await editPreviewPagePage.openSettings();
  const previewPage = await editPreviewPagePage.viewPage();

  // Then
  const titleVerified = await previewPage.verifyPreviewTitle(input.title);
  expect(titleVerified).toBeTruthy();
  const descriptionVerified = await previewPage.verifyPreviewDescription(
    input.description
  );
  expect(descriptionVerified).toBeTruthy();
  const buttonTextVerified = await previewPage.verifyTextButton(
    input.buttonName
  );
  expect(buttonTextVerified).toBeTruthy();

  await browser.close();
  scenario.successful();
  return;
}

async function filterDraftPages_ValidData(input, scenarioDesc, browserType) {
  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const expectedAttribute = "Draft";
  const browser = await playwright[browserType].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioDesc, browserType);
  scenario.begin();

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(
    input.title,
    input.description,
    true,
    false,
    false
  );
  await dashboard.goToPages();

  // When
  await listFilterDeletePagePage.filterByDraft();

  // Then
  const pageAttribute = await listFilterDeletePagePage.getPageAttributeByTitle(
    input.title
  );
  expect(pageAttribute).toBe(expectedAttribute);
  await browser.close();
  scenario.successful();
}

async function filterDraftPages_InvalidData(input, scenarioDesc, browserType) {
  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";

  const browser = await playwright[browserType].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioDesc, browserType);
  scenario.begin();

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(
    input.invalidTitle,
    input.description,
    true,
    true,
    false
  );
  await dashboard.goToPages();

  // When

  await listFilterDeletePagePage.filterByDraft();

  const pageAttribute = await listFilterDeletePagePage.getPageAttributeByTitle(
    input.invalidTitle
  );
  expect(pageAttribute).toBeNull();

  await browser.close();
  scenario.successful();
}

async function deletePage_ValidData(input, scenarioDesc, browserType) {
  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";

  const browser = await playwright[browserType].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioDesc, browserType);
  scenario.begin();

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

  // When
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(
    input.title,
    input.description,
    false,
    false,
    false
  );
  await createPagePage.closePublishFlow();
  await listFilterDeletePagePage.goto();
  await listFilterDeletePagePage.rightClickOnPage(input.title);
  await listFilterDeletePagePage.clickDeleteButton();
  await listFilterDeletePagePage.confirmDelete();

  // Then
  await listFilterDeletePagePage.goto();
  const isDeleted =
    (await listFilterDeletePagePage.verifyTitleChanged(input.title)) === false;
  expect(isDeleted).toBeTruthy();

  await browser.close();
  scenario.successful();
}

// async function deleteAllPages_testing_purpose() {
//   const email = "alguien@hotmail.com";
//   const password = "123456#213asdf";
//   scenario_name = "cleaning to begin next data pool";

//   const browser = await playwright["chromium"].launch({
//     headless: false,
//     slowMo: 50,
//   });
//   const context = await browser.newContext();
//   const page = await context.newPage();
//   const scenario = new Scenario(page, scenario_name);
//   scenario.begin();

//   // Given
//   const signInPage = new SignInPage(scenario);
//   await signInPage.goto();
//   const dashboard = await signInPage.signIn(email, password);
//   // When
//   const listFilterDeletePagePage = await dashboard.goToPages();

//   await listFilterDeletePagePage.deleteAllPages();

//   await browser.close();
//   scenario.successful();
// }

module.exports = {
  createPage_ValidData,
  createPage_InvalidData,
  editPage_validData,
  editPage_InvalidData,
  previewPage_ValidData,
  previewPage_ButtonValidData,
  previewPage_ButtonInvalidData,
  filterDraftPages_ValidData,
  filterDraftPages_InvalidData,
  deletePage_ValidData,
  // deleteAllPages_testing_purpose,
};
