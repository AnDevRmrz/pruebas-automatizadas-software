const { SignInPage } = require("../page_objects/sign_in_page");
const { expect } = require("@playwright/test");
const playwright = require("playwright");
const { Scenario } = require("../util/util");
const { faker } = require('@faker-js/faker');

async function createPage_ValidData(pageTitle,pageDescription,scenario_name) {

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";


  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 500,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenario_name);
  scenario.begin();


  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

  // When
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(pageTitle, pageDescription, false, false,false);

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


async function createPage_InvalidData(pageTitle,pageDescription,scenario_name) {

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";


  
  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 500,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenario_name);
  scenario.begin();


  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

  // When
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(pageTitle, pageDescription, false,true,false);
  expect(await createPagePage.getErrorMessage()).toBeTruthy()
  await browser.close();
  scenario.successful();
  return;
}

async function editPage_validData(previousPageTitle,previousPageDescription,newTitle,newDescription,scenario_name) {

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";



  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 500,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenario_name);
  scenario.begin();


  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

  // When
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(previousPageTitle, previousPageDescription, false, false,false);
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


async function editPage_InvalidData(previousPageTitle, previousPageDescription, newTitle, newDescription,scenario_name) {

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";



  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 500,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenario_name);
  scenario.begin();


  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

  // When
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(previousPageTitle, previousPageDescription, false, false,false);
  await createPagePage.closePublishFlow();
  await listFilterDeletePagePage.goto();
  const editPagePage = await listFilterDeletePagePage.goToEditPage(previousPageTitle);
  await editPagePage.changeTitle(newTitle);
  await editPagePage.changeDescription(newDescription);
  await editPagePage.clickUpdate();
  
  // Then
  expect(await editPagePage.getUpdateErrorMessage()).toBeTruthy();

  await browser.close();
  scenario.successful();
  return;
}


async function previewPage_ValidData(pageTitle, pageDescription, scenario_name) {

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";




  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 500,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenario_name);
  scenario.begin();

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

  // When
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(pageTitle, pageDescription, false, false,false);
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



async function previewPage_ButtonValidData(pageTitle, pageDescription, buttonName, buttonUrl, scenario_name) {

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";


  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 500,
  });

  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenario_name);
  scenario.begin();

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

  // When
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(pageTitle, pageDescription, false, false,false, true);
  await createPagePage.fillButton(buttonName,buttonUrl)
  await createPagePage.publishPage()
  await createPagePage.closePublishFlow();
  await createPagePage.waitForLoad();
  await listFilterDeletePagePage.goto();
  const editPreviewPagePage = await listFilterDeletePagePage.goToEditPage(pageTitle);
  await editPreviewPagePage.openSettings();
  const previewPage = await editPreviewPagePage.viewPage();

  // Then
  const titleVerified = await previewPage.verifyPreviewTitle(pageTitle);
  expect(titleVerified).toBeTruthy();
  const descriptionVerified = await previewPage.verifyPreviewDescription(pageDescription);
  expect(descriptionVerified).toBeTruthy();
  const buttonTextVerified = await previewPage.verifyTextButton(buttonName);
  expect(buttonTextVerified).toBeTruthy();

  await browser.close();
  scenario.successful();
  return;
}



async function previewPage_ButtonInvalidData(pageTitle,pageDescription,buttonName,buttonUrl,scenario_name) {

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";


  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 500,
  });

  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenario_name);
  scenario.begin();

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

  // When
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(pageTitle, pageDescription, false, false,false, true);
  await createPagePage.fillButton(buttonName,buttonUrl)
  await createPagePage.publishPage()
  await createPagePage.closePublishFlow();
  await createPagePage.waitForLoad();
  await listFilterDeletePagePage.goto();
  const editPreviewPagePage = await listFilterDeletePagePage.goToEditPage(pageTitle);
  await editPreviewPagePage.openSettings();
  const previewPage = await editPreviewPagePage.viewPage();

  // Then
  const titleVerified = await previewPage.verifyPreviewTitle(pageTitle);
  expect(titleVerified).toBeTruthy();
  const descriptionVerified = await previewPage.verifyPreviewDescription(pageDescription);
  expect(descriptionVerified).toBeTruthy();
  const buttonTextVerified = await previewPage.verifyTextButton(buttonName);
  expect(buttonTextVerified).toBeTruthy();

  await browser.close();
  scenario.successful();
  return;
}




async function filterDraftPages_ValidData(draftPageTitle,pageDescription,scenario_name) {


  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const expectedAttribute = "Draft";




  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 500,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenario_name);
  scenario.begin();

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(draftPageTitle, pageDescription, true, false,false);
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

async function filterDraftPages_InvalidData(draftPageTitle,pageDescription,scenario_name)  {


  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const expectedAttribute = "Draft";





  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 500,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenario_name);
  scenario.begin();

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(draftPageTitle, pageDescription, true, true,false);
  await dashboard.goToPages();

  // When
  
  await listFilterDeletePagePage.filterByDraft();
  
  const pageAttribute = await listFilterDeletePagePage.getPageAttributeByTitle(draftPageTitle);
  expect(pageAttribute).toBeNull();

  await browser.close();
  scenario.successful();
}


async function deletePage_ValidData(pageToDelete,pageDescription,scenario_name) {

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";



  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 500,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenario_name);
  scenario.begin();

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

  // When
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(pageToDelete, pageDescription, false, false,false);
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

/*
async function deletePage_InvalidData() {

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const pageToDelete = faker.lorem.words(50).slice(0, 245) + faker.lorem.words(5);
  const pageDescription = faker.lorem.paragraph(10); 
  const scenario_name = "039 - Delete Page Invalid Data";


  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 500,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenario_name);
  scenario.begin();

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);

  // When
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(pageToDelete, pageDescription, true, true,false);
  try {
    await listFilterDeletePagePage.rightClickOnPage(pageToDelete);
  }
  catch (error) {
    expect(error.message).toContain("Failed to right click on page");
  }
  await browser.close();
  scenario.successful();
}*/

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
  deletePage_ValidData
};
