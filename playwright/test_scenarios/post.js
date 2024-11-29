const { SignInPage } = require("../page_objects/sign_in_page");
const { expect } = require("@playwright/test");
const playwright = require("playwright");
const { Scenario } = require("../util/util");

async function createPost(input, scenarioDesc, browserType) {
  const browser = await playwright[browserType].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioDesc, browserType);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const expectedPostStatus = "Published";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listPostsPage = await dashboard.goToPosts();
  const createPostPage = await listPostsPage.goToNewPost();

  // When
  await createPostPage.savePost(input);

  // Then
  expect(
    await listPostsPage.verifyIfPostWasCreated(input.title, input.content)
  ).toBeTruthy();

  await listPostsPage.closeSuccessfulModal();
  const currentPosts = await listPostsPage.getListOfPosts();
  expect(
    currentPosts.some(
      (p) => p.title === input.title && p.status === expectedPostStatus
    )
  ).toBeTruthy();
  await browser.close();
  scenario.successful();
  return;
}

async function createPostWithLongTitle(input, scenarioDesc, browserType) {
  const browser = await playwright[browserType].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioDesc, browserType);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const expectedPostStatus = "Published";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listPostsPage = await dashboard.goToPosts();
  const createPostPage = await listPostsPage.goToNewPost();

  // When
  await createPostPage.savePost(input, true);

  // Then
  await createPostPage.checkErrorAlert(
    "Validation failed: Title cannot be longer than 255 characters."
  );
  await listPostsPage.goto();
  await createPostPage.confirmLeave();
  const currentPosts = await listPostsPage.getListOfPosts();
  expect(
    currentPosts.some(
      (p) => p.title === input.title && p.status === expectedPostStatus
    )
  ).toBeFalsy();
  await browser.close();
  scenario.successful();
  return;
}

async function createPostWithLongExcerpt(input, scenarioDesc, browserType) {
  const browser = await playwright[browserType].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioDesc, browserType);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const expectedPostStatus = "Published";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listPostsPage = await dashboard.goToPosts();
  const createPostPage = await listPostsPage.goToNewPost();

  // When
  await createPostPage.savePost(input, true);

  // Then
  await createPostPage.checkErrorAlert(
    "Validation failed: Excerpt cannot be longer than 300 characters."
  );
  await listPostsPage.goto();
  await createPostPage.confirmLeave();
  const currentPosts = await listPostsPage.getListOfPosts();
  expect(
    currentPosts.some(
      (p) => p.title === input.title && p.status === expectedPostStatus
    )
  ).toBeFalsy();
  await browser.close();
  scenario.successful();
  return;
}

async function editPost(input, scenarioDesc, browserType) {
  const browser = await playwright[browserType].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioDesc, browserType);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const expectedPostStatus = "Published";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listPostsPage = await dashboard.goToPosts();
  const createPostPage = await listPostsPage.goToNewPost();
  await createPostPage.savePost(input.create);
  await listPostsPage.closeSuccessfulModal();

  // When
  const createEditPostPage = await listPostsPage.goToEditPost(
    input.create.title
  );
  await createEditPostPage.updatePost(input.edit);

  // Then
  await listPostsPage.goto();
  const currentPosts = await listPostsPage.getListOfPosts();
  expect(
    currentPosts.some(
      (p) => p.title === input.edit.title && p.status === expectedPostStatus
    )
  ).toBeTruthy();
  await browser.close();
  scenario.successful();
  return;
}

async function editPostWithLongTitle(input, scenarioDesc, browserType) {
  const browser = await playwright[browserType].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioDesc, browserType);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const expectedPostStatus = "Published";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listPostsPage = await dashboard.goToPosts();
  const createPostPage = await listPostsPage.goToNewPost();
  await createPostPage.savePost(input.create);
  await listPostsPage.closeSuccessfulModal();

  // When
  const createEditPostPage = await listPostsPage.goToEditPost(
    input.create.title
  );
  await createEditPostPage.updatePost(input.edit);

  // Then
  await createPostPage.checkErrorAlert(
    "Update failed: Title cannot be longer than 255 characters."
  );
  await listPostsPage.goto();
  await createEditPostPage.confirmLeave();
  const currentPosts = await listPostsPage.getListOfPosts();
  expect(
    currentPosts.some(
      (p) => p.title === input.edit.title && p.status === expectedPostStatus
    )
  ).toBeFalsy();
  await browser.close();
  scenario.successful();
  return;
}

async function editPostWithLongExcerpt(input, scenarioDesc, browserType) {
  const browser = await playwright[browserType].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioDesc, browserType);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";
  const expectedPostStatus = "Published";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listPostsPage = await dashboard.goToPosts();
  const createPostPage = await listPostsPage.goToNewPost();
  await createPostPage.savePost(input.create);
  await listPostsPage.closeSuccessfulModal();

  // When
  const createEditPostPage = await listPostsPage.goToEditPost(
    input.create.title
  );
  await createEditPostPage.updatePost(input.edit);

  // Then
  await createPostPage.checkErrorAlert(
    "Update failed: Excerpt cannot be longer than 300 characters."
  );
  await listPostsPage.goto();
  await createEditPostPage.confirmLeave();
  const currentPosts = await listPostsPage.getListOfPosts();
  expect(
    currentPosts.some(
      (p) => p.title === input.edit.title && p.status === expectedPostStatus
    )
  ).toBeFalsy();
  await browser.close();
  scenario.successful();
  return;
}

async function deletePost(post, scenarioDesc, browserType) {
  const browser = await playwright[browserType].launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const scenario = new Scenario(page, scenarioDesc, browserType);
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);
  const listPostsPage = await dashboard.goToPosts();

  const createPostPage = await listPostsPage.goToNewPost();
  await createPostPage.savePost(post);
  await listPostsPage.closeSuccessfulModal();
  const createEditPostPage = await listPostsPage.goToEditPost(post.title);

  // When
  await createEditPostPage.deletePost();

  // Then
  await listPostsPage.goto();
  const currentPosts = await listPostsPage.getListOfPosts();
  expect(currentPosts.some((p) => p.title === post.title)).toBeFalsy();
  await browser.close();
  scenario.successful();
  return;
}

module.exports = {
  createPost,
  createPostWithLongTitle,
  createPostWithLongExcerpt,
  editPost,
  editPostWithLongTitle,
  editPostWithLongExcerpt,
  deletePost,
};
