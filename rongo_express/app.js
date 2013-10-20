
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs      = require('fs');
var mime    = require('mime');
var pg      = require('pg');
var redis   = require('redis');
var querystring = require('querystring');

var app = express();

// all environments
app.use(app.router);
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use("styles",  express.static(__dirname + '/public/stylesheets'));
app.use("scripts", express.static(__dirname + '/public/javascripts'));
app.use("images",  express.static(__dirname + '/public/images'));
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', routes.index);
// app.get('/users', user.list);

app.get('/', function(req, res) {
  res.sendfile('public/index.html');
});

app.get('/login', function(req, res) {
  res.sendfile('public/login.html');
});

app.post('/signin', function(req, res) {

  var fullBody = '';
  req.on('data', function(chunk) {
    fullBody += chunk.toString();
  });

  req.on('end',function() {
    var decodedBody = querystring.parse(fullBody);
    var email = decodedBody['user[email]'];
    var password = decodedBody['user[password]'];    
  });

  res.redirect("/dashboard");
});

app.get('/register', function(req, res) {
  res.sendfile('public/register.html');
});

app.get('/signup', function(req, res) {

  var fullBody = '';
  req.on('data', function(chunk) {
    fullBody += chunk.toString();
  });

  req.on('end',function() {
    var decodedBody = querystring.parse(fullBody);
    var email = decodedBody['user[email]'];
    var password = decodedBody['user[password]'];
    var repeat_password = decodedBody['user[repeat_password]'];
  });

  res.redirect("/");

});

app.get('/dashboard', function(req, res) {
  res.sendfile('public/dashboard.html');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
