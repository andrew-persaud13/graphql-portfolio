const BaseModel = require('./BaseModel');

class Category extends BaseModel {
  getAll() {
    return this.Model.find({});
  }

  getBySlug(slug) {
    return this.Model.findOne({ slug }).populate('user');
  }
}

module.exports = Category;
