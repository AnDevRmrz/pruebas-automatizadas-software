const { SignInPage } = require("../page_objects/sign_in_page");
const { expect } = require('@playwright/test');
const playwright = require("playwright");
const { Scenario } = require("../util/util");
const { faker } = require('@faker-js/faker');

async function createPostValidData() {  
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();  
    const scenario = new Scenario(page, "001 - Create Post");
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitle = faker.lorem.words(3); 
    const postContent = faker.lorem.paragraph(); 
    const expectedPostStatus = "Published";

    console.log(`Creating post: Title="${postTitle}", Content="${postContent}"`);

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

async function createPostEmptyFields() {  
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();  
    const scenario = new Scenario(page, "002 - Create Post - Empty Fields");
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

async function createPostExceedingLimits() {  
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();  
    const scenario = new Scenario(page, "003 - Create Post - Exceeding Limits");
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitle = faker.lorem.words(500); 
    const postContent = faker.lorem.paragraphs(50); 

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

async function editPostValidData() {
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();
    const scenario = new Scenario(page, "004 - Edit Post - Valid Data");
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitleToEdit = "Auto post";
    const newPostTitle = faker.lorem.words(5); 
    const newPostContent = faker.lorem.paragraph(); 
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

async function editPostEmptyTitle() {
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();
    const scenario = new Scenario(page, "005 - Edit Post - Empty Title");
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitleToEdit = "Auto post";
    const newPostTitle = ""; 
    const newPostContent = faker.lorem.paragraph();

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

async function editPostExceedingLimits() {
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();
    const scenario = new Scenario(page, "006 - Edit Post - Exceeding Limits");
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitleToEdit = "Auto post";
    const newPostTitle = faker.lorem.words(500); 
    const newPostContent = faker.lorem.paragraphs(50); 

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

async function editPostEmptyContent() {
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();
    const scenario = new Scenario(page, "007 - Edit Post - Empty Content");
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitleToEdit = "Auto post";
    const newPostTitle = faker.lorem.words(5);
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

async function deleteNewlyCreatedPost() {
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();
    const scenario = new Scenario(page, "008 - Delete Newly Created Post");
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitleToDelete = faker.lorem.words(5); 
    const postContent = faker.lorem.sentence(); 

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

async function deletePublishedPost() {
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();
    const scenario = new Scenario(page, "009 - Delete Published Post");
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitleToDelete = "Published Post"; 
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

async function deleteRandomGeneratedPost() {
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();
    const scenario = new Scenario(page, "010 - Delete Randomly Generated Post");
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitleToDelete = faker.lorem.words(3); 
    const postContent = faker.lorem.paragraph(); 

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

const listTest = [
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
]

module.exports = {
    listTest
}