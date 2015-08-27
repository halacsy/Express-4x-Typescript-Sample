
/// <reference path='../typings/tsd.d.ts' />

/**
 * Module dependencies.
 */

import app = require('./app');
import debugModule = require('debug');
import http = require('http');

var debug = debugModule('Express-4x-Typescript-Sample:server');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
console.log("server started on ", port);
server.on('error', onError);
server.on('listening', onListening);



// setting up database
import m   = require('mongoose');
if(!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not set")
}
console.info("connecting to mongodb @ ", process.env.MONGODB_URI)
var mongoose = m.connect(process.env.MONGODB_URI, function(err) {
  if(err) {
    console.error("can't connect to the db", err);
    throw err;
  }
  console.info("successfully connected to mongodb");
});



/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
