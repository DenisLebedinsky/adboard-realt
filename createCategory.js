
   var Category = require('./models/category').Category;

   var category = new Category({
       id: String(Date.now()),
       name:"Краснодар"
   });

category.save(function (err, category, affected) {
    if (err) throw err;

});

var category1 = new Category({
    id: String(Date.now()),
    name:"Район"
});

category1.save(function (err, category, affected) {
 if (err) throw err;

});
var category2 = new Category({
    id: String(Date.now()),
    name:"Побережье"
});

category2.save(function (err, category, affected) {
 if (err) throw err;

});