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

async function editMember() {
  const { browser, scenario } = await _before("012 - Edit Member");

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
  const { browser, scenario } = await _before("013 - Delete Member");

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
  const { browser, scenario } = await _before("014 - Create Member with Invalid Member");

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const memberName = "Member Name Test";
  const invalidMemberEmail = "invalidemail@test-com";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();

  // When
  const dashboard = await signInPage.signIn(email, password);
  const listFilterMembersPage = await dashboard.goToMembers();
  const createEditDeleteMemberPage =
    await listFilterMembersPage.goToNewMember();
  await createEditDeleteMemberPage.saveMember(memberName, invalidMemberEmail);

  // Then
  await dashboard.goToMembers();
  await createEditDeleteMemberPage.confirmLeavingPage();
  const currentMembers = await listFilterMembersPage.getMembersList();
  expect(
    currentMembers.every(
      (member) => member.name !== memberName && member.email !== invalidMemberEmail
    )
  ).toBeTruthy();

  return await _after(browser, scenario);
}

async function filterMember() {
  const { browser, scenario } = await _before("015 - Filter Member");

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const member1Name = "Member_test_1";
  const member1Email = "newmember@test.com";
  const member2Name = "Member_test_2";
  const member2Email = "newmember2@test.com";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();

  // When
  const dashboard = await signInPage.signIn(email, password);
  const listFilterMembersPage = await dashboard.goToMembers();
  let createEditDeleteMemberPage =
  await listFilterMembersPage.goToNewMember();
  await createEditDeleteMemberPage.saveMember(member1Name, member1Email);

  await dashboard.goToMembers();

  createEditDeleteMemberPage =
  await listFilterMembersPage.goToNewMember();
  await createEditDeleteMemberPage.saveMember(member2Name, member2Email);

  await dashboard.goToMembers();

  await listFilterMembersPage.filterMemberByName(member1Name);

  // Then
  const currentMembers = await listFilterMembersPage.getMembersList();
  expect(
    currentMembers.some(
      (member) => member.name === member1Name && member.email === member1Email
    )
  ).toBeTruthy();

  expect(
    currentMembers.every(
      (member) => member.name !== member2Name && member.email !== member2Email
    )
  ).toBeTruthy();

  return await _after(browser, scenario);
}

module.exports = {
  createMember,
  editMember,
  deleteMember,
  createMemberMemberWithInvalidEmail,
  filterMember,
};
