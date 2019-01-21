var express = require('express');
var router = express.Router();
var Category = require('../models/category').Category;

/* GET */
router.get('/', function(req, res, next) {
    Category.findall(function (err, category) {
        if(err) return next(err);
        res.send({category}) ;
    });

});

/* POST */
router.post('/', function(req, res, next) {
    var Category = new Service({
        id:req.body.id,
        name:req.body.name
    });

    Category.save(function(err, service, affected) {
        if(err) throw err;
    });
});


module.exports = router;
