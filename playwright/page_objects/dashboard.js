const { ListTags } = require("./list_tags");

exports.Dashboard = class Dashboard {
  constructor(page) {
    this.page = page;
    this.tagOption = page.locator("a[data-test-nav=tags]");
  }

  async goto() {
    await this.page.goto("http://localhost:3002/ghost/#/dashboard");
    await new Promise((r) => setTimeout(r, 1000));
  }

  async goToTags() {
    await this.tagOption.click();
    await new Promise((r) => setTimeout(r, 1000));
    return new ListTags(this.page);
  }
};
