/**
 * Object Model of a picture ( <title>, (object picture))
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PictureSchema = new Schema({
  pictureId: String,
  pictureTitle: String,
  pictureFileStore: String
});

const Picture = mongoose.model('Picture', PictureSchema);
module.exports = Picture;
