const mongoose = require('mongoose');
const config = require('../config');
const fakeDb = require('./FakeDb');

mongoose.connect(
  config.DB_URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  async () => {
    console.log('Populating DB');
    await fakeDb.populate();
    console.log('Disconnecting...');
    await mongoose.disconnect();
  }
);
