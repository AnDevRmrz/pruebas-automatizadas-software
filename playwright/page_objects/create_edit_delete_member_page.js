exports.CreateEditDeleteMemberPage = class CreateEditDeleteMemberPage {
  constructor(scenario) {
    this.scenario = scenario;
    this.memberNameInput = scenario.getPage().locator("#member-name");
    this.memberEmailInput = scenario.getPage().locator("#member-email");
    this.saveMemberButton = scenario.getPage().locator("button[data-test-button=save]");
  }

  async saveMember(memberName, memberEmail) {
    await this.memberNameInput.fill(memberName);
    await this.memberEmailInput.fill(memberEmail);
    await this.saveMemberButton.click();
    await new Promise(r => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }
};
