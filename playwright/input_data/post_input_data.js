const { faker } = require("@faker-js/faker");
const postInputJson = require("../data/post/post_data.json");
const postLongTitleInputJson = require("../data/post/post_long_title_data.json");
const postLongExcerptInputJson = require("../data/post/post_long_excerpt_data.json");
const API_KEY = "a74153e0";

class PostInput {
  constructor() {}

  // Util

  generateRandomLongString(limit) {
    let title = "";

    do {
      title += faker.lorem.sentence() + " ";
    } while (title.length <= limit);

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
    return await this.getValueFromAPI("https://my.api.mockaroo.com/Post.json");
  }

  generatePostAPriori() {
    return postInputJson[Math.floor(Math.random() * postInputJson.length)];
  }

  // Post with Long Title
  generatePostWithLongTitleRandom() {
    const post = {
      title: this.generateRandomLongString(256),
      content: faker.lorem.sentences(),
    };
    return post;
  }

  async generatePostWithLongTitlePseudoRandom() {
    return await this.getValueFromAPI(
      "https://my.api.mockaroo.com/PostLongTitle.json"
    );
  }

  generatePostWithLongTitleAPriori() {
    return postLongTitleInputJson[
      Math.floor(Math.random() * postLongTitleInputJson.length)
    ];
  }

  // Post with Long Excerpt
  generatePostWithLongExcerptRandom() {
    const post = {
      title: faker.lorem.sentence(),
      content: faker.lorem.sentences(),
      excerpt: this.generateRandomLongString(301),
    };
    return post;
  }

  async generatePostWithLongExcerptPseudoRandom() {

    let value = await this.getValueFromAPI("https://my.api.mockaroo.com/PostLongExcerpt.json");

    let excerpt = value.excerpt.repeat(2);

    return {
      title: value.title,
      content: value.content,
      excerpt: excerpt
    };
  }

  generatePostWithLongExcerptAPriori() {

    let value = postLongExcerptInputJson[
      Math.floor(Math.random() * postLongExcerptInputJson.length)
    ];

    let excerpt = value.excerpt.repeat(2);

    return {
      title: value.title,
      content: value.content,
      excerpt: excerpt
    };
  }
}

module.exports = {
  postInput: new PostInput(),
};
