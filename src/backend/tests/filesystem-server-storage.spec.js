"use strict";

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

        let serverStorage = new ServerStorage();

        let img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0"
          + "NAAAAKElEQVQ4jWNgYGD4Twzu6FhFFGYYNXDUwGFpIAk2E4dHDRw1cDgaCAASFOffhEIO"
          + "3gAAAABJRU5ErkJggg==";

        let data = img.replace(/^data:image\/\w+;base64,/, "");
        let buf = new Buffer(data, 'base64');

        let uniqueFileName = serverStorage.savePicture('nicePic', buf);

        console.log(uniqueFileName);

        expect(uniqueFileName).toBeNonEmptyString;


        return done();

      });
  })



  describe('function getPicture (called when get api/v1/images/nicePic is received)', function() {

    it('should get the file from the filesystem', function (done) {

      let serverStorage = new ServerStorage();

      let data = serverStorage.getPicture('nicePicHJ9JUV6T');

      expect(data).toBeNonEmptyObject;

      return done();
    });

   })


});
