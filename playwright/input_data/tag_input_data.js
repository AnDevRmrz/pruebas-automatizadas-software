const { faker } = require("@faker-js/faker");
const tagInputJson = require("../data/tag_input.json");

const TAG_SCHEMA_URL = "https://my.api.mockaroo.com/tag.json";
const API_KEY = "75b08cb0";

class TagInput {

  constructor(tagInputJson) {

    this.tagInputJson = tagInputJson;
  }

  async getValueFromAPI() {

    const headers = {"X-API-Key": API_KEY};
    const result = await fetch(TAG_SCHEMA_URL, { method: 'GET', headers: headers });

    if (!result.ok) {
      throw new Error('Error al consultar los datos');
    }

    return await result.json();
  }

  getRandomInput(input) {

    let randomIndex = Math.floor(Math.random() * input.length);
    return input[randomIndex];
  }
  
  createTagRandomValues() {
    return {
      tagName: faker.lorem.sentence(),
      tagSlug: faker.lorem.word().toLowerCase(),
      tagDescription: faker.lorem.paragraph(),
      tagHexColor: faker.color.rgb({prefix: ""}),
      metaTitle: faker.lorem.sentence(),
      metaDescription: faker.lorem.paragraph(),
      metaUrl: faker.internet.url(),
      xCardTitle: faker.lorem.sentence(),
      xCardDescription: faker.lorem.paragraph()
    };
  }

  createTagHugeRandomValues() {

    let tagName = faker.lorem.sentence();
    tagName = tagName.repeat(50);

    let tagDescription = faker.lorem.paragraph();
    tagDescription = tagDescription.repeat(500);

    return {
      tagName: tagName,
      tagSlug: faker.lorem.word().toLowerCase(),
      tagDescription: tagDescription,
      tagHexColor: faker.color.rgb({prefix: ""}),
      metaTitle: faker.lorem.sentence(),
      metaDescription: faker.lorem.paragraph(),
      metaUrl: faker.internet.url(),
      xCardTitle: faker.lorem.sentence(),
      xCardDescription: faker.lorem.paragraph()
    };
  }

  createTagPrioriValues() {
  
    let value = this.getRandomInput(this.tagInputJson);
  
    return {
      tagName: value.tagName,
      tagSlug: value.tagSlug.toLowerCase().trim(),
      tagDescription: value.tagDescription,
      tagHexColor: value.tagHexColor,
      metaTitle: value.metaTitle,
      metaDescription: value.metaDescription,
      metaUrl: value.metaUrl,
      xCardTitle: value.xCardTitle,
      xCardDescription: value.xCardDescription,
    };
  }

  createTagHugePrioriValues() {
  
    let value = this.getRandomInput(this.tagInputJson);

    let tagName = value.tagName;
    tagName = tagName.repeat(50);

    let tagDescription = value.tagDescription;
    tagDescription = tagDescription.repeat(500);
  
    return {
      tagName: tagName,
      tagSlug: value.tagSlug.toLowerCase().trim(),
      tagDescription: tagDescription,
      tagHexColor: value.tagHexColor,
      metaTitle: value.metaTitle,
      metaDescription: value.metaDescription,
      metaUrl: value.metaUrl,
      xCardTitle: value.xCardTitle,
      xCardDescription: value.xCardDescription,
    };
  }
  
  async createTagDynamicValues() {

    let value = await this.getValueFromAPI();
  
    return {
      tagName: value.tagName,
      tagSlug: value.tagSlug.toLowerCase().trim(),
      tagDescription: value.tagDescription,
      tagHexColor: value.tagHexColor,
      metaTitle: value.metaTitle,
      metaDescription: value.metaDescription,
      metaUrl: value.metaUrl,
      xCardTitle: value.xCardTitle,
      xCardDescription: value.xCardDescription,
    };
  }

  async createTagHugeDynamicValues() {

    let value = await this.getValueFromAPI();

    let tagName = value.tagName;
    tagName = tagName.repeat(50);

    let tagDescription = value.tagDescription;
    tagDescription = tagDescription.repeat(500);
  
    return {
      tagName: tagName,
      tagSlug: value.tagSlug.toLowerCase().trim(),
      tagDescription: tagDescription,
      tagHexColor: value.tagHexColor,
      metaTitle: value.metaTitle,
      metaDescription: value.metaDescription,
      metaUrl: value.metaUrl,
      xCardTitle: value.xCardTitle,
      xCardDescription: value.xCardDescription,
    };
  }

  editTagRandomValues() {
    return {
      tagName: faker.lorem.sentence(),
      tagSlug: faker.lorem.word().toLowerCase().trim(),
      tagDescription: faker.lorem.paragraph(),
      tagHexColor: faker.color.rgb({prefix: ""}),
      oldTagName: faker.lorem.sentence(),
      oldTagSlug: faker.lorem.word().toLowerCase().trim(),
      oldTagDescription: faker.lorem.paragraph(),
      oldTagHexColor: faker.color.rgb({prefix: ""}),      
    };
  }

  editTagPrioriValues() {
  
    let oldValue = this.getRandomInput(this.tagInputJson);
    let value = this.getRandomInput(this.tagInputJson);
  
    return {
      tagName: value.tagName,
      tagSlug: value.tagSlug.toLowerCase().trim(),
      tagDescription: value.tagDescription,
      tagHexColor: value.tagHexColor,
      oldTagName: oldValue.tagName,
      oldTagSlug: oldValue.tagSlug.toLowerCase().trim(),
      oldTagDescription: oldValue.tagDescription,
      oldTagHexColor: oldValue.tagHexColor,
    };
  }
  
  async editTagDynamicValues() {
  
    let value = await this.getValueFromAPI();
    let oldValue = await this.getValueFromAPI();
  
    return {
      tagName: value.tagName,
      tagSlug: value.tagSlug.toLowerCase().trim(),
      tagDescription: value.tagDescription,
      tagHexColor: value.tagHexColor,
      oldTagName: oldValue.tagName,
      oldTagSlug: oldValue.tagSlug.toLowerCase().trim(),
      oldTagDescription: oldValue.tagDescription,
      oldTagHexColor: oldValue.tagHexColor,
    };
  }
}

module.exports = {

  tagInput : new TagInput(tagInputJson)
}