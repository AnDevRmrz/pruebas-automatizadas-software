const { faker } = require("@faker-js/faker");
const API_KEY = "93170200";
const URL = "https://my.api.mockaroo.com/Page.json";
const pageInputJson = require("../data/page_data.json");
const {
  deleteAllPages_testing_purpose,
  createPage_ValidData,
  createPage_InvalidData,
  editPage_validData,
  editPage_InvalidData,
  previewPage_ValidData,
  filterDraftPages_ValidData,
  filterDraftPages_InvalidData,
  deletePage_ValidData,
  previewPage_ButtonValidData,
  previewPage_ButtonInvalidData,
} = require("../test_scenarios/page");

function getValueFromJSON() {
  return pageInputJson[Math.floor(Math.random() * pageInputJson.length)];
}

async function getValueFromAPI() {
  const headers = { "X-API-Key": API_KEY };
  const result = await fetch(URL, {
    method: "GET",
    headers: headers,
  });

  if (!result.ok) {
    throw new Error("Error al consultar los datos");
  }

  return await result.json();
}

//Faker

async function CreatePage_ValidData_Faker() {
  const pageTitle = faker.lorem.words(3);
  const pageDescription = faker.lorem.paragraph();
  const scenario_name = "031 - Create Page Valid Data - Random Data";
  await createPage_ValidData(pageTitle, pageDescription, scenario_name);
}

async function CreatePage_InvalidData_Faker() {
  const pageTitle = faker.lorem.words(50).slice(0, 245) + faker.lorem.words(5);
  const pageDescription = faker.lorem.paragraph();
  const scenario_name = "032 - Create Page Invalid Data - Random Data";
  await createPage_InvalidData(pageTitle, pageDescription, scenario_name);
}

async function EditPage_ValidData_Faker() {
  const previousPageTitle = faker.lorem.words(5);
  const previousPageDescription = faker.lorem.paragraph();
  const newTitle = faker.lorem.words(6);
  const newDescription = faker.lorem.paragraph(3);
  const scenario_name = "033 - Edit Page valid Data - Random Data";
  await editPage_validData(
    previousPageTitle,
    previousPageDescription,
    newTitle,
    newDescription,
    scenario_name
  );
}

async function EditPage_InvalidData_Faker() {
  const previousPageTitle = faker.lorem.words(7);
  const previousPageDescription = faker.lorem.paragraph();
  const newTitle = faker.lorem.words(50).slice(0, 245) + faker.lorem.words(5);
  const newDescription = faker.lorem.paragraph(3);
  const scenario_name = "034 - Edit Page Invalid Data - Random Data";
  await editPage_InvalidData(
    previousPageTitle,
    previousPageDescription,
    newTitle,
    newDescription,
    scenario_name
  );
}

async function PreviewPage_ValidData_Faker() {
  const pageTitle = faker.lorem.words(4);
  const pageDescription = faker.lorem.paragraph();
  const scenario_name = "035 - Preview Page valid Data - Random Data";
  await previewPage_ValidData(pageTitle, pageDescription, scenario_name);
}

async function PreviewPage_ButtonValidData_Faker() {
  const pageTitle = faker.lorem.words(3);
  const pageDescription = faker.lorem.paragraph();
  const buttonName = faker.lorem.words(1);
  const buttonUrl = faker.internet.url();
  const scenario_name = "036 - Preview Page Button valid Data - Random Data";
  await previewPage_ButtonValidData(
    pageTitle,
    pageDescription,
    buttonName,
    buttonUrl,
    scenario_name
  );
}

async function PreviewPage_ButtonInvalidData_Faker() {
  const pageTitle = faker.lorem.words(3);
  const pageDescription = faker.lorem.paragraph();
  const buttonName = faker.lorem.words(1);
  const buttonUrl = faker.lorem.paragraph();
  const scenario_name = "037 - Preview Page Button invalid Data - Random Data";
  await previewPage_ButtonInvalidData(
    pageTitle,
    pageDescription,
    buttonName,
    buttonUrl,
    scenario_name
  );
}

async function FilterDraftPages_ValidData_Faker() {
  const draftPageTitle = faker.lorem.words(3);
  const pageDescription = faker.lorem.paragraph();
  const scenario_name = "038 - Filter Draft Page valid Data - Random Data";
  await filterDraftPages_ValidData(
    draftPageTitle,
    pageDescription,
    scenario_name
  );
}

async function FilterDraftPages_InvalidData_Faker() {
  const draftPageTitle =
    faker.lorem.words(50).slice(0, 245) + faker.lorem.words(5);
  const pageDescription = faker.lorem.paragraph(3);
  const scenario_name = "039 - Filter Draft Page Invalid Data - Random Data";
  await filterDraftPages_InvalidData(
    draftPageTitle,
    pageDescription,
    scenario_name
  );
}

async function DeletePage_ValidData_Faker() {
  const pageToDelete = faker.lorem.words(3);
  const pageDescription = faker.lorem.paragraph(10);
  const scenario_name = "040 - Delete Page Valid Data - Random Data";
  await deletePage_ValidData(pageToDelete, pageDescription, scenario_name);
}

//API
async function CreatePage_ValidData_API() {
  const page = await getValueFromAPI();
  const scenario_name =
    "041 - Create Page Valid Data - Pseudo Random Data Pool";
  await createPage_ValidData(page.title, page.description, scenario_name);
}

async function CreatePage_InvalidData_API() {
  const page = await getValueFromAPI();
  const scenario_name =
    "042 - Create Page Invalid Data - Pseudo Random Data Pool";
  await createPage_InvalidData(page.invalidTitle, page.description, scenario_name);
}

async function EditPage_ValidData_API() {
  const previousPage = await getValueFromAPI();
  const newPage = await getValueFromAPI();
  const scenario_name = "043 - Edit Page valid Data - Pseudo Random Data Pool";
  await editPage_validData(
    previousPage.title,
    previousPage.description,
    newPage.title,
    newPage.description,
    scenario_name
  );
}

async function EditPage_InvalidData_API() {
  const previousPage = await getValueFromAPI();
  const newPage = await getValueFromAPI();
  const scenario_name =
    "044 - Edit Page Invalid Data - Pseudo Random Data Pool";
  await editPage_InvalidData(
    previousPage.title,
    previousPage.description,
    newPage.invalidTitle,
    newPage.description,
    scenario_name
  );
}

async function PreviewPage_ValidData_API() {
  const page = await getValueFromAPI();
  const scenario_name = "045 - Preview Page valid Data - API";
  await previewPage_ValidData(page.title, page.description, scenario_name);
}

async function PreviewPage_ButtonValidData_API() {
  const page = await getValueFromAPI();
  const scenario_name =
    "046 - Preview Page Button valid Data - Pseudo Random Data Pool";
  await previewPage_ButtonValidData(
    page.title,
    page.description,
    page.buttonName,
    page.urlButton,
    scenario_name
  );
}

async function PreviewPage_ButtonInvalidData_API() {
  const page = await getValueFromAPI();
  const scenario_name =
    "047 - Preview Page Button invalid Data - Pseudo Random Data Pool";
  await previewPage_ButtonInvalidData(
    page.title,
    page.description,
    page.buttonName,
    page.urlButtonInvalid,
    scenario_name
  );
}

async function FilterDraftPages_ValidData_API() {
  const page = await getValueFromAPI();
  const scenario_name =
    "048 - Filter Draft Page valid Data - Pseudo Random Data Pool";
  await filterDraftPages_ValidData(page.title, page.description, scenario_name);
}

async function FilterDraftPages_InvalidData_API() {
  const page = await getValueFromAPI();
  const scenario_name =
    "049 - Filter Draft Page Invalid Data - Pseudo Random Data Pool";
  await filterDraftPages_InvalidData(
    page.invalidTitle,
    page.description,
    scenario_name
  );
}

async function DeletePage_ValidData_API() {
  const page = await getValueFromAPI();
  const scenario_name =
    "050 - Delete Page Valid Data - Pseudo Random Data Pool";
  await deletePage_ValidData(page.title, page.description, scenario_name);
}

//JSON

async function CreatePage_ValidData_JSON() {
  const page = getValueFromJSON();
  const scenario_name = "051 - Create Page Valid Data - A-priori Data Pool";
  await createPage_ValidData(page.title, page.description, scenario_name);
}

async function CreatePage_InvalidData_JSON() {
  const page = getValueFromJSON();
  const scenario_name = "052 - Create Page Invalid Data - A-priori Data Pool";
  await createPage_InvalidData(
    page.invalidTitle,
    page.description,
    scenario_name
  );
}

async function EditPage_ValidData_JSON() {
  const previousPage = await getValueFromJSON();
  const newPage = await getValueFromJSON();
  const scenario_name = "053 - Edit Page valid Data - A-priori Data Pool";
  await editPage_validData(
    previousPage.title,
    previousPage.description,
    newPage.title,
    newPage.description,
    scenario_name
  );
}

async function EditPage_InvalidData_JSON() {
  const previousPage = await getValueFromJSON();
  const newPage = await getValueFromJSON();
  const scenario_name = "054 - Edit Page Invalid Data - A-priori Data Pool";
  await editPage_InvalidData(
    previousPage.title,
    previousPage.description,
    newPage.invalidTitle,
    newPage.description,
    scenario_name
  );
}

async function PreviewPage_ValidData_JSON() {
  const page = getValueFromJSON();
  const scenario_name = "055 - Preview Page valid Data - A-priori Data Pool";
  await previewPage_ValidData(page.title, page.description, scenario_name);
}

async function PreviewPage_ButtonValidData_JSON() {
  const page = getValueFromJSON();
  const scenario_name =
    "056 - Preview Page Button valid Data - A-priori Data Pool";
  await previewPage_ButtonValidData(
    page.title,
    page.description,
    page.buttonName,
    page.urlButton,
    scenario_name
  );
}

async function PreviewPage_ButtonInvalidData_JSON() {
  const page = getValueFromJSON();
  const scenario_name =
    "057 - Preview Page Button invalid Data - A-priori Data Pool";
  await previewPage_ButtonInvalidData(
    page.title,
    page.description,
    page.buttonName,
    page.urlButtonInvalid,
    scenario_name
  );
}

async function FilterDraftPages_ValidData_JSON() {
  const page = getValueFromJSON();
  const scenario_name =
    "058 - Filter Draft Page valid Data - A-priori Data Pool";
  await filterDraftPages_ValidData(page.title, page.description, scenario_name);
}

async function FilterDraftPages_InvalidData_JSON() {
  const page = getValueFromJSON();
  const scenario_name =
    "059 - Filter Draft Page Invalid Data - A-priori Data Pool";
  await filterDraftPages_InvalidData(
    page.invalidTitle,
    page.description,
    scenario_name
  );
}

async function DeletePage_ValidData_JSON() {
  const page = getValueFromJSON();
  const scenario_name = "060 - Delete Page Valid Data - A-priori Data Pool";
  await deletePage_ValidData(page.title, page.description, scenario_name);
}

//Clean data

async function clean_pages() {
  await deleteAllPages_testing_purpose();
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
  DeletePage_ValidData_Faker,

  CreatePage_ValidData_API,
  CreatePage_InvalidData_API,
  EditPage_ValidData_API,
  EditPage_InvalidData_API,
  PreviewPage_ValidData_API,
  PreviewPage_ButtonValidData_API,
  PreviewPage_ButtonInvalidData_API,
  FilterDraftPages_ValidData_API,
  FilterDraftPages_InvalidData_API,
  DeletePage_ValidData_API,

  CreatePage_ValidData_JSON,
  CreatePage_InvalidData_JSON,
  EditPage_ValidData_JSON,
  EditPage_InvalidData_JSON,
  PreviewPage_ValidData_JSON,
  PreviewPage_ButtonValidData_JSON,
  PreviewPage_ButtonInvalidData_JSON,
  FilterDraftPages_ValidData_JSON,
  FilterDraftPages_InvalidData_JSON,
  DeletePage_ValidData_JSON,

  clean_pages,
};
