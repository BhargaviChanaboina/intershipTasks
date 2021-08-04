const express = require('express');
const router  = express.Router();
const jwt     = require('jsonwebtoken');
const Log     = require('../models/log_model');
const cp = require('cookie-parser');
router.use(cp());

module.exports = function(action,token){
 
  let d=jwt.decode(token,"support");
  
  let new_log =new Log({
        user_name     : d.user_id,
        action        : action,
        time          : new Date()
  });
  new_log.save(function(err, data){
    console.log(err);
  });
}