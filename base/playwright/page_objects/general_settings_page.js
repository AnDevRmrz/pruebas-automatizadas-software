exports.GeneralSettingsPage = class GeneralSettingsPage {

  constructor(scenario) {
    this.scenario = scenario;
  }

  async goto() {
    await this.scenario.getPage().goto("http://localhost:3003/ghost/#/settings/general");
    await this.scenario.screenshot();
    await new Promise((r) => setTimeout(r, 1000));
  }

  async editTitleAndDescription(siteTitle, siteDescription) {

    await this.scenario.screenshot();
    let editTitleAndDescriptionExpandButton = await this.scenario.getPage().locator("section[class=gh-expandable] button").all();
    await editTitleAndDescriptionExpandButton[0].click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
    let inputs = await this.scenario.getPage().locator(".gh-setting-content-extended input").all();
    let siteTitleInput = inputs[0];
    let siteDescriptionInput = inputs[1];

    await siteTitleInput.fill(siteTitle);
    await siteDescriptionInput.fill(siteDescription);
    

    let saveButton = this.scenario.getPage().locator("section[class=view-actions] button");
    await saveButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }

  async getCurrentTitleAndDescription() {

    let inputs = await this.scenario.getPage().locator(".gh-setting-content-extended input").all();
    return {
        siteTitle: await inputs[0].inputValue(),
        siteDescription: await inputs[1].inputValue(),
    }
  }

  async editTimezone(newTimezone) {

    await this.scenario.screenshot();
    let editTimezoneButton = await this.scenario.getPage().locator("section[class=gh-expandable] button").all();
    await editTimezoneButton[1].click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
    let timezoneSelect = this.scenario.getPage().locator("#timezone");
    timezoneSelect.selectOption({index: newTimezone});

    let saveButton = this.scenario.getPage().locator("section[class=view-actions] button");
    await saveButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }

  async getCurrentTimezone() {

    let timezoneSelect = await this.scenario.getPage().locator("#timezone");
    return await timezoneSelect.inputValue();
  }
};