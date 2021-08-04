const elasticNode = require('elasticsearch');
const elasticClient = new elasticNode.Client({  
    host : 'localhost:9200',
    log  : 'info'
});
module.exports = elasticClient;