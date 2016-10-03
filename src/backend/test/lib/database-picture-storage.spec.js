const supertest = require('supertest');


const config = require('../../config/config');
const app = require('../../app');
const Picture = require('../../app/models/picture');
const PictureDbService = require('../../app/lib/database-picture-storage');
const pictureDbService = new PictureDbService();

describe("Database Picture", function () {

  /*

   beforeEach(function(done) {
   Picture({})(done);
   console.log("Database is Empty");
   });
   */


  xit("can be saved a picture", function (done) {

    pictureDbService.addPicture({
      pictureId: '123',
      pictureTitle: "My nice pic",
      typeFileStore: "local"
    })
      .then(() => {

      });

  });


  xit("can be saved another picture", function (done) {

    pictureDbService.addPicture({
      pictureId: '456',
      pictureTitle: "My other nice pic",
      typeFileStore: "local"
    })
      .then(() => {

      });
  });

  xit("can be listed", function (done) {
    pictureDbService.findAllPicture(function (err, pictures) { })
      .then((err, pictures) => {
        expect(err).to.not.exist;
        expect(pictures).to.have.length(2);
      })
  })
});
