
/// <reference path='../../typings/tsd.d.ts' />

import express = require('express');

import path = require('path');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = app;