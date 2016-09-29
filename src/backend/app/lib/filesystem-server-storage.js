const jasmine = require('jasmine-node');
const request = require('supertest');


var express = require('express');
var config = require('../../config/config');

var app = express();

const fs = require('fs');



function saveFile(picTitle)
{
  console.log('Saving file into file system...');
}
