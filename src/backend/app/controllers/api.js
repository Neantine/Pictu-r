var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/api/v1', router);
};

router.get('/images', function (req, res, next) {
  res.send('NOT IMPLEMENTED YET!');
});

router.post('/nicePic', function (req, res, next) {

  var picTitle = req.body.picTitle;

  serverstorage.saveFile(picTitle);

  res.send(200, picTitle + " is stored");


});
