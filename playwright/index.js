const playwright = require("playwright");
const { SignUpPage } = require("./page_objects/sign_up_page");
const { createTag, editTag, deleteTag, createTagWithMetadata, createTagWithXCardValues } = require("./test_scenarios/tag");
const { settingsEditTitleAndDescription, settingsEditTimezone } = require("./test_scenarios/settings");
const { createPage, editPage, previewPage, filterDraftPages, deletePage} = require("./test_scenarios/page");
const { createMember, editMember, deleteMember, createMemberMemberWithInvalidEmail, filterMember } = require("./test_scenarios/members");
const { listPosts, createPost, analyticPost, editPost, deletePost } = require("./test_scenarios/post");
const { tagInput } = require("./input_data/tag_input_data");

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
  
  // // Scenario 61 - Create Tag Random Values
  // await createTag(tagInput.createTagRandomValues(), "061 - Create Tag Random Values");

  // // Scenario 62 - Create Tag Dynamic Values
  // await createTag(tagInput.createTagDynamicValues(), "062 - Create Tag Dynamic Values");

  // // Scenario 63 - Create Tag Priori Values
  // await createTag(tagInput.createTagPrioriValues(), "063 - Create Tag Priori Values");

  // // Scenario 64 - Edit Tag Random Values
  // await editTag(tagInput.editTagRandomValues(), "064 - Edit Tag Random Values");

  // // Scenario 65 - Edit Tag Dynamic Values
  // await editTag(tagInput.editTagDynamicValues(), "065 - Edit Tag Dynamic Values");

  // // Scenario 66 - Edit Tag Priori Values
  // await editTag(tagInput.editTagPrioriValues(), "066 - Edit Tag Priori Values");

  // // Scenario 67 - Delete Tag Random Values
  // await deleteTag(tagInput.createTagRandomValues(), "067 - Delete Tag Random Values");

  // // Scenario 68 - Delete Tag Dynamic Values
  // await deleteTag(tagInput.createTagDynamicValues(), "068 - Delete Tag Dynamic Values");

  // // Scenario 69 - Delete Tag Priori Values
  // await deleteTag(tagInput.createTagPrioriValues(), "069 - Delete Tag Priori Values");

  // // Scenario 70 - Create Tag With Metadata Random Values
  // await createTagWithMetadata(tagInput.createTagRandomValues(), "070 - Create Tag With Metadata Random Values");

  // // Scenario 71 - Create Tag With Metadata Dynamic Values
  // await createTagWithMetadata(tagInput.createTagDynamicValues(), "071 - Create Tag With Metadata Dynamic Values");

  // // Scenario 72 - Create Tag With Metadata Priori Values
  // await createTagWithMetadata(tagInput.createTagPrioriValues(), "072 - Create Tag With Metadata Priori Values");

  // // Scenario 73 - Create Tag With X Card Random Values
  // await createTagWithXCardValues(tagInput.createTagRandomValues(), "073 - Create Tag With X Card Random Values");

  // // Scenario 74 - Create Tag With X Card Dynamic Values
  // await createTagWithXCardValues(tagInput.createTagDynamicValues(), "074 - Create Tag With X Card Dynamic Values");

  // // Scenario 75 - Create Tag With X Card Priori Values
  // await createTagWithXCardValues(tagInput.createTagPrioriValues(), "075 - Create Tag With X Card Priori Values");

  // // Scenario 17 - Edit Tag
  //  await editTag();
  // // Scenario 18 - Delete Tag
  //  await deleteTag();
  // // Scenario 19 - Settings - set title and description
  //  await settingsEditTitleAndDescription();
  // // Scenario 20 - Settings - set site timezone
  //  await settingsEditTimezone();

})();