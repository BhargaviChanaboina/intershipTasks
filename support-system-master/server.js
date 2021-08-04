let config = require('./config');
let express 	= require('express');
let app			= express();
let client_crud = require('./app/client_crud');
let license_crud= require('./app/license_crud');
let user_crud   = require('./app/user_crud');
let service_crud= require('./app/service_crud');
let notify_crud = require('./app/notify_crud');
let setting_crud = require('./app/settings_crud');
let log_crud= require('./app/log_crud');
let mail_template_crud= require('./app/mail_template_crud');
let mongoose    = require('mongoose');
let bodyParser  = require('body-parser');
let cron = require('node-cron');
let schedule = require('./app/scheduler');

const args = process.argv.slice(2);
if (args.indexOf('seed') >= 0) {
	require('./seed-data')();
}

//middleware for parsing request
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({}));
var cp=require('cookie-parser');
app.use(cp());
app.use(express.static(__dirname+'/public'));
//mongo db connection
let db = 'mongodb://localhost:27017/support';
mongoose.connect(db,function(err){
	if(err) console.log('error');
	else console.log('connected');
});
app.get('/',function(req,res){
	res.sendFile(__dirname+'/public/views/index.html');
});
app.use('/user',user_crud);

app.use(function(req, res, next) {
	var mytoken=req.cookies.token;
	if(mytoken){
			next();
	}
	else
	res.redirect("http://dev-applaudcloud.int:" + config.port);
});

app.get('/logout',function(req,res){
	res.clearCookie("token");
    res.redirect("http://dev-applaudcloud.int:" + config.port);
});
app.use('/client',client_crud);
app.use('/license',license_crud);

app.use('/service',service_crud);
app.use('/mail_template',mail_template_crud);
app.use('/log',log_crud);
app.use('/notify',notify_crud);
app.use('/setting',setting_crud);
// server 
app.listen(config.port, (err) => {
	console.log('Server is Up !');
});
