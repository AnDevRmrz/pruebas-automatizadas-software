exports.ViewSite = class ViewSite {

  constructor(scenario) {
    this.scenario = scenario;
    this.emailAddressInput = scenario.getPage().locator('#identification');
    this.passwordInput = scenario.getPage().locator('#password');
    this.signInButton = scenario.getPage().locator('#ember5');
  }
}