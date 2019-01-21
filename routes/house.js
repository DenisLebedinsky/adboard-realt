var express = require('express');
var router = express.Router();
var House = require('../models/house').House;
var multer = require('multer');
var User = require('../models/user').User;
var path = require('path');


/* GET */
router.get('/', function (req, res, next) {
    House.findall(function (err, house) {
        if (err) return next(err);
        res.send({house});
    });

});
/* GET */
router.get('/:id', function (req, res, next) {
    House.findOnList(req.params.id, function (err, house) {
        if (err) return next(err);
        res.send({house});
    });

});

/* GET */
router.post('/search', function (req, res, next) {
    House.findOnName(req.body.str, function (err, house) {
        if (err) return next(err);
        res.send({house});
    });
});

/* GET */
router.get('/more/:prev', function (req, res, next) {
    let skip = req.params.prev.slice(0, req.params.prev.indexOf("&"));
    let categorid = req.params.prev.substring(req.params.prev.indexOf("&") + 1);
    if (categorid) {
        House.findMore(skip, function (err, house) {
            if (err) return next(err);
            res.send({house});
        });
    } else {
        House.findMore(skip, categorid, function (err, house) {
            if (err) return next(err);
            res.send({house});
        });
    }
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname) + '\\client\\public\\uploads\\')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    }
});

var upload = multer({storage: storage});

router.post('/', upload.any(), function (req, res) {
  console.log('yeee')
  try {
        var imgArray = [];
        for (var key in req.files) {
            imgArray.push('/uploads/' + req.files[key].filename)
        }
        var id = Math.floor(Math.random() * 100000000);
        var house = new House({
            id: id,
            categoryId: (req.body.categoryId !== '' ? req.body.categoryId : 0),
            name: req.body.name,
            email: (req.body.email !== undefined ? req.body.email : ''),
            tel: (req.body.tel !== undefined ? req.body.tel : 0),
            description: req.body.description,
            price: req.body.price,
            image: (imgArray.length !== 0 ? imgArray[0] : ''),
            imgArr: imgArray,
            status: false

        });

        house.save(function (err, house, affected) {
            if (err) throw err;
        });
        res.statusCode = 201;
        res.send({error: 'create in database'});
    } catch (err) {
        res.status(500).send(err);
    }
});

router.patch('/update', ensureAuthorized, upload.any(), function (req, res) {
    User.findOne({token: req.token}, function (err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                //___________________________
                try {
                    var imgArray = [];
                    for (var key in req.files) {
                        imgArray.push('/uploads/' + req.files[key].filename)
                    }
                    House.updateOne(
                        {id: req.body.id},
                        {
                            categoryId: (req.body.categoryId !== '' ? req.body.categoryId : 0),
                            name: req.body.name,
                            email: (req.body.email !== undefined ? req.body.email : ''),
                            tel: (req.body.tel !== undefined ? req.body.tel : 0),
                            description: req.body.description,
                            price: req.body.price,
                            status: req.body.status
                        },
                        (err, todo) => {
                            if (err) return res.status(500).send(err);
                            return res.send(todo);
                        });

                } catch (err) {
                    // res.send({ error: 'not save to database' });
                }
                // _________________________
            } else {
                res.send(403)
            }

        }
    });


});


router.patch('/changestatus', ensureAuthorized, upload.any(), function (req, res) {
    User.findOne({token: req.token}, function (err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                try {
                    var imgArray = [];
                    for (var key in req.files) {
                        imgArray.push('/uploads/' + req.files[key].filename)
                    }
                    House.updateOne(
                        {id: req.body.id},
                        {status: true},
                        (err, todo) => {
                            if (err) return res.status(500).send(err);
                            return res.send(todo);
                        });

                } catch (err) {
                    res.status(500).send(err);
                }
                // _________________________
            } else {
                res.send(403)
            }
        }
    });


});


function ensureAuthorized(req, res, next) {
    var bearerToken;
  console.log('yeee')
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
