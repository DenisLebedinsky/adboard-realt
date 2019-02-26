var express = require('express');
var router = express.Router();
var House = require('../models/house').House;
var User = require('../models/user').User;

router.get('/check', ensureAuthorized, function (req, res) {
	User.findOne({ token: req.token }, function (err, user) {
		if (err) {
			res.json({
				type: false,
				data: "Error occured: " + err
			});
		} else {
			if (user) {
				House.findCheck(function (err, house) {
					if (err) return next(err);
					res.json({ house });
				});
			} else {
				res.send(403)
			}

		}
	});
});

/* DELETE */
router.delete('/del/:id', ensureAuthorized, function (req, res) {
	User.findOne({ token: req.token }, function (err, user) {
		if (err) {
			res.json({
				type: false,
				data: "Error occured: " + err
			});
		} else {

			if (user) {
				House.findOnList(req.params.id, function (err, docs) {
					if (err) throw (err);
					if (docs != undefined) {
						docs.remove();
						res.statusCode = 200;
						res.send({ error: 'ok' });
					} else {
						res.statusCode = 400;
						res.send({ error: 'Validation error' });
					}
				});
			} else {
				res.send(403)
			}

		}
	});

});


function ensureAuthorized(req, res, next) {
	var bearerToken;
	var bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== 'undefined') {
		var bearer = bearerHeader.split(" ");
		bearerToken = bearer[0];
		req.token = bearerToken;
		next();
	} else {
		res.send(403);
	}
}
module.exports = router;
