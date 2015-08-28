/// <reference path='../../typings/tsd.d.ts' />

import express = require('express');
import passport = require('passport');
import facebook = require('passport-facebook')
import userModel = require("../models/user");
 
import IUser = userModel.IUser;
import User = userModel.User;



export var router = express.Router();

router.get('/auth/facebook',
  passport.authenticate('facebook', {scope: ['email']}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/profile',
                                                                          failureRedirect: '/login' }
                                    ));
 
  
  // route for logging out
  router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// route for showing the profile page
    router.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    
   
    // route middleware to make sure a user is logged in
 export function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
    {
        console.log("user is authenticated", req.user)
        return next();
    }
    // if they aren't redirect them to the home page
    console.log("user is not authenticated");
    res.redirect('/');
}

  // TODO: add isLoggedIn from https://scotch.io/tutorials/easy-node-authentication-facebook

