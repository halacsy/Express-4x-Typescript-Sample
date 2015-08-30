
/// <reference path='../../typings/tsd.d.ts' />
import request = require('supertest');
import chai = require('chai');
import express = require('express');
import app = require('../app');

describe('wow', function() {
  describe('index', function() {
    it('is served', function(done) {
      request(app)
        .get('/')
        .expect(200, done);
    });
  });

  describe('profile', function() {
    it('is not available without authentication', function(done) {
      request(app)
        .get('/profile')
        .expect(302, done);
    })
  })


  describe('facebook login', function() {
    it('/auth/facebook redirects to facebook loging', function(done) {
      request(app)
        .get('/auth/facebook')
        .expect(302)
        .expect('location', /https:\/\/www.facebook.com\/v2.2\/dialog\/oauth.*/, done);

    })
  })
});

