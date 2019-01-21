'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
//var AuthError = require('../models/user').AuthError;
//var HttpError = require('../error').HttpError;


router.post('/authenticate', function(req, res) {

  var username = req.body.username,
    password = req.body.password;

  User.authorize(username, password, function(err, user) {

    if (err) {
      res.json({
        type: false,
        data: 'Error occured: ' + err,
      });
    } else {
      if (user) {
        res.json({
          type: true,
          token: user.token,
        });
      } else {
        res.json({
          type: false,
          data: 'Incorrect email/password',
        });
      }
    }
  });
});

/*
router.post('/signin', function(req, res) {
  User.findOne({ email: req.body.email, password: req.body.password },
    function(err, user) {
      if (err) {
        res.json({
          type: false,
          data: 'Error occured: ' + err,
        });
      } else {
        if (user) {
          res.json({
            type: false,
            data: 'User already exists!',
          });
        } else {

          //регистрация нового пользователя
          User.registration(
            req.body.username,
            req.body.password,
            req.body.email,
            function(err) {
              if (err) throw err;
              res.send(201);
            });
        }
      }
    });
});

router.get('/me', ensureAuthorized, function(req, res) {
  User.findOne({ token: req.token }, function(err, user) {
    if (err) {
      res.json({
        type: false,
        data: 'Error occured: ' + err,
      });
    } else {
      res.json({
        type: true,
        data: user,
      });
    }
  });
});
*/

function ensureAuthorized(req, res, next) {
  var bearerToken;
  var bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(' ');
//console.log('bearer ', bearer);
    bearerToken = bearer[1];
//    console.log('req.token ', req.token);
    req.token = bearerToken;
    next();
  } else {
    res.send(403);
  }
}

module.exports = router;
