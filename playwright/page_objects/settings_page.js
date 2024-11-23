exports.SettingsPage = class SettingsPage {

  constructor(scenario) {
    this.scenario = scenario;
    this.editTitleAndDescriptionButton = scenario.getPage().locator("div[data-testid='title-and-description'] button");
    this.editGeneralLanguagenButton = scenario.getPage().locator("div[data-testid='publication-language'] button");
    this.editMetaDataButton = scenario.getPage().locator("div[data-testid='metadata'] button");
    this.editXCardButton = scenario.getPage().locator("div[data-testid='twitter'] button");
    this.editFacebookButton = scenario.getPage().locator("div[data-testid='facebook'] button");

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

  async editGeneralLanguage(generalLanguage) {

    await this.editGeneralLanguagenButton.scrollIntoViewIfNeeded();
    await this.editGeneralLanguagenButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    let generalLanguageInput = this.scenario.getPage().locator("div[data-testid='publication-language'] input[placeholder='Site language']");    

    await generalLanguageInput.fill(generalLanguage);
    await this.scenario.screenshot();

    let saveButton = this.scenario.getPage().locator("div[data-testid='publication-language'] button[class*='bg-green']");
    await saveButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }

  async editMetaData(metaTitle, metaDescription) {

    await this.editMetaDataButton.scrollIntoViewIfNeeded();
    await this.editMetaDataButton.click();
    await new Promise((r) => setTimeout(r, 1000));

    let metaDataInputs = await this.scenario.getPage().locator("div[data-testid='metadata'] input").all();
    let metaDataTitleInput = metaDataInputs[0];
    let metaDataDescriptionInput = metaDataInputs[1];

    await metaDataTitleInput.fill(metaTitle);
    await metaDataDescriptionInput.fill(metaDescription);
    await this.scenario.screenshot();

    let saveButton = this.scenario.getPage().locator("div[data-testid='metadata'] button[class*='bg-green']");
    await saveButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }

  async editXCardData(xCardTitle, xCardDescription) {

    await this.editXCardButton.scrollIntoViewIfNeeded();
    await this.editXCardButton.click();
    await new Promise((r) => setTimeout(r, 1000));

    let xCardInputs = await this.scenario.getPage().locator("div[data-testid='twitter'] input").all();
    let xCardTitleInput = xCardInputs[1];
    let xCardDescriptionInput = xCardInputs[2];

    await xCardTitleInput.fill(xCardTitle);
    await xCardDescriptionInput.fill(xCardDescription);
    await this.scenario.screenshot();

    let saveButton = this.scenario.getPage().locator("div[data-testid='twitter'] button[class*='bg-green']");
    await saveButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }

  async editFacebookData(facebookTitle, facebookDescription) {

    await this.editFacebookButton.scrollIntoViewIfNeeded();
    await this.editFacebookButton.click();
    await new Promise((r) => setTimeout(r, 1000));

    let facebookInputs = await this.scenario.getPage().locator("div[data-testid='facebook'] input").all();
    let facebookTitleInput = facebookInputs[1];
    let facebookDescriptionInput = facebookInputs[2];

    await facebookTitleInput.fill(facebookTitle);
    await facebookDescriptionInput.fill(facebookDescription);
    await this.scenario.screenshot();

    let saveButton = this.scenario.getPage().locator("div[data-testid='facebook'] button[class*='bg-green']");
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

  async getCurrentGeneralLanguage() {

    let generalLanguage = await this.scenario.getPage().locator("div[data-testid='publication-language'] div[class='flex items-center mt-1']");
    return await generalLanguage.innerText()
  }

  async getCurrentMetaData() {

    await this.editMetaDataButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    
    let metaDataInputs = await this.scenario.getPage().locator("div[data-testid='metadata'] input").all();
    let metaDataTitleInput = metaDataInputs[0];
    let metaDataDescriptionInput = metaDataInputs[1];

    return {
      metaTitle: await metaDataTitleInput.inputValue(),
      metaDescription: await metaDataDescriptionInput.inputValue()
    }
  }

  async getCurrentXCardData() {

    await this.editXCardButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    
    let xCardInputs = await this.scenario.getPage().locator("div[data-testid='twitter'] input").all();
    let xCardTitleInput = xCardInputs[1];
    let xCardDescriptionInput = xCardInputs[2];

    return {
      xCardTitle: await xCardTitleInput.inputValue(),
      xCardDescription: await xCardDescriptionInput.inputValue()
    }
  }

  async getCurrentFacebookData() {

    await this.editFacebookButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    
    let facebookInputs = await this.scenario.getPage().locator("div[data-testid='facebook'] input").all();
    let facebookTitleInput = facebookInputs[1];
    let facebookDescriptionInput = facebookInputs[2];

    return {
      facebookTitle: await facebookTitleInput.inputValue(),
      facebookDescription: await facebookDescriptionInput.inputValue()
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
