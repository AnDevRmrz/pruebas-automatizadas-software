const tagInputJson = require("../data/tag_input.json");

class TagInput {
  constructor(tagInputJson) {
    this.tagInputJson = tagInputJson;
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
}

module.exports = {
  tagInput: new TagInput(tagInputJson),
};
