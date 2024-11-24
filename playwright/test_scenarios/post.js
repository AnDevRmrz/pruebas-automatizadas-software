const { SignInPage } = require("../page_objects/sign_in_page");
const { expect } = require('@playwright/test');
const playwright = require("playwright");
const { Scenario } = require("../util/util");

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

async function createPostMinimumData(scenario_name) {
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();  
    const scenario = new Scenario(page, scenario_name);
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitle = "A";  
    const postContent = "B";  

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

    await browser.close();
    scenario.successful();
}

async function createPostExceedingLimits(postTitle_name, postContent_name, scenario_name) {  
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();  
    const scenario = new Scenario(page, scenario_name);
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitle = "Auto post"; 
    const postContent = "postContent_name"; 
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

async function createPostOnlySpaces(scenario_name) {
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();  
    const scenario = new Scenario(page, scenario_name);
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitle = "A".repeat(5); 
    const postContent = "Contenido normal";
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

async function createPostSpecialCharacters(scenario_name) {
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();  
    const scenario = new Scenario(page, scenario_name);
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitle = "@#$%^&*()_+!";
    const postContent = "Contenido con símbolos especiales: @#$%^&*()_+!";

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

    await browser.close();
    scenario.successful();
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

async function editPostWithValidation(postTitleToEdit_name, newPostTitle_name, newPostContent_name, scenario_name) {
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();
    const scenario = new Scenario(page, scenario_name);
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";
    const postTitleToEdit = "Auto post";
    const newPostTitle = newPostTitle_name; 
    const newPostContent = newPostContent_name; 
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

async function editPostExceedingLimits(postTitle_name, postContent_name, scenario_name) {
    const browser = await playwright["chromium"].launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();
    const scenario = new Scenario(page, scenario_name);
    scenario.begin();

    const email = "alguien@hotmail.com";
    const password = "123456#213asdf";

    if (!postTitle_name || !postContent_name) {
        throw new Error("New post title and content cannot be empty.");
    }

    // Given
    const signInPage = new SignInPage(scenario);
    await signInPage.goto();
    const dashboard = await signInPage.signIn(email, password);
    const listPostsPage = await dashboard.goToPosts();
    const createEditPostPage = await listPostsPage.goToEditPost(postTitle_name);

    // When
    await createEditPostPage.updatePost(postTitle_name, postContent_name);

    // Then
    await listPostsPage.goto();
    const currentPosts = await listPostsPage.getListOfPosts();
    expect(currentPosts.some(post => post.title === postTitle_name)).toBeTruthy();

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
    const postContent = "postContent_name"; 

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
    createPostMinimumData,
    createPostOnlySpaces,
    createPostSpecialCharacters,
    createPostExceedingLimits,
    editPostValidData,
    editPostWithValidation,
    editPostExceedingLimits,
    deleteNewlyCreatedPost,
    deletePublishedPost
}