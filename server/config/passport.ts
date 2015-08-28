/// <reference path='../../typings/tsd.d.ts' />

// load all the things we need
import Passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
import userModel = require("../models/user");
 
import IUser = userModel.IUser;
import User = userModel.User;

import configAuth = require('./auth');


export function init (passport:Passport.Passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log("serializing user", user);
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        console.log("deserializing", id)
        User.findById(id, function(err, user) {
            console.log("this is what I found err, user", err, user);
            done(err, user);
        });
    });
    
    // code for login (use('local-login', new LocalStategy))
    // code for signup (use('local-signup', new LocalStategy))

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        enableProof: true
    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {
        console.log("this is what I got from facebook", profile);
        // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = new User();

                    // set all of the facebook information in our user model
                    newUser.facebook.id    = profile.id; // set the users facebook id                   
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                    newUser.name.givenName  = profile.name.givenName 
                    newUser.name.familyName = profile.name.familyName;
                    newUser.name.middleName = profile.name.middleName;
                   // newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });

    }));

};
