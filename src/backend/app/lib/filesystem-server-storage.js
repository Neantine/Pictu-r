const fs = require('fs');

class ServerStorage {

  constructor() {
  }

  saveFile(title, fileData) {
    console.log('Saving file into file system... ', title, ' ', fileData);
    return 10122012;
  }

};


module.exports = ServerStorage;
