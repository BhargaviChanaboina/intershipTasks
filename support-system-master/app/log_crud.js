const express      = require('express');
const router       = express.Router();
const bodyParser   = require('body-parser');
const Log      = require('../models/log_model');
const c_parser     = require('cookie-parser');
router.use(c_parser());

router.get('/all',function(req, res){
	Log.find({},function(err,data){
		console.log(data);
		res.send(data);
	});
});

module.exports = router;