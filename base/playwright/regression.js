const playwright = require("playwright");
const { SignUpPage } = require("./page_objects/sign_up_page");
const { createTag, editTag, deleteTag } = require("./test_scenarios/tag");
const { settingsEditTitleAndDescription, settingsEditTimezone } = require("./test_scenarios/settings");
const { createPage, deletePage} = require("./test_scenarios/page");
const { createMember } = require("./test_scenarios/members");
const { createPost, deletePost } = require("./test_scenarios/post");

(async () => {
  const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenarioToExcecute = process.argv.slice(2)[0];
  
  const signUpPage = new SignUpPage(page);

  await signUpPage.goto();
  await signUpPage.fillForm("title", "fullname", "alguien@hotmail.com", "123456#213asdf");
  await browser.close();

  await eval(`${scenarioToExcecute}()`);

})();