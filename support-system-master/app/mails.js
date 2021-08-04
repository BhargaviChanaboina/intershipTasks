const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
const License    = require('../models/license_model');
const Client     = require('../models/client_model');
const Email      = require('../models/mail_template_model');
var nodemailer = require('nodemailer');
const mail      = require('./mailer');
let all_keys = [];
var exp1=/{{[A-z_.]+}}/g;


module.exports=function(license)
{//function
    let client,content,mailOptions;
    License.schema.eachPath(function(path){
    all_keys[path]=license[path];
    });
    Client.findOne({_id : license.client_id},function(err,data){
        client=data;
        Client.schema.eachPath(function(path){
          all_keys["client_id."+path]=client[path];
          });
          console.log(all_keys);
    });
    
  
    var today = new Date();
    var renewal = new Date(license.support_renewal_date);
    var diffMs = (renewal - today); // milliseconds between now & Christmas
    var diffDays = Math.floor(diffMs / 86400000); // days
    let template_info,keys_from_content,temp="";

    Email.findOne({email_type : license.license_status},function(err,data){
         if(err) throw err;
        template_info = data;
        temp = data.content;
        let key = "",patterns=[];

        while((keys_from_content = exp1.exec(template_info.content))!==null){
             patterns.push(keys_from_content[0]);
              key = keys_from_content[0].substr(2,keys_from_content[0].length-4);
              if(all_keys[key]!=null){
                  let l = "{{"+key+"}}";
                  template_info.content = template_info.content.replace(l,all_keys[key]);
                 // console.log(template_info.content);
              }
        
        }
        console.log(patterns);
        console.log("content... after replacing...."+template_info.content);
        //patterns=[];
        while((keys_from_content=exp1.exec(template_info.title))!==null){
              console.log(keys_from_content[0]);
              key=keys_from_content[0].substr(2,keys_from_content[0].length-4);
              if(all_keys[key]!=null){
                  let l ="{{"+key+"}}";
                  template_info.title=template_info.title.replace(l,all_keys[key]);
                 // console.log(template_info.title);
              }
        }
    content = '<h1>'+template_info.title+'</h1><p>'+template_info.content+'</p>';
     mailOptions = {
      from   : '"APPLAUD SUPPORT " <arunbandari0@example.com>', // sender address
      to     :  'bhargavi.ch17@gmail.com', // all_keys[client_id.primary_email]
      subject: ' your status for '+license.product, // Subject line
      html   : content // plain text body
  };
 mail(mailOptions);
    });
  }

