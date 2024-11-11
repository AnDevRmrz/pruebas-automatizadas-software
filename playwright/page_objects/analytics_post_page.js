exports.AnalyticsPostPage = class AnalyticsPostPage {

  constructor(scenario) {
    this.scenario = scenario;
    this.postTitleLabel = scenario.getPage().locator("h2[class='gh-canvas-title gh-post-title']");
  }

  async getPostTitle() {

    let postTitle = await this.postTitleLabel.innerText();
    return postTitle;
  }  
};
