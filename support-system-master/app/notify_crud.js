const express      = require('express');
const router       = express.Router();
const bodyParser   = require('body-parser');
const Recent_activities       = require('../models/email_recent_model.js');
const email_activities        = require('../models/email_activity_model.js');
const c_parser     = require('cookie-parser');
router.use(c_parser());

router.get('/all',function(req, res){
	Recent_activities.find({}).populate('l_id').exec(function(err,data){
		Recent_activities.populate(data, { path: 'l_id.client_id', model: 'clients'},(function(err,client){
			res.send(client);
		}));
	});
});

router.get('/single',function(req,res){
 email_activities.find({client_id : req.query.id},function(err,data){
	console.log(data); 
	res.send(data);
	 
 });
});
router.get('/notification_count',function(req,res){
	Recent_activities.count({}, function( err, count){
		console.log( "Number of notifications:", count );
		res.send({"count": count});
	});
});

module.exports = router;