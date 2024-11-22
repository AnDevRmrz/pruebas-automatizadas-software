const { SignInPage } = require("../page_objects/sign_in_page");
const { expect } = require("@playwright/test");
const playwright = require("playwright");
const { Scenario } = require("../util/util");
const {
  createMember_Valid_A_Priori,
  createMember_Valid_PseudoRandom,
  createMember_Valid_Random,
  createMember_InvalidEmail_A_Priori,
  createMember_InvalidEmail_PseudoRandom,
  createMember_InvalidEmail_Random,
} = require("../input_data/members");
const dataGenerationTecniques = [
  "A-priori Data Pool",
  "Pseudo Random Data Pool",
  "Random Data",
];

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

async function createMember(member, testId, dataGenerationTecnique) {
  const { browser, scenario } = await _before(
    `${testId
      .toString()
      .padStart(3, "0")} - Create Member With ${dataGenerationTecnique}`
  );

  // Given
  const dashboard = await _login(scenario);
  const listFilterMembersPage = await dashboard.goToMembers();
  const createEditDeleteMemberPage =
    await listFilterMembersPage.goToNewMember();

  // When
  await createEditDeleteMemberPage.saveMember(
    member.name,
    member.email,
    member.label,
    member.note
  );

  // Then
  await listFilterMembersPage.goto();
  const currentMembers = await listFilterMembersPage.getMembersList();
  expect(
    currentMembers.some(
      (m) => m.name === member.name && m.email === member.email
    )
  ).toBeTruthy();

  return await _after(browser, scenario);
}

async function createMemberWithEmptyEmail(
  member,
  testId,
  dataGenerationTecnique
) {
  const { browser, scenario } = await _before("011 - Create Member");

  // Given
  const dashboard = await _login(scenario);
  const listFilterMembersPage = await dashboard.goToMembers();
  const createEditDeleteMemberPage =
    await listFilterMembersPage.goToNewMember();

  // When
  await createEditDeleteMemberPage.saveMember(
    memberName,
    memberEmail,
    memberLabel,
    memberNote
  );

  // Then
  await listFilterMembersPage.goto();
  const currentMembers = await listFilterMembersPage.getMembersList();
  expect(
    currentMembers.some(
      (member) => member.name === memberName && member.email === memberEmail
    )
  ).toBeTruthy();

  return await _after(browser, scenario);
}

async function createMemberWithInvalidEmail(
  member,
  testId,
  dataGenerationTecnique
) {
  const { browser, scenario } = await _before(
    `${testId
      .toString()
      .padStart(
        3,
        "0"
      )} - Create Member With Invalid Email With ${dataGenerationTecnique}`
  );

  // Given
  const dashboard = await _login(scenario);
  const listFilterMembersPage = await dashboard.goToMembers();
  const createEditDeleteMemberPage =
    await listFilterMembersPage.goToNewMember();

  // When
  await createEditDeleteMemberPage.saveMember(
    member.name,
    member.email,
    member.label,
    member.note
  );

  // Then
  await listFilterMembersPage.goto();
  await createEditDeleteMemberPage.confirmLeavingPage();
  const currentMembers = await listFilterMembersPage.getMembersList();
  expect(
    currentMembers.every(
      (m) => m.name !== member.name && m.email !== member.email
    )
  ).toBeTruthy();

  return await _after(browser, scenario);
}

async function createMemberWithTooLongNote(
  member,
  testId,
  dataGenerationTecnique
) {
  const { browser, scenario } = await _before("011 - Create Member");

  // Given
  const dashboard = await _login(scenario);
  const listFilterMembersPage = await dashboard.goToMembers();
  const createEditDeleteMemberPage =
    await listFilterMembersPage.goToNewMember();

  // When
  await createEditDeleteMemberPage.saveMember(
    memberName,
    memberEmail,
    memberLabel,
    memberNote
  );

  // Then
  await listFilterMembersPage.goto();
  const currentMembers = await listFilterMembersPage.getMembersList();
  expect(
    currentMembers.some(
      (member) => member.name === memberName && member.email === memberEmail
    )
  ).toBeTruthy();

  return await _after(browser, scenario);
}

async function createMemberWithTooLongName(
  member,
  testId,
  dataGenerationTecnique
) {
  const { browser, scenario } = await _before("011 - Create Member");

  // Given
  const dashboard = await _login(scenario);
  const listFilterMembersPage = await dashboard.goToMembers();
  const createEditDeleteMemberPage =
    await listFilterMembersPage.goToNewMember();

  // When
  await createEditDeleteMemberPage.saveMember(
    memberName,
    memberEmail,
    memberLabel,
    memberNote
  );

  // Then
  await listFilterMembersPage.goto();
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
  const createEditDeleteMemberPage = await listFilterMembersPage.goToEditMember(
    oldMemberName,
    oldMemberEmail
  );
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
  const createEditDeleteMemberPage = await listFilterMembersPage.goToEditMember(
    memberName,
    memberEmail
  );
  await createEditDeleteMemberPage.deleteMember();

  // Then
  const currentMembers = await listFilterMembersPage.getMembersList();
  expect(
    currentMembers.every(
      (member) => member.name !== memberName && member.email !== memberEmail
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
  let createEditDeleteMemberPage = await listFilterMembersPage.goToNewMember();
  await createEditDeleteMemberPage.saveMember(member1Name, member1Email);

  await dashboard.goToMembers();

  createEditDeleteMemberPage = await listFilterMembersPage.goToNewMember();
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

async function executeMembersTests() {
  let i = 91;

  // for (let [index, value] of dataGenerationTecniques.entries()) {
  //   let member = {};
  //   if (index == 0) {
  //     member = createMember_Valid_A_Priori();
  //   } else if (index == 1) {
  //     member = createMember_Valid_PseudoRandom();
  //   } else {
  //     member = createMember_Valid_Random();
  //   }
  //   await createMember(member, i++, value);
  // }

  for (let [index, value] of dataGenerationTecniques.entries()) {
    let member = {};
    if (index == 0) {
      member = createMember_InvalidEmail_A_Priori();
    } else if (index == 1) {
      member = createMember_InvalidEmail_PseudoRandom();
    } else {
      member = createMember_InvalidEmail_Random();
    }
    await createMemberWithInvalidEmail(member, i++, value);
  }
}

module.exports = {
  executeMembersTests,
};
