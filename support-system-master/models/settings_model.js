const mongoose 					= require('mongoose');
const Schema   					= mongoose.Schema;

module.exports = mongoose.model('settings', new Schema({
	owindow : Number,
	hwindow : Number,
	auto	: Boolean
})
);