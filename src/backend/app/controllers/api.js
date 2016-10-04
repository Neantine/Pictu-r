let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');

const ServerStorage = require('../lib/filesystem-server-storage');
const PDbService = require('../lib/database-picture-storage');
const pictureDbService = new PDbService();

module.exports = function (app) {
  app.use('/api/v1', router);
  app.use(bodyParser.json());
};

router.get('/users/:userId/pictures/', function (req, res, next) {

  let bodyRes =  { user: 1, pictures:
    [
      {id : 1, title : 'image 1', url : 'http://m9.i.pbase.com/o6/53/623853/1/131283669.nHMCHWU8.smileyuplo_vector.jpg'},
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

router.post('/users/:userId/pictures/', function (req, res, next) {

  let bodyReqTitle = req.body.title;
  let bodyReqPictureData = req.body.fileData;
  console.log(req.body)
  let serverStorage = new ServerStorage();
  let response = null;

  let userId=1;
  serverStorage.savePicture(bodyReqTitle, bodyReqPictureData).then(
      (generatedFileName, generatedFileURL) => {

        response = {id: generatedFileName, url: generatedFileURL, title: bodyReqTitle};

        return pictureDbService.addPicture({userId:userId,pictureId :generatedFileName, pictureTitle: bodyReqTitle, pictureFileStore: 'storage-type-server'});

      }).then(() => {
          res.status(201).send(response);
        })
        .catch(err => {
          console.log("save picture error: ", err);
          res.status(400).send(response);  //TODO get error status from db service & server storage
          return err;
      })
})
