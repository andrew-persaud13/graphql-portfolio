const BaseModel = require('./BaseModel');

class Portfolio extends BaseModel {
  constructor(model, user) {
    super(model, user);
    this.writeRights = ['admin', 'instructor'];
  }

  getAll() {
    return this.Model.find({});
  }

  getById(id) {
    return this.Model.findOne({ _id: id });
  }

  create(data) {
    if (!this.user || !this.writeRights.includes(this.user.role)) {
      console.log('hips');
      throw new Error('Not authorized!');
    }

    data.user = this.user;
    return this.Model.create(data);
  }

  findAndUpdate(id, data) {
    return this.Model.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });
  }

  async findAndDelete(id) {
    const portfolio = await this.Model.findOneAndDelete({ _id: id });
    return portfolio._id;
  }

  getPortfoliosByUser() {
    return this.Model.find({ user: this.user._id }).sort({ startDate: 'desc' });
  }
}

module.exports = Portfolio;
