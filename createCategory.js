
   var Category = require('./models/category').Category;

   var category = new Category({
       id: String(Date.now()),
       name:"Краснодар"
   });

category.save(function (err, category, affected) {
    if (err) throw err;

});
