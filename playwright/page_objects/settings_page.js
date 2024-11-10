exports.SettingsPage = class SettingsPage {

  constructor(page) {
    this.page = page;
    this.editTitleAndDescriptionButton = page.locator("div[data-testid='title-and-description'] button");
    this.editTimezoneButton = page.locator("div[data-testid='timezone'] button");
  }

  async goto() {
    await this.page.goto("http://localhost:3002/ghost/#/tags");
    await new Promise((r) => setTimeout(r, 1000));
  }

  async editTitleAndDescription(siteTitle, siteDescription) {

    await this.editTitleAndDescriptionButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    let siteTitleInput = this.page.locator("div[data-testid='title-and-description'] input[placeholder='Site title']");    
    let siteDescriptionInput = this.page.locator("div[data-testid='title-and-description'] input[placeholder='Site description']");

    await siteTitleInput.fill(siteTitle);
    await siteDescriptionInput.fill(siteDescription);

    let saveButton = this.page.locator("div[data-testid='title-and-description'] button[class*='bg-green']");
    await saveButton.click();
    await new Promise((r) => setTimeout(r, 1000));
  }

  async getCurrentTitleAndDescription() {

    let titleAndDescriptionValues = await this.page.locator("div[data-testid='title-and-description'] div[class='flex items-center mt-1']").all();    
    return {
        siteTitle: await titleAndDescriptionValues[0].innerText(),
        siteDescription: await titleAndDescriptionValues[1].innerText(),
    }
  }

  async editTimezone(newTimezone) {

    await this.editTimezoneButton.click();
    await new Promise((r) => setTimeout(r, 1000));    
    let timezoneSelect = this.page.locator("div[data-testid='timezone-select']");
    await timezoneSelect.click();
    await new Promise((r) => setTimeout(r, 1000));
    let timezoneInput = this.page.locator("div[data-testid='timezone'] input");
    await timezoneInput.fill(newTimezone);
    await timezoneInput.press("Enter");

    let saveButton = this.page.locator("div[data-testid='timezone'] button[class*='bg-green']");
    await saveButton.click();
    await new Promise((r) => setTimeout(r, 1000));
  }

  async getCurrentTimezone() {

    let timezoneData = await this.page.locator("div[data-testid='timezone'] div[class='flex flex-col']").all();
    return await timezoneData[1].innerText();
  }
};
