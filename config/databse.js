const mongoose = require('mongoose');
const config = require('./index');

const db = mongoose
  .connect(config.mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

module.exports = db;
