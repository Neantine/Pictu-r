var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Picture = mongoose.model('Picture');

module.exports = function (app) {
  app.use('/api/v1', router);
};

router.get('/images', function (req, res, next) {
  res.send('NOT IMPLEMENTED YET!');
});
