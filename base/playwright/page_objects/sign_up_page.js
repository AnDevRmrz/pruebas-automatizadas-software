exports.SignUpPage = class SignUpPage {
  
  constructor(page) {
    this.page = page;
    this.siteTitleInput = page.locator('#blog-title');
    this.fullNameInput = page.locator('#name');
    this.emailAddressInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.createAccountButton = page.locator('a[href*="setup/two"]').first();
    this.lastStepButton = page.locator('button[tabindex="5"]');
    this.takeMeToTheSiteButton = page.locator('button[class=gh-flow-skip]');
  }

  async goto() {
    await this.page.goto('http://localhost:3003/ghost/#/setup/one');
    await new Promise(r => setTimeout(r, 1000));
  }

  async fillForm(siteTitle, fullName, email, password) {

    await this.createAccountButton.click();
    await new Promise(r => setTimeout(r, 1000));

    await this.siteTitleInput.fill(siteTitle);
    await this.fullNameInput.fill(fullName);
    await this.emailAddressInput.fill(email);
    await this.passwordInput.fill(password);
    
    await this.lastStepButton.click();
    await new Promise(r => setTimeout(r, 1000));

    await this.takeMeToTheSiteButton.click();
    await new Promise(r => setTimeout(r, 1000));
  }

  async pageObjectModel() {
    await this.getStarted();
    await this.pomLink.click();
  }
};