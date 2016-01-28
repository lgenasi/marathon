var https = require('https');

var express = require('express');
var app = express();

var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);

var db = require('monk')('mongodb://admin:3o30yqh5w!!!@ds047124.mongolab.com:47124/heroku_6v4jh5mq');
var users = db.get('users');

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
	users.findOne({username:req.query.username, password:req.query.password}).on('success', function(documents) {
		if(documents == null){
			res.send(false);
		}else{
			req.session.userid=req.query.username;
			res.send(true);
		}
	});
});

/*app.post('/add-issue', function(req, res){
	if(typeof req.session.userid != "undefined"){
		//do something
		res.send(true);
	}else{
		//don't do something
		res.send(false);
	}
});*/

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});