 var User = require('./models/user').User;
 var jwt = require('jsonwebtoken');

 var username = "Vladimir",
     password = "94021",
     email = "mir-zakona@mail.ru";

 User.registration( 
    username,
    password,
    email
    );
 
//создаёт нового пользователя с токеном