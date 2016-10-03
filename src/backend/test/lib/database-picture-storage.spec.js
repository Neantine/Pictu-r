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

  it("can be saved a picture", function (done) {
    supertest(app)
      .post('/images/nicePic')
      .expect(400)
      .end(function (err, res) {
        pictureDbService.addPicture({
          pictureId: '123',
          pictureTitle: "My nice pic",
          typeFileStore: "local"
        }, done);
        console.log("My nice pic is store in Database");
      });
  });

  it("can be saved another picture", function (done) {
    supertest(app)
      .post('/images/nicePic')
      .expect(200)
      .end(function (err, res) {
        pictureDbService.addPicture({
          pictureId: '456',
          pictureTitle: "My other nice pic",
          typeFileStore: "local"
        }, done);
        console.log("My other nice pic is store in Database");
      });
  });

  it("can be listed", function (done) {
    supertest(app)
      .get('/images')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done.fail)
      .end(function (err, res) {
        pictureDbService.findAllPicture(function (err, pictures) {
          expect(err).to.not.exist;
          expect(pictures).to.have.length(2);
          done();
        });
      })
  });
});
