const jasmine = require('jasmine-node');

const supertest = require('supertest');
const request = require('superagent');


var express = require('express');
var config = require('../config/config');

var app = express();


var serverStorage = require("../app/controllers/filesystem-server-storage");

app.listen(config.port, function () {
  console.log('TESTS ! Express server listening on port ' + config.port);
});



describe('picturAPI', function() {


  describe('POST /user/:123/:nicePic', function() {
    it('should save the file named nicePic and return unique file ID', function (done) {
      supertest(app)
        .post('/nicePic')
        .field('picTitle', 'nicePic')
        .attach('pic', './image.jpg')
        // .type('png')
        // .type('json')
        //.send({ picTitle: 'nicePic'})
        .end(function(err, res){

          console.log(req);
          var uniqueID = serverStorage.saveFile(request.fils);
          console.log(uniqueID);

        });

      //.end(done);

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
