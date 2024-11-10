const { ListTags } = require("./list_tags_page");
const { SettingsPage } = require("./settings_page");
const { ListFilterMembersPage } = require("./list_filter_members_page");

exports.Dashboard = class Dashboard {
  constructor(scenario) {
    this.scenario = scenario;
    this.tagOption = scenario.getPage().locator("a[data-test-nav=tags]");
    this.settingsOption = scenario.getPage().locator("a[data-test-nav='settings']");
    this.membersOption = scenario.getPage().locator("a[data-test-nav=members]");
  }

  async goto() {
    await this.scenario.getPage().goto("http://localhost:3002/ghost/#/dashboard");
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }

  async goToTags() {
    await this.tagOption.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
    return new ListTags(this.scenario);    
  }

  async goToSettings() {
    await this.settingsOption.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
    return new SettingsPage(this.scenario);
  }

  async goToMembers() {
    await this.membersOption.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
    return new ListFilterMembersPage(this.scenario);
  }
};
