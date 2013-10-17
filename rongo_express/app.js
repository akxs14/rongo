var express = require('express');
var http    = require('http');
var fs      = require('fs');
var path    = require('path');
var mime    = require('mime');
var pg      = require('pg');
var redis   = require('redis');
var querystring = require('querystring');

var app = express();

app.use(app.router);
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/styles",  express.static(__dirname + '/public/stylesheets'));
app.use("/scripts", express.static(__dirname + '/public/javascripts'));
app.use("/images",  express.static(__dirname + '/public/images'));

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
  
});

app.get('/dashboard', function(req, res) {
  res.sendfile('public/dashboard.html');
});

app.listen(3000);
console.log("Listening on port 3000");
