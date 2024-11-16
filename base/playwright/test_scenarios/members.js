const { SignInPage } = require("../page_objects/sign_in_page");
const { expect } = require("@playwright/test");
const playwright = require("playwright");
const { Scenario } = require("../util/util");

async function _before(scenarioName) {
  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioName);
  scenario.begin();

  return { browser, scenario };
}

async function _after(browser, scenario) {
  await browser.close();
  scenario.successful();
  return;
}

async function createMember() {
  const { browser, scenario } = await _before("011 - Create Member");

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const memberName = "Member Name Test";
  const memberEmail = "newmember@test.com";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();

  // When
  const dashboard = await signInPage.signIn(email, password);
  const listFilterMembersPage = await dashboard.goToMembers();
  const createEditDeleteMemberPage =
    await listFilterMembersPage.goToNewMember();
  await createEditDeleteMemberPage.saveMember(memberName, memberEmail);

  // Then
  await dashboard.goToMembers();
  const currentMembers = await listFilterMembersPage.getMembersList();
  expect(
    currentMembers.some(
      (member) => member.name === memberName && member.email === memberEmail
    )
  ).toBeTruthy();

  return await _after(browser, scenario);
}

module.exports = {
  createMember,
};
