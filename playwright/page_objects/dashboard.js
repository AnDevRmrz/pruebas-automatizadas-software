exports.Dashboard = class Dashboard {
  
    constructor(page) {
      this.page = page;
      this.tagOption = page.locator('a[data-test-nav=tags]')[0];
    }
  
    async goto() {
      await this.page.goto('http://localhost:3002/ghost/#/setup');
      await new Promise(r => setTimeout(r, 2000));
    }
  
    async signIn(emailAddress, password) {
  
      await this.emailAddressInput.fill(emailAddress);
      await this.passwordInput.fill(password);
      await this.signInButton.click();
      await new Promise(r => setTimeout(r, 2000));
    }
  
  };