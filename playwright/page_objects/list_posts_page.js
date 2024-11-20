const { AnalyticsPostPage } = require("./analytics_post_page");
const { CreateEditPostPage } = require("./create_post_page");

exports.ListPostsPage = class ListPostsPage {

  constructor(scenario) {
    this.scenario = scenario;
    this.newPostButton = scenario.getPage().locator("div[class='view-actions-top-row'] a[class='ember-view gh-btn gh-btn-primary']");
  }

  async goto() {
    await this.scenario.getPage().goto("http://localhost:3002/ghost/#/posts");
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
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
    return new CreateEditPostPage(this.scenario);
  }

  async getListOfPosts() {

    let postsHtml = await this.scenario.getPage().locator("li[class*='gh-list-row gh-posts-list-item']").all();
    let posts = [];

    for (const postHtml of postsHtml) {
      
      let title = await this.getValueOrEmptyWhenError(postHtml, "h3[class='gh-content-entry-title']");
      let status = await this.getValueOrEmptyWhenError(postHtml, "p[class='gh-content-entry-status'] span");
      posts.push({
        title: title,
        status: status,
      });
    }
    
    return posts;
  }

  async verifyIfPostWasCreated(expectedTitle, expectedContent) {

    let modalContent = this.scenario.getPage().locator("div.modal-content");
    let title = await modalContent.locator("div h2").innerText();
    let content = await modalContent.locator("div p.post-excerpt").innerText();
    return title === expectedTitle && content === expectedContent;
  }

  async closeSuccessfulModal() {

    let closeModalButton = this.scenario.getPage().locator("button[class='close']");
    await closeModalButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }

  async goToAnalytics(postTitle) {

    let listOfPosts = await this.getListOfPosts();

    let position = -1;
    for (let i = 0; i < listOfPosts.length; i++) {
      if(listOfPosts[i].title === postTitle) {

        position = i;
        break;
      }
    }

    if(position > -1) {

      let postsHtml = await this.scenario.getPage().locator("li[class*='gh-list-row gh-posts-list-item']").all();
      let analyticsButton = await postsHtml[position].locator("a[href*=analytics]");
      await analyticsButton.click();
      await new Promise((r) => setTimeout(r, 1000));
      await this.scenario.screenshot();
      return new AnalyticsPostPage(this.scenario);
    }

    return null;
  }

  async goToEditPost(postTitle) {

    let listOfPosts = await this.getListOfPosts();

    let position = -1;
    for (let i = 0; i < listOfPosts.length; i++) {
      if(listOfPosts[i].title === postTitle) {

        position = i;
        break;
      }
    }

    if(position > -1) {

      var elements = await this.scenario.getPage().locator(`li[class='gh-list-row gh-posts-list-item gh-post-list-plain-status']`).all();    
      await elements[position].click();
      await new Promise((r) => setTimeout(r, 1000));
      await this.scenario.screenshot();
      return new CreateEditPostPage(this.scenario);
    }

    return null;
  }
};