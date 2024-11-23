const { faker } = require("@faker-js/faker");
const settingsInputJson = require("./settings_input.json");

class SettingsInput {

  constructor(settingsInputJson) {

    this.settingsInputJson = settingsInputJson;
  }

  getRandomInput(input) {
    let randomIndex = Math.floor(Math.random() * input.length);
    return input[randomIndex];
  }

  getRandomValues() {

    return {
      generalTitle: faker.lorem.sentence(),
      generalDescription: faker.lorem.paragraph(),
      generalLanguage: faker.location.countryCode(),
      xCardTitle: faker.lorem.sentence(),
      xCardDescription: faker.lorem.paragraph(),
      facebookTitle: faker.lorem.sentence(),
      facebookDescription: faker.lorem.paragraph(),
      metaTitle: faker.lorem.sentence(),
      metaDescription: faker.lorem.paragraph(),
    }
  }

  getPrioriValues() {

    let value = this.getRandomInput(this.settingsInputJson);

    return {
      generalTitle: value.generalTitle,
      generalDescription: value.generalDescription,
      generalLanguage: value.generalLanguage,
      xCardTitle: value.xCardTitle,
      xCardDescription: value.xCardDescription,
      facebookTitle: value.facebookTitle,
      facebookDescription: value.facebookDescription,
      metaTitle: value.metaTitle,
      metaDescription: value.metaDescription,
    }
  }

  getDynamicValues() {

    return this.getPrioriValues();
  }
  
}

module.exports = {
  settingsInput: new SettingsInput(settingsInputJson),
};
