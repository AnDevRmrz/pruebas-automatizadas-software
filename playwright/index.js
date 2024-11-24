const playwright = require("playwright");
const { SignUpPage } = require("./page_objects/sign_up_page");
const { createTag, editTag, deleteTag, createTagWithMetadata, createTagWithXCardValues } = require("./test_scenarios/tag");
const { settingsEditTitleAndDescription, settingsEditTimezone, settingsEditGeneralLanguage, settingsEditMetaData, settingsEditXCardData, settingsEditFacebookData } = require("./test_scenarios/settings");
const { createPage, editPage, previewPage, filterDraftPages, deletePage} = require("./test_scenarios/page");
const { createMember, createMemberWithInvalidEmail, createMemberWithEmptyEmail, createMemberWithTooLongNote, createMemberWithTooLongName, editMember, editMemberWithEmptyEmail, editMemberWithInvalidEmail, editMemberWithTooLongNote, editMemberWithTooLongName } = require("./test_scenarios/members");
const { listPosts, createPost, analyticPost, editPost, deletePost } = require("./test_scenarios/post");
const { tagInput } = require("./input_data/tag_input_data");
const { settingsInput } = require("./input_data/settings_input_data");
const { membersInput } = require("./input_data/member_input_data");

(async () => {
  const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();

  const signUpPage = new SignUpPage(page);

  await signUpPage.goto();
  await signUpPage.fillForm("title", "fullname", "alguien@hotmail.com", "123456#213asdf");
  await browser.close();
  
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
  
  // Scenario 91 - Create Member - Random Data
  await createMember(membersInput.getMemberRandom(), "091 - Create Member - Random Data");

  // Scenario 92 - Create Member - Pseudo Random Data Pool
  await createMember(await membersInput.getMemberPseudoRandom(), "092 - Create Member - Pseudo Random Data Pool");

  // Scenario 93 - Create Member - A-priori Data Pool
  await createMember(membersInput.getMemberAPriori(), "093 - Create Member - A-priori Data Pool");

  // Scenario 94 - Create Member With Empty Email - Random Data
  await createMemberWithEmptyEmail(membersInput.getMemberEmptyEmailRandom(), "094 - Create Member With Empty Email - Random Data");

  // Scenario 95 - Create Member With Empty Email - Pseudo Random Data Pool
  await createMemberWithEmptyEmail(await membersInput.getMemberEmptyEmailPseudoRandom(), "095 - Create Member With Empty Email - Pseudo Random Data Pool");

  // Scenario 96 - Create Member With Empty Email - A-priori Data Pool
  await createMemberWithEmptyEmail(membersInput.getMemberEmptyEmailAPriori(), "096 - Create Member With Empty Email - A-priori Data Pool");

  // Scenario 97 - Create Member With Invalid Email - Random Data
  await createMemberWithInvalidEmail(membersInput.getMemberInvalidEmailRandom(), "097 - Create Member With Invalid Email - Random Data");

  // Scenario 98 - Create Member With Invalid Email - Pseudo Random Data Pool
  await createMemberWithInvalidEmail(await membersInput.getMemberInvalidEmailPseudoRandom(), "098 - Create Member With Invalid Email - Pseudo Random Data Pool");

  // Scenario 99 - Create Member With Invalid Email - A-priori Data Pool
  await createMemberWithInvalidEmail(membersInput.getMemberInvalidEmailAPriori(), "099 - Create Member With Invalid Email - A-priori Data Pool");

  // Scenario 100 - Create Member With Note Longer Than 500 Characters - Random Data
  await createMemberWithTooLongNote(membersInput.getMemberTooLongNoteRandom(), "100 - Create Member With Note Longer Than 500 Characters - Random Data");

  // Scenario 101 - Create Member With Note Longer Than 500 Characters - Pseudo Random Data Pool
  await createMemberWithTooLongNote(await membersInput.getMemberTooLongNotePseudoRandom(), "101 - Create Member With Note Longer Than 500 Characters - Pseudo Random Data Pool");

  // Scenario 102 - Create Member With Note Longer Than 500 Characters - A-priori Data Pool
  await createMemberWithTooLongNote(membersInput.getMemberTooLongNoteAPriori(), "102 - Create Member With Note Longer Than 500 Characters - A-priori Data Pool");

  // Scenario 103 - Create Member With Name Longer Than 191 Characters - Random Data
  await createMemberWithTooLongName(membersInput.getMemberTooLongNameRandom(), "103 - Create Member With Name Longer Than 191 Characters - Random Data");

  // Scenario 104 - Create Member With Name Longer Than 191 Characters - Pseudo Random Data Pool
  await createMemberWithTooLongName(await membersInput.getMemberTooLongNamePseudoRandom(), "104 - Create Member With Name Longer Than 191 Characters - Pseudo Random Data Pool");

  // Scenario 105 - Create Member With Name Longer Than 191 Characters - A-priori Data Pool
  await createMemberWithTooLongName(membersInput.getMemberTooLongNameAPriori(), "105 - Create Member With Name Longer Than 191 Characters - A-priori Data Pool");

  // Scenario 106 - Edit Member - Random Data
  await editMember(membersInput.getMemberRandom(), membersInput.getMemberRandom(), "106 - Edit Member - Random Data");

  // Scenario 107 - Edit Member - Pseudo Random Data Pool
  await editMember(await membersInput.getMemberPseudoRandom(), await membersInput.getMemberPseudoRandom(), "107 - Edit Member - Pseudo Random Data Pool");

  // Scenario 108 - Edit Member - A-priori Data Pool
  await editMember(membersInput.getMemberAPriori(), membersInput.getMemberAPriori(), "108 - Edit Member - A-priori Data Pool");

  // Scenario 109 - Edit Member With Empty Email - Random Data
  await editMemberWithEmptyEmail(membersInput.getMemberRandom(), membersInput.getMemberEmptyEmailRandom(), "109 - Edit Member With Empty Email - Random Data");

  // Scenario 110 - Edit Member With Empty Email - Pseudo Random Data Pool
  await editMemberWithEmptyEmail(await membersInput.getMemberPseudoRandom(), await membersInput.getMemberEmptyEmailPseudoRandom(), "110 - Edit Member With Empty Email - Pseudo Random Data Pool");

  // Scenario 111 - Edit Member With Empty Email - A-priori Data Pool
  await editMemberWithEmptyEmail(membersInput.getMemberAPriori(), membersInput.getMemberEmptyEmailAPriori(), "111 - Edit Member With Empty Email - A-priori Data Pool");

  // Scenario 112 - Edit Member With Invalid Email - Random Data
  await editMemberWithInvalidEmail(membersInput.getMemberRandom(), membersInput.getMemberInvalidEmailRandom(), "112 - Edit Member With Invalid Email - Random Data");

  // Scenario 113 - Edit Member With Invalid Email - Pseudo Random Data Pool
  await editMemberWithInvalidEmail(await membersInput.getMemberPseudoRandom(), await membersInput.getMemberInvalidEmailPseudoRandom(), "113 - Edit Member With Invalid Email - Pseudo Random Data Pool");

  // Scenario 114 - Edit Member With Invalid Email - A-priori Data Pool
  await editMemberWithInvalidEmail(membersInput.getMemberAPriori(), membersInput.getMemberInvalidEmailAPriori(), "114 - Edit Member With Invalid Email - A-priori Data Pool");

  // Scenario 115 - Edit Member With Note Longer Than 500 Characters - Random Data
  await editMemberWithTooLongNote(membersInput.getMemberRandom(), membersInput.getMemberTooLongNoteRandom(), "115 - Edit Member With Note Longer Than 500 Characters - Random Data");

  // Scenario 116 - Edit Member With Note Longer Than 500 Characters - Pseudo Random Data Pool
  await editMemberWithTooLongNote(await membersInput.getMemberPseudoRandom(), await membersInput.getMemberTooLongNotePseudoRandom(), "116 - Edit Member With Note Longer Than 500 Characters - Pseudo Random Data Pool");

  // Scenario 117 - Edit Member With Note Longer Than 500 Characters - A-priori Data Pool
  await editMemberWithTooLongNote(membersInput.getMemberAPriori(), membersInput.getMemberTooLongNoteAPriori(), "117 - Edit Member With Note Longer Than 500 Characters - A-priori Data Pool");

  // Scenario 118 - Edit Member With Name Longer Than 191 Characters - Random Data
  await editMemberWithTooLongName(membersInput.getMemberRandom(), membersInput.getMemberTooLongNameRandom(), "118 - Edit Member With Name Longer Than 191 Characters - Random Data");

  // Scenario 119 - Edit Member With Name Longer Than 191 Characters - Pseudo Random Data Pool
  await editMemberWithTooLongName(await membersInput.getMemberPseudoRandom(), await membersInput.getMemberTooLongNamePseudoRandom(), "119 - Edit Member With Name Longer Than 191 Characters - Pseudo Random Data Pool");

  // Scenario 120 - Edit Member With Name Longer Than 191 Characters - A-priori Data Pool
  await editMemberWithTooLongName(membersInput.getMemberAPriori(), membersInput.getMemberTooLongNameAPriori(), "120 - Edit Member With Name Longer Than 191 Characters - A-priori Data Pool");
})();