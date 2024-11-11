const { SignInPage } = require("../page_objects/sign_in_page");
const { expect } = require('@playwright/test');
const playwright = require("playwright");
const { Scenario } = require("../util/util");

async function listPosts() {  
  
  const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50});
  const context = await browser.newContext();
  const page = await context.newPage();  
  const scenario = new Scenario(page, "001 - List Posts");
  scenario.begin();

  const email = "alguien@hotmail.com";
  const password = "123456#213asdf"
  const expectedPostTitle = "Coming soon";
  const expectedPostStatus = "Published";

  // Given
  const signInPage = new SignInPage(scenario);
  await signInPage.goto();
  const dashboard = await signInPage.signIn(email, password);    

  // When
  const listPostsPage = await dashboard.goToPosts();

  // Then  
  const currentPosts = await listPostsPage.getListOfPosts();
  expect(currentPosts.some(post => post.title === expectedPostTitle && post.status === expectedPostStatus)).toBeTruthy();  
  await browser.close();
  scenario.successful();
  return ;
}

async function createPost() {  
  
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50});
    const context = await browser.newContext();
    const page = await context.newPage();  
    const scenario = new Scenario(page, "002 - Create Post");
    scenario.begin();
  
    const email = "alguien@hotmail.com";
    const password = "123456#213asdf"
    const postTitle = "Auto post";
    const postContent = "this is a new post";
    const expectedPostStatus = "Published";
  
    // Given
    const signInPage = new SignInPage(scenario);
    await signInPage.goto();
    const dashboard = await signInPage.signIn(email, password);
    const listPostsPage = await dashboard.goToPosts();
    const createPostPage = await listPostsPage.goToNewPost();
  
    // When
    await createPostPage.savePost(postTitle, postContent);
  
    // Then  
    expect(await listPostsPage.verifyIfPostWasCreated(postTitle, postContent)).toBeTruthy();

    await listPostsPage.closeSuccessfulModal();
    const currentPosts = await listPostsPage.getListOfPosts();
    expect(currentPosts.some(post => post.title === postTitle && post.status === expectedPostStatus)).toBeTruthy();  
    await browser.close();
    scenario.successful();
    return ;
}

async function analyticPost() {  
  
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50});
    const context = await browser.newContext();
    const page = await context.newPage();  
    const scenario = new Scenario(page, "003 - Analytic Post");
    scenario.begin();
  
    const email = "alguien@hotmail.com";
    const password = "123456#213asdf"
    const postTitle = "A new post";
    const postContent = "this is the content of the new post";    
  
    // Given
    const signInPage = new SignInPage(scenario);
    await signInPage.goto();
    const dashboard = await signInPage.signIn(email, password);
    const listPostsPage = await dashboard.goToPosts();
    const createPostPage = await listPostsPage.goToNewPost();
  
    // When
    await createPostPage.savePost(postTitle, postContent);
    await listPostsPage.closeSuccessfulModal();
    let analyticsPostPage = await listPostsPage.goToAnalytics(postTitle);
  
    // Then    
    expect(await analyticsPostPage.getPostTitle() == postTitle).toBeTruthy();
    await browser.close();
    scenario.successful();
    return ;
}

async function editPost() {
  
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50});
    const context = await browser.newContext();
    const page = await context.newPage();  
    const scenario = new Scenario(page, "004 - Update Post");
    scenario.begin();
  
    const email = "alguien@hotmail.com";
    const password = "123456#213asdf"
    const postTitleToEdit = "Auto post";
    const newPostTitle = "New Post Title";
    const newPostContent = "New Post Content";
    const expectedPostStatus = "Published";
  
    // Given
    const signInPage = new SignInPage(scenario);
    await signInPage.goto();
    const dashboard = await signInPage.signIn(email, password);
    const listPostsPage = await dashboard.goToPosts();
    const createEditPostPage = await listPostsPage.goToEditPost(postTitleToEdit);
  
    // When
    await createEditPostPage.updatePost(newPostTitle, newPostContent);
  
    // Then  
    await listPostsPage.goto();
    const currentPosts = await listPostsPage.getListOfPosts();
    expect(currentPosts.some(post => post.title === newPostTitle && post.status === expectedPostStatus)).toBeTruthy();  
    await browser.close();
    scenario.successful();
    return ;
}

async function deletePost() {
  
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50});
    const context = await browser.newContext();
    const page = await context.newPage();  
    const scenario = new Scenario(page, "005 - Delete Post");
    scenario.begin();
  
    const email = "alguien@hotmail.com";
    const password = "123456#213asdf"
    const postTitleToDelete = "Coming soon";
  
    // Given
    const signInPage = new SignInPage(scenario);
    await signInPage.goto();
    const dashboard = await signInPage.signIn(email, password);
    const listPostsPage = await dashboard.goToPosts();
    const createEditPostPage = await listPostsPage.goToEditPost(postTitleToDelete);
  
    // When
    await createEditPostPage.deletePost();
  
    // Then  
    await listPostsPage.goto();
    const currentPosts = await listPostsPage.getListOfPosts();
    expect(currentPosts.some(post => post.title === postTitleToDelete)).toBeFalsy();
    await browser.close();
    scenario.successful();
    return ;
}

module.exports = {

    listPosts,
    createPost,
    analyticPost,
    editPost,
    deletePost
}