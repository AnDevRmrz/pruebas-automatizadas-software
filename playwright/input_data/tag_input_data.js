const { faker } = require("@faker-js/faker");
const tagInputJson = require("./tag_input.json");

class TagInput {

  constructor(tagInputJson) {

    this.tagInputJson = tagInputJson;
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

  createTagPrioriValues() {
  
    let value = this.getRandomInput(this.tagInputJson);
  
    return {
      tagName: value.tagName,
      tagSlug: value.tagSlug.toLowerCase(),
      tagDescription: value.tagDescription,
      tagHexColor: value.tagHexColor,
      metaTitle: value.metaTitle,
      metaDescription: value.metaDescription,
      metaUrl: value.metaUrl,
      xCardTitle: value.xCardTitle,
      xCardDescription: value.xCardDescription,
    };
  }
  
  createTagDynamicValues() {
  
    return this.createTagPrioriValues();
  }

  editTagRandomValues() {
    return {
      tagName: faker.lorem.sentence(),
      tagSlug: faker.lorem.word().toLowerCase(),
      tagDescription: faker.lorem.paragraph(),
      tagHexColor: faker.color.rgb({prefix: ""}),
      oldTagName: faker.lorem.sentence(),
      oldTagSlug: faker.lorem.word().toLowerCase(),
      oldTagDescription: faker.lorem.paragraph(),
      oldTagHexColor: faker.color.rgb({prefix: ""}),      
    };
  }

  editTagPrioriValues() {
  
    let oldValue = this.getRandomInput(this.tagInputJson);
    let value = this.getRandomInput(this.tagInputJson);
  
    return {
      tagName: value.tagName,
      tagSlug: value.tagSlug.toLowerCase(),
      tagDescription: value.tagDescription,
      tagHexColor: value.tagHexColor,
      oldTagName: oldValue.tagName,
      oldTagSlug: oldValue.tagSlug.toLowerCase(),
      oldTagDescription: oldValue.tagDescription,
      oldTagHexColor: oldValue.tagHexColor,
    };
  }
  
  editTagDynamicValues() {
  
    return this.editTagPrioriValues();
  }
}

module.exports = {

  tagInput : new TagInput(tagInputJson)
}