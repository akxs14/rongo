/*
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var user = require('./modules/user');
var http = require('http');
var path = require('path');
var fs   = require('fs');
var mime = require('mime');
var redis = require('redis');
var querystring = require('querystring');
var authManager = require('./modules/auth_manager');

var app = express();

// all environments
app.use(express.cookieParser());
app.use(express.session({secret:"secret"}));
app.use(app.router);
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
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
    var new_user = new user();
 
    var auth_result = new_user.login(email, password, 
      function(auth_result, user) {
        if( auth_result == true) {
          req.session.user = user;
          req.session.password = password;
          res.redirect("/dashboard");
        }
        else
          res.redirect("/");
      });
  });
});

app.get('/register', function(req, res) {
  res.sendfile('public/register.html');
});

app.post('/signup', function(req, res) {

  console.log("eimai mesa");

  var fullBody = '';
  req.on('data', function(chunk) {
    fullBody += chunk.toString();
  });

  req.on('end',function() {
    var decodedBody = querystring.parse(fullBody);
    var email = decodedBody['email'];
    var username = decodedBody['username'];    
    var password = decodedBody['password'];
    var repeat_password = decodedBody['repeat_password'];

    var new_user = new user();
    new_user.create(email, username, password);
  });

  res.redirect("/");

});

app.get('/dashboard',authManager.requiredAuthentication, function(req, res) {
  res.sendfile('public/dashboard.html');
});

app.get('/messagebox',authManager.requiredAuthentication, function(req, res) {
  res.sendfile('public/messagebox.html');
});

app.get('/userprofile',authManager.requiredAuthentication, function(req, res) {
  res.sendfile('public/user_profile.html');
});

app.get('/contacts',authManager.requiredAuthentication, function(req, res) {
  res.sendfile('public/contact_list.html');
});

app.get('/compose',authManager.requiredAuthentication, function(req, res) {
  res.sendfile('public/compose.html');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
