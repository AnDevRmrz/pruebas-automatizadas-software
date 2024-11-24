const { CreateEditMemberPage } = require("./create_edit_member_page");

exports.ListMembersPage = class ListMembersPage {
  constructor(scenario) {
    this.scenario = scenario;
    this.newMemberButton = scenario
      .getPage()
      .locator("a[data-test-new-member-button=true]");
  }

  async goto() {
    await this.scenario.getPage().goto("http://localhost:3002/ghost/#/members");
    await this.scenario.screenshot();
    await new Promise((r) => setTimeout(r, 1000));
  }

  async goToNewMember() {
    await this.newMemberButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
    return new CreateEditMemberPage(this.scenario);
  }

  async editMember(memberName, memberEmail) {
    var membersRows = await this.scenario
      .getPage()
      .locator("tr[data-test-list=members-list-item]")
      .all();

    let element = null;

    for (const row of membersRows) {
      let name = await this.getValueOrEmptyWhenError(row, "h3");
      let email = await this.getValueOrEmptyWhenError(row, "p");
      if (name == memberName && email == memberEmail) {
        element = row;
        break;
      }
    }

    element.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }

  async getValueOrEmptyWhenError(tagHtml, selector) {
    try {
      let element = tagHtml.locator(selector);
      await element.waitFor({ timeout: 50 });
      return await element.innerText();
    } catch (e) {
      return "";
    }
  }

  async getMembersList() {
    var membersRows = await this.scenario
      .getPage()
      .locator("tr[data-test-list=members-list-item]")
      .all();
    var members = [];

    for (const row of membersRows) {
      let name = await this.getValueOrEmptyWhenError(row, "h3");
      let email = await this.getValueOrEmptyWhenError(row, "p");
      members.push({
        name: name,
        email: email,
      });
    }

    return members;
  }
};
