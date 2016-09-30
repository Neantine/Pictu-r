const fs = require('fs');
var shortid = require('shortid');

class ServerStorage {

  constructor() {
  }

  saveFile(title, fileData, callback) {

    // console.log('Saving file into file system... ');
    // console.log('title: ',title);
    // console.log('fileData: ', fileData);

    let uniqueID = shortid.generate();
    //console.log('uniqueID ', uniqueID);
    let uniqueFileName = title+''+uniqueID;

    let err = null;
    let res = null;

    fs.writeFile('src/backend/tests/fixtures/'+uniqueFileName, fileData, (err, res) => {
      if (err)
      {
         return err;
      }

      res = uniqueFileName;

    })



    return callback(err, res);

  }

};


module.exports = ServerStorage;
