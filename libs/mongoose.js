const mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.get('mongoose:uri'), { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
module.exports = mongoose;
