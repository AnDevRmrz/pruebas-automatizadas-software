exports.ViewSitePage = class ViewSitePage {

  constructor(scenario) {
    this.scenario = scenario;    
  }

  async iframeLocator(selector) {

    let iframe = await this.scenario.getPage().frames();
    return await iframe[2].locator(selector);
  }

  async getTitleValue() {

    let titleElement = await this.iframeLocator("header a[class*='is-title']");    
    return await titleElement.innerText();
  }

  async getDescriptionValue() {

    let descriptionElement = await this.iframeLocator("section[class='gh-header is-classic has-image gh-outer'] h1");
    return await descriptionElement.innerText();
  }
}