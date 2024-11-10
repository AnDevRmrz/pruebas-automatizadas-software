exports.SettingsPage = class SettingsPage {

  constructor(scenario) {
    this.scenario = scenario;
    this.editTitleAndDescriptionButton = scenario.getPage().locator("div[data-testid='title-and-description'] button");
    this.editTimezoneButton = scenario.getPage().locator("div[data-testid='timezone'] button");
  }

  async goto() {
    await this.scenario.getPage().goto("http://localhost:3002/ghost/#/tags");
    await this.scenario.screenshot();
    await new Promise((r) => setTimeout(r, 1000));
  }

  async editTitleAndDescription(siteTitle, siteDescription) {

    await this.editTitleAndDescriptionButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    let siteTitleInput = this.scenario.getPage().locator("div[data-testid='title-and-description'] input[placeholder='Site title']");    
    let siteDescriptionInput = this.scenario.getPage().locator("div[data-testid='title-and-description'] input[placeholder='Site description']");

    await siteTitleInput.fill(siteTitle);
    await siteDescriptionInput.fill(siteDescription);
    await this.scenario.screenshot();

    let saveButton = this.scenario.getPage().locator("div[data-testid='title-and-description'] button[class*='bg-green']");
    await saveButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }

  async getCurrentTitleAndDescription() {

    let titleAndDescriptionValues = await this.scenario.getPage().locator("div[data-testid='title-and-description'] div[class='flex items-center mt-1']").all();    
    return {
        siteTitle: await titleAndDescriptionValues[0].innerText(),
        siteDescription: await titleAndDescriptionValues[1].innerText(),
    }
  }

  async editTimezone(newTimezone) {

    await this.editTimezoneButton.click();
    await new Promise((r) => setTimeout(r, 1000));    
    let timezoneSelect = this.scenario.getPage().locator("div[data-testid='timezone-select']");
    await timezoneSelect.click();
    await new Promise((r) => setTimeout(r, 1000));
    let timezoneInput = this.scenario.getPage().locator("div[data-testid='timezone'] input");
    await timezoneInput.fill(newTimezone);
    await timezoneInput.press("Enter");
    await this.scenario.screenshot();

    let saveButton = this.scenario.getPage().locator("div[data-testid='timezone'] button[class*='bg-green']");
    await saveButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }

  async getCurrentTimezone() {

    let timezoneData = await this.scenario.getPage().locator("div[data-testid='timezone'] div[class='flex flex-col']").all();
    return await timezoneData[1].innerText();
  }
};
