const elasticNode=require('elasticSearch');
const client=require('./elasticConfig.js');
let got=function()
{
    client.indices.create({  
      index: 'quiz4'
      } , ( err , resp , status ) => {
      if(err) {
       console.log(err);
      }
      else {
      console.log("create",resp);
      }
  });
}
module.exports=got;