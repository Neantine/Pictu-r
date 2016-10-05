let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');

const ServerStorage = require('../lib/filesystem-server-storage');
const PDbService = require('../lib/database-picture-storage');

const pictureDbService = new PDbService();
const serverStorage = new ServerStorage();

module.exports = function (app) {
  app.use('/api/v1', router);
  app.use(bodyParser.json({limit:'10000kb'}));
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

      let resultWithUrl = result.map( (pic) => { console.log('mapping ', pic); return {url:serverStorage.getUrl(pic.pictureId), id:pic.pictureId, title:pic.pictureTitle} });

      let resultWithUserAndUrl = {user:userId, pictures:resultWithUrl};

      console.log("resultWithUserAndUrl ", resultWithUserAndUrl);

      res.status(200).send(resultWithUserAndUrl);

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
  let response = null;

  serverStorage.savePicture(bodyReqTitle, bodyReqPictureData).then(

    (fileInfo) => {

        return pictureDbService.addPicture({
          userId:userId,
          pictureId : fileInfo.id,
          pictureTitle: bodyReqTitle,
          pictureFileStore: 'storage-type-server'
        });

      }).then((data) => {

          response = {id: data.pictureId, url: serverStorage.getUrl(data.pictureId), title: data.pictureTitle};
         // console.log(res);
          res.status(201).send(response);
        })
        .catch(err => {
          console.log("save picture error: ", err);
          res.status(500);  //TODO get error status from db service & server storage
          return err;
      });

})
