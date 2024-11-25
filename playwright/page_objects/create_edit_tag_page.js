exports.CreateEditTag = class CreateEditTag {

  constructor(scenario) {
    this.scenario = scenario;
    this.tagNameInput = scenario.getPage().locator('#tag-name');
    this.tagSlugInput = scenario.getPage().locator('#tag-slug');
    this.tagDescriptionInput = scenario.getPage().locator('#tag-description');
    this.tagHexColorInput = scenario.getPage().locator('input[data-test-input=accentColor]');
    this.saveTagButton = scenario.getPage().locator('button[data-test-button=save]');
    this.deleteButton = scenario.getPage().locator('button[data-test-button=delete-tag]');
  }

  async goToNew() {
    await this.scenario.getPage().goto("http://localhost:3002/ghost/#/tags/new");    
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }

  async goToEdit(tagSlug) {
    await this.scenario.getPage().goto("http://localhost:3002/ghost/#/tags/"+tagSlug);
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }

  async saveTag(tagName, tagSlug, tagDescription, tagHexColor) {

    await this.fillForm(tagName, tagSlug, tagDescription, tagHexColor);
    await this.saveTagButton.click();
    await new Promise(r => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }

  async saveTagWithMetadata(tagName, tagSlug, tagDescription, tagHexColor, metaTitle, metaDescription, metaUrl) {

    await this.fillForm(tagName, tagSlug, tagDescription, tagHexColor);
    let expandButtonsElements = await this.scenario.getPage().locator("button[class='gh-btn gh-btn-expand']");
    let expandButtons = await expandButtonsElements.all();
    await expandButtons[0].click();    

    await new Promise(r => setTimeout(r, 1000));

    let metaTitleInput = this.scenario.getPage().locator('#meta-title');
    let metaDescriptionInput = this.scenario.getPage().locator('#meta-description');
    let metaUrlInput = this.scenario.getPage().locator('#canonical-url');

    await metaUrlInput.scrollIntoViewIfNeeded();
    
    await metaTitleInput.fill(metaTitle);
    await metaDescriptionInput.fill(metaDescription);
    await metaUrlInput.fill(metaUrl);

    await new Promise(r => setTimeout(r, 1000));

    await this.saveTagButton.click();
    await new Promise(r => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }

  async saveTagWithCodeXCardValues(tagName, tagSlug, tagDescription, tagHexColor, xCardTitle, xCardDescription) {

    await this.fillForm(tagName, tagSlug, tagDescription, tagHexColor);
    let expandButtonsElements = await this.scenario.getPage().locator("button[class='gh-btn gh-btn-expand']");
    let expandButtons = await expandButtonsElements.all();
    await expandButtons[1].click();    

    await new Promise(r => setTimeout(r, 1000));

    let xCardTitleInput = this.scenario.getPage().locator('#twitter-title');
    let xCardDescriptionInput = this.scenario.getPage().locator('#twitter-description');

    await xCardDescriptionInput.scrollIntoViewIfNeeded();
    
    await xCardTitleInput.fill(xCardTitle);
    await xCardDescriptionInput.fill(xCardDescription);

    await new Promise(r => setTimeout(r, 1000));

    await this.saveTagButton.click();
    await new Promise(r => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }

  async fillForm(tagName, tagSlug, tagDescription, tagHexColor) {

    await this.tagNameInput.fill(tagName);
    await this.tagSlugInput.fill(tagSlug);
    await this.tagDescriptionInput.fill(tagDescription);
    await this.tagHexColorInput.fill(tagHexColor);
  }

  async deleteTag() {

    await this.deleteButton.click();
    await new Promise(r => setTimeout(r, 1000));
    await this.scenario.screenshot();
    let confirmButton = await this.scenario.getPage().locator("button[data-test-button=confirm]");
    await confirmButton.click();    
  }

  async getTagTitleErrorMessage() {

    let errorMessage = await this.scenario.getPage().locator("span.error");
    return await errorMessage.innerText();
  }
  
  async getTagDescriptionErrorMessage() {

    let errorMessage = await this.scenario.getPage().locator("#tag-description + p");
    return await errorMessage.innerText();
  }
  
};
