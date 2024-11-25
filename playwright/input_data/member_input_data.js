const { faker } = require("@faker-js/faker");
const memberInputJson = require("../data/member/member_data.json");
const memberInvalidEmailInputJson = require("../data/member/member_invalid_email_data.json");
const memberLongNameInputJson = require("../data/member/member_long_name_data.json");
const memberLongNoteInputJson = require("../data/member/member_long_note_data.json");
const API_KEY = "a74153e0";

class MemberInput {


  constructor() {}

  // Util

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
    } while (note.length <= 501);

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

  async getValueFromAPI(url) {
    const headers = { "X-API-Key": API_KEY };
    const result = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!result.ok) {
      throw new Error("Error al consultar los datos");
    }

    return await result.json();
  }

  // Valid Data

  getMemberAPriori() {
    return memberInputJson[Math.floor(Math.random() * memberInputJson.length)];
  }

  async getMemberPseudoRandom() {
    return await this.getValueFromAPI("https://my.api.mockaroo.com/Member.json");
  }

  getMemberRandom() {
    const member = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      label: faker.word.noun(),
      note: faker.lorem.sentence(),
    };

    return member;
  }

  // Invalid Email

  getMemberEmptyEmailAPriori() {
    const member = this.getMemberAPriori();
    member.email = "";
    return member;
  }

  async getMemberEmptyEmailPseudoRandom() {
    const member = await this.getMemberPseudoRandom();
    member.email = "";
    return member;
  }

  getMemberEmptyEmailRandom() {
    const member = this.getMemberRandom();
    member.email = "";
    return member;
  }

  // Invalid Email

  getMemberInvalidEmailAPriori() {
    return memberInvalidEmailInputJson[Math.floor(Math.random() * memberInvalidEmailInputJson.length)];
  }

  async getMemberInvalidEmailPseudoRandom() {
    return await this.getValueFromAPI("https://my.api.mockaroo.com/MemberInvalidEmail.json");
  }

  getMemberInvalidEmailRandom() {
    const member = {
      name: faker.person.fullName(),
      email: this.generateRandomInvalidEmail(),
      label: faker.word.noun(),
      note: faker.lorem.sentence(),
    };

    return member;
  }

  // Too Long Note

  getMemberTooLongNoteAPriori() {
    return memberLongNoteInputJson[Math.floor(Math.random() * memberLongNoteInputJson.length)];
  }

  async getMemberTooLongNotePseudoRandom() {
    return await this.getValueFromAPI("https://my.api.mockaroo.com/MemberLongNote.json");
  }

  getMemberTooLongNoteRandom() {
    const member = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      label: faker.word.noun(),
      note: this.generateRandomLongNote(),
    };

    return member;
  }

  // Too Long Name

  getMemberTooLongNameAPriori() {
    return memberLongNameInputJson[Math.floor(Math.random() * memberLongNameInputJson.length)];
  }

  async getMemberTooLongNamePseudoRandom() {
    return await this.getValueFromAPI("https://my.api.mockaroo.com/MemberLongName.json");
  }

  getMemberTooLongNameRandom() {
    const member = {
      name: this.generateRandomLongName(),
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
