let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');

const ServerStorage = require('../lib/filesystem-server-storage');
const PDbService = require('../lib/database-picture-storage');

const pictureDbService = new PDbService();
const serverStorage = new ServerStorage();

module.exports = function (app) {
  app.use('/api/v1', router);
  app.use(bodyParser.json());
};

router.get('/users/:userId/pictures', function (req, res, next) {

  let userId = req.params.userId;
  //console.log('API ROUTER GET /users/:userId/pictures');

  pictureDbService.findUsersPictures(userId).then( (result)=>
    {
      if (result == null)
      {
        res.status(500).send("DB error: can't get user pictures");
        return;
      }

      console.log("DB result: ", result);

      let url = null;
      let resultWithUrl = result.map( (pic) => { console.log('mapping ', pic); return serverStorage.getUrlFromStorageType(pic) } );

      //let withUrl = {user:result.user, pictures:resultWithUrl};

      console.log("resultWithUrl ", resultWithUrl);

      res.status(200).send(resultWithUrl);

    })

  // ).catch()
  // {
  //   res.status(500).send();
  // }

});

// router.get('user/:userId/picture/:pictureId', function (req, res, next) {
//   res.status(200).send('GET PICTURE NOT IMPLEMENTED YET!');
//
// });


router.post('/users/:userId/pictures/', function (req, res, next) {
//  console.log("API Router Post ")
  let bodyReqTitle = req.body.title;
  let bodyReqPictureData = req.body.fileData;
  let userId = req.params.userId;
  let url;
  let response = null;

  serverStorage.savePicture(bodyReqTitle, bodyReqPictureData).then(

    (fileInfo) => {

        url = fileInfo.url;
        return pictureDbService.addPicture({
          userId:userId,
          pictureId : fileInfo.id,
          pictureTitle: bodyReqTitle,
          pictureFileStore: 'storage-type-server'
        });

      }).then((data) => {

          response = {id: data.pictureId, url: url, title: data.pictureTitle};
         // console.log(res);
          res.status(201).send(response);
        })
        .catch(err => {
          console.log("save picture error: ", err);
          res.status(500);  //TODO get error status from db service & server storage
          return err;
      });

})
