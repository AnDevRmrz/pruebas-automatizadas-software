const { SignInPage } = require("../page_objects/sign_in_page");
const { expect } = require('@playwright/test');
const playwright = require("playwright");
const { Scenario } = require("../util/util");

async function createTag(input, scenarioDesc) {  
  
  const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();  
  const scenario = new Scenario(page, scenarioDesc);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf"
  const tagName = input.tagName;
  const tagSlug = input.tagSlug;
  const tagDescription = input.tagDescription;
  const tagHexColor = input.tagHexColor;

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listTagsPage = await dashboard.goToTags();
  const createEditTagPage = await listTagsPage.goToNewTag();

  // When
  await createEditTagPage.saveTag(tagName, tagSlug, tagDescription, tagHexColor);

  // Then
  await listTagsPage.goto();
  const currentTags = await listTagsPage.getListOfTags();
  expect(currentTags.some(tag => tag.name === tagName && tag.slug === tagSlug && tag.description === tagDescription)).toBeTruthy();  
  await browser.close();
  scenario.successful();
  return ;
}

async function editTag(input, scenarioDesc) {
  
  const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();  
  const scenario = new Scenario(page, scenarioDesc);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf"  

  const oldTagName = input.oldTagName;
  const oldTagSlug = input.oldTagSlug;
  const oldTagDescription = input.oldTagDescription;
  const oldTagHexColor = input.oldTagHexColor;

  const tagName = input.tagName;
  const tagSlug = input.tagSlug;
  const tagDescription = input.tagDescription;
  const tagHexColor = input.tagHexColor;

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listTagsPage = await dashboard.goToTags();
  const createEditTagPage = await listTagsPage.goToNewTag();
  await createEditTagPage.saveTag(oldTagName, oldTagSlug, oldTagDescription, oldTagHexColor);
  await dashboard.goToTags();
  await listTagsPage.goToEditTag(oldTagSlug);

  // When
  await createEditTagPage.saveTag(tagName, tagSlug, tagDescription, tagHexColor);

  // Then
  await listTagsPage.goto();
  const currentTags = await listTagsPage.getListOfTags();
  expect(currentTags.some(tag => tag.name === tagName && tag.slug === tagSlug && tag.description === tagDescription)).toBeTruthy();  
  await browser.close();
  scenario.successful();
  return ;
}

async function deleteTag(input, scenarioDesc) {
  
  const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioDesc);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf"
  
  const tagName = input.tagName;
  const tagSlug = input.tagSlug;
  const tagDescription = input.tagDescription;
  const tagHexColor = input.tagHexColor;

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  let listTagsPage = await dashboard.goToTags();
  const createEditTagPage = await listTagsPage.goToNewTag();
  await createEditTagPage.saveTag(tagName, tagSlug, tagDescription, tagHexColor);
  await dashboard.goToTags();
  await listTagsPage.goToEditTag(tagSlug);

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

async function createTagWithMetadata(input, scenarioDesc) {  
  
  const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();  
  const scenario = new Scenario(page, scenarioDesc);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf"
  const tagName = input.tagName;
  const tagSlug = input.tagSlug;
  const tagDescription = input.tagDescription;
  const tagHexColor = input.tagHexColor;
  const metaTitle = input.metaTitle;
  const metaDescription = input.metaDescription;
  const metaUrl = input.metaUrl;
  

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listTagsPage = await dashboard.goToTags();
  const createEditTagPage = await listTagsPage.goToNewTag();

  // When
  await createEditTagPage.saveTagWithMetadata(tagName, tagSlug, tagDescription, tagHexColor, metaTitle, metaDescription, metaUrl);

  // Then
  await listTagsPage.goto();
  const currentTags = await listTagsPage.getListOfTags();
  expect(currentTags.some(tag => tag.name === tagName && tag.slug === tagSlug && tag.description === tagDescription)).toBeTruthy();  
  await browser.close();
  scenario.successful();
  return ;
}

async function createTagWithXCardValues(input, scenarioDesc) {  
  
  const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();  
  const scenario = new Scenario(page, scenarioDesc);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf"
  const tagName = input.tagName;
  const tagSlug = input.tagSlug;
  const tagDescription = input.tagDescription;
  const tagHexColor = input.tagHexColor;
  const xCardTitle = input.xCardTitle;
  const xCardDescription = input.xCardDescription;

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listTagsPage = await dashboard.goToTags();
  const createEditTagPage = await listTagsPage.goToNewTag();

  // When
  await createEditTagPage.saveTagWithCodeXCardValues(tagName, tagSlug, tagDescription, tagHexColor, xCardTitle, xCardDescription);

  // Then
  await listTagsPage.goto();
  const currentTags = await listTagsPage.getListOfTags();
  expect(currentTags.some(tag => tag.name === tagName && tag.slug === tagSlug && tag.description === tagDescription)).toBeTruthy();  
  await browser.close();
  scenario.successful();
  return ;
}

async function createTagWithHugeTitle(input, scenarioDesc) {
  
  const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();  
  const scenario = new Scenario(page, scenarioDesc);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf"
  const tagName = input.tagName;
  const tagSlug = input.tagSlug;
  const tagDescription = input.tagDescription;
  const tagHexColor = input.tagHexColor;

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listTagsPage = await dashboard.goToTags();
  const createEditTagPage = await listTagsPage.goToNewTag();

  // When
  await createEditTagPage.saveTag(tagName, tagSlug, tagDescription, tagHexColor);
  
  // Then
  const errorMessage = await createEditTagPage.getTagTitleErrorMessage();  
  expect(errorMessage === "Tag names cannot be longer than 191 characters.").toBeTruthy();  
  await browser.close();
  scenario.successful();
  return ;
}

async function createTagWithHugeDescription(input, scenarioDesc) {
  
  const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();  
  const scenario = new Scenario(page, scenarioDesc);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf"
  const tagName = input.tagName;
  const tagSlug = input.tagSlug;
  const tagDescription = input.tagDescription;
  const tagHexColor = input.tagHexColor;

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listTagsPage = await dashboard.goToTags();
  const createEditTagPage = await listTagsPage.goToNewTag();

  // When
  await createEditTagPage.saveTag(tagName, tagSlug, tagDescription, tagHexColor);
  
  // Then
  const errorMessage = await createEditTagPage.getTagDescriptionErrorMessage();  
  expect(errorMessage === "Description cannot be longer than 500 characters.").toBeTruthy();  
  await browser.close();
  scenario.successful();
  return ;
}

module.exports = {

  createTag,
  editTag,
  deleteTag,
  createTagWithMetadata,
  createTagWithXCardValues,
  createTagWithHugeTitle,
  createTagWithHugeDescription
}