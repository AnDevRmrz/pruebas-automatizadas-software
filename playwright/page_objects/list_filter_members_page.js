const {
  CreateEditDeleteMemberPage,
} = require("../page_objects/create_edit_delete_member_page");

exports.ListFilterMembersPage = class ListFilterMembersPage {
  constructor(scenario) {
    this.scenario = scenario;
    this.newMemberButton = scenario
      .getPage()
      .locator("a[data-test-new-member-button=true]");
    this.filterMemberButton = scenario.getPage().locator("div[data-test-button=members-filter-actions]");
    this.filterNameInput = scenario.getPage().locator("input[data-test-input=members-filter-value]");
    this.applyFilterButton = scenario.getPage().locator("button[data-test-button=members-apply-filter]");
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
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
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

  async filterMemberByName(memberName) {
    this.filterMemberButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
    await this.filterNameInput.fill(memberName);
    await this.scenario.screenshot();
    this.applyFilterButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }
};
