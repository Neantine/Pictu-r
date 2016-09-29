const express = require('express');
const request = require('superagent');
const supertest = require('supertest');

const app = require('../app');
const config = require('../config/config');

describe('FileSystemServerStorage', () => {


  describe('POST /user/:123/:nicePic', function() {

    it('should save the file named nicePic and return unique file ID', function (done) {

      console.log('running tests');
      var picToSend = { picTitle: 'nicePic'};

      supertest(app)
        .post('/nicePic')
        .send(picToSend)
        .expect(200)
        .expect("nicePic is stored")
        // .end(function(err, res){
        //
        //   console.log(req);
        //   var uniqueID = serverStorage.saveFile(request.fils);
        //   console.log(uniqueID);
        //
        // });

        .end(done);

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
