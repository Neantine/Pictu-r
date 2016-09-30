const fs = require('fs');
var shortid = require('shortid');

class ServerStorage {

  constructor() {
  }

  saveFile(title, fileData) {

    // console.log('Saving file into file system... ');
    // console.log('title: ',title);
    // console.log('fileData: ', fileData);

    let uniqueID = shortid.generate();
    //console.log('uniqueID ', uniqueID);
    let uniqueFileName = title+''+uniqueID;

    fs.writeFile('src/backend/tests/fixtures/'+uniqueFileName, fileData, (err) => {
      if (err)
      {
         return err;
      }

    })

    return uniqueFileName;

  }

};


module.exports = ServerStorage;
