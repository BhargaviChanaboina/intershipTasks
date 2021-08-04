const elasticNode = require('elasticSearch');
const client = require('./elasticConfig.js');
module.exports = function(p)
                 {
                     client.index({
                        index : "quiz4",
                        type  : "questionrecord",
                        body  : {
                             "question": p.question,
                             "option1" : p.option1,
                             "option2" : p.option2,
                             "option3" : p.option3,
                             "answer"  : p.answer
                        }
                    },( err , data ) => {
                     console.log(data);
                    });
                }