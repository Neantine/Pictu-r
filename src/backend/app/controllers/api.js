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

router.get('/users/:userId/pictures', function (req, res, next) {

  let bodyRes =  { user: 1, pictures:
    [
      {id : 1, title : 'image 1', url : '\\pictu-r\\src\\backend\\app\\lib\\stored-pictures\\test-imageB1z_R1lC.jpg'},
      {id : 2, title : 'image 2', url : '\\stored-pictures\test-imageH1-Z9ygA.jpg'},
      {id : 3, title : 'image 3', url : '\src\backend\app\lib\stored-pictures\test-imagery0cWeeA.jpg'}
    ]
  }

  res.status(200).send(bodyRes);
});

// router.get('user/:userId/picture/:pictureId', function (req, res, next) {
//   res.status(200).send('GET PICTURE NOT IMPLEMENTED YET!');
//
// });

router.post('users/:userId/pictures/', function (req, res, next) {

  console.log("getFileName ");
  getFileName(req);

  let bodyReqTitle = req.query.title;
  let bodyReqPictureData = req.query.fileData;

  let serverStorage = new ServerStorage();
  let response = null;

  serverStorage.savePicture(bodyReqTitle, bodyReqPictureData).then(
      (generatedFileName, generatedFileURL) => {

        response = {id: generatedFileName, url: generatedFileURL, title: bodyReqTitle};

        return PictureDbService.addPicture(generatedFileName, bodyReqTitle, 'storage-type-server');

      }).then(() => {
          res.status(201).send(response);
        })
        .catch(err => {
          console.log("save picture error: ", err);
          res.status(400).send(response);  //TODO get error status from db service & server storage
          return err;
      })

})
