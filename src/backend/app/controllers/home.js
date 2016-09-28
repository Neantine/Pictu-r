var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

var serverstorage = require('./filesystem-server-storage');

module.exports = function (app) {
  app.use('/home', router);
};

router.get('/', function (req, res, next) {
  Article.find(function (err, articles) {
    if (err) return next(err);
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
});


router.post('/nicePic', function (req, res, next) {

  var picTitle = req.body.picTitle;

  serverstorage.saveFile(picTitle);

  res.send(200, picTitle + " is stored");


});
