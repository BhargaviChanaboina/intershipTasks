const mongoose 					= require('mongoose');
const Schema   					= mongoose.Schema;

module.exports = mongoose.model('clients', new Schema({

	client_name       			: { type : String, required : true, unique : true},
	certificate_sent 			: Boolean,
	partners		 			: String,
	status 						: String,
	license_array               : [{type: mongoose.Schema.Types.ObjectId, ref: 'licenses'}],
	primary_contact_name        :  { type : String, required : true},
	primary_email               :  { type : String, required : true},
	primary_contact             :  { type : Number, required : true},
	logo						: String,
	other                       : String,
	comment						: String
})
);