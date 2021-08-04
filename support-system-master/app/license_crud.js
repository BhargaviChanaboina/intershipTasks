const express      = require('express');
const router       = express.Router();
const bodyParser   = require('body-parser');
const License      = require('../models/license_model');
const Client       = require('../models/client_model');
const Notify       = require('../models/email_recent_model');
const log          = require('./activity_log');
const c_parser     = require('cookie-parser');
router.use(c_parser());

router.post('/add',function(req,res){
    let status;
    let t = ( new Date(req.body.license.srd) - new Date())/(1000*60*60*24);
    if(t >= 30)  
        status = "active";
    else if(t < 30 && t >= 0 )
        status = "pending";
    else if(t < 0 && t >= -30)
         status = "hold";
    else if(t < -30)
    status = "blocked";
 
     let license=new License({
      client_id                     :  req.body.license.client_id,
      product                       :  req.body.license.product,
      no_of_licenses                :  req.body.license.no_of_licenses,
      licence_procurement_date      :  new Date(req.body.license.lpd),
      support_renewal_date          :  new Date(req.body.license.srd),
        certificate_status            :  req.body.license.certificate_status,
        license_status                :  status
     });
     license.save( (err,data) =>{
         console.log(data._id);
         status="";
      Client.findById(data.client_id, function(err, client_data){
        let client_licenses = client_data.license_array;
        if(!client_licenses)
          client_licenses = [];
        client_licenses.push(data._id);
        Client.update({ _id :data.client_id},{$set : {license_array:client_licenses}},function(err,updated_data){       
        log("license "+data.product+" added for "+client_data.client_name,req.cookies.token);
            res.json(data);
        });
      });
     })
});

//function to get all licenses - one client
router.get('/all', (req,res) =>{
	License.find({client_id:req.query.id},(err,data) => {  
        res.send(data);
	});
	
});
//function to get all licenses
router.get('/all_licenses', (req,res) =>{
  License.find({}).populate('client_id').exec(function(err,data){  
        res.send(data);
        console.log('in');
  });
  
  ///
  ///
});


router.get('/single',(req,res) => {
  License.findOne({_id:req.query.id},function(err,data){ 
      console.log(data); 
      res.send(data);
      
}); 
});
//function to update license(making the license state to inactive)
router.post('/delete_license',(req,res) => {
    console.log(req.body);
    License.updateOne({_id:req.body._id},{$set :{"license_status": "inactive"}},function(err, data){
        Client.findById(req.body.client_id, function(err, client_data){
        log("license "+req.body.product+" deleted for "+client_data.client_name,req.cookies.token);
        });
    });
});



//function to update license
router.post('/update_license', function(req, res){
     License.updateOne({_id:req.body._id},{$set :{
           client_id                  :  req.body.client_id,
           product                    :  req.body.product,
           no_of_licenses             :  req.body.no_of_licenses,
           licence_procurement_date   :  new Date(req.body.licence_procurement_date),
           support_renewal_date       :  new Date(req.body.support_renewal_date),
           license_status             :  req.body.license_status,
           repeat                     :  req.body.repeat
               }
          },(err ,data) => {
            Notify.remove({ l_id: req.body._id }, function (err,data) {
              });
           Client.findById(req.body.client_id, function(err, client_data){
        log("license "+req.body.product+" updated for "+client_data.client_name,req.cookies.token);
        });
     res.send(data);
     });
});
router.get("/try",function(req,res){
        License.aggregate([{
                $group : {_id : "$product", count : {$sum : "$no_of_licenses"}}
        }],function(err,data){
                console.log(data);
                res.json(data);
        });
});

router.get("/graph_by_license",function(req,res){
        License.find({product : req.query.product}).populate('client_id').exec(function(err,data){
                res.json(data);
        });
});
router.get('/get_keys',function(req,res){
    let keys=[],clientpath;
    License.schema.eachPath(function(path){
    keys.push(path);
    });
    console.log(keys);
     Client.schema.eachPath(function(path){
        clientpath="client_id."+path;
        keys.push(clientpath);
    });
    res.send(keys);
});
module.exports = router;


