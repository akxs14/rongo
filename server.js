var sockjs  = require('sockjs');
var http    = require('http');
var redis   = require('redis');
var fs      = require('fs');
var path    = require('path');
var mime    = require('mime');

/*
 *  HTTP server logic
 */
var server = http.createServer(function(request, response) {
  var filePath = false;

  if(request.url == '/') {
    filePath = 'public/index.html';
  }
  else {
    filePath = 'public' + request.url;
  }
  var absPath = './' + filePath;
  serveStatic(response, cache, absPath);
});

/*
 *  Redis logic
 */
var redis_client = redis.createClient();

/*
 *  Websockets (through Sockjs) logic
 */
var sockjs_opts = {sockjs_url: "http://cdn.sockjs.org/sockjs-0.3.min.js"};
var sockjs_chat = sockjs.createServer(sockjs_opts);

sockjs_chat.on('connection', function(conn) {
  var browser = redis.createClient();
  browser.subscribe('chat_channel');

  browser.on('message', function(channel, message) {
    conn.write(message);
  });

  conn.on('data', function(message) {
    redis_client.publish('chat_channel', message);
  });

});

// Start the show!
sockjs_chat.installHandlers(server, {prefix:'/chat'});
console.log(' [*] Listening on 0.0.0.0:3000');
server.listen(3000, '0.0.0.0');

/*
 * Static files serving behaviour
 */
var cache = {}; //static files cache

function send404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: resource not found');
  response.end();
}

function sendFile(response, filePath, fileContent) {
  response.writeHead(
    200,
    {"Content-Type": mime.lookup(path.basename(filePath))}
  );
  response.end(fileContent);
}

function serveStatic(response, cache, absPath) {
  if(cache[absPath]) {
    sendFile(response, absPath, cache[absPath]);
  }
  else {
    fs.exists(absPath, function(exists) {
      if(exists) {
        fs.readFile(absPath, function(err, data) {
          if(err) {
            send404(response);
          }
          else {
            cache[absPath] = data;
            sendFile(response, absPath, data);
          }
        });
      }
      else {
        send404(response);
      }
    });
  }
}
