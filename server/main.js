'use strict';
var chalk = require('chalk');
var db = require('./db');



// Create a node server instance! cOoL!
var server = require('http').createServer();

var createApplication = function () {
    var app = require('./app')(db);
    server.on('request', app); // Attach the Express application.
    return require('./io')(server);   // Attach socket.io.
};

function setIo (io) {
  'use strict';
  io.on('connection', function (socket) {
    socket.broadcast.emit('user connected');

    socket.on('message', function (from, msg) {

      console.log('recieved message from', from, 'msg', JSON.stringify(msg));

      console.log('broadcasting message');
      console.log('payload is', msg);
      io.sockets.emit('broadcast', {
        payload: msg,
        source: from
      });
      console.log('broadcast complete');
    });
  });
};


var startServer = function () {

    var PORT = process.env.PORT || 1337;

    server.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });


};

db.sync().then(function() {
        return createApplication();
    })
    .then(function(io) {
        startServer();
        return io;
    })
    .then(function(io) {
        setIo(io);
    })
    .catch(function(err) {
        console.error(chalk.red(err.stack));
    });

