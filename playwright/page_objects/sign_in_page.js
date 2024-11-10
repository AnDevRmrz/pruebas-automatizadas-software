const { Dashboard } = require("./dashboard");

exports.SignInPage = class SignInPage {
  
  constructor(page) {
    this.page = page;
    this.emailAddressInput = page.locator('#identification');
    this.passwordInput = page.locator('#password');
    this.signInButton = page.locator('#ember5');
  }

  async goto() {
    await this.page.goto('http://localhost:3002/ghost/#/signin');
    await new Promise(r => setTimeout(r, 1000));
  }

  async signIn(emailAddress, password) {

    await this.emailAddressInput.fill(emailAddress);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
    await new Promise(r => setTimeout(r, 1000));
    return new Dashboard(this.page);
  }

};