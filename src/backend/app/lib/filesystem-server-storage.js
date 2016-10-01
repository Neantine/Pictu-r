"use strict";
const fs = require('fs');
var shortid = require('shortid');

class ServerStorage {

  constructor() {
  }

  savePicture(title, fileData) {

    // console.log('Saving file into file system... ');
    // console.log('title: ',title);
    // console.log('fileData: ', fileData);

    let uniqueID = shortid.generate();
    //console.log('uniqueID ', uniqueID);
    let uniqueFileName = title+''+uniqueID;
   // console.log('uniqueFileName ', uniqueFileName);
    let err = null;
    let res = null;

    fs.writeFile('src/backend/tests/fixtures/'+uniqueFileName, fileData, (err) => {
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

    fs.readFile('src/backend/tests/fixtures/'+uniqueFileName, (err, data) => {
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
