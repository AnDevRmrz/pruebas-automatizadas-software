const {
  CreateEditDeleteMemberPage,
} = require("../page_objects/create_edit_delete_member_page");

exports.ListFilterMembersPage = class ListFilterMembersPage {
  constructor(scenario) {
    this.scenario = scenario;
    this.newMemberButton = scenario
      .getPage()
      .locator("a[data-test-new-member-button=true]");
  }

  async goToNewMember() {
    await this.newMemberButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
    return new CreateEditDeleteMemberPage(this.scenario);
  }

  async goToEditMember(memberName, memberEmail){
    var membersRows = await this.scenario
    .getPage()
    .locator("tr[data-test-list=members-list-item]")
    .all();

    let element  = null;

    for (const row of membersRows) {
      let name = await this.getValueOrEmptyWhenError(row, "h3");
      let email = await this.getValueOrEmptyWhenError(row, "p");
      if (name == memberName && email == memberEmail){
        element = row;
        break;
      }
    }

    element.click();
    return new CreateEditDeleteMemberPage(this.scenario); 
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
