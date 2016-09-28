const jasmine = require('jasmine-node');


// Connection URL
const url = 'mongodb://localhost:27017/picturDb';

let database;

var express = require('express');
var config = require('../config/config');

var app = express();


app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});



describe('picturAPI', function() {


  beforeEach(function listen(done) {

      /* TODO : créér un utilisateur */
      /* TODO : lui créer un album */

      app.listen(config.port, function listening() {
        console.log('Express server listening on port ' + config.port);
         done();
      });

  });

  afterEach(function (done) {
    app.close( function() {

      /* TODO : effacer l'album */
      /* TODO : effacer l'utilisateur */

      database.close();
      done();
    });
  });


  // describe('POST /user/:id/album/:id/picture', function() {
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
  //
  //
  // describe('storeToDB', function() {
  //   it('should persist one picture inside the database', function(done) {
  //     const picToSend = [{
  //       user: "azertyuiop-123456789",
  //       title: "testpicture",
  //       albumId : "12225",
  //       pictureId : "14552"
  //     }];
  //     request(api)
  //       .post('/metrics')
  //       .set('Content-Type', 'application/json')
  //       .send(metricsToSend)
  //       .expect(201) // 201 => CREATED
  //       .end(function(err, res) {
  //         if (err) return done(err);
  //
  //         var collection = database.collection('metrics');
  //         collection.find({}).toArray(function(err, docs) {
  //           expect(err).to.be.null;
  //           expect(docs.length).to.equal(1);
  //
  //           const docFromDb = docs[0];
  //           delete docFromDb._id; // removing _id prop
  //           expect(docFromDb).to.deep.equal(metricsToSend[0]);
  //           return done(err, res);
  //         });
  //       });
  //   });
  // })
});
