const mongoose 					= require('mongoose');
const Schema   					= mongoose.Schema;

module.exports = mongoose.model('services', new Schema({

	service         			: {type : String, required : true},
	service_handle   			: String,
	description		 			: String,
	color						: String,
	status						: {type : Boolean, default : true}
})
);