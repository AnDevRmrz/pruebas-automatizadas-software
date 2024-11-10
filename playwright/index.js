const playwright = require("playwright");
const { SignUpPage } = require("./page_objects/sign_up_page");
const { createTag, editTag, deleteTag } = require("./test_scenarios/tag");
const { settingsEditTitleAndDescription, settingsEditTimezone } = require("./test_scenarios/settings");
const { createPage } = require("./test_scenarios/page");

(async () => {
  const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();

  const signUpPage = new SignUpPage(page);

  await signUpPage.goto();
  await signUpPage.fillForm("title", "fullname", "alguien@hotmail.com", "123456#213asdf");
  await browser.close();

  await createPage();

  // Scenario 17
  await createTag();

  // Scenario 18
  await editTag();

  // Scenario 19
  await deleteTag();

  // Scenario 20
  await settingsEditTitleAndDescription();

  // Scenario 21
  await settingsEditTimezone();
})();