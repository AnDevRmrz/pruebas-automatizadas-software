const playwright = require("playwright");
const { SignUpPage } = require("./page_objects/sign_up_page");
const { createTag, editTag, deleteTag, createTagWithMetadata, createTagWithXCardValues } = require("./test_scenarios/tag");
const { settingsEditTitleAndDescription, settingsEditTimezone, settingsEditGeneralLanguage, settingsEditMetaData, settingsEditXCardData, settingsEditFacebookData } = require("./test_scenarios/settings");
const { createPage, editPage, previewPage, filterDraftPages, deletePage} = require("./test_scenarios/page");
const { createMember, editMember, deleteMember, createMemberMemberWithInvalidEmail, filterMember } = require("./test_scenarios/members");
const { tagInput } = require("./input_data/tag_input_data");
const { postInput } = require("./input_data/post");
const { settingsInput } = require("./input_data/settings_input_data");

(async () => {
  const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();

  const signUpPage = new SignUpPage(page);

  await signUpPage.goto();
  await signUpPage.fillForm("title", "fullname", "alguien@hotmail.com", "123456#213asdf");
  await browser.close();

  // Scenario 1
  await createPostValidDataFaker(postInput.createPostValidDataFaker());

  // Scenario 2
  await createPostEmptyFieldsFaker(postInput.createPostEmptyFieldsFaker());

  // Scenario 3
  await createPostExceedingLimitsFaker(postInput.createPostExceedingLimitsFaker());

  // Scenario 4
  await editPostValidDataFaker(postInput.editPostValidDataFaker());

  // Scenario 5
  await editPostEmptyTitleFaker(postInput.editPostEmptyTitleFaker());

  // Scenario 6
  await editPostExceedingLimitsFaker(postInput.editPostExceedingLimitsFaker());

  // Scenario 7
  await editPostEmptyContentFaker(postInput.editPostEmptyContentFaker());

  // Scenario 8
  await deleteNewlyCreatedPostFaker(postInput.deleteNewlyCreatedPostFaker());

  // Scenario 9
  await deletePublishedPostFaker(postInput.deletePublishedPostFaker());

  // Scenario 10
  await deleteRandomGeneratedPostFaker(postInput.deleteRandomGeneratedPostFaker());

  // Scenario 11
  await createPostValidDataApi(postInput.createPostValidDataApi());

  // Scenario 12
  await createPostEmptyFieldsApi(postInput.createPostEmptyFieldsApi());

  // Scenario 13
  await createPostExceedingLimitsApi(postInput.createPostExceedingLimitsApi());

  // Scenario 14
  await editPostValidDataApi(postInput.editPostValidDataApi());

  // Scenario 15
  await editPostEmptyTitleApi(postInput.editPostEmptyTitleApi())

  // Scenario 16
  await editPostExceedingLimitsApi(postInput.editPostExceedingLimitsApi());

  // Scenario 17
  await editPostEmptyContentApi(postInput.editPostEmptyContentApi());

  // Scenario 18
  await deleteNewlyCreatedPostApi(postInput.deleteNewlyCreatedPostApi());

  // Scenario 19
  await deletePublishedPostApi(postInput.deletePublishedPostApi());

  // Scenario 20
  await deleteRandomGeneratedPostApi(postInput.deleteRandomGeneratedPostApi());

  // Scenario 21
  await createPostValidDataJson(postInput.createPostValidDataJson());

  // Scenario 22
  await createPostEmptyFieldsJson(postInput.createPostEmptyFieldsJson());

  // Scenario 23
  await createPostExceedingLimitsJson(postInput.createPostExceedingLimitsJson());

  // Scenario 24
  await editPostValidDataJson(postInput.editPostValidDataJson());

  // Scenario 25
  await editPostEmptyTitleJson(postInput.editPostEmptyTitleJson());

  // Scenario 26
  await editPostExceedingLimitsJson(postInput.editPostExceedingLimitsJson());

  // Scenario 27
  await editPostEmptyContentJson(postInput.editPostEmptyContentJson());

  // Scenario 28
  await deleteNewlyCreatedPostJson(postInput.deleteNewlyCreatedPostJson());

  // Scenario 29
  await deletePublishedPostJson(postInput.deletePublishedPostJson());

  // Scenario 30
  await deleteRandomGeneratedPostJson(postInput.deleteRandomGeneratedPostJson());
  
  // Scenario 61 - Create Tag - Random Data
  await createTag(tagInput.createTagRandomValues(), "061 - Create Tag - Random Data");

  // Scenario 62 - Create Tag - Pseudo Random Data Pool
  await createTag(await tagInput.createTagDynamicValues(), "062 - Create Tag - Pseudo Random Data Pool");

  // Scenario 63 - Create Tag - A-priori Data Pool
  await createTag(tagInput.createTagPrioriValues(), "063 - Create Tag - A-priori Data Pool");

  // Scenario 64 - Edit Tag - Random Data
  await editTag(tagInput.editTagRandomValues(), "064 - Edit Tag - Random Data");

  // Scenario 65 - Edit Tag - Pseudo Random Data Pool
  await editTag(await tagInput.editTagDynamicValues(), "065 - Edit Tag - Pseudo Random Data Pool");

  // Scenario 66 - Edit Tag - A-priori Data Pool
  await editTag(tagInput.editTagPrioriValues(), "066 - Edit Tag - A-priori Data Pool");

  // Scenario 67 - Delete Tag - Random Data
  await deleteTag(tagInput.createTagRandomValues(), "067 - Delete Tag - Random Data");

  // Scenario 68 - Delete Tag - Pseudo Random Data Pool
  await deleteTag(await tagInput.createTagDynamicValues(), "068 - Delete Tag - Pseudo Random Data Pool");

  // Scenario 69 - Delete Tag - A-priori Data Pool
  await deleteTag(tagInput.createTagPrioriValues(), "069 - Delete Tag - A-priori Data Pool");

  // Scenario 70 - Create Tag With Metadata - Random Data
  await createTagWithMetadata(tagInput.createTagRandomValues(), "070 - Create Tag With Metadata - Random Data");

  // Scenario 71 - Create Tag With Metadata - Pseudo Random Data Pool
  await createTagWithMetadata(await tagInput.createTagDynamicValues(), "071 - Create Tag With Metadata - Pseudo Random Data Pool");

  // Scenario 72 - Create Tag With Metadata - A-priori Data Pool
  await createTagWithMetadata(tagInput.createTagPrioriValues(), "072 - Create Tag With Metadata - A-priori Data Pool");

  // Scenario 73 - Create Tag With X Card - Random Data
  await createTagWithXCardValues(tagInput.createTagRandomValues(), "073 - Create Tag With X Card - Random Data");

  // Scenario 74 - Create Tag With X Card - Pseudo Random Data Pool
  await createTagWithXCardValues(await tagInput.createTagDynamicValues(), "074 - Create Tag With X Card - Pseudo Random Data Pool");

  // Scenario 75 - Create Tag With X Card - A-priori Data Pool
  await createTagWithXCardValues(tagInput.createTagPrioriValues(), "075 - Create Tag With X Card - A-priori Data Pool");  

  // Scenario 76 - Settings - Set General Title and Description - Random Data
  await settingsEditTitleAndDescription(settingsInput.getRandomValues(), "076 - Settings - Set General Title and Description - Random Data");

  // Scenario 77 - Settings - Set General Title and Description - Pseudo Random Data Pool
  await settingsEditTitleAndDescription(await settingsInput.getDynamicValues(), "077 - Settings - Set General Title and Description - Pseudo Random Data Pool");

  // Scenario 78 - Settings - Set General Title and Description - A-priori Data Pool
  await settingsEditTitleAndDescription(settingsInput.getPrioriValues(), "078 - Settings - Set General Title and Description - A-priori Data Pool");

  // Scenario 79 - Settings - Set General Language - Random Data
  await settingsEditGeneralLanguage(settingsInput.getRandomValues(), "079 - Settings - Set General Language - Random Data");

  // Scenario 80 - Settings - Set General Language - Pseudo Random Data Pool
  await settingsEditGeneralLanguage(await settingsInput.getDynamicValues(), "080 - Settings - Set General Language - Pseudo Random Data Pool");

  // Scenario 81 - Settings - Set General Language - A-priori Data Pool
  await settingsEditGeneralLanguage(settingsInput.getPrioriValues(), "081 - Settings - Set General Language - A-priori Data Pool");

  // Scenario 82 - Settings - Edit Meta Data - Random Data
  await settingsEditMetaData(settingsInput.getRandomValues(), "082 - Settings - Edit Meta Data - Random Data");

  // Scenario 83 - Settings - Edit Meta Data - Pseudo Random Data Pool
  await settingsEditMetaData(await settingsInput.getDynamicValues(), "083 - Settings - Edit Meta Data - Pseudo Random Data Pool");

  // Scenario 84 - Settings - Edit Meta Data - A-priori Data Pool
  await settingsEditMetaData(settingsInput.getPrioriValues(), "084 - Settings - Edit Meta Data - A-priori Data Pool");

  // Scenario 85 - Settings - Edit X Card Data - Random Data
  await settingsEditXCardData(settingsInput.getRandomValues(), "085 - Settings - Edit X Card Data - Random Data");

  // Scenario 86 - Settings - Edit X Card Data - Pseudo Random Data Pool
  await settingsEditXCardData(await settingsInput.getDynamicValues(), "086 - Settings - Edit X Card Data - Pseudo Random Data Pool");

  // Scenario 87 - Settings - Edit X Card Data - A-priori Data Pool
  await settingsEditXCardData(settingsInput.getPrioriValues(), "087 - Settings - Edit X Card Data - A-priori Data Pool");

  // Scenario 88 - Settings - Edit Facebook Data - Random Data
  await settingsEditFacebookData(settingsInput.getRandomValues(), "088 - Settings - Edit Facebook Data - Random Data");

  // Scenario 89 - Settings - Edit Facebook Data - Pseudo Random Data Pool
  await settingsEditFacebookData(await settingsInput.getDynamicValues(), "089 - Settings - Edit Facebook Data - Pseudo Random Data Pool");

  // Scenario 90 - Settings - Edit Facebook Data - A-priori Data Pool
  await settingsEditFacebookData(settingsInput.getPrioriValues(), "090 - Settings - Edit Facebook Data - A-priori Data Pool");
  
})();