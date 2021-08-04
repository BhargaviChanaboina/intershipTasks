
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
module.exports = mongoose.model('licenses',new Schema({
	client_id    				:  {type: mongoose.Schema.Types.ObjectId, ref: 'clients'},
	product   					:  String,
	no_of_licenses   			:  Number,
	licence_procurement_date    :  {type :  Date, required :true},
	support_renewal_date 		:  {type :  Date, required :true},
	certificate_status          :  String,
	license_status              :  {type : String, default:"active"},
	mail_count					:  { type : Number, default : 333},
	repeat						:  {type : Number, default: 7},
	remainder_count             :  {type : Number, default: 0}
}));