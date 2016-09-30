var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');


const ServerStorage = require('../lib/filesystem-server-storage');

module.exports = function (app) {
  app.use('/api/v1', router);
  app.use(bodyParser.json());
};

router.get('/images', function (req, res, next) {
  res.status(404).send('GET ALL PICTURES NOT IMPLEMENTED YET!');
});

router.get('/nicePic', function (req, res, next) {
  res.status(200).send('GET PICTURE NOT IMPLEMENTED YET!');

});

router.post('/nicePic', function (req, res, next) {

   var title = req.query.title;
   var fileData = req.query.fileData;
   //console.log("QUERY: ", title, fileData);
   //var fileData = req.query.fileData;
   //console.log(saveFile);
  let serverStorage = new ServerStorage();

   var uniqueID = serverStorage.saveFile(title, fileData);
   res.status(201).send('PICTURE STORED WITH ID ');//, uniqueID);

  //res.status(200).send('PICTURE STORED WITH ID ');//,  uniqueID);
  //res.send('POST PICTURE NOT IMPLEMENTED YET!', req);

  // var title = req.body.title;
  // var fileData = req.body.fileData;
  //
  // serverStorage.saveFile(title, fileData);
  //
  // res.send(200, title + " is stored");


});
