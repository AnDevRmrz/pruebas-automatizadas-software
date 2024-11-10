exports.CreateEditTag = class CreateEditTag {

  constructor(scenario) {
    this.scenario = scenario;
    this.tagNameInput = scenario.getPage().locator('#tag-name');
    this.tagSlugInput = scenario.getPage().locator('#tag-slug');
    this.tagDescriptionInput = scenario.getPage().locator('#tag-description');
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

  async saveTag(tagName, tagSlug, tagDescription) {

    await this.tagNameInput.fill(tagName);
    await this.tagSlugInput.fill(tagSlug);
    await this.tagDescriptionInput.fill(tagDescription);
    await this.saveTagButton.click();
    await new Promise(r => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }

  async deleteTag() {

    await this.deleteButton.click();
    await new Promise(r => setTimeout(r, 1000));
    await this.scenario.screenshot();
    let confirmButton = await this.scenario.getPage().locator("button[data-test-button=confirm]");
    await confirmButton.click();    
  }
  
};
