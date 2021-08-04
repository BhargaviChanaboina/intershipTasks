const express   = require('express');
const router    = express.Router();
const bodyParser= require('body-parser');
const Service   = require('../models/service_model.js');
const log       = require('./activity_log');
var cp 			= require('cookie-parser');
router.use(cp());

// function to get all services info
router.get('/all',function(req,res){
	Service.find({},function(err,data){
		res.json(data);
	});
});
router.get('/all_active',function(req,res){
	Service.find({status : {$ne : false}},function(err,data){
		res.json(data);
	});
});
//function to fetch one record
router.get('/one',function(req,res){
	Service.findOne({_id:req.query.id},function(err,data){
		res.send(data);
	});
});

//function to add new service
router.post('/add',function(req,res){

	let service = new Service({
		service         			: req.body.service.service,
		service_handle   			: req.body.service.handle,
		description		 			: req.body.service.description,
		color						: req.body.service.colour
	});
	service.save((err, data) =>{
		log(" new service  "+data.service+" is added ",req.cookies.token);
		res.send("saved");
	}); 
});

//function to delete service
router.get('/delete',function(req,res){
	Service.findById({_id:req.query.id},function(err,data){
	var service_name = data.service;	
	});
	Service.remove({_id:req.query.id}, function(err, data){
		log(" Service "+service_name+" is deleted ",req.cookies.token);
		res.send(data);
		//console.log(data);
	});
});

//function to update service info
router.post('/update',function(req,res){

	Service.updateOne({_id :req.body.service._id},{$set:{ 
			    service         			: req.body.service.service,
				service_handle   			: req.body.service.service_handle,
				description		 			: req.body.service.description,
				color    					: req.body.service.color,
				status						: req.body.service.status
				}
			},(err, data) =>{
					log(" Service "+req.body.service.service+" is updated ",req.cookies.token);
					res.send(data);
			  }
	);
});



module.exports = router;