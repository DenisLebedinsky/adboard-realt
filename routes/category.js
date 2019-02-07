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
router.post('/',ensureAuthorized, function(req, res, next) {
    var category = new Category({
        id:req.body.id,
        name:req.body.name
    });
 
 category.save(function (err, category, affected) {
     if (err) throw err;
     res.statusCode = 200;
     res.send({  error: 'ok' });
 });

});

/*delete*/
router.delete('/', ensureAuthorized, function (req, res, next) {

    Category.findOnList(req.body.id, function (err,data) {
        console.log(data)
        if(err) return next(err);
        if (data != undefined){
            data.remove();
            res.statusCode = 200;
            res.send({  error: 'ok' });
        }else{
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
        }
    })
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
