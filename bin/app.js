'use strict';

const express = require('express');
const fs = require('fs');
const logger = require('morgan');

const app = express();
app.use(logger('dev'));
//app.use(express.static('./bwGRiD'));
app.use(express.static('.'));

app.use(function(req, res, next) {
  //fs.createReadStream('./bwGRiD/index.html').pipe(res);
  fs.createReadStream('./index.html').pipe(res);
})

module.exports = app;
