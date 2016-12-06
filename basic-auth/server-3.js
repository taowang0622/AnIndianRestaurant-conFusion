var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var hostname = 'localhost';
var port = 3000;

var app = express();

// app.use(morgan('dev'));
app.use(morgan('dev'));

app.use(session({
    name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: true,
    resave: true,
    store: new FileStore()
}));


//Use authentication middleware
app.use(function (req, res, next) {
    console.log(req.headers);
    //For the first time logging in
    if (!req.session.user) {   //The first time logging in, "req.session" is definitely null, then it will automatically create a new session object on the server side
        var authHeader = req.headers.authorization;

        //in case user turns down inputting anything pressing the cancel button
        if (!authHeader) {
            let err = new Error('You are not authenticated!');
            err.status = 401;
            return next(err); //if no return, below code will be executed, because NodeJS is asynchronous!!!!!!
        }

        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');

        var userName = auth[0];
        var password = auth[1];

        if (userName === 'admin' && password === 'password') {
            req.session.user = 'admin';
            next(); //authorized
        }
        else {
            let err = new Error('You are not authenticated!!!');
            err.status = 401;
            next(err);
        }
    }
    else {
        if (req.session.user === 'admin') {
            console.log('req.session', req.session);
            next();
        }
        else {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }
});

//access the static resources
app.use(express.static(__dirname + '/public'));

//error handler
app.use(function (err, req, res, next) {
    res.writeHead(err.status || 500, { //If you don't know what else to tell client, use 500 that means internal server error!!!!
        'WWW-Authenticate': 'Basic',
        'Content-Type': 'text/plain'
    });
    res.end(err.message);
});

app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`)
});