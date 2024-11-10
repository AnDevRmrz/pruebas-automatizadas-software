const playwright = require("playwright");
const { SignUpPage } = require("./page_objects/sign_up_page");
const { createTag } = require("./test_scenarios/tag");
const {createPage} = require("./test_scenarios/page");
 
(async () => {
  const browser = await playwright["chromium"].launch({ headless: false, slowMo: 500});
  const context = await browser.newContext();
  const page = await context.newPage();

  const signUpPage = new SignUpPage(page);

  await signUpPage.goto();
  await signUpPage.fillForm("title", "fullname", "alguien@hotmail.com", "123456#213asdf");
  await browser.close();

  //await createTag();
  await createPage();
})();