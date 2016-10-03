const Picture = require('../models/picture');


class PictureDbService {

  constructor() {
  }

  addPicture({id, title, fileStore}, cb) {
    Picture.create({pictureId: id, pictureTitle: title, pictureFileStore: fileStore}, function (err, small) {
      if (err) return handleError(err);
    })
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
