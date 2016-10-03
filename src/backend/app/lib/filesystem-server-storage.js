"use strict";
const fs = require('fs');
var shortid = require('shortid');
const path = require("path");

class ServerStorage {

  constructor() {
    this.picturesPath = "./stored-pictures";
    console.log('picture path:', this.picturesPath);
  }


  savePicture(title, bodyReqPictureData) {


    //Create base64 decoded buffer
    let picData = bodyReqPictureData.replace(/^data:image\/\w+;base64,/, "");
    let decodedPicData = new Buffer(picData, 'base64');



    let uniqueID = shortid.generate();
    let uniqueFileName = 'testimage'; //title+''+uniqueID;


    fs.open(this.picturesPath, 'w', (err) =>
    {
      console.log("fs.open, ", err);
      return err;

      fs.writeFile(this.picturesPath + '/' + uniqueFileName, decodedPicData, (err) => {
        if (err) {
          console.log("write error: ", err);
          uniqueFileName = null;
          return err;
        }

      })
      console.log("savePicture uniqueFileName: ", uniqueFileName);
      return uniqueFileName;
    })

  }


  getPicture(uniqueFileName) {

    let data = null;
    console.log('get picture ', this.picturesPath+'/'+uniqueFileName);
    fs.readFile(this.picturesPath+'/'+uniqueFileName, (err, data) => {
      if (err)
      {
        console.log('getPicture error:', err);
        return err;
      }
      data= data;
      console.log("getPicture:", data);
      return data;

    })

    return data;
  }

};


module.exports = ServerStorage;
