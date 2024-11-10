const playwright = require("playwright");
const { SignUpPage } = require("./page_objects/sign_up_page");
const { createTag, editTag, deleteTag } = require("./test_scenarios/tag");
const { settingsEditTitleAndDescription, settingsEditTimezone } = require("./test_scenarios/settings");
const { createMember, editMember, deleteMember, createMemberMemberWithInvalidEmail, filterMember } = require("./test_scenarios/members");

(async () => {
  const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();

  const signUpPage = new SignUpPage(page);

  await signUpPage.goto();
  await signUpPage.fillForm("title", "fullname", "alguien@hotmail.com", "123456#213asdf");
  await browser.close();

  // Scenario 11
  await createMember();
  // Scenario 12
  await editMember();
  // Scenario 13
  await deleteMember();
  // Scenario 14
  await createMemberMemberWithInvalidEmail();
  // Scenario 15
  await filterMember();
  
  await createTag();
  await editTag();
  await deleteTag();
  await settingsEditTitleAndDescription();
  await settingsEditTimezone();
})();