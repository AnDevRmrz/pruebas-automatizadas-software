const { GeneralSettingsPage } = require("./general_settings_page");

exports.SettingsOptionsPage = class SettingsOptionsPage {

  constructor(scenario) {
    this.scenario = scenario;
    this.generalSettingsOption = scenario.getPage().locator("a[href*='settings/general']");
  }

  async goto() {
    await this.scenario.getPage().goto("http://localhost:3003/ghost/#/settings");
    await this.scenario.screenshot();
    await new Promise((r) => setTimeout(r, 1000));
  }

  async goToGeneralSettings() {

    await this.generalSettingsOption.click();
    return new GeneralSettingsPage(this.scenario);
  }
  
};