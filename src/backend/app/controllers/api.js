let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');

const ServerStorage = require('../lib/filesystem-server-storage');
const serverStorage = new ServerStorage();
const PDbService = require('../lib/database-picture-storage');
const pictureDbService = new PDbService();

module.exports = function (app) {
  app.use('/api/v1', router);
  app.use(bodyParser.json());
};

router.get('/users/:userId/pictures', function (req, res, next) {

  let userId = req.params.userId;
  console.log('API ROUTER GET /users/:userId/pictures');

  pictureDbService.findAllPicture(userId).then( (result)=>
    {
      if (result == null)
      {
        res.status(500).send("DB error: can't get user pictures");
        return;
      }

      // result =
      //
      // { user: 1, pictures:
      //   [
      //     {id : 1, title : 'image 1', storagetype : 'server'}, //url : 'http://m9.i.pbase.com/o6/53/623853/1/131283669.nHMCHWU8.smileyuplo_vector.jpg'},
      //     {id : 2, title : 'image 2', storagetype: 'remote'} //url : 'http://megaicons.net/static/img/icons_sizes/404/1405/256/jpg-icon.png'}
      //   ]
      // };



      let url = null;
      let resultWithoutUrl = result.pictures;
      let resultWithUrl = resultWithoutUrl.map( (pic) => { return serverStorage.getUrlFromStorageType(pic) } );

      let withUrl = {user:result.user, pictures:resultWithUrl};

      console.log("resultWithUrl ", withUrl);


      res.status(200).send(withUrl);
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

router.post('users/:userId/pictures/', function (req, res, next) {

  let bodyReqTitle = req.query.title;
  let bodyReqPictureData = req.query.fileData;

  let response = null;

  serverStorage.savePicture(bodyReqTitle, bodyReqPictureData).then(
      (generatedFileName, generatedFileURL) => {

        response = {id: generatedFileName, url: generatedFileURL, title: bodyReqTitle};

        return pictureDbService.addPicture(generatedFileName, bodyReqTitle, 'storage-type-server');

      }).then(() => {
          res.status(201).send(response);
        })
        .catch(err => {
          console.log("save picture error: ", err);
          res.status(400).send(response);  //TODO get error status from db service & server storage
          return err;
      })

})
