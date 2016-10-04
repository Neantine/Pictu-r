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

    const responseFS =  {
      user: 1,
      pictures:
        [
          {id : 1, title : 'image 1', url : 'test1.jpg'},
          {id : 2, title : 'image 2', url : 'test2.jpg'},
          {id : 3, title : 'image 3', url : 'test3.jpg'}
        ]
    }

    ServerStorage.prototype.findUserPictures = jasmine.createSpy().andReturn(Promise.resolve(responseFS));


      request(app)
        .get('/api/v1/users/1/pictures')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, response) {
          expect(err).toBeNull();

          // TODO to complete
        });

    });

  it('should save a picture in database', (done) => {

    const pictureToSend={title:'test', fileData:'data:image/jpg;base64,IMAGE_DATA'};
    const responseFS = {id : '1', url : 'http://m9.i.pbase.com/o6/53/623853/1/131283669.nHMCHWU8.smileyuplo_vector.jpg'};

    ServerStorage.prototype.savePicture = jasmine.createSpy().andReturn(Promise.resolve(responseFS));

    request(app)
      .post('/api/v1/users/1/pictures')
      .send(pictureToSend)
      .expect(201) //201 =>created
      .end(function (err, response) {

        expect(err).toBeNull();

        expect(response.body.id).toEqual('1');
        expect(response.body.url).toEqual('http://m9.i.pbase.com/o6/53/623853/1/131283669.nHMCHWU8.smileyuplo_vector.jpg');
        expect(response.body.title).toEqual('test');

        return done();

      });

  });

});
