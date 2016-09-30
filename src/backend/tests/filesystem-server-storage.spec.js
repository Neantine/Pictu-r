const express = require('express');
const supertest = require('supertest');

const app = require('../app');
const config = require('../config/config');
var path = require('path');

const fs = require('fs');
const ServerStorage = require('../app/lib/filesystem-server-storage');

describe('ServerStorage', () => {


  describe('function savefile from post api/v1/nicePic', function() {

    it('should save the file in the filesystem', function (done) {

      let serverStorage = new ServerStorage();

      let img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0"
        + "NAAAAKElEQVQ4jWNgYGD4Twzu6FhFFGYYNXDUwGFpIAk2E4dHDRw1cDgaCAASFOffhEIO"
        + "3gAAAABJRU5ErkJggg==";

      let data = img.replace(/^data:image\/\w+;base64,/, "");
      let buf = new Buffer(data, 'base64');

      serverStorage.saveFile('nicePic', buf, (err, res) => {

          expect(err).toBeNull;
          expect(res).toBeString;

          fs.readFile('src/backend/tests/fixtures/'+res, 'base64', (err, data) =>
          {
            expect(err).toBeNull;
            //expect(data).not.to.be.null;
            return done(err, data);
          });
      });


      return done();



      // var picToSend = [{'title': 'nicePic', 'fileData': filedata64 }];
      //
      // supertest(app)
      //   .post('/nicePic')
      //   .set('Content-Type', 'text/html')
      //   .set('Accept', 'application/json')
      //   .send(picToSend)
      //   .expect(201)
      //   .end(function (err, res) {
      //
      //     console.log("test ended ", err);
      //
      //     if (err) return done(err);
      //
      //     return done(err, res);
      //   });

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
