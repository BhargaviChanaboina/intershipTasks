let cron = require('node-cron');
const express            = require('express');
const router             = express.Router();
const bodyParser         = require('body-parser');
const License            = require('../models/license_model');
const Client             = require('../models/client_model');
const email_activity     = require('../models/email_activity_model');
const email_recent_activity     = require('../models/email_recent_model');
const mails      = require('./mails.js');

let cronInst;
function startCron() {
    cronInst = cron.schedule('0 0 0 * * *', function(){ // this will run for every 24 hours
        console.log("in schedular");
        let m_count,r_count;
        let today = new Date();
        License.find({},function(err,data){
            data.forEach((license)=>{

                let t = ( new Date(license.support_renewal_date)- today)/(1000*60*60*24);

                //if the license status is not active or blocked  then increment mail_count
                if(license.license_status!="active" && license.license_status!="blocked")
                {
                    m_count=license.mail_count+1;
                    License.updateOne({_id: license._id},{$set:{mail_count: m_count}},function(err,data){
                        console.log("incremented");
                    });
                }

                //should get executed for 7 days(reset the count to one)
                if(m_count>=license.repeat&&license.license_status!="active" && license.license_status!="blocked")
                {
                    //sendmail and then
                    mails(license);
                    r_count=license.remainder_count+1;
                    License.updateOne({_id: license._id},{$set:{mail_count: 1,remainder_count : r_count}},function(err,data){
                        console.log("set to 1 after increment reached 7");
                        email_activity_push(license);
                    });
                }

                // the license is active state
                if(t >= 30 && license.license_status!="active")
                {
                    console.log("every thing is fine");
                    state_change("active",license,333);
                    mails(license);
                }
                else if(t < 30 && t >= 0 && license.license_status!="pending")
                {
                    console.log("pending");
                    state_change("pending",license,1);
                    mails(license);
                    //count starts from now

                }
                else if(t < 0 && t >= -30 && license.license_status!="hold")
                {
                    console.log("hold");
                    state_change("hold",license,1);
                    mails(license);
                }
                else if(t < -30&&license.license_status!="blocked")
                {
                    console.log("blocked");
                    state_change("blocked",license,-333); //-333 to identify license as blocked
                    mails(license);
                }

            });
        });

        //function to change the license status
        function state_change(status,license,count){
            License.updateOne({_id:license._id}, {$set : {
                    license_status : status,
                    mail_count     : count,
                    remainder_count : 1
                }},function(err,data){
                console.log(data);
                email_activity_push(license);
            });
        }

        //function to push email activity and update recent email activity
        function email_activity_push(license){
            //console.log(license+"...license in push");
            License.findOne({_id : license._id},function(err,data){
                let new_activity = new email_activity({
                    license_id           : data._id,
                    client_id            : data.client_id,
                    action               : "Remainder "+ data.remainder_count +" for the product " +data.product+" with status "+ data.license_status+" is sent.",
                    remainder_count      : data.remainder_count,
                    time                 : new Date()
                });

                new_activity.save(function(err,data1){
                    email_recent_activity.findOne({l_id : license._id },function(err,data2){
                        // console.log(data2);
                        if(data2==null){
                            let recent = new email_recent_activity({
                                l_id                 : data._id,
                                client_id            : license.client_id,
                                action               : "Remainder "+ data.remainder_count +" for the product " +data.product+" with status "+ data.license_status+" is sent.",
                                remainder_count      : data.remainder_count,
                                time                 : new Date()
                            });
                            recent.save(function(err,recent_activity){

                            }) ;
                        }
                        else{
                            email_recent_activity.updateOne({l_id : license._id },{$set :{
                                    action               : "Remainder "+ data.remainder_count +" for the product " +data.product+" with status "+ data.license_status+" is sent.",
                                    remainder_count      : data.remainder_count,
                                    time                 : new Date()
                                }},function(err,data3){
                            });
                        }
                    })
                });
            });
        }
    });
}

function action(start) {
    console.log('action on cronInst');
    console.log('start: ', start);
    if (start === 'true') {
        if (cronInst) {
            console.log('restarting cron');
            cronInst.start(); // restart
        } else {
            console.log('starting cron for the first time..');
            startCron(); // basically this is where cron gets started for the first time
        }
    } else {
        if (cronInst) {
            console.log('stopping cron');
            cronInst.stop();
        }
    }
}

module.exports = action;
