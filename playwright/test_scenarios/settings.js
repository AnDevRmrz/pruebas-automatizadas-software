const { SignInPage } = require("../page_objects/sign_in_page");
const { expect } = require("@playwright/test");
const playwright = require("playwright");

async function settingsEditTitleAndDescription() {

  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const siteTitle = "New Site Title";
  const siteDescription = "New Site Description";

  // Given
  const signInPage = new SignInPage(page);
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
  return;
}

async function settingsEditTimezone() {
  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const newTimezone = "Hawaii";
  const expectedTimezone = "(GMT -10:00) Hawaii";

  // Given
  const signInPage = new SignInPage(page);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const settingsPage = await dashboard.goToSettings();

  // When
  await settingsPage.editTimezone(newTimezone);

  // Then
  const currentTimezone = await settingsPage.getCurrentTimezone();
  expect(currentTimezone.includes(expectedTimezone)).toBeTruthy();
  await browser.close();
  return;
}

module.exports = {
    
  settingsEditTitleAndDescription,
  settingsEditTimezone,
};
