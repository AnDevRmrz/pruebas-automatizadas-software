const { SignInPage } = require("../page_objects/sign_in_page");
const { expect } = require('@playwright/test');
const playwright = require("playwright");
const { Scenario } = require("../util/util");

async function multiFeatureTest1(input, scenarioDesc, browserType) {

  const browser = await playwright[browserType].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();  
  const scenario = new Scenario(page, scenarioDesc, browserType);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf"

  const tagName = input.tagName;
  const tagSlug = input.tagSlug;
  const tagDescription = input.tagDescription;
  const tagHexColor = input.tagHexColor;

  const newTagName = input.newTagName;
  const newTagSlug = input.newTagSlug;
  const newTagDescription = input.newTagDescription;
  const newTagHexColor = input.newTagHexColor;

  let post = input.post;
  post.tag = tagName;

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listTagsPage = await dashboard.goToTags();
  const createEditTagPage = await listTagsPage.goToNewTag();
  await createEditTagPage.saveTag(tagName, tagSlug, tagDescription, tagHexColor);
  const listPostsPage = await dashboard.goToPosts();
  const createPostPage = await listPostsPage.goToNewPost();
  await createPostPage.savePost(post);
  await listPostsPage.closeSuccessfulModal();
  await dashboard.goToTags();
  await listTagsPage.goToEditTag(tagSlug);
  await createEditTagPage.saveTag(newTagName, newTagSlug, newTagDescription, newTagHexColor);
  await dashboard.goToPosts();
  await listPostsPage.goToEditPost(post.title);

  // When
  const currentTagsFromPost = await createPostPage.getCurrentTags();

  // Then
  expect(currentTagsFromPost.some(tag => tag.name === newTagName)).toBeTruthy();

  await browser.close();
  scenario.successful();
  return ;
}

async function multiFeatureTest2(input, scenarioDesc, browserType) {

  const browser = await playwright[browserType].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();  
  const scenario = new Scenario(page, scenarioDesc, browserType);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf"

  const tagName = input.tagName;
  const tagSlug = input.tagSlug;
  const tagDescription = input.tagDescription;
  const tagHexColor = input.tagHexColor;

  const newTagName = input.newTagName;
  const newTagSlug = input.newTagSlug;
  const newTagDescription = input.newTagDescription;
  const newTagHexColor = input.newTagHexColor;

  let pageInput = input.page;

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listTagsPage = await dashboard.goToTags();
  const createEditTagPage = await listTagsPage.goToNewTag();
  await createEditTagPage.saveTag(tagName, tagSlug, tagDescription, tagHexColor);
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(pageInput.title, pageInput.description, false, false, false, false, tagName);
  await createPagePage.closePublishFlow();
  await dashboard.goToTags();
  await listTagsPage.goToEditTag(tagSlug);
  await createEditTagPage.saveTag(newTagName, newTagSlug, newTagDescription, newTagHexColor);
  await dashboard.goToPages();
  await listFilterDeletePagePage.goToEditPage(pageInput.title);

  // When
  const currentTagsFromPage = await createPagePage.getCurrentTags();

  // Then
  expect(currentTagsFromPage.some(tag => tag.name === newTagName)).toBeTruthy();

  await browser.close();
  scenario.successful();
  return ;
}

async function multiFeatureTest3(input, scenarioDesc, browserType) {

  const browser = await playwright[browserType].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();  
  const scenario = new Scenario(page, scenarioDesc, browserType);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf"

  const tagName = input.tagName;
  const tagSlug = input.tagSlug;
  const tagDescription = input.tagDescription;
  const tagHexColor = input.tagHexColor;

  let post = input.post;
  post.tag = tagName;

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listTagsPage = await dashboard.goToTags();
  const createEditTagPage = await listTagsPage.goToNewTag();
  await createEditTagPage.saveTag(tagName, tagSlug, tagDescription, tagHexColor);
  const listPostsPage = await dashboard.goToPosts();
  const createPostPage = await listPostsPage.goToNewPost();
  await createPostPage.savePost(post);
  await listPostsPage.closeSuccessfulModal();
  await dashboard.goToTags();
  await listTagsPage.goToEditTag(tagSlug);
  await createEditTagPage.deleteTag();
  await dashboard.goToPosts();
  await listPostsPage.goToEditPost(post.title);

  // When
  const currentTagsFromPost = await createPostPage.getCurrentTags();

  // Then
  expect(currentTagsFromPost.some(tag => tag.name === newTagName)).toBeFalsy();

  await browser.close();
  scenario.successful();
  return ;
}

async function multiFeatureTest4(input, scenarioDesc, browserType) {

  const browser = await playwright[browserType].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();  
  const scenario = new Scenario(page, scenarioDesc, browserType);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf"

  const tagName = input.tagName;
  const tagSlug = input.tagSlug;
  const tagDescription = input.tagDescription;
  const tagHexColor = input.tagHexColor;

  const newTagName = input.newTagName;  

  let pageInput = input.page;

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listTagsPage = await dashboard.goToTags();
  const createEditTagPage = await listTagsPage.goToNewTag();
  await createEditTagPage.saveTag(tagName, tagSlug, tagDescription, tagHexColor);
  const listFilterDeletePagePage = await dashboard.goToPages();
  const createPagePage = await listFilterDeletePagePage.goToNewPage();
  await createPagePage.createPage(pageInput.title, pageInput.description, false, false, false, false, tagName);
  await createPagePage.closePublishFlow();
  await dashboard.goToTags();
  await listTagsPage.goToEditTag(tagSlug);
  await createEditTagPage.deleteTag();
  await dashboard.goToPages();
  await listFilterDeletePagePage.goToEditPage(pageInput.title);

  // When
  const currentTagsFromPage = await createPagePage.getCurrentTags();

  // Then
  expect(currentTagsFromPage.some(tag => tag.name === newTagName)).toBeFalsy();

  await browser.close();
  scenario.successful();
  return ;
}

async function multiFeatureTest5(input, scenarioDesc, browserType) {

  const browser = await playwright[browserType].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();  
  const scenario = new Scenario(page, scenarioDesc, browserType);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf"

  const siteTitle = input.settings.generalTitle;
  const siteDescription = input.settings.generalDescription;

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const settingsPage = await dashboard.goToSettings();
  await settingsPage.editTitleAndDescription(siteTitle, siteDescription);
  await settingsPage.closeSettings();
  const viewSitePage = await dashboard.goToViewSite();

  // When
  const currentTitle = await viewSitePage.getTitleValue();
  const currentDescription = await viewSitePage.getDescriptionValue();

  // Then
  expect(currentTitle == siteTitle).toBeTruthy();
  expect(currentDescription == siteDescription).toBeTruthy();

  await browser.close();
  scenario.successful();
  return ;
}

module.exports = {

  multiFeatureTest1,
  multiFeatureTest2,
  multiFeatureTest3,
  multiFeatureTest4,
  multiFeatureTest5
}