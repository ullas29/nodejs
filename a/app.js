//declaration
var express = require('express');
var login = require('./controllers/login');
var home = require('./controllers/home');
var logout = require('./controllers/logout');
var ejs = require('ejs');
var exSession = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

//configuration
app.set('view engine', 'ejs');

//middleware 
app.use(bodyParser.urlencoded({extended:true}));
app.use(exSession({secret: 'my top secret value', saveUninitialized: true, resave: false}));
app.use(cookieParser());

app.use('/abc', express.static('xyz'));
app.use('/admin', express.static('abc'));

app.use('/login', login);
app.use('/home', home);
app.use('/logout', logout);

//routes
app.get('/', function(req, res){
	res.send('Welcome To Bangabandhu Server');
});

//server startup
app.listen(1971, function(){
	console.log('Bangabandhu Server started at 1971!');
});