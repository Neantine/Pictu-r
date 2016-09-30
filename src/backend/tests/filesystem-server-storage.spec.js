const express = require('express');
const supertest = require('supertest');

const app = require('../app');
const config = require('../config/config');

describe('FileSystemServerStorage', () => {

  describe('POST api/v1/nicePic', function() {

    xit('should save the file named nicePic and return unique file ID', function (done) {

      console.log('running tests');
      var picToSend = [{'title': 'nicePic', 'fileData': {}}];

      supertest(app)
        .post('/nicePic')
        .set('Content-Type', 'text/html')
        .set('Accept', 'application/json')
        .send(picToSend)
        .expect(201)
        .end(function (err, res) {

          console.log("test ended ", err);

          if (err) return done(err);

          return done(err, res);
        });

    });
  })


    describe('GET /nicePic', function() {

      xit('should get the file named nicePic from file system', function (done) {

        console.log('running tests');

        supertest(app)
          .get('/nicePic')
          .expect(200)
          .end(function(err, res){

            console.log("test ended ", err);

            if (err) return done(err);

            return done(err, res);
          });

      });
  })


  // describe('POST /user/:iduser/album/:idalbum/picture', function() {
  //   it('should return SOMETHING', function(done) {
  //
  //     request(server)
  //       .post('/user/1234/album/1/picture')/* TODO : faire le test d'envoi de fichier */
  //       .expect(200) /* <--- A virer */
  //       /* TODO : vérifier la présence de l'image dans la base */
  //       /* TODO : vérifier la présence de l'image dans le filesystem */
  //       .end(done);
  //
  //   });
  // })


});
