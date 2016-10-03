let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');

const ServerStorage = require('../lib/filesystem-server-storage');
const PDbService = require('../lib/database-picture-storage');
const PictureDbService = new PDbService();

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

  console.log("getFileName ");
  getFileName(req);

  let bodyReqTitle = req.query.title;
  let bodyReqPictureData = req.query.fileData;

  let serverStorage = new ServerStorage();
  let response = null;

  serverStorage.savePicture(bodyReqTitle, bodyReqPictureData).then(
    (generatedFileName, generatedFileURL) => {
      console.log("Picture saved with generatedFileName: ", generatedFileName);
      console.log("Picture saved with generatedFileName: ", generatedFileURL);

      response = {id: generatedFileName, url: generatedFileURL, title: bodyReqTitle};

      PictureDbService.addPicture(generatedFileName, bodyReqTitle, 'storage-type-server').then(() => {
        res.status(201).send(response);
      });


    }).catch(err => {
    console.log("save picture error: ", err);
    res.status(400).send(response);  //TODO get error status from db service & server storage
    return err;
  })

})
