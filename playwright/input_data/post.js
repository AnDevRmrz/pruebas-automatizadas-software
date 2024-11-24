const playwright = require("playwright");
const { faker } = require('@faker-js/faker');
const { SignInPage } = require("../page_objects/sign_in_page");
const { expect } = require("@playwright/test");
const { createPostValidData,
    createPostMinimumData,
    createPostOnlySpaces,
    createPostSpecialCharacters,
    createPostExceedingLimits,
    editPostValidData,
    editPostWithValidation,
    editPostExceedingLimits,
    deleteNewlyCreatedPost,
    deletePublishedPost } = require("../test_scenarios/post");
    const {getRandomValueFromJson,getRandomValueFromApi} = require("./data_reading_post")

async function createPostValidDataFaker() {
    const postTitle = faker.lorem.words(3);  
    const postContent = faker.lorem.paragraph(); 
    const scenario = "001 - Create post valid data"
    await createPostValidData(postTitle, postContent, scenario);
}

async function createPostEmptyFieldsFaker() {
    const scenario = "002 - Create Post - Empty Fields"
    await createPostMinimumData(scenario);
}

async function createPostExceedingLimitsFaker() {
    const postTitle = faker.lorem.words(2);  
    const postContent = faker.lorem.paragraphs(); 
    const scenario = "003 - Create Post - Exceeding Limits"
    await createPostExceedingLimits(postTitle, postContent, scenario);
}

async function editPostValidDataFaker() {
    const postTitle = faker.lorem.words(5); 
    const postContent = faker.lorem.paragraph(); 
    const scenario = "004 - Edit Post - Valid Data"
    await editPostValidData(postTitle, postContent, scenario);
}

async function editPostEmptyTitleFaker() {
    const scenario = "005 - Edit Post - Empty Title"
    await createPostOnlySpaces(scenario);
}

async function editPostExceedingLimitsFaker() {
    const postTitle = faker.lorem.words(5); 
    const postContent = faker.lorem.paragraphs(); 
    const scenario = "006 - Edit Post - Exceeding Limits"
    await editPostExceedingLimits(postTitle, postContent, scenario);
}

async function editPostEmptyContentFaker() {
    const postTitleToEdit = "Auto post";
    const newPostTitle = faker.lorem.words(5); 
    const scenario = "007 - Edit Post - Empty Content"
    await createPostSpecialCharacters(postTitleToEdit, newPostTitle, scenario);
}

async function deleteNewlyCreatedPostFaker() {
    const postTitleToDelete = faker.lorem.words(5); 
    const postContent = faker.lorem.sentence(); 
    const scenario = "008 - Delete Newly Created Post"
    await deleteNewlyCreatedPost(postTitleToDelete, postContent, scenario);
}

async function deletePublishedPostFaker() {
    const postTitleToDelete = "Published Post"; 
    const scenario = "009 - Delete Published Post"
    await deletePublishedPost(postTitleToDelete, scenario);
}

async function deleteRandomGeneratedPostFaker() {
    const postTitleToDelete = faker.lorem.words(3); 
    const postContent = faker.lorem.paragraph(); 
    const scenario = "010 - Delete Randomly Generated Post"
    await editPostWithValidation(postTitleToDelete, postContent, scenario);
}

const MOCKAROO_API_URL = 'https://my.api.mockaroo.com/post.json?key=3abda250';

async function createPostValidDataApi() {
    const pageTitle = await getRandomValueFromApi(MOCKAROO_API_URL, "postTitle");
    const pageDescription = await getRandomValueFromApi(MOCKAROO_API_URL, "description");
    const scenario_name = "011 - Create post valid data - API";
    await createPostValidData(pageTitle, pageDescription, scenario_name);
}

async function createPostEmptyFieldsApi() {
    const scenario = "012 - Create Post - Empty Fields - API"
    await createPostMinimumData(scenario);
}

async function createPostExceedingLimitsApi() {
    const postTitle = await getRandomValueFromApi(MOCKAROO_API_URL, "postTitle");  
    const postContent = await getRandomValueFromApi(MOCKAROO_API_URL, "description"); 
    const scenario = "013 - Create Post - Exceeding Limits - API"
    await createPostExceedingLimits(postTitle, postContent, scenario);
}

async function editPostValidDataApi() {
    const postTitle = await getRandomValueFromApi(MOCKAROO_API_URL, "postTitle");  
    const postContent = await getRandomValueFromApi(MOCKAROO_API_URL, "description"); 
    const scenario = "014 - Edit Post - Valid Data - API"
    await editPostValidData(postTitle, postContent, scenario);
}

async function editPostEmptyTitleApi() {
    const postContent = await getRandomValueFromApi(MOCKAROO_API_URL, "description"); 
    const scenario = "015 - Edit Post - Empty Title - API"
    await createPostOnlySpaces(scenario);
}

async function editPostExceedingLimitsApi() {
    const postTitle = await getRandomValueFromApi(MOCKAROO_API_URL, "postTitle");  
    const postContent = await getRandomValueFromApi(MOCKAROO_API_URL, "description"); 
    const scenario = "016 - Edit Post - Exceeding Limits - API"
    await editPostExceedingLimits(postTitle, postContent, scenario);
}

async function editPostEmptyContentApi() {
    const postTitleToEdit = "Auto post";
    const newPostTitle = await getRandomValueFromApi(MOCKAROO_API_URL, "postTitle"); 
    const scenario = "017 - Edit Post - Empty Content - API"
    await createPostSpecialCharacters(postTitleToEdit, newPostTitle, scenario);
}

async function deleteNewlyCreatedPostApi() {
    const postTitleToDelete = await getRandomValueFromApi(MOCKAROO_API_URL, "postTitle"); 
    const postContent = await getRandomValueFromApi(MOCKAROO_API_URL, "description"); 
    const scenario = "018 - Delete Newly Created Post - API"
    await deleteNewlyCreatedPost(postTitleToDelete, postContent, scenario);
}

async function deletePublishedPostApi() {
    const postTitleToDelete = await getRandomValueFromApi(MOCKAROO_API_URL, "postTitle"); 
    const scenario = "019 - Delete Published Post - API"
    await deletePublishedPost(postTitleToDelete, scenario);
}

async function deleteRandomGeneratedPostApi() {
    const postTitleToDelete = await getRandomValueFromApi(MOCKAROO_API_URL, "postTitle"); 
    const postContent = await getRandomValueFromApi(MOCKAROO_API_URL, "description");  
    const scenario = "020 - Delete Randomly Generated Post - API"
    await editPostWithValidation(postTitleToDelete, postContent, scenario);
}

const FILE_NAME = "post.json"

async function createPostValidDataJson() {
    const pageTitle = await getRandomValueFromJson(FILE_NAME, "postTitle");
    const pageDescription = await getRandomValueFromJson(FILE_NAME, "description");
    const scenario_name = "021 - Create post valid data - JSON";
    await createPostValidData(pageTitle, pageDescription, scenario_name);
}

async function createPostEmptyFieldsJson() {
    const scenario = "022 - Create Post - Empty Fields - JSON"
    await createPostMinimumData(scenario);
}

async function createPostExceedingLimitsJson() {
    const postTitle = await getRandomValueFromJson(FILE_NAME, "postTitle");  
    const postContent = await getRandomValueFromJson(FILE_NAME, "description"); 
    const scenario = "023 - Create Post - Exceeding Limits - JSON"
    await createPostExceedingLimits(postTitle, postContent, scenario);
}

async function editPostValidDataJson() {
    const postTitle = await getRandomValueFromJson(FILE_NAME, "postTitle");  
    const postContent = await getRandomValueFromJson(FILE_NAME, "description"); 
    const scenario = "024 - Edit Post - Valid Data - JSON"
    await editPostValidData(postTitle, postContent, scenario);
}

async function editPostEmptyTitleJson() {
    const postContent = await getRandomValueFromApi(FILE_NAME, "description"); 
    const scenario = "025 - Edit Post - Empty Title - JSON"
    await createPostOnlySpaces(scenario);
}

async function editPostExceedingLimitsJson() {
    const postTitle = await getRandomValueFromJson(FILE_NAME, "postTitle");  
    const postContent = await getRandomValueFromJson(FILE_NAME, "description"); 
    const scenario = "026 - Edit Post - Exceeding Limits - JSON"
    await editPostExceedingLimits(postTitle, postContent, scenario);
}

async function editPostEmptyContentJson() {
    const postTitleToEdit = "Auto post";
    const newPostTitle = await getRandomValueFromJson(FILE_NAME, "postTitle"); 
    const scenario = "027 - Edit Post - Empty Content - JSON"
    await createPostSpecialCharacters(postTitleToEdit, newPostTitle, scenario);
}

async function deleteNewlyCreatedPostJson() {
    const postTitleToDelete = await getRandomValueFromJson(FILE_NAME, "postTitle"); 
    const postContent = await getRandomValueFromJson(FILE_NAME, "description"); 
    const scenario = "028 - Delete Newly Created Post - JSON"
    await deleteNewlyCreatedPost(postTitleToDelete, postContent, scenario);
}

async function deletePublishedPostJson() {
    const postTitleToDelete = await getRandomValueFromJson(FILE_NAME, "postTitle"); 
    const scenario = "029 - Delete Published Post - JSON"
    await deletePublishedPost(postTitleToDelete, scenario);
}

async function deleteRandomGeneratedPostJson() {
    const postTitleToDelete = await getRandomValueFromJson(FILE_NAME, "postTitle"); 
    const postContent = await getRandomValueFromJson(FILE_NAME, "description");  
    const scenario = "030 - Delete Randomly Generated Post - JSON"
    await editPostWithValidation(postTitleToDelete, postContent, scenario);
}

module.exports = {
    createPostValidDataFaker,
    createPostEmptyFieldsFaker,
    createPostExceedingLimitsFaker,
    editPostValidDataFaker,
    editPostEmptyTitleFaker,
    editPostExceedingLimitsFaker,
    editPostEmptyContentFaker,
    deleteNewlyCreatedPostFaker,
    deletePublishedPostFaker,
    deleteRandomGeneratedPostFaker,

    createPostValidDataApi,
    createPostEmptyFieldsApi,
    createPostExceedingLimitsApi,
    editPostValidDataApi,
    editPostEmptyTitleApi,
    editPostExceedingLimitsApi,
    editPostEmptyContentApi,
    deleteNewlyCreatedPostApi,
    deletePublishedPostApi,
    deleteRandomGeneratedPostApi,

    createPostValidDataJson,
    createPostEmptyFieldsJson,
    createPostExceedingLimitsJson,
    editPostValidDataJson,
    editPostEmptyTitleJson,
    editPostExceedingLimitsJson,
    editPostEmptyContentJson,
    deleteNewlyCreatedPostJson,
    deletePublishedPostJson,
    deleteRandomGeneratedPostJson
}