var crypto = require('crypto');
var util = require('util');
var async = require('async');
var mongoose = require('../libs/mongoose'),
  Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');

var schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  hashedpasword: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String,
  },
});

schema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
  .set(function(password) {
    this._planePassword = password;
    this.salt = Math.random() + '';
    this.hashedpasword = this.encryptPassword(password);
  })
  .get(function() {
    return this._planePassword;
  });

schema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedpasword;
};

schema.statics.authorize = function(username, password, callback) {
  var User = this;

  async.waterfall([
    function(callback) {

      User.findOne({ username: username }, callback);
    },

    function(user, callback) {

      console.log('2', user);

      if (user) {
        if (user.checkPassword(password)) {

          callback(null, user);

        } else {
          callback(null, undefined);
        }
      }
    },
  ], callback);

};

schema.statics.registration = function(
          username,
          password,
          email,
          callback
        ) {
  var User = this;

  async.waterfall([
    
    function(callback) {
      User.findOne({ username: username }, callback);
    },
    function(user, callback) {
     
      if (user) {
        return callback(
          new AuthError('Пользователь с таким именем уже существует!')
          );
      } else {
        
        //созданим нового пользователя
        
        var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
        var user = new User({ 
              username: username,
              password: password,
              email: email,
              token: token
            });

        user.save(function(err) {
          if (err) return next(err);

        });
      }
    },
  ], callback);
};


exports.User = mongoose.model('User', schema);

/*
function AuthError(message) {
    Error.apply(this.arguments);
    Error.captureStackTrace(this, AuthError)
    this.message = message;
}
util.inherits(AuthError, Error)
AuthError.prototype.name = 'AuthError';
exports.AuthError = AuthError;
*/
