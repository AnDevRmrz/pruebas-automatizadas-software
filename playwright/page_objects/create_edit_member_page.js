const { expect } = require("@playwright/test");

exports.CreateEditMemberPage = class CreateEditMemberPage {
  constructor(scenario) {
    this.scenario = scenario;
    this.memberNameInput = scenario.getPage().locator("#member-name");
    this.memberEmailInput = scenario.getPage().locator("#member-email");
    this.memberLabelInput = scenario.getPage().locator("input[type=search]");
    this.memberLabelSearchBox = scenario.getPage().locator("ul[role=listbox] li");
    this.memberNoteTextArea = scenario.getPage().locator("#member-note");
    this.saveMemberButton = scenario
      .getPage()
      .locator("button[data-test-button=save]");
    this.leaveButton = scenario
      .getPage()
      .locator("button[data-test-leave-button]");
  }

  async saveMember(memberName, memberEmail, memberLabel, memberNote) {
    await this.memberNameInput.fill(memberName);
    await this.memberEmailInput.fill(memberEmail);
    await this.memberLabelInput.fill(memberLabel);
    await new Promise((r) => setTimeout(r, 200));
    this.memberLabelSearchBox.click();
    await this.memberNoteTextArea.fill(memberNote);
    await this.saveMemberButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }

  async confirmLeavingPage() {
    await this.leaveButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }

  async errorMessageIsDisplayed(identifier, expectedText) {
    const errorLabel = this.scenario.getPage().locator(identifier);
    await errorLabel.waitFor({ timeout: 500 });
    const text = await errorLabel.innerText();
    expect(text === expectedText).toBeTruthy();;
  }
};
