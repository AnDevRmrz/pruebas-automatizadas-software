const playwright = require("playwright");
const { SignUpPage } = require("./playwright/page_objects/sign_up_page");
const { CreatePage_ValidData_JSON, CreatePage_InvalidData_JSON, EditPage_ValidData_JSON, EditPage_InvalidData_JSON, PreviewPage_ValidData_JSON, FilterDraftPages_ValidData_JSON, FilterDraftPages_InvalidData_JSON, DeletePage_ValidData_JSON, PreviewPage_ButtonValidData_JSON, PreviewPage_ButtonInvalidData_JSON} = require("./playwright/input_data/page_input_data");
const { createTag, editTag, deleteTag, createTagWithMetadata, createTagWithXCardValues, createTagWithHugeTitle, createTagWithHugeDescription } = require("./playwright/test_scenarios/tag");
const { settingsEditTitleAndDescription, settingsEditGeneralLanguage, settingsEditMetaData, settingsEditXCardData, settingsEditFacebookData, settingsEditGeneralLanguageHugeValue } = require("./playwright/test_scenarios/settings");
const { createMember, createMemberWithInvalidEmail, createMemberWithEmptyEmail, createMemberWithTooLongNote, createMemberWithTooLongName, editMember, editMemberWithEmptyEmail, editMemberWithInvalidEmail, editMemberWithTooLongNote, editMemberWithTooLongName } = require("./playwright/test_scenarios/members");
const { createPost, editPost, deletePost, createPostWithLongTitle, editPostWithLongTitle, createPostWithLongExcerpt, editPostWithLongExcerpt } = require("./playwright/test_scenarios/post");
const { postInput } = require("./playwright/input_data/post_input_data");
const { tagInput } = require("./playwright/input_data/tag_input_data");
const { settingsInput } = require("./playwright/input_data/settings_input_data");
const { membersInput } = require("./playwright/input_data/member_input_data");

(async () => {

  const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50, channel:'chrome'});
  const context = await browser.newContext();
  const page = await context.newPage();
  const signUpPage = new SignUpPage(page);
  await signUpPage.goto();
  await signUpPage.fillForm("title", "fullname", "alguien@hotmail.com", "123456#213asdf");
  await browser.close();

  // Scenario 21
  //await createPost(postInput.generatePostAPriori(),"021 Create Post - A-priori Data Pool");
  // // Scenario 22
  // await editPost(postInput.generatePostAPriori(), postInput.generatePostAPriori(),"022 Edit Post - A-priori Data Pool");
  // // Scenario 23
  // await deletePost(postInput.generatePostAPriori(),"023 Delete Post - A-priori Data Pool");
  // // Scenario 24
  // await createPostWithLongTitle(postInput.generatePostWithLongTitleAPriori(),"024 Create Post With a Title Longer Than 255 Characters - A-priori Data Pool");
  // // Scenario 25
  // await editPostWithLongTitle(postInput.generatePostAPriori(), postInput.generatePostWithLongTitleAPriori(),"025 Edit Post With a Title Longer Than 255 Characters -A-priori Data Pool");
  // // Scenario 26
  // await createPostWithLongExcerpt(postInput.generatePostWithLongExcerptAPriori(),"026 Create Post With a Excerpt Longer Than 300 Characters - A-priori Data Pool");  
  // // Scenario 27
  // await editPostWithLongExcerpt(postInput.generatePostAPriori(), postInput.generatePostWithLongExcerptAPriori(), "027 Edit Post With a Excerpt Longer Than 300 Characters - A-priori Data Pool");
  // // Scenario 28 - Create Tag With Huge Title - A-priori Data Pool
  // await createTagWithHugeTitle(tagInput.createTagHugePrioriValues(), "028 - Create Tag With Huge Title - A-priori Data Pool");
  // // Scenario 29 - Create Tag With Huge Description - A-priori Data Pool
  // await createTagWithHugeDescription(tagInput.createTagHugePrioriValues(), "029 - Create Tag With Huge Description - A-priori Data Pool");
  // // Scenario 30 - Settings - Set General Language With Huge Value - A-priori Data Pool
  // await settingsEditGeneralLanguageHugeValue(settingsInput.getHugeLanguagePrioriValue(), "030 - Settings - Set General Language With Huge Value - A-priori Data Pool");
  // // Scenario 51
  // await CreatePage_ValidData_JSON();
  // // Scenario 52
  // await CreatePage_InvalidData_JSON();
  // // Scenario 53
  // await EditPage_ValidData_JSON();
  // // Scenario 54
  // await EditPage_InvalidData_JSON();
  // // Scenario 55
  // await PreviewPage_ValidData_JSON();
  // // Scenario 56
  // await PreviewPage_ButtonValidData_JSON();
  // // Scenario 57
  // await PreviewPage_ButtonInvalidData_JSON();
  // // Scenario 58
  // await FilterDraftPages_ValidData_JSON();
  // // Scenario 59
  // await FilterDraftPages_InvalidData_JSON();
  // // Scenario 60
  // await DeletePage_ValidData_JSON();
  //   // Scenario 63 - Create Tag - A-priori Data Pool
  // await createTag(tagInput.createTagPrioriValues(), "063 - Create Tag - A-priori Data Pool");
  // // Scenario 66 - Edit Tag - A-priori Data Pool
  // await editTag(tagInput.editTagPrioriValues(), "066 - Edit Tag - A-priori Data Pool");
  // // Scenario 69 - Delete Tag - A-priori Data Pool
  // await deleteTag(tagInput.createTagPrioriValues(), "069 - Delete Tag - A-priori Data Pool");
  // // Scenario 72 - Create Tag With Metadata - A-priori Data Pool
  // await createTagWithMetadata(tagInput.createTagPrioriValues(), "072 - Create Tag With Metadata - A-priori Data Pool");
  // // Scenario 75 - Create Tag With X Card - A-priori Data Pool
  // await createTagWithXCardValues(tagInput.createTagPrioriValues(), "075 - Create Tag With X Card - A-priori Data Pool");  
  // // Scenario 78 - Settings - Set General Title and Description - A-priori Data Pool
  // await settingsEditTitleAndDescription(settingsInput.getPrioriValues(), "078 - Settings - Set General Title and Description - A-priori Data Pool");
  // // Scenario 81 - Settings - Set General Language - A-priori Data Pool
  // await settingsEditGeneralLanguage(settingsInput.getPrioriValues(), "081 - Settings - Set General Language - A-priori Data Pool");
  // // Scenario 84 - Settings - Edit Meta Data - A-priori Data Pool
  // await settingsEditMetaData(settingsInput.getPrioriValues(), "084 - Settings - Edit Meta Data - A-priori Data Pool");
  // // Scenario 87 - Settings - Edit X Card Data - A-priori Data Pool
  // await settingsEditXCardData(settingsInput.getPrioriValues(), "087 - Settings - Edit X Card Data - A-priori Data Pool");
  // // Scenario 90 - Settings - Edit Facebook Data - A-priori Data Pool
  // await settingsEditFacebookData(settingsInput.getPrioriValues(), "090 - Settings - Edit Facebook Data - A-priori Data Pool");
  // // Scenario 93 - Create Member - A-priori Data Pool
  // await createMember(membersInput.getMemberAPriori(), "093 - Create Member - A-priori Data Pool");
  // // Scenario 96 - Create Member With Empty Email - A-priori Data Pool
  // await createMemberWithEmptyEmail(membersInput.getMemberEmptyEmailAPriori(), "096 - Create Member With Empty Email - A-priori Data Pool");
  // // Scenario 99 - Create Member With Invalid Email - A-priori Data Pool
  // await createMemberWithInvalidEmail(membersInput.getMemberInvalidEmailAPriori(), "099 - Create Member With Invalid Email - A-priori Data Pool");
  // // Scenario 102 - Create Member With Note Longer Than 500 Characters - A-priori Data Pool
  // await createMemberWithTooLongNote(membersInput.getMemberTooLongNoteAPriori(), "102 - Create Member With Note Longer Than 500 Characters - A-priori Data Pool");
  // // Scenario 105 - Create Member With Name Longer Than 191 Characters - A-priori Data Pool
  // await createMemberWithTooLongName(membersInput.getMemberTooLongNameAPriori(), "105 - Create Member With Name Longer Than 191 Characters - A-priori Data Pool");
  // // Scenario 108 - Edit Member - A-priori Data Pool
  // await editMember(membersInput.getMemberAPriori(), membersInput.getMemberAPriori(), "108 - Edit Member - A-priori Data Pool");
  // // Scenario 111 - Edit Member With Empty Email - A-priori Data Pool
  // await editMemberWithEmptyEmail(membersInput.getMemberAPriori(), membersInput.getMemberEmptyEmailAPriori(), "111 - Edit Member With Empty Email - A-priori Data Pool");
  // // Scenario 114 - Edit Member With Invalid Email - A-priori Data Pool
  // await editMemberWithInvalidEmail(membersInput.getMemberAPriori(), membersInput.getMemberInvalidEmailAPriori(), "114 - Edit Member With Invalid Email - A-priori Data Pool");
  // // Scenario 117 - Edit Member With Note Longer Than 500 Characters - A-priori Data Pool
  // await editMemberWithTooLongNote(membersInput.getMemberAPriori(), membersInput.getMemberTooLongNoteAPriori(), "117 - Edit Member With Note Longer Than 500 Characters - A-priori Data Pool");
  // // Scenario 120 - Edit Member With Name Longer Than 191 Characters - A-priori Data Pool
  // await editMemberWithTooLongName(membersInput.getMemberAPriori(), membersInput.getMemberTooLongNameAPriori(), "120 - Edit Member With Name Longer Than 191 Characters - A-priori Data Pool");
})();