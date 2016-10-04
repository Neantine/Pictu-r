const app = require('../../app');
const Picture = require('../../app/models/picture');
const request = require('supertest');

describe('App picture ', () => {
  it('should return a list of picture', (done) => {
      request(app)
        .get('/users/1/pictures')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, response) {
          if (err) {throw err}

        });

    });

  it('should save a picture in database', (done) => {
    const pictureToSend={title:'test', fileData:'data:image/jpg;base64,IMAGE_DATA'}
    const response = {id : 1, url : 'http://m9.i.pbase.com/o6/53/623853/1/131283669.nHMCHWU8.smileyuplo_vector.jpg'}

    request(app)
      .post('/users/1/pictures')
      .set('Content-Type', /json/)
      .send(pictureToSend)
      .expect(201) //201 =>created
      .end(function (err, response) {
        if (err)
        {
          return
        }





      });

  });

});
