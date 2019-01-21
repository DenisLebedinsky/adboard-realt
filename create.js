// var User = require('./models/user').User;
//
// var user = new User({
//     username:"Denis",
//     password:"karamelka"
// });
//
// user.save(function (err, user, affected) {
//     if(err) throw err;
//
//     User.findOne({username:"Denis"}, function (err, nuser) {
//         console.log(nuser)
//     })
// });

    var House = require('./models/house').House;
    var fs = require("fs");
    var path = require('path');

    fs.readFile(path.join(__dirname, 'test.jpg'), (err, data) => {
        var arrImg = [];
        var pathimg =path.join('C:\\Dev\\client_houselist\\public\\imgStore' + Math.random().toString(36).substring(2) + '.jpg') ;
        arrImg.push(pathimg);
        arrImg.push(pathimg);
        fs.writeFile(pathimg, data, (err) => {
                if (err) throw err;
            });

        if (err) throw err;
        var house = new House({
            title: "ДОМ С ПРИВЕДЕНИЯМИ 323234",
            description: "Приведеиня с мотором (yamaha 150)",
            price: "3999999",

            img: arrImg

        });

        house.save(function (err, house, affected) {
            if (err) throw err;
            // house.findOne({title:title}, function(err, house_){
            // console.log(house_);
            //})
        });

    });

// var house = new House({
//     title:"фото",
//     description:"фото квартиры тест ",
//     price: "2132413",
//     img:["0003", "00001"]
//
// });

