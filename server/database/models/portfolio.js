const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 128 },
  company: { type: String, required: true, maxlength: 64 },
  companyWebsite: { type: String, required: true, maxlength: 128 },
  location: { type: String, required: true, maxlength: 128 },
  jobTitle: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: Date,
  createdAt: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
