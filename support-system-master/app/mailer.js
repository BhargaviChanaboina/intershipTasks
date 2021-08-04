var express        = require('express');
var router         = express.Router();
var jwt            = require('jsonwebtoken');
var nodemailer     = require('nodemailer');
const log          = require('./activity_log');
var cp=require('cookie-parser');
router.use(cp());
module.exports=function(mailOptions)
{//function

    //mail start
    var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'Gmail' ,
    port: 465   ,
    secure: false,
    requireTLS: true,
      auth: {
        user: 'arunbandari0@gmail.com',
        pass: 'arun12345'
      }//auth
    });// createTransport
    
     transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }//else
    });//sendMail
//mail end
} //service end