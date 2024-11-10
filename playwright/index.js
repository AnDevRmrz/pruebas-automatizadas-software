const playwright = require("playwright");
const { SignUpPage } = require("./page_objects/sign_up_page");
const { createTag, editTag, deleteTag } = require("./test_scenarios/tag");
const { settingsEditTitleAndDescription, settingsEditTimezone } = require("./test_scenarios/settings");

(async () => {
  const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();

  const signUpPage = new SignUpPage(page);

  await signUpPage.goto();
  await signUpPage.fillForm("title", "fullname", "alguien@hotmail.com", "123456#213asdf");
  await browser.close();

  // Scenario 16 - Create Tag
  await createTag();

  // Scenario 17 - Edit Tag
  await editTag();

  // Scenario 18 - Delete Tag
  await deleteTag();

  // Scenario 19 - Settings - set title and description
  await settingsEditTitleAndDescription();

  // Scenario 20 - Settings - set site timezone
  await settingsEditTimezone();
})();