const mongoose = require('mongoose');
const express = require('express');
const request = require('request');
const app = express();
const dbHost = 'mongodb://localhost:27017/quiz';
mongoose.connect(dbHost,function(err){
	if(err) console.log('error');
	else console.log('connected');
 });
app.use(express.static('./public'));
const QUIZ = require('./models/quiz');
const USER = require('./models/user');
const ELASTIC = require("./elasticSearch/elasticConfig.js");
const QUIZMAPPING = require("./elasticSearch/elasticConfig.js");
const createIndex = require('./elasticsearch/quizMapping.js');
const insert = require('./elasticsearch/insertQuestion.js');
const search = require('./elasticsearch/questionSearch.js');
const queue = require('./kue/kueConfig.js');
const processJob = require('./kue/kueProcess.js');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({}));
app.get('/add',function(req,res){
        res.sendFile(__dirname + '/public/views/quiz.html');
});
//initial page
app.get('/',function(req,res){
        res.sendFile(__dirname + '/public/views/index.html');
});
//handling post for searchbox in updatequiz
app.post('/search', function(req,res){
        console.log(req.body.value);
        let searchResult = search(req.body.value);
        res.send(searchResult);
});
//sending the quiz page to user
app.get('/quiz',function(req,res){
        res.sendFile( __dirname + '/public/views/doQuiz.html');
});
//sending questions 
app.get('/quizData',function(req,res){
        //QUIZ.find( { } ,function(err,data){
        //res.send(data);
        QUIZ.aggregate([
                {$match : {}},
                {$sample : {size: 10}}
        ],(err,resp) => {res.send(resp) })
});

//updating the result of quiz
app.post('/quizResult',function(req,res){
        USER.findOne( {regId:req.body.name} , function(err, data){
        if(!data){
            const newUSer = new USER({
            regId : req.body.name,
            score :req.body.score,
            time  : new Date()
            });
            newUSer.save(function(err,data){
            console.log("saved............"+data);
            });
        }
        else{
            USER.update({regId : req.body.name},
              { $set : { time : new Date() , score : req.body.score } } ,function(err,data){
              console.log(data);
                    });
        }
  });
});
//handling post data  request from update quiz page
app.post('/sendQ',function(req,res){
        let i;
        for( i = 0 ; i < req.body.length ; i++ )
            {
            let p = req.body[i];
            let elasticInsert = queue.create('insertInElastic',p).save();
            console.log(elasticInsert);
            let elasticProcess = queue.process('insertInElastic',insert(elasticInsert.data));
            let s=new QUIZ({
                "question" : req.body[i].question,
                 "option1" : req.body[i].option1,
                 "option2" : req.body[i].option2,
                 "option3" : req.body[i].option3,
                 "answer"  : req.body[i].answer
    });
    let mongoInsert = queue.create('Insert',s).save();//create job for inserting into mongodb
    //executing the job created
    let process = queue.process('Insert',processJob(mongoInsert));
   
}

});

app.listen(5000);

