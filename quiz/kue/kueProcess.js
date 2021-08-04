
const QUIZ = require('../models/quiz.js');
const job = require('./kueConfig.js');
module.exports = function(s){
                    let d=new QUIZ(s.data);
                    d.save(function(err,data){
                            console.log(data);
                    });
                }