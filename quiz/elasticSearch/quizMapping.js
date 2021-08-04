const elasticNode = require('elasticSearch');
const client = require('./elasticConfig.js');
module.exports = client.indices.putMapping({
    index : "quiz4",
    type  : "questionrecord",
    body  : {
            properties : {
                question : {
                    type : 'text',
                    analyzer : 'keyword'
                },
                option1  : {
                    type: 'text',
                    analyzer: 'keyword'
                },
                option2 : {
                    type : 'text',
                    analyzer : 'keyword'
                },
                option3 : {
                    type : 'text',
                    analyzer : 'keyword'
                },
                answer : {
                    type : 'text',
                    analyzer : 'keyword'
                }
        }
    }
} , ( err , data ) => {
        console.log(data);
     });