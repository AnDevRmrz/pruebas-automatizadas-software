const playwright = require("playwright");
const { faker } = require('@faker-js/faker');
const { SignInPage } = require("../page_objects/sign_in_page");
const { expect } = require("@playwright/test");
const { createPage_ValidData, createPage_InvalidData, editPage_validData, editPage_InvalidData, previewPage_ValidData, filterDraftPages_ValidData, filterDraftPages_InvalidData, deletePage_ValidData, previewPage_ButtonValidData, previewPage_ButtonInvalidData} = require("../test_scenarios/page");



  //Faker

  async function CreatePage_ValidData_Faker(){
    const pageTitle = faker.lorem.words(3); 
    const pageDescription = faker.lorem.paragraph(); 
    const scenario_name = "031 - Create Page Valid Data";
    await createPage_ValidData(pageTitle,pageDescription,scenario_name);
  }

  async function CreatePage_InvalidData_Faker(){
    const pageTitle = faker.lorem.words(50).slice(0, 245) + faker.lorem.words(5);
    const pageDescription = faker.lorem.paragraph(); 
    const scenario_name = "032 - Create Page Invalid Data";
    await createPage_InvalidData(pageTitle,pageDescription,scenario_name);
  }

  async function EditPage_ValidData_Faker(){
    const previousPageTitle= faker.lorem.words(5); 
    const previousPageDescription = faker.lorem.paragraph(); 
    const newTitle = faker.lorem.words(6); 
    const newDescription = faker.lorem.paragraph(3); 
    const scenario_name = "033 - Edit Page valid Data";
    await editPage_validData(previousPageTitle, previousPageDescription, newTitle, newDescription, scenario_name)
  }

  async function EditPage_InvalidData_Faker(){
    const previousPageTitle= faker.lorem.words(7); 
    const previousPageDescription = faker.lorem.paragraph(); 
    const newTitle = faker.lorem.words(50).slice(0, 245) + faker.lorem.words(5);
    const newDescription = faker.lorem.paragraph(3); 
    const scenario_name = "034 - Edit Page Invalid Data";
    await editPage_InvalidData(previousPageTitle, previousPageDescription, newTitle, newDescription, scenario_name)
  }

  async function PreviewPage_ValidData_Faker(){
    const pageTitle = faker.lorem.words(4); 
    const pageDescription = faker.lorem.paragraph(); 
    const scenario_name = "035- Preview Page valid Data";
    await previewPage_ValidData(pageTitle, pageDescription, scenario_name)
  }

  async function PreviewPage_ButtonValidData_Faker(){
    const pageTitle = faker.lorem.words(3); 
    const pageDescription = faker.lorem.paragraph(); 
    const buttonName = faker.lorem.words(1); 
    const buttonUrl = faker.internet.url()
    const scenario_name = "036 - Preview Page Button valid Data";
    await previewPage_ButtonValidData(pageTitle, pageDescription, buttonName, buttonUrl, scenario_name)
  }

  async function PreviewPage_ButtonInvalidData_Faker(){
    const pageTitle = faker.lorem.words(3); 
    const pageDescription = faker.lorem.paragraph(); 
    const buttonName = faker.lorem.words(1); 
    const buttonUrl = faker.lorem.paragraph()
    const scenario_name = "037- Preview Page Button valid Data";
    await previewPage_ButtonInvalidData(pageTitle,pageDescription,buttonName,buttonUrl,scenario_name)
  }


  async function FilterDraftPages_ValidData_Faker(){
    const draftPageTitle = faker.lorem.words(3); 
    const pageDescription = faker.lorem.paragraph(); 
    const scenario_name = "038- Filter Draft Page valid Data";
    await filterDraftPages_ValidData(draftPageTitle,pageDescription,scenario_name) 
  }


  async function FilterDraftPages_InvalidData_Faker(){
    const draftPageTitle = faker.lorem.words(50).slice(0, 245) + faker.lorem.words(5);
    const pageDescription = faker.lorem.paragraph(3); 
    const scenario_name = "039 - Filter Draft Page Invalid Data";
    await filterDraftPages_InvalidData(draftPageTitle,pageDescription,scenario_name) 
  }


  async function DeletePage_ValidData_Faker(){
    const pageToDelete = faker.lorem.words(3); 
    const pageDescription = faker.lorem.paragraph(10); 
    const scenario_name = "040 - Delete Page Valid Data";
    await deletePage_ValidData(pageToDelete,pageDescription,scenario_name)
  }

  module.exports = {
    CreatePage_ValidData_Faker,
    CreatePage_InvalidData_Faker,
    EditPage_ValidData_Faker,
    EditPage_InvalidData_Faker,
    PreviewPage_ValidData_Faker,
    PreviewPage_ButtonValidData_Faker,
    PreviewPage_ButtonInvalidData_Faker,
    FilterDraftPages_ValidData_Faker,
    FilterDraftPages_InvalidData_Faker,
    DeletePage_ValidData_Faker
  };
  