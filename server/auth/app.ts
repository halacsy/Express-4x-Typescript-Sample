
/// <reference path='../../typings/tsd.d.ts' />

import express = require('express');
import session = require('express-session');
import path = require('path');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(session({ secret: 'keyboard cat' }));
import passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
import passportConfig = require('./passport');
passportConfig.init(passport);
app.use('/', require('./routes').router);


module.exports = app;