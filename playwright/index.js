const playwright = require("playwright");
const { SignUpPage } = require("./page_objects/sign_up_page");

(async () => {
  const browser = await playwright["chromium"].launch({ headless: false, slowMo: 500});
  const context = await browser.newContext();
  const page = await context.newPage();

  const signUpPage = new SignUpPage(page);

  signUpPage.goto();
  signUpPage.fillForm("title", "fullname", "email@hotmail.com", "asdfasdfasdf");
})();
