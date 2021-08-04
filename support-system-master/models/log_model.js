
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
module.exports = mongoose.model('logs',new Schema({
	user_name	: String,
	action  	: String,
	time   	    : Date
}));