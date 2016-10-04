const app = require('../../app');
const Picture = require('../../app/models/picture');
const ServerStorage = require('../../app/lib/filesystem-server-storage');
const request = require('supertest');


describe('App picture ', () => {

  let ServerStorageSavePictureBackup;

  beforeEach(function(done) {

    Picture.remove({},  (err) => {
      if(err){throw err;}
      done();
    });

    ServerStorageSavePictureBackup = ServerStorage.prototype.savePicture;

  });

  afterEach(() => {

    ServerStorage.prototype.savePicture = ServerStorageSavePictureBackup;

  });

  xit('should return a list of picture', (done) => {
      request(app)
        .get('/users/1/pictures')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, response) {
          if (err) {throw err}

        });

    });

  it('should save a picture in database', (done) => {

    console.log("debut test api get");

    const pictureToSend={title:'test', fileData:'data:image/jpg;base64,IMAGE_DATA'};
    const responseFS = {id : 1, url : 'http://m9.i.pbase.com/o6/53/623853/1/131283669.nHMCHWU8.smileyuplo_vector.jpg'};


    request(app)
      .post('api/v1/users/1/pictures')
      .set('Content-Type', 'application/json/')
      .send(pictureToSend)
      .expect(201) //201 =>created
      .end(function (err, response) {
        if (err)
        { return done(err) ; }
        ServerStorage.prototype.savePicture = jasmine.createSpy().andReturn(Promise.resolve(responseFS));

        console.log(response);

        // TODO check status response = 201 and body = {id : 1, url : 'http://m9.i.pbase.com/o6/53/623853/1/131283669.nHMCHWU8.smileyuplo_vector.jpg'}
       return done(err, response);
      });

      });

});
