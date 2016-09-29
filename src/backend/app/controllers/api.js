var express = require('express');
var router = express.Router();

const serverStorage = require('../lib/filesystem-server-storage');

module.exports = function (app) {
  app.use('/api/v1', router);
};

router.get('/images', function (req, res, next) {
  res.send('NOT IMPLEMENTED YET!');
});

router.post('/nicePic', function (req, res, next) {

  var picTitle = req.body.picTitle;

  serverStorage.saveFile(picTitle);

  res.send(200, picTitle + " is stored");


});
