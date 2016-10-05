const fs = require('fs');
let shortid = require('shortid');
const path = require("path");
const url = require('url');

class ServerStorage {

  constructor() {
    this.picturesPath = "./src/backend/app/lib/stored-pictures";
    //console.log('picture path:', this.picturesPath);
  }

  savePicture(bodyReqTitle, bodyReqPictureData) {

    return new Promise( (resolve, reject) => {

      //Create base64 decoded buffer
      let picData = bodyReqPictureData.replace(/^data:image\/\w+;base64,/, "");
      let decodedPicData = new Buffer(picData, 'base64');

      let uniqueID = shortid.generate();
      let generatedFileName = bodyReqTitle+''+uniqueID+".jpg";

      fs.writeFile(this.picturesPath + '/' + generatedFileName, decodedPicData, 'base64', (err) => {

        if (err) {
          generatedFileName = null;
          console.log("write error: ", err);
          reject(err);
        }
        else
        {
          let localpath = path.join(process.cwd(), this.picturesPath);

          resolve({
            id: generatedFileName,
            url: `${localpath}/${generatedFileName}`
          });

        }

      })
    })
  }


  getPicture(fileName) {

    return new Promise( (resolve, reject) => {
      let data = null;
      //console.log('get picture ', this.picturesPath + '/' + fileName);
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

  getUrlFromStorageType({_id:_id, userId:userId, pictureId:pictureId, pictureTitle:pictureTitle, pictureFileStore:pictureFileStore, __v:__v})
  {
    let url = '';

    if (pictureFileStore === 'storageTypeServer')
    {
      url = 'http://m9.i.pbase.com/o6/53/623853/1/131283669.nHMCHWU8.smileyuplo_vector.jpg';

    }

    else if (pictureFileStore === 'storageTypeCloud')
    {
      url = 'http://megaicons.net/static/img/icons_sizes/404/1405/256/jpg-icon.png';
    }

    console.log("getUrlFromStorageType", pictureId, pictureTitle, url);

    return {pictureId:pictureId, pictureTitle:pictureTitle, pictureUrl:url};
  }

};



module.exports = ServerStorage;
