const { CreateDeletePostPage } = require("./create_delete_post_page");

exports.ListPostsPage = class ListPostsPage {

  constructor(scenario) {
    this.scenario = scenario;
    this.newPostButton = scenario.getPage().locator('a[href="#/editor/post/"]').first();
  }

  async goto() {
    await this.scenario.getPage().goto("http://localhost:3003/ghost/#/posts");
    await this.scenario.screenshot();
    await new Promise((r) => setTimeout(r, 1000));
  }

  async getValueOrEmptyWhenError(tagHtml, selector) {

    try {

      let element = tagHtml.locator(selector);
      await element.waitFor({ timeout: 50 });
      return await element.innerText();
    } catch (e) {
        return "";
    }
  }

  async goToNewPost() {

    await this.newPostButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
    return new CreateDeletePostPage(this.scenario);
  }

  async getListOfPosts() {

    let postsHtml = await this.scenario.getPage().locator("li[class*='gh-list-row gh-posts-list-item']").all();
    let posts = [];

    for (const postHtml of postsHtml) {
      
      let title = await this.getValueOrEmptyWhenError(postHtml, "h3[class='gh-content-entry-title']");
      posts.push({
        title: title,
      });
    }
    
    return posts;
  }
};