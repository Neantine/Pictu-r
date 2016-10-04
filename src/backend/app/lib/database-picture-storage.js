const Picture = require('../models/picture');

class PictureDbService {

  constructor() {
  }

  addPicture({id, title, fileStore}) {
    return new Promise((resolve, reject) => {
    Picture.create({pictureId: id, pictureTitle: title, pictureFileStore: fileStore}, (err) => {
      if (err){ reject("Error during the adding of picture in database: ", err);}
      else{ resolve("The picture "+title+" is add to the database")}
    })
  });
  };

  /*
   Retrieve all the picture from the database
   */
  findAllPicture(cb) {
    Picture.find({}, function (err, pictures) {
      if (err) return cb(err, null);
      cb(null, pictures);
    });

  };

  /*
   Retrieve a specific picture by id
   */
  findPictureById(id, cb) {
    Picture.findOne({pictureId: id}, function (err, pictures) {
      if (err) return cb(err, null);
      cb(null, pictures);
    });
  };
}

module.exports = PictureDbService;
