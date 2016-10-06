const express = require('express');
const mongoose = require('mongoose');
let glob = require('glob');
const config = require('./config/config');

mongoose.connect(config.db);
const db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

const models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
const app = express();

require('./config/express')(app, config);

module.exports = app;
