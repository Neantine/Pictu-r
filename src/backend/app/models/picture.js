/**
 * Object Model of a picture ( <title>, (object picture))
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PictureSchema = new Schema({
  userId : Number,
  pictureId: String,
  pictureTitle: String,
  pictureFileStore: String
});

const Picture = mongoose.model('Picture', PictureSchema);
module.exports = Picture;
