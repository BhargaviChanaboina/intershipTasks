
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
module.exports = mongoose.model('email_log',new Schema({
	license_id			: {type: mongoose.Schema.Types.ObjectId, ref: 'licenses'},
	client_id           : {type: mongoose.Schema.Types.ObjectId, ref: 'clients'},
	action  			: String,
	remainder_count		: Number,
	time   	   		    : Date
}));