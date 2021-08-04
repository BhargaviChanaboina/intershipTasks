const express 	= require('express');
const router    = express.Router();
const User      = require('../models/user_model');
const mail      = require('./mailer');
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const c_parser  = require('cookie-parser');

//cookie related functionality
router.use(c_parser());

//declaration for bcrypt
let saltrounds   = 10;

//function to add new user
router.post('/add',function(req, res){
	//encrypting password
	let salt  			   = bcrypt.genSaltSync(saltrounds);
    let hashed_password    = bcrypt.hashSync(req.body.user.password,salt);
	let new_user = new User({
		user_name      :   req.body.user.name,
		user_id        :   req.body.user.user_id,
		password       :   hashed_password,
		role           :   req.body.user.role,
		email          :   req.body.user.email,
		contact        :   req.body.user.contact
	});
	
	new_user.save(function(err, data){
		if(err){
			console.log(err.errors);
			res.send(err.errors);
			
		}
	let payload  = { user_id : data.user_id };
	let token    = jwt.sign(payload, "support",{expiresIn: 60*60});
	let mailOptions = {
		        from   : '"Applaud Support" <arunbandari0@example.com>', // sender address
		        to     :  "arunbandari2@gmail.com", // list of receivers
		        subject: 'Password reset Link ✔', // Subject line
		        text   : 'Please click on below link to reset your password', // plain text body
		        html   : 'http://10.0.0.75:3000/#!/reset?id='+token // html body
		    };
		    mail(mailOptions);
		res.send(data);
	});
});

//function to delete user
router.get('/delete/:delete_id', function(req, res){
	User.remove({_id:req.params.delete_id}, function(err,data){
		res.send(data);
	});
});

//function to update user
router.post('/update', function(req, res){
	User.updateOne({_id : req.body._id}, {$set :{
				user_name       :   req.body.user_name,
				role           	:   req.body.role,
				email          	:   req.body.email,
				contact        	:   req.body.contact
	}},(err,data) =>{
		res.send(data);
	});
});

//function to get all users
router.get('/all', function(req,res){
	User.find({},(err,data) =>{
		res.send(data);
	});
});

//function to authenticate user
router.post('/authenticate',function(req,res){
	User.findOne({user_id : req.body.user_id},function(err,user){
		if(!user){
				res.send("No user exists with this Id");
		}
		else{
			bcrypt.compare(req.body.password,user.password).then((status)=>{
				if(!status)
				res.send('Invalid Password');
			else{
				let payload  = { user_id : user.user_id };
				let token    = jwt.sign(payload, "support", {expiresIn : 60*60});
				res.cookie('token',token);
				res.sendStatus(200);	
			}
			});
		}
	});
});

//function to change password(forgot pwd)
router.post('/change_pwd', function(req,res){
	User.findOne({user_id : req.body.user_id},function(err,user){
			if(!bcrypt.compareSync(req.body.password,user.password)){
				res.send('Invalid password');
			}
			else{
				hashed_password   = bcrypt.hashSync(req.body.new_password,10);
				User.updateOne({user_id : req.body.user_id},{$set:{
             		password : hashed_password
				}},(err,data) => {
					res.send(data);
				});
			}
	});

});

//function to change password(change)
router.post('/change_pswd', function(req,res){
	let d=jwt.decode(req.cookies.token,"support");
	User.findOne({user_id : d.user_id},function(err,user){
			if(!bcrypt.compareSync(req.body.password,user.password)){
				console.log("invalid");
				res.send('Invalid password');
			}
			else{
				hashed_password   = bcrypt.hashSync(req.body.new_password,10);
				User.updateOne({user_id : d.user_id},{$set:{
             		password : hashed_password
				}},(err,data) => {
					res.send("updated");
				});
			}
	});
});

router.post("/reset_password_setup",function(req,res){
	let payload  = { user_id : req.body.user_id };
	let token    = jwt.sign(payload, "support",{expiresIn: 60*60});
	User.findOne({user_id : req.body.user_id},function(err,user){
        if(!user){
			res.send("No user exits with this id!");
		}
		else{
		let mailOptions = {
		        from   : '"Applaud Support 👻" <arunbandari0@example.com>', // sender address
		        to     :  user.email, // list of receivers
		        subject: 'Password reset Link ✔', // Subject line
		        text   : 'Please click on below link to reset your password', // plain text body
		        html   : 'http://10.0.0.75:3000/#!/reset?id='+token // html body
		    };
		    mail(mailOptions);
		    res.send("Password Reset Link has been sent to your mail, please check your mail..");	
		}
	});
});

router.post("/reset",function(req,res){
	let token = req.body.user.token;
	console.log(req.body.user);
	jwt.verify(token, "support", function(err, decoded) {
					hashed_password   = bcrypt.hashSync(req.body.user.password,10);
					User.updateOne({user_id : decoded.user_id},{$set:{
	             		password : hashed_password
					}},(err,data) => {
						res.send(data);
					});
	});
});


router.get('/validate_token',function(req,res){
	let token = req.query.token;
	jwt.verify(token,"support", function(err, decoded) {
		  if(err) res.json({"status":false});
		  else res.json({"status":true});
	});
});

module.exports = router;
