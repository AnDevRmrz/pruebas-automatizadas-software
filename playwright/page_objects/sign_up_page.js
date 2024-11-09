exports.SignUpPage = class SignUpPage {
  
  constructor(page) {
    this.page = page;
    this.siteTitleInput = page.locator('#blog-title');
    this.fullNameInput = page.locator('#name');
    this.emailAddressInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.createAccountButton = page.locator('#ember4');
  }

  async goto() {
    await this.page.goto('http://localhost:3002/ghost/#/setup');
    await new Promise(r => setTimeout(r, 2000));
  }

  async fillForm(siteTitle, fullName, email, password) {

    await this.siteTitleInput.fill(siteTitle);
    await this.fullNameInput.fill(fullName);
    await this.emailAddressInput.fill(email);
    await this.passwordInput.fill(password);
    await this.createAccountButton.click();
    await new Promise(r => setTimeout(r, 2000));
  }

  async pageObjectModel() {
    await this.getStarted();
    await this.pomLink.click();
  }
};