const { SignInPage } = require("../page_objects/sign_in_page");
const { expect } = require("@playwright/test");
const playwright = require("playwright");
const { Scenario } = require("../util/util");

async function settingsEditTitleAndDescription(input, scenarioDesc) {

  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioDesc);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const siteTitle = input.generalTitle;
  const siteDescription = input.generalDescription;

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const settingsPage = await dashboard.goToSettings();

  // When
  await settingsPage.editTitleAndDescription(siteTitle, siteDescription);

  // Then
  const currentTitleAndDescription =
    await settingsPage.getCurrentTitleAndDescription();
  expect(currentTitleAndDescription.siteTitle === siteTitle).toBeTruthy();
  expect(
    currentTitleAndDescription.siteDescription === siteDescription
  ).toBeTruthy();
  await browser.close();
  scenario.successful();
  return;
}

async function settingsEditTimezone() {
  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, "020 - Settings - Set Site Timezone");
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const newTimezone = "Hawaii";
  const expectedTimezone = "(GMT -10:00) Hawaii";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const settingsPage = await dashboard.goToSettings();

  // When
  await settingsPage.editTimezone(newTimezone);

  // Then
  const currentTimezone = await settingsPage.getCurrentTimezone();
  expect(currentTimezone.includes(expectedTimezone)).toBeTruthy();
  await browser.close();
  scenario.successful();
  return;
}

async function settingsEditGeneralLanguage(input, scenarioDesc) {

  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioDesc);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const generalLanguage = input.generalLanguage;

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const settingsPage = await dashboard.goToSettings();

  // When
  await settingsPage.editGeneralLanguage(generalLanguage);

  // Then
  const currentGeneralLanguage =
    await settingsPage.getCurrentGeneralLanguage()
  expect(generalLanguage === currentGeneralLanguage).toBeTruthy();  
  await browser.close();
  scenario.successful();
  return;
}

async function settingsEditMetaData(input, scenarioDesc) {

  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioDesc);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const metaTitle = input.metaTitle;
  const metaDescription = input.metaDescription;

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const settingsPage = await dashboard.goToSettings();

  // When
  await settingsPage.editMetaData(metaTitle, metaDescription);

  // Then
  const currentMetaData = await settingsPage.getCurrentMetaData()
  expect(metaTitle === currentMetaData.metaTitle).toBeTruthy();  
  expect(metaDescription === currentMetaData.metaDescription).toBeTruthy();  
  await browser.close();
  scenario.successful();
  return;
}

async function settingsEditXCardData(input, scenarioDesc) {

  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioDesc);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const xCardTitle = input.xCardTitle;
  const xCardDescription = input.xCardDescription;

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const settingsPage = await dashboard.goToSettings();

  // When
  await settingsPage.editXCardData(xCardTitle, xCardDescription);

  // Then
  const currentXCardData = await settingsPage.getCurrentXCardData()
  expect(xCardTitle === currentXCardData.xCardTitle).toBeTruthy();  
  expect(xCardDescription === currentXCardData.xCardDescription).toBeTruthy();  
  await browser.close();
  scenario.successful();
  return;
}

async function settingsEditFacebookData(input, scenarioDesc) {

  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioDesc);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const facebookTitle = input.facebookTitle;
  const facebookDescription = input.facebookDescription;

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const settingsPage = await dashboard.goToSettings();

  // When
  await settingsPage.editFacebookData(facebookTitle, facebookDescription);

  // Then
  const currentFacebookData = await settingsPage.getCurrentFacebookData()
  expect(facebookTitle === currentFacebookData.facebookTitle).toBeTruthy();  
  expect(facebookDescription === currentFacebookData.facebookDescription).toBeTruthy();  
  await browser.close();
  scenario.successful();
  return;
}

module.exports = {
    
  settingsEditTitleAndDescription,
  settingsEditTimezone,
  settingsEditGeneralLanguage,
  settingsEditMetaData,
  settingsEditXCardData,
  settingsEditFacebookData
};
