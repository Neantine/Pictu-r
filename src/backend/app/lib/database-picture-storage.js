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
  findAllPicture(userId) {
    return new Promise( (resolve, reject) => {

      let listPic =

      { user: 1, pictures:
        [
          {id : 1, title : 'image 1', storagetype : 'server'}, //url : 'http://m9.i.pbase.com/o6/53/623853/1/131283669.nHMCHWU8.smileyuplo_vector.jpg'},
          {id : 2, title : 'image 2', storagetype: 'remote'} //url : 'http://megaicons.net/static/img/icons_sizes/404/1405/256/jpg-icon.png'}
        ]
      };


      //console.log("findAllPictures ", listPic);

      resolve(listPic);


    // }
    // Picture.find({}, function (err, pictures) {
    //   if (err) return cb(err, null);
    //   cb(null, pictures);
    // });

  })
  }

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
