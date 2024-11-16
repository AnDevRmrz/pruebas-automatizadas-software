const { CreateMemberPage } = require("./create_member_page");

exports.ListFilterMembersPage = class ListFilterMembersPage {
  constructor(scenario) {
    this.scenario = scenario;
    this.newMemberButton = scenario
      .getPage()
      .locator('a[href="#/members/new/"]').first();
  }

  async goToNewMember() {
    await this.newMemberButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
    return new CreateMemberPage(this.scenario);
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
      .locator('div[class="w-80"]')
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
