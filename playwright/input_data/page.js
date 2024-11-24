const { faker } = require('@faker-js/faker');
const { deleteAllPages_testing_purpose, createPage_ValidData, createPage_InvalidData, editPage_validData, editPage_InvalidData, previewPage_ValidData, filterDraftPages_ValidData, filterDraftPages_InvalidData, deletePage_ValidData, previewPage_ButtonValidData, previewPage_ButtonInvalidData} = require("../test_scenarios/page");
const {getRandomValueFromJson,getRandomValueFromApi} = require("./data_reading")

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
    const scenario_name = "037- Preview Page Button invalid Data";
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

  //API
  const MOCKAROO_API_URL = 'https://my.api.mockaroo.com/page.json?key=c9aaf1c0';


  async function CreatePage_ValidData_API(){
    const pageTitle = await getRandomValueFromApi(MOCKAROO_API_URL, "page_title");
    const pageDescription = await getRandomValueFromApi(MOCKAROO_API_URL, "page_description");
    const scenario_name = "041 - Create Page Valid Data - API";
    await createPage_ValidData(pageTitle,pageDescription,scenario_name);
  }

  async function CreatePage_InvalidData_API(){
    const pageTitle = await getRandomValueFromApi(MOCKAROO_API_URL, "page_title_invalid");
    const pageDescription = await getRandomValueFromApi(MOCKAROO_API_URL, "page_description");
    const scenario_name = "042 - Create Page Invalid Data - API";
    await createPage_InvalidData(pageTitle,pageDescription,scenario_name);
  }

  async function EditPage_ValidData_API(){
    const previousPageTitle= await getRandomValueFromApi(MOCKAROO_API_URL, "page_title");
    const previousPageDescription = await getRandomValueFromApi(MOCKAROO_API_URL, "page_description");
    const newTitle = await getRandomValueFromApi(MOCKAROO_API_URL, "page_title");
    const newDescription = await getRandomValueFromApi(MOCKAROO_API_URL, "page_description");
    const scenario_name = "043 - Edit Page valid Data - API";
    await editPage_validData(previousPageTitle, previousPageDescription, newTitle, newDescription, scenario_name)
  }

  async function EditPage_InvalidData_API(){
    const previousPageTitle= await getRandomValueFromApi(MOCKAROO_API_URL, "page_title");
    const previousPageDescription = await getRandomValueFromApi(MOCKAROO_API_URL, "page_description");
    const newTitle = await getRandomValueFromApi(MOCKAROO_API_URL, "page_title_invalid");
    const newDescription = await getRandomValueFromApi(MOCKAROO_API_URL, "page_description");
    const scenario_name = "044 - Edit Page Invalid Data - API";
    await editPage_InvalidData(previousPageTitle, previousPageDescription, newTitle, newDescription, scenario_name)
  }

  async function PreviewPage_ValidData_API(){
    const pageTitle = await getRandomValueFromApi(MOCKAROO_API_URL, "page_title");
    const pageDescription = await getRandomValueFromApi(MOCKAROO_API_URL, "page_description");
    const scenario_name = "045- Preview Page valid Data - API";
    await previewPage_ValidData(pageTitle, pageDescription, scenario_name)
  }

  async function PreviewPage_ButtonValidData_API(){
    const pageTitle = await getRandomValueFromApi(MOCKAROO_API_URL, "page_title");
    const pageDescription = await getRandomValueFromApi(MOCKAROO_API_URL, "page_description");
    const buttonName = await getRandomValueFromApi(MOCKAROO_API_URL, "button_name");
    const buttonUrl = await getRandomValueFromApi(MOCKAROO_API_URL, "url_button");
    const scenario_name = "046 - Preview Page Button valid Data - API";
    await previewPage_ButtonValidData(pageTitle, pageDescription, buttonName, buttonUrl, scenario_name)
  }

  async function PreviewPage_ButtonInvalidData_API(){
    const pageTitle = await getRandomValueFromApi(MOCKAROO_API_URL, "page_title");
    const pageDescription = await getRandomValueFromApi(MOCKAROO_API_URL, "page_description");
    const buttonName = await getRandomValueFromApi(MOCKAROO_API_URL, "button_name");
    const buttonUrl = await getRandomValueFromApi(MOCKAROO_API_URL, "url_button_invalid");
    const scenario_name = "047- Preview Page Button invalid Data - API";
    await previewPage_ButtonInvalidData(pageTitle,pageDescription,buttonName,buttonUrl,scenario_name)
  }


  async function FilterDraftPages_ValidData_API(){
    const draftPageTitle = await getRandomValueFromApi(MOCKAROO_API_URL, "page_title");
    const pageDescription = await getRandomValueFromApi(MOCKAROO_API_URL, "page_description");
    const scenario_name = "048- Filter Draft Page valid Data - API";
    await filterDraftPages_ValidData(draftPageTitle,pageDescription,scenario_name) 
  }


  async function FilterDraftPages_InvalidData_API(){
    const draftPageTitle = await getRandomValueFromApi(MOCKAROO_API_URL, "page_title_invalid");
    const pageDescription = await getRandomValueFromApi(MOCKAROO_API_URL, "page_description");
    const scenario_name = "049 - Filter Draft Page Invalid Data - API";
    await filterDraftPages_InvalidData(draftPageTitle,pageDescription,scenario_name) 
  }


  async function DeletePage_ValidData_API(){
    const pageToDelete = await getRandomValueFromApi(MOCKAROO_API_URL, "page_title");
    const pageDescription = await getRandomValueFromApi(MOCKAROO_API_URL, "page_description");
    const scenario_name = "050 - Delete Page Valid Data - API";
    await deletePage_ValidData(pageToDelete,pageDescription,scenario_name)
  }



    //JSON
    const FILE_NAME = "page.json"

    async function CreatePage_ValidData_JSON(){
        const pageTitle = getRandomValueFromJson(FILE_NAME, "page_title");
        const pageDescription = getRandomValueFromJson(FILE_NAME, "page_description");
        const scenario_name = "051 - Create Page Valid Data - JSON";
        await createPage_ValidData(pageTitle,pageDescription,scenario_name);
      }
    
      async function CreatePage_InvalidData_JSON(){
        const pageTitle = getRandomValueFromJson(FILE_NAME, "page_title_invalid");
        const pageDescription = getRandomValueFromJson(FILE_NAME, "page_description");
        const scenario_name = "052 - Create Page Invalid Data - JSON";
        await createPage_InvalidData(pageTitle,pageDescription,scenario_name);
      }
    
      async function EditPage_ValidData_JSON(){
        const previousPageTitle= getRandomValueFromJson(FILE_NAME, "page_title");
        const previousPageDescription = getRandomValueFromJson(FILE_NAME, "page_description");
        const newTitle = getRandomValueFromJson(FILE_NAME, "page_title");
        const newDescription = getRandomValueFromJson(FILE_NAME, "page_description");
        const scenario_name = "053 - Edit Page valid Data - JSON";
        await editPage_validData(previousPageTitle, previousPageDescription, newTitle, newDescription, scenario_name)
      }
    
      async function EditPage_InvalidData_JSON(){
        const previousPageTitle= getRandomValueFromJson(FILE_NAME, "page_title");
        const previousPageDescription = getRandomValueFromJson(FILE_NAME, "page_description");
        const newTitle = getRandomValueFromJson(FILE_NAME, "page_title_invalid");
        const newDescription = getRandomValueFromJson(FILE_NAME, "page_description");
        const scenario_name = "054 - Edit Page Invalid Data - JSON";
        await editPage_InvalidData(previousPageTitle, previousPageDescription, newTitle, newDescription, scenario_name)
      }
    
      async function PreviewPage_ValidData_JSON(){
        const pageTitle = getRandomValueFromJson(FILE_NAME, "page_title");
        const pageDescription = getRandomValueFromJson(FILE_NAME, "page_description");
        const scenario_name = "055- Preview Page valid Data - JSON";
        await previewPage_ValidData(pageTitle, pageDescription, scenario_name)
      }
    
      async function PreviewPage_ButtonValidData_JSON(){
        const pageTitle = getRandomValueFromJson(FILE_NAME, "page_title");
        const pageDescription = getRandomValueFromJson(FILE_NAME, "page_description");
        const buttonName = getRandomValueFromJson(FILE_NAME, "button_name");
        const buttonUrl = getRandomValueFromJson(FILE_NAME, "url_button");
        const scenario_name = "056 - Preview Page Button valid Data - JSON";
        await previewPage_ButtonValidData(pageTitle, pageDescription, buttonName, buttonUrl, scenario_name)
      }
    
      async function PreviewPage_ButtonInvalidData_JSON(){
        const pageTitle = getRandomValueFromJson(FILE_NAME, "page_title");
        const pageDescription = getRandomValueFromJson(FILE_NAME, "page_description");
        const buttonName = getRandomValueFromJson(FILE_NAME, "button_name");
        const buttonUrl = getRandomValueFromJson(FILE_NAME, "url_button_invalid");
        const scenario_name = "057- Preview Page Button invalid Data - JSON";
        await previewPage_ButtonInvalidData(pageTitle,pageDescription,buttonName,buttonUrl,scenario_name)
      }
    
    
      async function FilterDraftPages_ValidData_JSON(){
        const draftPageTitle = getRandomValueFromJson(FILE_NAME, "page_title");
        const pageDescription = getRandomValueFromJson(FILE_NAME, "page_description");
        const scenario_name = "058- Filter Draft Page valid Data - JSON";
        await filterDraftPages_ValidData(draftPageTitle,pageDescription,scenario_name) 
      }
    
    
      async function FilterDraftPages_InvalidData_JSON(){
        const draftPageTitle = getRandomValueFromJson(FILE_NAME, "page_title_invalid");
        const pageDescription = getRandomValueFromJson(FILE_NAME, "page_description");
        const scenario_name = "059 - Filter Draft Page Invalid Data - JSON";
        await filterDraftPages_InvalidData(draftPageTitle,pageDescription,scenario_name) 
      }
    
    
      async function DeletePage_ValidData_JSON(){
        const pageToDelete = getRandomValueFromJson(FILE_NAME, "page_title");
        const pageDescription = getRandomValueFromJson(FILE_NAME, "page_description");
        const scenario_name = "060 - Delete Page Valid Data - JSON";
        await deletePage_ValidData(pageToDelete,pageDescription,scenario_name)
      }

    //Clean data

    async function clean_pages(){
      await deleteAllPages_testing_purpose()

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

    clean_pages
  };
  