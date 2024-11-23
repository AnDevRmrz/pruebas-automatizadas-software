const { faker } = require("@faker-js/faker");
const settingsInputJson = require("../data/settings_input.json");

const TAG_SCHEMA_URL = "https://my.api.mockaroo.com/settings.json";
const API_KEY = "75b08cb0";

class SettingsInput {

  constructor(settingsInputJson) {

    this.settingsInputJson = settingsInputJson;
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

  async getDynamicValues() {

    let value = await this.getValueFromAPI();

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
  
}

module.exports = {
  settingsInput: new SettingsInput(settingsInputJson),
};
