const fs = require('fs');
var shortid = require('shortid');
const path = require("path");

class ServerStorage {

  constructor() {
    this.picturesPath = "./stored-pictures";
    console.log('picture path:', this.picturesPath);
  }

  initFs()
  {
    return new Promise(function (resolve, reject) {
      fs.open(this.picturesPath, 'w', (err) => {
        if (err) {
          reject(console.log("fs.open, ", err));
        }
        else {
          resolve(console.log("fs.open OK"));
        }
      })
    })
  }



  savePicture(title, bodyReqPictureData) {

    return new Promise(function (resolve, reject) {

      //Create base64 decoded buffer
      let picData = bodyReqPictureData.replace(/^data:image\/\w+;base64,/, "");
      let decodedPicData = new Buffer(picData, 'base64');

      let uniqueID = shortid.generate();
      let generatedFileName = 'testimage'; //title+''+uniqueID;

      fs.writeFile(this.picturesPath + '/' + generatedFileName, decodedPicData, (err) => {
        if (err) {
          generatedFileName = null;
          reject(console.log("write error: ", err));
        }
        else
        {
          resolve(console.log("savePicture uniqueFileName: ", generatedFileName), generatedFileName);
        }

      })
    })
  }


  getPicture(fileName) {

    return new Promise(function (resolve, reject) {
      let data = null;
      console.log('get picture ', this.picturesPath + '/' + fileName);
      fs.readFile(this.picturesPath + '/' + fileName, (err, data) => {
        if (err) {
          reject(console.log('getPicture error:', err))
        }
        else {
          data = data;
          resolve(console.log("getPicture:", data), data)
        }
      })
    })
  }

};


module.exports = ServerStorage;
