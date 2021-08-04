const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
const License    = require('../models/license_model');
const Client     = require('../models/client_model');
const Email      = require('../models/mail_template_model');
const log        = require('./activity_log');
const c_parser   = require('cookie-parser');
router.use(c_parser());

router.post('/add',function(req,res){
    console.log(req.body);
    let email = new Email({
        
        email_type         :   req.body.type,
        title              :   req.body.title,
        content            :   req.body.content,
        attachments         :   req.body.attachments
    });
    email.save(function(err,data){
        log("New email template of type "+data.email_type+" is added ",req.cookies.token);
        res.send(data);
    });
});

router.get('/mail_template',function(req,res){
    Email.findOne({_id : req.query.id},function(err,data){
        res.send(data);
    });
});

router.post('/update',function(req,res){
    Email.updateOne({_id: req.body._id},{$set : {
        type         :   req.body.type,
        title        :   req.body.title,
        content      :   req.body.content,
        attachments   :   req.body.attachments 
    }},function(err,data){
        log(" email template of type "+req.body.email_type+" is updated ",req.cookies.token);
        res.send(data);
    });
});
router.get('/all',function(req,res){
    Email.find({},function(err,data){
    res.send(data);
    });
});

module.exports = router;
