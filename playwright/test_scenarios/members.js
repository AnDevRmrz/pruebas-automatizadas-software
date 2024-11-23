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
  createMember_TooLongNote_A_Priori,
  createMember_TooLongNote_PseudoRandom,
  createMember_TooLongNote_Random,
  createMember_TooLongName_A_Priori,
  createMember_TooLongName_PseudoRandom,
  createMember_TooLongName_Random,
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
      .padStart(3, "0")} - Create Member - ${dataGenerationTecnique}`
  );

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

async function createMemberWithEmptyEmail(
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
      )} - Create Member With Empty Email - ${dataGenerationTecnique}`
  );

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
      )} - Create Member With Invalid Email - ${dataGenerationTecnique}`
  );

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

async function createMemberWithTooLongNote(
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
      )} - Create Member With A Note Longer Than 500 Characters - ${dataGenerationTecnique}`
  );

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

async function createMemberWithTooLongName(
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
      )} - Create Member With A Name Longer Than 191 Characters - ${dataGenerationTecnique}`
  );

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

async function editMember(
  memberToCreate,
  memberToEdit,
  testId,
  dataGenerationTecnique
) {
  const { browser, scenario } = await _before(
    `${testId
      .toString()
      .padStart(3, "0")} - Edit Member - ${dataGenerationTecnique}`
  );

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
  testId,
  dataGenerationTecnique
) {
  const { browser, scenario } = await _before(
    `${testId
      .toString()
      .padStart(3, "0")} - Edit Member With Empty Email - ${dataGenerationTecnique}`
  );

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
  testId,
  dataGenerationTecnique
) {
  const { browser, scenario } = await _before(
    `${testId
      .toString()
      .padStart(3, "0")} - Edit Member With Invalid Email - ${dataGenerationTecnique}`
  );

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
  testId,
  dataGenerationTecnique
) {
  const { browser, scenario } = await _before(
    `${testId
      .toString()
      .padStart(3, "0")} - Edit Member With A Note Longer Than 500 Characters - ${dataGenerationTecnique}`
  );

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
  testId,
  dataGenerationTecnique
) {
  const { browser, scenario } = await _before(
    `${testId
      .toString()
      .padStart(3, "0")} - Edit Member With A Name Longer Than 191 Characters - ${dataGenerationTecnique}`
  );

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

async function executeMembersTests() {
  let i = 91;

  for (let [index, value] of dataGenerationTecniques.entries()) {
    let member = {};
    if (index == 0) {
      member = createMember_Valid_A_Priori();
    } else if (index == 1) {
      member = createMember_Valid_PseudoRandom();
    } else {
      member = createMember_Valid_Random();
    }
    await createMember(member, i++, value);
  }

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

  for (let [index, value] of dataGenerationTecniques.entries()) {
    let member = {};
    if (index == 0) {
      member = createMember_Valid_A_Priori();
      member.email = "";
    } else if (index == 1) {
      member = createMember_Valid_PseudoRandom();
      member.email = "";
    } else {
      member = createMember_Valid_Random();
      member.email = "";
    }
    await createMemberWithEmptyEmail(member, i++, value);
  }

  for (let [index, value] of dataGenerationTecniques.entries()) {
    let member = {};
    if (index == 0) {
      member = createMember_TooLongNote_A_Priori();
    } else if (index == 1) {
      member = createMember_TooLongNote_PseudoRandom();
    } else {
      member = createMember_TooLongNote_Random();
    }
    await createMemberWithTooLongNote(member, i++, value);
  }

  for (let [index, value] of dataGenerationTecniques.entries()) {
    let member = {};
    if (index == 0) {
      member = createMember_TooLongName_A_Priori();
    } else if (index == 1) {
      member = createMember_TooLongName_PseudoRandom();
    } else {
      member = createMember_TooLongName_Random();
    }
    await createMemberWithTooLongName(member, i++, value);
  }

  for (let [index, value] of dataGenerationTecniques.entries()) {
    let memberToCreate = {};
    let memberToEdit = {};
    if (index == 0) {
      memberToCreate = createMember_Valid_A_Priori();
      memberToEdit = createMember_Valid_A_Priori();
    } else if (index == 1) {
      memberToCreate = createMember_Valid_PseudoRandom();
      memberToEdit = createMember_Valid_PseudoRandom();
    } else {
      memberToCreate = createMember_Valid_Random();
      memberToEdit = createMember_Valid_Random();
    }
    await editMember(memberToCreate, memberToEdit, i++, value);
  }

  for (let [index, value] of dataGenerationTecniques.entries()) {
    let memberToCreate = {};
    let memberToEdit = {};
    if (index == 0) {
      memberToCreate = createMember_Valid_A_Priori();
      memberToEdit = createMember_Valid_A_Priori();
      memberToEdit.email = "";
    } else if (index == 1) {
      memberToCreate = createMember_Valid_PseudoRandom();
      memberToEdit = createMember_Valid_PseudoRandom();
      memberToEdit.email = "";
    } else {
      memberToCreate = createMember_Valid_Random();
      memberToEdit = createMember_Valid_Random();
      memberToEdit.email = "";
    }
    await editMemberWithEmptyEmail(memberToCreate, memberToEdit, i++, value);
  }

  for (let [index, value] of dataGenerationTecniques.entries()) {
    let memberToCreate = {};
    let memberToEdit = {};
    if (index == 0) {
      memberToCreate = createMember_Valid_A_Priori();
      memberToEdit = createMember_InvalidEmail_A_Priori();
    } else if (index == 1) {
      memberToCreate = createMember_Valid_PseudoRandom();
      memberToEdit = createMember_InvalidEmail_PseudoRandom();
    } else {
      memberToCreate = createMember_Valid_Random();
      memberToEdit = createMember_InvalidEmail_Random();
    }
    await editMemberWithInvalidEmail(memberToCreate, memberToEdit, i++, value);
  }

  for (let [index, value] of dataGenerationTecniques.entries()) {
    let memberToCreate = {};
    let memberToEdit = {};
    if (index == 0) {
      memberToCreate = createMember_Valid_A_Priori();
      memberToEdit = createMember_TooLongNote_A_Priori();
    } else if (index == 1) {
      memberToCreate = createMember_Valid_PseudoRandom();
      memberToEdit = createMember_TooLongNote_PseudoRandom();
    } else {
      memberToCreate = createMember_Valid_Random();
      memberToEdit = createMember_TooLongNote_Random();
    }
    await editMemberWithTooLongNote(memberToCreate, memberToEdit, i++, value);
  }

  for (let [index, value] of dataGenerationTecniques.entries()) {
    let memberToCreate = {};
    let memberToEdit = {};
    if (index == 0) {
      memberToCreate = createMember_Valid_A_Priori();
      memberToEdit = createMember_TooLongName_A_Priori();
    } else if (index == 1) {
      memberToCreate = createMember_Valid_PseudoRandom();
      memberToEdit = createMember_TooLongName_PseudoRandom();
    } else {
      memberToCreate = createMember_Valid_Random();
      memberToEdit = createMember_TooLongName_Random();
    }
    await editMemberWithTooLongName(memberToCreate, memberToEdit, i++, value);
  }
}

module.exports = {
  executeMembersTests,
};
