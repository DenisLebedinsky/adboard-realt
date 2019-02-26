const mongoose = require('../libs/mongoose'),
	Schema = mongoose.Schema;

const schema = new Schema({
	title: {
		type: String,
		// unique: true,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

schema.statics.findOnList = function (id, callback) {
	let house = this;
	house.findOne({ _id: id }, callback);
};

schema.statics.findall = function (callback) {
	let house = this;
	house.find({}, callback);
};


exports.Service = mongoose.model('Service', schema);
