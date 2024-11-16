const { SignInPage } = require("../page_objects/sign_in_page");
const { expect } = require("@playwright/test");
const playwright = require("playwright");
const { Scenario } = require("../util/util");

async function createPost() {
  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, "002 - Create Post");
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const postTitle = "Auto post";
  const postContent = "this is a new post";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listPostsPage = await dashboard.goToPosts();
  const createDeletePostPage = await listPostsPage.goToNewPost();

  // When
  await createDeletePostPage.savePost(postTitle, postContent);
  await listPostsPage.goto();

  // Then  
  const currentPosts = await listPostsPage.getListOfPosts();
  expect(
    currentPosts.some(
      (post) => post.title === postTitle
    )
  ).toBeTruthy();
  await browser.close();
  scenario.successful();
  return;
}

async function deletePost() {
  const browser = await playwright["chromium"].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, "005 - Delete Post");
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const postTitleToDelete = "Coming soon";
  const postContent = "Content";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listPostsPage = await dashboard.goToPosts();
  const createDeletePostPage = await listPostsPage.goToNewPost();
  
  await createDeletePostPage.savePost(postTitleToDelete, postContent);

  // When
  await createDeletePostPage.deletePost();

  // Then
  await listPostsPage.goto();
  const currentPosts = await listPostsPage.getListOfPosts();
  expect(
    currentPosts.some((post) => post.title === postTitleToDelete)
  ).toBeFalsy();
  await browser.close();
  scenario.successful();
  return;
}

module.exports = {
  createPost,
  deletePost,
};
