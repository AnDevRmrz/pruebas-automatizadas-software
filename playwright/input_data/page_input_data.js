const pageInputJson = require("../data/page_data.json");

class PageInput {
  constructor() {}

  getValueFromJSON() {
    return pageInputJson[Math.floor(Math.random() * pageInputJson.length)];
  }

  //Clean data
  async clean_pages() {
    await deleteAllPages_testing_purpose();
  }
}

module.exports = {
  pageInput: new PageInput(),
};
