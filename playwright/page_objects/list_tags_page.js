const { CreateEditTag } = require("./create_edit_tag_page");

exports.ListTags = class ListTags {

  constructor(page) {
    this.page = page;
    this.newTagButton = page.locator("a[href$='new/']");
  }

  async goto() {
    await this.page.goto("http://localhost:3002/ghost/#/tags");
    await new Promise((r) => setTimeout(r, 1000));
  }

  async verifyIfTagExists() {

    let titleValues = await Promise.all(titleElements.map(async (value) => await value.getText()));    
    assert.equal(titleValues.includes(tagName), true);
  }

  async getValueOrEmptyWhenError(tagHtml, selector) {

    try {
        return await tagHtml.locator(selector, { timeout: 50 }).innerText();
    } catch (e) {
        return "";
    }
  }

  async getListOfTags() {

    var tagsHtml = await this.page.locator("li[class='gh-list-row gh-tags-list-item']").all();
    var tags = await Promise.all(tagsHtml.map(async (tagHtml) =>  {

        let result = { 
            name: await this.getValueOrEmptyWhenError(tagHtml, "h3[class='gh-tag-list-name']"),
            description: await this.getValueOrEmptyWhenError(tagHtml, "p[class*='gh-tag-list-description']"),
            slug: await this.getValueOrEmptyWhenError(tagHtml, "a[class*='gh-tag-list-slug'] span")
        };
        return result;
    }));
    return tags;
  }

  async goToEditTag(tagSlug) {

    var elements = await this.page.locator(`li[class='gh-list-row gh-tags-list-item'] a[href$='${tagSlug}/']`).all();    
    await elements[0].click();
    await new Promise((r) => setTimeout(r, 1000));
    return new CreateEditTag(this.page);
  }

  async goToNewTag() {
    await this.newTagButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    return new CreateEditTag(this.page);
  }
};
