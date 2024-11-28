const memberInputJson = require("../data/member/member_data.json");
const memberInvalidEmailInputJson = require("../data/member/member_invalid_email_data.json");
const memberLongNameInputJson = require("../data/member/member_long_name_data.json");
const memberLongNoteInputJson = require("../data/member/member_long_note_data.json");

class MemberInput {
  constructor() {}

  // Valid Data
  getMemberAPriori() {
    return memberInputJson[Math.floor(Math.random() * memberInputJson.length)];
  }

  // Invalid Email
  getMemberEmptyEmailAPriori() {
    const member = this.getMemberAPriori();
    member.email = "";
    return member;
  }

  // Invalid Email
  getMemberInvalidEmailAPriori() {
    return memberInvalidEmailInputJson[
      Math.floor(Math.random() * memberInvalidEmailInputJson.length)
    ];
  }

  // Too Long Note
  getMemberTooLongNoteAPriori() {
    return memberLongNoteInputJson[
      Math.floor(Math.random() * memberLongNoteInputJson.length)
    ];
  }

  // Too Long Name
  getMemberTooLongNameAPriori() {
    return memberLongNameInputJson[
      Math.floor(Math.random() * memberLongNameInputJson.length)
    ];
  }
}

module.exports = {
  membersInput: new MemberInput(),
};
