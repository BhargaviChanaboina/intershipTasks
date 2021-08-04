
const mongoose = require('mongoose');
let schema = mongoose.Schema;
module.exports  =   mongoose.model('u',new schema({
                        regId : { type : Number , unique : true },
                        score:Number,
                        time : Date

                    }));