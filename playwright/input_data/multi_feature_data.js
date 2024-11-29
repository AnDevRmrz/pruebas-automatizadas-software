const tagInputJson = require("../data/tag_input.json");
const postInputJson = require("../data/post/post_data.json");
const pageInputJson = require("../data/page_data.json");
const settingsInputJson = require("../data/settings_input.json");

class MultiFeatureInput {

  constructor(tagInputJson, postInputJson, pageInputJson, settingsInputJson) {
    this.tagInputJson = tagInputJson;
    this.postInputJson = postInputJson;
    this.pageInputJson = pageInputJson;
    this.settingsInputJson = settingsInputJson;
  }

  getRandomInput(input) {
    let randomIndex = Math.floor(Math.random() * input.length);
    return input[randomIndex];
  }

  getMultiFeatureInput() {
    let valueTag = this.getRandomInput(this.tagInputJson);
    let newValueTag = this.getRandomInput(this.tagInputJson);
    let valuePost = this.getRandomInput(this.postInputJson);
    let valuePage = this.getRandomInput(this.pageInputJson);
    let valueSettings = this.getRandomInput(this.settingsInputJson);

    return {
      tagName: valueTag.tagName,
      tagSlug: valueTag.tagSlug.toLowerCase().trim(),
      tagDescription: valueTag.tagDescription,
      tagHexColor: valueTag.tagHexColor,

      newTagName: newValueTag.tagName,
      newTagSlug: newValueTag.tagSlug.toLowerCase().trim(),
      newTagDescription: newValueTag.tagDescription,
      newTagHexColor: newValueTag.tagHexColor,

      post: valuePost,

      page: valuePage,

      settings: valueSettings
    };
  }
}

module.exports = {
  multiFeatureInput: new MultiFeatureInput(tagInputJson, postInputJson, pageInputJson, settingsInputJson),
};
