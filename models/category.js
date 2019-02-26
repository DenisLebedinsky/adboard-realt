const mongoose = require('../libs/mongoose'),
	Schema = mongoose.Schema;

const schema = new Schema({
	id: {
		type: String,
		unique: true,
		required: true
	},
	name: {
		type: String,
		required: true
	}

});

schema.statics.findOnList = function (id, callback) {
	let category = this;
	category.findOne({ id: id }, callback);
};

schema.statics.findall = function (callback) {
	let category = this;
	category.find({}, callback);
};


exports.Category = mongoose.model('Category', schema);
