exports.CreateEditTag = class CreateEditTag {

  constructor(page) {
    this.page = page;
    this.tagNameInput = page.locator('#tag-name');
    this.tagSlugInput = page.locator('#tag-slug');
    this.tagDescriptionInput = page.locator('#tag-description');
    this.saveTagButton = page.locator('button[data-test-button=save]');
  }

  async goto() {
    await this.page.goto("http://localhost:3002/ghost/#/tags/new");
    await new Promise((r) => setTimeout(r, 1000));
  }

  async createTag(tagName, tagSlug, tagDescription) {

    await this.tagNameInput.fill(tagName);
    await this.tagSlugInput.fill(tagSlug);
    await this.tagDescriptionInput.fill(tagDescription);
    await this.saveTagButton.click();
    await new Promise(r => setTimeout(r, 1000));
  }
};
