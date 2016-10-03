const Picture = require('../models/picture');


let PictureDbService = function() {
};
/*
Adding a new picture to the database
 */
PictureDbService.prototype.addPicture = function({id,title,fileStore}, cb) {
  Picture.create({ pictureId: id, pictureTitle: title, pictureFileStore: fileStore }, function (err, small) {
    if (err) return handleError(err);
  })
};
/*
Retrieve all the picture from the database
 */
PictureDbService.prototype.findAllPicture = function(cb) {
  Picture.find({}, function(err, pictures) {
    if(err) return cb(err, null);
    cb(null, pictures);
  });

};
/*
Retrieve a specific picture by id
 */
PictureDbService.prototype.findPictureById = function(id, cb) {
  Picture.findOne({ pictureId: id }, function(err, pictures) {
    if(err) return cb(err, null);
    cb(null, pictures);
  });
};


module.exports = PictureDbService;
