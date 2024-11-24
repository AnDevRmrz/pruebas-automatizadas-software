const { SignInPage } = require("../page_objects/sign_in_page");
const { expect } = require('@playwright/test');
const playwright = require("playwright");
const { Scenario } = require("../util/util");
const { faker } = require('@faker-js/faker');

async function createPostValidData(postTitle_name, postContent_name, scenario_name) {  
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();  
    const scenario = new Scenario(page, scenario_name);
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitle = postTitle_name; 
    const postContent = postContent_name; 
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
    return;
}

async function createPostEmptyFields(scenario_name) {  
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();  
    const scenario = new Scenario(page, scenario_name);
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitle = ""; 
    const postContent = ""; 

    // Given
    const signInPage = new SignInPage(scenario);
    await signInPage.goto();
    const dashboard = await signInPage.signIn(email, password);
    const listPostsPage = await dashboard.goToPosts();
    const createPostPage = await listPostsPage.goToNewPost();

    // When
    await createPostPage.savePost(postTitle, postContent);

    // Then  
    const validationErrors = await createPostPage.getValidationErrors();
    expect(validationErrors).toContain("Title is required");
    expect(validationErrors).toContain("Content is required");

    await browser.close();
    scenario.successful();
    return;
}

async function createPostExceedingLimits(postTitle_name, postContent_name, scenario_name) {  
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();  
    const scenario = new Scenario(page, scenario_name);
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitle = postTitle_name; 
    const postContent = postContent_name; 

    // Given
    const signInPage = new SignInPage(scenario);
    await signInPage.goto();
    const dashboard = await signInPage.signIn(email, password);
    const listPostsPage = await dashboard.goToPosts();
    const createPostPage = await listPostsPage.goToNewPost();

    // When
    await createPostPage.savePost(postTitle, postContent);

    // Then  
    const validationErrors = await createPostPage.getValidationErrors();
    expect(validationErrors).toContain("Title exceeds maximum length");
    expect(validationErrors).toContain("Content exceeds maximum length");

    await browser.close();
    scenario.successful();
    return;
}

async function editPostValidData(postTitle_name, postContent_name, scenario_name) {
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();
    const scenario = new Scenario(page, scenario_name);
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitleToEdit = "Auto post";
    const newPostTitle = postTitle_name; 
    const newPostContent = postContent_name; 
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
    return;
}

async function editPostEmptyTitle(postContent_name, scenario_name) {
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();
    const scenario = new Scenario(page, scenario_name);
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitleToEdit = "Auto post";
    const newPostTitle = ""; 
    const newPostContent = postContent_name;

    // Given
    const signInPage = new SignInPage(scenario);
    await signInPage.goto();
    const dashboard = await signInPage.signIn(email, password);
    const listPostsPage = await dashboard.goToPosts();
    const createEditPostPage = await listPostsPage.goToEditPost(postTitleToEdit);

    // When
    await createEditPostPage.updatePost(newPostTitle, newPostContent);

    // Then
    const validationErrors = await createEditPostPage.getValidationErrors();
    expect(validationErrors).toContain("Title is required");

    await browser.close();
    scenario.successful();
    return;
}

async function editPostExceedingLimits(postTitle_name, postContent_name, scenario_name) {
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();
    const scenario = new Scenario(page, scenario_name);
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitleToEdit = "Auto post";
    const newPostTitle = postTitle_name; 
    const newPostContent = postContent_name; 

    // Given
    const signInPage = new SignInPage(scenario);
    await signInPage.goto();
    const dashboard = await signInPage.signIn(email, password);
    const listPostsPage = await dashboard.goToPosts();
    const createEditPostPage = await listPostsPage.goToEditPost(postTitleToEdit);

    // When
    await createEditPostPage.updatePost(newPostTitle, newPostContent);

    // Then
    const validationErrors = await createEditPostPage.getValidationErrors();
    expect(validationErrors).toContain("Title exceeds maximum length");
    expect(validationErrors).toContain("Content exceeds maximum length");

    await browser.close();
    scenario.successful();
    return;
}

async function editPostEmptyContent(postTitleToEdit_name, postTitle_name, scenario_name) {
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();
    const scenario = new Scenario(page, scenario_name);
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitleToEdit = postTitleToEdit_name;
    const newPostTitle = postTitle_name;
    const newPostContent = ""; 

    // Given
    const signInPage = new SignInPage(scenario);
    await signInPage.goto();
    const dashboard = await signInPage.signIn(email, password);
    const listPostsPage = await dashboard.goToPosts();
    const createEditPostPage = await listPostsPage.goToEditPost(postTitleToEdit);

    // When
    await createEditPostPage.updatePost(newPostTitle, newPostContent);

    // Then
    const validationErrors = await createEditPostPage.getValidationErrors();
    expect(validationErrors).toContain("Content is required");

    await browser.close();
    scenario.successful();
    return;
}

async function deleteNewlyCreatedPost(postTitle_name, postContent_name, scenario_name) {
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();
    const scenario = new Scenario(page, scenario_name);
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitleToDelete = postTitle_name; 
    const postContent = postContent_name; 

    // Given
    const signInPage = new SignInPage(scenario);
    await signInPage.goto();
    const dashboard = await signInPage.signIn(email, password);
    const listPostsPage = await dashboard.goToPosts();

    const createPostPage = await listPostsPage.goToNewPost();
    await createPostPage.savePost(postTitleToDelete, postContent);
    await listPostsPage.closeSuccessfulModal();

    const createEditPostPage = await listPostsPage.goToEditPost(postTitleToDelete);

    // When
    await createEditPostPage.deletePost();

    // Then
    await listPostsPage.goto();
    const currentPosts = await listPostsPage.getListOfPosts();
    expect(currentPosts.some(post => post.title === postTitleToDelete)).toBeFalsy();

    await browser.close();
    scenario.successful();
    return;
}

async function deletePublishedPost(postTitle_name, scenario_name) {
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();
    const scenario = new Scenario(page, scenario_name);
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitleToDelete = postTitle_name; 
    const expectedPostStatus = "Published";

    // Given
    const signInPage = new SignInPage(scenario);
    await signInPage.goto();
    const dashboard = await signInPage.signIn(email, password);
    const listPostsPage = await dashboard.goToPosts();

    const postDetails = await listPostsPage.getPostDetails(postTitleToDelete);
    expect(postDetails.status).toEqual(expectedPostStatus); 

    const createEditPostPage = await listPostsPage.goToEditPost(postTitleToDelete);

    // When
    await createEditPostPage.deletePost();

    // Then
    await listPostsPage.goto();
    const currentPosts = await listPostsPage.getListOfPosts();
    expect(currentPosts.some(post => post.title === postTitleToDelete)).toBeFalsy();

    await browser.close();
    scenario.successful();
    return;
}

async function deleteRandomGeneratedPost(postTitle_name, postContent_name, scenario_name) {
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();
    const scenario = new Scenario(page, scenario_name);
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitleToDelete = postTitle_name; 
    const postContent = postContent_name; 

    // Given
    const signInPage = new SignInPage(scenario);
    await signInPage.goto();
    const dashboard = await signInPage.signIn(email, password);
    const listPostsPage = await dashboard.goToPosts();

    const createPostPage = await listPostsPage.goToNewPost();
    await createPostPage.savePost(postTitleToDelete, postContent);
    await listPostsPage.closeSuccessfulModal();

    const createEditPostPage = await listPostsPage.goToEditPost(postTitleToDelete);

    // When
    await createEditPostPage.deletePost();

    // Then
    await listPostsPage.goto();
    const currentPosts = await listPostsPage.getListOfPosts();
    expect(currentPosts.some(post => post.title === postTitleToDelete)).toBeFalsy();

    await browser.close();
    scenario.successful();
    return;
}

module.exports = {
    createPostValidData,
    createPostEmptyFields,
    createPostExceedingLimits,
    editPostValidData,
    editPostEmptyTitle,
    editPostExceedingLimits,
    editPostEmptyContent,
    deleteNewlyCreatedPost,
    deletePublishedPost,
    deleteRandomGeneratedPost
}