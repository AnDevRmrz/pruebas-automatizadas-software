const tagInputJson = require("../data/tag_input.json");
const postInputJson = require("../data/post/post_data.json");

class MultiFeatureInput {

  constructor(tagInputJson, postInputJson) {
    this.tagInputJson = tagInputJson;
    this.postInputJson = postInputJson;
  }

  getRandomInput(input) {
    let randomIndex = Math.floor(Math.random() * input.length);
    return input[randomIndex];
  }

  getMultiFeatureInput() {
    let valueTag = this.getRandomInput(this.tagInputJson);
    let newValueTag = this.getRandomInput(this.tagInputJson);
    let valuePost = this.getRandomInput(this.postInputJson);

    return {
      tagName: valueTag.tagName,
      tagSlug: valueTag.tagSlug.toLowerCase().trim(),
      tagDescription: valueTag.tagDescription,
      tagHexColor: valueTag.tagHexColor,

      newTagName: newValueTag.tagName,
      newTagSlug: newValueTag.tagSlug.toLowerCase().trim(),
      newTagDescription: newValueTag.tagDescription,
      newTagHexColor: newValueTag.tagHexColor,

      post: valuePost      
    };
  }
}

module.exports = {
  multiFeatureInput: new MultiFeatureInput(tagInputJson, postInputJson),
};
