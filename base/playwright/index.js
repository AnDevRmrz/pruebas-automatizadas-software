const playwright = require("playwright");
const { SignUpPage } = require("./page_objects/sign_up_page");
const { createTag, editTag, deleteTag } = require("./test_scenarios/tag");
const { settingsEditTitleAndDescription, settingsEditTimezone } = require("./test_scenarios/settings");
const { createPage, editPage, previewPage, filterDraftPages, deletePage} = require("./test_scenarios/page");
const { createMember, editMember, deleteMember, createMemberMemberWithInvalidEmail, filterMember } = require("./test_scenarios/members");
const { listPosts, createPost, analyticPost, editPost, deletePost } = require("./test_scenarios/post");

(async () => {
  const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();

  const signUpPage = new SignUpPage(page);

  await signUpPage.goto();
  await signUpPage.fillForm("title", "fullname", "alguien@hotmail.com", "123456#213asdf");
  await browser.close();

  // // Scenario 1
  // await listPosts();
  // // Scenario 2
  // await createPost();
  // // Scenario 3
  // await analyticPost();
  // // Scenario 4
  // await editPost();
  // // Scenario 5
  // await deletePost();

  // // Scenario 6
  // await createPage();
  // // Scenario 7
  // await editPage()
  // // Scenario 8
  // await previewPage()
  // // Scenario 9
  // await filterDraftPages()
  // // Scenario 10
  // await deletePage()

  // // Scenario 11
  //  await createMember();
  // // Scenario 12
  //  await editMember();
  // // Scenario 13
  //  await deleteMember();
  // // Scenario 14
  //  await createMemberMemberWithInvalidEmail();
  // // Scenario 15
  //  await filterMember();
  
  // // Scenario 16 - Create Tag
  //  await createTag();
  // // Scenario 17 - Edit Tag
  //  await editTag();
  // // Scenario 18 - Delete Tag
  //  await deleteTag();
  // // Scenario 19 - Settings - set title and description
  //  await settingsEditTitleAndDescription();
  // // Scenario 20 - Settings - set site timezone
  //  await settingsEditTimezone();

})();