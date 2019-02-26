'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
//var AuthError = require('../models/user').AuthError;
//var HttpError = require('../error').HttpError;


router.post('/authenticate', function (req, res) {

	var username = req.body.username,
		password = req.body.password;

	User.authorize(username, password, function (err, user) {

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

function ensureAuthorized(req, res, next) {
	var bearerToken;
	var bearerHeader = req.headers['authorization'];
	if (typeof bearerHeader !== 'undefined') {
		var bearer = bearerHeader.split(' ');
		bearerToken = bearer[1];
		req.token = bearerToken;
		next();
	} else {
		res.send(403);
	}
}

module.exports = router;
