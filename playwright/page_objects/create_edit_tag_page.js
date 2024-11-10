const { ListTags } = require("./list_tags_page");

exports.CreateEditTag = class CreateEditTag {

  constructor(page) {
    this.page = page;
    this.tagNameInput = page.locator('#tag-name');
    this.tagSlugInput = page.locator('#tag-slug');
    this.tagDescriptionInput = page.locator('#tag-description');
    this.saveTagButton = page.locator('button[data-test-button=save]');
    this.deleteButton = page.locator('button[data-test-button=delete-tag]');
  }

  async goToNew() {
    await this.page.goto("http://localhost:3002/ghost/#/tags/new");
    await new Promise((r) => setTimeout(r, 1000));
  }

  async goToEdit(tagSlug) {
    await this.page.goto("http://localhost:3002/ghost/#/tags/"+tagSlug);
    await new Promise((r) => setTimeout(r, 1000));
  }

  async saveTag(tagName, tagSlug, tagDescription) {

    await this.tagNameInput.fill(tagName);
    await this.tagSlugInput.fill(tagSlug);
    await this.tagDescriptionInput.fill(tagDescription);
    await this.saveTagButton.click();
    await new Promise(r => setTimeout(r, 1000));
  }

  async deleteTag() {

    await this.deleteButton.click();
    await new Promise(r => setTimeout(r, 1000));
    let confirmButton = await this.page.locator("button[data-test-button=confirm]");
    await confirmButton.click();        
  }
  
};
