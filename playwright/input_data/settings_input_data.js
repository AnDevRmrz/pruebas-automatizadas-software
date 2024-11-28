const settingsInputJson = require("../data/settings_input.json");

class SettingsInput {
  constructor(settingsInputJson) {
    this.settingsInputJson = settingsInputJson;
  }

  getRandomInput(input) {
    let randomIndex = Math.floor(Math.random() * input.length);
    return input[randomIndex];
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
    };
  }

  getHugeLanguagePrioriValue() {
    let value = this.getRandomInput(this.settingsInputJson);
    let largLanguage = value.generalLanguage.repeat(32800);

    return {
      generalLanguage: largLanguage,
    };
  }
}

module.exports = {
  settingsInput: new SettingsInput(settingsInputJson),
};
