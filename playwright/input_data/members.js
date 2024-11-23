const { faker } = require("@faker-js/faker");

/*
    Util
*/

function generateRandomLongName() {
  let name = "";
  let lastName = "";
  let sex = faker.helpers.arrayElement(["male", "female"]);

  do {
    name += faker.person.firstName(sex) + " ";
    lastName += faker.person.lastName() + " ";
  } while ((name + lastName).length <= 192);

  return (name + lastName).trim();
}

function generateRandomLongNote() {
  let note = "";

  do {
    note += faker.lorem.sentence() + " ";
  } while (note.length <= 500);

  return note;
}

function generateRandomInvalidEmail() {
  const validEmail = faker.internet.email();
  const invalidPatterns = [
    () => validEmail.replace("@", ""), // Missing "@" Symbol
    () => validEmail.split("@")[0] + '@', // Missing Domain Part
    () => '@' + validEmail.split("@")[1], // Missing Local Part
    () => validEmail + faker.string.symbol(), // Invalid Characters in Domain Part
    () =>
      validEmail.substring(0, validEmail.lastIndexOf("@") + 1) +
      validEmail.substring(validEmail.lastIndexOf("."), validEmail.length), // No Text Between "@" and Domain
  ];
  return faker.helpers.arrayElement(invalidPatterns)();
}

/*
    Valid Data
*/
function createMember_Valid_A_Priori() {
  var member = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    label: faker.word.noun(),
    note: faker.lorem.sentence(),
  };

  return member;
}

function createMember_Valid_PseudoRandom() {
  var member = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    label: faker.word.noun(),
    note: faker.lorem.sentence(),
  };

  return member;
}

function createMember_Valid_Random() {
  var member = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    label: faker.word.noun(),
    note: faker.lorem.sentence(),
  };

  return member;
}

/*
    Invalid Email
*/
function createMember_InvalidEmail_A_Priori() {
  var member = {
    name: faker.person.fullName(),
    email: generateRandomInvalidEmail(),
    label: faker.word.noun(),
    note: faker.lorem.sentence(),
  };

  return member;
}

function createMember_InvalidEmail_PseudoRandom() {
  var member = {
    name: faker.person.fullName(),
    email: generateRandomInvalidEmail(),
    label: faker.word.noun(),
    note: faker.lorem.sentence(),
  };

  return member;
}

function createMember_InvalidEmail_Random() {
  var member = {
    name: faker.person.fullName(),
    email: generateRandomInvalidEmail(),
    label: faker.word.noun(),
    note: faker.lorem.sentence(),
  };

  return member;
}

/*
    Too Long Note
*/
function createMember_TooLongNote_A_Priori() {
  var member = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    label: faker.word.noun(),
    note: generateRandomLongNote(),
  };

  return member;
}

function createMember_TooLongNote_PseudoRandom() {
  var member = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    label: faker.word.noun(),
    note: generateRandomLongNote(),
  };

  return member;
}

function createMember_TooLongNote_Random() {
  var member = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    label: faker.word.noun(),
    note: generateRandomLongNote(),
  };

  return member;
}

/*
    Too Long Name
*/
function createMember_TooLongName_A_Priori() {
  var member = {
    name: generateRandomLongName(),
    email: faker.internet.email(),
    label: faker.word.noun(),
    note: faker.lorem.sentence(),
  };

  return member;
}

function createMember_TooLongName_PseudoRandom() {
  var member = {
    name: generateRandomLongName(),
    email: faker.internet.email(),
    label: faker.word.noun(),
    note: faker.lorem.sentence(),
  };

  return member;
}

function createMember_TooLongName_Random() {
  var member = {
    name: generateRandomLongName(),
    email: faker.internet.email(),
    label: faker.word.noun(),
    note: faker.lorem.sentence(),
  };

  return member;
}

module.exports = {
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
};
