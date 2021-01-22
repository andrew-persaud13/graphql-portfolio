const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: String,
  subTitle: String,
  slug: { type: String, unique: true, index: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Category', categorySchema);
