const { faker } = require("@faker-js/faker");

class MemberInput {
  constructor() {}

  /*
    Util
    */

  generateRandomLongName() {
    let name = "";
    let lastName = "";
    let sex = faker.helpers.arrayElement(["male", "female"]);

    do {
      name += faker.person.firstName(sex) + " ";
      lastName += faker.person.lastName() + " ";
    } while ((name + lastName).length <= 192);

    return (name + lastName).trim();
  }

  generateRandomLongNote() {
    let note = "";

    do {
      note += faker.lorem.sentence() + " ";
    } while (note.length <= 500);

    return note;
  }

  generateRandomInvalidEmail() {
    const validEmail = faker.internet.email();
    const invalidPatterns = [
      () => validEmail.replace("@", ""), // Missing "@" Symbol
      () => validEmail.split("@")[0] + "@", // Missing Domain Part
      () => "@" + validEmail.split("@")[1], // Missing Local Part
      () => validEmail + faker.string.symbol(), // Invalid Characters in Domain Part
      () =>
        validEmail.substring(0, validEmail.lastIndexOf("@") + 1) +
        validEmail.substring(validEmail.lastIndexOf("."), validEmail.length), // No Text Between "@" and Domain
    ];
    return faker.helpers.arrayElement(invalidPatterns)();
  }

  function() {}

  /*
Valid Data
*/
  createMember_Valid_A_Priori() {
    var member = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      label: faker.word.noun(),
      note: faker.lorem.sentence(),
    };

    return member;
  }

  createMember_Valid_PseudoRandom() {
    var member = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      label: faker.word.noun(),
      note: faker.lorem.sentence(),
    };

    return member;
  }

  createMember_Valid_Random() {
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
  createMember_InvalidEmail_A_Priori() {
    var member = {
      name: faker.person.fullName(),
      email: generateRandomInvalidEmail(),
      label: faker.word.noun(),
      note: faker.lorem.sentence(),
    };

    return member;
  }

  createMember_InvalidEmail_PseudoRandom() {
    var member = {
      name: faker.person.fullName(),
      email: generateRandomInvalidEmail(),
      label: faker.word.noun(),
      note: faker.lorem.sentence(),
    };

    return member;
  }

  createMember_InvalidEmail_Random() {
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
  createMember_TooLongNote_A_Priori() {
    var member = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      label: faker.word.noun(),
      note: generateRandomLongNote(),
    };

    return member;
  }

  createMember_TooLongNote_PseudoRandom() {
    var member = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      label: faker.word.noun(),
      note: generateRandomLongNote(),
    };

    return member;
  }

  createMember_TooLongNote_Random() {
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
  createMember_TooLongName_A_Priori() {
    var member = {
      name: generateRandomLongName(),
      email: faker.internet.email(),
      label: faker.word.noun(),
      note: faker.lorem.sentence(),
    };

    return member;
  }

  createMember_TooLongName_PseudoRandom() {
    var member = {
      name: generateRandomLongName(),
      email: faker.internet.email(),
      label: faker.word.noun(),
      note: faker.lorem.sentence(),
    };

    return member;
  }

  createMember_TooLongName_Random() {
    var member = {
      name: generateRandomLongName(),
      email: faker.internet.email(),
      label: faker.word.noun(),
      note: faker.lorem.sentence(),
    };

    return member;
  }
}

module.exports = {
  membersInput: new MemberInput(),
};
