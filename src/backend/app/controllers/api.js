let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');

const ServerStorage = require('../lib/filesystem-server-storage');
const PDbService = require('../lib/database-picture-storage');
const UserInfoSession = require( '../../app/models/user.info-session' );
const UserService = require( '../../app/lib/user-service' );
const AuthentificationUserService = require( '../../app/lib/authentificator.user-service' );
const UserInfoAccount = require( '../../app/models/user.info-account' );



const pictureDbService = new PDbService();
const serverStorage = new ServerStorage();
const userService = new UserService();
const authentificationUserService = new AuthentificationUserService();


module.exports = function (app) {
  app.use('/api/v1', router);
  app.use(bodyParser.json());
};


//User creation
router.post('/users/', function (req, res, next) {

  let userId = req.params.userId;
  let userPwd = req.params.userPwd;

})

//User login
router.get('/users/', function (req, res, next) {

  let userId = req.headers.userid;
  let userPwd = req.headers.userpwd;

  console.log("User trying to connect : ", userId, userPwd);

  //TODO : find user in dabatbase
  //pictureDbService.findUser(userId).then( (result)=>

  serverStorage.findUser({userId,userPwd}).then( (result) => {
    if (result == null) {
      res.status(500).send('find user result ', err);
    }
    else {
      res.status(230).send('find user result ', result);
    }})
})


//
// router.get('/users', function (req, res, next) {
//
//   let userInfoAccount = new UserInfoAccount({
//     userLogin: req.headers.userlogin,
//     userPassword: req.headers.userpassword
//   });
//
//
//   authentificationUserService.authentificateUser(userInfoAccount).then(
//     ( userAuthentified ) => {
//
//      let userInfoSession = userService.generateToken(userAuthentified.userLogin);
//
//       //TODO store userInfoSession in AuthorizeUserService
//       res.status(230).send(userInfoSession);
//     })
//
//   .catch(
//     ( err ) => {
//
//       res.status(430);  //TODO get error login or password incorrect
//
//     }
//   )
// })



router.get('/users/:userId/pictures', function (req, res, next) {

  let userId = req.params.userId;

  pictureDbService.findUsersPictures(userId).then( (result)=>
    {
      if (result == null)
      {
        res.status(500).send("DB error: can't get user pictures");
        return;
      }

      let resultWithUrl = result.map( (pic) => { console.log('mapping ', pic); return {url:serverStorage.getUrl(pic.pictureId), id:pic.pictureId, title:pic.pictureTitle} });

      let resultWithUserAndUrl = {user:userId, pictures:resultWithUrl};

      // console.log("resultWithUserAndUrl ", resultWithUserAndUrl);

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
         // console.log("save picture error: ", err);
          res.status(500);  //TODO get error status from db service & server storage
          return err;
      });



})
