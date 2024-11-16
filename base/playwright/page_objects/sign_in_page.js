const { DashboardPage } = require("./dashboard_page");

exports.SignInPage = class SignInPage {
  
  constructor(scenario) {
    this.scenario = scenario;
    this.emailAddressInput = scenario.getPage().locator('#identification');
    this.passwordInput = scenario.getPage().locator('#password');
    this.signInButton = scenario.getPage().locator('#ember5');
  }

  async goto() {
    await this.scenario.getPage().goto('http://localhost:3002/ghost/#/signin');
    await new Promise(r => setTimeout(r, 1000));
  }

  async signIn(emailAddress, password) {

    await this.emailAddressInput.fill(emailAddress);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
    await new Promise(r => setTimeout(r, 1000));
    await this.scenario.screenshot();
    return new DashboardPage(this.scenario);
  }

};