const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
module.exports = mongoose.model('users',new Schema({
				user_name  : 	String,
				user_id    :  { type : String, unique :true},
				password   : 	{ type : String, required : true},
				role       : 	{ type : String, required : true},
				email      : 	{ type : String, required : true},
				contact    :  { type :String, required : true}
					
}));

