const { faker } = require("@faker-js/faker");

/*
    Valid Data
*/
function createMember_Valid_A_Priori() {
  var member = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    label: faker.word.noun(),
    note: faker.lorem.paragraphs(1),
  };

  return member;
}

function createMember_Valid_PseudoRandom() {
  var member = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    label: faker.word.noun(),
    note: faker.lorem.paragraphs(1),
  };

  return member;
}

function createMember_Valid_Random() {
  var member = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    label: faker.word.noun(),
    note: faker.lorem.paragraphs(1),
  };

  return member;
}

/*
    Invalid Email
*/
function createMember_InvalidEmail_A_Priori() {
  var member = {
    name: faker.person.fullName(),
    email: "invalidemail@test-com",
    label: faker.word.noun(),
    note: faker.lorem.paragraphs(1),
  };

  return member;
}

function createMember_InvalidEmail_PseudoRandom() {
  var member = {
    name: faker.person.fullName(),
    email: "invalidemail@test-com",
    label: faker.word.noun(),
    note: faker.lorem.paragraphs(1),
  };

  return member;
}

function createMember_InvalidEmail_Random() {
  var member = {
    name: faker.person.fullName(),
    email: "invalidemail@test-com",
    label: faker.word.noun(),
    note: faker.lorem.paragraphs(1),
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
    note: faker.lorem.paragraphs(10),
  };

  return member;
}

function createMember_TooLongNote_PseudoRandom() {
  var member = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    label: faker.word.noun(),
    note: faker.lorem.paragraphs(10),
  };

  return member;
}

function createMember_TooLongNote_Random() {
  var member = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    label: faker.word.noun(),
    note: faker.lorem.paragraphs(10),
  };

  return member;
}

/*
    Too Long Name
*/
function createMember_TooLongName_A_Priori() {
  var member = {
    name: faker.lorem.paragraphs(5),
    email: faker.internet.email(),
    label: faker.word.noun(),
    note: faker.lorem.paragraphs(1),
  };

  return member;
}

function createMember_TooLongName_PseudoRandom() {
  var member = {
    name: faker.lorem.paragraphs(5),
    email: faker.internet.email(),
    label: faker.word.noun(),
    note: faker.lorem.paragraphs(1),
  };

  return member;
}

function createMember_TooLongName_Random() {
  var member = {
    name: faker.lorem.paragraphs(5),
    email: faker.internet.email(),
    label: faker.word.noun(),
    note: faker.lorem.paragraphs(1),
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
