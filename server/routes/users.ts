/// <reference path='../../typings/tsd.d.ts' />

import express = require('express');

import userModel = require("../models/user");
 
import IUser = userModel.IUser;
import User = userModel.User;


var router = express.Router();

router.get('/create', function(req, res, next){
  var newUser = new User();
  newUser.displayName = "janos";
  newUser.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully!');
  })
  res.send("created");
  
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

export = router;
