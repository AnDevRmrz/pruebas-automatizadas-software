const { ListTags } = require("./list_tags_page");
const { SettingsPage } = require("./settings_page");
const { ListFilterMembersPage } = require("./list_members_page");
const { ListFilterDeletePage } = require("./list_page_page");
const { ListPostsPage } = require("./list_posts_page");

exports.DashboardPage = class DashboardPage {
  constructor(scenario) {
    this.scenario = scenario;
    this.tagOption = scenario.getPage().locator("a[data-test-nav=tags]");
    this.settingsOption = scenario.getPage().locator("a[data-test-nav='settings']");
    this.pageOption = scenario.getPage().locator('a[href="#/pages/"]').first();
    this.membersOption = scenario.getPage().locator('a[href="#/members/"]').first();
    this.postsOption = scenario.getPage().locator('a[href="#/posts/"]').first();
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

  async goToPages() {
    await this.pageOption.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
    return new ListFilterDeletePage(this.scenario);
  }

  async goToMembers() {
    await this.membersOption.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
    return new ListFilterMembersPage(this.scenario);
  }

  async goToPosts() {
    await this.postsOption.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
    return new ListPostsPage(this.scenario);
  }
};
