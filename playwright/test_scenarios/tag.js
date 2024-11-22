const { SignInPage } = require("../page_objects/sign_in_page");
const { expect } = require('@playwright/test');
const playwright = require("playwright");
const { Scenario } = require("../util/util");

async function createTag() {  
  
  const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();  
  const scenario = new Scenario(page, "016 - Create Tag");
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf"
  const tagName = "Tag Name Test";
  const tagSlug = "slug-test";
  const tagDescription = "Description Test";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listTagsPage = await dashboard.goToTags();
  const createEditTagPage = await listTagsPage.goToNewTag();

  // When
  await createEditTagPage.saveTag(tagName, tagSlug, tagDescription);

  // Then
  await listTagsPage.goto();
  const currentTags = await listTagsPage.getListOfTags();
  expect(currentTags.some(tag => tag.name === tagName && tag.slug === tagSlug && tag.description === tagDescription)).toBeTruthy();  
  await browser.close();
  scenario.successful();
  return ;
}

async function editTag() {
  
  const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();  
  const scenario = new Scenario(page, "017 - Edit Tag");
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf"
  const tagToEdit = "slug-test";

  const oldTagName = "Tag Name Test";
  const oldTagSlug = "slug-test";
  const oldTagDescription = "Description Test";

  const tagName = "New Tag Name Test";
  const tagSlug = "new-slug-test";
  const tagDescription = "New Description Test";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listTagsPage = await dashboard.goToTags();
  const createEditTagPage = await listTagsPage.goToNewTag();
  await createEditTagPage.saveTag(oldTagName, oldTagSlug, oldTagDescription);
  await dashboard.goToTags();
  await listTagsPage.goToEditTag(tagToEdit);

  // When
  await createEditTagPage.saveTag(tagName, tagSlug, tagDescription);

  // Then
  await listTagsPage.goto();
  const currentTags = await listTagsPage.getListOfTags();
  expect(currentTags.some(tag => tag.name === tagName && tag.slug === tagSlug && tag.description === tagDescription)).toBeTruthy();  
  await browser.close();
  scenario.successful();
  return ;
}

async function deleteTag() {
  
  const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, "018 - Delete Tag");
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf"
  const tagToDelete = "new-slug-test";
  const tagName = "New Tag Name Test";
  const tagSlug = "new-slug-test";
  const tagDescription = "New Description Test";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  let listTagsPage = await dashboard.goToTags();
  const createEditTagPage = await listTagsPage.goToNewTag();
  await createEditTagPage.saveTag(tagName, tagSlug, tagDescription);
  await dashboard.goToTags();
  await listTagsPage.goToEditTag(tagToDelete);  

  // When
  listTagsPage = await createEditTagPage.deleteTag();

  // Then  
  listTagsPage = await dashboard.goToTags();
  const currentTags = await listTagsPage.getListOfTags();
  expect(currentTags.some(tag => tag.name === tagName && tag.slug === tagSlug && tag.description === tagDescription)).toBeFalsy();
  await browser.close();
  scenario.successful();
  return ;
}

module.exports = {

  createTag,
  editTag,
  deleteTag
}