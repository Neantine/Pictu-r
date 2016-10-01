"use strict";
const fs = require('fs');
var shortid = require('shortid');


class ServerStorage {

  constructor() {
    this.picturesPath = "./stored-pictures/";
  }


  savePicture(title, bodyReqPictureData) {


    //Create base64 decoded buffer
    let picData = bodyReqPictureData.replace(/^data:image\/\w+;base64,/, "");
    let decodedPicData = new Buffer(picData, 'base64');


    let uniqueID = shortid.generate();
    let uniqueFileName = title+''+uniqueID;


    fs.writeFile(this.picturesPath+uniqueFileName, decodedPicData, (err) => {
      if (err)
      {
        uniqueFileName = null;
        return err;
      }

    })

    return uniqueFileName;

  }


  getPicture(uniqueFileName) {

    let data = null;

    fs.readFile(this.picturesPath+uniqueFileName, (err, data) => {
      if (err)
      {
        return err;
      }
      data= data;
      return data;

    })

    return data;
  }

};


module.exports = ServerStorage;
