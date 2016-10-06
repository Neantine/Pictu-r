const fs = require('fs');
let shortid = require('shortid');
const path = require("path");
const url = require('url');

let usersList = [{userId:'bb', userPwd:'ffff'}, {userId:'bbrr', userPwd:'bg012'}, {userId:'marion', userPwd:'70roBert'}];

function createDir(filePath) {

  filePath = path.dirname(filePath);
  console.log('create dir ',filePath );

  if (checkExist(filePath)) {
    return true;
  }
  checkExist(filePath);
  fs.mkdirSync(filePath);
}

function checkExist(path) {
  console.log('checkExist ',path );

  try {
    return fs.statSync(path).isDirectory();
  }
  catch (err) {
    return false;
  }
}

class ServerStorage {

  constructor() {
    this.picturesPath = '../../../../dist/stored-pictures';
    this.serverType = 'local';
  }


  savePicture(bodyReqTitle, bodyReqPictureData) {

    return new Promise((resolve, reject) => {

      //Create base64 decoded buffer
      let picData = bodyReqPictureData.replace(/^data:image\/\w+;base64,/, "");
      let decodedPicData = new Buffer(picData, 'base64');

      let uniqueID = shortid.generate();
      let generatedFileName = bodyReqTitle + '' + uniqueID + ".jpg";

      let fileName = this.picturesPath + '\\' + generatedFileName;
      let filePath = path.join(__dirname, fileName);

      console.log("write file: ", filePath);

      createDir(filePath);
      //this.picturesPath = storePath;

      fs.writeFile(filePath, decodedPicData, 'base64', (err) => {

        if (err) {
          generatedFileName = null;
          console.log("write error: ", err);
          reject(err);
        }
        else {
          resolve({
            id: generatedFileName
          });
        }
      })
    })

  }


  getPicture(fileName) {

    return new Promise((resolve, reject) => {
      let data = null;
      fs.readFile(this.picturesPath + '/' + fileName, (err, data) => {
        if (err) {
          reject(console.log('getPicture error:', err))
        }
        else {
          data = data;
          resolve(data)
        }
      })
    })
  }

  getUrl(fileName) {
    return '/stored-pictures/' + path.join(fileName);

    //return `${this.picturesPath}/${fileName}`;
  }


  findUser(user) {
    console.log("find user ", user);

    return new Promise((resolve, reject) => {


      if (usersList.filter(function(u) {console.log("FILTER ", user, usersList); u.userId === user.userId && u.userPwd === user.userPwd; }).length == 1)
      {
        let generatedToken = shortid.generate();
        console.log('user found ', user, generatedToken );
        resolve({userId:user.userId, userToken:generatedToken});
      }

      else {
        console.log("User not found, create user first");
        reject("User not found, create user first");
      }
    })
  }
}





module.exports = ServerStorage;
