const express = require('express');
const supertest = require('supertest');

const app = require('../app');
const config = require('../config/config');
var path = require('path');

const fs = require('fs');
const ServerStorage = require('../app/lib/filesystem-server-storage');

describe('ServerStorage', () => {

  describe('function savePicture (called when post api/v1/images/nicePic is received)', function() {

      it('should save the file in the filesystem', function (done) {

        //TMP: test with a base64 canvas encoded file get from body request
        let bodyReqPictureData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0"
          + "NAAAAKElEQVQ4jWNgYGD4Twzu6FhFFGYYNXDUwGFpIAk2E4dHDRw1cDgaCAASFOffhEIO"
          + "3gAAAABJRU5ErkJggg==";

        let generatedFileName = null;
        let serverStorage = new ServerStorage();
        serverStorage.initFs().then(() => {
          generatedFileName = serverStorage.saveFile(fileData);
        }).catch( (err) => {
          return err;
        })


        expect(generatedFileName).toBeNonEmptyString;

        return done();

      });
  })



  describe('function getPicture (called when get api/v1/images/nicePic is received)', function() {

    it('should get the file from the filesystem', function (done) {

      let serverStorage = new ServerStorage();

      let data = serverStorage.getPicture('testimage');

      expect(data).toBeNonEmptyObject;

      return done();
    });

   })


});
