const playwright = require("playwright");
const { SignUpPage } = require("./page_objects/sign_up_page");
const { createTag, editTag, deleteTag, createTagWithMetadata, createTagWithXCardValues } = require("./test_scenarios/tag");
const { settingsEditTitleAndDescription, settingsEditTimezone, settingsEditGeneralLanguage, settingsEditMetaData, settingsEditXCardData, settingsEditFacebookData } = require("./test_scenarios/settings");
const { createPage, editPage, previewPage, filterDraftPages, deletePage} = require("./test_scenarios/page");
const { createMember, editMember, deleteMember, createMemberMemberWithInvalidEmail, filterMember } = require("./test_scenarios/members");
const { listPosts, createPost, analyticPost, editPost, deletePost } = require("./test_scenarios/post");
const { tagInput } = require("./input_data/tag_input_data");
const { settingsInput } = require("./input_data/settings_input_data");

(async () => {
  const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();

  const signUpPage = new SignUpPage(page);

  await signUpPage.goto();
  await signUpPage.fillForm("title", "fullname", "alguien@hotmail.com", "123456#213asdf");
  await browser.close();
  
  // Scenario 61 - Create Tag Random Values
  await createTag(tagInput.createTagRandomValues(), "061 - Create Tag Random Values");

  // Scenario 62 - Create Tag Dynamic Values
  await createTag(await tagInput.createTagDynamicValues(), "062 - Create Tag Dynamic Values");

  // Scenario 63 - Create Tag Priori Values
  await createTag(tagInput.createTagPrioriValues(), "063 - Create Tag Priori Values");

  // Scenario 64 - Edit Tag Random Values
  await editTag(tagInput.editTagRandomValues(), "064 - Edit Tag Random Values");

  // Scenario 65 - Edit Tag Dynamic Values
  await editTag(await tagInput.editTagDynamicValues(), "065 - Edit Tag Dynamic Values");

  // Scenario 66 - Edit Tag Priori Values
  await editTag(tagInput.editTagPrioriValues(), "066 - Edit Tag Priori Values");

  // Scenario 67 - Delete Tag Random Values
  await deleteTag(tagInput.createTagRandomValues(), "067 - Delete Tag Random Values");

  // Scenario 68 - Delete Tag Dynamic Values
  await deleteTag(await tagInput.createTagDynamicValues(), "068 - Delete Tag Dynamic Values");

  // Scenario 69 - Delete Tag Priori Values
  await deleteTag(tagInput.createTagPrioriValues(), "069 - Delete Tag Priori Values");

  // Scenario 70 - Create Tag With Metadata Random Values
  await createTagWithMetadata(tagInput.createTagRandomValues(), "070 - Create Tag With Metadata Random Values");

  // Scenario 71 - Create Tag With Metadata Dynamic Values
  await createTagWithMetadata(await tagInput.createTagDynamicValues(), "071 - Create Tag With Metadata Dynamic Values");

  // Scenario 72 - Create Tag With Metadata Priori Values
  await createTagWithMetadata(tagInput.createTagPrioriValues(), "072 - Create Tag With Metadata Priori Values");

  // Scenario 73 - Create Tag With X Card Random Values
  await createTagWithXCardValues(tagInput.createTagRandomValues(), "073 - Create Tag With X Card Random Values");

  // Scenario 74 - Create Tag With X Card Dynamic Values
  await createTagWithXCardValues(await tagInput.createTagDynamicValues(), "074 - Create Tag With X Card Dynamic Values");

  // Scenario 75 - Create Tag With X Card Priori Values
  await createTagWithXCardValues(tagInput.createTagPrioriValues(), "075 - Create Tag With X Card Priori Values");  

  // Scenario 76 - Settings - Set General Title and Description Random Values
  await settingsEditTitleAndDescription(settingsInput.getRandomValues(), "076 - Settings - Set General Title and Description Random Values");

  // Scenario 77 - Settings - Set General Title and Description Dynamic Values
  await settingsEditTitleAndDescription(await settingsInput.getDynamicValues(), "077 - Settings - Set General Title and Description Dynamic Values");

  // Scenario 78 - Settings - Set General Title and Description Priori Values
  await settingsEditTitleAndDescription(settingsInput.getPrioriValues(), "078 - Settings - Set General Title and Description Priori Values");

  // Scenario 79 - Settings - Set General Language Random Values
  await settingsEditGeneralLanguage(settingsInput.getRandomValues(), "079 - Settings - Set General Language Random Values");

  // Scenario 80 - Settings - Set General Language Dynamic Values
  await settingsEditGeneralLanguage(await settingsInput.getDynamicValues(), "080 - Settings - Set General Language Dynamic Values");

  // Scenario 81 - Settings - Set General Language Priori Values
  await settingsEditGeneralLanguage(settingsInput.getPrioriValues(), "081 - Settings - Set General Language Priori Values");

  // Scenario 82 - Settings - Edit Meta Data Random Values
  await settingsEditMetaData(settingsInput.getRandomValues(), "082 - Settings - Edit Meta Data Random Values");

  // Scenario 83 - Settings - Edit Meta Data Dynamic Values
  await settingsEditMetaData(await settingsInput.getDynamicValues(), "083 - Settings - Edit Meta Data Dynamic Values");

  // Scenario 84 - Settings - Edit Meta Data Priori Values
  await settingsEditMetaData(settingsInput.getPrioriValues(), "084 - Settings - Edit Meta Data Priori Values");

  // Scenario 85 - Settings - Edit X Card Data Random Values
  await settingsEditXCardData(settingsInput.getRandomValues(), "085 - Settings - Edit X Card Data Random Values");

  // Scenario 86 - Settings - Edit X Card Data Dynamic Values
  await settingsEditXCardData(await settingsInput.getDynamicValues(), "086 - Settings - Edit X Card Data Dynamic Values");

  // Scenario 87 - Settings - Edit X Card Data Priori Values
  await settingsEditXCardData(settingsInput.getPrioriValues(), "087 - Settings - Edit X Card Data Priori Values");

  // Scenario 88 - Settings - Edit Facebook Data Random Values
  await settingsEditFacebookData(settingsInput.getRandomValues(), "088 - Settings - Edit Facebook Data Random Values");

  // Scenario 89 - Settings - Edit Facebook Data Dynamic Values
  await settingsEditFacebookData(await settingsInput.getDynamicValues(), "089 - Settings - Edit Facebook Data Dynamic Values");

  // Scenario 90 - Settings - Edit Facebook Data Priori Values
  await settingsEditFacebookData(settingsInput.getPrioriValues(), "090 - Settings - Edit Facebook Data Priori Values");
  
})();