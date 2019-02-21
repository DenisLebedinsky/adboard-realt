var express = require('express');
var router = express.Router();
var Category = require('../models/category').Category;

/* GET */
router.get('/', function (req, res, next) {

    Category.findall(function (err, category) {
        if (err) return next(err);
        res.send({category});
    });

});

/* POST */
router.post('/', ensureAuthorized, function (req, res, next) {

   var category = new Category({
        id: req.body.id,
        name: req.body.value
    });

    category.save(function (err, category, affected) {
        if (err) throw err;
        res.statusCode = 200;
        res.send('ok');
    });

});

/*delete*/
router.delete('/', ensureAuthorized, function (req, res, next) {

    Category.findOnList(req.body.id, function (err, data) {
        console.log(data)
        if (err) return next(err);
        if (data != undefined) {
            data.remove();
            res.statusCode = 200;
            res.send('ok');
        } else {
            res.statusCode = 400;
            res.send({error: 'Validation error'});
        }
    })
});


router.patch('/', ensureAuthorized, function (req, res) {
    
    console.log(req.token)

    User.findOne({token: req.token}, function (err, user) {
       console.log('12313', user)
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                
                console.log('1111')
                try {
                    Category.updateOne(
                        {id: req.body.id},
                        {name: req.body.name},
                        (err, todo) => {
                            if (err) return res.status(500).send(err);
                            return res.send(todo);
                        });

                } catch (err) {
                    // id not found
                }
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
