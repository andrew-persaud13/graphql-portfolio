class BaseModel {
  constructor(model, user = null) {
    this.Model = model;
    this.user = user;
  }

  async getRandoms(limit) {
    const count = await this.Model.countDocuments();
    let randomIdx;

    if (limit > count) {
      randomIdx = 0;
    } else {
      randomIdx = count - limit;
    }

    const random = Math.round(Math.random() * randomIdx);
    return () => this.Model.find({}).skip(random).limit(limit);
  }
}

module.exports = BaseModel;
