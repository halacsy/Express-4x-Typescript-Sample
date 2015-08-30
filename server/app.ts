
/// <reference path='../typings/tsd.d.ts' />

import express = require('express');
import session = require('express-session');
import path = require('path');
import favicon = require('serve-favicon');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');

import routes = require('./routes/index');
import users = require('./routes/users');
import passport = require('passport');
import passportConfig = require('./auth/passport');
passportConfig.init(passport);
import login = require('./routes/login')

var app = express();



// view engine setup
// dirname equals to the directory where the main.js is
// in this case this is app.js is in deploy/server
// but we put views in to deploy/views
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
  
app.use('/', login.router);
app.use('/', routes);
app.use('/users', users);


//catch 404 and forward to error handler
app.use((req, res, next) => {
   var err = new Error('Not Found');
   err['status'] = 404;
   next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

   app.use((err: any, req, res, next) => {
       res.status(err['status'] || 500);
       console.log(err.message);
       res.render('error', {
           message: err.message,
           error: err
       });
   });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req, res, next) => {
   res.status(err.status || 500);
   console.log(err.message);
   res.render('error', {
       message: err.message,
       error: {}
   });
});

export = app;
