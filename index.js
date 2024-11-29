const playwright = require("playwright");
const { SignUpPage } = require("./playwright/page_objects/sign_up_page");
const { createTag, editTag, deleteTag, createTagWithMetadata, createTagWithXCardValues, createTagWithHugeTitle, createTagWithHugeDescription } = require("./playwright/test_scenarios/tag");
const { settingsEditTitleAndDescription, settingsEditGeneralLanguage, settingsEditMetaData, settingsEditXCardData, settingsEditFacebookData, settingsEditGeneralLanguageHugeValue, settingsEditTimezone } = require("./playwright/test_scenarios/settings");
const { createMember, createMemberWithInvalidEmail, createMemberWithEmptyEmail, createMemberWithTooLongNote, createMemberWithTooLongName, editMember, editMemberWithEmptyEmail, editMemberWithInvalidEmail, editMemberWithTooLongNote, editMemberWithTooLongName } = require("./playwright/test_scenarios/members");
const { createPost, editPost, deletePost, createPostWithLongTitle, editPostWithLongTitle, createPostWithLongExcerpt, editPostWithLongExcerpt } = require("./playwright/test_scenarios/post");
const { createPage_ValidData, createPage_InvalidData, editPage_validData, editPage_InvalidData, previewPage_ValidData, filterDraftPages_ValidData, filterDraftPages_InvalidData, deletePage_ValidData, previewPage_ButtonValidData, previewPage_ButtonInvalidData } = require("./playwright/test_scenarios/page");
const { pageInput } = require("./playwright/input_data/page_input_data");
const { postInput } = require("./playwright/input_data/post_input_data");
const { tagInput } = require("./playwright/input_data/tag_input_data");
const { settingsInput } = require("./playwright/input_data/settings_input_data");
const { membersInput } = require("./playwright/input_data/member_input_data");
const { createVRTReport } = require('./vrt/report/report_generation');

(async () => {

  const part = process.argv[2];

  if (part == 1 || part == 2) {
    let browserName = part == 1 ? 'chromium' : 'firefox';

    const browser = await playwright[browserName].launch({ headless: false, slowMo: 50});
    const context = await browser.newContext();
    const page = await context.newPage();
    const signUpPage = new SignUpPage(page);
    await signUpPage.goto();
    await signUpPage.fillForm("title", "fullname", "alguien@hotmail.com", "123456#213asdf");
    await browser.close();

    // Scenario 01 - Create Post
    await createPost(postInput.generatePostAPriori(), "001 - Create Post", browserName);
    // Scenario 02 - Edit Post
    await editPost({ create: postInput.generatePostAPriori(), edit: postInput.generatePostAPriori() }, "002 - Edit Post", browserName);
    // Scenario 03 - Delete Post
    await deletePost(postInput.generatePostAPriori(), "003 - Delete Post", browserName);
    // Scenario 04 - Create Post With a Title Longer Than 255 Characters
    await createPostWithLongTitle(postInput.generatePostWithLongTitleAPriori(), "004 - Create Post With a Title Longer Than 255 Characters", browserName);
    // Scenario 05 - Edit Post With a Title Longer Than 255 Characters
    await editPostWithLongTitle({ create: postInput.generatePostAPriori(), edit: postInput.generatePostWithLongTitleAPriori() }, "005 - Edit Post With a Title Longer Than 255 Characters", browserName);
    // Scenario 06 - Create Post With a Excerpt Longer Than 300 Characters
    await createPostWithLongExcerpt(postInput.generatePostWithLongExcerptAPriori(), "006 - Create Post With a Excerpt Longer Than 300 Characters", browserName);  
    // Scenario 07 - Edit Post With a Excerpt Longer Than 300 Characters
    await editPostWithLongExcerpt({ create: postInput.generatePostAPriori(), edit: postInput.generatePostWithLongExcerptAPriori() }, "007 - Edit Post With a Excerpt Longer Than 300 Characters", browserName);
    // Scenario 08 - Create Tag With Huge Title
    await createTagWithHugeTitle(tagInput.createTagHugePrioriValues(), "008 - Create Tag With Huge Title", browserName);
    // Scenario 09 - Create Tag With Huge Description
    await createTagWithHugeDescription(tagInput.createTagHugePrioriValues(), "009 - Create Tag With Huge Description", browserName);
    // Scenario 10 - Settings - Set General Language With Huge Value
    await settingsEditGeneralLanguageHugeValue(settingsInput.getHugeLanguagePrioriValue(), "010 - Settings - Set General Language With Huge Value", browserName);
    // Scenario 11 - Create Page
    await createPage_ValidData(pageInput.getValueFromJSON(), "011 - Create Page", browserName);
    // Scenario 12 - Create Page Invalid Data
    await createPage_InvalidData(pageInput.getValueFromJSON(), "012 - Create Page Invalid Data", browserName);
    // Scenario 13 - Edit Page
    await editPage_validData({ create: pageInput.getValueFromJSON(), edit: pageInput.getValueFromJSON() }, "013 - Edit Page", browserName);
    // Scenario 14 - Edit Page Invalid Data
    await editPage_InvalidData({ create: pageInput.getValueFromJSON(), edit: pageInput.getValueFromJSON() }, "014 - Edit Page Invalid Data", browserName);
    // Scenario 15 - Preview Page
    await previewPage_ValidData(pageInput.getValueFromJSON(), "015 - Preview Page", browserName);
    // Scenario 16 - Preview Page Button
    await previewPage_ButtonValidData(pageInput.getValueFromJSON(), "016 - Preview Page Button", browserName);
    // Scenario 17 - Preview Page Button invalid Data
    await previewPage_ButtonInvalidData(pageInput.getValueFromJSON(), "017 - Preview Page Button invalid Data", browserName);
    // Scenario 18 - Filter Draft Page
    await filterDraftPages_ValidData(pageInput.getValueFromJSON(), "018 - Filter Draft Page", browserName);
    // Scenario 19 - Filter Draft Page Invalid Data
    await filterDraftPages_InvalidData(pageInput.getValueFromJSON(), "019 - Filter Draft Page Invalid Data", browserName);
    // Scenario 20 - Delete Page
    await deletePage_ValidData(pageInput.getValueFromJSON(), "020 - Delete Page", browserName);
    // Scenario 21 - Create Tag
    await createTag(tagInput.createTagPrioriValues(), "021 - Create Tag", browserName);
    // Scenario 22 - Edit Tag
    await editTag(tagInput.editTagPrioriValues(), "022 - Edit Tag", browserName);
    // Scenario 23 - Delete Tag
    await deleteTag(tagInput.createTagPrioriValues(), "023 - Delete Tag", browserName);
    // Scenario 24 - Create Tag With Metadata
    await createTagWithMetadata(tagInput.createTagPrioriValues(), "024 - Create Tag With Metadata", browserName);
    // Scenario 25 - Create Tag With X Card
    await createTagWithXCardValues(tagInput.createTagPrioriValues(), "025 - Create Tag With X Card", browserName);  
    // Scenario 26 - Settings - Set General Title and Description
    await settingsEditTitleAndDescription(settingsInput.getPrioriValues(), "026 - Settings - Set General Title and Description", browserName);
    // Scenario 27 - Settings - Set General Language
    await settingsEditGeneralLanguage(settingsInput.getPrioriValues(), "027 - Settings - Set General Language", browserName);
    // Scenario 28 - Settings - Edit Meta Data
    await settingsEditMetaData(settingsInput.getPrioriValues(), "028 - Settings - Edit Meta Data", browserName);
    // Scenario 29 - Settings - Edit X Card Data
    await settingsEditXCardData(settingsInput.getPrioriValues(), "029 - Settings - Edit X Card Data", browserName);
    // Scenario 30 - Settings - Edit Facebook Data
    await settingsEditFacebookData(settingsInput.getPrioriValues(), "030 - Settings - Edit Facebook Data", browserName);
    // Scenario 31 - Create Member
    await createMember(membersInput.getMemberAPriori(), "031 - Create Member", browserName);
    // Scenario 32 - Create Member With Empty Email
    await createMemberWithEmptyEmail(membersInput.getMemberEmptyEmailAPriori(), "032 - Create Member With Empty Email", browserName);
    // Scenario 33 - Create Member With Invalid Email
    await createMemberWithInvalidEmail(membersInput.getMemberInvalidEmailAPriori(), "033 - Create Member With Invalid Email", browserName);
    // Scenario 34 - Create Member With Note Longer Than 500 Characters
    await createMemberWithTooLongNote(membersInput.getMemberTooLongNoteAPriori(), "034 - Create Member With Note Longer Than 500 Characters", browserName);
    // Scenario 35 - Create Member With Name Longer Than 191 Characters
    await createMemberWithTooLongName(membersInput.getMemberTooLongNameAPriori(), "035 - Create Member With Name Longer Than 191 Characters", browserName);
    // Scenario 36 - Edit Member
    await editMember({ create: membersInput.getMemberAPriori(), edit: membersInput.getMemberAPriori() }, "036 - Edit Member", browserName);
    // Scenario 37 - Edit Member With Empty Email
    await editMemberWithEmptyEmail({ create: membersInput.getMemberAPriori(), edit: membersInput.getMemberEmptyEmailAPriori() }, "037 - Edit Member With Empty Email", browserName);
    // Scenario 38 - Edit Member With Invalid Email
    await editMemberWithInvalidEmail({ create: membersInput.getMemberAPriori(), edit: membersInput.getMemberInvalidEmailAPriori() }, "038 - Edit Member With Invalid Email", browserName);
    // Scenario 39 - Edit Member With Note Longer Than 500 Characters
    await editMemberWithTooLongNote({ create: membersInput.getMemberAPriori(), edit: membersInput.getMemberTooLongNoteAPriori() }, "039 - Edit Member With Note Longer Than 500 Characters", browserName);
    // Scenario 40 - Edit Member With Name Longer Than 191 Characters
    await editMemberWithTooLongName({ create: membersInput.getMemberAPriori(), edit: membersInput.getMemberTooLongNameAPriori() }, "040 - Edit Member With Name Longer Than 191 Characters", browserName);
    // Scenario 41 - Settings - Set Site Timezone
    await settingsEditTimezone(null, "041 - Settings - Set Site Timezone", browserName);
  }
  else if (part == 3) {
    createVRTReport();
  }
})();