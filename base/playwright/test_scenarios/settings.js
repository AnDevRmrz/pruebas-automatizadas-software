const { SignInPage } = require("../page_objects/sign_in_page");
const { expect } = require("@playwright/test");
const playwright = require("playwright");
const { Scenario } = require("../util/util");

async function settingsEditTitleAndDescription() {

  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, "019 - Settings - Set Title And Description");
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const siteTitle = "New Site Title";
  const siteDescription = "New Site Description";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const settingsPage = await dashboard.goToSettings();
  const generalSettingsPage = await settingsPage.goToGeneralSettings();

  // When
  await generalSettingsPage.editTitleAndDescription(siteTitle, siteDescription);

  // Then
  const currentTitleAndDescription =
    await generalSettingsPage.getCurrentTitleAndDescription();
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
  const newTimezone = 1;
  const expectedTimezone = "Pacific/Honolulu";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const settingsPage = await dashboard.goToSettings();
  const generalSettingsPage = await settingsPage.goToGeneralSettings();

  // When
  await generalSettingsPage.editTimezone(newTimezone);

  // Then
  const currentTimezone = await generalSettingsPage.getCurrentTimezone();
  expect(currentTimezone.includes(expectedTimezone)).toBeTruthy();
  await browser.close();
  scenario.successful();
  return;
}

module.exports = {
    
  settingsEditTitleAndDescription,
  settingsEditTimezone,
};
