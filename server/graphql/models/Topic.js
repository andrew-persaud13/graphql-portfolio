const slugify = require('slugify');
const crypto = require('crypto');
const BaseModel = require('./BaseModel');

class Topic extends BaseModel {
  async getRandoms(limit) {
    const query = await super.getRandoms(limit);
    return query().populate('user');
  }

  getTopicsByCategory(categoryId) {
    return this.Model.find({ forumCategory: categoryId })
      .populate('user')
      .populate('forumCategory');
  }

  findBySlug(slug) {
    return this.Model.findOne({ slug })
      .populate('user')
      .populate('forumCategory');
  }

  async _create(data) {
    const createdTopic = await this.Model.create(data);
    return this.Model.findById(createdTopic._id)
      .populate('user')
      .populate('forumCategory');
  }

  async create(data) {
    if (!this.user) {
      throw new Error('Please log in.');
    }
    data.user = this.user;

    //generate slug
    data.slug = slugify(data.title, { lower: true, replacement: '-' });

    try {
      return await this._create(data);
    } catch (e) {
      if (e.code === 11000 && e.keyPattern && e.keyPattern.slug) {
        data.slug += '-' + this._uniqueSlug();
        return await this._create(data);
      }

      //not slug error
      return null;
    }
  }

  _uniqueSlug() {
    return crypto.randomBytes(4).toString('hex');
  }
}

module.exports = Topic;
