const fs = require('fs');

class ServerStorage {

  constructor() {
  }

  saveFile(title, fileData) {

    console.log('Saving file into file system... ');
    console.log('title: ',title);
    console.log('fileData: ', fileData);

    fs.writeFile(title, fileData, (err) => {
      if (err)
      {
        console.log("Saving file error ", err);
          return err;
      }

    })

    return 10122012;

  }

};


module.exports = ServerStorage;
