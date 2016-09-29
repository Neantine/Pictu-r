var express = require('express');
var router = express.Router();

const serverStorage = require('../lib/filesystem-server-storage');

module.exports = function (app) {
  app.use('/api/v1', router);
};

router.get('/images', function (req, res, next) {
  res.send('GET IMAGES NOT IMPLEMENTED YET!');
});

router.get('/nicePic', function (req, res, next) {
  res.send('GET PICTURE NOT IMPLEMENTED YET!');
});

router.post('/nicePic', function (req, res, next) {

  console.log("BODY REQUEST: ",req.body);   //Le parametre du formulaire est dans le body

  res.send('POST PICTURE NOT IMPLEMENTED YET!');

  // var title = req.body.title;
  // var fileData = req.body.fileData;
  //
  // serverStorage.saveFile(title, fileData);
  //
  // res.send(200, title + " is stored");


});
