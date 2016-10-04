const Picture = require('../models/picture');

class PictureDbService {

  constructor() {
  }

  addPicture({id, title, fileStore}) {
    return new Promise((resolve, reject) => {
      Picture.create({pictureId: id, pictureTitle: title, pictureFileStore: fileStore}, (err) => {
        if (err) {
          reject("Error during the adding of picture in database: ", err);
        }
        else {
          resolve({pictureId: id, pictureTitle: title, pictureFileStore: fileStore})
        }
      })
    });
  };

  /*
   Retrieve all the picture from the database
   */
  findAllPicture() {
    return new Promise((resolve, reject) => {
      Picture.find({}, (err, pictures) => {
        if (err) {
          reject("Error during the retrieving of all pictures from the database: ", err);
        }
        else {
          resolve(pictures);
        }
      });
    })
  };

  /*
   Retrieve a specific picture by id
   */
  findPictureById(id) {
    return new Promise((resolve, reject) => {
      Picture.findOne({pictureId: id}, (err, pictures) => {
        if (err) {
          reject("Error during the retrieving of the picture of Id from the database: ", err);
        }
        else {
          resolve(pictures);
        }
      });
    })
  }
}

module.exports = PictureDbService;
