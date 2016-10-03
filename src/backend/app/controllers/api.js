<<<<<<< HEAD
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');

const ServerStorage = require('../lib/filesystem-server-storage');
//const PDbService = require('../lib/database-picture-storage');
//const PictureDbService = new PDbService();
=======
var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Picture = mongoose.model('Picture');
>>>>>>> feacture-backend-db

module.exports = function (app) {
  app.use('/api/v1', router);
  app.use(bodyParser.json());
};

router.get('user/:userId/pictures', function (req, res, next) {
  res.status(404).send('GET ALL PICTURES NOT IMPLEMENTED YET!');
});

// router.get('user/:userId/picture/:pictureId', function (req, res, next) {
//   res.status(200).send('GET PICTURE NOT IMPLEMENTED YET!');
//
// });

router.post('user/:userId/pictures/', function (req, res, next) {

   let title = req.query.title;
   let fileData = req.query.fileData;

   let serverStorage = new ServerStorage();
   serverStorage.initFs().then( () => {
      serverStorage.saveFile(fileData).then( (generatedFileName) => {
        //PictureDbService.addPicture(generatedFileName, title, 'storage-type-server');
     })

   }).catch( (err) => {
     return err;
   })

   res.status(201).send('PICTURE STORED WITH ID ');//, uniqueID);


});
