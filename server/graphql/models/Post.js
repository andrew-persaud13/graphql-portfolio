const moment = require('moment');
const crypto = require('crypto');
const BaseModel = require('./BaseModel');

class Post extends BaseModel {
  async getAllByTopic({ topicId, pageNum = 1, postsPerPage = 5 }) {
    const skip = postsPerPage * (pageNum - 1);

    const count = await this.Model.countDocuments({ topic: topicId });
    const posts = await this.Model.find({ topic: topicId })
      .sort('createdAt')
      .skip(skip)
      .limit(postsPerPage)
      .populate('topic')
      .populate('user')
      .populate({
        path: 'parent',
        populate: 'user',
      });

    return { posts, count };
  }

  async create(data) {
    if (!this.user) {
      throw new Error('Please log in to create post.');
    }

    data.user = this.user;

    const createdAt = moment().toISOString();
    const slugPart = this._uniqueSlug();
    const fullSlugPart = createdAt + ':' + slugPart;

    if (data.parent) {
      const parent = await this.Model.findById(data.parent);
      data.slug = parent.slug + '/' + slugPart;
      data.fullSlug = parent.fullSlug + '/' + fullSlugPart;
    } else {
      data.slug = slugPart;
      data.fullSlug = fullSlugPart;
    }

    const createdPost = await this.Model.create(data);
    return this.Model.findById(createdPost)
      .populate('topic')
      .populate({ path: 'parent', populate: 'user' })
      .populate('user');
  }

  _uniqueSlug() {
    return crypto.randomBytes(4).toString('hex');
  }
}

module.exports = Post;
