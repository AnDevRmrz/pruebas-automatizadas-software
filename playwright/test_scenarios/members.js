const { SignInPage } = require("../page_objects/sign_in_page");
const { expect } = require("@playwright/test");
const playwright = require("playwright");
const { Scenario } = require("../util/util");

async function _before(scenarioName, browserType) {
  const browser = await playwright[browserType].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioName, browserType);
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

async function createMember(input, scenarioDesc, browserType) {
  const { browser, scenario } = await _before(scenarioDesc, browserType);

  // Given
  const dashboard = await _login(scenario);
  const listMembersPage = await dashboard.goToMembers();
  const createEditMemberPage = await listMembersPage.goToNewMember();

  // When
  await createEditMemberPage.saveMember(
    input.name,
    input.email,
    input.label,
    input.note
  );

  // Then
  await listMembersPage.goto();
  const currentMembers = await listMembersPage.getMembersList();
  expect(
    currentMembers.some((m) => m.name === input.name && m.email === input.email)
  ).toBeTruthy();

  return await _after(browser, scenario);
}

async function createMemberWithEmptyEmail(input, scenarioDesc, browserType) {
  const { browser, scenario } = await _before(scenarioDesc, browserType);

  // Given
  const dashboard = await _login(scenario);
  const listMembersPage = await dashboard.goToMembers();
  const createEditMemberPage = await listMembersPage.goToNewMember();

  // When
  await createEditMemberPage.saveMember(
    input.name,
    input.email,
    input.label,
    input.note
  );
  await createEditMemberPage.errorMessageIsDisplayed(
    "#member-email + p",
    "Please enter an email."
  );

  // Then
  await listMembersPage.goto();
  await createEditMemberPage.confirmLeavingPage();
  const currentMembers = await listMembersPage.getMembersList();
  expect(currentMembers.every((m) => m.name !== input.name)).toBeTruthy();

  return await _after(browser, scenario);
}

async function createMemberWithInvalidEmail(input, scenarioDesc, browserType) {
  const { browser, scenario } = await _before(scenarioDesc, browserType);

  // Given
  const dashboard = await _login(scenario);
  const listMembersPage = await dashboard.goToMembers();
  const createEditMemberPage = await listMembersPage.goToNewMember();

  // When
  await createEditMemberPage.saveMember(
    input.name,
    input.email,
    input.label,
    input.note
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
      (m) => m.name !== input.name && m.email !== input.email
    )
  ).toBeTruthy();

  return await _after(browser, scenario);
}

async function createMemberWithTooLongNote(input, scenarioDesc, browserType) {
  const { browser, scenario } = await _before(scenarioDesc, browserType);

  // Given
  const dashboard = await _login(scenario);
  const listMembersPage = await dashboard.goToMembers();
  const createEditMemberPage = await listMembersPage.goToNewMember();

  // When
  await createEditMemberPage.saveMember(
    input.name,
    input.email,
    input.label,
    input.note
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
      (m) => m.name !== input.name && m.email !== input.email
    )
  ).toBeTruthy();

  return await _after(browser, scenario);
}

async function createMemberWithTooLongName(input, scenarioDesc, browserType) {
  const { browser, scenario } = await _before(scenarioDesc, browserType);

  // Given
  const dashboard = await _login(scenario);
  const listMembersPage = await dashboard.goToMembers();
  const createEditMemberPage = await listMembersPage.goToNewMember();

  // When
  await createEditMemberPage.saveMember(
    input.name,
    input.email,
    input.label,
    input.note
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
      (m) => m.name !== input.name && m.email !== input.email
    )
  ).toBeTruthy();

  return await _after(browser, scenario);
}

async function editMember(input, scenarioDesc, browserType) {
  const { browser, scenario } = await _before(scenarioDesc, browserType);

  // Given
  const dashboard = await _login(scenario);
  const listMembersPage = await dashboard.goToMembers();
  const createEditMemberPage = await listMembersPage.goToNewMember();

  // When
  await createEditMemberPage.saveMember(
    input.create.name,
    input.create.email,
    input.create.label,
    input.create.note
  );
  await listMembersPage.goto();
  await listMembersPage.editMember(input.create.name, input.create.email);

  // Then
  await createEditMemberPage.saveMember(
    input.edit.name,
    input.edit.email,
    input.edit.label,
    input.edit.note
  );
  await listMembersPage.goto();
  const currentMembers = await listMembersPage.getMembersList();
  expect(
    currentMembers.some(
      (m) => m.name === input.edit.name && m.email === input.edit.email
    )
  ).toBeTruthy();

  return await _after(browser, scenario);
}

async function editMemberWithEmptyEmail(input, scenarioDesc, browserType) {
  const { browser, scenario } = await _before(scenarioDesc, browserType);

  // Given
  const dashboard = await _login(scenario);
  const listMembersPage = await dashboard.goToMembers();
  const createEditMemberPage = await listMembersPage.goToNewMember();

  // When
  await createEditMemberPage.saveMember(
    input.create.name,
    input.create.email,
    input.create.label,
    input.create.note
  );
  await listMembersPage.goto();
  await listMembersPage.editMember(input.create.name, input.create.email);
  await createEditMemberPage.saveMember(
    input.edit.name,
    input.edit.email,
    input.edit.label,
    input.edit.note
  );
  await createEditMemberPage.errorMessageIsDisplayed(
    "#member-email + p",
    "Please enter an email."
  );

  // Then
  await listMembersPage.goto();
  await createEditMemberPage.confirmLeavingPage();
  const currentMembers = await listMembersPage.getMembersList();
  expect(currentMembers.some((m) => m.name !== input.edit.name)).toBeTruthy();

  return await _after(browser, scenario);
}

async function editMemberWithInvalidEmail(input, scenarioDesc, browserType) {
  const { browser, scenario } = await _before(scenarioDesc, browserType);

  // Given
  const dashboard = await _login(scenario);
  const listMembersPage = await dashboard.goToMembers();
  const createEditMemberPage = await listMembersPage.goToNewMember();

  // When
  await createEditMemberPage.saveMember(
    input.create.name,
    input.create.email,
    input.create.label,
    input.create.note
  );
  await listMembersPage.goto();
  await listMembersPage.editMember(input.create.name, input.create.email);
  await createEditMemberPage.saveMember(
    input.edit.name,
    input.edit.email,
    input.edit.label,
    input.edit.note
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
      (m) => m.name !== input.edit.name && m.email !== input.edit.email
    )
  ).toBeTruthy();

  return await _after(browser, scenario);
}

async function editMemberWithTooLongNote(input, scenarioDesc, browserType) {
  const { browser, scenario } = await _before(scenarioDesc, browserType);

  // Given
  const dashboard = await _login(scenario);
  const listMembersPage = await dashboard.goToMembers();
  const createEditMemberPage = await listMembersPage.goToNewMember();

  // When
  await createEditMemberPage.saveMember(
    input.create.name,
    input.create.email,
    input.create.label,
    input.create.note
  );
  await listMembersPage.goto();
  await listMembersPage.editMember(input.create.name, input.create.email);
  await createEditMemberPage.saveMember(
    input.edit.name,
    input.edit.email,
    input.edit.label,
    input.edit.note
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
      (m) => m.name !== input.edit.name && m.email !== input.edit.email
    )
  ).toBeTruthy();

  return await _after(browser, scenario);
}

async function editMemberWithTooLongName(input, scenarioDesc, browserType) {
  const { browser, scenario } = await _before(scenarioDesc, browserType);

  // Given
  const dashboard = await _login(scenario);
  const listMembersPage = await dashboard.goToMembers();
  const createEditMemberPage = await listMembersPage.goToNewMember();

  // When
  await createEditMemberPage.saveMember(
    input.create.name,
    input.create.email,
    input.create.label,
    input.create.note
  );
  await listMembersPage.goto();
  await listMembersPage.editMember(input.create.name, input.create.email);
  await createEditMemberPage.saveMember(
    input.edit.name,
    input.edit.email,
    input.edit.label,
    input.edit.note
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
      (m) => m.name !== input.edit.name && m.email !== input.edit.email
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
