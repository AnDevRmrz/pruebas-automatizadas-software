exports.CreateMemberPage = class CreateMemberPage {
  constructor(scenario) {
    this.scenario = scenario;
    this.memberNameInput = scenario.getPage().locator("#member-name");
    this.memberEmailInput = scenario.getPage().locator("#member-email");
    this.saveMemberButton = scenario.getPage().locator('button[class="gh-btn gh-btn-primary gh-btn-icon ember-view"]');
    this.gearButton = scenario.getPage().locator("button[data-test-button=member-actions]");
    this.deleteMemberButton = scenario.getPage().locator("button[data-test-button=delete-member]");
    this.deleteMemberConfirmationButton = scenario.getPage().locator("button[data-test-button=confirm]");
  }

  async saveMember(memberName, memberEmail) {
    await this.memberNameInput.fill(memberName);
    await this.memberEmailInput.fill(memberEmail);
    await this.saveMemberButton.click();
    await new Promise(r => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }

  async deleteMember() {
    await this.gearButton.click();
    await new Promise(r => setTimeout(r, 1000));
    await this.scenario.screenshot();
    await this.deleteMemberButton.click();
    await new Promise(r => setTimeout(r, 1000));
    await this.scenario.screenshot();
    await this.deleteMemberConfirmationButton.click();
    await new Promise(r => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }
};
