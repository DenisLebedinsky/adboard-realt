var express = require('express');
var router = express.Router();
var Category = require('../models/category').Category;
var User = require('../models/user').User;

/* GET */
router.get('/', function (req, res, next) {

	Category.findall(function (err, category) {
		if (err) return next(err);
		res.send({ category });
	});

});

/* POST */
router.post('/', ensureAuthorized, function (req, res, next) {

	User.findOne({ token: req.token }, function (err, user) {

		if (err) {
			res.json({
				type: false,
				data: "Error occured: " + err
			});
		} else {
			if (user) {
				try {

					var category = new Category({
						id: req.body.id,
						name: req.body.value
					});

					category.save(function (err, category, affected) {
						if (err) throw err;
						res.status(201).send('ok');
					});

				} catch (err) {
					res.status(500);
				}
			} else {
				res.status(403).send('user is not found')
			}

		}
	});

});

/* DELETE */
router.delete('/:id', ensureAuthorized, function (req, res, next) {

	User.findOne({ token: req.token }, function (err, user) {

		if (err) {
			res.json({
				type: false,
				data: "Error occured: " + err
			});
		} else {
			if (user) {
				try {

					Category.findOnList(req.params.id, function (err, data) {
						
						if (err) return next(err);
						if (data != undefined) {
							data.remove();
							res.statusCode = 200;
							res.send('ok');
						} else {
							res.statusCode = 400;
							res.send({ error: 'Validation error' });
						}
					})
				} catch (err) {
					res.status(404).send('category is not found');
				}
			} else {
				res.status(403).send('Forbidden')
			}

		}
	});
});

/* PATCH */
router.patch('/', ensureAuthorized, function (req, res) {

	User.findOne({ token: req.token }, function (err, user) {

		if (err) {
			res.json({
				type: false,
				data: "Error occured: " + err
			});
		} else {
			if (user) {
				try {			
					Category.updateOne(
						{ id: req.body.id },
						{ name: req.body.name },
						(err, todo) => {
							if (err) return res.status(500).send(err);
							return res.send(todo);
						});

				} catch (err) {
					res.status(404).send('category is not found');
				}
			} else {
				res.status(403).send('Forbidden')
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
		res.status(403).send('Forbidden')
	}
}

module.exports = router;
