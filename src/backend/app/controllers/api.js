var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/api/v1', router);
};

router.get('/images', function (req, res, next) {
  res.send(404);
});
