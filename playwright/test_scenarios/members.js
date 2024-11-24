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

async function _login(scenario) {
  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  return await signInPage.signIn(email, password);
}

async function createMember(member, scenarioDesc) {
  const { browser, scenario } = await _before(scenarioDesc);

  // Given
  const dashboard = await _login(scenario);
  const listMembersPage = await dashboard.goToMembers();
  const createEditMemberPage = await listMembersPage.goToNewMember();

  // When
  await createEditMemberPage.saveMember(
    member.name,
    member.email,
    member.label,
    member.note
  );

  // Then
  await listMembersPage.goto();
  const currentMembers = await listMembersPage.getMembersList();
  expect(
    currentMembers.some(
      (m) => m.name === member.name && m.email === member.email
    )
  ).toBeTruthy();

  return await _after(browser, scenario);
}

async function createMemberWithEmptyEmail(member, scenarioDesc) {
  const { browser, scenario } = await _before(scenarioDesc);

  // Given
  const dashboard = await _login(scenario);
  const listMembersPage = await dashboard.goToMembers();
  const createEditMemberPage = await listMembersPage.goToNewMember();

  // When
  await createEditMemberPage.saveMember(
    member.name,
    member.email,
    member.label,
    member.note
  );
  await createEditMemberPage.errorMessageIsDisplayed(
    "#member-email + p",
    "Please enter an email."
  );

  // Then
  await listMembersPage.goto();
  await createEditMemberPage.confirmLeavingPage();
  const currentMembers = await listMembersPage.getMembersList();
  expect(currentMembers.every((m) => m.name !== member.name)).toBeTruthy();

  return await _after(browser, scenario);
}

async function createMemberWithInvalidEmail(member, scenarioDesc) {
  const { browser, scenario } = await _before(scenarioDesc);

  // Given
  const dashboard = await _login(scenario);
  const listMembersPage = await dashboard.goToMembers();
  const createEditMemberPage = await listMembersPage.goToNewMember();

  // When
  await createEditMemberPage.saveMember(
    member.name,
    member.email,
    member.label,
    member.note
  );
  await createEditMemberPage.errorMessageIsDisplayed(
    "#member-email + p",
    "Invalid Email."
  );

  // Then
  await listMembersPage.goto();
  await createEditMemberPage.confirmLeavingPage();
  const currentMembers = await listMembersPage.getMembersList();
  expect(
    currentMembers.every(
      (m) => m.name !== member.name && m.email !== member.email
    )
  ).toBeTruthy();

  return await _after(browser, scenario);
}

async function createMemberWithTooLongNote(member, scenarioDesc) {
  const { browser, scenario } = await _before(scenarioDesc);

  // Given
  const dashboard = await _login(scenario);
  const listMembersPage = await dashboard.goToMembers();
  const createEditMemberPage = await listMembersPage.goToNewMember();

  // When
  await createEditMemberPage.saveMember(
    member.name,
    member.email,
    member.label,
    member.note
  );
  await createEditMemberPage.errorMessageIsDisplayed(
    "#member-note + p",
    "Note is too long."
  );

  // Then
  await listMembersPage.goto();
  await createEditMemberPage.confirmLeavingPage();
  const currentMembers = await listMembersPage.getMembersList();
  expect(
    currentMembers.every(
      (m) => m.name !== member.name && m.email !== member.email
    )
  ).toBeTruthy();

  return await _after(browser, scenario);
}

async function createMemberWithTooLongName(member, scenarioDesc) {
  const { browser, scenario } = await _before(scenarioDesc);

  // Given
  const dashboard = await _login(scenario);
  const listMembersPage = await dashboard.goToMembers();
  const createEditMemberPage = await listMembersPage.goToNewMember();

  // When
  await createEditMemberPage.saveMember(
    member.name,
    member.email,
    member.label,
    member.note
  );
  await createEditMemberPage.errorMessageIsDisplayed(
    "#member-name + p",
    "Name cannot be longer than 191 characters."
  );

  // Then
  await listMembersPage.goto();
  await createEditMemberPage.confirmLeavingPage();
  const currentMembers = await listMembersPage.getMembersList();
  expect(
    currentMembers.every(
      (m) => m.name !== member.name && m.email !== member.email
    )
  ).toBeTruthy();

  return await _after(browser, scenario);
}

async function editMember(memberToCreate, memberToEdit, scenarioDesc) {
  const { browser, scenario } = await _before(scenarioDesc);

  // Given
  const dashboard = await _login(scenario);
  const listMembersPage = await dashboard.goToMembers();
  const createEditMemberPage = await listMembersPage.goToNewMember();

  // When
  await createEditMemberPage.saveMember(
    memberToCreate.name,
    memberToCreate.email,
    memberToCreate.label,
    memberToCreate.note
  );
  await listMembersPage.goto();
  await listMembersPage.editMember(memberToCreate.name, memberToCreate.email);

  // Then
  await createEditMemberPage.saveMember(
    memberToEdit.name,
    memberToEdit.email,
    memberToEdit.label,
    memberToEdit.note
  );
  await listMembersPage.goto();
  const currentMembers = await listMembersPage.getMembersList();
  expect(
    currentMembers.some(
      (m) => m.name === memberToEdit.name && m.email === memberToEdit.email
    )
  ).toBeTruthy();

  return await _after(browser, scenario);
}

async function editMemberWithEmptyEmail(
  memberToCreate,
  memberToEdit,
  scenarioDesc
) {
  const { browser, scenario } = await _before(scenarioDesc);

  // Given
  const dashboard = await _login(scenario);
  const listMembersPage = await dashboard.goToMembers();
  const createEditMemberPage = await listMembersPage.goToNewMember();

  // When
  await createEditMemberPage.saveMember(
    memberToCreate.name,
    memberToCreate.email,
    memberToCreate.label,
    memberToCreate.note
  );
  await listMembersPage.goto();
  await listMembersPage.editMember(memberToCreate.name, memberToCreate.email);
  await createEditMemberPage.saveMember(
    memberToEdit.name,
    memberToEdit.email,
    memberToEdit.label,
    memberToEdit.note
  );
  await createEditMemberPage.errorMessageIsDisplayed(
    "#member-email + p",
    "Please enter an email."
  );

  // Then
  await listMembersPage.goto();
  await createEditMemberPage.confirmLeavingPage();
  const currentMembers = await listMembersPage.getMembersList();
  expect(currentMembers.some((m) => m.name !== memberToEdit.name)).toBeTruthy();

  return await _after(browser, scenario);
}

async function editMemberWithInvalidEmail(
  memberToCreate,
  memberToEdit,
  scenarioDesc
) {
  const { browser, scenario } = await _before(scenarioDesc);

  // Given
  const dashboard = await _login(scenario);
  const listMembersPage = await dashboard.goToMembers();
  const createEditMemberPage = await listMembersPage.goToNewMember();

  // When
  await createEditMemberPage.saveMember(
    memberToCreate.name,
    memberToCreate.email,
    memberToCreate.label,
    memberToCreate.note
  );
  await listMembersPage.goto();
  await listMembersPage.editMember(memberToCreate.name, memberToCreate.email);
  await createEditMemberPage.saveMember(
    memberToEdit.name,
    memberToEdit.email,
    memberToEdit.label,
    memberToEdit.note
  );
  await createEditMemberPage.errorMessageIsDisplayed(
    "#member-email + p",
    "Invalid Email."
  );

  // Then
  await listMembersPage.goto();
  await createEditMemberPage.confirmLeavingPage();
  const currentMembers = await listMembersPage.getMembersList();
  expect(
    currentMembers.some(
      (m) => m.name !== memberToEdit.name && m.email !== memberToEdit.email
    )
  ).toBeTruthy();

  return await _after(browser, scenario);
}

async function editMemberWithTooLongNote(
  memberToCreate,
  memberToEdit,
  scenarioDesc
) {
  const { browser, scenario } = await _before(scenarioDesc);

  // Given
  const dashboard = await _login(scenario);
  const listMembersPage = await dashboard.goToMembers();
  const createEditMemberPage = await listMembersPage.goToNewMember();

  // When
  await createEditMemberPage.saveMember(
    memberToCreate.name,
    memberToCreate.email,
    memberToCreate.label,
    memberToCreate.note
  );
  await listMembersPage.goto();
  await listMembersPage.editMember(memberToCreate.name, memberToCreate.email);
  await createEditMemberPage.saveMember(
    memberToEdit.name,
    memberToEdit.email,
    memberToEdit.label,
    memberToEdit.note
  );
  await createEditMemberPage.errorMessageIsDisplayed(
    "#member-note + p",
    "Note is too long."
  );

  // Then
  await listMembersPage.goto();
  await createEditMemberPage.confirmLeavingPage();
  const currentMembers = await listMembersPage.getMembersList();
  expect(
    currentMembers.some(
      (m) => m.name !== memberToEdit.name && m.email !== memberToEdit.email
    )
  ).toBeTruthy();

  return await _after(browser, scenario);
}

async function editMemberWithTooLongName(
  memberToCreate,
  memberToEdit,
  scenarioDesc
) {
  const { browser, scenario } = await _before(scenarioDesc);

  // Given
  const dashboard = await _login(scenario);
  const listMembersPage = await dashboard.goToMembers();
  const createEditMemberPage = await listMembersPage.goToNewMember();

  // When
  await createEditMemberPage.saveMember(
    memberToCreate.name,
    memberToCreate.email,
    memberToCreate.label,
    memberToCreate.note
  );
  await listMembersPage.goto();
  await listMembersPage.editMember(memberToCreate.name, memberToCreate.email);
  await createEditMemberPage.saveMember(
    memberToEdit.name,
    memberToEdit.email,
    memberToEdit.label,
    memberToEdit.note
  );
  await createEditMemberPage.errorMessageIsDisplayed(
    "#member-name + p",
    "Name cannot be longer than 191 characters."
  );

  // Then
  await listMembersPage.goto();
  await createEditMemberPage.confirmLeavingPage();
  const currentMembers = await listMembersPage.getMembersList();
  expect(
    currentMembers.some(
      (m) => m.name !== memberToEdit.name && m.email !== memberToEdit.email
    )
  ).toBeTruthy();

  return await _after(browser, scenario);
}

module.exports = {
  createMember,
  createMemberWithInvalidEmail,
  createMemberWithEmptyEmail,
  createMemberWithTooLongNote,
  createMemberWithTooLongName,
  editMember,
  editMemberWithEmptyEmail,
  editMemberWithInvalidEmail,
  editMemberWithTooLongNote,
  editMemberWithTooLongName,
};
