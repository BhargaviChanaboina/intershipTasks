const express      = require('express');
const router       = express.Router();
const bodyParser   = require('body-parser');
const Setting      = require('../models/settings_model');
const c_parser     = require('cookie-parser');
const log          = require('./activity_log');
const cron_setting = require('./scheduler.js');
router.use(c_parser());

router.get('/all',function(req, res){
	Setting.findOne({},function(err,data){
		res.send(data);
	});
});
router.post('/update',function(req, res){
	Setting.updateOne({_id:req.body._id}, {$set : {
			owindow : req.body.owindow,
			hwindow : req.body.hwindow,
			auto	: req.body.auto
	}},function(err,data){
		res.send(data);
		if(req.body.auto===true) 
			cron_setting("true");
		else
			cron_setting("false");
		log("Settings Updated",req.cookies.token);
	});
});

router.post('/add',function(req,res){
	let new_setting = new Setting({
			owindow : req.body.owindow,
			hwindow : req.body.hwindow,
			auto	: req.body.auto
	});
	new_setting.save(function(err,data){
		res.send(data);
	});
});
module.exports = router;