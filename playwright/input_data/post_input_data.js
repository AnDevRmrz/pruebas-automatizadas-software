const { faker } = require("@faker-js/faker");
const postInputJson = require("../data/post/post_data.json");
const postLongTitleInputJson = require("../data/post/post_long_title_data.json");
const API_KEY = "a74153e0";

class PostInput {
  constructor() {}

  // Util

  generateRandomLongTitle() {
    let title = "";

    do {
      title += faker.lorem.sentence() + " ";
    } while (title.length <= 256);

    return title.trim();
  }

  async getValueFromAPI(url) {
    const headers = { "X-API-Key": API_KEY };
    const result = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!result.ok) {
      throw new Error("Error al consultar los datos");
    }

    return await result.json();
  }

  // Valid Post
  generatePostRandom() {
    const post = {
      title: faker.lorem.sentence(),
      content: faker.lorem.sentences(),
    };
    return post;
  }

  async generatePostPseudoRandom() {
    return await this.getValueFromAPI("https://my.api.mockaroo.com/post.json");
  }

  generatePostAPriori() {
    return postInputJson[Math.floor(Math.random() * postInputJson.length)];
  }

  // Post with Long Title
  generatePostWithLongTitleRandom() {
    const post = {
      title: this.generateRandomLongTitle(),
      content: faker.lorem.sentences(),
    };
    return post;
  }

  async generatePostWithLongTitlePseudoRandom() {
    return await this.getValueFromAPI("https://my.api.mockaroo.com/postlongtitle.json");
  }

  generatePostWithLongTitleAPriori() {
    return postLongTitleInputJson[Math.floor(Math.random() * postLongTitleInputJson.length)];
  }

}

module.exports = {
  postInput: new PostInput(),
};
