var express = require('express'),
    databaseUrl = 'localhost:27017/bwertr',
    db = require('mongojs').connect(databaseUrl),
    ratings = db.collection('ratings'),
    app = express();

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.logger('dev'));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.del('/ratings', function (request, response) {
    ratings.remove();
    response.send(200, { message: "Reset successful." });
});

app.post('/ratings', function (request, response) {
    ratings.save(request.body, function () {
        response.send(200, request.body);
    });
});

app.listen(3000);
console.log('Listening on port 3000');