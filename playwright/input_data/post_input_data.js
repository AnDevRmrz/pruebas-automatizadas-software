const postInputJson = require("../data/post/post_data.json");
const postLongTitleInputJson = require("../data/post/post_long_title_data.json");
const postLongExcerptInputJson = require("../data/post/post_long_excerpt_data.json");

class PostInput {
  constructor() {}

  // Valid Post
  generatePostAPriori() {
    return postInputJson[Math.floor(Math.random() * postInputJson.length)];
  }

  // Post with Long Title
  generatePostWithLongTitleAPriori() {
    return postLongTitleInputJson[
      Math.floor(Math.random() * postLongTitleInputJson.length)
    ];
  }

  // Post with Long Excerpt
  generatePostWithLongExcerptAPriori() {
    let value =
      postLongExcerptInputJson[
        Math.floor(Math.random() * postLongExcerptInputJson.length)
      ];

    let excerpt = value.excerpt.repeat(2);

    return {
      title: value.title,
      content: value.content,
      excerpt: excerpt,
    };
  }
}

module.exports = {
  postInput: new PostInput(),
};
