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
          expect(response.body.length).toEqual(2);
        });

    });

});
