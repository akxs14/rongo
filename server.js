var express = require('express');
var sockjs  = require('sockjs');
var http    = require('http');
var redis   = require('redis');

var publisher = redis.createClient();
var sockjs_opts = {sockjs_url: "http://cdn.sockjs.org/sockjs-0.3.min.js"};
var sockjs_chat = sockjs.createServer(sockjs_opts);

sockjs_chat.on('connection', function(conn) {
  var browser = redis.createClient();
  browser.subscribe('chat_channel');

  browser.on('message', function(channel, message) {
    conn.write(message);
  });

  conn.on('data', function(message) {
    publisher.publish('chat_channel', message);
  });

});

var app  = express();
var server = http.createServer(app);

sockjs_chat.installHandlers(server, {prefix:'/chat'});
console.log(' [*] Listening on 0.0.0.0:9001');
server.listen(9001, '0.0.0.0');

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});
