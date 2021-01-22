//import data
const {
  data: { portfolios, users, forumCategories, topics, posts },
} = require('./data');

//import models
const Portfolio = require('../database/models/portfolio');
const User = require('../database/models/user');
const Category = require('../database/models/category');
const Topic = require('../database/models/topic');
const Post = require('../database/models/post');

class FakeDb {
  async populate() {
    await this.clean();
    await this.create();
  }

  async clean() {
    await Portfolio.deleteMany({});
    await User.deleteMany({});
    await Category.deleteMany({});
    await Topic.deleteMany({});
    await Post.deleteMany({});
  }

  async create() {
    await Portfolio.create(portfolios);
    await User.create(users);
    await Category.create(forumCategories);
    await Topic.create(topics);
    await Post.create(posts);
  }
}

module.exports = new FakeDb();
