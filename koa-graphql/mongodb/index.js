const mongoose = require('mongoose');
const config = require('../config');
require('./schema/info');
require('./schema/student');

const database = () => {
  mongoose.set('debug', true);
  mongoose.connect(config.mongourl);
  mongoose.connection.on('disconnected', () => {
    mongoose.connection(config.mongourl);
  });
  mongoose.connection.on('error', (err) => {
    console.error(err);
  });
  mongoose.connection.on('open', () => {
    console.log('Connected to MongoDB', config.mongourl);
  });
};

module.exports = {
  database
};
