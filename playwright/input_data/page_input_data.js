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
