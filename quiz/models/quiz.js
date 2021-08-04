const mongoose = require('mongoose');
let schema = mongoose.Schema;
module.exports = mongoose.model('quiz4',new schema({
                                 "question" : String,
                                 "option1"  : String,
                                 "option2"  : String,
                                 "option3"  : String,
                                 "answer"   : String
                                }  ) );