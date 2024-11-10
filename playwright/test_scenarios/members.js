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
  const { browser, scenario } = await _before("012 - Create Member");

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

async function editMember() {
  const { browser, scenario } = await _before("013 - Edit Member");

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const oldMemberName = "Member Name Test";
  const oldMemberEmail = "newmember@test.com";
  const newMemberName = "Member New Name Test";
  const newMemberEmail = "membernewemail@test.com";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();

  // When
  const dashboard = await signInPage.signIn(email, password);
  const listFilterMembersPage = await dashboard.goToMembers();
  const createEditDeleteMemberPage = await listFilterMembersPage.goToEditMember(oldMemberName, oldMemberEmail);
  await createEditDeleteMemberPage.saveMember(newMemberName, newMemberEmail);

  // Then
  await dashboard.goToMembers();
  const currentMembers = await listFilterMembersPage.getMembersList();
  expect(
    currentMembers.some(
      (member) =>
        member.name === newMemberName && member.email === newMemberEmail
    )
  ).toBeTruthy();

  return await _after(browser, scenario);
}

async function deleteMember() {
  const { browser, scenario } = await _before("014 - Delete Member");

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const memberName = "Member New Name Test";
  const memberEmail = "membernewemail@test.com";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();

  // When
  const dashboard = await signInPage.signIn(email, password);
  const listFilterMembersPage = await dashboard.goToMembers();
  const createEditDeleteMemberPage = await listFilterMembersPage.goToEditMember(memberName, memberEmail);
  await createEditDeleteMemberPage.deleteMember();

  // Then
  await dashboard.goToMembers();
  const currentMembers = await listFilterMembersPage.getMembersList();
  expect(
    currentMembers.every(
      (member) =>
        member.name !== memberName && member.email !== memberEmail
    )
  ).toBeTruthy();

  return await _after(browser, scenario);
}

async function createMemberMemberWithInvalidEmail() {
  const { browser, scenario } = await _before("012 - Create Member");

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

async function filterMember() {}

module.exports = {
  createMember,
  editMember,
  deleteMember,
  createMemberMemberWithInvalidEmail,
  filterMember,
};
