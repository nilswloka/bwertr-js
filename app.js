var express = require('express'),
    http = require('http'),
    path = require('path'),
    mongojs = require('mongojs'),
    socketio = require('socket.io'),
    databaseUrl = 'localhost:27017/bwertr',
    db = mongojs.connect(databaseUrl),
    ratings = db.collection('ratings'),
    app = express(),
    server = http.createServer(app),
    io = socketio.listen(server);

server.listen(3000);

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.logger('dev'));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.del('/ratings', function (request, response) {
    ratings.remove(function () {
        ratings.find(function (err, data) {
            io.sockets.emit('numberOfRatingsChanged', { numberOfRatings: data.length });
        });
    });
    response.send(200, { message: "Reset successful." });
});

app.post('/ratings', function (request, response) {
    ratings.save(request.body, function () {
        ratings.find(function (err, data) {
            io.sockets.emit('numberOfRatingsChanged', { numberOfRatings: data.length });
        });
        response.send(200, request.body);
    });
});

io.sockets.on('connection', function (socket) {
    ratings.find(function (err, data) {
        io.sockets.emit('numberOfRatingsChanged', { numberOfRatings: data.length });
    });
});

console.log('Listening on port 3000');