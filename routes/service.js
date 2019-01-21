var express = require('express');
var router = express.Router();
var Service = require('../models/service').Service;

/* GET */
router.get('/', function(req, res, next) {
    Service.findall(function (err, service) {
      if(err) return next(err);
        res.send({service}) ;
    });

});

/* POST */
router.post('/', function(req, res, next) {
    var service = new Service({
        title:req.body.title,
        description:req.body.description,
        price: req.body.price
    });

    service.save(function(err, service, affected) {
        if(err) throw err;
    });
});

/* PUT */
router.put('/id', function (req, res){
      return Service.findById(req.query.id, function (err, service) {
        if(!service) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (req.body.title != undefined) service.title = req.body.title;
        if (req.body.description != undefined) service.description = req.body.description;
        if (req.body.price != undefined) service.price = req.body.price;
        return service.save(function (err) {
            if (!err) {
                return res.send({ status: 'OK', service:service });
            } else {
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
            }
        });
    });
});

/* DELETE */
router.delete('/id', function (req, res){
    Service.findById(req.query.id, function (err, docs) {
        if(err) throw( err);
        if (docs != undefined){
            docs.remove();
            res.statusCode = 200;
            res.send({  error: 'ok' });
        }else{
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
        }
    });
});

module.exports = router;
