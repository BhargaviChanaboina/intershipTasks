const elasticNode=require('elasticSearch');
const client=require('./elasticConfig.js');
//var test="*gavi*"
let d;
module.exports = function(a){
                    console.log(a + "in question searhc" );
    //  var test="*"+a+"*";
    //  client.search(
    // {  
    //     index: 'gov',
    //     type: 'newtype',
    //     body: {
    //       query: {
    //         wildcard: { "question": test }
    //       }
    //     }
    //   },(err,data)=>{
     
    //   d=data.hits.hits;
    //    console.log(d);
    // });
                    let test = "*" + a + "*";
                    if( test == "**" ){
                          return "";
                     }
                    else{
                    client.search(
                    {
                      index : 'quiz4',
                      type  : 'questionrecord',
                      body  : {
                              query : {
                                 match_phrase_prefix : { "question": a }
                              }
                      }
                    } , ( err , data ) => {  
                      d = data.hits.hits;
                      console.log(d);
                      });
          return(d);
}
   };
