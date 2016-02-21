/*

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
//var log_stdout = process.stdout;

console.log = function(d) { //
	log_file.write(util.format(d) + '\n');
  //ialog_stdout.write(util.format(d) + '\n');
};

*/

var https = require('https');

var express = require('express');
var app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);

var db = require('monk')('mongodb://admin:3o30yqh5w!!!@ds047124.mongolab.com:47124/heroku_6v4jh5mq');
var users = db.get('users');
var issues = db.get('issues');

app.use("/", express.static(__dirname + '/'));
app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
	res.sendfile('main.html');
});

app.use(session({
	secret: 'marathon',
	store: new MongoStore({
		url: 'mongodb://admin:3o30yqh5w!!!@ds047124.mongolab.com:47124/heroku_6v4jh5mq',
		ttl: 1 * 1 * 20 * 60, // = 20 minutes
		autoRemove: 'native'
	})
}));

app.get('/login', function(req, res){
	console.log(req.query.username);
	users.findOne({username:req.query.username, password:req.query.password}).on('success', function(documents) {
		if(documents == null){
			res.send(false);
		}else{
			req.session.userid=req.query.username;
			res.send(true);
		}
	});
});

app.post('/add-issue', function(req, res){
	if(typeof req.session.userid != "undefined"){
		issues.insert(req.body)
		res.send(true);
	}else{
		//don't do something
		res.send(false);
	}
});

app.get('/get-issues', function(req, res){
	function replacer(key, value) {
		if (key == 'type'){
        	return value;
		}
	}

	if(typeof req.session.userid != "undefined"){
		issues.find({}, function(err, doc){
			var issues = []
			doc.forEach(function(issue){
				console.log(JSON.stringify(issue, replacer));
			});
		});
		res.send(true);
	}else{
		//don't do something
		res.send(false);
	}
});

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});